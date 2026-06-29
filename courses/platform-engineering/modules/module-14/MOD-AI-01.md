---
id: "MOD-AI-01"
title: "Hardware Architecture for AI: GPUs, TPUs, CUDA & Memory Bandwidth"
module: "MOD-AI"
type: "lesson"
difficulty: "Beginner"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand the differences between CPU and GPU architectures for AI workloads."
  - "Explain the role of CUDA in AI computation."
  - "Identify the importance of memory bandwidth in LLM serving."
prerequisites:
  - "MOD-K8S-01"
related_lessons:
  - "MOD-AI-02"
related_labs:
  - "LAB-AI-01"
related_projects:
  - "PROJ-AI-01"
related_quizzes:
  - "QUIZ-AI-01"
related_cheatsheets:
  - "CS-AI-01"
tags:
  - "AI"
  - "GPU"
  - "Hardware"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Hardware Architecture for AI: GPUs, TPUs, CUDA & Memory Bandwidth

## Introduction
Artificial intelligence requires specialized hardware. This lesson explores the foundational hardware architectures that make AI and LLM inference possible.

## CPU vs. GPU Architecture
While CPUs are designed for general-purpose processing with a few powerful cores, GPUs are designed with thousands of smaller, specialized cores that excel at parallel processing. AI workloads heavily rely on matrix multiplication, making GPUs far superior for these computations.

## TPUs and Specialized Accelerators
Tensor Processing Units (TPUs) are custom ASICs developed by Google specifically for machine learning workloads. They are highly optimized for TensorFlow and offer massive performance benefits for specific types of AI tasks.

## CUDA and Software Interfaces
CUDA (Compute Unified Device Architecture) is NVIDIA's parallel computing platform and programming model. It allows developers to use CUDA-enabled GPUs for general purpose processing. Most AI frameworks rely on CUDA under the hood.

## The Role of Memory Bandwidth
For Large Language Models (LLMs), memory bandwidth is often the primary bottleneck rather than raw compute power. Moving massive model weights from memory to the processing cores requires extreme bandwidth, which is why architectures like High Bandwidth Memory (HBM) are critical in modern AI accelerators.
