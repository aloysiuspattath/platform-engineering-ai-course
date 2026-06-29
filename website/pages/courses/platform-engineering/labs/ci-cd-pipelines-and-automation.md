# CI/CD Pipelines, GitOps & Progressive Delivery

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-CICD-01`
* **Associated Lesson:** Module 11 (`MOD-CICD`: Continuous Integration vs. Continuous Delivery Paradigms, GitHub Actions, Container Pipelines, Progressive Delivery)
* **Objective:** Author a declarative GitHub Actions workflow with OIDC federation, create a Multi-Stage Dockerfile with BuildKit cache mounts, simulate Trivy vulnerability quality gates, and author an Argo Rollouts Canary manifest with an AnalysisTemplate.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of Module 05 (`MOD-GIT`: Version Control & GitOps) and Module 10 (`MOD-K8S`: Kubernetes Engineering).
* Foundational understanding of YAML syntax, Linux bash execution, container images, and Kubernetes Services.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your CI/CD and progressive delivery manifests.

```bash
# Create the parent directory for the CI/CD and GitOps lab manifests
mkdir -p ~/enterprise-cicd-lab/.github/workflows
mkdir -p ~/enterprise-cicd-lab/k8s-manifests
cd ~/enterprise-cicd-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative GitHub Actions Workflow with OIDC Federation

In this step, you will author a declarative GitHub Actions workflow file (`deploy.yml`) that implements absolute zero-trust cloud authentication using OpenID Connect (OIDC) identity federation (`sts:AssumeRoleWithWebIdentity`) and defines strict path filtering (`paths:`).

```bash
cat << 'EOF' > .github/workflows/deploy.yml
name: Production Microservice CI/CD

on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
      - 'Dockerfile'
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target deployment environment'
        required: true
        default: 'staging'

permissions:
  id-token: write # Mandatory permission required for OIDC JWT token generation!
  contents: read

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials via OIDC Federation
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsECRPushRole
          aws-region: us-east-1
          audience: sts.amazonaws.com

      - name: Log in to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, Tag, and Push Immutable Container Artifact
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: production-payment-api
          IMAGE_TAG: git-${{ github.sha }}
        run: |
          echo "Building immutable container image $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG..."
          # docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          # docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "SUCCESS: Immutable artifact successfully built and pushed to ECR!"
EOF
```

## Step 2: Creating a Multi-Stage Dockerfile with BuildKit Cache Mounts

In this step, you will author a highly optimized Multi-Stage Dockerfile manifest (`Dockerfile`) that leverages BuildKit cache mounts (`--mount=type=cache`) to accelerate compilation speeds and utilizes a pristine, distroless runtime stage to eliminate heavy build tools (`gcc`, `curl`).

```bash
cat << 'EOF' > Dockerfile
# ==============================================================================
# STAGE 1: BUILDER ENVIRONMENT (Heavy compilation tools & BuildKit Cache)
# ==============================================================================
FROM golang:1.22-alpine AS builder

RUN apk add --no-cache git build-base

WORKDIR /build

COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

COPY . .

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags '-extldflags "-static"' -o /build/payment-api .

# ==============================================================================
# STAGE 2: PRODUCTION RUNTIME ENVIRONMENT (Pristine & Distroless)
# ==============================================================================
FROM gcr.io/distroless/static:nonroot

WORKDIR /app

# Copy EXCLUSIVELY the compiled static application binary from Stage 1!
COPY --from=builder --chown=nonroot:nonroot /build/payment-api /app/payment-api

USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/payment-api"]
EOF
```

## Step 3: Simulating a Trivy Vulnerability Quality Gate and Cosign Image Signing

In this step, you will create and execute a simulation script (`simulate-pipeline.sh`) that verifies how Trivy container vulnerability scanning quality gates (`--exit-code 1`) and Cosign keyless cryptographic image signing (`cosign sign`) operate in an enterprise CI pipeline.

```bash
cat << 'EOF' > simulate-pipeline.sh
#!/bin/bash
set -e

echo "================================================================================"
echo "[PIPELINE STEP 1]: Executing Multi-Stage Docker Build..."
echo "================================================================================"
echo "Successfully built mycompany/payment-api:git-7b89c12 (Size: 18MB)"

echo "================================================================================"
echo "[PIPELINE STEP 2]: Executing Trivy container vulnerability quality gate..."
echo "================================================================================"
echo "trivy image --exit-code 1 --severity CRITICAL,HIGH mycompany/payment-api:git-7b89c12"
echo "2026-06-28T12:30:00.000Z INFO Vulnerability scanning..."
echo "mycompany/payment-api:git-7b89c12 (distroless static)"
echo "====================================================="
echo "Total: 0 (CRITICAL: 0, HIGH: 0)"
echo "SUCCESS: Zero vulnerabilities detected. Quality gate passed perfectly!"

echo "================================================================================"
echo "[PIPELINE STEP 3]: Executing Cosign keyless cryptographic image signing..."
echo "================================================================================"
echo "cosign sign --yes mycompany/payment-api:git-7b89c12"
echo "Generating ephemeral cryptographic key pair via Sigstore OIDC federation..."
echo "Retrieving ephemeral signing certificate from Fulcio Root CA..."
echo "Recording immutable signing transparency log entry in Rekor (Index: 987654321)..."
echo "Pushing cryptographic signature attachment to OCI registry..."
echo "SUCCESS: Container image successfully signed with keyless provenance!"
EOF

# Grant execution permissions and run the simulation script
chmod +x simulate-pipeline.sh
./simulate-pipeline.sh
```

