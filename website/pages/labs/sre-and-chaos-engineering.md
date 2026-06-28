# SRE Governance, Error Budgets & Chaos Engineering

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-SRE-01`
* **Associated Lesson:** Module 13 (`MOD-SRE`: Site Reliability Engineering)
* **Objective:** Author a declarative Sloth SLO manifest, create a Multi-Window Multi-Burn-Rate Prometheus alert rule manifest, author a Blameless Postmortem markdown report with 5 Whys, and architect a ChaosMesh NetworkChaos fault injection manifest with blast radius containment.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of Module 12 (`MOD-OBS`: Observability & Reliability) and Module 11 (`MOD-CICD`: CI/CD Pipelines & Automation).
* Foundational understanding of YAML Custom Resources, PromQL burn rate mathematics, and basic bash execution.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise SRE governance manifests, error budget alerts, postmortem reports, and chaos engineering experiments.

```bash
# Create the parent directory for the SRE and chaos engineering lab manifests
mkdir -p ~/enterprise-sre-lab/slo
mkdir -p ~/enterprise-sre-lab/alerting
mkdir -p ~/enterprise-sre-lab/postmortems
mkdir -p ~/enterprise-sre-lab/chaos
cd ~/enterprise-sre-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Sloth SLO Manifest with SLA Buffers

In this step, you will author a declarative Sloth SLO operator manifest (`slo/payment-api-slo.yaml`) that defines an internal availability Service Level Objective (`objective: 99.9`) above an external SLA contract (`99.5%`), establishing a pristine engineering buffer.

```bash
cat << 'EOF' > slo/payment-api-slo.yaml
apiVersion: sloth.slok.dev/v1
kind: PrometheusServiceLevel
metadata:
  name: production-payment-api-slo
  namespace: production
spec:
  service: "payment-api"
  labels:
    environment: "production"
    team: "billing-engineering"
  slos:
    # SLO Definition: Target 99.9% availability over a rolling 30-day time window!
    # (Establishes a pristine engineering buffer above our 99.5% external SLA contract!)
    - name: "payment-api-availability"
      objective: 99.9
      description: "Payment microservice must successfully process 99.9% of incoming requests."
      sli:
        events:
          # Canonical SLI Equation: good_events / total_events * 100
          errorQuery: sum(rate(http_requests_total{service="payment-api",status=~"5.*"}[5m]))
          totalQuery: sum(rate(http_requests_total{service="payment-api"}[5m]))
      alerting:
        name: PaymentApiAvailabilityHighErrorBudgetBurn
        labels:
          severity: critical
          tier: tier-1
        annotations:
          summary: "High Error Budget burn rate detected on Payment API availability SLO"
          runbook_url: "https://wiki.mycompany.com/runbooks/payment-slo-burn"
EOF
```

## Step 2: Creating a Multi-Window Multi-Burn-Rate Alerting Manifest

In this step, you will author a declarative Prometheus alert rule manifest (`alerting/burn-rate-alerts.yaml`) that pairs long (`1h`, `6h`) and short (`5m`, `30m`) PromQL time windows to eliminate alert flakiness and routes mild burn rates to Slack while pushing critical burn rates to PagerDuty.

