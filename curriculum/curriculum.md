# Complete Course Curriculum

Version: 2.0.0

Purpose: Master directory and structural blueprint of all educational modules, sections, and lessons within the Platform Engineering & AI Infrastructure Course. Optimized for mastery learning, progressive complexity, and capability-driven engineering confidence.

Required Inputs: Roadmap, analysis, learning objectives, canonical templates.

Outputs: Authoritative specification for downstream AI lesson, lab, project, and quiz generators.

---

# Stage 1: IT Foundations

## Module 1: Getting Started with Linux (`MOD-LINUX-BEG`)
* **Capability Statement:** "I can install Linux, navigate the terminal, and manage files."
* **Why am I learning this?** Every cloud server, container, and AI cluster runs on Linux. To build infrastructure, you must first be comfortable living in the terminal.
* **Where does this fit into Platform Engineering?** This is the foundational bedrock. You will use these basic terminal skills in every subsequent module of your career.
* **Lessons:**
  * **MOD-LINUX-BEG-01:** What is Linux? (Operating System Basics & History)
  * **MOD-LINUX-BEG-02:** Why Linux? (Open Source, Stability & The Cloud Ecosystem)
  * **MOD-LINUX-BEG-03:** Linux Distributions & Environments (Ubuntu, Debian, RHEL, Alpine)
  * **MOD-LINUX-BEG-04:** Installing & Accessing Linux (WSL2, Virtual Machines & Cloud Shells)
  * **MOD-LINUX-BEG-05:** Terminal Basics & The Shell Prompt (Navigation & Core Syntax)
  * **MOD-LINUX-BEG-06:** First Commands & Getting Help (`ls`, `cd`, `pwd`, `man`, `--help`)
  * **MOD-LINUX-BEG-07:** Working with Files, Directories & Basic Pipes (`mkdir`, `cp`, `mv`, `cat`, `grep`)

## Module 2: Linux Administration (`MOD-LINUX-ADM`)
* **Capability Statement:** "I can administer a Linux server, manage permissions, automate simple tasks, and troubleshoot common issues."
* **Why am I learning this?** Servers require secure administration, user isolation, service management, and basic automation to function reliably in production.
* **Where does this fit into Platform Engineering?** You will use these skills to configure virtual machines, write startup scripts, and debug failing services in cloud environments.
* **Lessons:**
  * **MOD-LINUX-ADM-01:** User & Group Administration (Multi-User Concepts & `sudo`)
  * **MOD-LINUX-ADM-02:** Linux Permission Mechanics (`chmod`, `chown`, Octal & Symbolic Modes)
  * **MOD-LINUX-ADM-03:** Process Inspection & Control (`ps`, `top`, `htop`, `kill`, Background Jobs)
  * **MOD-LINUX-ADM-04:** Service Management with Systemd (`systemctl`, Daemons & Startups)
  * **MOD-LINUX-ADM-05:** Networking Basics in the Terminal (`ip`, `ping`, `curl`, `ss`)
  * **MOD-LINUX-ADM-06:** Package Management & Repositories (`apt`, `dnf`, `pacman`)
  * **MOD-LINUX-ADM-07:** Bash Scripting Fundamentals (Variables, Loops, Conditionals & Execution)

## Module 3: Linux Internals (`MOD-LINUX-INT`)
* **Capability Statement:** "I understand how Linux works internally and can debug complex system behavior."
* **Why am I learning this?** When high-performance AI workloads or complex container clusters break, surface-level tools aren't enough. You need to understand how the kernel allocates resources.
* **Where does this fit into Platform Engineering?** These exact internal mechanics (cgroups, namespaces) are the building blocks of Docker and Kubernetes.
* **Lessons:**
  * **MOD-LINUX-INT-01:** The Linux Kernel Architecture (Hardware Management & Ring Privileges)
  * **MOD-LINUX-INT-02:** User Space vs. Kernel Space (System Execution Boundaries)
  * **MOD-LINUX-INT-03:** System Calls (`syscalls`) & Interprocess Communication
  * **MOD-LINUX-INT-04:** System Call Interception & Debugging with `strace`
  * **MOD-LINUX-INT-05:** The Virtual Filesystems (`/proc` and `/sys` Exploration)
  * **MOD-LINUX-INT-06:** Resource Limitation via Control Groups (`cgroups v2`)
  * **MOD-LINUX-INT-07:** Execution Isolation via Kernel Namespaces (`unshare`, `lsns`)
  * **MOD-LINUX-INT-08:** High-Performance I/O & Tracing Mechanics (`io_uring` & `eBPF` Basics)

