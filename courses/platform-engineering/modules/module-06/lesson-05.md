# Production Container Debugging & Lifecycle Management

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-DOCKER-05`
* **Module:** Containers & Docker (`MOD-DOCKER`)
* **Difficulty:** Intermediate to Advanced
* **Estimated Duration:** 55 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master diagnostic workflows and lifecycle management engines of container runtimes, decrypting how Platform Engineers debug failing container processes, analyze log streams, and manage production daemon resources. By mastering terminal inspection utilities (`docker logs`, `docker exec`, `docker inspect`), container exit codes (`137`, `139`, `255`), and system resource pruning (`docker system prune`), you will firmly establish the elite diagnostic mastery fulfilling our module capability: **"I can build secure container images, orchestrate multi-container applications, manage volume persistence, and debug running containers."**

---

# Learning Objectives

* Deconstruct common production Container Exit Codes: `0` (clean exit), `1` (application fatal error), `137` (`SIGKILL` / OOMKilled), and `139` (`SIGSEGV` / Segmentation Fault).
* Execute live production container log inspection workflows using `docker logs --tail --follow` and timestamp filtering (`--since`).
* Execute interactive live debugging sessions inside running container namespaces using `docker exec -it` (`/bin/sh`, `ps`, `env`).
* Inspect low-level runtime state, environment variables, and health check statuses using `docker inspect`.
* Synthesize end-to-end module knowledge into an automated, highly governed production container lifecycle management workflow.

---

# Prerequisites

* Completion of `MOD-DOCKER-01`, `MOD-DOCKER-02`, `MOD-DOCKER-03`, and `MOD-DOCKER-04`.
* Foundational terminal process inspection and log analysis skills (`ps aux`, `grep`, `tail`).

---

# Why This Exists

In Lessons 01 through 04, we established how to isolate container namespaces, build optimized multi-stage images, orchestrate multi-tier Compose topologies, and configure volume storage plumbing. However, no matter how perfectly architected your images or how elegant your orchestration manifests, **Production Applications Inevitably Crash**.

Imagine you are a Site Reliability Engineer on call for an enterprise cloud platform. At 2:00 AM, your automated monitoring pager alerts you that your core Python AI inference microservice is continuously crashing in a catastrophic restart loop (**CrashLoopBackOff**).

When junior engineers encounter a crashing container in production, they frequently freeze in absolute panic. Because a container is an isolated process wrapper, they cannot SSH into it. They blindly execute `docker restart [container]`, hoping the problem magically disappears, or they delete the container entirely, accidentally wiping out the critical error logs required to diagnose the root cause!

To solve the monumental challenge of **Production Container Diagnostics**, Docker provides an elite suite of real-time inspection utilities. By mastering log streaming, interactive execution attachment, and exit code decryption, Platform Engineers can diagnose complex memory leaks, misconfigured environment variables, and segmentation faults with absolute calm, restore production stability in minutes, and guarantee pristine platform reliability.

---

# Core Concepts

## 1. Decrypting Container Exit Codes (`137`, `139`)
When a container process terminates, the Docker daemon captures its exact Linux exit code in `docker ps -a`. True Platform Engineers memorize these exit codes to diagnose failures instantly:
* `Exit Code 0`: Clean, intentional exit! The container process completed its task successfully and exited normally.
* `Exit Code 1`: Application fatal error! Your Python or Node.js application encountered an unhandled exception, syntax error, or missing configuration file.
* `Exit Code 137 (128 + 9 = SIGKILL)`: The container process was forcefully terminated with `SIGKILL`! This almost universally proves an **OOMKilled (Out-Of-Memory)** event where the host Linux kernel terminated the process for breaching its `cgroup` memory limit!
* `Exit Code 139 (128 + 11 = SIGSEGV)`: **Segmentation Fault!** Your application attempted to access an invalid memory address (frequently caused by incompatible C-extension libraries in Python AI microservices).

```text
[ Container Termination ] ──► [ Captures Exit Code ] ──► [ 0: Clean Success ]
                                                     ├─► [ 1: App Fatal Error ]
                                                     ├─► [ 137: OOMKilled (SIGKILL) ]
                                                     └─► [ 139: Segfault (SIGSEGV) ]
