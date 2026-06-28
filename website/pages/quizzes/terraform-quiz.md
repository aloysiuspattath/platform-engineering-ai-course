---
id: "QUIZ-TF"
title: "Infrastructure as Code Concept Check"
module: "MOD-TF"
type: "quiz"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Verify understanding of declarative IaC principles"
  - "Test knowledge of Terraform core commands and state management"
prerequisites:
  - "MOD-TF-01"
  - "MOD-TF-02"
  - "MOD-TF-03"
related_lessons:
  - "MOD-TF-01"
  - "MOD-TF-02"
  - "MOD-TF-03"
  - "MOD-TF-04"
  - "MOD-TF-05"
related_labs:
  - "LAB-TF-01"
related_projects:
  - "PROJ-TF"
related_quizzes: []
related_cheatsheets:
  - "CS-TF"
tags:
  - "terraform"
  - "quiz"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Infrastructure as Code Concept Check

## Question 1
What command is used to download required providers and initialize the backend?
- A) `terraform plan`
- B) `terraform apply`
- C) `terraform init`
- D) `terraform get`

**Answer:** C

## Question 2
True or False: Terraform uses an imperative approach to infrastructure provisioning.
- A) True
- B) False

**Answer:** B (False. It uses a declarative approach.)

## Question 3
What is the purpose of the `terraform.tfstate` file?
- A) To store the credentials for your cloud provider.
- B) To map real-world infrastructure to your configuration.
- C) To define the modules to be downloaded.
- D) To act as a backup for your `.tf` files.

**Answer:** B

## Question 4
Which of the following is the BEST reason to use a remote state backend with state locking?
- A) It makes `terraform plan` execute faster.
- B) It allows you to write HCL in multiple languages.
- C) It prevents concurrent executions from corrupting the state file in a team environment.
- D) It automatically provisions a database.

**Answer:** C

## Question 5
When structuring reusable code in Terraform, which block do you use to pass values from a root configuration into a module?
- A) `variable`
- B) `output`
- C) `resource`
- D) `data`

**Answer:** A
