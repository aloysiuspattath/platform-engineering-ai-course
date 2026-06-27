# Module 01: Linux Fundamentals for Platform Engineers

Version: 1.0.0

---

# Module Overview

Welcome to **Module 01: Linux Fundamentals for Platform Engineers**. 

In modern cloud and platform engineering, the Linux operating system is the bedrock upon which all higher-level abstractions—such as Docker containers, Kubernetes clusters, service meshes, and AI inference engines—execute. Without a deep, uncompromising understanding of the Linux kernel, system calls, process trees, storage mechanisms, and security boundaries, a platform engineer cannot effectively troubleshoot production outages, optimize resource utilization, or build reliable Internal Developer Platforms (IDPs).

This module is designed to transform you from a basic Linux user into a confident systems architect capable of diagnosing kernel bottlenecks, automating robust production tasks, and hardening enterprise infrastructure.

---

# Module Metadata

* **Module ID:** MOD-LINUX
* **Title:** Linux Fundamentals for Platform Engineers
* **Difficulty:** Beginner to Intermediate (with Advanced/Expert deep dives)
* **Estimated Duration:** 15–20 Hours
* **Learning Tracks:** 🟢 Core / 🔵 Professional / 🟣 Expert
* **Version:** 1.0.0
* **Last Updated:** 2026-06-28

---

# Curricular Learning Objectives

By the end of this module, you will be able to:

1. **Explain Kernel Mechanics:** Differentiate between User Space and Kernel Space, trace system calls using `strace`, and interpret hardware execution rings.
2. **Govern System Access:** Configure Discretionary Access Control (DAC), Access Control Lists (ACLs), and enterprise `sudoers` restrictions.
3. **Manage Service Lifecycles:** Inspect process hierarchies, analyze memory maps, and write idempotent Systemd service units and timers.
4. **Automate Production Tasks:** Develop production-grade Bash scripts featuring robust error handling, exit trapping, and syslog integration.
5. **Debug Production Outages:** Analyze system utilization and log journals using `htop`, `iostat`, `vmstat`, `strace`, and `journalctl` to perform rapid root-cause analysis.
6. **Enforce Kernel Security:** Configure Linux Control Groups (`cgroups v2`), isolate processes via namespaces, and restrict root execution using Linux Capabilities.

---

# Lesson Directory

| Lesson ID | Lesson Title | Target Concepts | Estimated Time |
| :--- | :--- | :--- | :--- |
| **`lesson-01.md`** | Linux Architectural Fundamentals & Kernel Anatomy | Kernel vs. User Space, `syscalls`, Hardware Rings, `strace` | 45 Minutes |
| **`lesson-02.md`** | User, Group, and Permission Management (DAC & RBAC) | File permissions, Octal/Symbolic modes, ACLs, `sudoers` | 45 Minutes |
| **`lesson-03.md`** | Process Management, Daemons, and Systemd Initialization | Process states, Signals, Fork/Exec, Systemd Units & Timers | 60 Minutes |
| **`lesson-04.md`** | Advanced Bash Scripting & Production Automation | Idempotency, Error Trapping, Logging, `set -euo pipefail` | 60 Minutes |
| **`lesson-05.md`** | Linux Logging, System Monitoring & Diagnostics | `journalctl`, `iostat`, `vmstat`, Syslog, Bottleneck isolation | 60 Minutes |
| **`lesson-06.md`** | Enterprise Linux Security, Cgroups & Capability Hardening | `cgroups v2`, Kernel Namespaces, Linux Capabilities (`setcap`) | 60 Minutes |

---

# Prerequisites

* **Hardware/Environment:** Access to a Linux environment (Ubuntu 22.04 LTS / Debian 12 / RHEL 9 or a local virtual machine / WSL2 instance).
* **Base Knowledge:** Familiarity with opening a terminal and running basic navigational commands (`ls`, `cd`, `pwd`). No prior systems engineering experience is required.

---

# Handoff & Next Steps

Once you complete all six lessons within this module, you will proceed to **Module 02: Networking Fundamentals** and verify your learning by completing the standalone hands-on lab: `labs/linux-automation.md`.
