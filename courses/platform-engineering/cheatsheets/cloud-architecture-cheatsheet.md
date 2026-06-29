---
id: "CS-09"
title: "Cheat Sheet: Cloud Architecture"
module: "MOD-09"
type: "cheatsheet"
difficulty: "Beginner"
estimated_reading_time: "10m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for Cloud Service Models"
  - "Summary of Cloud Network and Compute components"
  - "Overview of DR strategies"
prerequisites: []
related_lessons:
  - "MOD-09-01"
  - "MOD-09-02"
  - "MOD-09-03"
  - "MOD-09-04"
  - "MOD-09-05"
related_labs:
  - "LAB-09-01"
related_projects:
  - "PROJ-09"
related_quizzes:
  - "QUIZ-09"
related_cheatsheets: []
tags:
  - "reference"
  - "cheat-sheet"
  - "cloud"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Cheat Sheet: Cloud Architecture

## Cloud Service Models
- **IaaS (Infrastructure as a Service)**: You manage OS, data, apps. Provider manages networking, storage, servers. (e.g., VMs)
- **PaaS (Platform as a Service)**: You manage apps and data. Provider manages everything else. (e.g., App Engine)
- **SaaS (Software as a Service)**: Provider manages everything. You just consume. (e.g., Gmail)

## Core Networking
- **VPC**: Virtual Private Cloud. Your isolated network.
- **Subnets**: Subdivisions of a VPC. Can be Public (internet access) or Private (no internet access).
- **Load Balancer**: Distributes traffic across instances to ensure availability.

## High Availability & Disaster Recovery
- **HA**: Minimizing downtime through redundancy (e.g., Multi-AZ).
- **RTO (Recovery Time Objective)**: Maximum time allowed to restore systems.
- **RPO (Recovery Point Objective)**: Maximum data loss allowed (measured in time).
- **DR Strategies**:
  1. Backup & Restore (Slowest, Cheapest)
  2. Pilot Light
  3. Warm Standby
  4. Multi-Site Active/Active (Fastest, Most Expensive)

## Cloud-Native Principles
- **Microservices**: Small, loosely coupled services.
- **Containers**: Portable environments packaging app code and dependencies.
- **Serverless**: Code execution without provisioning servers (e.g., Lambda/Functions).
- **Immutable Infrastructure**: Replacing servers rather than updating them in place.
