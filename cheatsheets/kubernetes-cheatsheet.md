---
id: "CS-10"
title: "Kubectl & Kubernetes Cheat Sheet"
module: "MOD-10"
type: "cheatsheet"
difficulty: "Beginner"
estimated_reading_time: "10m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quickly reference common kubectl commands."
  - "Recall basic YAML structures for Kubernetes resources."
prerequisites:
  - "MOD-10-01"
tags:
  - "kubernetes"
  - "kubectl"
  - "cheatsheet"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Kubectl & Kubernetes Cheat Sheet

## Basic Commands
- `kubectl version`: Print the client and server version information.
- `kubectl cluster-info`: Display cluster info.

## Pod Management
- `kubectl get pods`: List all pods in the current namespace.
- `kubectl get pods -A`: List pods in all namespaces.
- `kubectl describe pod <pod-name>`: Detailed information about a pod.
- `kubectl logs <pod-name>`: View logs for a pod.
- `kubectl exec -it <pod-name> -- /bin/sh`: Get an interactive shell in a running pod.
- `kubectl delete pod <pod-name>`: Delete a pod.

## Deployments and Services
- `kubectl get deployments`: List all deployments.
- `kubectl get services`: List all services.
- `kubectl expose deployment <deployment-name> --type=LoadBalancer --port=8080`: Expose a deployment as a service.
- `kubectl scale deployment <deployment-name> --replicas=3`: Scale a deployment.

## Imperative vs Declarative
- `kubectl create -f file.yaml`: Create resource(s) imperatively.
- `kubectl apply -f file.yaml`: Apply a configuration change to a resource declaratively.
