---
id: "PROJ-11"
title: "End-to-End GitOps Deployment Pipeline for Microservices"
module: "MOD-11"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Design and implement an enterprise-grade CI/CD pipeline"
  - "Implement automated image security scanning and signing"
  - "Implement progressive delivery (Canary) with automated rollbacks"
prerequisites:
  - "LAB-11-01"
tags:
  - "CI/CD"
  - "GitOps"
  - "Microservices"
  - "ArgoCD"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Project: End-to-End GitOps Deployment Pipeline

## Business Scenario
Your company is migrating to a microservices architecture. The manual deployment process is causing frequent outages and delaying feature releases. You are tasked with designing and implementing a robust, fully automated CI/CD pipeline that incorporates security scanning and zero-downtime deployments.

## Requirements
1. **Source Code**: Two distinct microservices (a frontend and a backend API).
2. **CI Pipeline**: Must use GitHub Actions. Must build, test, and scan container images using Trivy. Must push to a container registry.
3. **CD Pipeline**: Must use GitOps principles. A separate configuration repository should hold the Kubernetes manifests.
4. **Progressive Delivery**: Implement a Canary deployment strategy for the backend API using Argo Rollouts.
5. **Rollback**: Simulate a failed deployment (e.g., high error rate) and ensure the system automatically rolls back.

## Implementation Steps
1. Setup the application repository with Dockerfiles and basic tests.
2. Setup the infrastructure repository with Kubernetes manifests (Kustomize or Helm).
3. Write GitHub Actions to bridge the two repositories (updating image tags in the infra repo upon successful CI).
4. Deploy ArgoCD and Argo Rollouts to your cluster.
5. Configure Prometheus metrics to monitor the canary release.

## Verification
A successful project will demonstrate an end-to-end flow: a developer pushes code, the image is built/scanned, the infra repo is updated, ArgoCD syncs the change, and Argo Rollouts manages a safe canary deployment.
