# Bash Scripting Fundamentals (Variables, Loops, Conditionals & Execution)

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-LINUX-ADM-07`
* **Module:** Linux Administration (`MOD-LINUX-ADM`)
* **Difficulty:** Beginner
* **Estimated Duration:** 50 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson unlocks the foundational automation engine of the Linux operating system, exploring how Linux combines individual terminal commands, logical conditionals, loops, and variables into powerful, executable plain-text scripts. By mastering Bash scripting fundamentals, you will fully complete the definitive promise of our module capability: **"I can administer a Linux server, manage permissions, automate simple tasks, and troubleshoot common issues."**

---

# Learning Objectives

* Define what a Bash Script is and explain the architectural role of the Shebang (`#!/bin/bash`).
* Declare, assign, and reference internal variables and system environment variables (`$VAR`).
* Implement logical decision-making workflows using `if / elif / else` conditional statements and exit codes (`$?`).
* Construct automated iterative workflows using `for` and `while` loops.
* Write, secure (`chmod +x`), and execute a production-ready system backup automation script.

---

# Prerequisites

* Completion of `MOD-LINUX-ADM-01` through `MOD-LINUX-ADM-06`.
* Foundational terminal administration skills (`chmod`, `mkdir`, `cp`, `grep`).

---

# Why This Exists

In the preceding lessons of Module 01 and Module 02, you have developed an elite toolkit of Linux administrative capabilities. You know how to create nested directories (`mkdir -p`), copy files (`cp`), inspect active processes (`ps aux`), manage systemd daemons (`systemctl`), test network ports (`ss`), and install software packages (`apt`). 

However, typing these individual commands one-by-one into a terminal prompt is a manual, slow, and error-prone process. If you are a Platform Engineer tasked with setting up a brand-new cloud server, you cannot sit at your keyboard and manually type out fifty separate commands in sequence. If you make a single typo on command number twenty-seven, the entire server setup breaks.

To solve the ultimate challenge of operational scaling, Unix and Linux provide the legendary **Bash Scripting Engine**. A Bash script is simply a plain-text file containing a list of terminal commands combined with programming logic (variables, loops, conditionals). By packaging your manual terminal commands into an executable script, you create a permanent, reusable, and perfectly reproducible automation blueprint that can configure ten thousand servers in seconds!

---

# Core Concepts

## 1. The Cookbook Selection (`#!/bin/bash`)
The very first line of every professional recipe (Bash script) must contain a special marker called the **Shebang** (`#!`).
* `#!/bin/bash`: This tells the kitchen exactly which cookbook language you are writing in. If you leave this out, the kitchen might try to read your recipe using the wrong language and completely ruin the meal!

## 2. The Ingredients (Variables and Quotation Mechanics)
Variables are just labeled containers holding your ingredients (text strings or numbers).
* **Assignment (Putting ingredients in the bowl):** `BACKUP_DIR="/var/backups"` *(Note: In Bash, there must be absolutely **zero spaces** around the equals sign!)*
* **Referencing (Using the ingredients):** To pour the ingredient out, you put a dollar sign in front: `echo "Backing up to $BACKUP_DIR"`.
* **Single vs. Double Quotes:**
  * `echo "$VAR"` (Double Quotes): **The Blender.** Bash looks inside and blends the real ingredient into your sentence.
  * `echo '$VAR'` (Single Quotes): **The Sticker.** Bash just prints the literal letters "$VAR" like a sticker on the container.

## 3. The Taste Test (Conditionals and Exit Codes `$?`)
Every time a step finishes, it leaves behind a hidden rating called an **Exit Code**, tracked by the special variable `$?`.
* **Exit Code `0`:** Yum! The step completed flawlessly.
* **Exit Code `1 - 255`:** Yuck! Something burned or went wrong (e.g., file not found).
* **`if / else` Statements:** We use these ratings to make kitchen decisions:

```bash
if [ -d "/var/log" ]; then
    echo "Pantry exists!"
else
    echo "Pantry missing!"
fi
```
*(Note: In Bash conditional brackets `[ ]`, there must be a mandatory **blank space** after the opening bracket and before the closing bracket!)*

