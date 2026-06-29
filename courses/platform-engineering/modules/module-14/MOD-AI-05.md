---
id: "MOD-AI-05"
title: "Monitoring LLM Latency, Token Throughput & GPU Utilization"
module: "MOD-AI"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Identify key metrics for monitoring LLM performance."
  - "Instrument AI workloads using Prometheus."
  - "Build Grafana dashboards for GPU utilization and inference latency."
prerequisites:
  - "MOD-AI-04"
  - "MOD-OBS-01"
related_lessons: []
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
  - "Monitoring"
  - "Observability"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Monitoring LLM Latency, Token Throughput & GPU Utilization

## Introduction
You cannot manage what you cannot measure. Monitoring AI workloads requires tracking different metrics than traditional web services. This lesson covers observability for LLM infrastructure.

## Key LLM Metrics
We will explore critical metrics such as:
- **Time to First Token (TTFT):** Measures the responsiveness of the model.
- **Time per Output Token (TPOT):** Measures generation speed.
- **Token Throughput:** The total number of tokens generated per second across all users.

## GPU Utilization Metrics
Understanding GPU health is vital. We will track GPU compute utilization, VRAM usage, power draw, and temperature using specialized exporters like `dcgm-exporter`.

## Prometheus and Grafana Integration
We will configure Prometheus to scrape these AI-specific metrics and build comprehensive Grafana dashboards. This provides a unified view of both the application-level LLM performance and the underlying infrastructure health.

## Alerting on Degradation
Finally, we will set up Alertmanager to trigger notifications when inference latency exceeds SLOs or when GPU memory is nearing capacity, enabling proactive incident response.