```

## 2. Live Log Streaming (`docker logs`)
When a container crashes, you must inspect its standard output (`stdout`) and standard error (`stderr`) log streams before deleting the container wrapper.
* `docker logs --tail 100 -f [container]`: Streams the last 100 lines of logs live in your terminal!
* `docker logs --since 15m [container]`: Filters the log stream to display *only* logs generated in the last 15 minutes! Essential for isolating the exact moment an outage began!

## 3. Interactive Debugging Attachment (`docker exec`)
If a container is actively running but behaving erratically (e.g., throwing 500 HTTP errors), you need to look inside its isolated namespace.
* `docker exec -it [container] /bin/sh`: Commands the Docker daemon to spawn a brand-new interactive shell process directly inside the running container's existing `pid` and `mnt` namespaces! Once attached, you can run `ps aux`, `env`, or inspect local configuration files as if you were logged into the machine!

```text
[ docker exec -it ] ──► [ Spawns /bin/sh Process ] ──► [ Attaches to Active Namespace ]
```

## 4. Low-Level State Inspection (`docker inspect`)
When debugging complex configuration mismatches or failing health checks, `docker exec` may fail if the container lacks a shell binary (e.g., Distroless images).
* `docker inspect [container]`: Prints the master JSON state block of the container wrapper! You can inspect the exact `State.Health.Status`, verify injected `Config.Env` variables, and confirm physical host volume `Mounts`.

## 5. Production Daemon Lifecycle Management (`docker system prune`)
True Platform Engineering mastery requires maintaining a clean, highly optimized Docker daemon engine across production servers:
* **The Storage Exhaustion Trap:** Over months of continuous operation, stopped containers, abandoned volumes, and dangling build cache layers accumulate, completely exhausting physical host hard drive space (`No space left on device`).
* **`docker system prune -a --volumes`:** Platform Engineers schedule automated maintenance cron jobs to execute system pruning, safely sweeping away unattached resources and keeping production daemons operating at peak efficiency!

---

# Architecture

```mermaid
flowchart TD
    classDef userSpace fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000000;
    classDef kernelSpace fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;
    classDef process fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000;

    subgraph ContainerLifecycle [Container Process]
        CRASH["Container Process Terminates"]
        CODE["Captures Exit Code (e.g. 137, 139)"]
        CRASH --> CODE
    end

    subgraph EngineCommands [Docker Engine CLI (User Space)]
        LOGS["docker logs (View stdout/stderr)"]
        INSPECT["docker inspect (Verify Config)"]
        EXEC["docker exec (Live Shell)"]
        PRUNE["docker system prune (Reclaim Space)"]
        
        CODE -.->|Debug Step 1| LOGS
        LOGS -.->|Debug Step 2| INSPECT
        INSPECT -.->|Debug Step 3| EXEC
        EXEC -.->|Maintenance| PRUNE
    end

    class CRASH,CODE process;
    class LOGS,INSPECT,EXEC,PRUNE userSpace;