## 4. Stirring Repeatedly (Loops)
When you need to perform the exact same action on fifty different ingredients, you use a loop.
* **`for` Loop:** Repeats an action for a specific list of items.

```bash
for SERVER in "web-01" "web-02" "web-03"; do
    echo "Deploying to $SERVER"
done
```

## 5. Getting Kitchen Clearance (`chmod +x`)
When you write a brand-new recipe card (e.g., `backup.sh`), Linux sees it as just a harmless piece of paper. If you attempt to cook it using `./backup.sh`, the kitchen bouncer will block you with `Permission denied`. You must stamp it as an approved recipe using `chmod +x backup.sh` before you are allowed to cook!

---

# Architecture

```mermaid
flowchart TD
    subgraph ScriptCreation [Writing the Recipe (Script Architecture)]
        SHEBANG["The Cookbook Selection (#!/bin/bash)"] --> VARS["The Ingredients (Variables)"]
        VARS --> COND["The Taste Test (If/Else Conditionals)"]
        COND --> LOOP["Stirring Repeatedly (Loops)"]
    end

    subgraph ExecutionEngine [Cooking the Meal (Execution Mechanics)]
        SCRIPT[The Recipe Card] -->|Getting Kitchen Clearance (chmod +x)| EXEC["Start Cooking (./script.sh)"]
        EXEC --> EXIT["The Final Taste (Exit Code: 0 for Yum, 1 for Yuck)"]
    end
```

---

# Real-World Example

Imagine you are a Site Reliability Engineer managing an enterprise Postgres database cluster. You need to create an automated daily backup script that verifies if the backup storage directory exists, creates a timestamped archive of the database, logs the success message to the system journal, and exits cleanly.

Instead of performing this backup manually every night at midnight, you write a pristine Bash script named `pg_backup.sh` containing your variables, `if/else` directory checks, and `cp` commands. You secure the file with `chmod +x pg_backup.sh` and configure a systemd timer (or cron job) to execute it automatically every night at 12:00 AM. Your database backups execute flawlessly and reproducibly every single night while you sleep!

---

# Hands-on Demonstration

Let's look at how an engineer writes a complete, production-ready system backup automation script containing variables, conditionals, and loops, secures its permissions, and executes it.

## Input 1: Authoring the Automation Script
We use `cat` combined with a heredoc (`<< 'EOF'`) to create a complete, multi-line Bash automation script named `automated_backup.sh`.

## Code 1
```bash
# Create a production-ready backup automation script using cat heredoc.
cat << 'EOF' > automated_backup.sh
#!/bin/bash

# Define system variables
BACKUP_ROOT="$HOME/backup_archive"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TARGET_DIR="$BACKUP_ROOT/backup_$TIMESTAMP"

# Conditional check: Verify if the master backup root directory exists
if [ ! -d "$BACKUP_ROOT" ]; then
    echo "Backup root missing. Creating $BACKUP_ROOT..."
    mkdir -p "$BACKUP_ROOT"
else
    echo "Backup root $BACKUP_ROOT already exists."
fi

# Create the timestamped target directory
mkdir -p "$TARGET_DIR"
echo "Starting automated file backup to $TARGET_DIR..."

# For loop: Iterate over essential configuration files and copy them
for CONFIG_FILE in ".bashrc" ".bash_logout"; do
    if [ -f "$HOME/$CONFIG_FILE" ]; then
        cp "$HOME/$CONFIG_FILE" "$TARGET_DIR/"
        echo "Successfully backed up $CONFIG_FILE"
    else
        echo "Warning: $CONFIG_FILE not found in home directory."
    fi
done

echo "Backup automation completed successfully! Exit code: $?"
EOF
```

## Expected Output 1
```text
[Script file created silently with zero errors, returning cleanly to the prompt]
```

## Explanation 1
Look at how beautifully structured this script is! Let's deconstruct the core mechanics:
* `#!/bin/bash`: The mandatory shebang interpreter line.
* `TIMESTAMP=$(date ...)`: We use command substitution `$( )` to execute the `date` command and store its dynamic timestamp text directly into a variable!
* `if [ ! -d ... ]`: We use the exclamation mark (`!`) to mean **NOT**. If the directory does *not* exist, `mkdir -p` creates it!
* `for CONFIG_FILE in ...`: The loop elegantly iterates over our system files, copying each one securely into our timestamped archive directory!

