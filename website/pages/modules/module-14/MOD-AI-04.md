---
id: "MOD-AI-04"
title: "Auto-scaling AI Workloads in Kubernetes (KEDA & GPU Nodes)"
module: "MOD-AI"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "20m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Configure Kubernetes to manage GPU resources."
  - "Implement KEDA for event-driven autoscaling of AI workloads."
  - "Design autoscaling policies based on inference queues and metrics."
prerequisites:
  - "MOD-AI-03"
  - "MOD-K8S-06"
related_lessons:
  - "MOD-AI-05"
related_labs:
  - "LAB-AI-01"
related_projects:
  - "PROJ-AI-01"
related_quizzes:
  - "QUIZ-AI-01"
related_cheatsheets:
  - "CS-AI-01"
tags:
  - "AI"
  - "Kubernetes"
  - "KEDA"
  - "Scaling"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Auto-scaling AI Workloads in Kubernetes (KEDA & GPU Nodes)

## Introduction
AI workloads are bursty and resource-intensive. Static provisioning of GPU nodes leads to either high costs or poor performance during traffic spikes. This lesson covers auto-scaling AI workloads in Kubernetes.

## Managing GPUs in Kubernetes
Kubernetes requires specialized device plugins (like the NVIDIA Device Plugin) to schedule workloads onto GPU nodes. We will cover node selectors, taints, and tolerations for AI workloads.

## KEDA (Kubernetes Event-driven Autoscaling)
Standard Horizontal Pod Autoscalers (HPA) rely on CPU or memory metrics, which are often poor indicators for LLM scaling. KEDA allows scaling based on external metrics like message queue length or custom Prometheus metrics (e.g., token generation latency).

## Autoscaling Strategies
We will design autoscaling policies that spin up new GPU pods when the inference queue grows and scale down to zero when idle, minimizing cloud costs while maintaining responsiveness.

## Challenges with GPU Autoscaling
GPU nodes take time to provision, and large models take time to load into memory. We will discuss strategies like over-provisioning, pre-warming, and multi-model serving to mitigate these cold-start delays.
