---
id: "MOD-10-02"
title: "Pod Lifecycle and Workload Management"
module: "MOD-10"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Understand the lifecycle of a Kubernetes Pod."
  - "Deploy applications using Deployments and ReplicaSets."
  - "Configure liveness and readiness probes."
prerequisites:
  - "MOD-10-01"
tags:
  - "kubernetes"
  - "pods"
  - "deployments"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Pod Lifecycle and Workload Management

## Pods
A Pod is the smallest and simplest Kubernetes object. A Pod represents a set of running containers on your cluster. 

## Pod Lifecycle
Pods have a defined lifecycle. They begin in the `Pending` phase, move through `Running` if at least one of their primary containers starts OK, and then through either the `Succeeded` or `Failed` phases depending on whether any container in the Pod terminated in failure.

## Workload Resources
Instead of creating Pods directly, you almost always use workload resources like Deployments, ReplicaSets, and StatefulSets to manage them.
- **ReplicaSets:** Ensure that a specified number of pod replicas are running at any given time.
- **Deployments:** Provide declarative updates for Pods and ReplicaSets, handling rolling updates and rollbacks.

## Probes
- **Liveness Probes:** Determine if a container is running. If it fails, kubelet kills the container.
- **Readiness Probes:** Determine if a container is ready to accept traffic.
