---
id: "LAB-MLOPS-01"
title: "Deploying Qdrant and Ingesting Embeddings"
module: "MOD-MLOPS"
type: "lab"
difficulty: "Advanced"
estimated_reading_time: "5m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Deploy Qdrant to Kubernetes"
  - "Generate embeddings using a HuggingFace model"
  - "Perform similarity search"
prerequisites:
  - "MOD-MLOPS-02"
related_lessons:
  - "MOD-MLOPS-02"
  - "MOD-MLOPS-05"
related_labs: []
related_projects:
  - "PROJ-MLOPS-01"
related_quizzes:
  - "QUIZ-MLOPS-01"
related_cheatsheets:
  - "CS-MLOPS-01"
tags:
  - "lab"
  - "qdrant"
  - "embeddings"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Deploying Qdrant and Ingesting Embeddings

## Scenario
You need to provide a vector search engine for the data science team.

## Tasks
1. Install Qdrant via Helm.
2. Port-forward the Qdrant API.
3. Use a Python script to embed a dataset and insert it into Qdrant.
4. Run a query and retrieve the top-k nearest neighbors.
