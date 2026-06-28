---
id: "MOD-SRE-05"
title: "Toil Reduction & Automation"
module: "MOD-SRE"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "15m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Identify toil vs. overhead."
  - "Implement automation to eliminate toil."
prerequisites:
  - "MOD-SRE-01"
related_cheatsheets:
  - "CS-SRE"
tags:
  - "SRE"
  - "Automation"
  - "Toil"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Toil Reduction & Automation

SREs are engineers. Their time is best spent on engineering, not manual, repetitive tasks.

## What is Toil?
Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and scales linearly as a service grows.

## Measuring Toil
SRE teams should aim to cap operational work (toil) at 50% of their time.

## Automation Strategies
Identify the most frequent manual tasks (e.g., user provisioning, database backups, simple restarts) and write self-healing scripts or self-service tools to eliminate them.
