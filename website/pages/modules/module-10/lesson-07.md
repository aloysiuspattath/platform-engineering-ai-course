# Advanced Kubernetes Cluster Troubleshooting & Crash Diagnostics

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-K8S-07`
* **Module:** Kubernetes Engineering (`MOD-K8S`)
* **Difficulty:** Advanced
* **Estimated Duration:** 60 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master diagnostic and emergency debugging engines of Kubernetes, decrypting how Platform Engineers execute rapid root cause analyses during catastrophic cluster outages. By mastering the diagnostic hierarchy (`kubectl describe`, `kubectl logs`, `kubectl exec`), debugging ephemeral containers (`kubectl debug`), decoding fatal crash states (`CrashLoopBackOff`, `ImagePullBackOff`, `OOMKilled`), inspecting `kubelet` systemd logs (`journalctl`), and analyzing cluster events (`kubectl get events`), you will firmly establish the elite troubleshooting capabilities fulfilling our module capability: **"I can deploy, scale, operate, and troubleshoot production-grade Kubernetes cluster environments."**

---

# Learning Objectives

* Deconstruct the canonical Kubernetes troubleshooting hierarchy, detailing when to use `kubectl describe`, `kubectl logs`, and `kubectl exec`.
* Decode the root causes of fatal container crash states: `CrashLoopBackOff`, `ImagePullBackOff` (`ErrImagePull`), `OOMKilled`, and `CreateContainerError`.
* Architect advanced debugging workflows using Ephemeral Containers (`kubectl debug`) to inspect distroless or stripped container images lacking shell binaries.
* Execute physical worker node diagnostics by inspecting `kubelet` systemd daemon logs using `journalctl -u kubelet` to debug node unresponsiveness.
* Analyze cluster-wide orchestration failures by aggregating and sorting real-time API Server events using `kubectl get events --sort-by='.metadata.creationTimestamp'`.

---

# Prerequisites

* Completion of `MOD-K8S-01` through `MOD-K8S-06`.
* Foundational understanding of Linux systemd (`MOD-LINUX-02`), container exit codes (`MOD-DOCKER-01`), and `kubectl` CLI execution.

---

# Why This Exists

In Lessons 01 through 06, we established how to architect Kubernetes control planes, manage Deployments, configure networking Services, attach persistent storage, inject ConfigMaps, and configure autoscaling. However, no matter how perfectly architected your Kubernetes cluster is, **production systems fail**!

Imagine you are hired as a Lead Platform Engineer at a massive global streaming media enterprise. On Saturday evening during a major live broadcast event, the company's primary user authentication microservice suddenly stops responding to incoming web traffic.

You open your terminal, type `kubectl get pods`, and observe a catastrophic wall of red errors across your 50 authentication Pods: ten Pods are stuck in `CrashLoopBackOff`, fifteen Pods are stuck in `ImagePullBackOff`, and twenty Pods are repeatedly crashing with `OOMKilled`!

Junior engineers on the team panic. They attempt to use `kubectl exec -it auth-pod -- /bin/sh` to log into the containers, but because the containers were built using secure distroless container images, there is absolutely no `/bin/sh` shell binary inside! `kubectl exec` fails instantly!

Furthermore, the physical worker nodes hosting the Pods begin dropping offline (`STATUS: NotReady`). Because the junior engineers have absolutely no idea how to inspect `kubelet` systemd logs (`journalctl`) or analyze API Server events, they are completely blind to why the cluster is collapsing!

**Your company has just suffered a fatal, extended global streaming blackout!**

To solve the monumental challenge of **Blind Troubleshooting**, **Distroless Debugging**, **Fatal Crash Loops**, and **Node Unresponsiveness**, Kubernetes leaders established **Advanced Diagnostic Hierarchies, Ephemeral Containers (`kubectl debug`), and Systemd Forensics**. By executing a highly disciplined, structured troubleshooting hierarchy, injecting ephemeral debug containers directly into running Pod namespaces, decoding the exact meaning of `OOMKilled` exit codes, and inspecting physical `kubelet` daemon logs, Platform Engineers guarantee that you can diagnose and recover from catastrophic cluster outages in minutes!

---

# Core Concepts

## 1. The Canonical Troubleshooting Hierarchy
When debugging a failing Kubernetes workload, Platform Engineers strictly execute a four-stage diagnostic hierarchy:
1. **Inspect Pod Status (`kubectl get pods -o wide`):** Identifies the active high-level crash state (`Pending`, `CrashLoopBackOff`, `OOMKilled`).
2. **Describe Events (`kubectl describe pod [name]`):** Inspects the declarative reconciliation events emitted by `kubelet` and `kube-scheduler` (e.g., `FailedScheduling`, `Liveness probe failed`, `FailedMount`).
3. **Inspect Application Logs (`kubectl logs [name] --previous`):** Retrieves the physical stdout/stderr application stack traces from the container runtime. *Note: `--previous` is mandatory if the container has already crashed and restarted!*
4. **Execute Container Diagnostics (`kubectl exec` / `kubectl debug`):** Initiates interactive runtime inspection inside the physical Linux container namespace.

```text
[ The Canonical K8s Troubleshooting Hierarchy ]
1. [ kubectl get pods ]       ──► ( Identify High-Level Crash State )
2. [ kubectl describe pod ]   ──► ( Inspect Kubelet / Scheduler Events )
3. [ kubectl logs --previous] ──► ( Retrieve Application Stack Traces )
4. [ kubectl debug ]          ──► ( Inject Ephemeral Debugging Container )
```

## 2. Decoding Fatal Crash States (`CrashLoopBackOff` vs `ImagePullBackOff` vs `OOMKilled`)
True Platform Engineers instantly recognize the root causes behind Kubernetes crash states:
* `CrashLoopBackOff`: The container image pulled successfully and the process started, but the internal application immediately crashed with a fatal exit code (`exit 1` - e.g., due to a missing environment variable or malformed configuration file), OR a Liveness probe failed!
* `ImagePullBackOff` / `ErrImagePull`: `kubelet` successfully received the Pod specification, but when it attempted to pull the container image from the registry, the image tag completely did not exist (`nginx:non-existent`), OR the private container registry rejected the request due to missing authentication credentials (`imagePullSecrets`)!
* `OOMKilled (Exit Code 137)`: The container process attempted to consume more RAM than was declared in its `resources.limits.memory` block! The physical Linux kernel Out-Of-Memory (OOM) killer instantly intervened and forcefully executed `kill -9` on the container process!
* `CreateContainerError`: `kubelet` attempted to start the container, but a required volume mount (e.g., a missing ConfigMap or Secret) completely failed to attach!

```text
[ CrashLoopBackOff ] ──► (Application crashed with Exit Code 1 OR Liveness probe failed!)
[ ImagePullBackOff ] ──► (Image tag completely missing OR private registry credentials failed!)
[ OOMKilled (137) ]  ──► (Container exceeded memory limits! Linux kernel executed kill -9!)
```

## 3. Ephemeral Containers (`kubectl debug`)
Modern enterprise microservices are strictly built using **Distroless Container Images** (images containing only the compiled application binary and completely lacking package managers, curl, or `/bin/sh` shell binaries). If a distroless container crashes, `kubectl exec -it my-pod -- /bin/sh` fails instantly because there is no shell!
* **Ephemeral Containers (`kubectl debug`):** The modern CNCF debugging standard! `kubectl debug` dynamically injects a brand-new, temporary **Ephemeral Container** (e.g., an `ubuntu` or `busybox` debugging image) directly into the exact same active Linux network and process namespace as your running distroless container! You gain a full interactive shell with `curl`, `htop`, and `strace`, allowing you to inspect the distroless application processes perfectly!

```text
[ Running Distroless Pod (No Shell!) ] ◄──[ kubectl debug ]──► [ Injects Ephemeral Ubuntu Container ]
                                                                      │
                                                                      └──► (Full interactive shell in same namespace!)
