---
id: "QUIZ-AI-01"
title: "AI Infrastructure & LLM Serving Knowledge Check"
module: "MOD-AI"
type: "quiz"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Test knowledge of GPU architectures and memory bandwidth."
  - "Assess understanding of batching techniques."
  - "Validate comprehension of autoscaling AI workloads."
prerequisites:
  - "MOD-AI-05"
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
related_quizzes: []
related_cheatsheets:
  - "CS-AI-01"
tags:
  - "AI"
  - "Quiz"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Quiz: AI Infrastructure & LLM Serving Knowledge Check

## Questions

**1. Why are GPUs generally preferred over CPUs for deep learning inference and training?**
- A) They have higher single-thread clock speeds.
- B) They are natively integrated into the Linux kernel.
- C) They possess thousands of smaller cores optimized for parallel matrix multiplication.
- D) They do not require memory bandwidth to process data.

**2. Which technology allows an LLM serving engine (like vLLM) to dynamically add new requests to an existing batch without waiting for all prior requests to complete?**
- A) Static Batching
- B) Continuous Batching (Iteration-level scheduling)
- C) Tensor Parallelism
- D) Pipeline Parallelism

**3. What is the primary bottleneck for serving Large Language Models rapidly?**
- A) Network Latency
- B) Storage I/O speed
- C) CPU clock speed
- D) Memory Bandwidth (moving weights from VRAM to compute cores)

**4. When autoscaling AI workloads in Kubernetes, why is a standard CPU-based Horizontal Pod Autoscaler (HPA) often insufficient?**
- A) Kubernetes HPAs do not support GPU nodes.
- B) CPU usage does not accurately reflect the inference queue or GPU utilization bottlenecks.
- C) HPA cannot scale down to zero.
- D) Both B and C.

**5. Which metric is the most critical for measuring the initial responsiveness of an LLM to an end-user?**
- A) Time per Output Token (TPOT)
- B) GPU Temperature
- C) Time to First Token (TTFT)
- D) Context Window Size
