# AlertManager Configuration & Actionable Routing

Version: 1.0.0

# Lesson Overview

This lesson covers the final, critical step of the observability lifecycle: Alerting. You will learn how Prometheus evaluates alerting rules and forwards them to Alertmanager. We will dive into configuring Alertmanager to handle deduplication, grouping, and routing of alerts to the correct teams via channels like Slack, PagerDuty, or email. Most importantly, we will focus on the philosophy of actionable alerting to prevent alert fatigue.

---

# Learning Objectives

* Understand the separation of concerns between Prometheus (rule evaluation) and Alertmanager (routing).
* Write robust Prometheus Alerting Rules using PromQL.
* Configure Alertmanager routes, receivers, and inhibition rules.
* Differentiate between high-urgency (page) and low-urgency (ticket) alerts.
* Implement strategies to prevent alert fatigue (grouping and silencing).

---

# Prerequisites

* Completion of `MOD-OBS-02: Time-Series Instrumentation with Prometheus & PromQL`.
* Basic understanding of incident response concepts (e.g., being "on-call").

---

# Why This Exists

If a system breaks and no one is notified, observability is useless. However, early monitoring systems had a massive flaw: if a database went down, it would trigger a "Database Down" alert, but also 500 "API Connection Failed" alerts from every microservice that relied on it. The on-call engineer's pager would explode with 501 notifications for a single incident, leading to "alert fatigue"—where engineers simply ignore alerts because they are too noisy. Alertmanager was built specifically to sit between the metric evaluator (Prometheus) and the notification systems (PagerDuty/Slack) to group, silence, and intelligently route alerts, ensuring humans are only paged when actionable intervention is required.

---

# Core Concepts

## The Alerting Pipeline

