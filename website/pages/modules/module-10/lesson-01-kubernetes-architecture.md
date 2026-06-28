---
id: "MOD-10-01"
title: "Kubernetes Architecture and Components"
module: "MOD-10"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand the Kubernetes control plane architecture."
  - "Identify the roles of kube-apiserver, etcd, kube-scheduler, and kube-controller-manager."
  - "Describe the components of a Kubernetes worker node (kubelet, kube-proxy, container runtime)."
prerequisites:
  - "MOD-09-05"
tags:
  - "kubernetes"
  - "architecture"
  - "containers"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Kubernetes Architecture and Components

## Introduction
Welcome to Module 10: Kubernetes Engineering. In this lesson, we will explore the foundational architecture of Kubernetes, the industry standard for container orchestration. Kubernetes provides a declarative platform to automate deployment, scaling, and operations of application containers across clusters of hosts.

## Control Plane Components
The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events.
- **kube-apiserver:** The front end for the Kubernetes control plane. It exposes the Kubernetes API.
- **etcd:** Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.
- **kube-scheduler:** Watches for newly created Pods with no assigned node, and selects a node for them to run on.
- **kube-controller-manager:** Runs controller processes (e.g., Node controller, Job controller, Endpoints controller).

## Node Components
Node components run on every node, maintaining running pods and providing the Kubernetes runtime environment.
- **kubelet:** An agent that runs on each node in the cluster, ensuring that containers are running in a Pod.
- **kube-proxy:** A network proxy that runs on each node, maintaining network rules on nodes.
- **Container Runtime:** The software that is responsible for running containers (e.g., containerd, CRI-O).
