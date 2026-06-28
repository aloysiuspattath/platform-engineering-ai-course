---
id: "MOD-10-03"
title: "Services, Networking, and Ingress"
module: "MOD-10"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "15m"
estimated_hands_on_time: "30m"
learning_objectives:
  - "Understand Kubernetes Services and DNS."
  - "Expose applications using NodePort and LoadBalancer."
  - "Implement Ingress controllers for HTTP routing."
prerequisites:
  - "MOD-10-02"
tags:
  - "kubernetes"
  - "networking"
  - "services"
  - "ingress"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Services, Networking, and Ingress

## Kubernetes Networking Model
Kubernetes enforces a networking model where every Pod gets its own IP address. This means you do not need to explicitly create links between Pods and you almost never need to deal with mapping container ports to host ports.

## Services
A Service is an abstract way to expose an application running on a set of Pods as a network service.
- **ClusterIP:** Exposes the Service on a cluster-internal IP.
- **NodePort:** Exposes the Service on each Node's IP at a static port.
- **LoadBalancer:** Exposes the Service externally using a cloud provider's load balancer.

## Ingress
Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. Traffic routing is controlled by rules defined on the Ingress resource.
- An Ingress controller is required to fulfill the Ingress, typically using an HTTP proxy like NGINX or HAProxy.
