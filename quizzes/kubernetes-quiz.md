---
id: "QUIZ-10"
title: "Kubernetes Engineering Knowledge Check"
module: "MOD-10"
type: "quiz"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Assess understanding of Kubernetes architecture."
  - "Test knowledge of workloads, networking, and security concepts."
prerequisites:
  - "MOD-10-05"
tags:
  - "kubernetes"
  - "assessment"
  - "quiz"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Kubernetes Engineering Knowledge Check

1. Which Kubernetes control plane component is responsible for assigning a node to a newly created Pod?
   - a) kube-apiserver
   - b) kube-scheduler
   - c) kubelet
   - d) etcd

2. What type of Kubernetes Service is most commonly used to expose an application strictly within the cluster?
   - a) LoadBalancer
   - b) NodePort
   - c) ClusterIP
   - d) ExternalName

3. Which resource ensures that a specified number of pod replicas are running at any given time?
   - a) ConfigMap
   - b) DaemonSet
   - c) ReplicaSet
   - d) Ingress

4. True or False: PersistentVolumeClaims (PVCs) consume Node resources, while PersistentVolumes (PVs) consume Cluster resources.
   - a) True
   - b) False
