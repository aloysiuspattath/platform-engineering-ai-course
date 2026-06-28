# Observability, Prometheus Monitoring & Grafana Dashboards

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-OBS-01`
* **Associated Lesson:** Module 12 (`MOD-OBS`: Observability with Prometheus, Grafana, OpenTelemetry & AlertManager)
* **Objective:** Author a declarative Prometheus ServiceMonitor manifest, create a Grafana dashboard JSON schema with template variables, architect an OpenTelemetry Collector configuration with Tail-Based Sampling, and configure AlertManager grouping and inhibition rules.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of Module 10 (`MOD-K8S`: Kubernetes Engineering) and Module 11 (`MOD-CICD`: CI/CD Pipelines & Automation).
* Foundational understanding of YAML syntax, Linux bash execution, HTTP endpoints, and PromQL vector mathematics.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise observability, monitoring, tracing, and alerting manifests.

```bash
# Create the parent directory for the observability lab manifests
mkdir -p ~/enterprise-observability-lab/monitoring
mkdir -p ~/enterprise-observability-lab/dashboards
mkdir -p ~/enterprise-observability-lab/tracing
mkdir -p ~/enterprise-observability-lab/alerting
cd ~/enterprise-observability-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Prometheus ServiceMonitor with Cardinality Defense

In this step, you will author a declarative Prometheus Operator ServiceMonitor manifest (`monitoring/payment-servicemonitor.yaml`) that dynamically discovers Kubernetes Service endpoints and implements absolute cardinality defense (`action: labeldrop`) to protect Prometheus against Out-Of-Memory (OOM) server crashes.

```bash
cat << 'EOF' > monitoring/payment-servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: production-payment-api-monitor
  namespace: production
  labels:
    release: prometheus-stack # Mandatory label matching Prometheus Operator selector!
spec:
  selector:
    matchLabels:
      app: payment-api # Target Kubernetes Service Label Selector!
  endpoints:
  - port: metrics # Target Service Port Name
    interval: 15s # Execute HTTP GET scrape every 15 seconds
    path: /metrics
    scheme: http
    scrapeTimeout: 10s
    metricRelabelings:
    # Protect against Cardinality Explosions by dropping dynamic user_id labels at scrape time!
    - action: labeldrop
      regex: user_id|client_ip|session_id|transaction_id
EOF
```

## Step 2: Creating a Declarative Grafana Dashboard JSON Schema with Template Variables

In this step, you will author a declarative Grafana dashboard JSON schema (`dashboards/master-dashboard.json`) that utilizes dynamic template variables (`$cluster`, `$service`) to scale across thousands of microservices and implements the RED Method (Rate, Errors, Duration) visual hierarchy.

```bash
cat << 'EOF' > dashboards/master-dashboard.json
{
  "title": "Master RED Method Microservice Dashboard",
  "timezone": "browser",
  "refresh": "10s",
  "schemaVersion": 38,
  "templating": {
    "list": [
      {
        "name": "cluster",
        "type": "query",
        "datasource": "Prometheus",
        "query": "label_values(up, cluster)",
        "refresh": 1
      },
      {
        "name": "service",
        "type": "query",
        "datasource": "Prometheus",
        "query": "label_values(up{cluster=\"$cluster\"}, service)",
        "refresh": 1
      }
    ]
  },
  "panels": [
    {
      "title": "Active Microservice Errors (Hero Row)",
      "type": "stat",
      "gridPos": { "h": 4, "w": 24, "x": 0, "y": 0 },
      "targets": [
        {
          "datasource": "Prometheus",
          "expr": "sum(rate(http_requests_total{cluster=\"$cluster\", service=\"$service\", status=~\"5.*\"}[5m]))"
        }
      ]
    },
    {
      "title": "P99 Request Duration (RED Method: Duration)",
      "type": "timeseries",
      "gridPos": { "h": 8, "w": 12, "x": 0, "y": 4 },
      "targets": [
        {
          "datasource": "Prometheus",
          "expr": "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{cluster=\"$cluster\", service=\"$service\"}[5m])) by (le))",
          "legendFormat": "{{service}} - P99 Latency"
        }
      ]
    }
  ]
}
EOF
```

