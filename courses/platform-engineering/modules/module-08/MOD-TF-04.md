---
id: "MOD-TF-04"
title: "Reusable Module Architecture"
module: "MOD-TF"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "25m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Structure Terraform code into reusable modules"
  - "Pass variables into modules and consume module outputs"
  - "Organize infrastructure repositories for scalability"
prerequisites:
  - "MOD-TF-03"
related_lessons:
  - "MOD-TF-05"
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
  - "modules"
  - "architecture"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Reusable Module Architecture

## What are Modules?
A Terraform module is a set of Terraform configuration files in a single directory. Modules are the primary way to package and reuse resource configurations with Terraform. Even a simple setup with a single directory containing `.tf` files is technically a module (the "root module").

## Creating and Using Modules
You can encapsulate complex, standard infrastructure components into modules, abstracting away the low-level details.

### Module Structure
A typical module structure includes:
- `main.tf`: The primary resources.
- `variables.tf`: Input parameters.
- `outputs.tf`: Return values.

### Calling a Module
To use a module, you define a `module` block in your root configuration and pass the required variables.

```hcl
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr             = "10.0.0.0/16"
  public_subnets_cidr  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets_cidr = ["10.0.3.0/24", "10.0.4.0/24"]
}
```

## Module Sources
Modules can be loaded from various sources:
- Local paths (`./modules/vpc`)
- Terraform Registry
- GitHub repositories (`git::https://github.com/example/terraform-aws-vpc.git?ref=v1.0.0`)
- HTTP URLs

## Best Practices
- **Single Responsibility**: A module should do one thing well (e.g., create a VPC, not a VPC + Database + Web Servers).
- **Versioning**: Always pin module versions, especially when using external registries or Git repositories.
- **Documentation**: Document required and optional variables for your modules.