## Module 4: Networking Fundamentals (`MOD-NET`)
* **Capability Statement:** "I can configure network connections, manage DNS, set up a secure web proxy, and analyze network traffic."
* **Why am I learning this?** Distributed systems communicate over the network. If you cannot route packets or resolve domains, your platform cannot function.
* **Where does this fit into Platform Engineering?** You will use this knowledge to configure Cloud VPCs, Kubernetes Services, Ingress controllers, and Load Balancers.
* **Lessons:**
  * **MOD-NET-01:** The OSI Model, TCP/IP Suite & Socket Mechanics
  * **MOD-NET-02:** IP Addressing, Subnetting & Routing Tables
  * **MOD-NET-03:** DNS Architecture, CoreDNS & Service Discovery Fundamentals
  * **MOD-NET-04:** HTTP/S, Load Balancing, and Reverse Proxy Architectures (Nginx/Envoy)
  * **MOD-NET-05:** TLS/SSL Certificates, PKI & Secure Shell (SSH) Hardening
  * **MOD-NET-06:** Network Packet Analysis & Connectivity Troubleshooting (`tcpdump`, Wireshark)

## Module 5: Version Control with Git (`MOD-GIT`)
* **Capability Statement:** "I can track code changes, collaborate with engineering teams, resolve conflicts, and automate commit workflows."
* **Why am I learning this?** Modern infrastructure is written as code. Git is the operating system of engineering collaboration.
* **Where does this fit into Platform Engineering?** Git is the engine behind GitOps, CI/CD pipelines, and automated infrastructure deployments.
* **Lessons:**
  * **MOD-GIT-01:** Git Internal Tree Mechanics & Hash Objects (Blobs, Trees, Commits)
  * **MOD-GIT-02:** Branching Strategies & Collaboration (Trunk-Based vs. GitFlow)
  * **MOD-GIT-03:** Advanced Rebasing, Interactive Squashing & Clean Histories
  * **MOD-GIT-04:** Merge Conflict Resolution & Team Workflow Etiquette
  * **MOD-GIT-05:** Git Automation, Pre-commit Hooks & Submodules

---

# Stage 2: Core Platform Engineering

## Module 6: Containers & Docker (`MOD-DOCKER`)
* **Capability Statement:** "I can containerize applications, build highly optimized images, and manage multi-container microservices."
* **Why am I learning this?** Containers package code and dependencies together, guaranteeing that applications run identically in development, testing, and production.
* **Where does this fit into Platform Engineering?** Containers are the primary deployment artifact for Kubernetes, serverless platforms, and AI model serving engines.
* **Lessons:**
  * **MOD-DOCKER-01:** Container Virtualization vs. Hypervisors (Putting Cgroups/Namespaces to Work)
  * **MOD-DOCKER-02:** Building Highly Optimized & Secure Container Images (Multi-Stage Builds)
  * **MOD-DOCKER-03:** Multi-Container Application Composition with Docker Compose
  * **MOD-DOCKER-04:** Container Networking, Volume Storage & Persistence
  * **MOD-DOCKER-05:** Production Container Debugging & Lifecycle Management

