---
id: "MOD-09-04"
title: "Lesson 4: High Availability and Disaster Recovery"
module: "MOD-09"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "25m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand concepts of High Availability (HA)"
  - "Define Recovery Time Objective (RTO) and Recovery Point Objective (RPO)"
  - "Design Disaster Recovery (DR) architectures in the cloud"
prerequisites:
  - "MOD-09-02"
related_lessons:
  - "MOD-09-05"
related_labs:
  - "LAB-09-01"
related_projects:
  - "PROJ-09"
related_quizzes:
  - "QUIZ-09"
related_cheatsheets:
  - "CS-09"
tags:
  - "ha"
  - "disaster-recovery"
  - "rto"
  - "rpo"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lesson 4: High Availability and Disaster Recovery

## High Availability (HA)
High Availability is about ensuring your application is accessible when users need it. It involves removing single points of failure across the stack. In the cloud, this typically means deploying resources across multiple Availability Zones (AZs) or regions.

## Disaster Recovery (DR) Concepts
Disaster Recovery involves a set of policies, tools, and procedures to enable the recovery or continuation of vital technology infrastructure and systems following a natural or human-induced disaster.

### Key Metrics
- **Recovery Time Objective (RTO)**: The maximum acceptable delay between the interruption of service and the restoration of service.
- **Recovery Point Objective (RPO)**: The maximum acceptable amount of data loss measured in time.

## DR Strategies in the Cloud
1. **Backup and Restore**: Cheapest option, highest RTO/RPO. Data is backed up and restored to new infrastructure when needed.
2. **Pilot Light**: A minimal version of the environment is always running, ready to scale up quickly in the event of a disaster.
3. **Warm Standby**: A scaled-down version of a fully functional environment is always running.
4. **Multi-Site Active/Active**: Zero downtime. Traffic is routed to multiple regions simultaneously.