```

---

# Real-World Example

Imagine you are a Lead Site Reliability Engineer managing a large-scale microservice platform for an international airline. At 4:00 PM on a busy Friday, your master flight booking API microservice suddenly goes down. 

When you log into the production server, you see the container is trapped in a continuous restart loop. Junior engineers are panicking, suggesting a complete server reboot or restoring yesterday's database backup.

Because you are an elite Platform Engineer, you take command of the terminal with absolute calm. You execute `docker ps -a` and instantly spot the exit code: `Exited (137) 5 seconds ago`. You announce to the team: *"Exit code 137 proves a SIGKILL event, which means the container is hitting its cgroup memory limit and triggering the OOM killer!"*

To verify what is consuming the memory, you execute `docker logs --tail 50 booking-api`. The logs reveal that a new data export feature is attempting to load 100,000 flight records entirely into system RAM at once! 

Because the container is configured with a strict 512MB memory limit, the Linux kernel terminates the process the moment the export runs. You temporarily increase the container's memory limit to 2048MB (`docker run --memory="2048m"...`), the container stabilizes instantly, flight bookings resume flawlessly, and you assign the development team to refactor their data export code to use memory-efficient pagination!

---

# Hands-on Demonstration

Let's look at how an engineer inspects container exit codes using `docker ps -a`, inspects production log streams using `docker logs`, and executes interactive debugging commands using `docker exec`.

## Input 1: Inspecting Container Exit Codes and Production Log Streams
We use `docker ps -a` to inspect our stopped container exit codes, and `docker logs` with timestamp filtering to isolate the exact error stream.

## Code 1
```bash
# Inspect all containers in the engine, focusing on exited container exit codes.
# (We simulate the clean plain-text output of docker ps -a for crashing containers)
docker ps -a 2>/dev/null || echo -e "CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                       PORTS     NAMES\n8a9b0c1d2e3f   python-ai:latest      \"python main.py\"         10 minutes ago   Exited (137) 2 minutes ago             ai-inference\n1a2b3c4d5e6f   node-service:latest   \"node server.js\"         1 hour ago       Exited (1) 15 minutes ago              web-backend"

# Inspect the last 5 lines of logs for the crashed AI inference container.
# (We simulate the clean plain-text output of docker logs)
docker logs --tail=5 ai-inference 2>/dev/null || echo -e "2026-06-28 12:10:01 [INFO] Initializing PyTorch AI model weights...\n2026-06-28 12:10:05 [INFO] Allocating tensor memory cache (1024MB)...\n2026-06-28 12:10:10 [WARN] System memory consumption exceeding 90% threshold!\n2026-06-28 12:10:12 [ERROR] Fatal memory allocation failure in C-extension\nKilled"
```

## Expected Output 1
```text
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                       PORTS     NAMES
8a9b0c1d2e3f   python-ai:latest      "python main.py"         10 minutes ago   Exited (137) 2 minutes ago             ai-inference
1a2b3c4d5e6f   node-service:latest   "node server.js"         1 hour ago       Exited (1) 15 minutes ago              web-backend
2026-06-28 12:10:01 [INFO] Initializing PyTorch AI model weights...
2026-06-28 12:10:05 [INFO] Allocating tensor memory cache (1024MB)...
2026-06-28 12:10:10 [WARN] System memory consumption exceeding 90% threshold!
2026-06-28 12:10:12 [ERROR] Fatal memory allocation failure in C-extension
Killed
```

## Explanation 1
Look at how beautifully clear this diagnostic trail is! `docker ps -a` shows our `ai-inference` container terminated with `Exited (137)`. When we inspect `docker logs`, the final line proudly displays `Killed`, proving the host Linux kernel's OOM killer stepped in to terminate the memory-starved process!

---

## Input 2: Executing Interactive Debugging Commands and Engine Pruning
We use `docker exec` to execute a live process table inspection inside a running container, and simulate executing `docker system prune` to optimize daemon resources.

## Code 2
```bash
# Execute a live process table inspection inside an actively running container.
# (We simulate the clean plain-text output of docker exec ps aux)
docker exec -it web-backend ps aux 2>/dev/null || echo -e "USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot          1  0.1  1.2 654320 45210 ?        Ss   12:00   0:01 node server.js\nroot         45  0.0  0.1  12340  3210 ?        R+   12:15   0:00 ps aux"

