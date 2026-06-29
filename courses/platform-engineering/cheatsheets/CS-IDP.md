---
id: "CS-IDP"
title: "Internal Developer Platforms Cheat Sheet"
module: "MOD-IDP"
type: "cheatsheet"
difficulty: "Beginner"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for IDP terminology and Backstage concepts."
prerequisites: []
related_lessons:
  - "MOD-IDP-01"
  - "MOD-IDP-04"
related_labs: []
related_projects: []
related_quizzes: []
related_cheatsheets: []
tags:
  - "Platform Engineering"
  - "IDP"
  - "Cheat Sheet"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Internal Developer Platforms (IDP) Cheat Sheet

## Terminology

- **IDP**: Internal Developer Platform. A self-service portal for developers.
- **Golden Path**: A recommended and supported approach to building and deploying software.
- **DevEx**: Developer Experience. The overall experience of developers interacting with the platform.
- **Cognitive Load**: The amount of mental effort required by developers to use the platform.

## Backstage Core Entities

- **Component**: A piece of software (e.g., service, website, library).
- **API**: An interface exposed by a component.
- **Resource**: Infrastructure required by a component (e.g., database, bucket).
- **System**: A collection of entities that work together.
- **Domain**: A grouping of systems.
- **User**: An individual interacting with Backstage.
- **Group**: A team or organizational unit.

## DORA Metrics

1. **Deployment Frequency**: How often code is deployed to production.
2. **Lead Time for Changes**: Time from commit to production.
3. **Change Failure Rate**: Percentage of deployments that cause a failure in production.
4. **Time to Restore Service**: How long it takes to recover from a failure.
