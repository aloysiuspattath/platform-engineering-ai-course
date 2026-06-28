---
id: "MOD-TF-01"
title: "Introduction to Infrastructure as Code & Terraform"
module: "MOD-TF"
type: "lesson"
difficulty: "Beginner"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand the concept of Infrastructure as Code"
  - "Explain the benefits of declarative vs imperative provisioning"
  - "Understand the Terraform core workflow: init, plan, apply"
prerequisites: []
related_lessons:
  - "MOD-TF-02"
related_labs:
  - "LAB-TF-01"
related_projects:
  - "PROJ-TF"
related_quizzes:
  - "QUIZ-TF"
related_cheatsheets:
  - "CS-TF"
tags:
  - "terraform"
  - "iac"
  - "infrastructure"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Introduction to Infrastructure as Code & Terraform

## What is Infrastructure as Code (IaC)?
Infrastructure as Code (IaC) is the process of managing and provisioning computing infrastructure and resources through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

### Why IaC?
- **Speed and Simplicity**: Spin up an entire architecture just by running a script.
- **Configuration Consistency**: Standardize setup and eliminate configuration drift.
- **Risk Minimization**: Reduce human error that occurs during manual provisioning.
- **Version Control**: Manage infrastructure using the same tools as application code (e.g., Git).

## Declarative vs Imperative
- **Imperative**: Focuses on *how* to achieve the desired state (e.g., "Run this command to create a VM, then run this to attach a disk"). Bash scripts and CLI commands are typically imperative.
- **Declarative**: Focuses on *what* the desired state should be (e.g., "I want a VM with this attached disk"). The tool figures out how to achieve it. Terraform is a declarative tool.

## Introducing Terraform
Terraform is an open-source IaC tool created by HashiCorp. It allows you to define both cloud and on-premise resources in human-readable configuration files that you can version, reuse, and share.

### The Core Workflow
1. **Write**: Author infrastructure as code in `.tf` files.
2. **Init** (`terraform init`): Initialize the working directory containing Terraform configuration files. This downloads necessary providers.
3. **Plan** (`terraform plan`): Generate an execution plan describing what Terraform will do to achieve the desired state.
4. **Apply** (`terraform apply`): Execute the actions proposed in the plan.