1.  **Prometheus evaluates rules:** Prometheus constantly runs PromQL queries defined in its `alerting_rules.yml`.
2.  **Firing State:** If a query returns a positive result for a configured duration (e.g., `for: 5m`), the alert moves from "Pending" to "Firing".
3.  **Sending to Alertmanager:** Prometheus pushes the Firing alert to Alertmanager.
4.  **Alertmanager Processing:** Alertmanager handles:
    *   **Deduplication:** Dropping redundant alerts from multiple HA Prometheus servers.
    *   **Grouping:** Combining related alerts into a single notification (e.g., 50 node failure alerts grouped into one "Datacenter Outage" page).
    *   **Routing:** Deciding *who* gets the alert based on labels (e.g., `team="database"` goes to the DBA team's PagerDuty, `severity="warning"` goes to a Slack channel).
    *   **Inhibition:** Suppressing alerts based on the presence of other alerts (e.g., If "Network Down" is firing, suppress "Node Unreachable" alerts).

## Alert Fatigue

Alert fatigue is an organizational disease where engineers are exposed to so many non-actionable or false-positive alerts that they become desensitized and ignore critical ones. A core tenet of SRE is: **Every page must be actionable.** If an alert fires and the human response is "oh, that just happens sometimes, I'll ignore it," that alert must be deleted.

## Symptom-Based Alerting

Instead of alerting on causes (e.g., "CPU is at 90%"), you should alert on symptoms that impact the user (e.g., "API Latency is > 2 seconds"). A node can run at 99% CPU indefinitely; if it's still serving user requests within SLA, there is no reason to wake someone up at 3 AM.

---

# Architecture

```mermaid
flowchart TD
    A["Prometheus Server (Evaluates PromQL Rules)"] -->|Pushes Alerts| B["Alertmanager (Deduplication & Grouping)"]
    B -->|Inhibition Logic (Suppress Noise)| C["Routing Tree"]
    C -->|severity=critical| D["PagerDuty (Wake up On-Call)"]
    C -->|severity=warning| E["Slack Channel (Review during business hours)"]
    C -->|team=database| F["Jira (Create low-priority ticket)"]
```

---

# Real-World Example

A Kubernetes cluster loses network connectivity to a specific availability zone.
*   **Without Alertmanager:** Prometheus detects 50 pods are unreachable and sends 50 individual PagerDuty alerts. The on-call engineer's phone rings 50 times in a row, inducing panic.
*   **With Alertmanager:** Prometheus sends 50 alerts. Alertmanager reads the configuration: `group_by: ['zone']`. It waits 30 seconds, bundles all 50 alerts into a single payload, and sends *one* PagerDuty notification: "50 pods are unreachable in zone us-east-1a." The engineer receives a calm, correlated summary of the incident.

---

# Hands-on Demonstration

Let's look at how to define an Alerting Rule in Prometheus.

**Input (Prometheus Rule Definition `rules.yml`):**
```yaml
groups:
- name: API_Alerts
  rules:
  - alert: HighErrorRate
    expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
    for: 2m
    labels:
      severity: critical
      team: backend
    annotations:
      summary: "High 5xx error rate on {{ $labels.instance }}"
      description: "Error rate is above 5% for the last 2 minutes."
```

**Execution Context:**
Prometheus evaluates `expr` every 15 seconds. If the error rate goes above 5%, the alert enters `Pending` state. If it stays above 5% for `2m` (2 minutes), it becomes `Firing` and is sent to Alertmanager. The `{{ $labels.instance }}` is a Go template that dynamically inserts the name of the failing server into the message.

---

# Hands-on Lab

* **Objective:** Configure Alertmanager to route a critical alert to a webhook (simulating Slack/PagerDuty) and group alerts.
* **Estimated Time:** 30 minutes
* **Difficulty:** Intermediate
* **Environment:** A local machine with Docker.

## Step-by-step Instructions

1.  **Create Alertmanager Config (`alertmanager.yml`):**
    ```yaml
    global:
      resolve_timeout: 5m
    route:
      group_by: ['alertname', 'cluster']
      group_wait: 10s
      group_interval: 10s
      repeat_interval: 1h
      receiver: 'default-webhook'
      routes:
      - match:
          severity: critical
        receiver: 'pager-webhook'
    receivers:
    - name: 'default-webhook'
      webhook_configs:
      - url: 'http://webhook-tester:8080/default'
    - name: 'pager-webhook'
      webhook_configs:
      - url: 'http://webhook-tester:8080/critical'
    ```

2.  **Create a simple mock webhook receiver (using Python in Docker):**
    We'll use a lightweight HTTP echo server to see the JSON payloads Alertmanager sends.

3.  **Update `docker-compose.yml`:**
    ```yaml
    version: '3'
    services:
      alertmanager:
        image: prom/alertmanager:latest
        volumes:
          - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
        command:
          - '--config.file=/etc/alertmanager/alertmanager.yml'
        ports:
          - "9093:9093"
      webhook-tester:
        image: mendhak/http-https-echo:31
        ports:
          - "8080:8080"
    ```

4.  **Run the Stack:** `docker-compose up -d`

5.  **Simulate an Alert:** We will send a manual POST request to Alertmanager simulating Prometheus firing an alert.
    ```bash
    curl -H "Content-Type: application/json" -d '[
      {
        "labels": {
          "alertname": "DatabaseDown",
          "severity": "critical",
          "cluster": "prod-us-east"
        },
        "annotations": {
          "summary": "Primary DB is unreachable"
        }
      }
    ]' http://localhost:9093/api/v1/alerts
    ```

6.  **Verify Routing:** Check the logs of the `webhook-tester` container: `docker logs webhook-tester`. You should see a POST request to the `/critical` endpoint containing the alert JSON. Because the `severity` was `critical`, it matched the specific route.

## Cleanup

Run `docker-compose down`.

---

# Production Notes

*   **The `for` duration:** Never set `for: 0m` on an alert. Transient network blips happen constantly. Always require a condition to persist for at least 1-5 minutes before paging someone to filter out self-resolving micro-failures.
*   **Inhibition Rules:** A classic inhibition rule: If `alertname="NodeDown"`, suppress `alertname="ContainerDown"` on the same node. The node being down implies all containers on it are down; the engineer only needs to know the node failed.
*   **Playbooks (Runbooks):** Every alert annotation MUST contain a link to a playbook (a Wiki or Markdown document) explaining exactly how to diagnose and fix the issue. Never page an engineer at 3 AM with an alert that has no documentation.

---

# Common Mistakes

*   **Paging on Warnings:** Sending `severity=warning` alerts (like "Disk is 70% full") to a PagerDuty channel that wakes people up. Warnings should route to Slack or Jira for daytime investigation. Only page when a system is fundamentally broken or SLA is breached.
*   **Testing in Production:** Creating a new alert rule and immediately attaching it to the primary PagerDuty rotation. Always route new alerts to a silent "testing" Slack channel for a week to observe their frequency and false-positive rate before upgrading them to page.

---

# Failure-Driven Learning

A major marketing campaign launches, traffic 10x's, and the database CPU hits 100%. The application slows down, but doesn't crash.
1.  **Failure:** The on-call engineer receives 500 PagerDuty alerts for "High API Latency" and 1 alert for "Database CPU High." The engineer struggles to silence the phone to actually look at the problem.
2.  **Diagnosis:** Alertmanager was not configured to group alerts. Every single pod experiencing latency fired its own independent alert.
3.  **Correction:** The team updates `alertmanager.yml` to set `group_by: ['alertname', 'service']`. Now, if 50 pods experience latency, Alertmanager groups them into a single page: "Service 'Checkout' is experiencing High API Latency (50 instances)." They also add an inhibition rule so that if Database CPU is high, it suppresses API latency alerts for services depending on that database.

---

# Engineering Decisions

A key architectural debate is where to define alerts:
*   **Centralized:** A dedicated observability team manages one massive `rules.yml` file for the whole company.
*   **Decentralized (Prometheus Operator):** Developers define `PrometheusRule` Custom Resource Definitions (CRDs) in Kubernetes right next to their application's `Deployment.yaml`.
*   **Best Practice:** Decentralized via the Prometheus Operator. Application developers know their failure modes better than a central ops team. They should own their alerts as code, deployed alongside their services.

---

# Best Practices

*   **Actionable Alerts Only:** Ask three questions for every alert: 1) Is the user affected? 2) Is it actionable right now? 3) Is there a playbook? If any answer is no, do not page.
*   **Silences:** Use Alertmanager's "Silences" feature during planned maintenance windows (e.g., database upgrades) to temporarily mute alerts based on matchers (e.g., mute `cluster="dev"` for 2 hours) to avoid training engineers to ignore pages.

