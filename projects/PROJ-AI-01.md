---
id: "PROJ-AI-01"
title: "Production LLM Inference Cluster with vLLM and KEDA"
module: "MOD-AI"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Deploy a vLLM inference server on Kubernetes."
  - "Configure event-driven autoscaling using KEDA."
  - "Set up Prometheus and Grafana for comprehensive inference monitoring."
prerequisites:
  - "LAB-AI-01"
  - "MOD-AI-05"
related_lessons:
  - "MOD-AI-03"
  - "MOD-AI-04"
  - "MOD-AI-05"
related_labs:
  - "LAB-AI-01"
related_projects: []
related_quizzes:
  - "QUIZ-AI-01"
related_cheatsheets:
  - "CS-AI-01"
tags:
  - "AI"
  - "vLLM"
  - "Kubernetes"
  - "KEDA"
  - "Capstone"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Project: Production LLM Inference Cluster with vLLM and KEDA

## Overview
This capstone project bridges the gap between running models locally and serving them in a highly available, production-grade cloud environment. You will deploy a vLLM server to a Kubernetes cluster equipped with GPU nodes, implement autoscaling with KEDA based on queue length, and instrument the entire stack for observability.

## Architecture
You will build an architecture consisting of:
- A Kubernetes cluster with at least one GPU-enabled node pool (simulated or real).
- A vLLM deployment serving an open-weight model.
- A queueing mechanism (e.g., Redis or RabbitMQ) simulating incoming inference requests.
- KEDA configured to scale the vLLM pods based on the queue depth.
- Prometheus scraping metrics from vLLM and Grafana visualizing the data.

## Requirements
1. **Deployment:** Create Kubernetes manifests (Deployments, Services) for vLLM. Ensure the correct container image and GPU resource requests are specified.
2. **Autoscaling:** Write a KEDA `ScaledObject` that targets your vLLM deployment, scaling from 0 to 3 replicas based on the external queue metric.
3. **Load Testing:** Use a simple load-generation script to populate the queue and trigger a scale-up event.
4. **Observability:** Apply the Prometheus ServiceMonitor for vLLM and import a community dashboard into Grafana to visualize token throughput and latency.

## Deliverables
- A GitHub repository containing all Kubernetes YAML manifests or Helm charts.
- A README file documenting the deployment steps.
- Screenshots of the Grafana dashboard during the load test, clearly showing the scaling events and token throughput.
