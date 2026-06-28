---
id: "PROJ-09"
title: "Capstone Project: Architecting a Cloud-Native Platform"
module: "MOD-09"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Design a fault-tolerant cloud architecture"
  - "Incorporate cloud-native principles and serverless components"
  - "Prepare a comprehensive deployment plan"
prerequisites:
  - "MOD-09-01"
  - "MOD-09-02"
  - "MOD-09-03"
  - "MOD-09-04"
  - "MOD-09-05"
related_lessons: []
related_labs:
  - "LAB-09-01"
related_projects: []
related_quizzes: []
related_cheatsheets:
  - "CS-09"
tags:
  - "architecture"
  - "cloud-native"
  - "capstone"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone Project: Architecting a Cloud-Native Platform

## Project Overview
In this capstone, you will act as a Lead Cloud Architect for a rapidly growing startup. The startup's current monolithic application is failing under load, and you must design a new, cloud-native architecture.

## Requirements

### Business Requirements
- **High Availability**: The application must have an uptime of 99.99%.
- **Disaster Recovery**: RPO of 1 hour, RTO of 4 hours.
- **Global Reach**: The application serves users globally, with low latency required for media assets.

### Technical Requirements
- Utilize microservices where appropriate.
- Use managed services (PaaS/SaaS) to reduce operational overhead.
- Design for stateless application tiers to enable horizontal auto-scaling.

## Deliverables
1. **Architecture Diagram**: A visual representation of your proposed solution (using Draw.io, Lucidchart, or Mermaid).
2. **Design Document**: A detailed explanation of your choices, including compute, networking, storage, and database selections.
3. **DR Strategy**: A breakdown of how you will meet the RTO and RPO requirements.

## Evaluation Criteria
- **Scalability**: Can the architecture handle a 10x traffic spike?
- **Resiliency**: Are there any single points of failure?
- **Cost-Effectiveness**: Are you using the right pricing models and instance types?
