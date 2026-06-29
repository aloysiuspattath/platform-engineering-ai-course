---
id: "QUIZ-ADV"
title: "Advanced Systems & Scaling Knowledge Check"
module: "MOD-ADV"
type: "quiz"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Test comprehension of multi-region architectures."
  - "Evaluate understanding of the CAP theorem and distributed databases."
  - "Assess knowledge of failover strategies and cluster mesh networking."
prerequisites:
  - "MOD-ADV-05"
related_lessons:
  - "MOD-ADV-01"
  - "MOD-ADV-02"
  - "MOD-ADV-03"
  - "MOD-ADV-04"
  - "MOD-ADV-05"
tags:
  - "quiz"
  - "scaling"
  - "distributed-systems"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Advanced Systems & Scaling Knowledge Check

Test your understanding of advanced platform engineering concepts.

## Question 1
According to the CAP Theorem, if a network partition occurs in a distributed database, a system must choose between which two guarantees?
A) Consistency and Latency
B) Availability and Partition Tolerance
C) Consistency and Availability
D) Reliability and Throughput

## Question 2
Which of the following is a primary benefit of an Active-Passive disaster recovery architecture compared to Active-Active?
A) Zero downtime failover
B) Simpler data synchronization
C) Better resource utilization
D) Protection against split-brain scenarios

## Question 3
In a Kubernetes Cluster Mesh, what is the primary purpose of cross-cluster service discovery?
A) To allow pods in one cluster to resolve and communicate with services in another cluster.
B) To sync the etcd databases of all connected clusters.
C) To automatically migrate pods between regions during an outage.
D) To combine multiple API servers into a single endpoint.
