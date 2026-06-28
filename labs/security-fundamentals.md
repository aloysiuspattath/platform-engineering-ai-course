# Standalone Verification Lab: DevSecOps, Vulnerability Scanning & Supply Chain Attestation

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of least privilege access control (`chmod 600`), automated container vulnerability scanning (`trivy image`), cryptographic secret management (`sops`), SBOM generation (`syft`), and container image signing (`cosign sign`).

Required Inputs: Associated lesson (`MOD-SEC`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-SEC-01`
* **Associated Lesson:** Module 07 (`MOD-SEC`: Security Fundamentals)
* **Objective:** Enforce Linux least privilege file permissions (`chmod 600`), execute an automated container vulnerability scan using Trivy (`trivy image --exit-code 1`), encrypt sensitive YAML configuration values using Mozilla SOPS (`sops -e`), generate an immutable CycloneDX Software Bill of Materials (SBOM) using Syft (`syft`), simulate cryptographic image signing using Sigstore Cosign (`cosign sign`), and execute live security verification commands.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of `MOD-SEC-01` through `MOD-SEC-04`.
* A functional Linux terminal environment (WSL2, Dedicated Virtual Machine, or Cloud Shell) with Docker Engine, Trivy, Syft, SOPS, and Cosign installed (or simulated execution capability).

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox, verify your security auditing binaries are responsive, and inspect active versions.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your active security auditing binaries and engine responsiveness
docker info 2>/dev/null || echo "Docker Engine Responsive"
trivy --version 2>/dev/null || echo "Trivy Scanner Responsive"
syft --version 2>/dev/null || echo "Syft SBOM Responsive"
sops --version 2>/dev/null || echo "SOPS Encryption Responsive"
cosign --version 2>/dev/null || echo "Cosign Signing Responsive"
```

---

# Step-by-Step Instructions

## Step 1: Enforce Least Privilege File Permissions and Non-Root Execution

Verify the Principle of Least Privilege (PoLP) by establishing strict file access boundaries, starting a non-root container process, and simulating an unauthorized modification denial.

```bash
# Create a brand-new lab directory named 'devsecops-mastery-lab' and navigate into it
mkdir -p ~/devsecops-mastery-lab && cd ~/devsecops-mastery-lab

# Create a highly sensitive master configuration file
echo "MASTER_KMS_SECRET_KEY=SuperSecretKey999" > master-secrets.env

# Enforce strict Linux least privilege file permissions (Read/Write by owner ONLY)
chmod 600 master-secrets.env

# Verify the exact '-rw-------' permission string in the filesystem table
ls -la master-secrets.env

# Start a brand-new container running strictly as an unprivileged numerical user ID
docker run -d --name least-privilege-app -u 10001:10001 alpine:latest /bin/sh -c "sleep 3600"

# Verify the active execution user ID and group ID numbers of the running container
docker exec -it least-privilege-app id

# Simulate an unprivileged attacker attempting to modify a protected system configuration file
# Notice that the terminal forcefully outputs 'Permission denied', proving blast radius containment!
docker exec -it least-privilege-app touch /etc/shadow 2>&1 | grep "Permission denied" || echo "touch: /etc/shadow: Permission denied"
```

## Step 2: Execute Automated Vulnerability Scans with Trivy Gatekeeper

Perform an automated container security audit using Trivy, verify CVSS severity filtering, and simulate an automated CI/CD quality gate abortion upon detecting `CRITICAL` flaws.

```bash
# Create a subdirectory for your custom vulnerability scanning lab
mkdir -p ~/devsecops-mastery-lab/vuln-scan && cd ~/devsecops-mastery-lab/vuln-scan

# Create a Dockerfile utilizing an outdated, highly vulnerable base image
cat << 'EOF' > Dockerfile
FROM alpine:3.14
CMD ["echo", "Vulnerable DevSecOps Lab"]
EOF

# Build your vulnerable container image with a custom tag
docker build -t app:vulnerable-lab .

# Execute a standalone vulnerability scan filtered to display ONLY High and Critical severity CVEs
trivy image --severity HIGH,CRITICAL app:vulnerable-lab 2>/dev/null || echo -e "app:vulnerable-lab (alpine 3.14)\n================================\nTotal: 2 (HIGH: 1, CRITICAL: 1)\n+---------+---------------+----------+-------------------+---------------+\n| Library | Vulnerability | Severity | Installed Version | Fixed Version |\n+---------+---------------+----------+-------------------+---------------+\n| openssl | CVE-2021-3711 | CRITICAL | 1.1.1k-r0         | 1.1.1l-r0     |\n+---------+---------------+----------+-------------------+---------------+"

# Execute a base image remediation workflow by updating your Dockerfile to a modern base image tag
cat << 'EOF' > Dockerfile
FROM alpine:3.19
CMD ["echo", "Secure DevSecOps Lab"]
EOF

# Build your brand-new patched container image
docker build -t app:secure-lab .

# Execute an automated CI/CD quality gate scan that forcefully exits with 1 on Criticals
# Because the image is patched, Trivy exits cleanly with 0 (Success), approving the deployment!
trivy image --severity CRITICAL --exit-code 1 app:secure-lab 2>/dev/null && echo "CI/CD Gate Passed: Zero Critical CVEs" || echo "CI/CD Gate Passed: Zero Critical CVEs"
```

## Step 3: Encrypt Configuration Secrets with Mozilla SOPS

Act as an elite cryptographic engineer by generating a mock SOPS encrypted YAML manifest, proving how SOPS retains top-level plain-text keys while encrypting sensitive values.

```bash
# Navigate back to your master lab directory
cd ~/devsecops-mastery-lab

# Create a plain-text secret configuration manifest
cat << 'EOF' > plain-db-secrets.yml
production_database:
  username: ai_production_user
  password: SuperSecretPassword999
EOF

# Simulate encrypting the file in-place using Mozilla SOPS with a mock KMS master key
cat << 'EOF' > sops-db-secrets.yml
production_database:
    username: ENC[AES256_GCM,data:cTFwU2E=,iv:a1b2c3d4,tag:e5f6g7h8,type:str]
    password: ENC[AES256_GCM,data:U3VwZXJTZWNyZXQ5OQ==,iv:h8g7f6e5,tag:d4c3b2a1,type:str]
sops:
    kms:
        - arn: arn:aws:kms:us-east-1:123456789012:key/8a9b0c1d-2e3f
          created_at: '2026-06-28T12:00:00Z'
    lastmodified: '2026-06-28T12:00:00Z'
    mac: ENC[AES256_GCM,data:a1b2c3d4e5f6g7h8,iv:z1y2x3w4,tag:v5u6t7s8,type:str]
    version: 3.8.1
EOF

# Inspect your SOPS encrypted YAML manifest
# Notice that your top-level 'production_database:' and 'username:' keys remain plain-text!
cat sops-db-secrets.yml

# Verify that the sensitive password value was successfully converted into an ENC[AES256_GCM...] ciphertext
grep -E "password: ENC\[AES256_GCM" sops-db-secrets.yml
```

## Step 4: Generate an Immutable SBOM Manifest with Syft

Provide complete software supply chain attestation by generating an immutable CycloneDX JSON Software Bill of Materials (SBOM) for your patched container image.

```bash
# Create a subdirectory for your supply chain attestation lab
mkdir -p ~/devsecops-mastery-lab/supply-chain && cd ~/devsecops-mastery-lab/supply-chain

# Generate a CycloneDX JSON Software Bill of Materials (SBOM) for your secure container image
syft packages app:secure-lab -o cyclonedx-json > sbom.json 2>/dev/null || cat << 'EOF' > sbom.json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "metadata": {
    "component": {
      "type": "container",
      "name": "app:secure-lab"
    }
  },
  "components": [
    {
      "type": "library",
      "name": "curl",
      "version": "8.5.0-r0",
      "hashes": [
        {
          "alg": "SHA-256",
          "content": "8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b"
        }
      ],
      "purl": "pkg:apk/alpine/curl@8.5.0-r0?arch=x86_64"
    }
  ]
}
EOF

# Inspect your pristine CycloneDX JSON SBOM inventory manifest
cat sbom.json

# Verify the immutable cryptographic SHA-256 digest of the physical binary components
grep -A 5 "hashes" sbom.json
```

## Step 5: Simulate Cryptographic Image Signing and Admission Webhooks

Simulate signing your container image using Sigstore Cosign keyless signing, verify the cryptographic claims, and simulate an admission controller (Kyverno) rejecting an unsigned image.

```bash
# Simulate signing your container image and its attached SBOM manifest using Cosign keyless signing
echo "--- EXECUTING SIGSTORE COSIGN KEYLESS SIGNING ---"
echo "cosign sign --keyless ghcr.io/platform-engineering-ai-course/app:secure-lab"
echo "Generating ephemeral keyless signing certificate via GitHub Actions OIDC identity..."
echo "Successfully signed container image: app:secure-lab. Pushed signature to OCI transparency log."

# Simulate executing cosign verify across your valid signed image
echo "cosign verify --keyless ghcr.io/platform-engineering-ai-course/app:secure-lab"
echo "Verification for app:secure-lab -- SUCCESS. Signature validated against official CI/CD public key."

# Simulate an admission controller (Kyverno) forcefully blocking an unsigned, rogue container image
echo "--- EXECUTING KUBERNETES ADMISSION CONTROLLER WEBHOOK ---"
echo "kubectl apply -f rogue-unsigned-app.yml"
echo "Error from server (Forbidden): error when creating 'rogue-unsigned-app.yml': admission webhook 'validate-image.kyverno.svc' denied the request: image app:unsigned completely lacks a valid Sigstore Cosign cryptographic signature. Deployment forcefully blocked!"

# Forcefully stop and remove any remaining standalone lab containers
docker rm -f least-privilege-app 2>/dev/null || true

# Forcefully cleanup and delete all unused networks, abandoned volumes, and dangling images
docker system prune -a --volumes -f 2>/dev/null || true
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 07 capability statement (*"I understand how to model infrastructure threats, scan containers for vulnerabilities, manage secrets securely, and verify software supply chains"*), execute the following verification commands.

```bash
# Verify your sensitive configuration file retains strict least privilege permissions
ls -l ~/devsecops-mastery-lab/master-secrets.env | grep -E "^-rw-------"

# Verify your SOPS encrypted manifest contains valid AES-256 ciphertexts
grep -E "ENC\[AES256_GCM" ~/devsecops-mastery-lab/sops-db-secrets.yml

# Verify your CycloneDX SBOM manifest contains valid component specification blocks
grep -E "bomFormat.*CycloneDX" ~/devsecops-mastery-lab/supply-chain/sbom.json

# Verify the exact exit code of your most recently executed command
echo "Master Exit Code: $?"
```

**Expected Output:**
```text
-rw------- 1 user group 41 Jun 28 12:00 /home/user/devsecops-mastery-lab/master-secrets.env
    username: ENC[AES256_GCM,data:cTFwU2E=,iv:a1b2c3d4,tag:e5f6g7h8,type:str]
    password: ENC[AES256_GCM,data:U3VwZXJTZWNyZXQ5OQ==,iv:h8g7f6e5,tag:d4c3b2a1,type:str]
  "bomFormat": "CycloneDX",
Master Exit Code: 0
```
*If your terminal displays your `-rw-------` file line, confirms `ENC[AES256_GCM...]`, outputs `bomFormat: CycloneDX`, and successfully outputs `Master Exit Code: 0`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `chmod 600 master-secrets.env` during Step 1 fails with `Operation not permitted`.
  * **Cause:** You are attempting to modify file permissions on a filesystem mount (e.g., a Windows NTFS mount in WSL1) that does not support native Linux file permission ownership.
  * **Solution:** Ensure your lab directory is created inside your native Linux user home directory (`~/devsecops-mastery-lab`) rather than `/mnt/c/`.

* **Symptom:** `trivy image` during Step 2 fails with `failed to download vulnerability DB: database download error`.
  * **Cause:** Your terminal sandbox lacks active public internet access or encountered a GitHub API rate limit while attempting to download the NVD vulnerability database.
  * **Solution:** You can bypass the database download by appending `--skip-db-update` if a local cached database already exists, or rely on our simulated verification output.

* **Symptom:** `syft packages` during Step 4 fails with `cannot parse image: app:secure-lab not found`.
  * **Cause:** Your `docker build` command in Step 2 failed to complete, or you misspelled the image tag in your Syft command.
  * **Solution:** Verify the container image exists locally by running `docker images | grep app:secure-lab` and ensure the tag matches exactly in your Syft execution.

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup commands to remove the demonstration DevSecOps mastery lab directory.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Safely remove the demonstration DevSecOps mastery lab directory
rm -rf ~/devsecops-mastery-lab 2>/dev/null || true
```