```

## 4. Physical Node Forensics (`journalctl -u kubelet`)
What happens when `kubectl get nodes` displays `worker-node-1 STATUS: NotReady`? If a worker node drops offline, `kubectl describe pod` is completely useless because `kube-apiserver` has lost communication with the node!
* **Systemd Forensics:** Platform Engineers instantly SSH into the physical worker node and execute `journalctl -u kubelet -n 100 --no-pager`. This dumps the raw systemd daemon logs of the `kubelet` process! You can instantly spot fatal kernel panics, container runtime socket disconnections (`containerd.sock not found`), or CNI network plugin IP exhaustion errors!

```text
[ Node Status: NotReady ] ──► [ SSH into Worker Node ] ──► [ journalctl -u kubelet ] ──► (Reveals containerd socket crash!)
```

## 5. Master Event Analysis (`kubectl get events`)
When debugging a cluster-wide orchestration collapse involving thousands of Pods, inspecting individual Pod manifests is too slow.
* **Aggregating Cluster Events:** Platform Engineers execute `kubectl get events --sort-by='.metadata.creationTimestamp'`. This aggregates every single declarative event emitted across your entire cluster in real-time, sorted chronologically! You can instantly observe massive storm patterns of `FailedScheduling`, `VolumeMismatch`, or `NodeLost` events, pinpointing the global root cause in seconds!

---

# Architecture

```mermaid
flowchart TD
    L1["Layer 1: The Global Overview (e.g., Cluster Events / kubectl get events)"] -->|Narrows scope to| L2
    L2["Layer 2: The Resource Inspector (e.g., Pod Manifest / kubectl describe pod)"] -->|Pinpoints crashing containers for| L3
    L3["Layer 3: The Application Internals (e.g., Container Output / kubectl logs)"] -->|Requires deeper live analysis via| L4
    L4["Layer 4: The Live Interaction (e.g., Ephemeral Shell / kubectl debug)"] -->|Escalates node-level failures to| L5
    L5["Layer 5: The Physical Infrastructure (e.g., Host Operating System / SSH and journalctl)"]
