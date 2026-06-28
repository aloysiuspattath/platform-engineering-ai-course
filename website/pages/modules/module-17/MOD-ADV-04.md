---
id: "MOD-ADV-04"
title: "Active-Active and Active-Passive Failover Strategies"
module: "MOD-ADV"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "15m"
estimated_hands_on_time: "20m"
learning_objectives:
  - "Differentiate between Active-Active and Active-Passive architectures."
  - "Design robust failover mechanisms and disaster recovery plans."
  - "Calculate Recovery Time Objective (RTO) and Recovery Point Objective (RPO)."
prerequisites:
  - "MOD-ADV-03"
related_labs:
  - "LAB-ADV-01"
tags:
  - "failover"
  - "disaster-recovery"
  - "architecture"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Active-Active and Active-Passive Failover Strategies

A critical component of multi-region architecture is how traffic is handled during a disaster.

## Active-Passive (Disaster Recovery)
In this model, one region serves all traffic while a secondary region remains on standby. If the primary fails, traffic is routed to the secondary.
- **Pros:** Simpler data synchronization, lower cost.
- **Cons:** Slower failover, wasted resources in standby.

## Active-Active
Both regions serve traffic simultaneously.
- **Pros:** Maximum resource utilization, zero-downtime failover.
- **Cons:** Extremely complex data synchronization, higher risk of split-brain scenarios.

## RTO and RPO
We will define and calculate the acceptable downtime (RTO) and acceptable data loss (RPO) for various enterprise scenarios.
