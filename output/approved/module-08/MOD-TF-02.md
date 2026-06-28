---
id: "MOD-TF-02"
title: "HCL Declarative Syntax & Core Concepts"
module: "MOD-TF"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Write valid HCL syntax"
  - "Define providers, resources, and data sources"
  - "Use input variables and output values effectively"
prerequisites:
  - "MOD-TF-01"
related_lessons:
  - "MOD-TF-03"
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
  - "hcl"
  - "syntax"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# HCL Declarative Syntax & Core Concepts

## HashiCorp Configuration Language (HCL)
Terraform uses HCL to describe the desired state of infrastructure. HCL is designed to be highly readable for humans while being easy for machines to parse.

## Core Blocks

### 1. Providers
Providers are plugins that allow Terraform to interact with cloud platforms (AWS, Azure, GCP), SaaS platforms, and other APIs.

```hcl
provider "aws" {
  region = "us-west-2"
}
```

### 2. Resources
Resources are the most important element in the Terraform language. Each resource block describes one or more infrastructure objects, such as virtual networks, compute instances, or higher-level components such as DNS records.

```hcl
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

### 3. Data Sources
Data sources allow Terraform to use information defined outside of Terraform, defined by another separate Terraform configuration, or modified by functions.

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
}
```

### 4. Variables and Outputs
- **Input Variables** serve as parameters for a Terraform module, allowing users to customize behavior without editing the source.
- **Output Values** are like return values for a Terraform module, providing a way to extract useful information from your infrastructure.

```hcl
variable "instance_type" {
  type    = string
  default = "t2.micro"
}

output "instance_ip_addr" {
  value = aws_instance.web.private_ip
}
```
