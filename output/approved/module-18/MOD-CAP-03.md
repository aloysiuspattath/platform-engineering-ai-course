---
id: "MOD-CAP-03"
title: "Integrating Platform and AI Services"
module: "MOD-CAP"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "15m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Integrate AI endpoints into an Internal Developer Platform"
  - "Design self-service MLOps workflows"
prerequisites:
  - "MOD-CAP-01"
  - "MOD-CAP-02"
related_lessons:
  - "MOD-CAP-04"
related_labs:
  - "LAB-CAP-01"
related_projects:
  - "PROJ-CAP-01"
related_quizzes:
  - "QUIZ-CAP-01"
related_cheatsheets:
  - "CS-CAP-01"
tags:
  - "Capstone"
  - "Integration"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Integrating Platform and AI Services

## Introduction
The true value of a platform engineering team is realized when advanced capabilities, like AI inference, are made easily accessible to the rest of the engineering organization. This lesson explores how to bridge the gap between AI infrastructure and developer self-service.

## AI-as-a-Service on the IDP
By treating AI models as standard internal services, you can expose them through your developer portal. This allows application developers to scaffold new services that are pre-configured to communicate with internal LLM endpoints securely.

## Self-Service MLOps
Data scientists and ML engineers also need self-service capabilities. You can create golden paths for:
1.  **Model Training:** Provisioning temporary GPU clusters for training jobs.
2.  **Vector Database Scaffolding:** Spinning up dedicated Qdrant or Milvus instances for RAG applications.

## Conclusion
Integrating AI services into your IDP democratizes access to advanced capabilities, accelerating product development across the entire organization.