---

# Troubleshooting Guide

## Issue 1: Alerts are firing in Prometheus, but no notification is received

*   **Cause:** Alertmanager is down, the route configuration is incorrect, or the receiver (e.g., Slack token) is invalid.
*   **Diagnosis:**
    1.  Check the Prometheus UI -> "Alerts" tab. Ensure the alert is in the red `FIRING` state.
    2.  Check the Alertmanager UI. See if the alert appears there. If not, Prometheus cannot reach Alertmanager.
    3.  If the alert is in Alertmanager, check the Alertmanager logs for errors related to the receiver (e.g., `Failed to send to Slack: HTTP 401 Unauthorized`).
*   **Solution:** Fix network connectivity between Prometheus/Alertmanager, correct the routing tree logic in `alertmanager.yml`, or rotate/fix API keys for the notification provider.

---

# Summary

Alertmanager is the critical final mile of observability. It protects engineering teams from alert fatigue by providing intelligent deduplication, grouping, inhibition, and routing. By adhering to symptom-based alerting and ensuring every page is actionable and documented, platform engineers can foster a healthy on-call culture and maintain high system reliability without burning out their teams.

---

# Cheat Sheet

*   **Prometheus Rule:** Evaluates PromQL and triggers state changes (Pending -> Firing).
*   **Alertmanager Route:** Determines *where* an alert goes based on labels (e.g., Slack vs. PagerDuty).
*   **Grouping:** Bundling similar alerts into one notification.
*   **Inhibition:** Suppressing an alert because a more severe, related alert is already firing.
*   **Silence:** Temporarily muting alerts manually (usually for maintenance).

---

# Knowledge Check

## Multiple Choice Questions

1. What is the primary purpose of the `for: 5m` clause in a Prometheus alerting rule?
   * A) It defines how often Prometheus evaluates the rule.
   * B) It dictates how long an alert stays in Alertmanager before expiring.
   * C) It requires the condition to be true continuously for 5 minutes before the alert transitions to a Firing state, preventing noise from transient spikes.
   * D) It sets a 5-minute timeout for the webhook receiver to respond.

2. You want to ensure that if a "Database Unreachable" alert fires, you do not receive the 50 "API Timeout" alerts that happen as a direct result. Which Alertmanager feature handles this?
   * A) Grouping
   * B) Inhibition
   * C) Silencing
   * D) Deduplication

## Scenario Questions

Your team is suffering from alert fatigue. They receive 20 pages a night, most of which require no action and resolve themselves within 2 minutes. Outline three specific configuration changes you would make to Prometheus/Alertmanager to fix this culture.

## Short Answer Questions

What is the difference between a "Cause-based" alert and a "Symptom-based" alert? Which is preferred?

<details>
<summary><b>View Answers</b></summary>

### Multiple Choice
1. **[C]** - *The `for` duration is crucial for smoothing out micro-blips. If a CPU spikes for 10 seconds and recovers, the condition isn't met for the full 5 minutes, so no alert fires.*
2. **[B]** - *Inhibition rules allow you to define logic like: "If an alert with severity=critical and component=database is firing, suppress any alerts with severity=warning and dependency=database."*

