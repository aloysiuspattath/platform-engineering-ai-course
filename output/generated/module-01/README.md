# Module 01: Linux Fundamentals for Platform Engineers

Version: 1.0.0

---

# Module Overview

Welcome to **Module 01: Linux Fundamentals for Platform Engineers**. 

In modern cloud and platform engineering, the Linux operating system is the universal foundation upon which all containerization (Docker), orchestration (Kubernetes), and AI infrastructure (vLLM, Ollama) execute. To build resilient, automated platforms, a platform engineer cannot view Linux as a black box of magical commands. You must understand the underlying kernel architecture, system call interfaces, process hierarchies, and resource management mechanics.

This module guides you through the internal anatomy of Linux, empowering you to debug performance bottlenecks, automate production workflows, secure execution environments, and make robust architectural trade-off decisions.

---

# Module Syllabus

This module comprises six sequential, deeply practical lessons:

* **[Lesson 01: Linux Architectural Fundamentals & Kernel Anatomy](lesson-01.md)** — User Space vs. Kernel Space, system calls (`syscalls`), hardware rings, and `strace`.
* **[Lesson 02: User, Group, and Permission Management (DAC & RBAC)](lesson-02.md)** — Discretionary Access Control, ACLs, `sudoers`, and Enterprise Privilege Governance.
* **[Lesson 03: Process Management, Daemons, and Systemd Initialization](lesson-03.md)** — Fork/Exec models, signals, zombie processes, Systemd units, and journals.
* **[Lesson 04: Advanced Bash Scripting & Production Automation](lesson-04.md)** — Idempotent script design, trap handling, subshells, and production automation patterns.
* **[Lesson 05: Linux Logging, System Monitoring & Diagnostics](lesson-05.md)** — `journalctl`, `htop`, `iostat`, `vmstat`, `lsof`, and isolating resource saturation.
* **[Lesson 06: Linux Networking, Socket States & Kernel Firewalling](lesson-06.md)** — Network namespaces, `ss`, `ip`, Netfilter, and underlying container networking mechanics.

---

# Career Milestone Alignment

* **Milestone:** Milestone 1 — IT Foundations
* **Target Roles:** Junior Linux Administrator, Systems Administrator, Junior Platform Engineer
* **Core Competencies:** Linux navigation, process debugging, robust bash automation, permission governance, and root-cause analysis.

---

# Learning Tracks

Every lesson in this module explicitly delineates content across three depth tiers:

* 🟢 **Core:** Required foundational commands, core theories, and essential labs.
* 🔵 **Professional:** Production edge cases, high-concurrency performance considerations, troubleshooting rubrics, and interview prep.
* 🟣 **Expert:** Kernel data structures, advanced trace points, system internals, and low-level optimization trade-offs.

---

# Recommended Next Steps

Upon completing all six lessons in this module, proceed to the standalone hands-on verification lab (`labs/linux-automation.md`) to build your portfolio asset before advancing to **Module 02: Networking Fundamentals**.
