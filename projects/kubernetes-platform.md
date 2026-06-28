---
id: "PROJ-10"
title: "Kubernetes Platform Engineering Capstone"
module: "MOD-10"
type: "project"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "120m"
learning_objectives:
  - "Design and build a scalable Kubernetes architecture."
  - "Implement stateful workloads with Persistent Volumes."
  - "Secure cluster communications with Network Policies and RBAC."
prerequisites:
  - "LAB-10-01"
  - "MOD-10-05"
tags:
  - "kubernetes"
  - "capstone"
  - "platform-engineering"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Kubernetes Platform Engineering Capstone

## Project Description
You are tasked with building a resilient and secure Kubernetes platform for a fictional e-commerce company, "KubeCommerce". You will need to handle stateful databases, secure ingress traffic, apply strict RBAC policies for different developer teams, and ensure high availability.

## Requirements
1. **Stateful Database**: Deploy a PostgreSQL database using a StatefulSet and PersistentVolumeClaims.
2. **Microservices**: Deploy three interacting microservices (catalog, cart, checkout) using Deployments.
3. **Security**: 
   - Implement NetworkPolicies so only the `checkout` service can talk to the database.
   - Create RBAC roles giving the "frontend-team" read-only access to all namespaces.
4. **Ingress**: Expose the application via an NGINX Ingress controller with TLS enabled.

## Deliverables
Provide a GitHub repository link containing all Kubernetes manifests organized by components, along with a README detailing the deployment steps.
