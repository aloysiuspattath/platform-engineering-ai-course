---
id: "MOD-MLOPS-02"
title: "Vector Database Architecture (Qdrant, Milvus, pgvector)"
module: "MOD-MLOPS"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "25m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Compare leading vector databases"
  - "Deploy highly available vector databases on Kubernetes"
  - "Optimize vector index types (HNSW, IVFFlat)"
prerequisites:
  - "MOD-MLOPS-01"
related_lessons:
  - "MOD-MLOPS-03"
related_labs:
  - "LAB-MLOPS-01"
related_projects:
  - "PROJ-MLOPS-01"
related_quizzes:
  - "QUIZ-MLOPS-01"
related_cheatsheets:
  - "CS-MLOPS-01"
tags:
  - "vector-db"
  - "qdrant"
  - "milvus"
  - "pgvector"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Vector Database Architecture

## Introduction
Vector databases are specialized data stores optimized for storing and querying high-dimensional vectors. In the context of RAG, they serve as the memory engine for LLMs.

## Popular Vector Databases
* **Qdrant**: Rust-based, highly performant, API-first vector search engine.
* **Milvus**: Cloud-native vector database built for massive scale.
* **pgvector**: PostgreSQL extension adding vector similarity search.

## Deployment Strategies
We explore deploying these on Kubernetes using Helm, setting up replication, and managing persistent volumes for vector storage.