---

## Input 2: Securing Permissions and Executing the Script
We inspect the default permissions of our script, unlock execute permissions using `chmod +x`, execute the script, and verify the exit code.

## Code 2
```bash
# Verify the default permissions of the newly created script file.
ls -l automated_backup.sh

# Unlock execute permissions (+x) for the script.
chmod +x automated_backup.sh
ls -l automated_backup.sh

# Execute the automation script.
./automated_backup.sh

# Verify the master exit code of our script execution.
echo "Master Exit Code: $?"
```

## Expected Output 2
```text
-rw-r--r-- 1 aloysius aloysius 748 Jun 28 04:45 automated_backup.sh
-rwxr-xr-x 1 aloysius aloysius 748 Jun 28 04:45 automated_backup.sh
Backup root missing. Creating /home/aloysius/backup_archive...
Starting automated file backup to /home/aloysius/backup_archive/backup_20260628_044500...
Successfully backed up .bashrc
Successfully backed up .bash_logout
Backup automation completed successfully! Exit code: 0
Master Exit Code: 0
```

## Explanation 2
Notice how perfectly this executes! `chmod +x` changes our permission string to `-rwxr-xr-x`. When we execute `./automated_backup.sh`, the script dynamically detects that `backup_archive` is missing, creates it, creates the timestamped folder, iterates through the `for` loop, and copies both configuration files perfectly! `Master Exit Code: 0` confirms flawless, pristine execution!

---

# Hands-on Lab

* **Objective:** Author a Bash automation script containing variables, conditionals, and loops, secure its permissions, and execute it.
* **Estimated Time:** 20 minutes
* **Difficulty:** Beginner
* **Environment:** Interactive Browser Terminal / Local Sandbox

## Step-by-step Instructions

1. Open your terminal sandbox.
2. Type `echo '#!/bin/bash' > verify_system.sh` to initialize a script with a shebang.
3. Type `echo 'echo "Active User: $USER"' >> verify_system.sh` to append a variable check.
4. Type `echo 'if [ -d "/tmp" ]; then echo "Temp directory healthy!"; fi' >> verify_system.sh` to append a conditional check.
5. Type `echo 'for APP in "curl" "git"; do which $APP; done' >> verify_system.sh` to append a loop check.
6. Type `chmod +x verify_system.sh` to unlock execute permissions.
7. Type `./verify_system.sh` to execute your automated verification script.

## Verification

```bash
ls -l verify_system.sh
./verify_system.sh
```
*If your terminal confirms `-rwxr-xr-x` and successfully outputs your active user, temp directory health, and binary paths, you have mastered Bash scripting!*

## Troubleshooting

* **Issue:** `./verify_system.sh` returns `bash: ./verify_system.sh: /bin/bash^M: bad interpreter: No such file or directory`.
* **Solution:** You created or edited the script on a Windows machine, which inserted invisible Windows carriage return characters (`\r\n`) into the shebang line! Execute `dos2unix verify_system.sh` (or `sed -i -e 's/\r$//' verify_system.sh`) to strip away the Windows characters and restore pristine Linux line endings (`\n`).

## Cleanup

```bash
# Safely remove the demonstration script and backup directories when finished
rm -f automated_backup.sh verify_system.sh
rm -rf ~/backup_archive
```

---

# Production Notes

In enterprise infrastructure automation (such as Terraform `local-exec` provisioners or GitHub Actions CI/CD workflows), Platform Engineers strictly enforce robust error handling inside Bash scripts by adding the master safety command `set -euo pipefail` immediately after the shebang line (`#!/bin/bash`). 
* `-e`: Instantly aborts the script if any command returns a non-zero exit code!
* `-u`: Instantly aborts the script if it attempts to reference an undefined variable!
* `-o pipefail`: Instantly aborts the script if any command within a pipe (`cat file | grep`) fails!
This guarantees your automation scripts fail fast and cleanly, preventing partial deployments and corrupted cloud states.

---

# Common Mistakes