### Scenario
*1) **Increase the `for` duration:** Change the rules from `for: 1m` to `for: 5m` to let self-resolving transient issues clear naturally without paging. 2) **Change Routing:** Move alerts that are non-critical (no user impact) out of the PagerDuty route and into a Slack/Jira route for business-hours review. 3) **Implement Grouping:** Configure Alertmanager `group_by` to batch related alerts so that an infrastructure event generates 1 summary page instead of 20 individual pages.*

### Short Answer
*A cause-based alert triggers on internal resource states (e.g., CPU utilization is high, memory is low). A symptom-based alert triggers on user-facing pain (e.g., API latency is > 2 seconds, 500 error rate is elevated). Symptom-based alerting is highly preferred because systems can often run safely at high utilization without degrading the user experience.*

</details>

---

# Interview Preparation

## Beginner Questions

* What is the difference between Prometheus and Alertmanager?
* What is alert fatigue?

## Intermediate Questions

* Explain how grouping works in Alertmanager and why it is important.
* If you have a highly available setup with two Prometheus servers evaluating the same rules and sending them to Alertmanager, why doesn't the user receive duplicate notifications?

## Advanced Questions

* Explain the concept of Symptom-Based Alerting (or Service Level Objective based alerting). How does it differ from traditional infrastructure alerting?
* Write a Prometheus alerting rule that triggers if a specific API endpoint's error rate exceeds 1% over a 10-minute window, but ensure it doesn't trigger during periods of extremely low traffic (e.g., 2 requests per hour) where 1 failure would artificially spike the percentage.

## Scenario-Based Discussions

* You join a new company and find the on-call engineers are burnt out. They get paged 15 times a night for "High CPU" and "Disk 80% Full", but they usually just acknowledge the page and go back to sleep because it's "normal." How do you architecturally and culturally fix this observability pipeline?

<details>
<summary><b>View Answers</b></summary>

### Beginner
* **What is the difference...:** Prometheus evaluates metrics data against thresholds (rules) and decides if an alert is firing. Alertmanager receives those firing alerts, groups them, deduplicates them, and routes them to humans via Slack or PagerDuty.
* **What is alert fatigue...:** A state of exhaustion and desensitization experienced by engineers when they are bombarded with too many false-positive or non-actionable alerts, leading them to ignore critical warnings.

### Intermediate
* **Explain how grouping works...:** Grouping batches multiple alerts with similar labels into a single notification. For example, if 100 instances of a service crash, grouping by `service_name` ensures the on-call engineer receives one page saying "100 instances of Service A are down," rather than 100 individual pages.
* **If you have a highly available setup...:** Alertmanager handles deduplication. When it receives multiple alerts with the identical set of labels from different Prometheus instances, it recognizes them as the same event and only forwards one notification through its routing tree.

### Advanced
* **Explain the concept of Symptom-Based Alerting...:** It means alerting on the pain the user is feeling (e.g., high latency, failed checkouts) rather than the technical reason (e.g., high CPU, database lock). Infrastructure alerts (causes) should generally just be warnings on a dashboard; pages should be reserved for symptoms that break SLAs.
* **Write a Prometheus alerting rule...:** You must include a minimum traffic threshold in the query.
  `expr: (sum(rate(http_requests_total{status=~"5.."}[10m])) / sum(rate(http_requests_total[10m])) > 0.01) and (sum(rate(http_requests_total[10m])) > 10)`
  This ensures the error rate is > 1% AND there are at least 10 requests per second happening.

### Scenario-Based Discussions
* **You join a new company and find the on-call engineers are burnt out...:** Culturally, I would establish a strict rule: "Every page must be actionable and have a playbook." Architecturally, I would audit the Alertmanager routing tree. I would downgrade all "High CPU" and "Disk 80%" alerts to route to a Slack channel for daytime review (creating tickets), effectively removing them from PagerDuty. I would then work with teams to define symptom-based RED metrics (Rate, Errors, Duration) and set up pages ONLY for SLA breaches on those metrics. Finally, I would implement robust `group_by` and inhibition rules in Alertmanager to compress major outages into single notifications.

</details>

---

# Further Reading

1. [Prometheus Alerting Rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)
2. [Alertmanager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)
3. [Google SRE Book - Practical Alerting](https://sre.google/sre-book/practical-alerting/)
4. [Rob Ewaschuk's Philosophy on Alerting](https://docs.google.com/document/d/199PqyG3UsyXlwieHaqbGiWVa8eMWi8zzAn0YfcApr8Q/edit)
