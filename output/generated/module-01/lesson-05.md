# MOD-LINUX-05: Linux Logging, System Monitoring & Diagnostics

Version: 1.0.0

---

# Lesson Metadata

* **Lesson ID:** MOD-LINUX-05
* **Module:** Linux Fundamentals for Platform Engineers
* **Difficulty:** Intermediate
* **Estimated Duration:** 50 minutes
* **Learning Track:** 🟢 Core / 🔵 Professional / 🟣 Expert
* **Version:** 1.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the tools and methodologies used to monitor Linux system resources, analyze kernel logging, and diagnose complex performance bottlenecks. As a platform engineer, diagnosing resource saturation (CPU, Memory, Disk I/O) is an indispensable skill when troubleshooting degraded container platforms or unstable AI inference servers.

---

# Learning Objectives

By the end of this lesson, you will be able to:

* Query and filter system and kernel log journals using `journalctl` and `dmesg`.
* Diagnose CPU, Memory, and Disk I/O saturation using `htop`, `iostat`, and `vmstat`.
* Identify open file descriptors and active network sockets using `lsof`.

---

# Prerequisites

* Completion of `MOD-LINUX-01` through `MOD-LINUX-04`.
* Access to a Linux terminal environment.

---

# Why This Exists

In early server management, diagnosing a sluggish or failing operating system required manually parsing scattered, unstructured text logs across `/var/log` and guessing which hardware component was failing. This lack of centralized, structured telemetry resulted in prolonged production outages and ineffective guesswork during root-cause analysis.

To provide deep visibility into system performance, the Linux kernel exposes real-time telemetry through pseudo-filesystems (`/proc` and `/sys`) and unified logging daemons (`systemd-journald`). Professional platform engineers leverage these interfaces to quickly isolate resource bottlenecks, verify hardware health, and conduct precise incident forensics.

---

# Core Concepts

## The `/proc` Pseudo-Filesystem
`/proc` is a virtual filesystem created dynamically by the kernel in memory. It exposes raw, real-time data regarding running processes (`/proc/<PID>`), memory utilization (`/proc/meminfo`), and load averages (`/proc/loadavg`). Monitoring tools like `top` and `htop` are merely visual parsers reading directly from `/proc`.

## USE Method (Utilization, Saturation, Errors)
Developed by performance architect Brendan Gregg, the USE method is a systematic methodology for isolating system bottlenecks. For every hardware resource (CPU, Memory, Storage, Network), you check three metrics:
* **Utilization:** The percentage of time the resource was busy servicing work.
* **Saturation:** The degree to which the resource has extra work queued up waiting for service.
* **Errors:** The count of error events produced by the underlying hardware.

## Systemd Journal (`systemd-journald`)
A centralized, structured logging service that captures log data from the kernel, system initialization, Systemd services, and syslog. Journals are indexed and stored in a binary format, allowing lightning-fast filtering by service name, time window, or severity level.

---

# Architecture

```mermaid
flowchart TD
    subgraph Raw Kernel & Hardware Telemetry
        KRN[Linux Kernel Core]
        PROC[/proc Virtual Filesystem]
        SYS[/sys Virtual Filesystem]
        KRN -->|Exposes runtime metrics| PROC
        KRN -->|Exposes hardware states| SYS
    end

    subgraph Logging & Indexing Engine
        JRN[systemd-journald / Binary Index]
        KRN -->|Kernel ring buffer / dmesg| JRN
    end

    subgraph Platform Engineering Diagnostic Tools
        HTOP[htop / vmstat / iostat]
        JCTL[journalctl / dmesg]
        PROC -->|Parses memory/process stats| HTOP
        JRN -->|Queries structured logs| JCTL
    end
```

---

# Real-World Example

Consider a Kubernetes cluster hosting a highly concurrent PostgreSQL database. The application team alerts you that database query latency has spiked from 5ms to 200ms, yet `htop` reveals overall CPU utilization is only at 20%.

An inexperienced engineer assumes the issue is within the SQL queries. A professional platform engineer applies the USE method and inspects disk I/O saturation using `iostat -xz 1`. The output reveals `await` (I/O wait time) has spiked to 150ms and `%util` is at 100%. The root cause is storage bandwidth saturation on the underlying cloud NVMe volume, not CPU starvation.

