# Module 12: Observability (Prometheus & Grafana) (`MOD-OBS`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 12: Observability (Prometheus & Grafana)**!

In Module 11, you mastered the automated deployment highway of CI/CD pipelines, GitOps reconciliation engines, and progressive delivery (Canary/Blue-Green rollouts). You can instantly build, scan, sign, and push developer code into your running Kubernetes cluster with absolute zero downtime.

However, once you have fifty different microservices running across five hundred Kubernetes Pods in production, a brand-new, monumental engineering challenge emerges: **How do you know what is happening inside your system?**

In legacy systems administration, infrastructure was simple. You had three servers (`web1`, `web2`, and `db1`). When the application crashed, a sysadmin logged into `web1` via SSH, opened `/var/log/syslog`, found the error stack trace, and restarted the daemon.

**In a modern microservice architecture, SSHing into servers to read log files is entirely impossible!**

Imagine a user attempts to book a ride on your global transportation platform. Their single HTTP click hits an API Gateway, which calls an Authentication service, which calls a Pricing service, which calls a Location service, which calls a Driver matching service, which queries three separate databases.

Somewhere in that massive chain of microservice calls, the user experiences an agonizing **15-second timeout error**!

If you attempt to find the root cause by manually logging into servers, you will fail instantly! Your microservices are running inside ephemeral Kubernetes Pods spread across fifty different physical nodes. The specific Pod that handled the user's request might have already been terminated and deleted by an autoscaler (`MOD-K8S-06`). Its local log files are completely gone!

**In complex microservice architectures, you cannot fix what you cannot see!**

This module bridges your container orchestration and deployment capabilities directly into modern distributed **Observability**. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract telemetry mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable observability capabilities.

---

# Capability Statement

> **"I can instrument distributed systems with metrics, logs, and traces, and build mission-critical dashboards."**

By the end of this module, you will establish the essential observability capabilities required to deconstruct the Three Pillars of Observability, instrument applications with Prometheus time-series metrics, author advanced PromQL queries, design mission-critical Grafana visualization dashboards, architect OpenTelemetry distributed tracing pipelines, and configure AlertManager routing to eliminate pager fatigue.

---

# Essential Module Anchors

* **Why am I learning this?** In distributed microservice architectures, systems become black boxes. Observability provides the telemetry required to turn black-box systems into transparent, debuggable platforms, allowing you to identify root causes in seconds rather than hours.
* **How will I use it?** You will use these exact skills to write PromQL queries (`rate(http_requests_total[5m])`), design Grafana JSON dashboard panels, configure OpenTelemetry collectors (`otel-collector-config.yaml`), and author AlertManager routing trees (`route: receiver: 'pagerduty'`).
* **Where does this fit into Platform Engineering?** Observability initiates Stage 5 (Observability & Reliability). It provides the master telemetry layer that monitors everything you built in Stages 1-4 (Linux, Cloud, Terraform, Kubernetes, CI/CD) and provides the actionable data required for Stage 5 Site Reliability Engineering (SRE).
* **What problem does it solve?** It solves the critical enterprise challenges of black-box microservices, unresolvable latency bottlenecks, missing log files on ephemeral containers, alert fatigue, and blind operational troubleshooting.
* **Where will I use it later?** You will use these skills directly in Module 13 (Calculating SRE SLIs/SLOs and Error Budgets), Module 14 (Monitoring AI GPU Latency and Token Throughput), Module 16 (Embedding Observability Dashboards directly into an Internal Developer Platform), and Module 17 (Monitoring Multi-Region Global Platform Topologies).

---

# Lesson Directory

This module consists of five progressive, highly instructional lessons:

1. **[MOD-OBS-01: The Three Pillars of Observability: Metrics, Logs & Traces](lesson-01.md)**
2. **[MOD-OBS-02: Time-Series Instrumentation with Prometheus & PromQL](lesson-02.md)**
3. **[MOD-OBS-03: Designing Mission-Critical Grafana Dashboards](lesson-03.md)**
4. **[MOD-OBS-04: OpenTelemetry Architecture & Distributed Tracing Fundamentals](lesson-04.md)**
5. **[MOD-OBS-05: AlertManager Configuration & Actionable Routing](lesson-05.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 20%
* **Intermediate:** 50%
* **Advanced:** 30%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational telemetry intuition before advancing into complex time-series mathematics (PromQL vectors), OpenTelemetry context propagation spans, and advanced alert routing trees.*
