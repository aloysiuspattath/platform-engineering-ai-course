---
id: "MOD-SRE-03"
title: "Structured Blameless Postmortems & Root Cause Analysis (RCA)"
module: "MOD-SRE"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Write a blameless postmortem."
  - "Conduct a 5 Whys root cause analysis."
prerequisites:
  - "MOD-SRE-02"
related_projects:
  - "PROJ-SRE"
tags:
  - "SRE"
  - "Postmortem"
  - "RCA"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Structured Blameless Postmortems & Root Cause Analysis

Learning from failure is a core tenet of SRE.

## Blameless Culture
A postmortem should assume that everyone involved in an incident had good intentions and did the right thing with the information they had. You cannot fix people; you can only fix systems.

## The Postmortem Document
Must include:
- Incident Summary
- Timeline
- Root Cause(s)
- Resolution and Recovery
- Action Items (Preventative measures)

## Root Cause Analysis (RCA)
Using the "5 Whys" technique to drill down beyond surface-level symptoms to underlying systemic failures.