* **Spaces Around the Equals Sign in Variables:** Beginners instinctively type `MY_VAR = "hello"` with spaces around the equals sign. Bash will interpret `MY_VAR` as a terminal command and fail with `command not found`. You must remove all spaces: `MY_VAR="hello"`.
* **Missing Spaces Inside Conditional Brackets `[ ]`:** Typing `if [-d "/tmp"]; then` without spaces inside the brackets will fail with `[-d: command not found`. You must include mandatory blank spaces after `[` and before `]`: `if [ -d "/tmp" ]; then`.

---

# Failure-Driven Learning

Imagine a junior engineer writes an automated deployment script that attempts to reference a directory variable, but makes a severe typo in the variable name.

## Simulated Failure
```bash
# Writing a script with an undefined variable typo
cat << 'EOF' > bad_deploy.sh
#!/bin/bash
set -u # Abort on undefined variables

DEPLOY_DIR="/opt/my-app"
echo "Deploying application to $DEPOY_DIR..." # Severe typo in variable name!
cp app.py "$DEPOY_DIR/"
EOF

chmod +x bad_deploy.sh
./bad_deploy.sh
```

## Output
```text
./bad_deploy.sh: line 5: DEPOY_DIR: unbound variable
```

## Diagnosis & Recovery
Why did this fail? Because the engineer included the professional safety flag `set -u` (abort on unbound variables), Bash caught the misspelled variable name (`$DEPOY_DIR` instead of `$DEPLOY_DIR`) and forcefully aborted the script before executing the `cp` command! If `set -u` had been omitted, Bash would have silently evaluated `$DEPOY_DIR` as a completely empty string (`""`), causing `cp app.py ""` to fail or copy the file to an unintended root location! To recover, the engineer must correct the variable spelling typo to `$DEPLOY_DIR` and re-run the script.

---

# Engineering Decisions

## Bash Scripting vs. Python / Go Automation
When architecting an enterprise internal developer platform, engineering leaders must decide which programming languages to use for automation tooling.
* **Bash Scripting:** Extremely fast, lightweight, pre-installed on literally every Linux machine, and perfect for short linear tasks (setting up base images, launching daemons, wrapping CLI tools). However, it lacks advanced data structures (like classes or complex dictionaries) and becomes difficult to maintain beyond 200 lines.
* **Python / Go Automation:** Excellent for massive, highly complex automation frameworks requiring robust error handling, REST API interactions, and complex data parsing. However, they require external runtime runtimes and package dependencies.
* **The Platform Decision:** Platform Engineers mandate Bash scripting for container entrypoints, base image setup, and simple automation pipelines (<200 lines), while escalating to Python or Go for complex cloud infrastructure tooling.

---

# Best Practices

* **Always Use `set -euo pipefail`:** Make it your absolute mandatory habit to place `set -euo pipefail` immediately after `#!/bin/bash` in every production automation script you write.
* **Wrap Variables in Double Quotes:** Always wrap your variable references in double quotes (e.g., `mkdir -p "$TARGET_DIR"`) to prevent the script from breaking if the variable text contains blank spaces!

---

# Troubleshooting Guide

## Issue 1: "bad interpreter: No such file or directory" (`\r` Windows Carriage Return)

* **Cause:** You authored or edited your Bash script using a Windows text editor (like Notepad), which silently injected invisible Windows carriage return characters (`\r\n`) into the file.
* **Diagnosis:** When you attempt to execute `./script.sh`, the terminal aborts with `bash: ./script.sh: /bin/bash^M: bad interpreter: No such file or directory`.
* **Solution:** The Linux kernel attempted to find a shell interpreter named `/bin/bash\r`, which does not exist! Execute `dos2unix script.sh` (or `sed -i -e 's/\r$//' script.sh`) to instantly strip away the Windows carriage returns and restore pristine Linux line endings.

---

# Summary

* The **Shebang** (`#!/bin/bash`) commands the Linux kernel to use the correct shell interpreter to execute your script.
* **Variables** store dynamic text strings (`VAR="value"`) and are interpolated using double quotes (`echo "$VAR"`).
* **Exit Codes** (`$?`) track command success (`0`) vs failure (`1-255`), powering logical decision-making in `if / else` conditional statements.
* **Loops** (`for`, `while`) automate iterative, repetitive tasks across files and servers.
* `chmod +x` unlocks execute permissions, empowering Platform Engineers to package manual terminal workflows into permanent, reproducible automation scripts.
* You have successfully achieved our complete Module 02 capability: **"I can administer a Linux server, manage permissions, automate simple tasks, and troubleshoot common issues."**

