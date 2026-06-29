# Internal Developer Platform (IDP), Software Templates & Policy-as-Code

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-IDP-01`
* **Associated Lesson:** Module 16 (`MOD-IDP`: Internal Developer Platform & AI Templates)
* **Objective:** Author a declarative Backstage catalog Component manifest (`kind: Component`) with explicit ownership (`owner: group:ai-platform`), create a declarative Backstage Software Template (`kind: Template`) with `fetch:template` and `publish:github` actions, architect an ArgoCD ApplicationSet (`kind: ApplicationSet`) with `matrix` generators and `selfHeal: true`, author a Kyverno ClusterPolicy (`kind: ClusterPolicy`) with `validationFailureAction: Enforce`, and author a Backstage Ops Scorecard (`kind: Scorecard`) with `has-techdocs` checks.
* **Estimated Time:** 45 minutes
* **Difficulty:** Advanced

---

# Prerequisites

* Completion of Module 15 (`MOD-MLOPS`: MLOps Training & Model Serving Engines) and Module 11 (`MOD-CICD`: Enterprise CI/CD Pipelines & GitOps).
* Foundational understanding of YAML Custom Resources, Backstage C4 entity modeling, Nunjucks templating, and admission webhook mechanics.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise Backstage Software Catalog manifests, Software Templates, ArgoCD ApplicationSets, Kyverno Policy-as-Code guardrails, and Ops Scorecards.

```bash
# Create the parent directory for the Internal Developer Platform lab manifests
mkdir -p ~/enterprise-idp-lab/catalog
mkdir -p ~/enterprise-idp-lab/templates/skeleton
mkdir -p ~/enterprise-idp-lab/gitops
mkdir -p ~/enterprise-idp-lab/governance
mkdir -p ~/enterprise-idp-lab/scorecards
cd ~/enterprise-idp-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Backstage Catalog Manifest (`kind: Component`)

In this step, you will author a declarative Backstage catalog manifest (`catalog/vllm-catalog-info.yaml`) that defines an AI serving Component (`kind: Component`) with explicit entity ownership (`owner: group:ai-platform`), TechDocs annotations (`backstage.io/techdocs-ref: dir:.`), and C4 dependency mapping (`dependsOn: - resource:s3-model-registry`).

```bash
cat << 'EOF' > catalog/vllm-catalog-info.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: vllm-inference-engine
  description: High-throughput vLLM serving engine powering enterprise fraud detection chatbots.
  labels:
    tier: ai-inference
  annotations:
    # TechDocs Governance: Render beautiful Markdown documentation directly from Git!
    backstage.io/techdocs-ref: dir:.
    github.com/project-slug: enterprise-org/vllm-inference-engine
spec:
  type: service
  lifecycle: production
  # Master Ownership Governance: Explicitly assign entity ownership to an enterprise group!
  # (Eliminates orphan microservices and ensures Incident Commanders page correct teams!)
  owner: group:ai-platform
  system: fraud-detection-system
  # C4 Model Dependency Mapping: Declare exact API and Resource dependencies!
  providesApis:
    - vllm-openapi-spec
  dependsOn:
    - resource:s3-model-registry-bucket
EOF
```

## Step 2: Creating a Declarative Backstage Software Template (`kind: Template`)

In this step, you will author a declarative Backstage Software Template manifest (`templates/vllm-scaffolder-template.yaml`) that defines a dynamic web form (`spec.parameters`) and sequential scaffolding action steps (`fetch:template`, `publish:github`, `catalog:register`) to scaffold AI workloads in 3 minutes.

```bash
cat << 'EOF' > templates/vllm-scaffolder-template.yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: vllm-serving-template
  title: Deploy High-Throughput vLLM Serving Engine (Golden Path)
  description: Scaffolds a production-grade AI serving project with vLLM, S3 init containers, and KEDA autoscaling.
  tags:
    - ai
    - vllm
    - golden-path
spec:
  owner: group:ai-platform
  type: service
  # ==============================================================================
  # PARAMETERS: JSONSchema definitions rendering a beautiful Backstage Web Form!
  # ==============================================================================
  parameters:
    - title: AI Model Identification
      required:
        - model_name
        - owner
      properties:
        model_name:
          title: Model Name
          type: string
          description: Unique identifier for your AI model (e.g., llama3-70b-fraud).
        owner:
          title: Entity Owner
          type: string
          description: Enterprise engineering group responsible for this service.
          ui:field: OwnerPicker

  # ==============================================================================
  # STEPS: Sequential scaffolding actions executed by Backstage Scaffolder pipeline!
  # ==============================================================================
  steps:
    # STEP 1: Fetch skeleton blueprint directory and inject Nunjucks parameters!
    - id: fetch-base
      name: Fetching AI Blueprint Skeleton
      action: fetch:template
      input:
        url: ./skeleton
        values:
          model_name: ${{ parameters.model_name }}
          owner: ${{ parameters.owner }}

    # STEP 2: Publish rendered workspace directory to Enterprise GitHub!
    - id: publish-github
      name: Publishing to Enterprise GitHub
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: Production AI serving engine for ${{ parameters.model_name }}.
        repoUrl: github.com?owner=enterprise-org&repo=${{ parameters.model_name }}-service

    # STEP 3: Register brand-new catalog-info.yaml to Backstage Software Catalog!
    - id: register-catalog
      name: Registering to Backstage Catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps['publish-github'].output.repoContentsUrl }}
        catalogInfoPath: '/catalog-info.yaml'
EOF
```