## Step 3: Architecting an OpenTelemetry Collector Configuration with Tail-Based Sampling

In this step, you will author a declarative OpenTelemetry Collector configuration manifest (`tracing/otel-collector-config.yaml`) that defines OTLP receivers, protects active RAM using `memory_limiter`, and implements advanced `tail_sampling` to drop 95% of healthy traces while preserving 100% of error traces.

```bash
cat << 'EOF' > tracing/otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317 # Master OTLP gRPC ingestion port
      http:
        endpoint: 0.0.0.0:4318 # Master OTLP HTTP ingestion port

processors:
  # Memory limiter processor protects the Collector against Out-Of-Memory (OOM) crashes!
  memory_limiter:
    check_interval: 1s
    limit_percentage: 80
    spike_limit_percentage: 20

  # Advanced Tail-Based Sampling processor slashes storage billing while keeping 100% of errors!
  tail_sampling:
    decision_wait: 30s # Buffer trace spans in active RAM for 30 seconds to evaluate outcome
    num_traces: 50000
    expected_new_traces_per_sec: 2000
    policies:
      # Policy 1: Preserve 100% of trace spans containing errors!
      - name: preserve-errors
        type: status_code
        status_code: {status_codes: [ERROR]}
      # Policy 2: Preserve 100% of trace spans where latency exceeds 2 seconds (2000ms)!
      - name: preserve-latency-bottlenecks
        type: latency
        latency: {threshold_ms: 2000}
      # Policy 3: Probabilistically sample exactly 5% of perfectly healthy, fast traces!
      - name: sample-healthy-traces
        type: probabilistic
        probabilistic: {sampling_percentage: 5.0}

  # Batch processor batches telemetry packets before exporting to optimize network throughput
  batch:
    send_batch_size: 8192
    timeout: 5s

exporters:
  # Multi-Destination OTLP Routing: Zero Vendor Lock-In!
  otlp/tempo:
    endpoint: http://tempo-prod.monitoring.svc.cluster.local:4317
    tls: {insecure: true}
  otlp/prometheus:
    endpoint: http://prometheus-k8s.monitoring.svc.cluster.local:9090/api/v1/otlp
    tls: {insecure: true}
  otlp/loki:
    endpoint: http://loki-prod.monitoring.svc.cluster.local:3100/otlp
    tls: {insecure: true}

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, tail_sampling, batch]
      exporters: [otlp/tempo]
EOF
```

## Step 4: Configuring AlertManager Grouping, Inhibition Rules, and Routing Trees

In this step, you will author a declarative AlertManager configuration manifest (`alerting/alertmanager.yml`) that collapses duplicate alert storms into clean groups (`group_by`), implements inhibition rules (`inhibit_rules`) to suppress pod warnings during physical node crashes, and routes critical alerts to PagerDuty.