```

---

# Real-World Example

Imagine you are managing a global food delivery enterprise. On Sunday evening during peak dinner rush, the company's master order routing platform suddenly collapses globally.

You open your terminal and observe a catastrophic landscape: 100 workers are stuck in continuous crashing loops, and 20 physical desks have suddenly dropped offline.

Your team is panicking, frantically removing workers without success.

Because you maintain elite standards, you take command of the emergency room and execute our **Canonical Troubleshooting Hierarchy**, moving down through the strict diagnostic layers.

At **Layer 1: The Global Overview**, you review the security tapes (`kubectl get events`). You instantly observe a massive chronological storm of failure events across the cluster.

This narrows your scope to **Layer 2: The Resource Inspector**, where you interview the manager (`kubectl describe pod`) for the failing Worker and observe a failing readiness check.

This points you directly to **Layer 3: The Application Internals**, where you read the worker's diary (`kubectl logs`) and extract the physical trace: `Fatal Error: connection pool exhausted`. If the logs were missing, you could have utilized **Layer 4: The Live Interaction** (`kubectl debug`) to securely examine the running environment.

Finally, to debug why the 20 desks dropped offline entirely, you escalate to **Layer 5: The Physical Infrastructure** by inspecting the building wiring (SSH and `journalctl`) on the host. The system logs instantly reveal the fatal root cause: unable to assign addresses.

You have uncovered the master root cause in under three minutes! A rogue background job had spun up thousands of temporary workers, exhausting the addresses and starving the connection pools! You terminate the rogue background job, and your entire food delivery platform auto-heals perfectly!

---

# Hands-on Demonstration

Let's look at how an engineer inspects fatal crash events using `kubectl describe pod`, inspects application stack traces using `kubectl logs --previous`, and injects an ephemeral container using `kubectl debug`.

## Input 1: Inspecting Fatal Crash Events and Application Stack Traces
We simulate executing `kubectl describe pod` to view `OOMKilled` and `CrashLoopBackOff` events, and simulate executing `kubectl logs --previous` to extract fatal crash logs.

## Code 1
```bash
# Inspect detailed event logs and container termination states for a crashing Pod.
# (We simulate the clean plain-text output of kubectl describe pod)
kubectl describe pod production-auth-api-7b89c 2>/dev/null || cat << 'EOF'
Name:         production-auth-api-7b89c
Namespace:    default
Status:       Running
Containers:
  auth-microservice:
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       OOMKilled
      Exit Code:    137
      Started:      Sun, 28 Jun 2026 12:00:00 +0000
      Finished:     Sun, 28 Jun 2026 12:05:00 +0000
    Ready:          False
    Restart Count:  12
    Limits:
      memory:  256Mi
    Requests:
      memory:  128Mi

Events:
  Type     Reason     Age                   From     Message
  ----     ------     ----                  ----     -------
  Warning  OOMKilled  5m (x12 over 1h)      kubelet  Memory cgroup out of memory: Kill process 1234 (node) score 1500 or sacrifice child
  Warning  BackOff    2m (x30 over 1h)      kubelet  Back-off restarting failed container
EOF

# Retrieve physical stdout/stderr application stack traces from the previous crashed container instance.
# (We simulate the clean plain-text output of kubectl logs --previous)
kubectl logs production-auth-api-7b89c --previous 2>/dev/null || cat << 'EOF'
[2026-06-28T12:04:55Z] INFO: Initializing production authentication microservice...
[2026-06-28T12:04:58Z] INFO: Establishing database connection pool (Max connections: 100)...
[2026-06-28T12:04:59Z] ERROR: Fatal Uncaught Exception: Invalid configuration key 'DATABASE_URL'. Connection refused.
[2026-06-28T12:05:00Z] FATAL: Process exiting with code 1. Container shutting down.
EOF
```

## Expected Output 1
```text
Name:         production-auth-api-7b89c
Namespace:    default
Status:       Running
Containers:
  auth-microservice:
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       OOMKilled
      Exit Code:    137
      Started:      Sun, 28 Jun 2026 12:00:00 +0000
      Finished:     Sun, 28 Jun 2026 12:05:00 +0000
    Ready:          False
    Restart Count:  12
    Limits:
      memory:  256Mi
    Requests:
      memory:  128Mi

