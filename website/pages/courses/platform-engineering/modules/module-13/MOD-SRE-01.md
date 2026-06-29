---
id: "MOD-SRE-01"
title: "SLIs, SLOs, SLAs & Error Budget Calculations"
module: "MOD-SRE"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "15m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Define and differentiate SLI, SLO, and SLA."
  - "Calculate an error budget for a given SLO."
prerequisites:
  - "MOD-OBS-02"
related_labs:
  - "LAB-SRE-01"
tags:
  - "SRE"
  - "SLO"
  - "Metrics"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# SLIs, SLOs, SLAs & Error Budget Calculations

Welcome to the foundational lesson on Site Reliability Engineering (SRE) metrics.

## Service Level Indicators (SLIs)
A carefully defined quantitative measure of some aspect of the level of service that is provided. Examples include request latency, error rate, and system throughput.

## Service Level Objectives (SLOs)
A target value or range of values for a service level that is measured by an SLI. SLOs should act as a threshold to determine if users are happy.

## Service Level Agreements (SLAs)
An explicit or implicit contract with your users that includes consequences of meeting (or missing) the SLOs they contain.

## Error Budgets
The mathematical difference between 100% reliability and your SLO. If your SLO is 99.9%, you have a 0.1% error budget. When the error budget is depleted, feature freezes or reliability-focused sprints are triggered.
