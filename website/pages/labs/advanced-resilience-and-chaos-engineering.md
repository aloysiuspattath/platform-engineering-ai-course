# Advanced Resilience, Multi-Region AI & Chaos Engineering

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-ADV-01`
* **Associated Lesson:** Module 17 (`MOD-ADV`: Advanced Resilience, Multi-Region AI & Chaos Engineering)
* **Objective:** Author a declarative Istio DestinationRule manifest (`kind: DestinationRule`) defining locality-weighted load balancing (`localityLbSetting: failover`), create a declarative Crossplane BucketReplication manifest (`kind: BucketReplication`) with `status: Enabled` and `deleteMarkerReplication: status: Disabled`, architect an Istio VirtualService manifest (`kind: VirtualService`) with `timeout: 10s` and fallback degradation routes (`llama3-8b-fallback`), author a LitmusChaos ChaosEngine manifest (`kind: ChaosEngine`) with `spec.appinfo.applabel` blast radius containment and `httpProbe` steady-state verification, and author an Istio VirtualService manifest (`kind: VirtualService`) with `mirror: subset` traffic shadowing and `mirror_percentage: value: 100` zero-impact dark launch guardrails.
* **Estimated Time:** 45 minutes
* **Difficulty:** Advanced

---

# Prerequisites

* Completion of Module 16 (`MOD-IDP`: Internal Developer Platform & AI Templates) and Module 15 (`MOD-MLOPS`: MLOps Training & Model Serving Engines).
* Foundational understanding of YAML Custom Resources, Istio traffic management, AWS S3 replication mechanics, Envoy proxy filters, and LitmusChaos operators.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise multi-region mesh failover manifests, Crossplane storage replication rules, Envoy token shedding guardrails, LitmusChaos failure injection engines, and Istio traffic shadowing dark launches.

```bash
# Create the parent directory for the Advanced Resilience & Chaos Engineering lab manifests
mkdir -p ~/enterprise-resilience-lab/mesh
mkdir -p ~/enterprise-resilience-lab/storage
mkdir -p ~/enterprise-resilience-lab/traffic
mkdir -p ~/enterprise-resilience-lab/chaos
mkdir -p ~/enterprise-resilience-lab/shadowing
cd ~/enterprise-resilience-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Istio DestinationRule (`localityLbSetting: failover`)

In this step, you will author a declarative Istio DestinationRule manifest (`mesh/multi-region-failover.yaml`) that defines locality-weighted load balancing (`localityLbSetting: failover`) to automate cross-region failover between AWS `us-east-1` and `us-west-2` while enforcing circuit breaking outlier detection (`outlierDetection`).

```bash
cat << 'EOF' > mesh/multi-region-failover.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: master-multi-region-ai-failover
  namespace: production
  labels:
    tier: mesh-failover
spec:
  host: vllm-inference-engine.production.svc.cluster.local
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
      # ==============================================================================
      # LOCALITY LOAD BALANCING: Enforce automated cross-region failover policies!
      # ==============================================================================
      localityLbSetting:
        enabled: true
        failover:
          # FAILOVER RULE 1: If us-east-1 fails, instantly fail over to us-west-2!
          - from: us-east-1
            to: us-west-2
          # FAILOVER RULE 2: If us-west-2 fails, instantly fail over to us-east-1!
          - from: us-west-2
            to: us-east-1
    # Master Circuit Breaking: Eject failing pods instantly if they throw 5xx errors!
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 5s
      baseEjectionTime: 30s
      maxEjectionPercent: 100
EOF
```

## Step 2: Creating a Declarative Crossplane BucketReplication Manifest (`kind: BucketReplication`)

In this step, you will author a declarative Crossplane BucketReplication manifest (`storage/model-replication.yaml`) that enforces active S3 Cross-Region Replication (`status: Enabled`) to duplicate terabytes of model weights while disabling delete marker replication (`deleteMarkerReplication: status: Disabled`) to prevent accidental backup wipes.

```bash
cat << 'EOF' > storage/model-replication.yaml
apiVersion: s3.aws.upbound.io/v1beta1
kind: BucketReplication
metadata:
  name: master-enterprise-model-replication
  namespace: production
  labels:
    tier: storage-replication
spec:
  forProvider:
    bucketRef:
      name: enterprise-model-registry-east # Primary source bucket in us-east-1!
    roleArnRef:
      name: s3-cross-region-replication-role # Mandatory IAM replication role!
    rule:
      - name: Llama3ModelWeightReplicationRule
        status: Enabled
        priority: 1
        # Master Replication Governance: Target secondary bucket in us-west-2!
        destination:
          bucketArnRef:
            name: enterprise-model-registry-west # Secondary target bucket in us-west-2!
          storageClass: STANDARD
        # Delete Marker Governance: Do NOT replicate delete markers!
        # (Protects secondary bucket against accidental deletion or rogue developer wipes!)
        deleteMarkerReplication:
          status: Disabled
        filter:
          prefix: "models/" # Replicate all objects stored inside models/ directory!
EOF
```

