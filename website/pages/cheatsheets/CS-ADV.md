---
id: "CS-ADV"
title: "Advanced Systems Architecture Cheat Sheet"
module: "MOD-ADV"
type: "cheatsheet"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for CAP theorem trade-offs."
  - "Summary of common sharding and caching patterns."
  - "Reference for RTO/RPO calculation formulas."
prerequisites: []
related_lessons:
  - "MOD-ADV-02"
  - "MOD-ADV-04"
  - "MOD-ADV-05"
tags:
  - "cheatsheet"
  - "architecture"
  - "reference"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Advanced Systems Architecture Cheat Sheet

## The CAP Theorem Reference
- **CP (Consistent & Partition Tolerant):** Wait for a response from all nodes before confirming a write. (e.g., MongoDB, HBase)
- **AP (Available & Partition Tolerant):** Return the most recent available version of the data, which might be stale. (e.g., Cassandra, DynamoDB)

## Caching Strategies
- **Cache-Aside:** Application checks cache first. If miss, loads from DB and writes to cache.
- **Write-Through:** Application writes to cache and DB simultaneously.
- **Write-Behind (Write-Back):** Application writes to cache, which asynchronously writes to DB.

## Disaster Recovery Metrics
- **Recovery Time Objective (RTO):** The maximum tolerable length of time that a computer, system, network, or application can be down after a failure.
- **Recovery Point Objective (RPO):** The maximum targeted period in which data (transactions) might be lost from an IT service due to a major incident.
