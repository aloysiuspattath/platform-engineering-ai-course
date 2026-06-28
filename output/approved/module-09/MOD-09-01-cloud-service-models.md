---
id: "MOD-09-01"
title: "Lesson 1: Cloud Service Models (IaaS, PaaS, SaaS)"
module: "MOD-09"
type: "lesson"
difficulty: "Beginner"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Define Infrastructure as a Service (IaaS)"
  - "Define Platform as a Service (PaaS)"
  - "Define Software as a Service (SaaS)"
  - "Understand the shared responsibility model in the cloud"
prerequisites: []
related_lessons:
  - "MOD-09-02"
related_labs:
  - "LAB-09-01"
related_projects:
  - "PROJ-09"
related_quizzes:
  - "QUIZ-09"
related_cheatsheets:
  - "CS-09"
tags:
  - "cloud"
  - "iaas"
  - "paas"
  - "saas"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lesson 1: Cloud Service Models (IaaS, PaaS, SaaS)

## Introduction
Cloud computing provides IT resources over the internet with pay-as-you-go pricing. Rather than buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider.

## Cloud Service Models
The three main types of cloud computing include Infrastructure as a Service, Platform as a Service, and Software as a Service. Each type provides a different level of control, flexibility, and management so that you can select the right set of services for your needs.

### Infrastructure as a Service (IaaS)
IaaS contains the basic building blocks for cloud IT and typically provides access to networking features, computers (virtual or on dedicated hardware), and data storage space. 
- **Examples**: Amazon EC2, Google Compute Engine, Azure Virtual Machines.

### Platform as a Service (PaaS)
PaaS removes the need for your organization to manage the underlying infrastructure (usually hardware and operating systems) and allows you to focus on the deployment and management of your applications.
- **Examples**: AWS Elastic Beanstalk, Google App Engine, Heroku.

### Software as a Service (SaaS)
SaaS provides you with a completed product that is run and managed by the service provider. In most cases, people referring to SaaS are referring to end-user applications.
- **Examples**: Salesforce, Gmail, Dropbox.

## Shared Responsibility Model
When moving to the cloud, security and management become a shared responsibility between the cloud provider and the customer. The provider manages the security *of* the cloud (physical infrastructure), while the customer manages security *in* the cloud (data, applications, access).