## Module 7: Security Fundamentals (`MOD-SEC`)
* **Capability Statement:** "I can secure container workloads, manage infrastructure secrets safely, and verify software supply chains."
* **Why am I learning this?** Automated infrastructure moves fast. Without baked-in security, automated pipelines simply deploy vulnerabilities at scale.
* **Where does this fit into Platform Engineering?** You will use this to implement DevSecOps pipelines, encrypt Terraform state, and protect Kubernetes secrets.
* **Lessons:**
  * **MOD-SEC-01:** Principle of Least Privilege & Threat Modeling Basics
  * **MOD-SEC-02:** Container Security, Vulnerability Scanning & Image Provenance (Trivy/Clair)
  * **MOD-SEC-03:** Secret Management Strategies & Encryption in Transit/Rest (SOPS/Vault)
  * **MOD-SEC-04:** Software Supply Chain Security (SLSA, SBOMs & Cosign)

---

# Stage 3: Cloud & Infrastructure Automation

## Module 8: Infrastructure as Code (Terraform) (`MOD-TF`)
* **Capability Statement:** "I can provision immutable cloud infrastructure using declarative code and build reusable Terraform modules."
* **Why am I learning this?** Manual cloud configuration is error-prone and impossible to audit. IaC allows you to provision thousands of resources predictably and repeatably.
* **Where does this fit into Platform Engineering?** Terraform is the industry standard for provisioning Cloud VPCs, Kubernetes clusters, and IAM databases.
* **Lessons:**
  * **MOD-TF-01:** Declarative Infrastructure Paradigms & HCL Syntax
  * **MOD-TF-02:** Terraform State Management, Remote Backends & Locking
  * **MOD-TF-03:** Architecting Reusable & Versioned Terraform Modules
  * **MOD-TF-04:** Refactoring, Importing State & Advanced GitOps Integration

## Module 9: Cloud Platforms & Architecture (`MOD-CLOUD`)
* **Capability Statement:** "I can design secure, highly available cloud foundation architectures and manage cloud access governance."
* **Why am I learning this?** The cloud offers massive scale, but requires rigorous architectural design to avoid security breaches, single points of failure, and cost overruns.
* **Where does this fit into Platform Engineering?** This forms the base cloud layer upon which Kubernetes clusters, databases, and AI GPU instances are deployed.
* **Lessons:**
  * **MOD-CLOUD-01:** Cloud Virtualization, Virtual Private Clouds (VPCs) & Subnetting
  * **MOD-CLOUD-02:** Identity and Access Management (IAM) Governance
  * **MOD-CLOUD-03:** Cloud Object Storage & Highly Available Architectures
  * **MOD-CLOUD-04:** FinOps & Cost-Conscious Infrastructure Design

---

# Stage 4: Containerization & Orchestration

## Module 10: Kubernetes Engineering (`MOD-K8S`)
* **Capability Statement:** "I can deploy, scale, operate, and troubleshoot production-grade Kubernetes cluster environments."
* **Why am I learning this?** Managing five containers is easy; managing five thousand containers across hundreds of servers requires a robust, self-healing orchestration engine.
* **Where does this fit into Platform Engineering?** Kubernetes is the dominant operating system of the cloud and the primary runtime for enterprise platform engineering.
* **Lessons:**
  * **MOD-K8S-01:** Kubernetes Control Plane Architecture & Reconciliation Loops
  * **MOD-K8S-02:** Pod Lifecycle, Deployments, ReplicaSets & DaemonSets
  * **MOD-K8S-03:** Kubernetes Networking: Services, Ingress Controllers & Gateway API
  * **MOD-K8S-04:** Storage Configuration: PVs, PVCs, StorageClasses & StatefulSets
  * **MOD-K8S-05:** Configuration & Secrets Management in Kubernetes (ConfigMaps/Secrets)
  * **MOD-K8S-06:** Workload Autoscaling (HPA, VPA, KEDA) & Cluster Autoscaling
  * **MOD-K8S-07:** Advanced Kubernetes Cluster Troubleshooting & Crash Diagnostics

