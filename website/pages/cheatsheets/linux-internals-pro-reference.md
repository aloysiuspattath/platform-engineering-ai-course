# Professional Quick Reference: Linux Internals (MOD-LINUX-INT)

## Core Files & Environment Limits

| Component | Target Path / Command | Production Context |
| :--- | :--- | :--- |
| **Global Memory Stats** | `/proc/meminfo` | Authoritative source for kernel memory allocation |
| **Cgroups v2 Root** | `/sys/fs/cgroup/` | Unified hierarchy for resource accounting |
| **Process FD Table** | `/proc/<PID>/fd/` | Symlinks to open file descriptors for `<PID>` |
| **Kernel Ring Buffer** | `dmesg -T` | Critical for diagnosing OOM kills or hardware faults |
| **Check Cgroups v2** | `stat -fc %T /sys/fs/cgroup/` | Validates `cgroup2fs` presence vs legacy `tmpfs` |

## Advanced Debugging & Tracing

| Operation | Command Syntax | Production Use Case |
| :--- | :--- | :--- |
| **Trace Syscalls** | `strace -p <PID> -f` | Attach to running process & follow child threads |
| **Trace Syscall Counts**| `strace -c -p <PID>` | Profile system calls and time spent per call |
| **Trace Dynamic Libs** | `ltrace -p <PID>` | Intercept library calls made by an active binary |
| **Check Lib Deps** | `ldd /path/to/binary` | Verify presence of required `.so` shared libraries |
| **List Open FDs** | `lsof -p <PID>` | Inspect all open files/sockets held by process |
| **Find Port Owner** | `lsof -i :<PORT>` | Identify which process PID is bound to a port |

## Cgroups v2 Resource Limiting

| Operation | Command Syntax | Notes |
| :--- | :--- | :--- |
| **Create Group** | `sudo mkdir -p /sys/fs/cgroup/<name>` | Instantly populates controller files |
| **Set RAM Max** | `sudo sh -c "echo <BYTES> > /sys/fs/cgroup/<name>/memory.max"` | Triggers OOM Killer if limit is exceeded |
| **Set CPU Limit** | `sudo sh -c "echo <MAX> <PERIOD> > /sys/fs/cgroup/<name>/cpu.max"` | Ex: `50000 100000` = 50% of 1 CPU core |
| **Attach PID** | `sudo sh -c "echo <PID> > /sys/fs/cgroup/<name>/cgroup.procs"` | Process immediately respects applied limits |
| **Verify PIDs** | `cat /sys/fs/cgroup/<name>/cgroup.procs` | View processes trapped in the cgroup |

> [!WARNING]
> **Cgroup Deletion:** You cannot remove a cgroup (`rmdir`) if processes are still attached. You must first kill the PIDs or migrate them to the root (`echo <PID> > /sys/fs/cgroup/cgroup.procs`).

## Namespace Isolation (Container Primitives)

| Namespace | unshare flag | Isolation Scope |
| :--- | :--- | :--- |
| **PID** | `--pid --mount-proc` | Process trees (PID 1 mapping) |
| **UTS** | `--uts` | Hostname and NIS domain name |
| **Network** | `--net` | Interfaces, routing tables, iptables |
| **Mount** | `--mount` | Mount points (`/` filesystem) |
| **User** | `--user` | UIDs and GIDs |

### Scaffold an Isolated Container

```bash
# Launch a fully isolated bash session from scratch
sudo unshare --fork --pid --mount-proc --uts --net /bin/bash
```

## OOM (Out Of Memory) Killer Operations

| Operation | Command Syntax |
| :--- | :--- |
| **Check Active OOM Score** | `cat /proc/<PID>/oom_score` |
| **Adjust OOM Priority** | `sudo sh -c "echo <SCORE> > /proc/<PID>/oom_score_adj"` |
| **Search OOM Kill Logs** | `dmesg -T \| grep -i 'killed process'` |

> [!CAUTION]
> **OOM Immunity Risk:** Setting an `oom_score_adj` of `-1000` renders a process completely immune to the OOM killer. Use exclusively for critical cluster agents (e.g., `kubelet`, `sshd`), otherwise rogue memory leaks will completely crash the kernel.
