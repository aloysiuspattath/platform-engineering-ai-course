---
id: "CS-TF"
title: "Terraform Command & Syntax Cheat Sheet"
module: "MOD-TF"
type: "cheatsheet"
difficulty: "Beginner"
estimated_reading_time: "5m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Quickly reference Terraform commands and HCL syntax"
prerequisites: []
related_lessons:
  - "MOD-TF-01"
  - "MOD-TF-02"
related_labs:
  - "LAB-TF-01"
related_projects:
  - "PROJ-TF"
related_quizzes:
  - "QUIZ-TF"
related_cheatsheets: []
tags:
  - "terraform"
  - "cheatsheet"
  - "commands"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Terraform Command & Syntax Cheat Sheet

## Core Workflow Commands
- `terraform init`: Initialize the working directory, download provider plugins, and configure backends.
- `terraform validate`: Validate the configuration files in a directory to ensure they are syntactically valid and internally consistent.
- `terraform plan`: Create an execution plan showing what changes Terraform will make to your infrastructure.
- `terraform apply`: Execute the actions proposed in a Terraform plan.
- `terraform destroy`: Destroy all remote objects managed by a particular Terraform configuration.

## Formatting and Linting
- `terraform fmt`: Rewrites Terraform configuration files to a canonical format and style.
- `terraform fmt -check`: Checks if files are formatted correctly (useful in CI pipelines).

## State Management
- `terraform state list`: List resources managed by Terraform in the current state.
- `terraform state show <resource>`: Show details of a specific resource in the state.
- `terraform state rm <resource>`: Remove a resource from the Terraform state without destroying it.

## HCL Syntax Basics

### Provider Block
```hcl
provider "aws" {
  region = "us-east-1"
}
```

### Resource Block
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345"
  instance_type = "t2.micro"
}
```

### Data Source Block
```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}
```

### Variable Block
```hcl
variable "region" {
  type        = string
  description = "The AWS region to deploy to"
  default     = "us-west-2"
}
```

### Output Block
```hcl
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```
