# Secret Management Strategies & Encryption in Transit/Rest (SOPS/Vault)

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-SEC-03`
* **Module:** Security Fundamentals (`MOD-SEC`)
* **Difficulty:** Intermediate to Advanced
* **Estimated Duration:** 55 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master cryptographic shielding mechanisms of modern infrastructure, decrypting how Platform Engineers manage sensitive credentials (API keys, database passwords, TLS certificates) without leaking them in plain-text. By mastering Encryption in Transit (TLS/HTTPS), Encryption at Rest (AES-256), Mozilla SOPS (`sops -e`), and HashiCorp Vault, you will firmly establish the elite cryptographic capabilities supporting our module capability: **"I can model infrastructure threats, scan containers for vulnerabilities, manage secrets securely, and verify software supply chains."**

---

# Learning Objectives

* Contrast Encryption in Transit (TLS/HTTPS network tunnels) with Encryption at Rest (AES-256 physical storage encryption).
* Explain the architectural danger of committing plain-text secrets to version-controlled repositories (GitLeaks, public credential scraping).
* Configure file-level cryptographic secret management using Mozilla SOPS (`sops -e`), demonstrating how it encrypts YAML values while keeping keys plain-text for clean Git diffs.
* Deconstruct the internal architecture of HashiCorp Vault as an enterprise dynamic secret engine, detailing its master seal/unseal process and lease-based credential issuance.
* Execute foundational secret management workflows using `sops -d`, `vault kv put`, and `vault kv get` to verify cryptographic credential injection.

---

# Prerequisites

* Completion of `MOD-SEC-01` and `MOD-SEC-02`.
* Foundational terminal file inspection and environment variable injection skills (`cat`, `export`, `.env`).

---

# Why This Exists

In Lessons 01 and 02, we explored how to enforce least privilege access controls and scan container images for known software vulnerabilities. However, the most secure, vulnerability-free microservice in the world is completely compromised if its database password or AWS master API key is floating around in plain-text.

Imagine you are a junior engineer developing a Python AI microservice. Your application requires a highly sensitive, highly expensive OpenAI Master API Key (`sk-SuperSecretMasterKey999`) to generate AI responses.

To get the application running locally, you paste this plain-text API key directly into your `config.py` file or a plain-text `compose.yaml` file. At the end of the day, you type `git add . && git commit -m "add AI config" && git push origin main`.

**You have just committed a catastrophic security disaster!**

Within seconds of your push hitting GitHub, automated public credential scraping botnets (which scan every public Git commit worldwide in real-time) detect the regex pattern of your OpenAI key. Within five minutes, hackers utilize your stolen API key to execute millions of AI generation requests across their own botnets. 

The next morning, your company receives an **OpenAI bill for $50,000**, and your enterprise cloud account is forcefully suspended!

To solve the monumental challenge of **Plain-Text Secret Leaks** and **Credential Exposure**, cryptography leaders established **Encryption in Transit/Rest, Mozilla SOPS, and HashiCorp Vault**. By ensuring that a plain-text secret *never* touches physical disk or Git repositories, Platform Engineers can commit fully encrypted configuration manifests to GitHub with absolute calm, dynamically inject short-lived credentials at runtime, and guarantee pristine production secrecy.

---

# Core Concepts

## 1. Encryption in Transit vs. Encryption at Rest
To safeguard data across cloud infrastructure, Platform Engineers enforce two mandatory cryptographic shields:
* **Encryption in Transit (TLS / HTTPS):** Encrypting data while it travels across the physical network wire (e.g., between a user's web browser and an Nginx reverse proxy). It prevents **Man-in-the-Middle (MitM)** packet sniffing attacks. *Tooling: OpenSSL, Let's Encrypt, Mutual TLS (mTLS).*
* **Encryption at Rest (AES-256):** Encrypting data while it sits stationary on physical hard drives, database tables, or S3 object buckets. If a rogue data center technician physically unplugs a server's hard drive and takes it home, they see nothing but unreadable cryptographic gibberish! *Tooling: AWS KMS, LUKS disk encryption, SOPS.*

```text
[ Encryption in Transit: Network Tunnel ]     [ Encryption at Rest: Physical Storage ]
┌───────────────────────────────────────┐     ┌───────────────────────────────────────┐
│ [ Client ] ──( HTTPS / TLS )──► [ API ]│     │ [ Database Server ] ──► [ Encrypted Disk]
│ (Prevents Packet Sniffing on Wire)    │     │ (Prevents Stolen Hard Drive Extraction)│
└───────────────────────────────────────┘     └───────────────────────────────────────┘
```

## 2. The Fallacy of Plain-Text Config Files
Many developers believe that storing secrets inside a `.env` file or an unencrypted Kubernetes YAML manifest (`secret.yml`) is secure as long as the repository is marked "Private" on GitHub.
* **The Employee Turnover Trap:** Private repositories are cloned by dozens of developers, contractors, and automated CI/CD runners. If an employee leaves the company, their laptop retains every plain-text `.env` file! If a CI/CD server is compromised, attackers extract the plain-text YAMLs instantly! **Secrets must be encrypted before entering Git!**

## 3. Mozilla SOPS (Secrets OPerationS)
Mozilla SOPS is an elite open-source cryptographic binary designed specifically for GitOps and Platform Engineering workflows:
* **Selective Value Encryption:** If you encrypt a file using standard GPG or OpenSSL, the entire file turns into a binary binary blob (`.gpg`), making Git pull request diffs impossible to read! SOPS solves this beautifully! When you execute `sops -e secret.yml`, SOPS inspects the YAML structure, retains the top-level keys in **pristine plain-text** (`db_password:`), and encrypts *only* the values (`ENC[AES256_GCM...]`)! 
* **GitOps Perfection:** This allows engineers to conduct clean, transparent code reviews on GitHub (`We can see db_password was updated!`) while keeping the actual password cryptographically locked!

```text
[ Plain-Text Secret YAML ]              [ SOPS Encrypted YAML (sops -e) ]
┌───────────────────────────────┐       ┌───────────────────────────────┐
│ database:                     │       │ database:                     │
│   user: ai_production         │       │   user: ai_production         │
│   password: SuperSecret99     │ ───►  │   password: ENC[AES256_GCM...]│
└───────────────────────────────┘       └───────────────────────────────┘
```

## 4. HashiCorp Vault: The Enterprise Secret Engine
While SOPS is exceptional for static configuration files in Git, large-scale enterprise microservices require an advanced dynamic secret management platform: **HashiCorp Vault**.
* **The Dynamic Lease Engine:** In legacy systems, a database password remains static for years (`db_pass123`). In Vault, when a microservice starts up, it requests a database credential from Vault. Vault dynamically creates a brand-new, unique database user and password on the fly, issues it to the microservice with a strict **Lease Timer** (e.g., 1 hour), and automatically deletes the database user the moment the lease expires! If a hacker steals the password, it becomes completely useless within 60 minutes!
* **The Seal / Unseal Process:** When Vault boots, it enters a **Sealed State** where its physical storage is heavily encrypted by a master encryption key. To unseal Vault, Platform Engineers utilize Shamir's Secret Sharing algorithm, requiring multiple human administrators to present individual unseal key shares to unlock the engine!

## 5. Automated Credential Injection (Vault Agent)
How does an application read secrets from Vault without writing massive custom API fetching code? Platform Engineers deploy a sidecar process called **Vault Agent**.
* Vault Agent runs directly alongside your application container, handles authentication with Vault, fetches the dynamic secrets, and writes them directly into an ephemeral **`tmpfs` RAM mount** (`/app/secrets/config.json`). The application simply reads the local JSON file from RAM, completely unaware that Vault exists!

---

# Architecture

```mermaid
flowchart TD
    subgraph GitOpsStorage [The Safe Box (Storing Passwords)]
        PLAIN["Readable Password (Danger!)"] -->|sops -e| SOPS["Scrambled Password (Safe!)"]
        SOPS -->|Safe to Commit!| GIT["Public Code Folder"]
    end

    subgraph DynamicEngine [The Password Vending Machine]
        UNSEAL["Unlocking the Vending Machine (Needs multiple keys)"] --> KV["Storing temporary passwords inside"]
    end

    subgraph RuntimeInjection [The Running App]
        GIT -->|sops -d| DECRYPT["Unscrambling with the Master Key"]
        KV -->|Dynamic Lease| AGENT["The App's Helper (Asks for a password)"]
        AGENT -->|Writes to RAM| TMPFS["Temporary Memory (Erases when turned off!)"]
        TMPFS --> PROC["App runs using the temporary password"]
    end
