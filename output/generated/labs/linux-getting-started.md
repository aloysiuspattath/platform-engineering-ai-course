# Standalone Verification Lab: Linux Terminal & File Management Mastery

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of Linux terminal navigation, environment verification, and file management pipelines.

Required Inputs: Associated lesson (`MOD-LINUX-BEG`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-LINUX-BEG-01`
* **Associated Lesson:** Module 01 (`MOD-LINUX-BEG`: Getting Started with Linux)
* **Objective:** Verify the active Linux kernel, establish a mock microservice directory tree, create and backup environment configuration files, and filter configuration output using a terminal pipeline.
* **Estimated Time:** 30 minutes
* **Difficulty:** Beginner

---

# Prerequisites

* Basic desktop computer literacy.
* Completion of `MOD-LINUX-BEG-01` through `MOD-LINUX-BEG-07`.
* A functional Linux terminal environment (WSL2, Desktop Virtual Machine, or Cloud Shell).

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox and verify that you are operating in a pristine home directory location.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your starting absolute working directory path
pwd

# Ensure your active shell is Bash
echo $SHELL
```

---

# Step-by-Step Instructions

## Step 1: Verify Active Kernel and Operating System Metadata

As a professional Platform Engineer, you must always know the exact operating system specifications of the machine you are configuring.

```bash
# Inspect the active Linux kernel name and release version
uname -s
uname -r

# Display the operating system distribution identification metadata
cat /etc/os-release
```

## Step 2: Scaffold a Mock Microservice Directory Tree

Use the single master directory creation command to build a deeply nested folder structure for an upcoming cloud microservice deployment.

```bash
# Scaffold a nested directory structure for 'platform-service'
mkdir -p platform-service/src/config
mkdir -p platform-service/src/logs
mkdir -p platform-service/src/scripts
```

## Step 3: Populate Production Environment Settings

Use terminal output redirection to create a production environment configuration file containing essential service parameters.

```bash
# Navigate into the newly created config directory
cd platform-service/src/config

# Create a new configuration file with database and server parameters
echo "DB_HOST=relational-db.internal.cloud" > prod.env
echo "DB_PORT=5432" >> prod.env
echo "APP_PORT=8080" >> prod.env
echo "FEATURE_AI_COPILOT=true" >> prod.env
```

## Step 4: Execute Safe File Backup and Renaming

Before modifying production settings, create a secure backup duplicate and practice file renaming operations.

```bash
# Create an exact duplicate backup copy of the configuration file
cp prod.env prod.env.backup

# Move/rename the backup file to reflect an archived naming standard
mv prod.env.backup prod.env.archive_2026
```

## Step 5: Construct an Output Filtering Pipeline

Simulate an investigation where an engineer needs to quickly verify whether the AI Copilot feature flag is actively enabled within a massive configuration file.

```bash
# Jump back to the absolute home directory
cd ~

# Use cat piped into grep to inspect only the feature flag setting
cat platform-service/src/config/prod.env.archive_2026 | grep "FEATURE_AI"
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 01 capability statement (*"I can install Linux, navigate the terminal, and manage files"*), execute the following verification commands.

```bash
# Verify the presence of both the production and archive configuration files
ls -la platform-service/src/config/

# Verify the exact output of your terminal filtering pipeline
cat platform-service/src/config/prod.env | grep "PORT"
```

**Expected Output:**
```text
total 16
drwxr-xr-x 2 aloysius aloysius 4096 Jun 28 09:25 .
drwxr-xr-x 5 aloysius aloysius 4096 Jun 28 09:24 ..
-rw-r--r-- 1 aloysius aloysius  103 Jun 28 09:25 prod.env
-rw-r--r-- 1 aloysius aloysius  103 Jun 28 09:25 prod.env.archive_2026

DB_PORT=5432
APP_PORT=8080
```
*If your terminal displays the exact file list and successfully isolates both `DB_PORT=5432` and `APP_PORT=8080`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `mkdir` returns `No such file or directory` when attempting to create `platform-service/src/config`.
  * **Cause:** You omitted the `-p` (parents) flag, preventing Linux from creating the intermediate `src` directory.
  * **Solution:** Re-execute the command including the parents flag: `mkdir -p platform-service/src/config`.

* **Symptom:** `cat` returns `cat: platform-service/src/config/prod.env: No such file or directory`.
  * **Cause:** You executed `cd platform-service/src/config` in Step 3 but forgot to execute `cd ~` in Step 5, meaning you are attempting to look for `platform-service` inside the `config` directory itself!
  * **Solution:** Execute `cd ~` to return to your home directory, or use the absolute file path: `cat ~/platform-service/src/config/prod.env`.

* **Symptom:** `cp` returns `cp: prod.env: No such file or directory`.
  * **Cause:** You are standing in the home directory (`~`) rather than inside `platform-service/src/config`.
  * **Solution:** Execute `cd ~/platform-service/src/config` before attempting to copy the file.

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup command to remove the mock microservice directory structure.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Safely remove the mock microservice directory tree and all its contents
rm -rf platform-service/
```
