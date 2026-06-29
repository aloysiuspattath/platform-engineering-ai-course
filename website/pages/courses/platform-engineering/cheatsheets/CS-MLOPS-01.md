---
id: "CS-MLOPS-01"
title: "MLOps & Vector DB Cheat Sheet"
module: "MOD-MLOPS"
type: "cheatsheet"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quick reference for Qdrant CLI/API"
  - "Common embedding models"
prerequisites:
  - "MOD-MLOPS-01"
related_lessons:
  - "MOD-MLOPS-02"
related_labs:
  - "LAB-MLOPS-01"
related_projects:
  - "PROJ-MLOPS-01"
related_quizzes:
  - "QUIZ-MLOPS-01"
related_cheatsheets: []
tags:
  - "cheatsheet"
  - "reference"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# MLOps & Vector DB Cheat Sheet

## Qdrant Quick Commands
* `GET /collections`: List collections
* `PUT /collections/{name}`: Create a collection

## Embedding Models
* `text-embedding-ada-002` (OpenAI): 1536 dimensions
* `all-MiniLM-L6-v2` (HuggingFace): 384 dimensions
