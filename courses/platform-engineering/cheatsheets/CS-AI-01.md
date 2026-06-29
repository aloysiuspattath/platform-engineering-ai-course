---
id: "CS-AI-01"
title: "AI Infrastructure & LLM Serving Cheat Sheet"
module: "MOD-AI"
type: "cheatsheet"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Provide quick reference for AI terminology, Ollama CLI commands, and vLLM configuration."
prerequisites: []
related_lessons:
  - "MOD-AI-01"
  - "MOD-AI-02"
  - "MOD-AI-03"
  - "MOD-AI-04"
  - "MOD-AI-05"
related_labs:
  - "LAB-AI-01"
related_projects:
  - "PROJ-AI-01"
related_quizzes:
  - "QUIZ-AI-01"
related_cheatsheets: []
tags:
  - "AI"
  - "Cheat Sheet"
  - "Quick Reference"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Cheat Sheet: AI Infrastructure & LLM Serving

## Core Terminology
*   **CUDA:** NVIDIA's parallel computing platform.
*   **VRAM:** Video RAM; crucial memory on a GPU where model weights are loaded.
*   **Quantization:** Reducing the precision of model weights (e.g., from 16-bit to 4-bit) to save memory at the cost of slight accuracy degradation.
*   **Continuous Batching:** Dynamically scheduling token generation at the iteration level for high throughput.
*   **TTFT (Time to First Token):** Latency metric for responsiveness.
*   **TPOT (Time per Output Token):** Latency metric for generation speed.

## Ollama Quick Commands
*   `ollama run <model>`: Pulls (if needed) and runs a model interactively.
*   `ollama pull <model>`: Downloads the model weights to the local cache.
*   `ollama list`: Shows installed models.
*   `ollama rm <model>`: Deletes a model to free up storage.

## vLLM Deployment Considerations
*   **PagedAttention:** vLLM's memory management technique that reduces KV cache fragmentation.
*   **GPU Memory Utilization:** Configure the fraction of GPU memory allocated to the KV cache vs. model weights (typically `--gpu-memory-utilization 0.9`).

## Kubernetes Scaling (KEDA)
*   Standard HPAs struggle with scale-to-zero and event-driven spikes.
*   Use KEDA to scale based on external metrics (e.g., Prometheus queries on inference queue length or API Gateway traffic).
*   **Cold Starts:** Scaling from 0 to 1 involves downloading massive weights and loading them into VRAM. Use node pre-warming or persistent volume caching to mitigate.

## Observability Checklist
*   Monitor GPU memory utilization (OOM errors will kill inference).
*   Monitor Token Throughput.
*   Ensure Prometheus is configured to scrape the `/metrics` endpoint of your serving engine (vLLM natively supports this).
