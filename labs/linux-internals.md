# Standalone Verification Lab: Linux Internals, Tracing & Container Foundations

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of Linux kernel ring architecture, system call tracing (`strace`), process file descriptor inspection (`lsof`), cgroup resource limiting, and kernel namespace isolation (`unshare`).

Required Inputs: Associated lesson (`MOD-LINUX-INT`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-LINUX-INT-01`
* **Associated Lesson:** Module 03 (`MOD-LINUX-INT`: Linux Internals)
* **Objective:** Audit User vs Kernel CPU space, trace active application system calls (`strace`), inspect open Virtual Filesystem file descriptors (`lsof`), configure a custom cgroup memory boundary in `/sys/fs/cgroup`, and create a container from scratch using kernel namespaces (`unshare`).
* **Estimated Time:** 40 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of `MOD-LINUX-INT-01` through `MOD-LINUX-INT-07`.
* A functional Linux terminal environment (WSL2, Dedicated Virtual Machine, or Cloud Shell) with root/sudo authorization and Cgroups v2 support.

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox, verify your administrative privileges, and ensure essential debugging utilities (`strace`, `lsof`) are installed.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your active User ID (UID) and administrative sudo privileges
id
sudo -l

# Ensure essential internal debugging utilities are successfully installed
sudo apt update && sudo apt install -y strace lsof procps
```

---

# Step-by-Step Instructions

## Step 1: Audit System CPU Modes and Memory Architecture

Execute an internal health audit by capturing CPU time spent in User Space (`us`) vs Kernel Space (`sy`), and inspect physical RAM and Swap allocations.

```bash
# Capture a single batch snapshot of system CPU execution modes using top
top -b -n 1 | grep "%Cpu"

# Verify physical RAM, buffers, caches, and swap space in human-readable format
free -h

# Inspect detailed kernel swap memory tables directly from the /proc filesystem
cat /proc/meminfo | grep -E "SwapTotal|SwapFree"
```

## Step 2: Trace System Calls and Library Dependencies

Act as an internal systems debugger by intercepting live application system calls and inspecting dynamic shared library dependency trees.

```bash
# Intercept and display the exact underlying system calls executed by 'echo'
# We filter specifically for the write system call transitioning to Ring 0
strace echo "Tracing Kernel System Calls in Lab!" 2>&1 | grep "write"

# Inspect the dynamic shared library dependency tree of the 'cat' binary
ldd /bin/cat | grep "libc.so"
```

## Step 3: Inspect Inodes and File Descriptors

Verify the Unix "everything is a file" philosophy by inspecting underlying file inodes, process file descriptor symlinks, and attached PIDs.

```bash
# Identify the exact underlying kernel Inode number of the /etc/passwd file
ls -i /etc/passwd

# Identify your active Bash terminal Process ID (PID)
echo "Active Shell PID: $$"

# Inspect the raw kernel file descriptor symlink table for your active shell
ls -l /proc/$$/fd

# Use lsof to inspect exactly which PIDs are attached to your terminal screen
sudo lsof /dev/pts/0 2>/dev/null || sudo lsof /dev/tty
```

## Step 4: Configure a Custom Cgroup and Memory Limit

Interact with the Cgroups v2 unified hierarchy in `/sys/fs/cgroup` to establish a strict physical memory boundary around a running process.

```bash
# Verify if the server is running Cgroups v2 (returns cgroup2fs)
stat -fc %T /sys/fs/cgroup/

# Create a brand-new custom cgroup directory named 'platform_lab_cg'
sudo mkdir -p /sys/fs/cgroup/platform_lab_cg

# Configure a strict 200-Megabyte physical memory limit (200 * 1024 * 1024 = 209715200 bytes)
sudo sh -c "echo 209715200 > /sys/fs/cgroup/platform_lab_cg/memory.max"

# Assign your active Bash terminal PID ($$) into the cgroup's procs file
sudo sh -c "echo $$ > /sys/fs/cgroup/platform_lab_cg/cgroup.procs"

# Verify the active PIDs and memory limit of your custom cgroup
cat /sys/fs/cgroup/platform_lab_cg/cgroup.procs
cat /sys/fs/cgroup/platform_lab_cg/memory.max
```

## Step 5: Create a Container from Scratch using Namespaces

Combine your internal kernel knowledge by using `unshare` to generate isolated PID, UTS, and Network namespaces, simulating a container from scratch.

```bash
# Create brand-new PID, UTS, and Network namespaces using unshare
# --fork launches a child process; --mount-proc mounts a fresh /proc filesystem for PIDs
sudo unshare --fork --pid --mount-proc --uts --net /bin/bash -c "
    echo '--- INSIDE ISOLATED CONTAINER NAMESPACES ---';
    hostname custom-container-lab;
    echo 'Isolated Hostname: '$(hostname);
    echo 'Isolated Process Table (PID 1):';
    ps aux;
    echo 'Isolated Network Stack:';
    ip addr show;
    echo '--- EXITING CONTAINER NAMESPACES ---'
"

# Verify your physical host machine's hostname remains completely pristine and unchanged!
hostname
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 03 capability statement (*"I understand how Linux works internally, can trace system calls, manage resource cgroups, and debug complex system behavior"*), execute the following verification commands.

```bash
# Verify the presence of your custom cgroup and its assigned memory limit
cat /sys/fs/cgroup/platform_lab_cg/memory.max

# Verify the exact exit code of your most recently executed command
echo "Master Exit Code: $?"
```

**Expected Output:**
```text
209715200
Master Exit Code: 0
```
*If your terminal displays the exact `209715200` byte limit and successfully outputs `Master Exit Code: 0`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `sudo unshare --mount-proc` returns `unshare: mount /proc failed: Permission denied` or `Operation not permitted`.
  * **Cause:** You are running inside an unprivileged Docker container where the kernel strictly blocks mounting fresh `/proc` filesystems to prevent breakout attacks.
  * **Solution:** Run the lab in a standard virtual machine, cloud shell, or launch your container sandbox with `docker run --privileged`.

* **Symptom:** `sudo sh -c "echo $$ > /sys/fs/cgroup/platform_lab_cg/cgroup.procs"` returns `write error: No space left on device` or `Invalid argument`.
  * **Cause:** You are running inside an environment where `/sys/fs/cgroup` is mounted as read-only, or your process is already locked inside a parent cgroup slice that forbids migration.
  * **Solution:** Ensure you are operating in a full virtual machine or privileged container sandbox with Cgroups v2 enabled.

* **Symptom:** `strace` returns `strace: ptrace(PTRACE_TRACEME, ...): Operation not permitted`.
  * **Cause:** Your container sandbox lacks the required `SYS_PTRACE` kernel capability.
  * **Solution:** Launch your container sandbox with `docker run --cap-add=SYS_PTRACE`.

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup commands to migrate your PID back to the root cgroup slice and remove the demonstration cgroup directory.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Migrate your active shell PID back to the master root cgroup slice
sudo sh -c "echo $$ > /sys/fs/cgroup/cgroup.procs" 2>/dev/null || true

# Safely remove the demonstration custom cgroup directory
sudo rmdir /sys/fs/cgroup/platform_lab_cg 2>/dev/null || true
```
