# Working with Files, Directories & Basic Pipes (`mkdir`, `cp`, `mv`, `cat`, `grep`)

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-LINUX-BEG-07`
* **Module:** Getting Started with Linux (`MOD-LINUX-BEG`)
* **Difficulty:** Beginner
* **Estimated Duration:** 50 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson completes your foundational terminal training by teaching you how to actively create, organize, inspect, and filter files and directories within the Linux operating system. By mastering `mkdir`, `cp`, `mv`, `cat`, `grep`, and the foundational Unix pipe (`|`), you will completely fulfill the definitive promise of our module capability: **"I can install Linux, navigate the terminal, and manage files."**

---

# Learning Objectives

* Create single and deeply nested directory structures using `mkdir -p`.
* Copy (`cp`) and move/rename (`mv`) files and directories safely across the filesystem.
* View the complete contents of configuration files directly in the terminal using `cat`.
* Filter and search massive text streams for specific matching keywords using `grep` combined with the Unix pipe (`|`).

---

# Prerequisites

* Basic desktop computer literacy.
* Completion of `MOD-LINUX-BEG-06` (First Commands & Getting Help).

---

# Why This Exists

In the preceding lessons, we learned how to set up our terminal, inspect our prompt, and navigate through existing folders using `cd` and `ls`. However, navigation alone is passive. As a Platform Engineer, you must actively build and configure systems. You need to create folder structures for new microservices, copy configuration templates, rename log files, and search through massive output logs to find error messages.

In a desktop GUI, you achieve this by dragging and dropping folder icons or pressing `Ctrl + F` in a word processor. In a headless Linux server, you achieve this using **Core File Management Utilities** (`mkdir`, `cp`, `mv`, `cat`) and the legendary **Unix Pipe (`|`)**.

The Unix Pipe, invented by Douglas McIlroy in 1973, is one of the most powerful concepts in computer science. It allows you to take the output text of one command and instantly "pipe" (channel) it as the input text into a second command. This allows you to combine tiny, simple tools together to perform incredibly complex filtering and data wrangling instantly!

---

# Core Concepts

## 1. Creating Folders (`mkdir`)
`mkdir` stands for **Make Directory**. It creates brand-new folders in your filesystem.
* **The `-p` Flag (Parents):** By default, `mkdir` cannot create a folder inside another folder if the parent folder doesn't exist yet. Adding `-p` tells Linux to automatically create all necessary parent folders in a single command (e.g., `mkdir -p app/src/config`).

## 2. Copying and Moving Files (`cp` and `mv`)
* `cp [source] [destination]`: **Copy** creates an exact duplicate of a file. To copy an entire folder and all the files inside it, you must add the `-r` (recursive) flag: `cp -r original_folder backup_folder`.
* `mv [source] [destination]`: **Move** moves a file to a new location. In Linux, `mv` is also the official command used to **rename** files! Moving a file from `old_name.txt` to `new_name.txt` in the same directory instantly renames it.

## 3. Viewing File Contents (`cat`)
`cat` stands for **Concatenate**. When you pass a file name to `cat`, it instantly reads the entire file and prints its contents directly to your terminal screen (e.g., `cat /etc/os-release`).

## 4. Searching Text & The Unix Pipe (`grep` and `|`)
* `grep [keyword] [file]`: **Global Regular Expression Print**. `grep` searches through text files and prints only the specific lines that contain your matching keyword.
* `|` (The Pipe): The vertical bar character (located above the Enter key on most keyboards). It takes the text output of the command on the left and channels it directly into the command on the right!

```text
cat /var/log/syslog | grep "error"
```
*In this beautiful pipeline, `cat` reads a massive 10,000-line system log file, but instead of flooding your screen, the pipe (`|`) catches the text and hands it to `grep`, which filters out everything except the exact lines containing the word "error"!*

---

# Architecture

```mermaid
flowchart LR
    classDef userSpace fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px,color:#000000;
    classDef kernelSpace fill:#e8f5e9,stroke:#43a047,stroke-width:2px,color:#000000;
    classDef hardware fill:#fff3e0,stroke:#fb8c00,stroke-width:2px,color:#000000;

    FILE[Log File on Disk]:::hardware -->|Read via VFS| CAT["cat (Process 1)"]:::userSpace
    
    subgraph KernelIPC [Kernel Space: IPC]
        PIPE[In-Memory Pipe Buffer]:::kernelSpace
    end
    
    CAT -->|Writes stdout| PIPE
    PIPE -->|Reads stdin| GREP["grep 'error' (Process 2)"]:::userSpace
    GREP -->|Writes stdout| SCREEN[Terminal Display]:::hardware