## Step 3: Architecting an ArgoCD ApplicationSet with Matrix Generators (`kind: ApplicationSet`)

In this step, you will author a declarative ArgoCD ApplicationSet manifest (`gitops/master-appset.yaml`) that enforces a dynamic Matrix generator (`matrix`, `git.directories` × `clusters`) and automated self-healing sync policies (`automated: prune: true`, `selfHeal: true`) to entirely eliminate manifest sprawl.

```bash
cat << 'EOF' > gitops/master-appset.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: master-multi-cluster-ai-deployer
  namespace: argocd
  labels:
    tier: gitops-delivery
spec:
  # ==============================================================================
  # GENERATORS: Matrix Generator combining Git Directories and Cluster Selectors!
  # ==============================================================================
  generators:
    - matrix:
        generators:
          # 1. Git Directory Generator: Discover new Backstage scaffolded repositories!
          - git:
              repoURL: https://github.com/enterprise-org/master-gitops-workloads.git
              revision: HEAD
              directories:
                - path: apps/*
          # 2. Cluster Generator: Target all production Kubernetes clusters!
          - clusters:
              selector:
                matchLabels:
                  tier: production

  # ==============================================================================
  # TEMPLATE: Master blueprint generating standard ArgoCD Application objects!
  # ==============================================================================
  template:
    metadata:
      name: '{{path.basename}}-{{name}}'
      labels:
        application: '{{path.basename}}'
        cluster: '{{name}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/enterprise-org/master-gitops-workloads.git
        targetRevision: HEAD
        path: '{{path}}'
      destination:
        server: '{{server}}'
        namespace: production
      # Master Sync Governance: Enforce automated pruning and self-healing GitOps!
      # (Eliminates configuration drift and instantly overwrites manual kubectl edits!)
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
EOF
```

## Step 4: Authoring a Kyverno Policy-as-Code Manifest (`kind: ClusterPolicy`)

In this step, you will author a declarative Kyverno ClusterPolicy manifest (`governance/enterprise-cluster-policy.yaml`) that enforces `validationFailureAction: Enforce` to instantly block non-compliant, privileged containers and returns pristine developer feedback (`validate: message`).

```bash
cat << 'EOF' > governance/enterprise-cluster-policy.yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: master-enterprise-security-guardrails
spec:
  # Master Admission Governance: Set validationFailureAction to Enforce!
  # (Instantly blocks non-compliant workloads from entering etcd!)
  validationFailureAction: Enforce
  background: true
  rules:
    - name: block-privileged-containers
      match:
        any:
        - resources:
            kinds:
              - Pod # Intercept all incoming Pod creation API requests!
      validate:
        # Master Developer Feedback: Define an explicit, highly instructional failure message!
        # (Displayed beautifully in ArgoCD UI so developers can fix issues without support tickets!)
        message: >-
          FATAL GOVERNANCE ALARM: Privileged containers are strictly prohibited by Enterprise Security Policy.
          Executing privileged containers creates severe container breakout and root compromise risks.
          You must update your manifest to set securityContext.privileged: false.
        pattern:
          spec:
            containers:
              - =(securityContext):
                  =(privileged): "false" # Match pattern: privileged MUST be false or absent!
EOF
```

## Step 5: Authoring a Backstage Ops Scorecard (`kind: Scorecard`)

In this step, you will author a declarative Backstage Scorecard manifest (`scorecards/master-ops-scorecard.yaml`) that defines objective, programmatic checks (`has-owner`, `has-techdocs`) and gamified maturity levels (`Gold`, `Silver`, `Bronze`) to expose and remediate technical debt.

