---
id: "MOD-10-04"
title: "Stateful Workloads and Storage"
module: "MOD-10"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "20m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Differentiate between stateless and stateful workloads."
  - "Manage Persistent Volumes (PV) and Persistent Volume Claims (PVC)."
  - "Deploy databases using StatefulSets."
prerequisites:
  - "MOD-10-02"
tags:
  - "kubernetes"
  - "storage"
  - "statefulsets"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Stateful Workloads and Storage

## Volumes
On-disk files in a container are ephemeral, which presents some problems for non-trivial applications when running in containers. Kubernetes Volumes solve this by persisting data across pod crashes and restarts.

## Persistent Volumes (PV) and Claims (PVC)
- **PersistentVolume (PV):** A piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes.
- **PersistentVolumeClaim (PVC):** A request for storage by a user. It is similar to a Pod. Pods consume node resources and PVCs consume PV resources.

## StatefulSets
StatefulSet is the workload API object used to manage stateful applications.
Unlike a Deployment, a StatefulSet maintains a sticky identity for each of their Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.
