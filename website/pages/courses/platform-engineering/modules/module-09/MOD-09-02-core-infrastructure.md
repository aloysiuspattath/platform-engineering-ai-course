---
id: "MOD-09-02"
title: "Lesson 2: Core Cloud Infrastructure Components"
module: "MOD-09"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Understand Virtual Private Clouds (VPCs) and subnets"
  - "Explain load balancing and auto-scaling"
  - "Explore various cloud storage options (Block, Object, File)"
prerequisites:
  - "MOD-09-01"
related_lessons:
  - "MOD-09-03"
related_labs:
  - "LAB-09-01"
related_projects:
  - "PROJ-09"
related_quizzes:
  - "QUIZ-09"
related_cheatsheets:
  - "CS-09"
tags:
  - "vpc"
  - "networking"
  - "load-balancing"
  - "storage"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lesson 2: Core Cloud Infrastructure Components

## Networking in the Cloud

### Virtual Private Clouds (VPCs)
A VPC enables you to launch resources into a virtual network that you define. It resembles a traditional network that you'd operate in your own data center, with the benefits of using scalable infrastructure.

### Subnets and Route Tables
- **Public Subnets**: Have direct access to the Internet Gateway. Used for public-facing resources like load balancers.
- **Private Subnets**: No direct internet access. Used for backend servers and databases.

## Compute and Scaling

### Load Balancing
Load balancers distribute incoming application traffic across multiple targets, such as virtual machines, containers, and IP addresses. This increases the availability and fault tolerance of your applications.

### Auto-Scaling
Auto-scaling automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.

## Cloud Storage

- **Object Storage**: Highly scalable storage for unstructured data (e.g., Amazon S3, Google Cloud Storage).
- **Block Storage**: Persistent storage volumes for use with virtual machines (e.g., Amazon EBS).
- **File Storage**: Fully managed file systems that can be shared across multiple compute instances (e.g., Amazon EFS).
