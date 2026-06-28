# Lab Designer — Examples

Version: 1.0.0

---

# Purpose

This document demonstrates the exact lab design mindset, workplace simulation philosophy, progressive difficulty flow, and absolute safety standards required of the Lab Designer.

These examples teach you *how* to construct world-class hands-on laboratories by comparing **Flawed/Weak Lab Design** (dry academic exercises, un-explained commands, unsafe cleanup) with **Excellent Lab Design** (authentic enterprise scenarios, deep command justifications, intentional troubleshooting, pristine cleanup).

---

# Example 1 — Business Scenario & Production Realism

## Weak Lab Design (Dry Academic Style)
```markdown
# 1. Business Scenario

In this lab, you will explore Linux file permissions by creating three files and executing `chmod` and `chown` to modify octal representation bits. This exercise helps you memorize the Linux permission model for certification exams.
```

### Lab Designer Critique
* **Critique:** This scenario fails the workplace simulation gate entirely. It feels like an artificial, dry academic exercise designed solely for rote exam memorization. It provides zero business context, zero human motivation, and fails to simulate the work of a junior Platform Engineer.

---

## Excellent Lab Design (Workplace Simulation Style)
```markdown
# 1. Business Scenario

You have just joined the Core Infrastructure team at a fast-growing financial tech enterprise. A brand-new Ubuntu server has been provisioned to host highly confidential automated payroll calculation scripts. 

Currently, the server is completely unconfigured, and junior developers have reported being able to read and modify sensitive payroll files! Your mandate is clear: step in as the lead junior Platform Engineer, establish strict multi-tenant directory isolation, configure secure group ownership (`chown`), and verify that unauthorized users are physically blocked from accessing confidential financial data.
```

### Lab Designer Critique
* **Critique:** This scenario is a masterclass in enterprise lab design. It places the learner directly into an authentic, high-stakes workplace simulation (securing confidential payroll servers). It establishes immediate motivation (*why* permissions matter) and empowers the learner to feel like an impactful junior Platform Engineer solving real business problems.

---

# Example 2 — Hands-on Principles & Progressive Difficulty

## Weak Lab Design (Dump-and-Run Style)
```markdown
# 5. Guided Exercises

Run the following commands to configure the server:
```bash
useradd -m finance_user
mkdir /opt/payroll
chown finance_user:finance /opt/payroll
chmod 750 /opt/payroll
```
The directory is now secure. Next, write a backup script.
```

### Lab Designer Critique
* **Critique:** This section catastrophically fails our hands-on principles and progressive difficulty rules. It dumps a wall of terminal commands without explaining *What it does*, *Why it matters*, or *What success looks like*. Furthermore, it abruptly jumps from simple commands straight to "write a backup script," creating a jarring difficulty spike that overwhelms beginners.

---

## Excellent Lab Design (Progressive Evolutionary Style)
```markdown
# 5. Guided Exercises (With Progressive Difficulty)

Let's establish our secure financial environment step-by-step, moving from fully guided configurations to an unassisted production challenge!

## Stage 1: Guided (Step-by-Step Isolation)

We will begin by creating a dedicated system user and secure directory for our payroll scripts.

### Command 1: Creating the Financial User
```bash
# The '-m' flag tells Linux to automatically create a home directory (/home/finance_user) for our new user.
sudo useradd -m finance_user
```
* **What it does:** Executes `useradd` with the `-m` flag to generate a new user account and provision its personal home directory.
* **Why it matters:** In enterprise environments, applications must never run as `root` or default users. Creating dedicated service accounts enforces the principle of least privilege.
* **What success looks like:** A clean return to the terminal prompt. You can verify the user exists by checking the system password file:
```bash
grep finance_user /etc/passwd
```
**Expected Output:**
```text
finance_user:x:1002:1002::/home/finance_user:/bin/sh
```

## Stage 2: Partially Guided (Configuring Ownership)
Now that our user exists, let's create the secure payroll directory at `/opt/payroll`. Use the `mkdir` command to create the directory, and then use `chown` to assign ownership to `finance_user`. *(Hint: Recall from our companion lesson that the syntax is `sudo chown user:group /path/to/folder`).*

## Stage 3: Independent (Verifying Access Control)
Using the `su` (switch user) command, switch to a guest user account (like `nobody` or a temporary test user) and attempt to read the contents of `/opt/payroll`. Verify that Linux successfully rejects your access with a `Permission denied` error!

## Stage 4: Production Challenge (Automated Lockdown Script)
In a sprawling enterprise, you won't have time to run `chmod` manually on 50 different servers! Your final stretch objective is to write a clean, idempotent bash script named `secure-server.sh` that automatically checks if `finance_user` exists, creates `/opt/payroll` if missing, and enforces `750` permissions. Test your script to confirm it executes flawlessly!
```

