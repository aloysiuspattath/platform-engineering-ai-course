---
id: "MOD-TF-05"
title: "Terraform in CI/CD & GitOps"
module: "MOD-TF"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "20m"
estimated_hands_on_time: "20m"
learning_objectives:
  - "Automate Terraform workflows using CI/CD pipelines"
  - "Enforce security and compliance checks on IaC"
  - "Apply GitOps principles to infrastructure provisioning"
prerequisites:
  - "MOD-TF-04"
related_lessons: []
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
  - "ci-cd"
  - "gitops"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Terraform in CI/CD & GitOps

## Automating Terraform
Running Terraform manually from your local machine is prone to errors, requires shared credentials, and lacks auditability. To scale infrastructure provisioning, you must run Terraform in a Continuous Integration / Continuous Deployment (CI/CD) pipeline.

### The CI/CD Workflow
1. **Pull Request**: A developer proposes changes to Terraform code.
2. **CI Phase (`terraform plan`)**: The pipeline runs `terraform init`, `terraform fmt -check`, `terraform validate`, and `terraform plan`. The plan output is often posted back to the PR as a comment.
3. **Approval**: A reviewer inspects the plan and approves the PR.
4. **Merge**: The PR is merged into the main branch.
5. **CD Phase (`terraform apply`)**: The pipeline runs `terraform apply -auto-approve` to provision the resources.

## Security & Compliance Scanning
Before applying changes, it's crucial to scan your IaC for security vulnerabilities, misconfigurations, and compliance violations. Tools like **Checkov**, **tfsec**, and **Terrascan** can be integrated into the CI pipeline.

## GitOps
GitOps is a set of practices where Git is the single source of truth for declarative infrastructure and applications. By combining Terraform with CI/CD and GitOps methodologies, all changes to infrastructure are driven by Git commits, ensuring full traceability and version control.
