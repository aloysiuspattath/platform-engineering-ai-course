---
id: "MOD-TF-03"
title: "State Management & Remote Backends"
module: "MOD-TF"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "20m"
learning_objectives:
  - "Understand the purpose of the terraform.tfstate file"
  - "Configure remote state backends like S3 or GCS"
  - "Implement state locking using DynamoDB to prevent concurrent modifications"
prerequisites:
  - "MOD-TF-02"
related_lessons:
  - "MOD-TF-04"
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
  - "state"
  - "backend"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# State Management & Remote Backends

## What is State in Terraform?
Terraform must store state about your managed infrastructure and configuration. This state is used by Terraform to map real-world resources to your configuration, keep track of metadata, and improve performance for large infrastructures. 

By default, state is stored locally in a file named `terraform.tfstate`.

## Remote Backends
Storing state locally is fine for personal projects, but it becomes problematic in a team environment:
- **Shared Storage**: Everyone needs access to the state file.
- **Locking**: You must ensure no two people are modifying infrastructure at the same time.
- **Secrets Management**: State files can contain plain-text secrets.

Remote backends solve these problems by storing the state in a centralized location (like AWS S3, Google Cloud Storage, or Terraform Cloud).

### Example: S3 Backend with DynamoDB Locking
```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

## State Locking
When you run `terraform plan` or `terraform apply`, Terraform locks the state file so that no one else can make changes concurrently. If someone else tries to run a command while the state is locked, Terraform will throw an error. This prevents corruption and race conditions.