```

---

# Real-World Example

Imagine you are managing a Kubernetes cluster powering an enterprise banking application. A user reports that their payment failed at 10:14 AM. The payment microservice generates over 50,000 lines of log text every minute.

If you tried to open that massive log file in a graphical text editor like Notepad, the computer would freeze and crash. 

Instead, using your masterful terminal piping skills, you execute `cat payment_service.log | grep "10:14" | grep "FAILED"`. Within milliseconds, Linux filters out the 50,000 irrelevant lines and prints the exact single line containing the customer's failure root cause!

---

# Hands-on Demonstration

Let's look at how an engineer executes these core file management and piping commands to create a project structure and filter configuration text.

## Input 1: Creating Nested Directories and Copying Files
We create a deeply nested folder structure using `mkdir -p`, create a test file using `echo`, and make a backup copy using `cp`.

## Code 1
```bash
# Create a nested directory structure for a new microservice.
mkdir -p app/src/config

# Create a sample configuration file containing two lines of text.
echo "PORT=8080" > app/src/config/settings.env
echo "DEBUG_MODE=false" >> app/src/config/settings.env

# Make a backup copy of the configuration file.
cp app/src/config/settings.env app/src/config/settings.env.backup
```

## Expected Output 1
```text
[Commands execute silently with zero errors, returning cleanly to the prompt]
```

## Explanation 1
Notice how elegantly Linux handles this! In Linux, the general rule is "no news is good news." If a command like `mkdir` or `cp` succeeds perfectly, it executes silently without cluttering your screen with popup messages. Notice our use of the `>` (redirect) symbol to write text into a file, and `>>` to append a second line!

---

## Input 2: Inspecting and Filtering File Contents
We use `cat` to view our backup file, and then use `cat` combined with `| grep` to filter for a specific setting.

## Code 2
```bash
# Use 'cat' to view the entire contents of the backup configuration file.
cat app/src/config/settings.env.backup

# Use 'cat' piped into 'grep' to search specifically for the PORT setting.
cat app/src/config/settings.env.backup | grep "PORT"
```

## Expected Output 2
```text
PORT=8080
DEBUG_MODE=false

