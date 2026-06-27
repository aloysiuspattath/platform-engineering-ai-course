# Explicit Module Dependencies

Version: 1.0.0

Purpose: Directed acyclic dependency graph specification ensuring zero knowledge gaps and preventing circular dependencies across the curriculum.

Required Inputs: Module map, learning progression order.

Outputs: Verification criteria for lesson authors to ensure prerequisites are satisfied.

---

# Directed Dependency Specification

```mermaid
graph TD
    MOD-LINUX[MOD-LINUX: Linux Fundamentals]
    MOD-NET[MOD-NET: Networking]
    MOD-GIT[MOD-GIT: Version Control]
    
    MOD-DOCKER[MOD-DOCKER: Containers]
    MOD-SEC[MOD-SEC: Security Fundamentals]
    MOD-TF[MOD-TF: Terraform / IaC]
    MOD-CLOUD[MOD-CLOUD: Cloud Platforms]
    MOD-K8S[MOD-K8S: Kubernetes]
    MOD-CICD[MOD-CICD: CI/CD Pipelines]
    MOD-OBS[MOD-OBS: Observability]
    MOD-SRE[MOD-SRE: SRE & Reliability]
    MOD-AI[MOD-AI: AI Infrastructure]
    MOD-MLOPS[MOD-MLOPS: MLOps & Vector DBs]
    MOD-IDP[MOD-IDP: Internal Developer Platforms]
    MOD-ADV[MOD-ADV: Advanced Systems]
    MOD-CAP[MOD-CAP: Capstone Portfolio]
    MOD-CAR[MOD-CAR: Career & System Design]

    MOD-LINUX --> MOD-DOCKER
    MOD-NET --> MOD-DOCKER
    MOD-GIT --> MOD-DOCKER

    MOD-DOCKER --> MOD-SEC
    MOD-SEC --> MOD-TF
    MOD-TF --> MOD-CLOUD
    MOD-CLOUD --> MOD-K8S
    MOD-DOCKER --> MOD-K8S
    MOD-GIT --> MOD-CICD
    MOD-K8S --> MOD-CICD

    MOD-K8S --> MOD-OBS
    MOD-OBS --> MOD-SRE

    MOD-K8S --> MOD-AI
    MOD-OBS --> MOD-AI
    MOD-AI --> MOD-MLOPS

    MOD-K8S --> MOD-IDP
    MOD-CICD --> MOD-IDP
    MOD-TF --> MOD-IDP

    MOD-K8S --> MOD-ADV
    MOD-OBS --> MOD-ADV

    MOD-IDP --> MOD-CAP
    MOD-AI --> MOD-CAP
    MOD-ADV --> MOD-CAP
    MOD-SRE --> MOD-CAP

    MOD-CAP --> MOD-CAR
```

---

# Explicit Prerequisite Declarations

## MOD-DOCKER
* **Prerequisites:** `MOD-LINUX`, `MOD-NET`, `MOD-GIT`
* **Rationale:** Requires understanding of Linux cgroups/namespaces, IP routing/ports, and git repository cloning.

## MOD-SEC
* **Prerequisites:** `MOD-DOCKER`, `MOD-LINUX`
* **Rationale:** Requires practical container execution knowledge to conduct vulnerability scanning and image signing.

## MOD-TF
* **Prerequisites:** `MOD-SEC`, `MOD-GIT`
* **Rationale:** Requires understanding of least-privilege identity concepts and declarative configuration versioning.

## MOD-CLOUD
* **Prerequisites:** `MOD-TF`, `MOD-NET`
* **Rationale:** Cloud infrastructure must be provisioned via Terraform rather than manual console clicking; requires VPC subnetting knowledge.

## MOD-K8S
* **Prerequisites:** `MOD-CLOUD`, `MOD-DOCKER`
* **Rationale:** Requires robust containerization and cloud infrastructure fundamentals to understand the control plane and node worker architectures.

## MOD-CICD
* **Prerequisites:** `MOD-K8S`, `MOD-GIT`
* **Rationale:** Automated deployment pipelines target Kubernetes clusters using GitOps reconciliation principles.

## MOD-OBS & MOD-SRE
* **Prerequisites:** `MOD-K8S`, `MOD-CICD`
* **Rationale:** Observability stacks (Prometheus/Grafana) monitor distributed Kubernetes workloads; SRE practices rely on automated metrics and deployment pipelines.

## MOD-AI & MOD-MLOPS
* **Prerequisites:** `MOD-K8S`, `MOD-OBS`
* **Rationale:** Enterprise AI serving requires deploying vLLM/Ollama containers to Kubernetes GPU nodes and tracking token throughput via Prometheus.

## MOD-IDP & MOD-ADV
* **Prerequisites:** `MOD-K8S`, `MOD-TF`, `MOD-CICD`
* **Rationale:** Internal Developer Platforms stitch together Terraform templates, Kubernetes namespaces, and CI/CD workflows into self-service portals.

## MOD-CAP & MOD-CAR
* **Prerequisites:** All prior modules (`MOD-LINUX` through `MOD-ADV`)
* **Rationale:** Master capstone implementation and whiteboard system design require comprehensive synthesis of the entire curriculum.
