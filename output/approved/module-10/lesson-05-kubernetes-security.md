---
id: "MOD-10-05"
title: "Kubernetes Security and RBAC"
module: "MOD-10"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "25m"
estimated_hands_on_time: "25m"
learning_objectives:
  - "Understand the Kubernetes API security model."
  - "Configure Role-Based Access Control (RBAC)."
  - "Implement Network Policies to secure pod communications."
prerequisites:
  - "MOD-10-03"
tags:
  - "kubernetes"
  - "security"
  - "rbac"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Kubernetes Security and RBAC

## API Access Control
Access to the Kubernetes API goes through three stages:
1. **Authentication:** Establishes the identity of the caller.
2. **Authorization:** Determines if the caller has permission to perform the requested action.
3. **Admission Control:** Modifies or validates the request before it is executed.

## Role-Based Access Control (RBAC)
RBAC is a method of regulating access to computer or network resources based on the roles of individual users within your organization.
- **Role / ClusterRole:** Contains rules that represent a set of permissions.
- **RoleBinding / ClusterRoleBinding:** Grants the permissions defined in a role to a user or set of users.

## Network Policies
NetworkPolicies are an application-centric construct which allow you to specify how a pod is allowed to communicate with various network "entities" over the network. They act as a firewall at the pod level.