PORT=8080
```

## Explanation 2
Look at how beautifully this functions! The first `cat` command prints both lines of our file. In the second command, the pipe (`|`) catches the text and feeds it to `grep "PORT"`, which perfectly filters out the `DEBUG_MODE` line and prints only `PORT=8080`!

---

# Hands-on Lab

* **Objective:** Create directory structures, manage files, and execute terminal pipelines.
* **Estimated Time:** 20 minutes
* **Difficulty:** Beginner
* **Environment:** Interactive Browser Terminal / Local Sandbox

## Step-by-step Instructions

1. Open your terminal sandbox.
2. Type `mkdir -p my-platform/config` to create a nested project folder.
3. Type `echo "SERVER_STATUS=active" > my-platform/config/prod.env` to create a configuration file.
4. Type `cp my-platform/config/prod.env my-platform/config/backup.env` to create a backup copy.
5. Type `mv my-platform/config/backup.env my-platform/config/old_backup.env` to rename the backup file.
6. Type `cat my-platform/config/old_backup.env | grep "SERVER"` to filter the file contents using a pipe.

## Verification

```bash
ls -la my-platform/config/
cat my-platform/config/old_backup.env | grep "SERVER"
```
*If your directory contains both `prod.env` and `old_backup.env`, and your pipe outputs `SERVER_STATUS=active`, you have mastered Linux file management!*

## Troubleshooting

* **Issue:** `cp` returns `cp: -r not specified; omitting directory`.
* **Solution:** You attempted to copy an entire folder rather than a single file. You must add the `-r` (recursive) flag: `cp -r folder1 folder2`.

## Cleanup

```bash
# Safely remove the demonstration folder structure when finished
rm -rf my-platform
```

---

# Production Notes

In enterprise cloud environments, Platform Engineers combine `grep` with advanced command-line text processing utilities like `awk`, `sed`, and `jq`. For example, when querying live Kubernetes APIs or AWS cloud infrastructure, the output is frequently returned as massive JSON strings. Engineers construct elegant terminal pipelines (e.g., `kubectl get pods -o json | jq '.items[].metadata.name' | grep "ai-service"`) to parse, filter, and isolate failing cloud containers in milliseconds.

---

# Common Mistakes

* **Overwriting Files Accidentally with `cp` or `mv`:** By default, if you copy or move a file to a destination where a file with the exact same name already exists, Linux will silently overwrite the existing file without asking for confirmation! To prevent this, you can add the `-i` (interactive) flag (`cp -i file1 file2`), which forces Linux to ask `overwrite file2? (y/n)`.
* **Confusing `>` (Overwrite) with `>>` (Append):** When redirecting text into a file, `>` will completely wipe out the existing file and overwrite it with your new text. `>>` (two arrows) will safely append your new text to the very bottom of the existing file.

---

# Failure-Driven Learning

Imagine a junior engineer attempts to view a massive 5 Gigabyte compiled binary application file using `cat`.

## Simulated Failure
```bash
# Attempting to 'cat' a compiled binary executable file in the terminal
cat /bin/bash
```

## Output
```text
[Terminal floods with thousands of bizarre, screaming gibberish characters, bells beep, screen font breaks...]
^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@^@
```

## Diagnosis & Recovery
Why did this happen? `cat` is designed to print raw text files. `/bin/bash` is a compiled binary executable file containing raw machine code (ones and zeros). When `cat` forces the terminal to print machine code, the terminal interprets the electrical signals as bizarre control characters, corrupting your screen fonts! To recover, press **Ctrl + C** to kill the output, and then type `reset` and press Enter to restore your terminal to a pristine, uncorrupted state.

---

# Engineering Decisions

## Monolithic Tools vs. The Unix Philosophy
When designing software architecture, engineering leaders must choose between monolithic applications and modular microservices.
* **Monolithic Applications:** Build one massive software program that tries to do everything (file browsing, editing, compiling, searching). If one feature breaks, the entire application crashes.
* **The Unix Philosophy (Pipes):** Build tiny, razor-sharp tools (`cat`, `grep`, `mkdir`) that do exactly one thing perfectly, and stitch them together using standard text streams (`|`). 
* **The Platform Decision:** Modern microservice architecture and Kubernetes engineering are direct spiritual descendants of this classic Unix Pipe philosophy!

---

# Best Practices

* **Always use `mkdir -p`:** Save yourself from frustrating `No such file or directory` errors by making `-p` your default habit when creating directories.
* **Filter Early in Pipelines:** When constructing complex terminal pipelines, put your `grep` filters as early in the chain as possible to reduce the amount of text being passed to downstream commands.

---

# Troubleshooting Guide

## Issue 1: "Device or Resource Busy" / File Lock Errors

* **Cause:** You attempt to `mv` or delete a file/directory, but Linux rejects the operation.
* **Diagnosis:** The terminal returns `mv: cannot move 'app.log': Device or resource busy`.
* **Solution:** Another active software process (such as a running Python script or database daemon) is actively writing to `app.log`. Use the `lsof` (list open files) command (`lsof app.log`) to identify which process ID is locking the file, and gracefully stop that service before moving the file.

---

# Summary

* `mkdir -p` creates single or deeply nested folder structures in a single clean command.
* `cp` copies files (and folders using `-r`), while `mv` moves or renames files.
* `cat` reads and prints the entire contents of text configuration files to the terminal screen.
* `grep` searches text for specific keywords, and the **Unix Pipe (`|`)** elegantly chains commands together, passing output text directly into input streams.
* You have successfully achieved our complete Module 01 capability: **"I can install Linux, navigate the terminal, and manage files."**

---

# Cheat Sheet

```bash
# Create a deeply nested directory structure
mkdir -p app/src/config