### Lab Designer Critique
* **Critique:** This section perfectly embodies our four-stage progressive difficulty flow (`Guided` → `Partially Guided` → `Independent` → `Production Challenge`). In Stage 1, every command explicitly details *What it does*, *Why it matters*, and *What success looks like* with verifiable expected outputs. The learner is gently guided from foundational hand-holding all the way to autonomous enterprise scripting!

---

# Example 3 — Failure-Driven Learning & Troubleshooting

## Weak Lab Design (Skipped Troubleshooting)
```markdown
# 8. Troubleshooting

If you get a permission denied error, make sure you ran the command with `sudo`. If it still fails, reboot the machine.
```

### Lab Designer Critique
* **Critique:** This provides zero educational value. Telling a learner to "reboot the machine" teaches terrible troubleshooting habits and fails to explain how to read error messages, diagnose root causes, or execute structured recovery.

---

## Excellent Lab Design (Structured Failure Simulation)
```markdown
# 8. Troubleshooting (Failure-Driven Learning)

Learning to diagnose and recover from errors is just as important as learning to build! Let's intentionally trigger a classic enterprise configuration mistake and learn how to fix it safely.

## Intentional Failure Simulation
We will attempt to create a file inside `/opt/payroll` using our standard student user account without elevating privileges:
```bash
touch /opt/payroll/salary-report.txt
```

## Reading the Error Message
**Discovered Output:**
```text
touch: cannot touch '/opt/payroll/salary-report.txt': Permission denied
```
Notice the exact phrasing: `Permission denied`. Linux is explicitly telling us that our active user badge lacks the required write (`w`) bits on the `/opt/payroll` directory.

## Diagnosing the Failure
Let's inspect the directory permissions to understand exactly why we were rejected:
```bash
ls -ld /opt/payroll
```
**Expected Output:**
```text
drwxr-x--- 2 finance_user finance 4096 Jun 28 10:00 /opt/payroll
```
Look at the permission string `drwxr-x---`! The Owner (`finance_user`) has `rwx` (read/write/execute). The Group (`finance`) has `r-x` (read/execute, but NO write!). Others have `---` (zero access). Because our student user is neither `finance_user` nor a member of the `finance` group, Linux correctly locked us out!

## Recovering Safely
To fix this without breaking security, we must execute our command with elevated privileges (`sudo`) or switch directly to `finance_user`:
```bash
sudo -u finance_user touch /opt/payroll/salary-report.txt
ls -l /opt/payroll/salary-report.txt
```
**Expected Output:**
```text
-rw-r--r-- 1 finance_user finance_user 0 Jun 28 10:05 /opt/payroll/salary-report.txt
```
Success! The file was created securely under the correct user identity.
```

### Lab Designer Critique
* **Critique:** This section turns a frustrating error into a masterclass in systems debugging. It intentionally simulates a common mistake, breaks down how to read the terminal error, walks through the exact diagnostic `ls -ld` verification, and executes a clean, secure recovery workflow.

---

# Example 4 — Absolute Safety & Cleanup

## Weak Lab Design (Destructive Host Cleanup)
```markdown
# 10. Cleanup

Run this to clean up your system:
```bash
sudo rm -rf /opt/*
```
```

### Lab Designer Critique
* **Critique:** **CATASTROPHIC SAFETY ALARM!** Running `sudo rm -rf /opt/*` on a student's host machine will permanently destroy all third-party software packages installed in `/opt`, severely damaging their operating system! This violates our mandatory destructive command ban entirely.

---

## Excellent Lab Design (Safe, Scoped Cleanup)
```markdown
# 10. Cleanup

Let's clean up our temporary financial workspace and restore our host system to its initial pristine state.

```bash
# Safely remove only the specific payroll demonstration directory we created
sudo rm -rf /opt/payroll

# Safely remove the temporary finance user account and its home directory
sudo userdel -r finance_user
```
```

### Lab Designer Critique
* **Critique:** This cleanup is perfectly scoped, safe, and clean. It targets only the precise directories and users provisioned during the lab, leaving the rest of the student's host operating system untouched and pristine.
