# Complete Course Curriculum

Version: 1.0.0

Purpose: Master directory and structural blueprint of all educational modules, sections, and lessons within the Platform Engineering & AI Infrastructure Course.

Required Inputs: Roadmap, analysis, learning objectives, canonical templates.

Outputs: Authoritative specification for downstream AI lesson, lab, project, and quiz generators.

---

# Stage 1: Foundations

## Module 1: Linux & Operating Systems
* **MOD-LINUX-01:** Linux Architectural Fundamentals & Kernel Anatomy
* **MOD-LINUX-02:** User, Group, and Permission Management (DAC & RBAC)
* **MOD-LINUX-03:** Process Management, Daemons, and Systemd Initialization
* **MOD-LINUX-04:** Advanced Bash Scripting & Production Automation
* **MOD-LINUX-05:** Linux Logging, System Monitoring & Diagnostics

## Module 2: Networking Fundamentals
* **MOD-NET-01:** The OSI Model, TCP/IP Suite & Socket Mechanics
* **MOD-NET-02:** DNS Architecture, CoreDNS & Service Discovery Fundamentals
* **MOD-NET-03:** HTTP/S, Load Balancing, and Reverse Proxy Architectures
* **MOD-NET-04:** TLS/SSL Certificates, PKI & Secure Shell (SSH) Hardening
* **MOD-NET-05:** Network Packet Analysis & Connectivity Troubleshooting

## Module 3: Version Control with Git
* **MOD-GIT-01:** Git Internal Tree Mechanics & Hash Objects
* **MOD-GIT-02:** Branching Strategies (Trunk-Based vs. GitFlow)
* **MOD-GIT-03:** Advanced Rebasing, Interactive Squashing & Conflict Resolution
* **MOD-GIT-04:** Git Automation, Pre-commit Hooks & Submodules

---

# Stage 2: Core Platform Engineering

## Module 4: Containers & Docker
* **MOD-DOCKER-01:** Container Virtualization vs. Hypervisors (cgroups & namespaces)
* **MOD-DOCKER-02:** Building Highly Optimized & Secure Container Images
* **MOD-DOCKER-03:** Multi-Container Application Composition with Docker Compose
* **MOD-DOCKER-04:** Container Networking, Volume Storage & Persistence
* **MOD-DOCKER-05:** Production Container Debugging & Lifecycle Management

## Module 5: Security Fundamentals
* **MOD-SEC-01:** Principle of Least Privilege & Threat Modeling Basics
* **MOD-SEC-02:** Container Security, Vulnerability Scanning & Image Provenance
* **MOD-SEC-03:** Secret Management Strategies & Encryption in Transit/Rest
* **MOD-SEC-04:** Software Supply Chain Security (SLSA & SBOMs)

---

# Stage 3: Cloud & Infrastructure Automation

## Module 6: Infrastructure as Code (Terraform)
* **MOD-TF-01:** Declarative Infrastructure Paradigms & HCL Syntax
* **MOD-TF-02:** Terraform State Management, Remote Backends & Locking
* **MOD-TF-03:** Architecting Reusable & Versioned Terraform Modules
* **MOD-TF-04:** Refactoring, Importing State & Advanced GitOps Integration

## Module 7: Cloud Platforms & Architecture
* **MOD-CLOUD-01:** Cloud Virtualization, Virtual Private Clouds (VPCs) & Subnetting
* **MOD-CLOUD-02:** Identity and Access Management (IAM) Governance
* **MOD-CLOUD-03:** Cloud Object Storage & Highly Available Architectures
* **MOD-CLOUD-04:** FinOps & Cost-Conscious Infrastructure Design

---

# Stage 4: Containerization & Orchestration

## Module 8: Kubernetes Engineering
* **MOD-K8S-01:** Kubernetes Control Plane Architecture & Reconciliation Loops
* **MOD-K8S-02:** Pod Lifecycle, Deployments, ReplicaSets & DaemonSets
* **MOD-K8S-03:** Kubernetes Networking: Services, Ingress Controllers & Gateway API
* **MOD-K8S-04:** Storage Configuration: PVs, PVCs, StorageClasses & StatefulSets
* **MOD-K8S-05:** Configuration & Secrets Management in Kubernetes
* **MOD-K8S-06:** Workload Autoscaling (HPA, VPA, KEDA) & Cluster Autoscaling
* **MOD-K8S-07:** Advanced Kubernetes Cluster Troubleshooting & Crash Diagnostics

