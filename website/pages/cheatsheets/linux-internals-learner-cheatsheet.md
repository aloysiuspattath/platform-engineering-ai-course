# Learner Cheat Sheet: Linux Internals, Tracing & Container Foundations (MOD-LINUX-INT)

## Topic Summary
Linux internals govern how the operating system manages memory, tracks files, and isolates processes. Understanding system calls, file descriptors, cgroups, and namespaces is the foundation for mastering containers and system debugging.

## Key Concepts
* **User Space vs. Kernel Space:** Applications run in restricted User Space (Ring 3). The Kernel runs in privileged Kernel Space (Ring 0). They communicate via system calls.
* **Virtual Filesystem (VFS):** "Everything is a file" in Linux. VFS provides a unified interface for disks, devices, and memory.
* **Inodes & File Descriptors:** Inodes store file metadata on disk. File descriptors (FDs) are symlinks the kernel uses to track open files for a specific process.
* **Cgroups (Control Groups):** Limit and account for resource usage (CPU, Memory, Disk I/O) of a group of processes.
* **Namespaces:** Isolate global system resources (PIDs, Networks, Mounts) making it appear to processes that they have their own isolated OS (the basis of containers).

## Important Files & Directories
| Path | Purpose |
| :--- | :--- |
| `/proc/meminfo` | Real-time kernel memory statistics. |
| `/sys/fs/cgroup/` | Cgroups v2 unified hierarchy root directory. |
| `/proc/$$/fd/` | File descriptors for the current shell (`$$`). |
| `/etc/passwd` | Example file to inspect for underlying inodes. |

## Memory & System Call Diagnostics
*For a deep dive into memory management and tracing mechanics, refer to [MOD-LINUX-INT-03](../output/approved/module-03/lesson-03.md) and [MOD-LINUX-INT-05](../output/approved/module-03/lesson-05.md).*

| Operation | Command Syntax | Explanation / Mnemonic |
| :--- | :--- | :--- |
| **Check Free Memory** | `free -h` | `-h` for Human-readable (MB/GB). |
| **Trace Syscalls** | `strace echo "Hello" 2>&1 \| grep "write"` | Intercepts system calls. "strace" = System call TRACE. |
| **Trace Library Calls** | `ltrace pwd` | Intercepts dynamic library calls. "ltrace" = Library TRACE. |
| **List Library Deps** | `ldd /bin/cat` | Lists dynamic dependencies. "ldd" = List Dynamic Dependencies. |
| **View Kernel Logs** | `dmesg -T` | Hardware/Kernel logs. `-T` converts timestamps to readable time. |

## Filesystems & Descriptors
*Review the "everything is a file" concept in [MOD-LINUX-INT-04](../output/approved/module-03/lesson-04.md).*

| Operation | Command Syntax | Explanation |
| :--- | :--- | :--- |
| **Get Inode Number** | `ls -i /etc/passwd` | Shows the underlying Inode number. |
| **List Open Files** | `lsof /dev/tty` | Lists exactly which PIDs hold a file open. |
| **View Active Shell PID** | `echo $$` | `$$` is a bash variable for your current Process ID. |
| **View Process FDs** | `ls -l /proc/$$/fd` | Inspect the raw file descriptor table in the kernel. |

## Cgroups & Namespaces
*For hands-on container building, refer to the [Linux Internals Lab](../labs/linux-internals.md).*

| Operation | Command Syntax | Explanation |
| :--- | :--- | :--- |
| **Check Cgroup Version**| `stat -fc %T /sys/fs/cgroup/` | If it returns `cgroup2fs`, you are on Cgroups v2. |
| **Create Cgroup** | `sudo mkdir -p /sys/fs/cgroup/ai_cg`| Creates a new localized resource group. |
| **Set Memory Limit** | `sudo sh -c "echo 209715200 > /sys/fs/cgroup/ai_cg/memory.max"` | 200MB limit. Always write limits as bytes! |
| **Assign Process** | `sudo sh -c "echo $$ > /sys/fs/cgroup/ai_cg/cgroup.procs"` | Moves your shell into the constrained group. |

### Container Creation with Namespaces
```bash
sudo unshare --fork --pid --mount-proc --uts --net /bin/bash
```
* **Mnemonic:** `unshare` detaches your process from the host's shared namespaces.
* `--fork`: Runs as a child process.
* `--pid --mount-proc`: Isolates PIDs, ensuring the container sees itself as PID 1.
* `--uts`: Isolates hostnames.
* `--net`: Isolates network interfaces.

> [!CAUTION]
> **Container Breakout Risk:** `unshare --mount-proc` fails with `Operation not permitted` if you are already inside a restricted Docker container. You must use a privileged sandbox (`docker run --privileged`) to nest namespaces.

## Common Pitfalls & Mistakes
* **Confusing Memory Limits:** Cgroup `memory.max` expects values in bytes (e.g., 200MB is `209715200`), not "200M".
* **Leaving Processes in Custom Cgroups:** Before deleting a cgroup directory, you must migrate all running PIDs back to the root (`/sys/fs/cgroup/cgroup.procs`), or use a safer alternative.

```bash
# Proper Cleanup of Cgroups
sudo sh -c "echo $$ > /sys/fs/cgroup/cgroup.procs" 2>/dev/null
sudo rmdir /sys/fs/cgroup/ai_cg 2>/dev/null
```