```bash
cat << 'EOF' > alerting/burn-rate-alerts.yaml
groups:
- name: sloth-slo-alert-rules.payment-api-availability
  rules:
  # ==============================================================================
  # ALERT 1: CRITICAL BURN RATE (> 36) -> PAGERDUTY PHONE CALL INSTANTLY!
  # (Burns 10% of the monthly Error Budget in exactly 2 hours!)
  # ==============================================================================
  - alert: PaymentApiAvailabilityHighErrorBudgetBurn
    # Multi-Window Math: Require BOTH short window (5m) AND long window (1h) to exceed threshold!
    expr: >-
      (
        sum(rate(http_requests_total{service="payment-api",status=~"5.*"}[1h]))
        /
        sum(rate(http_requests_total{service="payment-api"}[1h]))
        > (36 * 0.001) # Long window check (Burn Rate 36 * Error Budget 0.001)
      )
      and
      (
        sum(rate(http_requests_total{service="payment-api",status=~"5.*"}[5m]))
        /
        sum(rate(http_requests_total{service="payment-api"}[5m]))
        > (36 * 0.001) # Short window check (Eliminates flakiness & ensures rapid resolution!)
      )
    labels:
      severity: critical # Master routing label! Triggers PagerDuty phone call!
      tier: tier-1
    annotations:
      summary: "Critical Error Budget burn rate (> 36) detected on Payment API availability SLO"
      description: "Payment microservice is burning its 99.9% SLO error budget at a rate that will exhaust 10% of the monthly budget in 2 hours."
      runbook_url: "https://wiki.mycompany.com/runbooks/payment-slo-burn-critical"

  # ==============================================================================
  # ALERT 2: MILD BURN RATE (> 2) -> PEACEFUL SLACK WARNING (NO PAGERDUTY!)
  # (Burns 10% of the monthly Error Budget in exactly 3 days!)
  # ==============================================================================
  - alert: PaymentApiAvailabilityMildErrorBudgetBurn
    expr: >-
      (
        sum(rate(http_requests_total{service="payment-api",status=~"5.*"}[6h]))
        /
        sum(rate(http_requests_total{service="payment-api"}[6h]))
        > (2 * 0.001)
      )
      and
      (
        sum(rate(http_requests_total{service="payment-api",status=~"5.*"}[30m]))
        /
        sum(rate(http_requests_total{service="payment-api"}[30m]))
        > (2 * 0.001)
      )
    labels:
      severity: warning # Skips PagerDuty! Sends peaceful Slack message!
    annotations:
      summary: "Mild Error Budget burn rate (> 2) detected on Payment API availability SLO"
      runbook_url: "https://wiki.mycompany.com/runbooks/payment-slo-burn-warning"
EOF
```

## Step 3: Authoring a Blameless Postmortem Report with 5 Whys

In this step, you will author a declarative Blameless Postmortem markdown report (`postmortems/incident-2026-06-28.md`) that embeds the foundational assumption of good intentions, executes the 5 Whys to bypass human error, and establishes automated CI/CD action items.

```bash
cat << 'EOF' > postmortems/incident-2026-06-28.md
# Blameless Postmortem: Payment API Connection Pool Exhaustion (2026-06-28)

**Status:** Completed
**Incident Commander:** Jane Doe (Lead SRE)
**Tech Lead:** John Smith (Lead Database Engineer)

## Foundational Assumption
> "We assume that every engineer operated with good intentions based on the information, experience, and tooling they possessed at the time. This postmortem is strictly blameless; our focus is entirely on identifying systemic tooling flaws and building automated guardrails."

## Incident Summary
On 2026-06-28 at 14:30 UTC, the Payment API experienced a severe database connection pool exhaustion, causing an elevated HTTP 500 error rate (Golden Signal: Errors) for 14 minutes. The incident was successfully mitigated by dynamically scaling the database connection pool allocation via Kubernetes ConfigMaps.

## Root Cause Analysis (5 Whys)
1. **Why did the Payment API throw HTTP 500 errors?** Because incoming HTTP requests timed out waiting for an available database connection.
2. **Why did requests time out waiting for connections?** Because the active database connection pool was entirely exhausted.
3. **Why was the connection pool exhausted?** Because a newly deployed microservice feature opened persistent database connections without closing them after transaction completion.
4. **Why did the new feature fail to close connections?** Because the developer utilized a legacy database ORM library that lacked automated connection pooling cleanup.
5. **Why was the developer able to deploy code using a legacy ORM library?** Because our master CI/CD deployment pipeline lacked an automated dependency scanning quality gate to block deprecated ORM packages. (SYSTEMIC ROOT CAUSE PINPOINTED!)

## Action Items (Systemic Remediation)
* `[P0]` **Automated CI/CD Quality Gate:** Implement an automated dependency scanning linting script in GitHub Actions to forcefully abort deployments if legacy ORM packages are detected. (Assigned to: CI/CD Platform Team)
* `[P1]` **Prometheus Alerting:** Implement a PromQL alert rule in `four-golden-signals.yaml` to fire a PagerDuty warning if database connection pool utilization exceeds 80%. (Assigned to: SRE Monitoring Team)
EOF
```