```

---

# Real-World Example

Imagine you are hired to secure the systems for a massive bank. The company currently builds 100 different apps across 50 code folders.

Every single folder contains files with "Readable Passwords" for databases and banking tools. Over 200 developers have downloaded these folders onto their personal laptops. 

When you run a scan, you discover 500 readable passwords scattered everywhere! If a single developer's laptop is stolen, hackers would gain instant access to the bank's core databases.

Because you know better, you execute a massive security overhaul. First, you implement "The Safe Box" for all 50 code folders. You take every readable password and scramble it. Now, developers can download the code freely; without the master key, the passwords just look like "Scrambled Passwords" and are completely unreadable!

Finally, for the most critical banking apps, you deploy "The Password Vending Machine". Instead of using permanent passwords, you make the apps ask "The App's Helper" for a temporary password that automatically expires every 30 minutes. The password is kept only in "Temporary Memory", so it never touches a hard drive. Your bank achieves total secrecy, passes strict security audits flawlessly, and permanently eliminates password leaks!

---

# Hands-on Demonstration

Let's look at how an engineer inspects a SOPS encrypted YAML manifest using `cat`, inspects active Vault KV stores using `vault kv get`, and simulates dynamic secret injection.

## Input 1: Inspecting SOPS Encrypted YAML Manifests
We use `cat` to inspect a pristine, highly governed SOPS encrypted YAML manifest, verifying how SOPS retains top-level plain-text keys while encrypting values.

## Code 1
```bash
# Inspect the SOPS encrypted YAML configuration manifest.
# (We simulate inspecting a compliant SOPS secret file)
cat << 'EOF'
production_database:
    username: ENC[AES256_GCM,data:cTFwU2E=,iv:a1b2c3d4,tag:e5f6g7h8,type:str]
    password: ENC[AES256_GCM,data:U3VwZXJTZWNyZXQ5OQ==,iv:h8g7f6e5,tag:d4c3b2a1,type:str]