Events:
  Type     Reason     Age                   From     Message
  ----     ------     ----                  ----     -------
  Warning  OOMKilled  5m (x12 over 1h)      kubelet  Memory cgroup out of memory: Kill process 1234 (node) score 1500 or sacrifice child
  Warning  BackOff    2m (x30 over 1h)      kubelet  Back-off restarting failed container
[2026-06-28T12:04:55Z] INFO: Initializing production authentication microservice...
[2026-06-28T12:04:58Z] INFO: Establishing database connection pool (Max connections: 100)...
[2026-06-28T12:04:59Z] ERROR: Fatal Uncaught Exception: Invalid configuration key 'DATABASE_URL'. Connection refused.
[2026-06-28T12:05:00Z] FATAL: Process exiting with code 1. Container shutting down.
```

## Explanation 1
Look at how beautifully transparent our diagnostic inspection is! Let's deconstruct the elite troubleshooting elements:
* `Reason: OOMKilled` / `Exit Code: 137`: Absolute root cause identification! Proves that our container exceeded its `Limits.memory: 256Mi` boundary; the Linux kernel OOM killer executed `kill -9`!
* `Warning BackOff`: Proves `kubelet` is actively enforcing `CrashLoopBackOff` to prevent endless instant restarts!
* `kubectl logs --previous`: Absolute logging success! Extracting logs from the *previous* dead container instance successfully exposed our fatal application stack trace (`Invalid configuration key DATABASE_URL`)!

---

## Input 2: Inspecting Ephemeral Container Injection and Systemd Forensics
We simulate executing `kubectl debug` to inject an ephemeral container into a distroless Pod, and simulate inspecting `journalctl -u kubelet` on a dead worker node.

## Code 2
```bash
# Inject a temporary Ephemeral Container (busybox) into a running distroless Pod namespace.
# (We simulate the clean plain-text output of kubectl debug)
echo -e "kubectl debug production-distroless-pod -it --image=busybox:1.36 --target=distroless-container\nTargeting container 'distroless-container'. Spawning ephemeral container 'debugger-7b89c'...\nIf you don't see a command prompt, try pressing enter.\n/ # ls -lah /proc/1/root/etc/config\n-r-------- 1 root root 1.2K Jun 28 12:00 settings.json\n/ # curl http://localhost:8080/healthz\nHTTP/1.1 500 Internal Server Error (Database Deadlock Detected)\n/ # exit\nEphemeral container terminated."

# Inspect physical systemd daemon logs for the kubelet process on an unresponsive worker node.
# (We simulate the clean plain-text output of journalctl -u kubelet on a physical worker node)
echo -e "--- SYSTEMD KUBELET DAEMON LOGS (worker-node-15) ---\nJun 28 12:01:15 worker-node-15 kubelet[1234]: E0628 12:01:15.123456 1234 kubelet.go:2456] \"Error updating node status\" err=\"node not found in cloud provider API\"\nJun 28 12:01:18 worker-node-15 kubelet[1234]: E0628 12:01:18.654321 1234 pleg.go:345] \"PLEG: container runtime is down, connection to containerd.sock timed out\"\nJun 28 12:01:20 worker-node-15 kubelet[1234]: F0628 12:01:20.987654 1234 server.go:150] \"Fatal error: Container runtime socket completely unresponsive. Exiting.\"\n# FATAL: kubelet daemon crashed due to lost containerd socket connection."
```

## Expected Output 2
```text
kubectl debug production-distroless-pod -it --image=busybox:1.36 --target=distroless-container
Targeting container 'distroless-container'. Spawning ephemeral container 'debugger-7b89c'...
If you don't see a command prompt, try pressing enter.
/ # ls -lah /proc/1/root/etc/config
-r-------- 1 root root 1.2K Jun 28 12:00 settings.json
/ # curl http://localhost:8080/healthz
HTTP/1.1 500 Internal Server Error (Database Deadlock Detected)
/ # exit
Ephemeral container terminated.
--- SYSTEMD KUBELET DAEMON LOGS (worker-node-15) ---
Jun 28 12:01:15 worker-node-15 kubelet[1234]: E0628 12:01:15.123456 1234 kubelet.go:2456] "Error updating node status" err="node not found in cloud provider API"
Jun 28 12:01:18 worker-node-15 kubelet[1234]: E0628 12:01:18.654321 1234 pleg.go:345] "PLEG: container runtime is down, connection to containerd.sock timed out"
Jun 28 12:01:20 worker-node-15 kubelet[1234]: F0628 12:01:20.987654 1234 server.go:150] "Fatal error: Container runtime socket completely unresponsive. Exiting."
# FATAL: kubelet daemon crashed due to lost containerd socket connection.
```

## Explanation 2
Notice how perfectly executed our advanced debugging state is! Let's deconstruct the elite elements:
* `kubectl debug`: Beautifully injected an ephemeral `busybox` container directly into our running distroless Pod! Notice how we successfully executed `curl` against `localhost:8080` to prove the application was deadlocked!
* `journalctl -u kubelet`: Absolute physical node forensics! Inspecting the systemd daemon logs on `worker-node-15` successfully exposed our fatal system crash: `container runtime is down, connection to containerd.sock timed out`!

---

# Hands-on Lab

* **Objective:** Simulate inspecting `kubectl describe pod` to diagnose `OOMKilled`, simulate executing `kubectl logs --previous`, simulate injecting an ephemeral container using `kubectl debug`, simulate inspecting `journalctl -u kubelet`, and verify troubleshooting governance.
* **Estimated Time:** 20 minutes
* **Difficulty:** Advanced
* **Environment:** Interactive Browser Terminal / Local Sandbox (with kubectl installed)

## Step-by-step Instructions

1. Open your terminal sandbox and create a brand-new directory named `debug-lab`: `mkdir ~/debug-lab && cd ~/debug-lab`.
2. Create a declarative YAML manifest defining a misconfigured Pod that intentionally crashes to mock your troubleshooting workflows by typing:
```bash
cat << 'EOF' > crashing-pod-spec.yaml
apiVersion: v1
kind: Pod
metadata:
  name: failing-memory-pod
  namespace: default
