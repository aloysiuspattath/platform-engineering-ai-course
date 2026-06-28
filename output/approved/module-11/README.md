# Module 11: CI/CD Pipelines & Automation (`MOD-CICD`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 11: CI/CD Pipelines & Automation**!

In Module 10, you mastered the dominant operating system of the cloud: Kubernetes. You understand how to architect control planes, manage declarative Deployments, configure advanced networking Services, attach persistent storage volumes, inject dynamic configurations, and configure workload autoscaling.

However, having a pristine Kubernetes cluster is entirely useless if application developers cannot easily get their code running inside it!

In legacy engineering organizations, deploying code to production is a highly stressful, manual, error-prone event known as "Deployment Anxiety." A developer finishes writing a new feature on their local laptop, packages the files into a ZIP archive, and emails it to a sysadmin. The sysadmin manually logs into production servers via SSH, manually stops active services, manually unpacks the files, and manually restarts the application.

If the developer forgot to run unit tests on their laptop, broken code reaches production. If the sysadmin misses a single configuration step, the deployment fails. If a security vulnerability exists in an imported library, it goes completely undetected. And if the new code crashes, there is absolutely no automated mechanism to instantly roll back to the previous stable version!

**Manual deployments are an operational bottleneck that cripple engineering velocity!**

This module bridges your container orchestration capabilities directly into automated Continuous Integration and Continuous Delivery (CI/CD) pipelines using GitOps principles. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract pipeline mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable CI/CD capabilities.

---

# Capability Statement

> **"I can build automated CI/CD pipelines that build, test, scan, and deploy applications using GitOps principles."**

By the end of this module, you will establish the essential CI/CD capabilities required to design declarative GitHub Actions workflows, manage self-hosted runner execution environments, construct automated container build/test/scan pipelines (Trivy, Cosign), enforce GitOps deployment paradigms, and configure advanced progressive delivery strategies (Canary, Blue/Green) with automated rollback guardrails using ArgoCD.

---

# Essential Module Anchors

* **Why am I learning this?** Developers need fast, reliable mechanisms to ship code to production without manual intervention or deployment anxiety. If you cannot automate the highway connecting developer git commits to live Kubernetes deployments, you cannot operate as a Platform Engineer.
* **How will I use it?** You will use these exact skills to write declarative GitHub Actions workflow files (`.github/workflows/deploy.yml`), configure automated container vulnerability scanners (`trivy image`), author GitOps deployment manifests (`kind: Application` in ArgoCD), and manage progressive delivery rollouts (`kind: Rollout`).
* **Where does this fit into Platform Engineering?** CI/CD pipelines complete Stage 4 (Containerization & Orchestration). They serve as the master automated delivery mechanism that continuously pulls developer code from Stage 2 (Linux, Git, Security) and pushes it cleanly into your Stage 4 Kubernetes cluster environments.
* **What problem does it solve?** It solves the critical enterprise challenges of manual deployment errors, untested code releases, container security vulnerabilities, configuration drift, and lack of automated rollback safety.
* **Where will I use it later?** You will use these skills directly in Module 12 (Deploying Observability Stacks via GitOps), Module 14 (Automating AI Inference Engine Deployments), Module 15 (Automating MLOps Model Weight Ingestion Pipelines), and Module 16 (Providing Automated CI/CD Scaffolding via an Internal Developer Platform).

---

# Lesson Directory

This module consists of four progressive, highly instructional lessons:

1. **[MOD-CICD-01: Continuous Integration vs. Continuous Delivery Paradigms](lesson-01.md)**
2. **[MOD-CICD-02: Designing Declarative GitHub Actions Workflows & Runners](lesson-02.md)**
3. **[MOD-CICD-03: Automated Container Build, Test, and Scan Pipelines](lesson-03.md)**
4. **[MOD-CICD-04: Progressive Delivery (Canary, Blue/Green) & Rollback Automation (ArgoCD)](lesson-04.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 30%
* **Intermediate:** 50%
* **Advanced:** 20%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational CI/CD intuition and workflow syntax before advancing into complex container vulnerability scanning, GitOps reconciliation engines, and advanced progressive delivery automation.*
