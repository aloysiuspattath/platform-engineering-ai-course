---
id: "CS-CAP-01"
title: "Cheat Sheet: Capstone Architecture & Best Practices"
module: "MOD-CAP"
type: "cheatsheet"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for IDP components and AI serving strategies"
  - "Checklist for production readiness"
prerequisites: []
related_lessons:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_labs: []
related_projects: []
related_quizzes: []
related_cheatsheets: []
tags:
  - "Capstone"
  - "Cheat Sheet"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Cheat Sheet: Capstone Architecture & Best Practices

## Internal Developer Platform (IDP) Core Components
*   **Developer Portal:** The UI (e.g., Backstage) for service discovery and scaffolding.
*   **Software Templates:** Golden paths for creating new services.
*   **GitOps Engine:** ArgoCD or Flux for syncing Git state to the cluster.
*   **Infrastructure Provisioner:** Terraform or Crossplane for managing cloud resources.

## AI Inference & MLOps
*   **Serving Engine:** vLLM, Ollama, or Triton.
*   **Key Optimization:** Continuous batching to maximize GPU utilization.
*   **Autoscaling:** Use KEDA to scale based on token throughput or request queue length, not just CPU/Memory.
*   **Vector Database:** Qdrant, Milvus, or pgvector for RAG architectures.

## Production Readiness Checklist
- [ ] **Security:** RBAC configured with least privilege?
- [ ] **Security:** Secrets encrypted in transit and at rest (SOPS/External Secrets)?
- [ ] **Reliability:** Multi-zone node pools configured?
- [ ] **Reliability:** GitOps automated recovery tested?
- [ ] **Observability:** Prometheus/Grafana installed and collecting metrics?
- [ ] **Observability:** Alerts configured for GPU starvation and high latency?
- [ ] **Automation:** CI/CD pipelines enforcing linting, testing, and vulnerability scanning?
