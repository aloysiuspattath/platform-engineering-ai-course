---
id: "PROJ-TF"
title: "Capstone: High-Availability Web Infrastructure"
module: "MOD-TF"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Design a highly available architecture"
  - "Implement reusable Terraform modules"
  - "Configure remote state and state locking"
prerequisites:
  - "MOD-TF-01"
  - "MOD-TF-02"
  - "MOD-TF-03"
  - "MOD-TF-04"
related_lessons:
  - "MOD-TF-04"
related_labs:
  - "LAB-TF-01"
related_projects: []
related_quizzes:
  - "QUIZ-TF"
related_cheatsheets:
  - "CS-TF"
tags:
  - "terraform"
  - "aws"
  - "project"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Capstone: High-Availability Web Infrastructure

## Business Scenario
You are tasked with designing and deploying the foundational infrastructure for a new startup. The infrastructure must be highly available across multiple availability zones, scalable, and defined entirely as code. This will serve as the base for their flagship web application.

## Architecture Diagram
*(Imagine a diagram with a VPC spanning two Availability Zones. Each AZ has public and private subnets. An Application Load Balancer sits in the public subnets, routing traffic to EC2 Auto Scaling Groups in the private subnets. A multi-AZ RDS database sits in isolated database subnets.)*

## Folder Structure
```
.
├── backend.tf
├── main.tf
├── variables.tf
├── outputs.tf
└── modules/
    ├── networking/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    ├── compute/
    │   └── ...
    └── database/
        └── ...
```

## Requirements
1. **Networking**: Create a VPC with public and private subnets across at least 2 Availability Zones. Include an Internet Gateway and NAT Gateways.
2. **Compute**: Deploy an Application Load Balancer (ALB) and an Auto Scaling Group (ASG) of EC2 instances running Nginx.
3. **Database**: Provision an RDS PostgreSQL instance (Multi-AZ).
4. **State**: Configure an S3 backend for remote state storage, with DynamoDB for state locking.
5. **Modularity**: The codebase must be split into reusable modules (Networking, Compute, Database).

## Implementation
Start by configuring the `backend.tf` to secure your state. Next, build out the networking module to establish the foundation. Proceed with the database module, and finally implement the compute module (ALB and ASG), ensuring the instances are placed in the private subnets and the ALB in the public subnets.

## Testing
1. Execute `terraform plan` to ensure your configuration is valid.
2. Execute `terraform apply` to deploy.
3. Grab the DNS name of the ALB from the Terraform outputs.
4. Access the ALB DNS name via a web browser to verify that Nginx is serving traffic.

## Deployment
For this project, deployment is handled locally via the Terraform CLI. In a real-world scenario, you would integrate this into a CI/CD pipeline (e.g., GitHub Actions).

## Monitoring
Since you are deploying an ALB and EC2 instances, explore the AWS CloudWatch metrics automatically generated for these resources (e.g., RequestCount, CPUUtilization).

## Suggested Improvements
- Implement a CI/CD pipeline to automate `terraform plan` on Pull Requests and `terraform apply` on merge.
- Use a community module from the Terraform Registry for the VPC instead of building it from scratch.
- Add AWS WAF (Web Application Firewall) to the ALB.
