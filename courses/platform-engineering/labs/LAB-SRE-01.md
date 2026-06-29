---
id: "LAB-SRE-01"
title: "Implementing SLOs and Error Budgets"
module: "MOD-SRE"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "60m"
learning_objectives:
  - "Instrument a service with Prometheus metrics to measure an SLI."
  - "Create a Grafana dashboard visualizing the SLO and Error Budget."
prerequisites:
  - "MOD-SRE-01"
related_lessons:
  - "MOD-SRE-01"
tags:
  - "SRE"
  - "SLO"
  - "Prometheus"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lab: Implementing SLOs and Error Budgets

In this lab, you will configure Prometheus to scrape latency metrics from a sample Go application and define an SLO.

## Task 1: Deploy Sample Application
Deploy the provided deployment.yaml to your local Kubernetes cluster.

## Task 2: Configure Prometheus Recording Rules
Write PromQL queries to measure the percentage of requests served in under 200ms.

## Task 3: Error Budget Dashboard
Import the provided Grafana dashboard template and link it to your newly created recording rules to visualize the burn rate.
