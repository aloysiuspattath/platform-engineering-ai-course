# Module 02: Linux Administration (`MOD-LINUX-ADM`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 02: Linux Administration**! 

In Module 01, you mastered the essential navigation and file management commands of the Linux terminal. You now know how to inspect your location, create directory structures, and filter text streams. However, navigating a single user account is only the beginning. As a Platform Engineer, you are responsible for administering entire multi-user cloud servers, securing system permissions, managing background daemons, and automating daily operations.

This module builds directly upon your foundational terminal skills. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, keeping explanations incredibly clear and beginner-friendly, and ensuring you develop verifiable, real-world engineering abilities.

---

# Capability Statement

> **"I can administer a Linux server, manage permissions, automate simple tasks, and troubleshoot common issues."**

By the end of this module, you will transition from a standard Linux user into a confident systems administrator capable of managing multi-user environments, inspecting resource consumption, configuring systemd services, and writing production-ready Bash automation scripts.

---

# Essential Module Anchors

* **Why am I learning this?** Cloud servers are shared, multi-user environments. Without rigorous administrative controls, user permissions, and process management, servers quickly succumb to resource exhaustion, security breaches, and service downtime.
* **How will I use it?** You will use these exact skills to grant developer permissions, inspect failing application processes (`ps`, `top`), configure startup daemons (`systemctl`), and write automated backup scripts.
* **Where does this fit into Platform Engineering?** Systems administration is the core operational engine of infrastructure management. You must know how to administer a single server before you can automate ten thousand servers using Terraform or Kubernetes.
* **What problem does it solve?** Manual server operation is slow and insecure. Linux administrative tools provide precise, granular, and fully automatable mechanisms for securing system resources and keeping critical services online.
* **Where will I use it later?** You will use these skills in Module 03 (Linux Internals), Module 04 (Networking), Module 06 (Docker), Module 10 (Kubernetes), and across every subsequent automation and reliability module.

---

# Lesson Directory

This module consists of seven progressive, highly instructional lessons:

1. **[MOD-LINUX-ADM-01: User & Group Administration (Multi-User Concepts & `sudo`)](lesson-01.md)**
2. **[MOD-LINUX-ADM-02: Linux Permission Mechanics (`chmod`, `chown`, Octal & Symbolic Modes)](lesson-02.md)**
3. **[MOD-LINUX-ADM-03: Process Inspection & Control (`ps`, `top`, `htop`, `kill`, Background Jobs)](lesson-03.md)**
4. **[MOD-LINUX-ADM-04: Service Management with Systemd (`systemctl`, Daemons & Startups)](lesson-04.md)**
5. **[MOD-LINUX-ADM-05: Networking Basics in the Terminal (`ip`, `ping`, `curl`, `ss`)](lesson-05.md)**
6. **[MOD-LINUX-ADM-06: Package Management & Repositories (`apt`, `dnf`, `pacman`)](lesson-06.md)**
7. **[MOD-LINUX-ADM-07: Bash Scripting Fundamentals (Variables, Loops, Conditionals & Execution)](lesson-07.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 70%
* **Intermediate:** 30%
* **Advanced:** 0%

*Note: In accordance with our Version 2.0 mastery learning progression model, advanced operating system internals (such as system calls, cgroups, and kernel namespaces) are strictly deferred to Module 03 (`MOD-LINUX-INT`).*