# Simulate executing a production daemon engine cleanup using docker system prune.
echo "Total reclaimed space: 14.5GB... Production daemon engine optimized successfully."
```

## Expected Output 2
```text
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.1  1.2 654320 45210 ?        Ss   12:00   0:01 node server.js
root         45  0.0  0.1  12340  3210 ?        R+   12:15   0:00 ps aux
Total reclaimed space: 14.5GB... Production daemon engine optimized successfully.
```

## Explanation 2
Notice how perfectly transparent live debugging is! `docker exec` spawned a brand-new `ps aux` process (`PID 45`) directly inside the running container's namespace, allowing us to verify the memory consumption (`RSS`) of `node server.js` (`PID 1`)! Notice our simulated `docker system prune`: it sweeps away gigabytes of abandoned cache, restoring pristine performance to the production daemon!

---

# Hands-on Lab

* **Objective:** Start a failing container, inspect exit codes, stream error logs, inspect low-level environment variables, execute interactive debugging commands, and prune engine resources.
* **Estimated Time:** 20 minutes
* **Difficulty:** Intermediate to Advanced
* **Environment:** Interactive Browser Terminal / Local Sandbox (with Docker installed)

## Step-by-step Instructions

1. Open your terminal sandbox and start a container designed to fail instantly:
```bash
docker run -d --name failing-app alpine:latest /bin/sh -c "echo 'Starting production app...' && sleep 2 && echo 'FATAL: Missing API Key!' >&2 && exit 1"
```
2. Type `docker ps -a` to verify your container terminated and inspect its exact `Exited (1)` exit code!
3. Type `docker logs --tail 10 failing-app` to inspect the error log stream and discover `FATAL: Missing API Key!`.
4. Start a brand-new, healthy container with a custom environment variable:
```bash
docker run -d --name healthy-app -e API_KEY="SuperSecret99" nginx:alpine
```
5. Type `docker inspect healthy-app | grep -A 3 "Env"` to verify your injected environment variables in the low-level JSON metadata!
6. Type `docker exec -it healthy-app env` to attach an interactive execution process and verify the environment variables live from inside the namespace!
7. Type `docker rm -f failing-app healthy-app` to cleanly remove both demonstration container wrappers.
8. Type `docker system prune -f` to execute a clean engine resource optimization!

## Verification

```bash
docker ps -a | grep -E "(failing-app|healthy-app)"
```
*If your terminal outputs absolutely nothing (confirming both demonstration containers were cleanly removed), you have mastered production container debugging and lifecycle management!*

## Troubleshooting

* **Issue:** `docker exec -it [container] /bin/sh` returns `OCI runtime exec failed: exec failed: container_linux.go: starting container process caused: exec: "/bin/sh": stat: No such file or directory`.
* **Solution:** You are attempting to attach an interactive shell into a container built with a **Distroless Base Image**! Distroless images contain absolutely zero shell binaries (`/bin/sh`, `bash`). To debug a distroless container in production, you must rely on `docker logs` and `docker inspect`, or utilize Kubernetes ephemeral debug containers (`kubectl debug`).

## Cleanup

No further cleanup is required as the demonstration containers were removed in Step 7 and resources were pruned in Step 8.

---

# Production Notes

In enterprise Kubernetes platforms, the concepts of `docker logs` and `docker exec` map directly to the canonical Kubernetes CLI commands: `kubectl logs` and `kubectl exec`. When you execute `kubectl exec -it my-pod -- /bin/sh`, the Kubernetes API server communicates with `kubelet` on the target worker node, which literally executes the underlying `containerd` / `runc` exec attachment directly into the container namespace! Mastering Docker CLI debugging establishes the exact foundational intuition required for Kubernetes production operations!

---

# Common Mistakes

* **Executing `docker restart` on Crashing Containers:** Beginners frequently execute `docker restart` in a loop when a container fails, hoping the problem resolves magically. If a container crashes with `Exited (1)` due to a missing configuration file, restarting it 50 times will simply crash it 50 times! Always inspect `docker logs` first!
* **Allowing Production Daemons to Exhaust Disk Space:** Junior developers frequently run Docker daemons in production for years without scheduling automated pruning. Eventually, the `/var/lib/docker/` directory consumes 100% of the host server's hard drive, causing the entire Docker daemon to freeze and crash all running microservices! Always schedule automated `docker system prune` cron jobs!

---

# Failure-Driven Learning

Imagine a junior engineer attempts to inspect the logs of a container that produces gigabytes of log data every hour, but typing `docker logs myapp` causes the terminal to freeze, consume all system memory, and crash.

## Simulated Failure
```bash
# Simulating a terminal crash due to unthrottled log streaming
# (We simulate the exact terminal buffer overflow when requesting massive log histories)
echo -e "Displaying raw log buffer (50,000,000 lines)...\nTerminated: Out of Memory. Terminal buffer overflow."
```

## Output
```text
Displaying raw log buffer (50,000,000 lines)...
Terminated: Out of Memory. Terminal buffer overflow.
```

## Diagnosis & Recovery
Why did this fail? Look at this classic operational mistake: `Terminal buffer overflow`! When you execute `docker logs myapp` without any throttling flags, the Docker daemon attempts to read and dump the entire historical log file (which could be 50 Gigabytes of text!) directly into your active terminal buffer! This instantly overwhelms your terminal emulator, freezes your SSH session, and crashes your machine! To recover correctly, the engineer must **never** run raw `docker logs`. You must strictly append throttling flags such as `--tail 100` (to view only the last 100 lines) or `--since 15m` (to view recent logs), ensuring the log stream loads instantly in pristine safety!

---

# Engineering Decisions

## Log Management: Local JSON-file vs. Fluentd vs. AWS CloudWatch Drivers
When architecting an enterprise logging strategy, engineering leaders must choose the master Docker log driver.
* **Local `json-file` Driver:** The default Docker driver. Stores logs in plain-text JSON files inside `/var/lib/docker/containers/`. Excellent for local development (`docker logs`). However, in production, these files grow infinitely until disk space is exhausted unless strict log rotation (`max-size: 10m`) is configured in `daemon.json`.
* **Fluentd / Logstash Drivers:** Docker forwards container log streams directly to an external log aggregator (e.g., Fluentd, ElasticStack) over the network! Eliminates local disk consumption entirely and enables central log searching (Kibana).
* **AWS CloudWatch / Google Cloud Logging Drivers:** Docker streams logs directly to cloud vendor logging APIs. Excellent for fully managed cloud environments.
* **The Platform Decision:** Platform Engineers configure strict log rotation (`max-size: 10m`, `max-file: 3`) for local development daemons, while strictly enforcing external log forwarding drivers (**Fluentd / CloudWatch**) across all production servers to guarantee centralized observability (Stage 5).

---

# Best Practices

* **Master `docker stats`:** When you need to monitor real-time CPU, Memory, and Network consumption across all active running containers on a server, execute `docker stats`. It prints an elite, live-updating terminal dashboard similar to Linux `htop`!
* **Configure `daemon.json` Log Rotation:** Open your master Docker daemon configuration file (`/etc/docker/daemon.json`) and add `"log-driver": "json-file", "log-opts": {"max-size": "10m", "max-file": "3"}`. This guarantees that no single container log file can ever exceed 10 Megabytes, permanently eliminating disk exhaustion crashes!

---

# Troubleshooting Guide

## Issue 1: "Exit Code 137" vs. "Exit Code 139"

* **Cause:** Your container crashes abruptly in production, leaving a specific 13x exit code in `docker ps -a`.
* **Diagnosis & Solution:**
  * `Exit Code 137 (OOMKilled)`: Your container process exceeded its memory limit and was terminated with `SIGKILL` (Signal 9). `128 + 9 = 137`. To fix, inspect your application for memory leaks, or increase the container's memory limit: `docker run --memory="1024m" ...`.
  * `Exit Code 139 (Segmentation Fault)`: Your container process encountered a fatal memory access violation and was terminated with `SIGSEGV` (Signal 11). `128 + 11 = 139`. This occurs almost exclusively when running incompatible C-extension binaries in Python (e.g., mismatched CUDA GPU drivers in PyTorch). To fix, verify your base image libraries match your compiled wheel dependencies!

---

# Summary

* **Exit Codes** (`0`, `1`, `137`, `139`) provide the immediate diagnostic baseline for investigating stopped container failures.
* **`docker logs --tail 100 -f`** streams container output safely without causing terminal buffer overflows.
* **`docker exec -it /bin/sh`** spawns interactive debugging shells directly inside running container namespaces.
* **`docker inspect`** provides the master JSON state block for verifying injected environment variables and health statuses.
* **`docker system prune -a --volumes`** is mandatory to sweep away abandoned resources and maintain pristine production daemon performance.

---

# Cheat Sheet

```bash
# Inspect all containers in the engine, focusing on stopped container exit codes
docker ps -a

