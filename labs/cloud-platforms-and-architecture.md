---
id: "LAB-09-01"
title: "Lab 1: Deploying a Scalable Web Application"
module: "MOD-09"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "60m"
learning_objectives:
  - "Create a Virtual Private Cloud (VPC)"
  - "Deploy a web server instance"
  - "Configure a Load Balancer"
prerequisites:
  - "MOD-09-01"
  - "MOD-09-02"
related_lessons:
  - "MOD-09-02"
related_labs: []
related_projects:
  - "PROJ-09"
related_quizzes: []
related_cheatsheets:
  - "CS-09"
tags:
  - "vpc"
  - "load-balancing"
  - "hands-on"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lab 1: Deploying a Scalable Web Application

## Scenario
You are a Cloud Engineer tasked with deploying a simple web application that can handle varying amounts of traffic. You will set up a foundational cloud environment using Infrastructure as a Service (IaaS) components.

## Architecture
You will create:
1. A VPC with public and private subnets.
2. Two Web Server instances (e.g., EC2, Compute Engine) in the private subnets.
3. An Internet-facing Load Balancer in the public subnets to route traffic to your web servers.

## Instructions

### Step 1: Network Setup
1. Navigate to your cloud provider's console.
2. Create a new VPC with a CIDR block of `10.0.0.0/16`.
3. Create two public subnets and two private subnets across two different Availability Zones.
4. Attach an Internet Gateway to the VPC and configure the routing for the public subnets.

### Step 2: Provision Compute Resources
1. Launch two virtual machine instances.
2. Place them in the private subnets.
3. Use a startup script (User Data) to install a basic Nginx or Apache web server on boot.

### Step 3: Load Balancing
1. Create a Load Balancer.
2. Configure a listener on port 80 (HTTP).
3. Create a target group and register your two virtual machine instances.
4. Test the configuration by accessing the Load Balancer's public DNS name.

## Validation
You should be able to refresh the browser and see responses alternating between your two different web servers.