# Copy a single file
cp source_file.txt backup_file.txt

# Copy an entire folder and all its contents recursively
cp -r original_folder/ backup_folder/

# Move or rename a file
mv old_name.txt new_name.txt

# Print the entire contents of a file to the screen
cat /etc/os-release

# Search a file for a specific keyword
grep "error" /var/log/syslog

# Pipe the output of cat directly into grep to filter text
cat config.env | grep "PORT"
```

---

# Knowledge Check

## Multiple Choice Questions

1. You want to search through a massive configuration file named `database.yml` to find the exact line where the `PASSWORD` setting is defined. Which command pipeline achieves this perfectly?
   * A) `mkdir database.yml | cp PASSWORD`
   * B) `cat database.yml | grep "PASSWORD"`
   * C) `mv database.yml PASSWORD`
   * D) `pwd | ls database.yml`

## Scenario Questions

You are writing an automated onboarding script for new developers. The script needs to create a directory named `/opt/platform/certs`, but you don't know if `/opt/platform` already exists on their machine. If it doesn't exist, a standard `mkdir` command will fail and crash the script. Based on what you learned in this lesson, how do you write the `mkdir` command so that it succeeds perfectly regardless of whether the parent folders exist?

## Short Answer Questions

Explain the concept of the Unix Pipe (`|`) in your own words and describe why it is a powerful feature for Platform Engineers.

<details>
<summary><b>View Answers</b></summary>

### Multiple Choice
1. **B** - `cat` reads the entire file, and the pipe (`|`) feeds that output directly to `grep`, which filters and displays only the lines containing "PASSWORD".

### Scenario
Use `mkdir -p /opt/platform/certs`. The `-p` (parents) flag tells Linux to automatically create any missing parent directories and ignore errors if they already exist.

### Short Answer
The Unix Pipe takes the text output of one command and channels it directly as the input to a second command. This allows engineers to combine small, simple commands to perform complex text processing and filtering instantly.

</details>

---

# Interview Preparation

## Beginner Questions

* What does `mkdir -p` do?
* How do you rename a file in Linux using the command line?
* What is the purpose of the `grep` command?

## Intermediate Questions

* Explain the difference between the `>` redirect symbol and the `>>` append symbol.
* Why is it dangerous to use `cp` or `mv` without the `-i` (interactive) flag in production environments?

## Advanced Questions

* How does the Linux kernel manage standard input (`stdin`), standard output (`stdout`), and standard error (`stderr`) file descriptors (0, 1, 2) when executing a pipeline like `cat file.txt 2>&1 | grep error`?

## Scenario-Based Discussions

* Discuss the architectural parallels between the classic Unix Pipe philosophy (chaining small CLI tools together) and modern event-driven microservice architectures (chaining small containerized services together via message queues).

---

# Further Reading

1. [The Unix Programming Environment (Classic Book by Kernighan & Pike)](https://en.wikipedia.org/wiki/The_Unix_Programming_Environment)
2. [GNU Grep Official Manual](https://www.gnu.org/software/grep/manual/grep.html)
3. [Linux Pipes and Redirection (Linux Foundation)](https://www.linuxfoundation.org/)
4. [Mastering the Linux CLI (Red Hat)](https://www.redhat.com/en/topics/linux)
5. [Bash Guide for Beginners (Documentation)](https://tldp.org/LDP/Bash-Beginners-Guide/html/)
