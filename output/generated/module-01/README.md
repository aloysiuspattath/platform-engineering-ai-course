# Module 01: Linux Fundamentals for Platform Engineers

Welcome to **Module 01** of the Platform Engineering & AI Infrastructure Course! 

If you are starting your journey into Platform Engineering, you might wonder: *Why do we begin with Linux?* 

Here is the simple truth: **Linux is the grand operating system of the modern cloud.** Every container, every Kubernetes cluster, every database, and every massive AI training farm runs on top of a Linux machine. When you understand how Linux behaves beneath the surface, the entire world of cloud engineering becomes predictable, approachable, and incredibly exciting to build.

---

## 🎯 Our Educational Philosophy

This module is designed for complete beginners who aspire to become elite Platform Engineers. We do not believe in throwing you into dense, confusing manuals or expecting you to memorize a hundred commands without context.

Instead, we follow three golden rules throughout this module:
1. **We teach concepts before tools:** You will understand *why* a system works before you learn the syntax.
2. **We teach motivation before implementation:** You will understand the real-world human pain point a technology solves.
3. **We build intuition before optimization:** We keep things clear and simple, establishing a rock-solid foundation before discussing complex enterprise edge cases.

---

## 🗺️ Module Progression & Difficulty

To ensure you never experience cognitive overload, this module adheres strictly to our **Version 2.0 Difficulty Progression Model**:
* **Beginner (80%):** Crystal-clear definitions, elegant mental models, relatable analogies, and foundational terminal intuition.
* **Intermediate (20%):** Hands-on terminal practice, basic automation scripts, and essential configuration management.
* **Advanced (0%):** Zero dense C-library internals or overwhelming kernel memory structs. Advanced production edge cases are explicitly signposted for later modules!

---

## 📚 Lesson Directory

This module is broken down into six highly digestible, deeply practical lessons:

### [Lesson 01: Linux Architectural Fundamentals & Kernel Anatomy](lesson-01.md)
* **What you will learn:** The elegant boundary between User Space and Kernel Space, how applications communicate with hardware via System Calls (`syscalls`), and how to peek behind the curtain using `strace`.

### [Lesson 02: User, Group, and Permission Management (DAC & RBAC)](lesson-02.md)
* **What you will learn:** How Linux protects private files using Discretionary Access Control (DAC), how to read octal permission bits (`755`, `644`), how to share files securely via Access Control Lists (`setfacl`), and how to safely manage administrative powers (`sudo`).

### [Lesson 03: Process Management, Daemons, and Systemd Initialization](lesson-03.md)
* **What you will learn:** How programs come to life as processes (`fork` and `exec`), how to politely request a process to close (`SIGTERM` vs. `SIGKILL`), and how to create robust background services using Systemd.

### [Lesson 04: Advanced Bash Scripting & Production Automation](lesson-04.md)
* **What you will learn:** How to write professional, bulletproof automation scripts using Unofficial Bash Strict Mode (`set -euo pipefail`), how to ensure safe cleanup using exit traps (`trap`), and how to write scripts that can run multiple times safely (idempotency).

### [Lesson 05: Linux Logging, System Monitoring & Diagnostics](lesson-05.md)
* **What you will learn:** How to read the master system diary (`journalctl`), how to explore active memory through the `/proc` filesystem, how to identify what is using a network port (`lsof`), and how to systematically diagnose performance using the USE Method (Utilization, Saturation, Errors).

### [Lesson 06: Enterprise Linux Security, Cgroups & Capability Hardening](lesson-06.md)
* **What you will learn:** The incredible building blocks that make modern containers (like Docker) possible! You will learn how to break down administrative powers using Linux Capabilities (`setcap`), isolate environments using Kernel Namespaces (`unshare`), and limit resource usage using Control Groups (`cgroups v2`).

---

## 🚀 What's Next?

Take a deep breath, open up your terminal, and let's jump right into **[Lesson 01](lesson-01.md)**. You are about to unlock the foundational superpower of every great Platform Engineer!