## Module 11: CI/CD Pipelines & Automation (`MOD-CICD`)
* **Capability Statement:** "I can build automated CI/CD pipelines that build, test, scan, and deploy applications using GitOps principles."
* **Why am I learning this?** Developers need fast, reliable mechanisms to ship code to production without manual intervention or deployment anxiety.
* **Where does this fit into Platform Engineering?** CI/CD pipelines serve as the automated highway connecting developer git commits to live Kubernetes deployments.
* **Lessons:**
  * **MOD-CICD-01:** Continuous Integration vs. Continuous Delivery Paradigms
  * **MOD-CICD-02:** Designing Declarative GitHub Actions Workflows & Runners
  * **MOD-CICD-03:** Automated Container Build, Test, and Scan Pipelines
  * **MOD-CICD-04:** Progressive Delivery (Canary, Blue/Green) & Rollback Automation (ArgoCD)

---

# Stage 5: Observability & Reliability

## Module 12: Observability (Prometheus & Grafana) (`MOD-OBS`)
* **Capability Statement:** "I can instrument distributed systems with metrics, logs, and traces, and build mission-critical dashboards."
* **Why am I learning this?** In complex microservice architectures, you cannot fix what you cannot see. Observability turns black-box systems into transparent, debuggable platforms.
* **Where does this fit into Platform Engineering?** Observability provides the telemetry required for automated alerts, autoscaling triggers, and SRE incident response.
* **Lessons:**
  * **MOD-OBS-01:** The Three Pillars of Observability: Metrics, Logs & Traces
  * **MOD-OBS-02:** Time-Series Instrumentation with Prometheus & PromQL
  * **MOD-OBS-03:** Designing Mission-Critical Grafana Dashboards
  * **MOD-OBS-04:** OpenTelemetry Architecture & Distributed Tracing Fundamentals
  * **MOD-OBS-05:** AlertManager Configuration & Actionable Routing

## Module 13: Site Reliability Engineering (SRE) (`MOD-SRE`)
* **Capability Statement:** "I can manage production incident lifecycles, calculate error budgets, and conduct blameless root cause analyses."
* **Why am I learning this?** Systems fail. SRE provides the software engineering discipline required to maintain high reliability, learn from outages, and balance feature velocity with stability.
* **Where does this fit into Platform Engineering?** SRE principles guide how platform engineers design resilient infrastructure and manage on-call operations.
* **Lessons:**
  * **MOD-SRE-01:** SLIs, SLOs, SLAs & Error Budget Calculations
  * **MOD-SRE-02:** Incident Command Management & On-Call Workflows
  * **MOD-SRE-03:** Structured Blameless Postmortems & Root Cause Analysis (RCA)
  * **MOD-SRE-04:** Chaos Engineering & Proactive System Testing

---

# Stage 6: AI Infrastructure

## Module 14: AI Infrastructure & LLM Serving (`MOD-AI`)
* **Capability Statement:** "I can deploy, serve, autoscale, and monitor production LLM inference engines on GPU-enabled Kubernetes clusters."
* **Why am I learning this?** Artificial intelligence requires specialized hardware (GPUs), massive memory bandwidth, and custom serving runtimes that differ heavily from traditional web apps.
* **Where does this fit into Platform Engineering?** This is the modern frontier of platform engineering: providing software engineers with highly reliable, auto-scaling AI endpoints.
* **Lessons:**
  * **MOD-AI-01:** Hardware Architecture for AI: GPUs, TPUs, CUDA & Memory Bandwidth
  * **MOD-AI-02:** Local LLM Execution with Ollama & Model Runtime Internals
  * **MOD-AI-03:** Production LLM Serving with vLLM & Continuous Batching
  * **MOD-AI-04:** Auto-scaling AI Workloads in Kubernetes (KEDA & GPU Nodes)
  * **MOD-AI-05:** Monitoring LLM Latency, Token Throughput & GPU Utilization

