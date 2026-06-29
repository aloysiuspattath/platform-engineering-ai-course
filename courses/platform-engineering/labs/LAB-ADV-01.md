---
id: "LAB-ADV-01"
title: "Deploying a Multi-Region Cluster Mesh"
module: "MOD-ADV"
type: "lab"
difficulty: "Advanced"
estimated_reading_time: "10m"
estimated_hands_on_time: "90m"
learning_objectives:
  - "Provision two separate Kubernetes clusters in different regions."
  - "Install and configure Cilium Cluster Mesh to connect them."
  - "Deploy a global service that load balances across both clusters."
prerequisites:
  - "MOD-ADV-03"
related_lessons:
  - "MOD-ADV-03"
tags:
  - "kubernetes"
  - "cilium"
  - "cluster-mesh"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Deploying a Multi-Region Cluster Mesh

In this lab, you will get hands-on experience setting up cross-cluster communication.

## Step 1: Provision the Infrastructure
Using Terraform, provision two lightweight Kubernetes clusters in different cloud regions.

## Step 2: Install Cilium
Install the Cilium CNI on both clusters, ensuring you enable the Cluster Mesh features.

## Step 3: Connect the Clusters
Extract the mesh configuration from cluster A and apply it to cluster B to establish a secure tunnel.

## Step 4: Deploy and Test a Global Service
Deploy a test application in both clusters and verify that traffic is load-balanced transparently between the two regions.
