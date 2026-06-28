---
id: "LAB-11-01"
title: "Building a Complete CI/CD Pipeline with GitHub Actions and ArgoCD"
module: "MOD-11"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Create a GitHub Actions CI pipeline"
  - "Automate container image builds and pushes"
  - "Deploy a GitOps controller (ArgoCD)"
  - "Configure ArgoCD to sync an application from Git"
prerequisites:
  - "MOD-11-01"
  - "MOD-11-02"
  - "MOD-11-03"
  - "MOD-11-05"
tags:
  - "CI/CD"
  - "GitOps"
  - "GitHub Actions"
  - "ArgoCD"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lab: Building a Complete CI/CD Pipeline

## Goal
Build a continuous integration pipeline using GitHub Actions that builds a Docker image, scans it for vulnerabilities, and updates a deployment manifest. Then, configure ArgoCD to automatically deploy the new version.

## Prerequisites
- A GitHub account
- A Docker Hub account
- A running Kubernetes cluster (e.g., Minikube, kind)
- `kubectl` installed

## Environment Setup
1. Fork the sample application repository provided in the course materials.
2. Generate a Docker Hub access token and store it as a GitHub Secret (`DOCKER_USERNAME`, `DOCKER_PASSWORD`).

## Step-by-step instructions

### Step 1: Create the CI Pipeline
1. In your repository, create `.github/workflows/ci.yaml`.
2. Configure it to run on pushes to the `main` branch.
3. Add a step to build the Docker image and tag it with the commit SHA.
4. Add a step to push the image to Docker Hub.
5. Add a step to update the `deployment.yaml` file in your repository with the new image tag.

### Step 2: Install ArgoCD
1. Install ArgoCD in your Kubernetes cluster:
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

### Step 3: Configure ArgoCD Application
1. Forward the ArgoCD UI port to access it locally.
2. Login using the initial admin password.
3. Create a new Application pointing to your Git repository's manifest folder.
4. Set the sync policy to Automated.

## Verification
Push a code change to your application. Watch the GitHub Action run. Once complete, observe ArgoCD detecting the new manifest version and syncing the changes to the cluster.

## Cleanup
Delete the ArgoCD namespace and the application namespace.
