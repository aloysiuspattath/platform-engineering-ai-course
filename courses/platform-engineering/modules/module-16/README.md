# Module 16: Internal Developer Platform (IDP) & AI Templates (`MOD-IDP`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 16: Internal Developer Platform (IDP) & AI Templates**!

Throughout Stage 6 (AI & MLOps), you established the master physical infrastructure and automated deployment engines required to run elite AI workloads in Kubernetes. You can provision GPU nodes via the NVIDIA GPU Operator, configure Time-Slicing, wire InfiniBand networks, deploy Kubeflow `PyTorchJob` manifests, provision high-throughput vLLM serving engines with PagedAttention, decouple 140GB model weights via S3 init containers, and autoscale GPU pods dynamically using KEDA.

You have built the ultimate, enterprise-grade AI supercomputing platform.

**However, having an elite, automated AI supercomputing platform is entirely useless if your 500 enterprise developers and data scientists cannot figure out how to access it without filing IT support tickets!**

In legacy organizations, the relationship between application developers and platform engineers results in an absolute operational bottleneck known as **The Ticket-Ops Trap**.

When a data scientist needs to deploy a brand-new Large Language Model serving engine, they do not know how to author a complex Kubernetes `Deployment` manifest with `--gpu-memory-utilization=0.90`, configure a KEDA `ScaledObject`, or wire an S3 init container.

Instead, they file a Jira support ticket to the Platform Engineering team: *"Please provision a vLLM serving service for my Llama 3 70B model."*

Because the Platform Engineering team is managing infrastructure for 500 developers, the ticket sits in a massive backlog for **3 weeks**. When a platform engineer finally picks up the ticket, they manually copy-paste YAML manifests from an older project, manually create a Git repository, manually configure Jenkins pipelines, and manually hand the credentials over to the data scientist.

**Manual Jira ticketing and copy-paste YAML provisioning is an operational catastrophe!**

First, because platform engineers manually copy-paste manifests, configuration drift runs rampant. Half of the enterprise AI services are deployed with legacy PyTorch pickle files (`.pt`), half are missing KEDA autoscalers, and half are using unoptimized container images!

Second, when an application developer leaves the company, nobody knows who owns the AI service! The service becomes an "orphan microservice," sitting in the cluster for years consuming expensive physical GPUs while doing zero productive work.

Third, the **Time-To-Market (TTM)** for deploying a new AI feature takes months, frustrating product teams and causing the enterprise to fall massively behind its agile corporate competitors!

**To solve the monumental challenge of Jira Ticket-Ops, Configuration Drift, Orphan Microservices, Slow Time-To-Market, and Developer Frustration, Platform Engineering leaders establish The Internal Developer Platform (IDP).**

An Internal Developer Platform (powered by frameworks like **Backstage**) provides a stunning, centralized self-service portal for your entire enterprise. Instead of filing Jira tickets, a data scientist logs into the Backstage portal, clicks a beautiful button labeled **"Deploy High-Throughput vLLM Serving Engine (Golden Path)"**, enters their model name (`llama3-70b-fraud`), and clicks **Submit**.

Backstage instantly executes an automated **Software Template**. It generates a pristine, standards-compliant Git repository containing pre-configured vLLM Deployments, S3 init containers, KEDA autoscalers, and ArgoCD ApplicationSets (`MOD-CICD-02`), registers the service to the enterprise Software Catalog with clear ownership (`owner: data-science-team`), and deploys the working AI service to production in **3 minutes**!

**This module explores how Platform Engineers architect, populate, and govern an Internal Developer Platform.** We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract IDP mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable self-service platform capabilities.

---

# Capability Statement

> **"I can architect an Internal Developer Platform (Backstage), surface AI/ML software templates (vLLM/PyTorch), wire GitOps ApplicationSets (ArgoCD), enforce RBAC/Policy-as-Code guardrails, and track developer self-service metrics (DORA)."**

By the end of this module, you will establish the essential platform capabilities required to architect an Internal Developer Platform using Spotify's Backstage, populate the enterprise Software Catalog with clear entity ownership (`kind: Component`), author dynamic Software Templates (`kind: Template`) to scaffold production-grade AI/ML workloads (vLLM, Kubeflow PyTorchJob), wire GitOps ApplicationSets (`ArgoCD`) for automated continuous delivery, enforce enterprise RBAC and Policy-as-Code guardrails (Kyverno/OPA) to prevent non-compliant deployments, and track developer self-service metrics via DORA scorecards and Ops maturity ratings.

---

# Essential Module Anchors

* **Why am I learning this?** Enterprise scaling requires eliminating IT support ticket bottlenecks. Building an Internal Developer Platform empowers 500 developers to self-serve complex AI infrastructure in minutes while guaranteeing 100% compliance with Platform Engineering standards.
* **How will I use it?** You will use these exact skills to author Backstage `catalog-info.yaml` manifests (`kind: Component`), author Backstage Software Templates (`kind: Template`), configure `fetch:template` and `publish:github` action steps, author ArgoCD `ApplicationSet` manifests (`matrix` generators), write Kyverno Policy-as-Code rules (`validate: message`), and configure DORA metric scorecards.
* **Where does this fit into Platform Engineering?** The IDP is the crowning achievement of Stage 7 (Internal Developer Platform & Advanced Capabilities). It acts as the centralized presentation layer, wrapping all your earlier infrastructure capabilities (`MOD-IAC`, `MOD-K8S`, `MOD-CICD`, `MOD-AI`, `MOD-MLOPS`) into an elegant self-service web portal.
* **What problem does it solve?** It solves the critical enterprise challenges of manual Jira Ticket-Ops (3-week provisioning delays), rampant configuration drift, orphan microservices (abandoned GPU pods), broken developer onboarding, and missing architectural visibility.
* **Where will I use it later?** You will use these skills directly in Module 17 (Advanced Resilience, Multi-Region AI & Chaos Engineering) to surface multi-region failover templates, and in Module 18 (Building a Production-Grade AI Enterprise Platform Capstone) to present your entire master enterprise architecture.

---

# Lesson Directory

This module consists of five progressive, highly instructional lessons:

1. **[MOD-IDP-01: IDP Architectures: Backstage, Catalogs & Golden Paths](lesson-01.md)**
2. **[MOD-IDP-02: Software Templates for AI/ML Workloads (Scaffolding vLLM & PyTorch)](lesson-02.md)**
3. **[MOD-IDP-03: IDP GitOps Integration (ArgoCD / Crossplane Application Sets)](lesson-03.md)**
4. **[MOD-IDP-04: Enterprise RBAC, Guardrails & Policy-as-Code in the IDP](lesson-04.md)**
5. **[MOD-IDP-05: Developer Self-Service Metrics & Scorecards (DORA / Ops Score)](lesson-05.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 20%
* **Intermediate:** 50%
* **Advanced:** 30%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational Backstage catalog intuition before advancing into complex dynamic template scaffolding, GitOps matrix generators, and advanced Kyverno policy enforcement.*
