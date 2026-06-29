# Standalone Verification Lab: Git Version Control, Rebasing & Automation

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of Git internal objects (`git cat-file`), feature branching (`git switch -c`), interactive squashing (`git rebase -i`), merge conflict resolution, pre-commit hook automation (`.git/hooks`), and submodule synchronization (`git submodule`).

Required Inputs: Associated lesson (`MOD-GIT`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-GIT-01`
* **Associated Lesson:** Module 05 (`MOD-GIT`: Version Control with Git)
* **Objective:** Inspect internal Blob, Tree, and Commit objects (`git cat-file`), create and merge feature branches, execute an interactive squash (`git rebase -i`), simulate and resolve a direct merge conflict, configure a custom pre-commit hook script to intercept commits, and verify submodule configuration mechanics.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of `MOD-GIT-01` through `MOD-GIT-05`.
* A functional Linux terminal environment (WSL2, Dedicated Virtual Machine, or Cloud Shell) with Git installed.

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox, verify your Git installation, and configure your master Git user credentials and linear history preferences.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your active Git installation and version
git --version

# Configure your master Git user credentials (if not already set)
git config --global user.name "Platform Engineer Lab"
git config --global user.email "lab@ai-platform.internal"

# Configure your master Git preferences for clean rebasing and diff3 conflicts
git config --global pull.rebase true
git config --global merge.conflictstyle diff3
```

---

# Step-by-Step Instructions

## Step 1: Initialize Repository and Inspect Internal Git Objects

Create a brand-new Git repository, generate your first commit, and inspect the raw plain-text content of underlying Blob, Tree, and Commit objects.

```bash
# Create a brand-new lab directory named 'git-mastery-lab' and navigate into it
mkdir -p ~/git-mastery-lab && cd ~/git-mastery-lab

# Initialize a fresh Git repository
git init

# Create a base configuration file and stage it to generate a Blob object
echo "server_port = 8080" > config.toml
git add config.toml

# Commit the file to generate your Tree and Commit objects
git commit -m "chore: initial base commit"

# Inspect the active Git HEAD pointer file
cat .git/HEAD

# Inspect the raw plain-text content of your active HEAD commit object
git cat-file -p HEAD

# Inspect the raw plain-text table of the root tree object referenced in the commit
git cat-file -p HEAD^{tree}
```

## Step 2: Create Feature Branches and Execute Interactive Squashing

Create a feature branch, generate multiple messy work-in-progress commits, and use `git rebase -i` to squash them into a single beautiful atomic commit.

```bash
# Create and instantly switch to a brand-new feature branch
git switch -c feature/add-database

# Create three separate messy work-in-progress commits
echo "db_host = 'localhost'" >> config.toml
git commit -am "wip: add db host"

echo "db_port = 5432" >> config.toml
git commit -am "wip: add db port"

echo "db_name = 'production_ai'" >> config.toml
git commit -am "wip: add db name"

# Inspect your messy 4-commit history graph
git log --graph --oneline

# Simulate an interactive squash of the last 3 commits into a single atomic commit
# (In an automated lab script, we use git reset to elegantly simulate the squash)
git reset --soft HEAD~3
git commit -m "feat(database): configure production database connection parameters"

# Verify that your 3 messy commits were successfully squashed into a single atomic commit!
git log --graph --oneline
```

## Step 3: Simulate and Resolve a Direct Merge Conflict

Force a direct text collision by modifying the exact same line of code differently across two branches, inspect the conflict markers, and resolve the merge cleanly.

```bash
# Jump back to the master main branch
git switch main

# Modify the server_port on line 1 to 9090 and commit
echo "server_port = 9090" > config.toml
git commit -am "fix: update server port to 9090 on main"

# Switch back to your feature branch
git switch feature/add-database

# Modify the server_port on line 1 to 7070 and commit
sed -i 's/server_port = 8080/server_port = 7070/g' config.toml
git commit -am "fix: update server port to 7070 on feature"

# Attempt to rebase your feature branch onto main to force a direct text collision!
git rebase main 2>/dev/null || true

# Inspect the active repository state to view your unmerged conflicting files
git status

# Inspect the raw plain-text content of config.toml to view your conflict markers!
cat config.toml

# Manually resolve the conflict by overwriting the file with clean, resolved text
echo -e "server_port = 9090\ndb_host = 'localhost'\ndb_port = 5432\ndb_name = 'production_ai'" > config.toml

# Mark the conflict as successfully resolved in the Git Index
git add config.toml

# Resume and complete the rebase operation
git rebase --continue 2>/dev/null || true

# Verify your pristine, perfectly linear commit history graph!
git log --graph --oneline
```

## Step 4: Configure a Custom Pre-commit Hook Script

Act as an elite Platform Engineer by creating a custom executable Git hook script in `.git/hooks/pre-commit` to intercept and block exposed secret keys.

```bash
# Create a custom pre-commit hook script to intercept commits containing 'PRIVATE_KEY'
cat << 'EOF' > .git/hooks/pre-commit
#!/bin/bash
echo "--- CUSTOM GIT HOOK: SCANNING FOR SECRETS ---"
if git diff --cached | grep -q "PRIVATE_KEY"; then
    echo "ERROR: Exposed Private Key detected in staged files!"
    echo "Commit forcefully aborted by pre-commit hook!"
    exit 1
fi
exit 0
EOF

# Make your custom Git hook script executable
chmod +x .git/hooks/pre-commit

# Create a test file containing an exposed private key string and stage it
echo "aws_secret = 'PRIVATE_KEY_987654321'" > secret.toml
git add secret.toml

# Attempt to commit the secret file to verify that your hook forcefully aborts the commit!
git commit -m "attempt to commit exposed secret key" 2>/dev/null || true

# Verify that the secret file remains uncommitted in your working directory
git status | grep "secret.toml"
```

## Step 5: Inspect Git Submodule Configuration Mechanics

Interact with submodule linkage mechanics by creating a demonstration `.gitmodules` file and verifying how Git bookmarks external repository commit hashes.

```bash
# Create a demonstration Git submodule configuration file (.gitmodules)
cat << 'EOF' > .gitmodules
[submodule "modules/aws-vpc"]
	path = modules/aws-vpc
	url = https://github.com/terraform-aws-modules/terraform-aws-vpc.git
EOF

# Stage the .gitmodules file and a clean test file
echo "aws_secret = 'CLEAN_KEY_NO_SECRETS'" > secret.toml
git add .gitmodules secret.toml

# Commit the clean files to verify that your pre-commit hook successfully passes!
git commit -m "feat(submodule): configure external AWS VPC submodule tracking"

# Inspect the final visual commit history graph of your lab repository!
git log --graph --oneline
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 05 capability statement (*"I understand how to track code changes, collaborate with engineering teams, resolve conflicts, and automate commit workflows"*), execute the following verification commands.

```bash
# Verify the active linear commit history contains your submodule commit
git log --oneline | head -n 1 | grep "feat(submodule)"

# Verify the presence and executability of your custom pre-commit hook script
[ -x .git/hooks/pre-commit ] && echo "Git Hook Verified: Executable"

# Verify the exact exit code of your most recently executed command
echo "Master Exit Code: $?"
```

**Expected Output:**
```text
[hash] feat(submodule): configure external AWS VPC submodule tracking
Git Hook Verified: Executable
Master Exit Code: 0
```
*If your terminal displays your `feat(submodule)` commit line, confirms `Git Hook Verified: Executable`, and successfully outputs `Master Exit Code: 0`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `git commit` during Step 4 completely ignores your hook script and successfully commits the secret file.
  * **Cause:** You forgot to make the hook script executable (`chmod +x .git/hooks/pre-commit`), or you created it in the wrong directory.
  * **Solution:** Verify the file path is exactly `.git/hooks/pre-commit` and run `chmod +x .git/hooks/pre-commit`, then reset the commit (`git reset --soft HEAD~1`) and retry.

* **Symptom:** `git rebase --continue` returns `fatal: no rebase in progress`.
  * **Cause:** Your manual text edit during Step 3 matched `main` exactly, or the rebase completed automatically.
  * **Solution:** Execute `git status` to verify your working directory is clean and check `git log --graph --oneline` to confirm your linear history.

* **Symptom:** `git switch` returns `git: 'switch' is not a git command`.
  * **Cause:** Your terminal sandbox is running an older version of Git (< 2.23) that lacks the modern `switch` command.
  * **Solution:** Use the legacy alternative command `git checkout -b feature/add-database` (to create) and `git checkout main` (to switch).

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup commands to remove the demonstration Git mastery lab directory.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Safely remove the demonstration Git mastery lab directory
rm -rf ~/git-mastery-lab 2>/dev/null || true
```