## Step 4: Architecting a ChaosMesh NetworkChaos Manifest with Blast Radius Containment

In this step, you will author a declarative ChaosMesh fault injection manifest (`chaos/payment-network-latency.yaml`) that simulates real-world cloud network degradation (`latency: 200ms`) and enforces strict blast radius containment by targeting exactly 50% of pods in the `staging` namespace.

```bash
cat << 'EOF' > chaos/payment-network-latency.yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: payment-api-network-latency
  namespace: staging # Blast Radius Containment: Target staging namespace first!
spec:
  action: delay # Fault Type: Inject network latency delay!
  mode: fixed-percent
  value: '50%' # Blast Radius Containment: Target exactly 50% of matching pods!
  selector:
    matchLabels:
      app: payment-api # Target Kubernetes Pod Label Selector!
  delay:
    latency: '200ms' # Inject exactly 200ms of network latency delay!
    jitter: '20ms'   # Add 20ms of jitter to simulate realistic cloud network variations
  duration: '5m'     # Automatically terminate experiment after 5 minutes!
EOF
```

---

# Verification

To verify that your enterprise SRE governance, error budget, postmortem, and chaos engineering lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify SLA buffers, Multi-Window PromQL equations, blameless language, and blast radius containment.

```bash
# 1. Verify SLA buffer objective in the Sloth SLO manifest
cat slo/payment-api-slo.yaml | grep -E "objective:.*99.9"

# 2. Verify Multi-Window burn rate PromQL math in the alerting manifest
cat alerting/burn-rate-alerts.yaml | grep -E "36.*0.001"

# 3. Verify blameless language in the postmortem report
cat postmortems/incident-2026-06-28.md | grep -E "strictly.*blameless"

# 4. Verify systemic root cause identification in the postmortem report
cat postmortems/incident-2026-06-28.md | grep -E "SYSTEMIC.*ROOT.*CAUSE"

# 5. Verify blast radius containment in the ChaosMesh manifest
cat chaos/payment-network-latency.yaml | grep -E "mode:.*fixed-percent"
```

**Expected Output:**
```text
      objective: 99.9
        > (36 * 0.001) # Long window check (Burn Rate 36 * Error Budget 0.001)
        > (36 * 0.001) # Short window check (Eliminates flakiness & ensures rapid resolution!)
> "We assume that every engineer operated with good intentions based on the information, experience, and tooling they possessed at the time. This postmortem is strictly blameless; our focus is entirely on identifying systemic tooling flaws and building automated guardrails."
5. **Why was the developer able to deploy code using a legacy ORM library?** Because our master CI/CD deployment pipeline lacked an automated dependency scanning quality gate to block deprecated ORM packages. (SYSTEMIC ROOT CAUSE PINPOINTED!)
  mode: fixed-percent
```

---

# Troubleshooting

* **Symptom:** `cat slo/payment-api-slo.yaml | grep -E "objective:.*99.9"` returns no output.
  * **Cause:** You authored a Sloth manifest without defining the `objective: 99.9` percentage under `spec.slos`.
  * **Solution:** Add `objective: 99.9` to your manifest to establish an internal engineering buffer above external SLAs.

* **Symptom:** `cat alerting/burn-rate-alerts.yaml | grep -E "36.*0.001"` returns no output.
  * **Cause:** You authored a basic alert rule without the `> (36 * 0.001)` Multi-Window burn rate equation.
  * **Solution:** Ensure your `expr:` block multiplies the target Burn Rate (`36`) by the static Error Budget threshold (`0.001`).

* **Symptom:** `cat chaos/payment-network-latency.yaml | grep -E "mode:.*fixed-percent"` returns no output.
  * **Cause:** You authored a ChaosMesh manifest configured with `mode: all`, violating blast radius containment.
  * **Solution:** Update your manifest to use `mode: fixed-percent` and `value: '50%'` to protect pod stability.

---

# Cleanup

Safely remove the enterprise SRE lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise SRE lab directory
rm -rf ~/enterprise-sre-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-sre-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
