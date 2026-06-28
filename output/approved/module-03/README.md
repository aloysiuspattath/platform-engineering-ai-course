# Module 03: Linux Internals (`MOD-LINUX-INT`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 03: Linux Internals**! 

In Module 01, you established your foundation in terminal navigation and file management. In Module 02, you transitioned into a systems administrator capable of managing users, governing permissions, monitoring processes, configuring systemd daemons, and writing Bash automation scripts. 

Now, we make the thrilling leap from external systems administration to internal operating system mastery. As a Platform Engineer, when an enterprise database crashes silently, or a Kubernetes container mysteriously throttles its CPU, external administrative tools like `ps` or `systemctl` will only tell you *that* something broke. To discover *why* it broke, you must possess an X-ray understanding of the Linux kernel itself.

This module pulls back the curtain on the deepest mechanics of the operating system. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying complex computer science topics with crystal-clear analogies, and ensuring you develop elite, verifiable debugging abilities.

---

# Capability Statement

> **"I understand how Linux works internally, can trace system calls, manage resource cgroups, and debug complex system behavior."**

By the end of this module, you will transition from a systems administrator into an elite systems debugger capable of tracing live application system calls (`strace`), inspecting Virtual Filesystem file descriptors (`lsof`), understanding Out-Of-Memory (OOM) killer mechanics, and deconstructing the exact kernel building blocks of modern containers (Cgroups and Namespaces).

---

# Essential Module Anchors

* **Why am I learning this?** Cloud infrastructure is powered by the Linux kernel. When complex enterprise microservices suffer obscure memory leaks, file lock deadlocks, or CPU throttling, surface-level administrative tools are blind. You must know how to inspect the kernel's active execution mechanics.
* **How will I use it?** You will use these exact skills to trace failing software system calls (`strace`), identify locked files (`lsof`), audit kernel hardware rings, configure cgroup resource limits, and debug container networking namespaces.
* **Where does this fit into Platform Engineering?** Operating system internals form the bedrock of Containerization (Docker) and Container Orchestration (Kubernetes). You cannot truly debug a Kubernetes pod until you understand how the Linux kernel wraps processes in cgroups and namespaces.
* **What problem does it solve?** Mysterious application crashes and silent resource throttling are notoriously difficult to diagnose. Linux internal debugging utilities provide absolute mathematical proof of exactly what a software process is asking the kernel to do.
* **Where will I use it later?** You will use these skills directly in Module 06 (Docker & Containers), Module 10 (Kubernetes Architecture), Module 14 (Observability & eBPF), and across every subsequent advanced Site Reliability Engineering module.

---

# Lesson Directory

This module consists of seven progressive, highly instructional lessons:

1. **[MOD-LINUX-INT-01: Kernel Architecture & User Space vs. Kernel Space (Ring 0 vs Ring 3, System Calls)](lesson-01.md)**
2. **[MOD-LINUX-INT-02: Process Management Under the Hood (`fork`, `execve`, Zombie & Orphan Processes)](lesson-02.md)**
3. **[MOD-LINUX-INT-03: Memory Management & Virtual Memory (Paging, Swap, OOM Killer Mechanics)](lesson-03.md)**
4. **[MOD-LINUX-INT-04: Filesystems & The VFS Layer (Inodes, File Descriptors, `lsof`)](lesson-04.md)**
5. **[MOD-LINUX-INT-05: Advanced Debugging & Tracing (`strace`, `ltrace`, `dmesg`)](lesson-05.md)**
6. **[MOD-LINUX-INT-06: Resource Isolation with Cgroups (Control Groups, Memory/CPU Limiting)](lesson-06.md)**
7. **[MOD-LINUX-INT-07: Kernel Namespaces (PID, Mount, Net, User - The Building Blocks of Containers)](lesson-07.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 20%
* **Intermediate:** 50%
* **Advanced:** 30%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module formally unlocks advanced kernel internals, system calls, cgroups, and namespaces, serving as the definitive architectural bridge to Stage 2 (Docker & Containerization).*