```bash
cat << 'EOF' > alerting/alertmanager.yml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/T000/B000/XXXXXX'

# Define the master routing tree! Matches alert labels to specific engineering teams!
route:
  group_by: ['cluster', 'alertname'] # Collapse related alerts into a single clean group!
  group_wait: 30s # Pause for 30s to allow related alerts to arrive before firing the pager
  group_interval: 5m # Wait 5m before sending an updated notification for the same group
  repeat_interval: 12h # Wait 12h before repeating a notification for an unresolved alert
  receiver: 'default-cluster-admins' # Default fallback receiver
  routes:
    # Route 1: High-priority critical alerts for Payment microservice -> PagerDuty!
    - matchers:
        - service = "payment-api"
        - severity = "critical"
      receiver: 'payment-team-pagerduty'
      continue: false # Stop evaluating routing tree; match is absolute!
    # Route 2: Low-priority warning alerts -> Peaceful Slack message (No PagerDuty!)
    - matchers:
        - severity = "warning"
      receiver: 'peaceful-slack-warnings'

# Define advanced inhibition rules! Suppress downstream warnings during fatal outages!
inhibit_rules:
  # Suppress InstanceDown pod alerts if the underlying physical NodeDown alert is actively firing!
  - source_matchers:
      - alertname = "NodeDown"
      - severity = "critical"
    target_matchers:
      - alertname = "InstanceDown"
    equal: ['node', 'cluster'] # Labels that MUST match between source and target alerts!

# Define secure external notification receivers!
receivers:
- name: 'default-cluster-admins'
  slack_configs:
  - channel: '#k8s-admins'
    send_resolved: true

- name: 'payment-team-pagerduty'
  pagerduty_configs:
  - service_key: 'pd-live-key-payment-team-12345'
    send_resolved: true
    description: '[{{ .Status | toUpper }}] {{ .GroupLabels.alertname }} in {{ .GroupLabels.cluster }}'

- name: 'peaceful-slack-warnings'
  slack_configs:
  - channel: '#k8s-warnings'
    send_resolved: false
EOF
```

---

# Verification

To verify that your enterprise observability, monitoring, tracing, and alerting lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify cardinality defense, dynamic PromQL variables, Tail-Based Sampling, and AlertManager inhibition rules.

```bash
# 1. Verify cardinality defense in the ServiceMonitor manifest
cat monitoring/payment-servicemonitor.yaml | grep -E "action.*labeldrop"

# 2. Verify dynamic PromQL variables in the Grafana dashboard schema
cat dashboards/master-dashboard.json | grep -E "service=\\\"\\\$service\\\""

# 3. Verify Tail-Based Sampling processor in the OpenTelemetry Collector configuration
cat tracing/otel-collector-config.yaml | grep -E "tail_sampling:"

# 4. Verify AlertManager grouping mechanics in the alerting configuration
cat alerting/alertmanager.yml | grep -E "group_by:.*cluster.*alertname"

# 5. Verify AlertManager inhibition rules in the alerting configuration
cat alerting/alertmanager.yml | grep -E "inhibit_rules:"
```

**Expected Output:**
```text
    - action: labeldrop
          "expr": "sum(rate(http_requests_total{cluster=\"$cluster\", service=\"$service\", status=~\"5.*\"}[5m]))"
          "expr": "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{cluster=\"$cluster\", service=\"$service\"}[5m])) by (le))",
  tail_sampling:
  group_by: ['cluster', 'alertname'] # Collapse related alerts into a single clean group!
inhibit_rules:
```

---

# Troubleshooting

* **Symptom:** `cat monitoring/payment-servicemonitor.yaml | grep -E "action.*labeldrop"` returns no output.
  * **Cause:** You completely omitted the `metricRelabelings:` block in your ServiceMonitor YAML file.
  * **Solution:** Add `metricRelabelings: - action: labeldrop` to your manifest to ensure Prometheus scrubs dynamic labels during scraping.

* **Symptom:** `cat tracing/otel-collector-config.yaml | grep -E "tail_sampling:"` returns no output.
  * **Cause:** You authored a basic OTel Collector configuration without the Tail-Based Sampling processor block.
  * **Solution:** Ensure your `processors:` block contains `tail_sampling: ...` and your `service.pipelines.traces` array lists `tail_sampling`.

* **Symptom:** `cat alerting/alertmanager.yml | grep -E "group_by:.*cluster"` returns no output.
  * **Cause:** You omitted the `group_by:` configuration under the master `route:` block.
  * **Solution:** Add `group_by: ['cluster', 'alertname']` to your AlertManager manifest to enable alert deduplication.

---

# Cleanup

Safely remove the enterprise observability lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise observability lab directory
rm -rf ~/enterprise-observability-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-observability-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
