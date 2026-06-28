# Module 10: Kubernetes Engineering (`MOD-K8S`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 10: Kubernetes Engineering**!

In Module 09, you mastered the foundational cloud architecture of the public cloud. You understand how to provision isolated Virtual Private Clouds (VPCs), enforce least privilege IAM governance with OIDC identity federation, configure highly available Multi-AZ compute topologies, and manage automated FinOps budget guardrails.

Now, we must step into the primary execution environment and master operating system of the cloud: **Kubernetes**.

Managing five Docker containers on a single virtual machine is straightforward; you simply run `docker compose up`. However, managing five thousand microservice containers across five hundred physical virtual machines in a global enterprise requires a highly robust, self-healing, declarative container orchestration engine.

If you attempt to manage enterprise microservices without an orchestration engine, you must manually SSH into individual servers to restart crashed containers. If a physical server experiences a hardware failure, all applications running on that server stay down until a human operator intervenes. If user web traffic spikes tenfold during a major marketing campaign, your static servers crash under the load because they lack automated horizontal scaling. And if you deploy new code versions imperatively, you introduce service downtime and risk breaking production user sessions.

This module bridges your cloud foundation capabilities directly into production-grade Kubernetes engineering. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract control plane mechanics and reconciliation loops with crystal-clear real-world analogies, and ensuring you develop elite, verifiable container orchestration capabilities.

---

# Capability Statement

> **"I can deploy, scale, operate, and troubleshoot production-grade Kubernetes cluster environments."**

By the end of this module, you will establish the essential container orchestration capabilities required to architect Kubernetes control planes, manage declarative Deployment lifecycles, configure advanced internal and external networking (ClusterIP Services, Ingress Controllers, Gateway API), provision persistent storage volumes (PVs, PVCs, StatefulSets), inject dynamic configurations (ConfigMaps, Secrets), configure automated workload scaling (HPA, VPA, KEDA), and execute advanced crash diagnostics (`kubectl describe`, `kubectl logs`).

---

# Essential Module Anchors

* **Why am I learning this?** Kubernetes is the dominant operating system of the modern cloud and the primary runtime for enterprise platform engineering. If you cannot operate a Kubernetes cluster, configure Deployments, or debug crashed Pods, you cannot work as a Platform Engineer.
* **How will I use it?** You will use these exact skills to write declarative YAML manifests (`Deployment`, `Service`, `Ingress`, `PersistentVolumeClaim`), execute `kubectl` CLI commands (`kubectl apply`, `kubectl get pods`, `kubectl describe pod`), configure auto-scaling rules (`HorizontalPodAutoscaler`), and inspect system logs (`kubectl logs`).
* **Where does this fit into Platform Engineering?** Kubernetes forms the master core of Stage 4 (Containerization & Orchestration). It sits directly on top of your Stage 3 cloud foundation (VPCs, IAM) and serves as the physical container execution runtime for your CI/CD pipelines (Stage 4), observability stacks (Stage 5), and AI GPU inference engines (Stage 6).
* **What problem does it solve?** It solves the critical enterprise challenges of manual container restarts, physical server failures, static scaling bottlenecks, deployment downtime, and complex microservice networking.
* **Where will I use it later?** You will use these skills directly in Module 11 (Deploying CI/CD GitOps Pipelines with ArgoCD), Module 12 (Deploying Prometheus & Grafana Operators into Kubernetes), Module 14 (Deploying Auto-scaling AI GPU Inference Pods with vLLM), and Module 16 (Scaffolding Dynamic Kubernetes Manifests via an Internal Developer Platform).

---

# Lesson Directory

This module consists of seven progressive, highly instructional lessons:

1. **[MOD-K8S-01: Kubernetes Control Plane Architecture & Reconciliation Loops](lesson-01.md)**
2. **[MOD-K8S-02: Pod Lifecycle, Deployments, ReplicaSets & DaemonSets](lesson-02.md)**
3. **[MOD-K8S-03: Kubernetes Networking: Services, Ingress Controllers & Gateway API](lesson-03.md)**
4. **[MOD-K8S-04: Storage Configuration: PVs, PVCs, StorageClasses & StatefulSets](lesson-04.md)**
5. **[MOD-K8S-05: Configuration & Secrets Management in Kubernetes (ConfigMaps/Secrets)](lesson-05.md)**
6. **[MOD-K8S-06: Workload Autoscaling (HPA, VPA, KEDA) & Cluster Autoscaling](lesson-06.md)**
7. **[MOD-K8S-07: Advanced Kubernetes Cluster Troubleshooting & Crash Diagnostics](lesson-07.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 35%
* **Intermediate:** 50%
* **Advanced:** 15%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational control plane intuition and Pod lifecycles before advancing into complex persistent storage topologies, event-driven auto-scaling, and advanced crash diagnostics.*