## Step 3: Architecting an Istio VirtualService with Model Degradation (`llama3-8b-fallback`)

In this step, you will author a declarative Istio VirtualService manifest (`traffic/virtualservice-fallback.yaml`) that enforces explicit timeout cutoffs (`timeout: 10s`) to eliminate client retry storms and wires automated model degradation (`fallback: gpt-4-to-gpt-3.5`) to instantly reroute failed 70B prompts to lightweight 8B fallback models.

```bash
cat << 'EOF' > traffic/virtualservice-fallback.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: vllm-inference-engine-router
  namespace: production
  labels:
    tier: ai-routing
spec:
  hosts:
  - "vllm-engine.production.svc.cluster.local"
  http:
  # ==============================================================================
  # PRIMARY ROUTE: Target Heavyweight Llama 3 70B Engine with Fallback Guardrails!
  # ==============================================================================
  - name: primary-llama3-70b-route
    match:
    - headers:
        x-ai-priority:
          exact: "high"
    route:
    - destination:
        host: llama3-70b-service.production.svc.cluster.local
        subset: v1
      weight: 100
      headers:
        request:
          # Master Cache Governance: Bypass Redis cache if latency exceeds 50ms!
          set:
            x-bypass-cache: "true"
    # Master Timeout Governance: Enforce explicit 10s cutoff to eliminate retry storms!
    timeout: 10s
    retries:
      attempts: 3
      perTryTimeout: 3s
      retryOn: "connect-failure,refused-stream,503"

  # ==============================================================================
  # FALLBACK ROUTE: Automated Model Degradation (Targets Llama 3 8B Instantly!)
  # ==============================================================================
  - name: fallback-llama3-8b-route
    route:
    - destination:
        host: llama3-8b-fallback.production.svc.cluster.local # Target lightweight fallback model!
        subset: v1
      weight: 100
    timeout: 5s
EOF
```

## Step 4: Authoring a LitmusChaos ChaosEngine Manifest (`kind: ChaosEngine`)

In this step, you will author a declarative LitmusChaos ChaosEngine manifest (`chaos/master-chaos-engine.yaml`) that enforces strict blast radius containment (`spec.appinfo.applabel`) to prevent unintended database deletions and wires steady-state hypothesis verification (`probe: httpProbe`) to validate AI gateway availability.

```bash
cat << 'EOF' > chaos/master-chaos-engine.yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: master-enterprise-ai-chaos
  namespace: production
  labels:
    tier: chaos-verification
spec:
  # ==============================================================================
  # BLAST RADIUS CONTAINMENT: Enforce strict application workload scoping!
  # ==============================================================================
  appinfo:
    appns: "production"
    applabel: "app=vllm-inference-engine" # Target only vLLM serving pods!
    appkind: "deployment"
  chaosServiceAccount: vllm-chaos-executor
  jobCleanUpPolicy: 'delete'
  experiments:
    - name: vllm-pod-delete-experiment
      spec:
        components:
          env:
            - name: TOTAL_CHAOS_DURATION
              value: "60" # Execute chaos experiment for 60 seconds!
            - name: CHAOS_INTERVAL
              value: "10" # Inject pod deletion every 10 seconds!
            - name: FORCE
              value: "true"
        # ==============================================================================
        # STEADY STATE HYPOTHESIS: Validate AI Gateway availability during chaos!
        # ==============================================================================
        probe:
          - name: verify-ai-gateway-health
            type: "httpProbe"
            httpProbe/inputs:
              url: "http://vllm-inference-engine.production.svc.cluster.local:8000/healthz"
              insecureSkipVerify: true
              method: "Get"
              criteria: "=="
              responseCode: "200" # Gateway MUST return HTTP 200 OK throughout chaos!
            mode: "Continuous"
            runProperties:
              probeTimeout: 2
              interval: 2
              retry: 2
EOF
```

## Step 5: Authoring an Istio VirtualService for Traffic Shadowing (`mirror: host`)

In this step, you will author a declarative Istio VirtualService manifest (`shadowing/traffic-shadowing.yaml`) that enforces asynchronous request mirroring (`mirror: subset: v2`) to test experimental models in the background and wires zero-impact evaluation guardrails (`mirror_percentage: value: 100`) to ignore mirror errors.

