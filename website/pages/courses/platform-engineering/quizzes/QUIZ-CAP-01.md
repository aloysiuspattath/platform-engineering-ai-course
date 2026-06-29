---
id: "QUIZ-CAP-01"
title: "Module 18 Quiz: Capstone Architecture"
module: "MOD-CAP"
type: "quiz"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Assess understanding of production IDP architecture"
  - "Evaluate knowledge of scalable AI inference strategies"
prerequisites:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_lessons:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_labs: []
related_projects: []
related_quizzes: []
related_cheatsheets:
  - "CS-CAP-01"
tags:
  - "Capstone"
  - "Quiz"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Module 18 Quiz: Capstone Architecture

## Instructions
Answer the following questions to test your knowledge of the architectural concepts covered in the capstone module.

## Questions

1.  **What is the primary benefit of implementing "Golden Paths" in an Internal Developer Platform?**
    *   A) To force developers to use specific programming languages.
    *   B) To reduce cognitive load by providing standardized, supported ways to deploy software.
    *   C) To eliminate the need for CI/CD pipelines.
    *   D) To increase the complexity of the deployment process.

2.  **When serving Large Language Models (LLMs) in production, what technique is used to maximize GPU utilization by processing multiple requests simultaneously?**
    *   A) Synchronous blocking
    *   B) Continuous batching
    *   C) Round-robin load balancing
    *   D) Over-provisioning

3.  **Why is standard CPU-based autoscaling often insufficient for AI inference workloads?**
    *   A) Because AI models do not use the CPU.
    *   B) Because GPU provisioning and loading large model weights take significant time, requiring specialized metrics like queue length.
    *   C) Because Kubernetes cannot monitor CPU usage.
    *   D) Because AI workloads are always perfectly predictable.

4.  **In a GitOps workflow (e.g., using ArgoCD), where is the "source of truth" for the desired state of the Kubernetes cluster?**
    *   A) The live cluster state
    *   B) The developer's local machine
    *   C) The Git repository containing the declarative manifests
    *   D) The container registry

5.  **Which observability pillar is most critical for debugging the latency of a single request as it travels through a microservices architecture and an AI inference engine?**
    *   A) Metrics
    *   B) Logs
    *   C) Distributed Tracing
    *   D) Dashboards