---

# Hands-on Demonstration

Let's observe how to query kernel ring buffers for hardware-level events using `dmesg` and `journalctl`.

## Input
We query the kernel log buffer specifically looking for memory management events or Out-Of-Memory (`OOMKilled`) invocations.

## Code
```bash
# Search kernel ring buffer for OOM events with human-readable timestamps
dmesg -T | grep -i oom || echo "No OOM events found in current ring buffer."

# Query Systemd journal for errors logged within the last 1 hour
journalctl -p err --since "1 hour ago"
```

## Expected Output
```text
No OOM events found in current ring buffer.
-- No entries --
```

## Explanation
`dmesg -T` extracts messages directly from the kernel ring buffer, translating raw system boot epoch ticks into human-readable timestamps (`-T`). `journalctl -p err` queries the binary journal index, filtering strictly for priority `err` (error level 3) within the specified time window.

---

# Hands-on Lab

* **Objective:** Use `iostat`, `vmstat`, and `lsof` to profile system execution, inspect virtual memory paging, and locate open file handles of running daemons.
* **Estimated Time:** 20 minutes
* **Difficulty:** Intermediate
* **Environment:** Any Linux terminal.

## Step-by-step Instructions

1. Measure virtual memory health, paging activity, and CPU block states over 5 intervals:
   ```bash
   vmstat 2 5
   ```
2. Inspect block storage device I/O utilization and queue saturation:
   ```bash
   iostat -xz 2 3
   ```
3. Locate all open files, sockets, and pipes held by the SSH daemon (`sshd`):
   ```bash
   sudo lsof -c sshd
   ```

## Verification
Analyze the `vmstat` output. Ensure `si` (swap in) and `so` (swap out) remain near `0`, confirming the system is not actively thrashing virtual memory to disk.

## Troubleshooting
* **Symptom:** `iostat: command not found`
  * **Cause:** The `sysstat` performance monitoring package is missing.
  * **Solution:** Install it via `sudo apt-get install sysstat` or `sudo yum install sysstat`.

## Cleanup
No background daemons or temporary files were generated; no cleanup required.

---

# Production Notes

In enterprise platform engineering, SSHing into individual Linux servers to run `htop` or `journalctl` during a widespread outage is an anti-pattern. Enterprise systems aggregate Linux telemetry automatically. Senior engineers deploy `node_exporter` to expose `/proc` metrics to Prometheus, and utilize Promtail or FluentBit to forward `systemd-journald` logs to central observability platforms like Grafana Loki or Elasticsearch.

---

# Common Mistakes

* **Misinterpreting High RAM Usage in Linux:** Beginners see `free -h` reporting 95% memory used and panic. Linux intentionally uses all available spare RAM to cache filesystem read/write operations (`buff/cache`). Look at the `available` column, not the `free` column, to gauge true memory health.
* **Ignoring Load Average vs. CPU Cores:** Seeing a load average of `4.0` on a 1-core machine represents severe queue saturation. Seeing `4.0` on a 16-core machine represents a lightly loaded system. Always contextualize load average against `nproc`.

---

# Failure-Driven Learning

Let's observe how the kernel handles severe memory exhaustion by invoking the **Out-Of-Memory (OOM) Killer**.

## The Failure
When physical RAM and swap space are entirely depleted, the Linux kernel intervenes to save the operating system from crashing by identifying and killing memory-hogging processes.

```bash
# Simulating an inspection of an OOM event in kernel logs
# (We avoid running an actual forkbomb to protect your session)
cat << 'EOF' > /tmp/mock_oom.log
[11234.567890] my_ai_service invoked oom-killer: gfp_mask=0x100cca(GFP_HIGHUSER_MOVABLE), order=0, oom_score_adj=0
[11234.567912] Out of memory: Killed process 9542 (python3) total-vm:16453120kB, anon-rss:15984230kB, file-rss:0kB
EOF

grep -i "Out of memory" /tmp/mock_oom.log
```

