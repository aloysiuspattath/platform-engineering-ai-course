---
id: "QUIZ-11"
title: "CI/CD & GitOps Knowledge Check"
module: "MOD-11"
type: "quiz"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Assess understanding of CI/CD concepts"
  - "Validate knowledge of GitOps principles"
  - "Test comprehension of progressive delivery strategies"
prerequisites:
  - "MOD-11-05"
tags:
  - "Quiz"
  - "CI/CD"
  - "GitOps"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# CI/CD & GitOps Quiz

## Questions

1. **What is the primary benefit of Continuous Integration?**
   - A) To automatically deploy code to production
   - B) To detect integration errors as quickly as possible
   - C) To manage infrastructure state
   - D) To monitor application performance
   *Answer: B*

2. **In a GitOps workflow, what serves as the single source of truth?**
   - A) The Kubernetes cluster state
   - B) The Container Registry
   - C) The Git repository containing declarative infrastructure definitions
   - D) The CI Server
   *Answer: C*

3. **Which deployment strategy routes a small percentage of traffic to a new version before rolling it out completely?**
   - A) Blue/Green Deployment
   - B) Rolling Update
   - C) Canary Release
   - D) In-Place Deployment
   *Answer: C*

4. **Why is it important to fail a CI pipeline if critical vulnerabilities are found during an image scan?**
   - A) It saves storage space in the registry
   - B) It prevents vulnerable code from being deployed to production environments
   - C) It makes the Docker image smaller
   - D) It speeds up the deployment process
   *Answer: B*

5. **Which tool is a declarative GitOps continuous delivery tool for Kubernetes?**
   - A) Trivy
   - B) GitHub Actions
   - C) Prometheus
   - D) ArgoCD
   *Answer: D*
