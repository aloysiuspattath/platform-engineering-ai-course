# Module 06: Containers & Docker (`MOD-DOCKER`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 06: Containers & Docker**!

In Modules 01 through 03, you explored the raw internals of the Linux kernel, mastering process trees, user permissions, Control Groups (`cgroups`), and Kernel Namespaces (`unshare`). In Module 04, you established the essential networking plumbing required for socket communications and reverse proxies. In Module 05, you adopted Git to manage your infrastructure configuration as immutable, version-controlled code.

Now, we combine all of these foundational Linux primitives into one of the most revolutionary architectural paradigms in modern software engineering: **Containerization**.

In traditional enterprise environments, deploying applications across diverse development laptops, staging servers, and production clouds was a waking nightmare of missing dependencies, mismatched library versions, and the infamous excuse: *"It works on my machine!"*

Docker and container runtimes permanently eliminate this friction by packaging application binaries, runtime libraries, environment variables, and system configurations into isolated, highly portable, immutable container images.

This module bridges your raw Linux namespace knowledge directly into modern container runtime architectures. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract container mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable containerization capabilities.

---

# Capability Statement

> **"I can build secure container images, orchestrate multi-container applications, manage volume persistence, and debug running containers."**

By the end of this module, you will establish the essential container engineering capabilities required to author highly optimized, multi-stage `Dockerfile` configurations, orchestrate complex microservice topologies using `docker compose`, configure persistent volume mounts, and perform live production container debugging using terminal inspection tools (`docker exec`, `docker logs`, `docker inspect`).

---

# Essential Module Anchors

* **Why am I learning this?** Modern cloud infrastructure runs almost exclusively on containerized microservices. If you cannot package an application into a container image, manage volume persistence, or debug a failing container, you cannot operate in a modern cloud platform.
* **How will I use it?** You will use these exact skills to build container images (`docker build`), run isolated application environments (`docker run`), inspect container networking and storage (`docker inspect`), execute interactive debugging sessions (`docker exec -it`), and orchestrate multi-tier architectures (`docker compose up`).
* **Where does this fit into Platform Engineering?** Containers form the fundamental execution unit of Stage 4 (Kubernetes & Container Orchestration) and Stage 6 (AI & MLOps Infrastructure). Every single microservice or AI inference model deployed in a modern enterprise is packaged as a container image.
* **What problem does it solve?** It solves the catastrophic *"It works on my machine"* dilemma, eliminates dependency drift between staging and production environments, and provides massive resource efficiency compared to heavyweight hardware hypervisors and virtual machines.
* **Where will I use it later?** You will use these skills directly in Module 09 (AWS ECS & ECR Cloud Registries), Module 10 (Kubernetes Architecture & Pod Lifecycle), Module 11 (CI/CD Automated Docker Builds with GitHub Actions), Module 14 (Dockerized AI Application Deployment), and Module 17 (Advanced Kubernetes Operators).

---

# Lesson Directory

This module consists of five progressive, highly instructional lessons:

1. **[MOD-DOCKER-01: Container Virtualization vs. Hypervisors (Putting Cgroups/Namespaces to Work)](lesson-01.md)**
2. **[MOD-DOCKER-02: Building Highly Optimized & Secure Container Images (Multi-Stage Builds)](lesson-02.md)**
3. **[MOD-DOCKER-03: Multi-Container Application Composition with Docker Compose](lesson-03.md)**
4. **[MOD-DOCKER-04: Container Networking, Volume Storage & Persistence](lesson-04.md)**
5. **[MOD-DOCKER-05: Production Container Debugging & Lifecycle Management](lesson-05.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 40%
* **Intermediate:** 45%
* **Advanced:** 15%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational container runtime intuition and Dockerfile mechanics before advancing into multi-stage image optimization, volume persistence, and live production debugging.*