## Expected Output
```text
[11234.567912] Out of memory: Killed process 9542 (python3) total-vm:16453120kB, anon-rss:15984230kB, file-rss:0kB
```

## Diagnosis & Recovery
To diagnose this in production, inspect `dmesg -T | grep -i oom`. You will see the kernel identifying the exact process (`python3`) and killing it. To protect critical mission daemons (like `sshd` or `kubelet`) from being killed during memory pressure, adjust their `oom_score_adj` in `/proc/<PID>/oom_score_adj` to `-1000`.

---

# Engineering Decisions

When architecting container logging strategies, you must decide between writing logs to local files (`/var/log/app.log`) or writing directly to standard output (`stdout`/`stderr`).
* **Local Files:** Requires complex log rotation daemons (`logrotate`) inside the container to prevent disk exhaustion, violating the single-process container principle.
* **Standard Output (`stdout`):** The enterprise standard. The container runtime (Docker/Containerd) captures `stdout`, tags it with Kubernetes metadata, and passes it cleanly to the host logging daemon (`systemd-journald`).

---

# Best Practices

* **Use `lsof` Before Unmounting Disks:** Before unmounting a busy filesystem (`umount /data`), run `lsof +D /data` to identify exactly which running processes are holding open file handles.
* **Master `journalctl` Filtering:** Utilize `journalctl -u my_service --since "10 minutes ago" -f` to live-tail specific service logs during active troubleshooting.

---

# Troubleshooting Guide

## Issue 1: High CPU Load but `top` Shows 0% `us` (User) CPU

* **Cause:** The CPU cores are spending all their time in `wa` (I/O Wait) or `sys` (Kernel Space).
* **Diagnosis:** Inspect the CPU summary header in `top` or `htop`. If `wa` is high, the CPU is idling waiting for slow storage disks. If `sys` is high, the system is thrashing system calls or kernel locks.
* **Solution:** Use `iostat -xz 1` to locate the saturated disk volume, or use `strace -c -p <PID>` to identify high-frequency system calls.

---

# Summary

Mastering Linux logging, process profiling, and resource diagnostics equips platform engineers with the analytical capabilities needed to resolve complex production incidents. By applying the USE method and querying structured kernel journals, you eliminate guesswork and resolve root causes systematically.

---

# Cheat Sheet

| Command | Purpose | Example |
| :--- | :--- | :--- |
| `journalctl -u <unit>` | Query Systemd service logs | `journalctl -u docker.service -f` |
| `dmesg -T` | Display kernel ring buffer logs | `dmesg -T | grep -i oom` |
| `iostat -xz 1` | Inspect disk I/O saturation | `iostat -xz 1 5` |
| `vmstat 1` | Inspect virtual memory & paging | `vmstat 1 5` |
| `lsof -i :<port>` | Find process binding to a port | `lsof -i :8080` |

---

# Knowledge Check

To test your mastery of Linux diagnostics and the USE method, review the dedicated questions in `quizzes/quiz-linux-01.md`.

---

# Interview Preparation

## Beginner Questions
* What is the difference between `dmesg` and `journalctl`?

## Intermediate Questions
* Explain the USE method (Utilization, Saturation, Errors) and how you would apply it to investigate a storage bottleneck.

## Advanced Questions
* How does the Linux kernel determine which process to terminate when invoking the Out-Of-Memory (OOM) killer, and how can you safeguard a critical system daemon?

## Scenario-Based Discussions
* **Scenario:** A production Kubernetes node is experiencing severe performance degradation. `top` shows 90% memory used, but `htop` shows CPU usage is low. How do you investigate?
* **Key Talking Points:** Discuss checking `free -m` to evaluate `available` memory vs `buff/cache`. Explain running `vmstat 1` to see if the system is actively swapping (`si`/`so`), and checking `dmesg` for imminent OOM events.

---

# Further Reading

1. [Systems Performance by Brendan Gregg](https://www.brendangregg.com/systems-performance-2nd-edition-book.html)
2. [The USE Method](https://www.brendangregg.com/usemethod.html)
3. [man journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)
4. [man iostat(1)](https://man7.org/linux/man-pages/man1/iostat.1.html)
