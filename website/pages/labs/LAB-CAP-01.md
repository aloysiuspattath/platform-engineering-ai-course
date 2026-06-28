---
id: "LAB-CAP-01"
title: "Capstone Lab: Building the Foundation"
module: "MOD-CAP"
type: "lab"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Provision the core infrastructure for the capstone project"
  - "Deploy the initial IDP and AI serving components"
prerequisites:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_lessons:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_labs: []
related_projects:
  - "PROJ-CAP-01"
related_quizzes: []
related_cheatsheets:
  - "CS-CAP-01"
tags:
  - "Capstone"
  - "Lab"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone Lab: Building the Foundation

## Overview
In this lab, you will bootstrap the core infrastructure required for your final capstone project. You will use Terraform to provision a Kubernetes cluster and deploy the foundational components of both an Internal Developer Platform and an AI Inference Engine.

## Scenario
You are the lead platform engineer for a fast-growing startup. Your task is to build a platform that allows developers to easily deploy AI-powered applications.

## Steps

### 1. Provision the Kubernetes Cluster
Use the provided Terraform modules to spin up an EKS/GKE cluster with a dedicated GPU node pool.

### 2. Install the IDP Core
Deploy Backstage (or your chosen IDP) to the cluster. Configure it to connect to your Git provider for software catalog discovery.

### 3. Deploy the AI Inference Engine
Deploy vLLM to the GPU node pool. Verify that it can successfully load a small, open-source model (e.g., Llama-3-8B).

### 4. Configure GitOps
Install ArgoCD and configure it to manage the state of the IDP and AI components.

## Validation
Your lab is complete when:
1.  The developer portal is accessible via an Ingress.
2.  You can successfully query the vLLM endpoint and receive a response.
3.  All components are managed by ArgoCD and synced with your Git repository.
