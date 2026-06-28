---
id: "CS-SRE"
title: "SRE Cheat Sheet"
module: "MOD-SRE"
type: "cheatsheet"
difficulty: "Beginner"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for SRE terminology and incident command roles."
prerequisites:
  - "MOD-SRE-01"
related_lessons:
  - "MOD-SRE-01"
  - "MOD-SRE-02"
tags:
  - "SRE"
  - "Reference"
  - "Cheat Sheet"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# SRE Cheat Sheet

## Core Metrics
*   **SLI (Service Level Indicator):** What you measure (e.g., latency).
*   **SLO (Service Level Objective):** Your target (e.g., 99.9% < 200ms).
*   **SLA (Service Level Agreement):** The business contract with consequences.
*   **Error Budget:** `100% - SLO` (The allowance for unreliability).

## Incident Command Roles
*   **Incident Commander:** Leads the response, does not perform hands-on fixes.
*   **Ops / SME:** Investigates and mitigates the issue.
*   **Communications:** Handles external and internal stakeholder updates.

## Automation & Toil
*   **Toil:** Manual, repetitive work scaling linearly.
*   **Goal:** Cap toil at 50% of SRE time. Use automation to eliminate it.
