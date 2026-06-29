# Principle of Least Privilege & Threat Modeling Basics

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-SEC-01`
* **Module:** Security Fundamentals (`MOD-SEC`)
* **Difficulty:** Beginner to Intermediate
* **Estimated Duration:** 45 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master defensive philosophies of modern system architecture, decrypting how Platform Engineers restrict access using the Principle of Least Privilege (PoLP) and identify architectural weaknesses before writing a single line of code using structured Threat Modeling. By mastering the STRIDE threat framework, access control validation, and attack surface reduction, you will firmly establish the deep conceptual intuition supporting our module capability: **"I can model infrastructure threats, scan containers for vulnerabilities, manage secrets securely, and verify software supply chains."**

---

# Learning Objectives

* Define the Principle of Least Privilege (PoLP) and explain its critical architectural role in minimizing attack surfaces and containing security breaches.
* Deconstruct the STRIDE Threat Modeling framework: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
* Conduct a structured architectural Threat Modeling exercise across a standard multi-tier cloud microservice application.
* Contrast the concepts of Authentication (verifying identity) with Authorization (verifying execution permissions).
* Explain how the Principle of Least Privilege maps directly to Linux file permissions (`chmod 600`), Docker container non-root execution (`USER 10001`), and Cloud IAM policies.

---

# Prerequisites

* Completion of Module 01 (`MOD-LINUX-BEG`), Module 02 (`MOD-LINUX-ADM`), Module 03 (`MOD-LINUX-INT`), Module 04 (`MOD-NET`), Module 05 (`MOD-GIT`), and Module 06 (`MOD-DOCKER`).
* Foundational understanding of system users and network boundaries (`sudo`, `id`, `bridge`).

---

# Why This Exists

When junior engineers design cloud applications, they frequently prioritize speed of development over security. When their application encounters a file permission error (`Permission denied`), they blindly type `chmod 777`. When their Docker container encounters a mounting error, they blindly append `--privileged`. When their Terraform script encounters an AWS access error, they blindly attach an `AdministratorAccess` IAM policy!

**This undisciplined behavior creates catastrophic production vulnerabilities!**

If an application running with `AdministratorAccess` or `--privileged` is compromised by a hacker via a simple web vulnerability, the hacker instantly inherits those massive administrator permissions! They can delete your entire database, take over your host Linux servers, and spin up cryptocurrency mining machines across your entire AWS account!

To solve the monumental challenge of **Unchecked Permissions** and **Architectural Blindspots**, cybersecurity pioneers established the **Principle of Least Privilege (PoLP)** and **Threat Modeling (STRIDE)**. By strictly assigning the absolute minimum permissions required to perform a task and systematically deconstructing potential attack vectors before deployment, Platform Engineers create an impenetrable blast radius containment shield. If a single microservice is compromised, the damage remains permanently trapped inside a tiny, isolated box!

---

# Core Concepts

## 1. The Principle of Least Privilege (PoLP)
The Principle of Least Privilege dictates that every user, process, container, and microservice must be granted the **absolute minimum permissions necessary** to perform its stated task, and nothing more!
* **The Hotel Keycard Analogy:** Imagine you check into a hotel. The receptionist hands you a keycard that opens *only* your specific room door (Room 304). If the receptionist handed you a master keycard that opened every single room in the hotel, the kitchen pantry, and the manager's safe, it would be a catastrophic security disaster! In cloud engineering, giving a microservice `AdministratorAccess` is giving it the hotel master key!

```text
[ Non-Compliant: Master Key ]           [ PoLP Compliant: Specific Key ]
┌───────────────────────────────┐       ┌───────────────────────────────┐
│ Service: Payment API          │       │ Service: Payment API          │
├───────────────────────────────┤       ├───────────────────────────────┤
│ Permission: Administrator     │       │ Permission: Read/Write *ONLY* │
│ (Can delete entire AWS account│       │ to 'payments' Database Table  │
└───────────────────────────────┘       └───────────────────────────────┘
```

## 2. Authentication vs. Authorization
To enforce Least Privilege, systems rely on two completely separate master security gates:
* **Authentication (AuthN):** Verifying *who* you are! (e.g., entering a username/password, presenting an SSH key, or scanning a biometric fingerprint). It answers: *"Are you truly the engineer you claim to be?"*
* **Authorization (AuthZ):** Verifying *what* you are legally allowed to do once authenticated! (e.g., checking if your user ID has read/write permissions to a specific database table). It answers: *"Now that I know who you are, are you allowed to delete this file?"*

## 3. The STRIDE Threat Modeling Framework
Threat Modeling is the systematic process of inspecting an architectural diagram to discover potential cyberattack vectors before writing code. Platform Engineers utilize the industry-standard **STRIDE Framework** (invented by Microsoft):
* **Spoofing:** An attacker impersonating a legitimate user, microservice, or server (e.g., forging an IP address or stealing an API token). *Mitigation: Strong Authentication (mTLS, JWTs).*
* **Tampering:** An attacker modifying unauthorized data in transit or at rest (e.g., altering network packets or injecting malicious code into a database). *Mitigation: Integrity Validation (TLS encryption, file hash verification).*
* **Repudiation:** An attacker performing an illicit action and denying they did it because the system lacks audit logs (e.g., deleting a database table without leaving a trace). *Mitigation: Immutable Audit Logging (AWS CloudTrail, append-only logs).*
* **Information Disclosure:** An attacker gaining access to confidential plain-text data (e.g., discovering exposed AWS secret keys in GitHub or intercepting unencrypted HTTP traffic). *Mitigation: Encryption at Rest and in Transit.*
* **Denial of Service (DoS):** An attacker flooding a system with massive traffic to crash the server and prevent legitimate customers from accessing it. *Mitigation: Rate Limiting, Caching, Auto-scaling.*
* **Elevation of Privilege:** An unprivileged attacker exploiting a vulnerability to gain administrative `root` permissions over the system (e.g., breaking out of a container namespace). *Mitigation: Non-root execution (`USER 10001`), strict IAM policies.*

```text
[ STRIDE Threat Modeling Framework Matrix ]
┌───────────────────────────┬────────────────────────────────────────────┐
│ Threat Category           │ Architectural Mitigation Strategy          │
├───────────────────────────┼────────────────────────────────────────────┤
│ S - Spoofing              │ Strong Authentication (mTLS / API Keys)    │
│ T - Tampering             │ Data Integrity (TLS / File Hashes)         │
│ R - Repudiation           │ Immutable Audit Logging (CloudTrail)       │
│ I - Information Disclosure│ Encryption in Transit & Rest (Vault/SOPS)  │
│ D - Denial of Service     │ Rate Limiting & Auto-scaling (Cloudflare)  │
│ E - Elevation of Privilege│ Principle of Least Privilege (PoLP / RBAC) │
└───────────────────────────┴────────────────────────────────────────────┘
```

## 4. Blast Radius & Attack Surface Reduction
Every feature you add to a platform increases its **Attack Surface** (the total number of entry points an attacker can exploit).
* **Blast Radius Containment:** If an attacker breaches your attack surface, how far can they spread? By establishing strict network segmentation (custom bridge networks) and granular IAM roles, you ensure the **Blast Radius** of a compromised container is strictly confined to that single container!

## 5. PoLP Across the Engineering Stack
True Platform Engineers enforce Least Privilege across every single layer of the technology stack:
* **Linux OS Layer:** Restricting file permissions using `chmod 600` (read/write only by owner) instead of `chmod 777`.
* **Container Layer:** Declaring `USER 10001` in `Dockerfile` and completely forbidding `--privileged` runtime flags.
* **Cloud Infrastructure Layer:** Writing strict, granular AWS IAM policies (`s3:GetObject` on a specific bucket) instead of wildcard policies (`s3:*`).

---

# Architecture

```mermaid
flowchart TD
    classDef analysis fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef gate fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef enforcement fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;

    subgraph DesignPhase [Design Phase (Threat Modeling)]
        ARCH["Cloud Architecture Diagram"]
        STRIDE["Evaluate STRIDE (Spoofing, Tampering, etc.)"]
        ARCH --> STRIDE
    end

    subgraph SecurityGates [Security Enforcement Architecture]
        AUTHN["1. Authentication (mTLS / OIDC)"]
        AUTHZ["2. Authorization (RBAC / Policies)"]
        STRIDE -.-> AUTHN
        AUTHN --> AUTHZ
    end

    subgraph ExecutionStack [Platform Execution Stack (Least Privilege)]
        CLOUD["Cloud IAM (e.g. s3:GetObject)"]
        LINUX["Host OS (chmod 600)"]
        DOCKER["Container Engine (USER 10001, No --privileged)"]
        
        AUTHZ --> CLOUD
        AUTHZ --> LINUX
        AUTHZ --> DOCKER
    end

    subgraph IsolationLayer [Isolation Layer]
        CONTAIN["Breach Contained within Namespace Boundary"]
        DOCKER -.->|Compromise Attempt| CONTAIN
    end

    class ARCH,STRIDE analysis;
    class AUTHN,AUTHZ gate;
    class CLOUD,LINUX,DOCKER enforcement;
```

---

# Real-World Example

Imagine you are a Lead Platform Engineer reviewing an architectural design for a brand-new internal PDF generation microservice. The development team presents an architecture where the microservice runs as a Docker container, executes as `root`, mounts the host server's entire root filesystem (`-v /:/host`), and possesses an AWS IAM role with `s3:*` (full access to every S3 bucket in the company).

When you conduct a **STRIDE Threat Modeling** exercise, you instantly spot a catastrophic **Elevation of Privilege** and **Information Disclosure** vulnerability. If an attacker uploads a maliciously crafted PDF file that exploits a vulnerability in the PDF rendering library, the attacker achieves remote code execution inside the container. 

Because the container runs as `root` and mounts `/:/host`, the attacker can break out of the container instantly, modify `/host/etc/shadow`, and achieve full `root` compromise over the physical host server! Furthermore, because the container possesses `s3:*`, the attacker can download and delete every single confidential customer data bucket in your AWS account!

You forcefully redesign the architecture using the **Principle of Least Privilege**. You remove the host volume mount, configure `USER 10001` in the `Dockerfile`, and rewrite the AWS IAM policy to allow `s3:PutObject` *only* to the specific `pdf-output-bucket`. 

When the microservice deploys, an attacker attempts the malicious PDF exploit. They achieve code execution, but because the container is running as unprivileged `USER 10001` with zero host mounts, they cannot break out! When they attempt to list S3 buckets (`aws s3 ls`), the AWS IAM engine forcefully blocks them (`AccessDenied`). Your blast radius containment shield successfully stopped a company-wide disaster!

---

# Hands-on Demonstration

Let's look at how an engineer inspects non-compliant vs compliant file permissions using `ls -l`, inspects container security flags, and inspects granular Cloud IAM least privilege policies using `cat`.

## Input 1: Inspecting File Permissions and Container Security Flags
We use `ls -l` to contrast insecure `777` file permissions with secure `600` least privilege permissions, and verify non-root container user execution.

## Code 1
```bash
# Inspect insecure vs secure file permissions on sensitive configuration files.
# (We simulate the clean plain-text output of ls -l for demonstration files)
ls -l /etc/shadow 2>/dev/null || echo -e "-rwxrwxrwx 1 root root 1200 Jun 28 12:00 /insecure/secrets.yml (NON-COMPLIANT: 777)\n-rw------- 1 root root 1200 Jun 28 12:00 /secure/secrets.yml (COMPLIANT: 600)"

# Verify the active execution user ID of a running container wrapper.
# (We simulate the clean plain-text output of docker exec id)
docker exec -it secure-proxy id 2>/dev/null || echo "uid=10001(appuser) gid=10001(appuser) groups=10001(appuser) (COMPLIANT: Non-Root)"
```

## Expected Output 1
```text
-rwxrwxrwx 1 root root 1200 Jun 28 12:00 /insecure/secrets.yml (NON-COMPLIANT: 777)
-rw------- 1 root root 1200 Jun 28 12:00 /secure/secrets.yml (COMPLIANT: 600)
uid=10001(appuser) gid=10001(appuser) groups=10001(appuser) (COMPLIANT: Non-Root)
```

## Explanation 1
Look at how beautifully strict Least Privilege is! `-rwxrwxrwx` (`777`) means literally any guest user on the server can read, edit, or execute the secret file! `-rw-------` (`600`) guarantees that *only* the specific file owner can read or write to it! Notice our simulated container user ID: `uid=10001(appuser)` proves the container process executes with unprivileged user permissions!

---

## Input 2: Inspecting Cloud IAM Least Privilege Policies
We use `cat` to inspect a pristine, highly granular AWS IAM JSON policy document enforcing strict least privilege access to a single storage bucket.

## Code 2
```bash
# Inspect the declarative JSON IAM least privilege policy document.
# (We simulate inspecting a compliant AWS IAM policy file)
cat << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPutObjectToSpecificBucketOnly",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::production-ai-pdf-output/*"
      ]
    }
  ]
}
EOF
```

## Expected Output 2
```text
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPutObjectToSpecificBucketOnly",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::production-ai-pdf-output/*"
      ]
    }
  ]
}
```

## Explanation 2
Notice how perfectly contained this IAM policy is! Let's deconstruct the elite architectural elements:
* `"Effect": "Allow"`: Declares an explicit permission grant.
* `"Action": ["s3:PutObject"]`: Granular action definition! Notice there is no `s3:GetObject` or `s3:DeleteObject`! The microservice can *only* upload files; it cannot read or delete existing files!
* `"Resource": ["arn:aws:s3:::production-ai-pdf-output/*"]`: Absolute scope restriction! The microservice can only interact with this single specific S3 bucket!

---

# Hands-on Lab

* **Objective:** Verify Linux least privilege file permissions (`chmod 600`), start a non-root container, verify user UIDs, simulate an unauthorized access denial (`Permission denied`), and conduct a miniature STRIDE evaluation.
* **Estimated Time:** 15 minutes
* **Difficulty:** Beginner to Intermediate
* **Environment:** Interactive Browser Terminal / Local Sandbox

## Step-by-step Instructions

1. Open your terminal sandbox and create a brand-new directory named `polp-lab`: `mkdir ~/polp-lab && cd ~/polp-lab`.
2. Type `echo "SUPER_SECRET_KEY_999" > secret.txt` to create a sensitive data file.
3. Type `chmod 600 secret.txt` to enforce strict Linux least privilege file permissions!
4. Type `ls -la secret.txt` to verify the exact `-rw-------` permission string.
5. Start a brand-new container running as an unprivileged non-root user:
```bash
docker run -d --name unprivileged-app -u 10001:10001 alpine:latest /bin/sh -c "sleep 3600"
```
6. Type `docker exec -it unprivileged-app id` to verify the active execution user ID (`uid=10001`).
7. Type `docker exec -it unprivileged-app touch /etc/shadow` to simulate an unprivileged attacker attempting to modify a protected system configuration file!
8. Verify that the terminal forcefully outputs `touch: /etc/shadow: Permission denied`, proving your least privilege blast radius containment works perfectly!
9. Type `docker rm -f unprivileged-app` to cleanly remove the demonstration container wrapper.

## Verification

```bash
ls -l secret.txt | grep -E "^-rw-------"
```
*If your terminal successfully outputs your `-rw-------` file line, you have mastered foundational least privilege enforcement!*

## Troubleshooting

* **Issue:** `docker run -u 10001` fails with `docker: Error response from daemon: unable to find user 10001`.
* **Solution:** If you specify a username string (e.g., `-u appuser`), that user must physically exist inside the container's `/etc/passwd` file! However, if you specify a raw numerical UID (`-u 10001:10001`), Docker bypasses `/etc/passwd` and applies the UID directly to the kernel namespace! Verify you typed numerical UIDs!

## Cleanup

```bash
# Safely remove the demonstration polp lab directory
rm -rf ~/polp-lab
```

---

# Production Notes

In enterprise cloud architecture, enforcing the Principle of Least Privilege across massive AWS, Azure, or Google Cloud environments requires utilizing **automated IAM policy linting tools** (such as AWS IAM Access Analyzer or Checkov). These tools scan your Terraform infrastructure code during Pull Requests, automatically detecting wildcard permissions (`*`) or overly broad IAM roles, and forcefully blocking the merge until developers narrow the policy scope to exact resource ARNs!

---

# Common Mistakes

* **Executing `chmod 777` to Fix Permission Errors:** Beginners frequently encounter `Permission denied` when configuring web servers or database directories and blindly type `chmod 777`. This destroys system security by allowing any guest user to edit or delete the files! Always identify the correct user ownership (`chown`) and assign minimal permissions (`chmod 644` or `chmod 600`)!
* **Confusing Authentication with Authorization:** Junior developers frequently assume that because a user successfully logged into the platform (Authentication), they can safely be trusted to access any API endpoint. You must strictly enforce an Authorization check (`Can user X perform action Y on resource Z?`) on every single API request!

---

# Failure-Driven Learning

Imagine a junior engineer attempts to start a container using the highly dangerous `--privileged` flag, but the deployment is forcefully blocked by an enterprise admission controller or system security policy.

## Simulated Failure
```bash
# Simulating a container deployment failure due to an enterprise security policy blocking --privileged
# (We simulate the exact Kubernetes / Docker policy error when blocking privileged execution)
echo -e "Error response from daemon: authorization denied by plugin: --privileged flag is strictly forbidden by enterprise security policy.\n# FATAL: Deployment blocked. Container administrative capabilities exceed maximum allowed threshold."
```

## Output
```text
Error response from daemon: authorization denied by plugin: --privileged flag is strictly forbidden by enterprise security policy.
# FATAL: Deployment blocked. Container administrative capabilities exceed maximum allowed threshold.
```

## Diagnosis & Recovery
Why did this fail? Look at this beautiful enterprise security block: `--privileged flag is strictly forbidden`! When an engineer appends `--privileged` to a container startup, Docker completely strips away the protective forcefield of Linux kernel namespaces and cgroups! The container process is granted direct, raw access to all physical host hardware devices (`/dev/*`) and full administrative Linux capabilities (`CAP_SYS_ADMIN`). If the container is compromised, the attacker achieves full `root` compromise over the host server! To recover correctly, the engineer must remove `--privileged` entirely, identify the exact specific capability the application needs (e.g., `--cap-add=NET_ADMIN`), and deploy the container safely with minimal privileges!

---

# Engineering Decisions

## Threat Modeling Timing: Shift-Left (Design Phase) vs. Shift-Right (Penetration Testing)
When architecting an enterprise security strategy, engineering leaders must choose when Threat Modeling occurs.
* **Shift-Right (Penetration Testing / Audits):** Security analysis occurs exclusively *after* the application is fully built and deployed to staging or production. External security auditors execute penetration testing. Excellent for finding real-world runtime exploits. However, discovering a massive architectural flaw at this stage requires tearing down and rewriting months of code, costing tens of thousands of dollars in delays.
* **Shift-Left (STRIDE Threat Modeling at Design Phase):** Security analysis occurs *before* a single line of code is written! Platform Engineers evaluate architectural whiteboard diagrams using STRIDE. Flaws are caught on paper, costing zero dollars to fix and ensuring security is baked into the foundation.
* **The Platform Decision:** Platform Engineers strictly mandate **Shift-Left STRIDE Threat Modeling** during the initial architectural design specification phase, while utilizing automated penetration testing as a secondary verification gate prior to production release.

---

# Best Practices

* **Master `getcap` / `setcap`:** When an application binary requires special system privileges (e.g., Nginx needing to bind to protected port 80), never run the binary as `root`! Instead, utilize Linux Capabilities (`sudo setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx`). This grants the non-root binary the exact specific kernel capability required to bind to port 80 without granting full `root` access!
* **Perform Regular STRIDE Reviews:** Whenever a major new feature or microservice is added to your cloud platform, gather the engineering team for a 30-minute STRIDE whiteboard session to identify brand-new attack surfaces!

---

# Troubleshooting Guide

## Issue 1: "Permission denied (publickey)" vs. "HTTP 401 Unauthorized vs HTTP 403 Forbidden"

* **Cause:** You interact with secure systems or APIs, but encounter access rejections. Beginners view these as generic errors, but to a Platform Engineer, they indicate specific AuthN vs AuthZ failures!
* **Diagnosis & Solution:**
  * `Permission denied (publickey)`: Authentication failure! You attempted to SSH into a server or push to GitHub, but the remote server rejected your identity because your private SSH key (`~/.ssh/id_rsa`) does not match the public key stored on the server! To fix, verify your SSH keys or execute `ssh-add`!
  * `HTTP 401 Unauthorized`: Authentication failure! Your API request completely lacks a valid identity token (e.g., missing or expired JWT in the `Authorization` header). To fix, log in to receive a valid token!
  * `HTTP 403 Forbidden`: Authorization failure! You are successfully authenticated (the server knows exactly who you are), but your user ID lacks the legal least privilege permissions required to access this specific resource! To fix, request elevated permissions in the IAM system!

---

# Summary

* **The Principle of Least Privilege (PoLP)** grants users and services the absolute minimum permissions required to perform a task.
* **Authentication (AuthN)** verifies identity (`Who are you?`); **Authorization (AuthZ)** verifies execution permissions (`What can you do?`).
* **STRIDE** (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) is the canonical Threat Modeling framework.
* **Blast Radius Containment** ensures that if a microservice is compromised, the damage remains permanently trapped in an isolated box.
* **PoLP** maps directly to Linux `chmod 600`, container `USER 10001`, and granular Cloud IAM policies.

---

# Cheat Sheet

```bash
# Enforce strict Linux least privilege file permissions (Read/Write by owner only)
chmod 600 [sensitive_file]

# Enforce strict Linux least privilege directory permissions (Full access by owner only)
chmod 700 [sensitive_directory]

# Start a container running as an unprivileged numerical user ID (Non-root)
docker run -d --name [name] -u 10001:10001 [image]

# Inspect active execution user ID and group ID numbers of a running container
docker exec -it [container_id_or_name] id

# Grant a specific Linux kernel capability to a binary without requiring root execution
sudo setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx

# Inspect existing kernel capabilities assigned to system binaries
getcap /usr/sbin/nginx
```

---

# Knowledge Check

## Multiple Choice Questions

1. A developer creates a microservice that needs to read profile images from an S3 bucket named `user-profiles`. They attach an AWS IAM policy containing `"Action": "s3:*", "Resource": "*"`. What core security principle did this developer violate?
   * A) They forgot to use GitFlow.
   * B) They violated the Principle of Least Privilege (PoLP) by granting wildcard administrative access (`s3:*`) to every S3 bucket in the account (`*`), drastically increasing the blast radius if the microservice is compromised.
   * C) They used `chmod 777`.
   * D) They forgot to install Docker Compose.

## Scenario Questions

You are conducting a STRIDE Threat Modeling whiteboard session for a financial platform. An engineer points out that a rogue system administrator could manually delete a database transaction table, and the company would have absolutely no idea who did it because the database lacks audit logs. Based on what you learned in this lesson, what exact letter in the STRIDE framework does this threat represent, and what is the mitigation?

## Short Answer Questions

Explain the exact architectural difference between an `HTTP 401 Unauthorized` error (Authentication) and an `HTTP 403 Forbidden` error (Authorization).

---

# Interview Preparation

## Beginner Questions

* What is the Principle of Least Privilege?
* What do the letters in STRIDE stand for?
* What is the difference between Authentication and Authorization?

## Intermediate Questions

* Explain why `chmod 777` is a catastrophic security vulnerability in production environments.
* Why should you never use the `--privileged` flag when running Docker containers?

## Advanced Questions

* Explain how Linux kernel capabilities (`CAP_NET_ADMIN`, `CAP_SYS_PTRACE`) allow Platform Engineers to decompose monolithic `root` privileges (`UID 0`) into granular execution permissions, and describe how `runc` drops default capabilities during container initialization.

## Scenario-Based Discussions

* Discuss the operational trade-offs of enforcing strict least privilege access controls across an enterprise development team (e.g., requiring formal ticketing approval for every IAM policy change) versus allowing broad developer autonomy, specifically addressing developer velocity and production security posture.

---

# Further Reading

1. [Principle of Least Privilege (CISA Security Guide)](https://www.cisa.gov/)
2. [The STRIDE Threat Model (Official Microsoft Documentation)](https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
3. [Authentication vs Authorization (Okta Security Architecture)](https://www.okta.com/identity-101/authentication-vs-authorization/)
4. [Linux Capabilities Explained (Linux Manual Pages)](https://man7.org/linux/man-pages/man7/capabilities.7.html)
5. [AWS IAM Best Practices - Least Privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege)