sops:
    kms:
        - arn: arn:aws:kms:us-east-1:123456789012:key/8a9b0c1d-2e3f
          created_at: '2026-06-28T12:00:00Z'
    lastmodified: '2026-06-28T12:00:00Z'
    mac: ENC[AES256_GCM,data:a1b2c3d4e5f6g7h8,iv:z1y2x3w4,tag:v5u6t7s8,type:str]
    pgp: []
    version: 3.8.1
EOF
```

## Expected Output 1
```text
production_database:
    username: ENC[AES256_GCM,data:cTFwU2E=,iv:a1b2c3d4,tag:e5f6g7h8,type:str]
    password: ENC[AES256_GCM,data:U3VwZXJTZWNyZXQ5OQ==,iv:h8g7f6e5,tag:d4c3b2a1,type:str]
sops:
    kms:
        - arn: arn:aws:kms:us-east-1:123456789012:key/8a9b0c1d-2e3f
          created_at: '2026-06-28T12:00:00Z'
    lastmodified: '2026-06-28T12:00:00Z'
    mac: ENC[AES256_GCM,data:a1b2c3d4e5f6g7h8,iv:z1y2x3w4,tag:v5u6t7s8,type:str]
    pgp: []
    version: 3.8.1
```

## Explanation 1
Look at how beautifully architected SOPS encryption is! Let's deconstruct the elite elements:
* `production_database:` / `username:`: Pristine plain-text YAML keys! An engineer reviewing a Pull Request knows exactly which configuration blocks are being modified!
* `password: ENC[AES256_GCM...]`: The AES-256 Galois/Counter Mode encrypted ciphertext! Completely unreadable without the master key!
* `kms: - arn: ...`: The master AWS KMS key configuration required to decrypt the file!

---

## Input 2: Inspecting HashiCorp Vault Secrets and Dynamic Leases
We use `vault kv get` to inspect our enterprise secret store, viewing the clean plain-text output of injected credentials and active lease durations.

## Code 2
```bash
# Inspect the active key-value secret stored inside HashiCorp Vault.
# (We simulate the clean plain-text output of vault kv get secret/myapp)
vault kv get secret/myapp 2>/dev/null || cat << 'EOF'
====== Metadata ======
Key              Value
---              -----
created_time     2026-06-28T12:00:00.000Z
deletion_time    n/a
destroyed        false
version          1

====== Data ======
Key              Value
---              -----
api_key          sk-OpenAIMasterKey999
db_password      VaultDynamicSecret888
lease_duration   1h0m0s
EOF
```

## Expected Output 2
```text
====== Metadata ======
Key              Value
---              -----
created_time     2026-06-28T12:00:00.000Z
deletion_time    n/a
destroyed        false
version          1

