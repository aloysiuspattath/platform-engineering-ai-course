---
id: "MOD-11-04"
title: "Progressive Delivery (Canary, Blue/Green)"
module: "MOD-11"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "20m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Differentiate between deployment strategies like Canary and Blue/Green"
  - "Understand how progressive delivery minimizes deployment risk"
  - "Design safe deployment patterns for high-availability systems"
prerequisites:
  - "MOD-11-03"
tags:
  - "Deployment"
  - "Canary"
  - "Blue-Green"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Progressive Delivery

Progressive delivery is a modern software development lifecycle practice that builds upon continuous delivery. It aims to deploy updates in a controlled, gradual manner to limit the blast radius of potential failures.

## Blue/Green Deployments

In a Blue/Green deployment, two identical environments exist (Blue and Green). At any time, only one environment is live and serving production traffic.

- **Deploy**: The new version is deployed to the inactive environment.
- **Test**: The new environment is tested thoroughly.
- **Switch**: Traffic is routed from the old environment to the new one seamlessly.
- **Rollback**: If issues occur, traffic can be instantly switched back to the old environment.

## Canary Releases

Canary releases slowly roll out a change to a small subset of users before making it available to everyone.

- **Phase 1**: Route 5% of traffic to the new version.
- **Monitor**: Observe error rates, latency, and system health.
- **Phase 2**: If stable, increase traffic to 25%, 50%, and eventually 100%.

Tools like Argo Rollouts or Flagger natively support these strategies in Kubernetes environments.
