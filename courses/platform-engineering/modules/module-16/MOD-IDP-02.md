---
id: "MOD-IDP-02"
title: "Designing Developer Portals & Golden Paths"
module: "MOD-IDP"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand the role of Internal Developer Portals."
  - "Learn how to design effective Golden Paths."
prerequisites:
  - "MOD-IDP-01"
related_lessons:
  - "MOD-IDP-03"
related_labs:
  - "LAB-IDP-01"
related_projects:
  - "PROJ-IDP-01"
related_quizzes:
  - "QUIZ-IDP"
related_cheatsheets:
  - "CS-IDP"
tags:
  - "Platform Engineering"
  - "IDP"
  - "Golden Paths"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Designing Developer Portals & Golden Paths

An Internal Developer Portal (IDP) serves as the primary interface for developers to interact with the underlying platform. 

## Developer Portals

A well-designed portal aggregates documentation, software catalogs, CI/CD statuses, and self-service scaffolding into a single pane of glass. Tools like Backstage have become the industry standard for building these portals.

## Golden Paths

A Golden Path is an opinionated and supported path to production. 
- It includes templates, CI/CD pipelines, and built-in security controls.
- It is not mandatory (a "golden cage"), but it is highly incentivized because the platform team supports it fully.
- It reduces setup time from weeks to minutes.