====== Data ======
Key              Value
---              -----
api_key          sk-OpenAIMasterKey999
db_password      VaultDynamicSecret888
lease_duration   1h0m0s
```

## Explanation 2
Notice how perfectly managed this dynamic secret store is! Vault displays our secret metadata (`version 1`) and outputs our pristine credentials (`api_key`, `db_password`). Notice `lease_duration 1h0m0s`: it proves that this database password is a temporary, lease-based credential that will be automatically invalidated by Vault after exactly one hour!

---

# Hands-on Lab

* **Objective:** Verify SOPS encryption mechanics, create an encrypted secret manifest, simulate a Vault KV secret put/get workflow, verify lease timers, and execute clean secret teardowns.
* **Estimated Time:** 20 minutes
* **Difficulty:** Intermediate to Advanced
* **Environment:** Interactive Browser Terminal / Local Sandbox (with SOPS and Vault installed)

## Step-by-step Instructions

1. Open your terminal sandbox and verify your SOPS binary is responsive: `sops --version`. (If not installed, we simulate the cryptographic execution).
2. Type `mkdir ~/secret-lab && cd ~/secret-lab` to create a brand-new lab directory.
3. Create a plain-text secret manifest by typing:
```bash
echo -e "app:\n  secret_key: SuperSecretKey999" > plain-secret.yml
```
4. Simulate encrypting the file using SOPS with a mock PGP or KMS key:
```bash
# (We simulate the exact SOPS encryption execution)
echo -e "app:\n  secret_key: ENC[AES256_GCM,data:U3VwZXJTZWNyZXQ=,iv:a1b2,tag:c3d4,type:str]\nsops:\n  version: 3.8.1" > sops-secret.yml
```
5. Type `cat sops-secret.yml` to verify that your top-level `app:` and `secret_key:` keys remain plain-text while the value turns into an `ENC[AES256_GCM...]` ciphertext!
6. Verify your HashiCorp Vault binary is responsive: `vault --version`. (If not installed, we simulate the KV execution).
7. Simulate putting a secret into Vault's KV store:
```bash
# (We simulate the exact vault kv put execution)
echo "Success! Data written to: secret/production/ai-service"
```
8. Simulate retrieving the secret from Vault to verify its dynamic lease data:
```bash
# (We simulate the exact vault kv get execution)
echo -e "Key\t\tValue\n---\t\t-----\napi_token\tAI_VAULT_TOKEN_999\nlease_duration\t3600s"
```

## Verification

```bash
cat sops-secret.yml | grep -E "ENC\[AES256_GCM"
```
*If your terminal successfully outputs your `ENC[AES256_GCM...]` line, you have mastered SOPS encryption and cryptographic value shielding!*

## Troubleshooting

* **Issue:** `sops -d sops-secret.yml` fails with `Failed to get the data key required to decrypt the SOPS file: KMS master key access denied`.
* **Solution:** You are attempting to decrypt a SOPS file, but your active terminal AWS IAM credentials lack `kms:Decrypt` permissions for the specific AWS KMS master key ARN declared in the SOPS metadata! Verify your AWS CLI login credentials (`aws sts get-caller-identity`).

## Cleanup

```bash
# Safely remove the demonstration secret lab directory
rm -rf ~/secret-lab
```

---

# Production Notes

In enterprise Kubernetes platforms, while HashiCorp Vault is the gold standard for dynamic secrets, Platform Engineers frequently utilize the **External Secrets Operator (ESO)**. ESO is an automated Kubernetes operator that connects directly to HashiCorp Vault, AWS Secrets Manager, or Google Secret Manager. It dynamically fetches secrets from the cloud vault in the background and automatically constructs native Kubernetes Secret resources inside your cluster, allowing applications to mount secrets seamlessly without requiring complex sidecar agents!

---

# Common Mistakes

* **Committing `.env` Files to Git:** Beginners frequently create `.env` files containing sensitive database passwords and accidentally forget to add `.env` to their `.gitignore` file. This instantly exposes your secrets to the entire company or the public internet! **Always add `.env` to `.gitignore` before writing a single secret!**
* **Base64 Encoding vs. Encryption:** Junior developers frequently assume that because Kubernetes Secrets use Base64 encoding (`echo "password" | base64`), the secrets are encrypted. **Base64 is NOT encryption!** It is simple plain-text encoding! Anyone who can read the YAML can instantly execute `echo "cGFzc3dvcmQ=" | base64 --decode` to retrieve the plain-text password! Always use true encryption (SOPS/Vault)!

---

# Failure-Driven Learning

Imagine a junior engineer attempts to deploy an application that reads secrets from HashiCorp Vault, but the deployment fails instantly with a fatal connection error because the Vault server entered a sealed state following a system reboot.

## Simulated Failure
```bash
# Simulating an application startup failure due to a sealed Vault engine
# (We simulate the exact Vault API error when requesting secrets from a sealed engine)
echo -e "vault: Error making API request.\nURL: GET http://127.0.0.1:8200/v1/secret/data/myapp\nCode: 503. Errors:\n* Vault is sealed\n# FATAL: Application startup aborted. Unable to fetch master database credentials."
```

## Output
```text
vault: Error making API request.
URL: GET http://127.0.0.1:8200/v1/secret/data/myapp
Code: 503. Errors:
* Vault is sealed
# FATAL: Application startup aborted. Unable to fetch master database credentials.
```

## Diagnosis & Recovery
Why did this fail? Look at this classic enterprise security state: `Code: 503. Errors: * Vault is sealed`! When a HashiCorp Vault server boots up or recovers from a power outage, it enters a highly protective **Sealed State**. In this state, Vault physically does not know how to decrypt its own storage hard drives! It refuses all secret requests to prevent unauthorized data extraction. To recover correctly, the Platform Engineering administrators must execute `vault operator unseal` and present their individual Shamir unseal key shares (e.g., 3 out of 5 human keyholders entering their shares). Once unsealed, Vault decrypts its storage, the API returns `Code 200`, and the application starts flawlessly!

---

# Engineering Decisions

## Secret Management: SOPS vs. HashiCorp Vault vs. Cloud Secrets Manager
When architecting an enterprise secret strategy, engineering leaders must choose the master secret management engine.
* **Mozilla SOPS (`sops -e`):** Encrypts files directly in Git. Requires zero running infrastructure or database maintenance. Exceptional for small-to-medium teams practicing GitOps. However, lacks dynamic, short-lived credential rotation.
* **Cloud Secrets Manager (AWS Secrets Manager / Azure Key Vault):** Fully managed cloud vendor secret stores. Excellent for simple key-value storage. However, incurs direct monthly financial costs per secret ($0.40/secret/month) and locks your architecture into a single cloud vendor.
* **HashiCorp Vault:** The ultimate Platform Engineering standard! An enterprise-grade, cloud-agnostic dynamic secret engine. Manages short-lived, lease-based credentials, encryption as a service (Transit engine), and certificate issuance. However, requires dedicated engineering overhead to manage high availability and unseal procedures.
* **The Platform Decision:** Platform Engineers mandate **Mozilla SOPS** for base infrastructure configuration files in GitOps repositories, while strictly deploying **HashiCorp Vault** for all high-scale microservice dynamic credential injection and lease management.

---

# Best Practices

* **Master `gitleaks`:** Before pushing any code to GitHub, execute `gitleaks detect --source .` in your local terminal. Gitleaks is an elite automated auditing binary that scans your active Git commits, instantly detecting regex patterns for AWS keys, private SSH keys, and database passwords before they can leak!
* **Enable Vault Audit Logs:** Always enable raw audit logging on your HashiCorp Vault engine (`vault audit enable file file_path=/var/log/vault_audit.log`). Vault will log every single secret request, proving exactly which microservice or user ID accessed which credential at what exact millisecond!

---

# Troubleshooting Guide

## Issue 1: "sops: file has not been modified" vs. "vault: permission denied (403)"

* **Cause:** You attempt to encrypt configuration files or retrieve dynamic secrets, but encounter cryptographic lockouts or authorization denials.
* **Diagnosis & Solution:**
  * `sops: file has not been modified`: You executed `sops secret.yml`, opened the editor, made zero changes to the text, and saved. SOPS detected that the file hash remained identical and cleanly aborted the cryptographic re-encryption to save CPU cycles! To force re-encryption, make an actual text modification!
  * `vault: permission denied (403)`: Your application successfully authenticated with Vault (Vault knows who you are), but your active Vault Token lacks an ACL (Access Control List) policy granting `read` access to the specific `secret/data/myapp` path! To fix, update your Vault ACL policy: `path "secret/data/myapp" { capabilities = ["read"] }`!

---

# Summary

* **Encryption in Transit** (TLS/HTTPS) protects data on the network wire; **Encryption at Rest** (AES-256) protects data on physical storage.
* **Base64 Encoding** is NOT encryption; Kubernetes Secrets are stored as easily decodable plain-text strings by default.
* **Mozilla SOPS** encrypts YAML values (`ENC[AES256...]`) while retaining plain-text keys, making it perfect for GitOps Pull Request reviews.
* **HashiCorp Vault** is an enterprise dynamic secret engine that issues short-lived, lease-based credentials that expire automatically.
* **Vault Agent** sidecars fetch dynamic secrets and write them directly into ephemeral `tmpfs` RAM mounts, never touching physical disk.

---

# Cheat Sheet

```bash
# Encrypt a YAML configuration file in-place using Mozilla SOPS and an AWS KMS key
sops --encrypt --in-place --kms [kms_key_arn] [secret_file.yml]

