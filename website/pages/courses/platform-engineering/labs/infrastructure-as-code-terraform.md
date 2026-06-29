---
id: "LAB-TF-01"
title: "Deploying a VPC and EC2 Instance with Terraform"
module: "MOD-TF"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Initialize a Terraform workspace"
  - "Write HCL to define an AWS VPC and an EC2 instance"
  - "Execute terraform plan and apply commands"
  - "Clean up resources using terraform destroy"
prerequisites:
  - "MOD-TF-01"
  - "MOD-TF-02"
related_lessons:
  - "MOD-TF-01"
  - "MOD-TF-02"
  - "MOD-TF-03"
related_labs: []
related_projects:
  - "PROJ-TF"
related_quizzes:
  - "QUIZ-TF"
related_cheatsheets:
  - "CS-TF"
tags:
  - "terraform"
  - "aws"
  - "lab"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Deploying a VPC and EC2 Instance with Terraform

## Goal
Provision a basic AWS infrastructure (VPC, Subnet, and EC2 instance) using Terraform.

## Estimated time
45 minutes

## Difficulty
Intermediate

## Prerequisites
- An AWS account
- AWS CLI configured locally with appropriate credentials
- Terraform installed

## Environment Setup
1. Open your terminal.
2. Create a new directory and navigate into it: `mkdir terraform-lab && cd terraform-lab`
3. Verify your AWS credentials are valid: `aws sts get-caller-identity`

## Step-by-Step Instructions
### Step 1: Define the Provider
Create a file named `main.tf` and define the AWS provider:
```hcl
provider "aws" {
  region = "us-east-1"
}
```

### Step 2: Create a VPC and Subnet
Append the following to `main.tf`:
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}
```

### Step 3: Launch an EC2 Instance
Add an EC2 instance resource:
```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
}
```

### Step 4: Apply the Configuration
1. Run `terraform init` to download the AWS provider.
2. Run `terraform plan` to see what resources will be created.
3. Run `terraform apply` and type `yes` to provision the resources.

## Verification
Log into the AWS Management Console, navigate to the VPC and EC2 dashboards, and verify that your resources have been created in the `us-east-1` region.

## Troubleshooting
- If you get permission errors, ensure your AWS IAM user has sufficient privileges (e.g., AdministratorAccess for this lab).
- If Terraform cannot find the AMI, double-check the region and AMI filter in the data source.

## Cleanup
Run `terraform destroy` and type `yes` to tear down all resources created during this lab and avoid unnecessary AWS charges.