## Module 15: MLOps & Vector Databases (`MOD-MLOPS`)
* **Capability Statement:** "I can build highly scalable Retrieval-Augmented Generation (RAG) infrastructure and deploy vector database clusters."
* **Why am I learning this?** LLMs require external domain knowledge (RAG) to prevent hallucinations. This requires specialized vector databases and automated data embedding pipelines.
* **Where does this fit into Platform Engineering?** You will use this to build enterprise AI platforms that marry organizational data with massive language models.
* **Lessons:**
  * **MOD-MLOPS-01:** Designing Retrieval-Augmented Generation (RAG) Infrastructure
  * **MOD-MLOPS-02:** Vector Database Architecture (Qdrant, Milvus, pgvector)
  * **MOD-MLOPS-03:** Automated Model Weight Ingestion & Storage Pipelines
  * **MOD-MLOPS-04:** MLOps Lifecycle Management & Artifact Provenance

---

# Stage 7: Enterprise Platform Engineering

## Module 16: Internal Developer Platforms (IDPs) (`MOD-IDP`)
* **Capability Statement:** "I can design self-service developer portals that provide automated infrastructure scaffolding and golden paths."
* **Why am I learning this?** Developers shouldn't have to become Kubernetes or Terraform experts just to ship a feature. IDPs abstract away infrastructure complexity.
* **Where does this fit into Platform Engineering?** This is the ultimate goal of the platform engineer: treating developers as valued customers and building products that supercharge their productivity.
* **Lessons:**
  * **MOD-IDP-01:** Platform Engineering Principles & Treating Developers as Customers
  * **MOD-IDP-02:** Designing Developer Portals & Golden Paths (Backstage/Custom)
  * **MOD-IDP-03:** Self-Service Dynamic Infrastructure Scaffolding & Templates
  * **MOD-IDP-04:** Measuring Developer Experience (DevEx) & Platform Adoption

## Module 17: Advanced Systems & Scaling (`MOD-ADV`)
* **Capability Statement:** "I can architect multi-region distributed platform topologies and manage high-throughput distributed systems."
* **Why am I learning this?** Global enterprises require platforms that survive entire cloud region outages, manage massive traffic spikes, and synchronize data globally.
* **Where does this fit into Platform Engineering?** You will use this to design active-active multi-region Kubernetes topologies and global service meshes.
* **Lessons:**
  * **MOD-ADV-01:** Highly Available Multi-Region Platform Topologies
  * **MOD-ADV-02:** Distributed Caching, Sharding & High-Throughput Architectures
  * **MOD-ADV-03:** Kubernetes Cluster Mesh & Cross-Cluster Networking

---

# Stage 8: Capstone Projects

## Module 18: Capstone Portfolio (`MOD-CAP`)
* **Capability Statement:** "I can synthesize end-to-end curriculum knowledge into production-grade architectural blueprints and portfolio assets."
* **Why am I learning this?** True mastery requires building complete, working end-to-end systems from scratch rather than solving isolated lab exercises.
* **Where does this fit into Platform Engineering?** These capstone projects serve as verifiable, production-grade proof of your engineering capabilities for employers and peers.
* **Lessons:**
  * **MOD-CAP-01:** Architectural Blueprint: Production Internal Developer Platform
  * **MOD-CAP-02:** Architectural Blueprint: Highly Scalable Enterprise AI Inference Engine

---

# Stage 9: Interview & Career Preparation

## Module 19: Career & System Design (`MOD-CAR`)
* **Capability Statement:** "I can articulate complex architectural trade-offs on a whiteboard and confidently navigate engineering interviews."
* **Why am I learning this?** Building great systems is only half the battle; you must also be able to communicate your design decisions, justify trade-offs, and pass rigorous technical interviews.
* **Where does this fit into Platform Engineering?** This bridges your technical capabilities directly into professional career advancement and executive engineering leadership.
* **Lessons:**
  * **MOD-CAR-01:** Structured System Design Frameworks for Platform Engineers
  * **MOD-CAR-02:** Whiteboard Architecture Scenarios & Trade-off Decisions
  * **MOD-CAR-03:** Behavioral Engineering Interviews & Engineering Communication
  * **MOD-CAR-04:** High-Impact Portfolio Refinement & Industry Presentation