## Module 9: CI/CD Pipelines & Automation
* **MOD-CICD-01:** Continuous Integration vs. Continuous Delivery Paradigms
* **MOD-CICD-02:** Designing Declarative GitHub Actions Workflows & Runners
* **MOD-CICD-03:** Automated Container Build, Test, and Scan Pipelines
* **MOD-CICD-04:** Progressive Delivery (Canary, Blue/Green) & Rollback Automation

---

# Stage 5: Observability & Reliability

## Module 10: Observability (Prometheus & Grafana)
* **MOD-OBS-01:** The Three Pillars of Observability: Metrics, Logs & Traces
* **MOD-OBS-02:** Time-Series Instrumentation with Prometheus & PromQL
* **MOD-OBS-03:** Designing Mission-Critical Grafana Dashboards
* **MOD-OBS-04:** OpenTelemetry Architecture & Distributed Tracing Fundamentals
* **MOD-OBS-05:** AlertManager Configuration & Actionable Routing

## Module 11: Site Reliability Engineering (SRE)
* **MOD-SRE-01:** SLIs, SLOs, SLAs & Error Budget Calculations
* **MOD-SRE-02:** Incident Command Management & On-Call Workflows
* **MOD-SRE-03:** Structured Blameless Postmortems & Root Cause Analysis (RCA)
* **MOD-SRE-04:** Chaos Engineering & Proactive System Testing

---

# Stage 6: AI Infrastructure

## Module 12: AI Infrastructure & LLM Serving
* **MOD-AI-01:** Hardware Architecture for AI: GPUs, TPUs, CUDA & Memory Bandwidth
* **MOD-AI-02:** Local LLM Execution with Ollama & Model Runtime Internals
* **MOD-AI-03:** Production LLM Serving with vLLM & Continuous Batching
* **MOD-AI-04:** Auto-scaling AI Workloads in Kubernetes (KEDA & GPU Nodes)
* **MOD-AI-05:** Monitoring LLM Latency, Token Throughput & GPU Utilization

## Module 13: MLOps & Vector Databases
* **MOD-MLOPS-01:** Designing Retrieval-Augmented Generation (RAG) Infrastructure
* **MOD-MLOPS-02:** Vector Database Architecture (Qdrant, Milvus, pgvector)
* **MOD-MLOPS-03:** Automated Model Weight Ingestion & Storage Pipelines
* **MOD-MLOPS-04:** MLOps Lifecycle Management & Artifact Provenance

---

# Stage 7: Enterprise Platform Engineering

## Module 14: Internal Developer Platforms (IDPs)
* **MOD-IDP-01:** Platform Engineering Principles & Treating Developers as Customers
* **MOD-IDP-02:** Designing Developer Portals & Golden Paths (Backstage/Custom)
* **MOD-IDP-03:** Self-Service Dynamic Infrastructure Scaffolding & Templates
* **MOD-IDP-04:** Measuring Developer Experience (DevEx) & Platform Adoption

## Module 15: Advanced Systems & Scaling
* **MOD-ADV-01:** Highly Available Multi-Region Platform Topologies
* **MOD-ADV-02:** Distributed Caching, Sharding & High-Throughput Architectures
* **MOD-ADV-03:** Kubernetes Cluster Mesh & Cross-Cluster Networking

---

# Stage 8: Capstone Projects

## Module 16: Capstone Portfolio
* **MOD-CAP-01:** Architectural Blueprint: Production Internal Developer Platform
* **MOD-CAP-02:** Architectural Blueprint: Highly Scalable Enterprise AI Inference Engine

---

# Stage 9: Interview & Career Preparation

## Module 17: Career & System Design
* **MOD-CAR-01:** Structured System Design Frameworks for Platform Engineers
* **MOD-CAR-02:** Whiteboard Architecture Scenarios & Trade-off Decisions
* **MOD-CAR-03:** Behavioral Engineering Interviews & Engineering Communication
* **MOD-CAR-04:** High-Impact Portfolio Refinement & Industry Presentation