```bash
cat << 'EOF' > scorecards/master-ops-scorecard.yaml
apiVersion: soundcheck.backstage.io/v1alpha1
kind: Scorecard
metadata:
  name: master-enterprise-quality-scorecard
  title: Master Enterprise Quality & AI Governance Scorecard
spec:
  # ==============================================================================
  # CHECKS: Objective, programmatic check definitions eliminating spreadsheet compliance!
  # ==============================================================================
  checks:
    # CHECK 1: Verify catalog-info.yaml defines explicit entity ownership!
    - id: has-owner
      name: Explicit Entity Ownership
      rule:
        type: catalog
        path: spec.owner
        operator: isNotEmpty

    # CHECK 2: Verify TechDocs annotations are correctly defined!
    - id: has-techdocs
      name: TechDocs Markdown Documentation
      rule:
        type: catalog
        path: metadata.annotations['backstage.io/techdocs-ref']
        operator: isNotEmpty

  # ==============================================================================
  # LEVELS: Gamified maturity ratings incentivizing proactive technical debt remediation!
  # ==============================================================================
  levels:
    - name: 🥇 GOLD
      description: Elite engineering craftsmanship. 100% compliant with master platform standards.
      requiredChecks:
        - has-owner
        - has-techdocs
    - name: 🥉 BRONZE
      description: Severe technical debt discovered. High production outage and orphan microservice risk.
      requiredChecks:
        - has-owner
EOF
```

---

# Verification

To verify that your enterprise Internal Developer Platform, Software Templates, ApplicationSets, Kyverno guardrails, and Scorecards lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify explicit ownership, scaffolding actions, matrix generators, Enforce policies, and scorecard check operators.

```bash
# 1. Verify explicit ownership in the Backstage Component catalog manifest
cat catalog/vllm-catalog-info.yaml | grep -E "owner:.*group:ai-platform"

# 2. Verify catalog:register action step in the Backstage Software Template manifest
cat templates/vllm-scaffolder-template.yaml | grep -E "action:.*catalog:register"

# 3. Verify Matrix generator block in the ArgoCD ApplicationSet manifest
cat gitops/master-appset.yaml | grep -E "matrix:.*" -A 1

# 4. Verify selfHeal sync policy in the ArgoCD ApplicationSet manifest
cat gitops/master-appset.yaml | grep -E "selfHeal:.*true"

# 5. Verify Enforce validation failure action in the Kyverno ClusterPolicy manifest
cat governance/enterprise-cluster-policy.yaml | grep -E "validationFailureAction:.*Enforce"

# 6. Verify isNotEmpty rule operator in the Backstage Ops Scorecard manifest
cat scorecards/master-ops-scorecard.yaml | grep -E "operator:.*isNotEmpty" -m 1
```

**Expected Output:**
```text
  owner: group:ai-platform
      action: catalog:register
    - matrix:
        generators:
          selfHeal: true
  validationFailureAction: Enforce
        operator: isNotEmpty
```

---

# Troubleshooting

* **Symptom:** `cat catalog/vllm-catalog-info.yaml | grep -E "owner:.*group:ai-platform"` returns no output.
  * **Cause:** You authored a Backstage catalog manifest without the `spec.owner` field or left it empty.
  * **Solution:** Update your manifest to set `owner: group:ai-platform` to entirely eliminate orphan microservices.

* **Symptom:** `cat templates/vllm-scaffolder-template.yaml | grep -E "action:.*catalog:register"` returns no output.
  * **Cause:** You authored a Software Template that creates a GitHub repository (`publish:github`) but omits `catalog:register`.
  * **Solution:** Add `action: catalog:register` to ensure Backstage automatically ingests scaffolded repositories into the Software Catalog.

* **Symptom:** `cat gitops/master-appset.yaml | grep -E "selfHeal:.*true"` returns no output.
  * **Cause:** You authored an ApplicationSet with automated pruning but omitted `selfHeal: true`.
  * **Solution:** Add `selfHeal: true` to ensure ArgoCD instantly detects manual `kubectl edit` changes in production and overwrites them with Git state.

* **Symptom:** `cat governance/enterprise-cluster-policy.yaml | grep -E "validationFailureAction:.*Enforce"` returns no output.
  * **Cause:** You authored a Kyverno ClusterPolicy configured with `validationFailureAction: Audit`.
  * **Solution:** Update your manifest to set `validationFailureAction: Enforce` to instantly block non-compliant, privileged pods from entering etcd.

---

# Cleanup

Safely remove the enterprise IDP lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise IDP lab directory
rm -rf ~/enterprise-idp-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-idp-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