# Stream the last 100 lines of container logs live in the terminal
docker logs --tail 100 -f [container_id_or_name]

# Filter the container log stream to display only logs from the last N minutes
docker logs --since 15m [container_id_or_name]

# Attach a brand-new interactive debugging shell directly into a running container
docker exec -it [container_id_or_name] /bin/sh

# Inspect the low-level JSON metadata state block of a container wrapper
docker inspect [container_id_or_name]

# Display a live-updating real-time dashboard of CPU/Memory consumption across containers
docker stats

# Forcefully cleanup and delete all stopped containers, unused networks, and dangling images
docker system prune -a --volumes
```

---

# Knowledge Check

## Multiple Choice Questions

1. A Site Reliability Engineer investigates a crashed container and observes `Exited (139) 3 minutes ago` in `docker ps -a`. What exact Linux kernel event caused this exit code?
   * A) The container completed successfully.
   * B) The container encountered a Segmentation Fault (`SIGSEGV`, Signal 11). `128 + 11 = 139`. The application attempted to access an invalid memory address.
   * C) The container hit its memory limit and was OOMKilled.
   * D) The developer used `docker compose down`.

## Scenario Questions

You are attempting to debug a container running a Node.js microservice that is throwing HTTP 500 errors. You want to look inside the active container namespace to verify the running process table using `ps aux`. Based on what you learned in this lesson, what exact terminal command do you run to attach an interactive shell?

## Short Answer Questions

Explain why configuring log rotation (`max-size: 10m`) in `/etc/docker/daemon.json` is a mandatory best practice for production Docker daemons.

---

# Interview Preparation

## Beginner Questions

* What does `Exit Code 137` mean?
* What is the purpose of `docker logs --tail 100`?
* What does `docker stats` do?

## Intermediate Questions

* Explain the difference between `docker attach` and `docker exec -it`. (Why is `exec` safer?).
* Why does `docker exec -it [container] /bin/sh` fail on Distroless container images?

## Advanced Questions

* Explain how the Docker daemon captures container exit codes from `containerd` via gRPC events, and describe how `runc` forwards container standard output (`stdout`) and standard error (`stderr`) file descriptors to the configured Docker log driver.

## Scenario-Based Discussions

* Discuss the operational trade-offs of establishing a production container debugging workflow that relies on `docker exec` interactive shell attachment versus enforcing immutable, air-gapped container runtimes (Distroless) where engineers must rely exclusively on external centralized telemetry (Fluentd / Prometheus / CloudWatch).

---

# Further Reading

1. [Docker CLI Reference - docker logs (Official Docker Documentation)](https://docs.docker.com/engine/reference/commandline/logs/)
2. [Docker CLI Reference - docker exec (Official Docker Documentation)](https://docs.docker.com/engine/reference/commandline/exec/)
3. [Mastering Container Exit Codes (OOMKilled 137 vs Segfault 139)](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase)
4. [Docker Logging Drivers and Rotation Best Practices](https://docs.docker.com/config/containers/logging/configure/)
5. [Pruning Docker System Resources (Official Guide)](https://docs.docker.com/config/pruning/)
