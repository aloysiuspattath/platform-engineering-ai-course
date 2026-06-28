---
id: "CS-11"
title: "CI/CD & ArgoCD Commands and Concepts"
module: "MOD-11"
type: "cheatsheet"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Provide quick reference for ArgoCD CLI commands"
  - "Summarize GitHub Actions syntax"
prerequisites: []
tags:
  - "Cheatsheet"
  - "ArgoCD"
  - "GitHub Actions"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# CI/CD & GitOps Cheatsheet

## GitHub Actions Basics

**Basic Workflow Structure:**
```yaml
name: My Workflow
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run script
        run: echo "Hello World"
```

## Trivy Scanning

**Scan a container image:**
```bash
trivy image --severity HIGH,CRITICAL my-app:latest
```

## ArgoCD CLI

**Login:**
```bash
argocd login <server>
```

**Create an application:**
```bash
argocd app create <app-name> \
  --repo <git-url> \
  --path <path-in-repo> \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace <namespace>
```

**Sync an application:**
```bash
argocd app sync <app-name>
```

**List applications:**
```bash
argocd app list
```

## Kubernetes Commands for GitOps

**Check ArgoCD Pods:**
```bash
kubectl get pods -n argocd
```

**Get Initial ArgoCD Admin Password:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
