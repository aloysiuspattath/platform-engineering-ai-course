---
id: "LAB-AI-01"
title: "Deploying a Local LLM with Ollama"
module: "MOD-AI"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Install and configure Ollama on a Linux environment."
  - "Pull and run a quantized LLM locally."
  - "Interact with the model via CLI and REST API."
prerequisites:
  - "MOD-AI-02"
related_lessons:
  - "MOD-AI-01"
  - "MOD-AI-02"
related_labs: []
related_projects:
  - "PROJ-AI-01"
related_quizzes:
  - "QUIZ-AI-01"
related_cheatsheets:
  - "CS-AI-01"
tags:
  - "AI"
  - "Ollama"
  - "LLM"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lab: Deploying a Local LLM with Ollama

## Overview
In this lab, you will set up a local environment to run a Large Language Model (LLM). You will install Ollama, pull a lightweight model (e.g., Llama 3 8B), and interact with it using both the command-line interface and its REST API.

## Scenario
Your development team needs a sandbox environment to test prompts and understand LLM capabilities before moving to a costly cloud-based GPU cluster. You are tasked with providing a local, functional LLM endpoint on a standard developer machine.

## Tasks
1. **Install Ollama:** Download and install the Ollama binary on your provided Linux VM.
2. **Pull the Model:** Use the Ollama CLI to pull the `llama3` model. Observe the download size and initialization process.
3. **CLI Interaction:** Run the model interactively and ask it a few basic questions to verify functionality.
4. **API Integration:** Use `curl` to send a POST request to the Ollama REST API and parse the JSON response.
5. **Resource Monitoring:** While generating a long response, use `htop` or a similar tool in another terminal to observe CPU and RAM usage spikes.

## Success Criteria
- Ollama is running as a background service.
- The `llama3` model is successfully downloaded and cached.
- You receive a coherent response from both the CLI and the REST API.
- You have documented the peak memory usage during inference.
