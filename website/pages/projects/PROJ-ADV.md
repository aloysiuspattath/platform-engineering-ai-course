---
id: "PROJ-ADV"
title: "Capstone: Global E-Commerce Platform Architecture"
module: "MOD-ADV"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "15m"
estimated_hands_on_time: "180m"
learning_objectives:
  - "Design an end-to-end multi-region infrastructure for a high-traffic application."
  - "Implement active-active database replication and global load balancing."
  - "Defend architectural decisions in a simulated design review."
prerequisites:
  - "LAB-ADV-01"
  - "MOD-ADV-05"
related_lessons:
  - "MOD-ADV-01"
  - "MOD-ADV-02"
  - "MOD-ADV-03"
  - "MOD-ADV-04"
  - "MOD-ADV-05"
tags:
  - "architecture"
  - "capstone"
  - "multi-region"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone: Global E-Commerce Platform Architecture

This project challenges you to synthesize everything learned in Module 17.

## Scenario
You are the Lead Platform Engineer for a global e-commerce company preparing for Black Friday. Last year, a single region outage caused millions in lost revenue. Your task is to re-architect the platform.

## Requirements
1. **Multi-Region Active-Active Setup:** The platform must serve traffic from three distinct geographic regions simultaneously.
2. **Database Strategy:** Implement a sharding and caching layer to handle 100k requests per second.
3. **Disaster Recovery:** Demonstrate an automated failover scenario with zero data loss (RPO = 0) and minimal downtime (RTO < 1m).

## Deliverables
- A comprehensive architectural diagram.
- Terraform code to bootstrap the base infrastructure.
- A technical document defending your design choices.
