---
id: "PROJ-IDP-01"
title: "Build a Self-Service IDP for Microservices"
module: "MOD-IDP"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Design and build an end-to-end Internal Developer Platform."
  - "Implement golden paths for microservices."
prerequisites:
  - "MOD-IDP-05"
  - "LAB-IDP-01"
related_lessons:
  - "MOD-IDP-03"
  - "MOD-IDP-04"
related_labs:
  - "LAB-IDP-01"
related_projects: []
related_quizzes: []
related_cheatsheets:
  - "CS-IDP"
tags:
  - "Platform Engineering"
  - "IDP"
  - "Capstone"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone Project: Build a Self-Service IDP for Microservices

Your task is to build a complete Internal Developer Platform that allows developers to spin up new microservices effortlessly.

## Requirements

1. **Developer Portal**: Deploy Backstage (or an alternative) to serve as the user interface.
2. **Software Catalog**: Populate the catalog with at least two existing microservices and one database.
3. **Golden Paths**: Create a software template that scaffolds:
   - A Spring Boot application.
   - A GitHub Actions CI/CD pipeline.
   - A Kubernetes deployment manifest.
4. **Dynamic Infrastructure**: Integrate Crossplane or Terraform to provision a managed database when the template is instantiated.

## Evaluation Criteria

- The developer portal is accessible and configured correctly.
- A developer can use a template to create a new service without manual infrastructure configuration.
- The resulting service is deployed and running automatically.