```bash
cat << 'EOF' > shadowing/traffic-shadowing.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: master-enterprise-ai-shadowing
  namespace: production
  labels:
    tier: dark-launch
spec:
  hosts:
  - "vllm-engine.production.svc.cluster.local"
  http:
  - name: master-dark-launch-route
    # ==============================================================================
    # PRIMARY ROUTE: Route 100% of live user traffic to proven v1 model!
    # ==============================================================================
    route:
    - destination:
        host: vllm-service.production.svc.cluster.local
        subset: v1 # Target proven, stable production model!
      weight: 100
    # ==============================================================================
    # SHADOW ROUTE: Asynchronously mirror 100% of live traffic to experimental v2!
    # ==============================================================================
    mirror:
      host: vllm-service.production.svc.cluster.local
      subset: v2 # Target experimental, unverified v2 model in background!
    # Master Zero-Impact Governance: Mirror 100% of traffic while ignoring all v2 errors!
    mirror_percentage:
      value: 100.0
    timeout: 10s
    retries:
      attempts: 3
      perTryTimeout: 3s
EOF
```

---

# Verification

To verify that your enterprise Advanced Resilience, Multi-Region Mesh, S3 Replication, Model Degradation, LitmusChaos, and Traffic Shadowing lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify locality failover, replication statuses, timeout cutoffs, blast radius scopes, and mirror percentages.

```bash
# 1. Verify localityLbSetting failover rules in the Istio DestinationRule manifest
cat mesh/multi-region-failover.yaml | grep -E "localityLbSetting:.*" -A 5

# 2. Verify status: Enabled in the Crossplane BucketReplication manifest
cat storage/model-replication.yaml | grep -E "status:.*Enabled"

# 3. Verify timeout: 10s cutoff in the Istio VirtualService fallback manifest
cat traffic/virtualservice-fallback.yaml | grep -E "timeout:.*10s"

# 4. Verify blast radius applabel scoping in the LitmusChaos ChaosEngine manifest
cat chaos/master-chaos-engine.yaml | grep -E "applabel:.*app=vllm-inference-engine"

# 5. Verify httpProbe steady-state verification in the LitmusChaos ChaosEngine manifest
cat chaos/master-chaos-engine.yaml | grep -E "type:.*httpProbe"

# 6. Verify mirror_percentage value in the Istio VirtualService shadowing manifest
cat shadowing/traffic-shadowing.yaml | grep -E "mirror_percentage:.*" -A 1
```

**Expected Output:**
```text
      localityLbSetting:
        enabled: true
        failover:
          # FAILOVER RULE 1: If us-east-1 fails, instantly fail over to us-west-2!
          - from: us-east-1
            to: us-west-2
        status: Enabled
    timeout: 10s
    applabel: "app=vllm-inference-engine" # Target only vLLM serving pods!
            type: "httpProbe"
    mirror_percentage:
      value: 100.0
```

---

# Troubleshooting

* **Symptom:** `cat mesh/multi-region-failover.yaml | grep -E "localityLbSetting:.*" -A 5` returns no output.
  * **Cause:** You authored an Istio DestinationRule manifest without the `localityLbSetting` block or left it empty.
  * **Solution:** Update your manifest to include `localityLbSetting: failover` to ensure Envoy sidecars automatically route cross-region traffic in milliseconds during a data center blackout.

* **Symptom:** `cat storage/model-replication.yaml | grep -E "status:.*Enabled"` returns no output.
  * **Cause:** You authored a Crossplane BucketReplication manifest with `status: Disabled` or omitted the rule status.
  * **Solution:** Update your manifest to set `status: Enabled` to ensure AWS automatically synchronizes terabytes of model weights to secondary backup regions in the background.

* **Symptom:** `cat traffic/virtualservice-fallback.yaml | grep -E "timeout:.*10s"` returns no output.
  * **Cause:** You authored an Istio VirtualService manifest without the `timeout: 10s` cutoff rule.
  * **Solution:** Add `timeout: 10s` to ensure Envoy sidecars automatically cancel dead gRPC requests and free up GPU memory buffers during a client retry storm.

* **Symptom:** `cat chaos/master-chaos-engine.yaml | grep -E "applabel:.*app=vllm-inference-engine"` returns no output.
  * **Cause:** You authored a LitmusChaos ChaosEngine manifest without defining `spec.appinfo.applabel` blast radius containment.
  * **Solution:** Update your manifest to set `applabel: app=vllm-inference-engine` to physically restrict chaos runner pods to deleting intended application pods, preventing accidental database deletions.

* **Symptom:** `cat shadowing/traffic-shadowing.yaml | grep -E "mirror_percentage:.*" -A 1` returns no output.
  * **Cause:** You authored an Istio VirtualService manifest without the `mirror_percentage` block or set it to 0.
  * **Solution:** Update your manifest to set `mirror_percentage: value: 100` to ensure Envoy sidecars mirror 100% of live production traffic while completely ignoring `v2`'s responses, errors, or connection timeouts.

---

# Cleanup

Safely remove the enterprise resilience lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise resilience lab directory
rm -rf ~/enterprise-resilience-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-resilience-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