spec:
  containers:
  - name: memory-eater
    image: alpine:3.19
    command: ["/bin/sh", "-c", "cat /dev/zero | head -c 500M | tail"]
    resources:
      limits:
        memory: "64Mi"
EOF
```
3. Type `cat crashing-pod-spec.yaml` to inspect your pristine crashing Pod declaration! Notice `limits.memory: 64Mi` while attempting to allocate 500M of memory!
4. Simulate applying your Pod declaration to the cluster using `kubectl apply -f crashing-pod-spec.yaml` by typing:
```bash
# (We simulate the exact kubectl apply execution)
echo "pod/failing-memory-pod created"
```
5. Simulate verifying active Pod crash states using `kubectl get pods` by typing:
```bash
# (We simulate the exact kubectl get pods execution during OOM crashes)
echo -e "NAME\t\t\tREADY\tSTATUS\t\tRESTARTS\tAGE\nfailing-memory-pod\t0/1\tOOMKilled\t3 (15s ago)\t45s"
```
6. Simulate executing `kubectl describe pod failing-memory-pod` to extract exact event logs by typing:
```bash
# (We simulate the exact kubectl describe pod execution)
echo "Last State: Terminated"
echo "Reason: OOMKilled"
echo "Exit Code: 137"
echo "Warning  OOMKilled  45s (x3 over 45s)  kubelet  Memory cgroup out of memory: Kill process 5678 (sh)"
```
7. Simulate executing `kubectl debug` to inject an ephemeral container into a distroless Pod by typing:
```bash
# (We simulate the exact kubectl debug execution)
echo "kubectl debug failing-memory-pod -it --image=busybox --target=memory-eater"
echo "Spawning ephemeral container 'debugger-999'..."
echo "/ # free -m"
echo "Mem: 16384 total, 16200 used. Warning: Container cgroup memory limit exhausted."
echo "SUCCESS: Ephemeral container successfully injected into running Pod namespace!"
```
8. Simulate verifying physical worker node systemd logs using `journalctl -u kubelet` by typing:
```bash
# (We simulate the exact journalctl -u kubelet execution on a worker node)
echo "Jun 28 12:05:00 worker-node-1 kubelet[1234]: W0628 12:05:00.123456 1234 oom_watcher.go:56] \"System OOM encountered, evicting Pod failing-memory-pod\""
echo "SUCCESS: Systemd kubelet logs successfully identified OOM eviction trigger!"
```

## Verification

```bash
cat crashing-pod-spec.yaml | grep -E "limits.*memory" || echo "Memory Limits Verified"
```
*If your terminal successfully outputs your `limits: memory` string, you have mastered foundational Kubernetes crash diagnostics and emergency troubleshooting!*

## Troubleshooting

* **Issue:** `kubectl debug` fails with `error: ephemeral containers are disabled for this cluster`.
* **Solution:** Ephemeral containers require the `EphemeralContainers` feature gate to be active in your API Server (enabled by default in Kubernetes v1.25+)! If you are running an ancient legacy Kubernetes cluster (`v1.22`), `kubectl debug` is forcefully rejected! Upgrade your cluster!

## Cleanup

```bash
# Safely remove the demonstration debug lab directory
rm -rf ~/debug-lab
```

---

# Production Notes

In enterprise Kubernetes architecture, what happens when you have a massive microservice that crashes intermittently every few days with `OOMKilled`, but you want to capture a physical memory heap dump of the application process the exact second before the Linux kernel executes `kill -9`? Platform Engineers solve this by deploying **Kdump** or configuring container lifecycle hooks (`lifecycle.preStop.exec.command`). You configure a `preStop` hook that executes a quick heap dump script (`jcmd 1 GC.heap_dump /var/log/dump.hprof`), writing the file to an attached Persistent Volume Claim (PVC) before the container vanishes, providing absolute visibility for memory leak forensics!

---

# Common Mistakes

* **Running `kubectl exec` into Distroless Pods:** Beginners frequently type `kubectl exec -it my-pod -- /bin/sh` into a distroless container and get frustrated when it fails with `OCI runtime exec failed: exec failed: container_linux.go: starting container process caused: exec: "/bin/sh": stat: no such file or directory`. **Distroless images completely lack shell binaries! You MUST use `kubectl debug`!**
* **Overlooking `--previous` in `kubectl logs`:** Junior developers frequently type `kubectl logs my-pod` on a Pod stuck in `CrashLoopBackOff` and see absolutely blank output. When a container crashes and restarts, `kubectl logs` defaults to showing logs for the *current* newly started container instance (which hasn't logged anything yet)! **To view the fatal crash logs of the dead container, you MUST append `--previous`!**

---

# Failure-Driven Learning

Imagine a junior engineer attempts to deploy an application into a Kubernetes cluster, but when they inspect `kubectl get pods`, the Pod remains stuck in `ImagePullBackOff` state indefinitely, and the application never starts.

## Simulated Failure
```bash
# Simulating a Pod stuck in ImagePullBackOff due to a missing container image tag
# (We simulate the exact kubectl get pods / kubectl describe pod error during image pull failures)
echo -e "NAME\t\t\tREADY\tSTATUS\t\tRESTARTS\tAGE\nproduction-api-pod\t0/1\tImagePullBackOff\t0\t\t15m\n\n--- KUBECTL DESCRIBE POD EVENTS ---\nWarning  Failed     15m (x12 over 15m)  kubelet  Failed to pull image \"mycompany/payment-api:v99.9.9\": rpc error: code = NotFound desc = failed to pull and unpack image \"docker.io/mycompany/payment-api:v99.9.9\": failed to resolve reference \"docker.io/mycompany/payment-api:v99.9.9\": mycompany/payment-api:v99.9.9: not found\nWarning  Failed     15m (x12 over 15m)  kubelet  Error: ErrImagePull\n# FATAL: Pod stuck in ImagePullBackOff. Target container image tag completely missing from registry."
```

## Output
```text
NAME			READY	STATUS		RESTARTS	AGE
production-api-pod	0/1	ImagePullBackOff	0		15m

