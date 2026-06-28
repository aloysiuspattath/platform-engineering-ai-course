---
id: "PROJ-CAP-01"
title: "Capstone Project: The AI Platform Portfolio"
module: "MOD-CAP"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "15m"
estimated_hands_on_time: "360m"
learning_objectives:
  - "Synthesize course knowledge into a comprehensive, production-grade project"
  - "Demonstrate platform engineering capabilities through a verifiable portfolio asset"
prerequisites:
  - "LAB-CAP-01"
related_lessons:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
  - "MOD-CAP-03"
  - "MOD-CAP-04"
  - "MOD-CAP-05"
related_labs:
  - "LAB-CAP-01"
related_projects: []
related_quizzes: []
related_cheatsheets:
  - "CS-CAP-01"
tags:
  - "Capstone"
  - "Project"
  - "Portfolio"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone Project: The AI Platform Portfolio

## Overview
This is the culmination of your journey in the Platform Engineering & AI Infrastructure Course. You will build a complete, end-to-end platform that integrates an Internal Developer Platform (IDP) with a highly scalable AI Inference Engine. This project will serve as the centerpiece of your professional portfolio.

## Requirements

Your final submission must include the following components:

### 1. Infrastructure as Code (Terraform)
- Complete Terraform configurations for provisioning the cloud infrastructure, including the Kubernetes cluster, networking (VPC), and IAM roles.
- The infrastructure must be modular and reusable.

### 2. Kubernetes Configuration (GitOps)
- A Git repository containing all Kubernetes manifests (Deployments, Services, Ingress, etc.).
- ArgoCD or Flux configured to manage the cluster state based on this repository.

### 3. Internal Developer Platform (IDP)
- A functional developer portal (e.g., Backstage) deployed to the cluster.
- At least one working "Golden Path" software template that allows a developer to scaffold a new AI-integrated microservice.

### 4. AI Inference Engine
- A production-ready deployment of an LLM serving engine (e.g., vLLM or Ollama) on a GPU node.
- Autoscaling configured based on queue length or token throughput.

### 5. Observability Stack
- Prometheus and Grafana deployed and configured to monitor the cluster and the AI inference engine.
- A custom dashboard displaying critical metrics (e.g., GPU utilization, request latency).

### 6. CI/CD Pipelines
- GitHub Actions (or similar) pipelines that automatically build and test the infrastructure and application code upon commit.

## Deliverables
- A link to your public GitHub repository containing all the code.
- A comprehensive README architecture document detailing your design decisions, trade-offs, and instructions for deploying the platform.
- A 5-10 minute video walkthrough demonstrating the platform in action.