# Decrypt a SOPS encrypted YAML file and output the pristine plain-text to the terminal
sops --decrypt [secret_file.yml]

# Open a SOPS encrypted file directly in your terminal text editor (Auto-encrypts on save!)
sops [secret_file.yml]

# Put a static key-value secret credential into HashiCorp Vault's KV store
vault kv put secret/[path]/[myapp] api_key=[secret_value]

# Retrieve an active key-value secret credential and lease metadata from HashiCorp Vault
vault kv get secret/[path]/[myapp]

# Unseal a sealed HashiCorp Vault engine by presenting an individual Shamir key share
vault operator unseal [shamir_key_share]

# Scan your local Git repository commit history to detect unencrypted plain-text secrets
gitleaks detect --source .
```

---

# Knowledge Check

## Multiple Choice Questions

1. A developer needs to store a database password in a Kubernetes manifest (`secret.yml`) and commit it to a public GitHub repository. They run `echo "db_password123" | base64` and paste the resulting string `ZGJfcGFzc3dvcmQxMjM=` into the YAML file. What is the correct architectural evaluation of this workflow?
   * A) The workflow is perfectly secure because Base64 uses AES-256 encryption.
   * B) The workflow is a catastrophic security vulnerability! Base64 is simple plain-text encoding, NOT encryption. Anyone who reads the file on GitHub can instantly run `echo "ZGJfcGFzc3dvcmQxMjM=" | base64 --decode` to retrieve the plain-text password. The developer must use true encryption (e.g., Mozilla SOPS).
   * C) The developer forgot to use `docker compose`.
   * D) The workflow requires `chmod 777`.

## Scenario Questions

You are attempting to start a microservice that retrieves dynamic database credentials from HashiCorp Vault. You inspect the microservice logs and observe `HTTP 503: Vault is sealed`. Based on what you learned in this lesson, what exact cryptographic state is Vault in, and what algorithm/process must administrators use to unlock it?

## Short Answer Questions

Explain why Mozilla SOPS encrypts YAML values (`password: ENC[AES256...]`) while retaining top-level keys in plain-text (`password:`), specifically addressing how this benefits GitOps Pull Request code reviews.

---

# Interview Preparation

## Beginner Questions

* What is the difference between Encryption in Transit and Encryption at Rest?
* Why is Base64 encoding not secure for storing secrets?
* What does `sops -e` do?

## Intermediate Questions

* Explain how HashiCorp Vault's dynamic lease engine improves enterprise security compared to static database passwords.
* Why should you use `gitleaks` before pushing code to GitHub?

## Advanced Questions

* Explain how HashiCorp Vault utilizes Shamir's Secret Sharing algorithm to split the master encryption key into multiple key shares, and describe how Vault Agent utilizes Kubernetes Service Account Tokens (JWTs) to authenticate with Vault's Kubernetes Auth Method.

## Scenario-Based Discussions

* Discuss the architectural trade-offs of establishing an enterprise secret management strategy that relies on committing SOPS-encrypted files directly to GitOps repositories versus establishing a centralized HashiCorp Vault dynamic secret cluster, specifically addressing infrastructure maintenance overhead, secret rotation velocity, and disaster recovery procedures.

---

# Further Reading

1. [Mozilla SOPS Official Documentation (GitHub Guide)](https://github.com/getsops/sops)
2. [HashiCorp Vault Architecture (Official Vault Documentation)](https://developer.hashicorp.com/vault/docs/internals/architecture)
3. [Shamir's Secret Sharing Algorithm Explained (Cryptographic Breakdown)](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing)
4. [Detecting Secrets in Git with Gitleaks (Official Guide)](https://github.com/gitleaks/gitleaks)
5. [Kubernetes External Secrets Operator (Official Documentation)](https://external-secrets.io/)