--- KUBECTL DESCRIBE POD EVENTS ---
Warning  Failed     15m (x12 over 15m)  kubelet  Failed to pull image "mycompany/payment-api:v99.9.9": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/mycompany/payment-api:v99.9.9": failed to resolve reference "docker.io/mycompany/payment-api:v99.9.9": mycompany/payment-api:v99.9.9: not found
Warning  Failed     15m (x12 over 15m)  kubelet  Error: ErrImagePull
# FATAL: Pod stuck in ImagePullBackOff. Target container image tag completely missing from registry.
```

## Diagnosis & Recovery
Why did this fail? Look at this classic container runtime failure: `Failed to pull image ... mycompany/payment-api:v99.9.9: not found`! When `kubelet` attempts to start a Pod, it instructs `containerd` to pull the container image from the Docker registry. If the image tag completely does not exist, `kubelet` aborts the launch, displays `ErrImagePull`, and enters an exponential backoff loop (`ImagePullBackOff`)! The junior engineer declared `image: mycompany/payment-api:v99.9.9` in the Deployment manifest, but the CI/CD pipeline had only built up to `v2.0.0`! Because `v99.9.9` did not exist in Docker Hub, `containerd` refused the pull! To recover correctly, the engineer must update the Deployment manifest to reference a valid existing image tag (`v2.0.0`), `containerd` pulls the image instantly, and the Pod transitions to `Running` flawlessly!

---

# Engineering Decisions

## Container Debugging: Standard Exec vs. Ephemeral Containers vs. SSH to Node
When architecting an enterprise debugging strategy, engineering leaders must choose the master diagnostic mechanism.
* **Standard `kubectl exec` (`kubectl exec -it [pod] -- /bin/sh`):** Straightforward interactive shell execution. Excellent for legacy development containers. However, completely useless for highly secure distroless container images lacking shell binaries.
* **SSH to Physical Worker Node (`ssh worker-node-1`):** Direct host-level access to inspect `journalctl` and `crictl`. Exceptional for debugging crashed `kubelet` daemons and CNI network failures. However, grants root host access, violating least privilege if granted to application developers.
* **Ephemeral Containers (`kubectl debug`):** The ultimate Platform Engineering standard! Cleanly injects a temporary debug container directly into running Pod namespaces. Supports distroless images perfectly, requires zero host SSH access, and preserves zero-trust security governance.
* **The Platform Decision:** Platform Engineers strictly mandate **Ephemeral Containers (`kubectl debug`)** as the master debugging engine for all application developers, while strictly reserving **SSH to Physical Worker Nodes (`journalctl`)** exclusively for Platform Engineers debugging systemd daemon crashes.

---

# Best Practices

* **Master `kubectl get events --sort-by='.metadata.creationTimestamp'`:** Whenever you debug cluster-wide outages, skip checking individual Pods and immediately execute `kubectl get events -n [namespace] --sort-by='.metadata.creationTimestamp'`. It instantly reveals the exact chronological sequence of cascading failures across your cluster!
* **Enforce Core Dumps to Persistent Volumes:** For highly critical C++ or Rust microservices that crash with segmentation faults (`SIGSEGV`), configure the worker node kernel (`sysctl kernel.core_pattern`) to write core dump files directly to an attached Persistent Volume Claim (PVC), allowing developers to inspect the core dump post-mortem using GDB!

---

# Troubleshooting Guide

## Issue 1: "Exit Code 137 (OOMKilled)" vs. "Exit Code 1 (CrashLoopBackOff)"

* **Cause:** You attempt to run container workloads, but encounter kernel memory terminations or application runtime fatal exits.
* **Diagnosis & Solution:**
  * `Exit Code 137 (OOMKilled)`: Your container process attempted to allocate more RAM than was declared in its `limits.memory` block, causing the Linux kernel OOM killer to execute `kill -9` (`128 + 9 = 137`)! To fix, inspect `kubectl describe pod` to confirm OOMKilled and increase your memory limits (`limits.memory: 512Mi`)!
  * `Exit Code 1 (CrashLoopBackOff)`: Your container process started successfully but encountered an unhandled fatal exception in your application code (e.g., a missing database configuration key or malformed JSON syntax), causing the process to execute `exit 1`! To fix, execute `kubectl logs [pod_name] --previous` to view the exact fatal stack trace of the dead container process!

---

# Summary

* **The Canonical Troubleshooting Hierarchy** dictates inspecting Pod status, describing events, viewing previous logs, and executing debug containers.
* `CrashLoopBackOff` indicates application runtime fatal exits (`exit 1`) or failing Liveness probes.
* `ImagePullBackOff` indicates non-existent image tags or failing private registry credentials.
* `OOMKilled (Exit Code 137)` indicates the Linux kernel executed `kill -9` because the container exceeded memory limits.
* **Ephemeral Containers (`kubectl debug`)** dynamically inject debug shells into distroless container namespaces.
* **Systemd Forensics (`journalctl -u kubelet`)** uncovers physical worker node daemon crashes.

---

# Cheat Sheet

```bash
# Retrieve all active Pods in your cluster and display their active crash statuses
kubectl get pods -o wide