## Step 4: Authoring an Argo Rollouts Canary Manifest and AnalysisTemplate

In this step, you will author a declarative Argo Rollouts Canary manifest (`k8s-manifests/canary-rollout.yaml`) that defines fine-grained percentage-based traffic shaping (`setWeight: 10`) and pairs it with a declarative AnalysisTemplate (`k8s-manifests/metric-analysis.yaml`) to evaluate Prometheus HTTP success rates during the rollout.

```bash
cat << 'EOF' > k8s-manifests/canary-rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: production-payment-api
  namespace: production
spec:
  replicas: 10
  strategy:
    canary:
      stableService: payment-api-stable
      canaryService: payment-api-canary
      trafficRouting:
        nginx:
          stableIngress: payment-api-ingress
      steps:
      - setWeight: 10
      - pause: { duration: 5m }
      - analysis:
          templates:
          - templateName: verify-http-success-rate
      - setWeight: 50
      - pause: { duration: 5m }
  selector:
    matchLabels:
      app: payment-api
  template:
    metadata:
      labels:
        app: payment-api
    spec:
      containers:
      - name: api
        image: mycompany/payment-api:git-7b89c12
        ports:
        - containerPort: 8080
EOF

cat << 'EOF' > k8s-manifests/metric-analysis.yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: verify-http-success-rate
  namespace: production
spec:
  metrics:
  - name: success-rate
    interval: 30s
    count: 10
    successCondition: result[0] >= 0.99
    failureLimit: 2
    provider:
      prometheus:
        address: http://prometheus-k8s.monitoring.svc.cluster.local:9090
        query: >+
          sum(rate(http_requests_total{job="payment-api-canary",status=~"2.*|3.*"}[1m]))
          /
          sum(rate(http_requests_total{job="payment-api-canary"}[1m]))
EOF
```

---

# Verification

To verify that your enterprise CI/CD and progressive delivery lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify OIDC permissions, Multi-Stage copying, Trivy exit codes, and Canary traffic shaping.

```bash
# 1. Verify OIDC permissions in the GitHub Actions workflow manifest
cat .github/workflows/deploy.yml | grep -E "id-token.*write"

# 2. Verify Multi-Stage copying in the Dockerfile manifest
cat Dockerfile | grep -E "COPY --from=builder"

# 3. Verify Trivy vulnerability exit codes in the simulation script
cat simulate-pipeline.sh | grep -E "trivy.*exit-code 1"

# 4. Verify Canary traffic weights in the Argo Rollouts manifest
cat k8s-manifests/canary-rollout.yaml | grep -E "setWeight: 10"

# 5. Verify Prometheus metric success conditions in the AnalysisTemplate manifest
cat k8s-manifests/metric-analysis.yaml | grep -E "successCondition: result.*0.99"
```

**Expected Output:**
```text
  id-token: write # Mandatory permission required for OIDC JWT token generation!
COPY --from=builder --chown=nonroot:nonroot /build/payment-api /app/payment-api
echo "trivy image --exit-code 1 --severity CRITICAL,HIGH mycompany/payment-api:git-7b89c12"
      - setWeight: 10
    successCondition: result[0] >= 0.99
```

---

# Troubleshooting

* **Symptom:** `cat .github/workflows/deploy.yml | grep -E "id-token.*write"` returns no output.
  * **Cause:** You completely omitted the `permissions:` block at the top of your workflow YAML file.
  * **Solution:** Add `permissions: id-token: write` to your workflow manifest to ensure GitHub generates an OIDC JWT token.

* **Symptom:** `cat Dockerfile | grep -E "COPY --from=builder"` returns no output.
  * **Cause:** You authored a single-stage Dockerfile or forgot to name your first stage `AS builder`.
  * **Solution:** Ensure your Dockerfile contains `FROM golang:1.22-alpine AS builder` and `COPY --from=builder ...`.

* **Symptom:** Executing `./simulate-pipeline.sh` fails with `bash: ./simulate-pipeline.sh: Permission denied`.
  * **Cause:** You completely forgot to make the shell script executable.
  * **Solution:** Execute `chmod +x simulate-pipeline.sh` to grant execution permissions.

---

# Cleanup

Safely remove the enterprise CI/CD lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise CI/CD lab directory
rm -rf ~/enterprise-cicd-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-cicd-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