---

# Cheat Sheet

```bash
# Mandatory script header with professional safety flags
#!/bin/bash
set -euo pipefail

# Declare and assign a variable (ZERO spaces around equals sign)
BACKUP_DIR="/var/backups"

# Reference a variable with double quote interpolation
echo "Storing files in $BACKUP_DIR"

# Verify the exit code of the most recently executed command
echo "Exit code: $?"

# Conditional check: Verify if a directory exists
if [ -d "/tmp" ]; then
    echo "Directory exists"
fi

# Conditional check: Verify if a file exists
if [ -f "/etc/passwd" ]; then
    echo "File exists"
fi

# For loop: Iterate over a list of items
for SERVER in "app-01" "app-02"; do
    echo "Restarting $SERVER"
done

# Unlock execute permissions for a script file
chmod +x myscript.sh

# Execute a script located in your current working directory
./myscript.sh

# Strip away invisible Windows carriage return characters from a script
dos2unix myscript.sh
```

---

# Knowledge Check

## Multiple Choice Questions

1. You are authoring a production backup script and want to ensure the script instantly aborts if any command returns an error or if an undefined variable is referenced. Which master safety command line do you place immediately after `#!/bin/bash`?
   * A) `chmod 777 backup.sh`
   * B) `set -euo pipefail`
   * C) `systemctl enable backup.service`
   * D) `apt install -y bash-safety`

## Scenario Questions

You are reviewing a pull request submitted by a junior developer containing a new Bash script named `clean_logs.sh`. You notice the developer wrote the variable assignment as `LOG_DIR = "/var/log"` and wrote the conditional statement as `if [-d "$LOG_DIR"]; then`. Based on what you learned in this lesson, what two severe syntax errors will cause this script to crash instantly, and how do you instruct them to correct the code?

## Short Answer Questions

Explain the exact architectural purpose of the Shebang (`#!/bin/bash`) at the very top of a Bash script file.

<details>
<summary><b>View Answers</b></summary>

### Multiple Choice
1. **B** - `set -euo pipefail` enforces strict mode, causing the script to exit immediately on errors, unset variables, or pipeline failures.

### Scenario
1. Bash prohibits spaces around the assignment operator. It must be `LOG_DIR="/var/log"`.
2. The `[` command requires surrounding whitespace. It must be `if [ -d "$LOG_DIR" ]; then`.

### Short Answer
The Shebang instructs the Linux kernel exactly which interpreter binary (in this case, `/bin/bash`) should be invoked to parse and execute the file's contents.

</details>

---

# Interview Preparation

## Beginner Questions

* What is a shebang in Bash scripting?
* How do you unlock execute permissions for a script file?
* What does an exit code of `0` indicate versus an exit code of `1`?

## Intermediate Questions

* Explain the difference between single quotes (`echo '$VAR'`) and double quotes (`echo "$VAR"`).
* What do the flags `-e`, `-u`, and `-o pipefail` achieve in the `set -euo pipefail` command?

## Advanced Questions

* Explain how the Linux kernel handles the `execve` system call when executing a script file starting with `#!/bin/bash`, and how it passes the script file path as an argument to the interpreter binary.

## Scenario-Based Discussions

* Discuss the operational trade-offs of building extensive internal platform deployment tooling entirely in Bash versus migrating the tooling to Go or Python in a rapidly scaling enterprise organization.

---

# Further Reading

1. [GNU Bash Official Reference Manual](https://www.gnu.org/software/bash/manual/)
2. [Bash Scripting Guide for Beginners (Linux Handbook)](https://linuxhandbook.com/)
3. [Unofficial Bash Strict Mode (`set -euo pipefail`)](http://redsymbol.net/articles/unofficial-bash-strict-mode/)
4. [Mastering Linux Exit Codes (DigitalOcean Tutorial)](https://www.digitalocean.com/)
5. [ShellCheck - A Static Analysis Tool for Shell Scripts](https://www.shellcheck.net/)