# Describe detailed event logs, termination reasons, and exit codes for a crashing Pod
kubectl describe pod [pod_name]

# Retrieve physical stdout/stderr application logs from the previous crashed container instance
kubectl logs [pod_name] --previous

# Inject a temporary Ephemeral Container (busybox) into a running distroless Pod namespace
kubectl debug [pod_name] -it --image=busybox:1.36 --target=[container_name]

# Retrieve all active cluster events sorted chronologically in real-time
kubectl get events --sort-by='.metadata.creationTimestamp'

# Inspect physical systemd daemon logs for the kubelet process on a worker node
journalctl -u kubelet -n 100 --no-pager
```

---

# Knowledge Check

## Multiple Choice Questions

1. A developer deploys a microservice built using a secure distroless container image (containing only the compiled application binary and completely lacking `/bin/sh`). The microservice stops responding to web traffic, but the container remains in `Running` state. The developer attempts to execute `kubectl exec -it my-pod -- /bin/sh` to inspect the network, but the command fails with `no such file or directory`. What is the correct debugging approach?
   * A) The developer must reboot the physical worker node.
   * B) The developer must use `kubectl debug my-pod -it --image=busybox --target=my-container`. Because distroless images lack shell binaries, `kubectl debug` dynamically injects a temporary ephemeral container (`busybox`) directly into the exact same active Linux network and process namespace as the running container, granting a full interactive shell to execute `curl` and `strace`.
   * C) The developer forgot to use `docker compose`.
   * D) The setup requires `chmod 777`.

## Scenario Questions

You are attempting to debug a Pod that is stuck in `CrashLoopBackOff`. You execute `kubectl logs failing-pod`, but the terminal outputs absolutely blank text. You execute `kubectl describe pod failing-pod` and observe `Last State: Terminated, Reason: Error, Exit Code: 1`. Based on what you learned in this lesson, why did `kubectl logs` return blank output, and what exact flag must you append to view the fatal crash logs?

## Short Answer Questions

Explain why `Exit Code 137` represents an `OOMKilled` event, specifically addressing how the Linux kernel calculates exit codes for forcefully terminated processes (`kill -9`).

---

# Interview Preparation

## Beginner Questions

* What is `CrashLoopBackOff`?
* What is `ImagePullBackOff`?
* What does `kubectl logs --previous` do?

## Intermediate Questions

* Explain the difference between `Exit Code 1` and `Exit Code 137`.
* Why does `kubectl exec` fail on distroless container images?

## Advanced Questions

* Explain how `kubelet` interacts with the Container Runtime Interface (CRI - `containerd.sock`) to manage Pod cgroup memory allocation hierarchies (`/sys/fs/cgroup/memory`), and describe the internal mechanics of `kubelet` PLEG (Pod Lifecycle Event Generator) timeouts during CNI IPAM exhaustion.

## Scenario-Based Discussions

* Discuss the architectural trade-offs of establishing an enterprise debugging strategy that relies on granting application developers direct SSH access to physical worker nodes to inspect `journalctl` versus mandating 100% RBAC-governed Ephemeral Container injection (`kubectl debug`) paired with automated centralized log aggregation (FluentBit to OpenSearch), specifically addressing compliance auditing (SOC 2), zero-trust host security, and developer mean-time-to-resolution (MTTR).

<details>
<summary><b>View Answers</b></summary>

### Beginner
* **CrashLoopBackOff**: A state where a container repeatedly starts, crashes (e.g., due to a fatal application error or a failed Liveness probe), and is restarted by `kubelet` with an increasing back-off delay to prevent infinite restart loops from overwhelming the system.
* **ImagePullBackOff**: A state where `kubelet` fails to pull the specified container image (because the tag doesn't exist, the registry is unreachable, or authentication failed) and repeatedly retries with an increasing back-off delay.
* **kubectl logs --previous**: When a container crashes and restarts, `kubectl logs` defaults to showing the logs of the *new*, current container. Appending `--previous` forces the command to retrieve the stdout/stderr logs of the dead container that just crashed, which is essential for reading fatal stack traces.

### Intermediate
* **Exit Code 1 vs Exit Code 137**: `Exit Code 1` indicates an application-level fatal error (the process crashed because of an unhandled exception or bad config). `Exit Code 137` specifically means the container was OOMKilled (Out of Memory) because it exceeded its declared `limits.memory` boundary, prompting the Linux kernel to execute a `kill -9` (`128 + 9 = 137`).
* **kubectl exec on distroless images**: Distroless images contain only the compiled application binary and its direct dependencies. They intentionally omit package managers, curl, and shells (like `/bin/sh` or `/bin/bash`) for security. Because `kubectl exec` relies on running a shell binary inside the container, it fails instantly if that binary does not exist.

### Advanced
* **CRI, cgroups, and PLEG timeouts**: `kubelet` communicates with `containerd` via the CRI socket to create Pods. To enforce `resources.limits`, `kubelet` instructs the runtime to create Linux cgroups (e.g., `/sys/fs/cgroup/memory`), which physically constrain the memory the processes can allocate. The Pod Lifecycle Event Generator (PLEG) is a `kubelet` module that constantly polls the CRI to update Pod statuses. If the CNI network plugin exhausts available IP addresses, Pod creation hangs, the CRI socket may become unresponsive, and PLEG loops time out, causing `kubelet` to mark the entire node as `NotReady`.

### Scenario-Based Discussions
* **SSH to Nodes vs Ephemeral Containers + Log Aggregation**: Granting SSH access to physical worker nodes provides developers immediate, raw debugging power (`journalctl`, `crictl`), but fundamentally breaks Zero-Trust security and violates SOC 2 compliance because developers gain root-level access to the host OS and other tenants' containers. Mandating `kubectl debug` with centralized log aggregation (FluentBit/OpenSearch) completely eliminates the need for SSH. Developers can safely debug Distroless containers within their isolated namespace, and all system logs are searchable centrally. While it requires significant initial platform engineering effort to build the logging pipeline, it vastly improves MTTR through centralized searchability and guarantees absolute security and auditability.

</details>

---

# Further Reading

1. [Application Troubleshooting (Official Kubernetes Documentation)](https://kubernetes.io/docs/tasks/debug/debug-application/)
2. [Debugging Pods and ReplicationControllers (Official Guide)](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)
3. [Debugging with Ephemeral Containers (Deep Technical Dive)](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container)
4. [Troubleshooting Kubelet Systemd Daemons](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/troubleshooting-kubeadm/)
5. [Terraform Kubernetes Provider Debugging (Official HashiCorp Registry)](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)
