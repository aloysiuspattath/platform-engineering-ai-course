---
id: "PROJ-SRE"
title: "SRE Implementation & Chaos Experiment"
module: "MOD-SRE"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "180m"
learning_objectives:
  - "Design an end-to-end SRE framework for a microservices architecture."
  - "Execute a chaos engineering experiment and write a postmortem."
prerequisites:
  - "MOD-SRE-04"
related_lessons:
  - "MOD-SRE-03"
  - "MOD-SRE-04"
tags:
  - "SRE"
  - "Chaos Engineering"
  - "Postmortem"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone Project: SRE Implementation & Chaos Experiment

You have inherited a fragile multi-tier e-commerce application.

## Phase 1: Observability & SLOs
Define SLIs and SLOs for the checkout service. Implement monitoring to track the error budget.

## Phase 2: Chaos Injection
Use Chaos Mesh to simulate a network partition between the checkout service and the database.

## Phase 3: The Postmortem
Write a comprehensive blameless postmortem detailing the failure, the root cause (network partition), and action items (implementing retries/circuit breakers).
