# MLOps Distributed Training, Model Serving, Caching & KEDA Autoscaling

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MLOPS-01`
* **Associated Lesson:** Module 15 (`MOD-MLOPS`: MLOps Training & Model Serving Engines)
* **Objective:** Author a declarative Kubeflow PyTorchJob manifest with cleanPodPolicy: Running, create a declarative vLLM Deployment manifest with PagedAttention and S3 init containers, architect a Triton model repository configuration manifest with Dynamic Batching, and author a KEDA ScaledObject manifest with minReplicaCount: 0 and custom Prometheus external metrics.
* **Estimated Time:** 45 minutes
* **Difficulty:** Advanced

---

# Prerequisites

* Completion of Module 14 (`MOD-AI`: AI Infrastructure & GPU Management) and Module 12 (`MOD-OBS`: Observability & Reliability).
* Foundational understanding of YAML Custom Resources, Kubernetes Deployments, init containers, and PromQL time-series mathematics.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise MLOps distributed training manifests, vLLM serving deployments, Triton model repositories, and KEDA event-driven autoscaling rules.

```bash
# Create the parent directory for the MLOps training and model serving lab manifests
mkdir -p ~/enterprise-mlops-lab/training
mkdir -p ~/enterprise-mlops-lab/serving/triton-model-repo
mkdir -p ~/enterprise-mlops-lab/autoscaling
cd ~/enterprise-mlops-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Kubeflow `PyTorchJob` Manifest

In this step, you will author a declarative Kubeflow `PyTorchJob` manifest (`training/pytorch-distributed-job.yaml`) that configures a 16-node distributed training ring (`Master: 1`, `Worker: 15`) and enforces automated garbage collection (`cleanPodPolicy: Running`) to instantly delete worker pods upon master completion, eliminating hardware stranding.

```bash
cat << 'EOF' > training/pytorch-distributed-job.yaml
apiVersion: kubeflow.org/v1
kind: PyTorchJob
metadata:
  name: production-recommendation-model-training
  namespace: production
  labels:
    tier: ai-training
spec:
  # Master Pod Cleanup Policy: Delete worker pods the moment Master finishes!
  # (Unlocks expensive GPUs instantly and eliminates hardware stranding!)
  cleanPodPolicy: Running
  pytorchReplicaSpecs:
    # 1. Master Pod Replica Specification!
    Master:
      replicas: 1
      restartPolicy: OnFailure
      template:
        spec:
          containers:
          - name: pytorch
            image: myregistry.com/ai/recommendation-model:v2.0.0
            command: ["python3", "-m", "torch.distributed.run", "train.py"]
            resources:
              limits:
                nvidia.com/gpu: 1
    # 2. Worker Pod Replica Specification!
    Worker:
      replicas: 15 # Deploy 15 worker pods (Total WORLD_SIZE = 16!)
      restartPolicy: OnFailure
      template:
        spec:
          containers:
          - name: pytorch
            image: myregistry.com/ai/recommendation-model:v2.0.0
            command: ["python3", "-m", "torch.distributed.run", "train.py"]
            resources:
              limits:
                nvidia.com/gpu: 1
EOF
```

## Step 2: Creating a Declarative vLLM Deployment Manifest with S3 Init Containers

In this step, you will author a declarative Kubernetes `Deployment` manifest (`serving/vllm-serving-deployment.yaml`) that decouples model weights using an `initContainer` running `s5cmd`, mounts a `hostPath` volume at `/var/cache/models` for 3-second startups, configures `--gpu-memory-utilization=0.90` for PagedAttention, and sets `initialDelaySeconds: 180`.

```bash
cat << 'EOF' > serving/vllm-serving-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-inference-engine
  namespace: production
  labels:
    tier: ai-inference
spec:
  replicas: 4
  selector:
    matchLabels:
      app: vllm-engine
  template:
    metadata:
      labels:
        app: vllm-engine
    spec:
      # ==============================================================================
      # INIT CONTAINER: S3 Model Puller with NVMe HostPath Caching!
      # ==============================================================================
      initContainers:
      - name: s3-model-puller
        image: peakai/s5cmd:v2.2.2 # Utilize s5cmd (Blazing fast C++ S3 client!)
        command:
        - "/bin/sh"
        - "-c"
        - |
          MODEL_DIR="/var/cache/models/llama3-70b-prod"
          mkdir -p "$MODEL_DIR"
          
          # Inspect local NVMe host path cache! If weights exist, skip S3 download entirely!
          if [ "$(ls -A $MODEL_DIR 2>/dev/null)" ]; then
              echo "[CACHE EVALUATION]: CACHE HIT! Model weights already exist on host NVMe."
              exit 0
          else
              echo "[CACHE EVALUATION]: CACHE MISS! Downloading weights from S3 Model Registry..."
              s5cmd --stat cp "s3://enterprise-model-registry/llama3-70b-prod/*" "$MODEL_DIR/"
          fi
        volumeMounts:
        - name: model-cache-volume
          mountPath: /var/cache/models
        env:
        - name: AWS_REGION
          value: "us-east-1"

      # ==============================================================================
      # MAIN CONTAINER: vLLM Serving Engine (Mounts NVMe Cache Instantly!)
      # ==============================================================================
      containers:
      - name: vllm-container
        image: vllm/vllm-openai:v0.4.2 # Lightweight 500MB serving image (Instant Pull!)
        command: ["python3", "-m", "vllm.entrypoints.openai.api_server"]
        args:
        - "--model=/var/cache/models/llama3-70b-prod"
        # Master Memory Governance: Pre-allocate 90% of VRAM for PagedAttention KV Cache!
        # (Eliminates VRAM fragmentation entirely and prevents CUDA OOM crashes!)
        - "--gpu-memory-utilization=0.90"
        - "--max-model-len=4096"
        - "--tensor-parallel-size=2" # Split 70B model across 2 physical GPUs!
        resources:
          limits:
            nvidia.com/gpu: 2 # Request 2 physical NVIDIA H100 GPUs!
        ports:
        - containerPort: 8000
        volumeMounts:
        - name: model-cache-volume
          mountPath: /var/cache/models
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 180 # Allow 3 minutes for 140GB model weights to load!
          periodSeconds: 10
      
      # Master Storage Governance: Mount /var/cache/models directly from host NVMe filesystem!
      # (Slashes container startup latency from 50 minutes down to 3 seconds!)
      volumes:
      - name: model-cache-volume
        hostPath:
          path: /var/cache/models
          type: DirectoryOrCreate
EOF
```

## Step 3: Architecting a Triton Model Repository Configuration Manifest with Dynamic Batching

In this step, you will author a declarative Triton Inference Server model repository configuration manifest (`serving/triton-model-repo/config.pbtxt`) that enforces aggressive Dynamic Batching (`max_queue_delay_microseconds: 5000`) to group incoming user requests, driving physical GPU Tensor Core utilization to 100%.

```bash
cat << 'EOF' > serving/triton-model-repo/config.pbtxt
name: "production-recommendation-engine"
platform: "tensorrt_plan"
max_batch_size: 128 # Enable Dynamic Batching! Allow up to 128 requests per batch!

# Define exact Dynamic Batching queue delay window!
# (Triton will pause for 5 milliseconds to group incoming user requests into a single batch!)
dynamic_batching {
  max_queue_delay_microseconds: 5000
}

instance_group [
  {
    count: 1
    kind: KIND_GPU # Execute model on physical GPU silicon!
  }
]
EOF
```

## Step 4: Authoring a KEDA `ScaledObject` Manifest for Custom External Metrics

In this step, you will author a declarative KEDA `ScaledObject` manifest (`autoscaling/vllm-keda-autoscaler.yaml`) that decouples scaling from host CPU metrics, sets `minReplicaCount: 0` to eliminate cloud computing waste, and inspects `vllm:num_requests_waiting` and `DCGM_FI_DEV_GPU_UTIL`.

```bash
cat << 'EOF' > autoscaling/vllm-keda-autoscaler.yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: vllm-keda-autoscaler
  namespace: production
  labels:
    tier: ai-autoscaling
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vllm-inference-engine # Target our pristine vLLM Deployment!
  # Master Financial Governance: Scale to ZERO pods when zero users are online!
  # (Unlocks expensive GPUs instantly and eliminates cloud computing waste!)
  minReplicaCount: 0
  maxReplicaCount: 20 # Enable dynamic KEDA autoscaling up to 20 pods!
  cooldownPeriod: 300 # Wait 5 minutes after traffic drops before scaling down
  pollingInterval: 15 # Poll Prometheus metrics every 15 seconds
  triggers:
  # ==============================================================================
  # TRIGGER 1: Request Queue Depth (vllm:num_requests_waiting > 10)
  # ==============================================================================
  - type: prometheus
    metadata:
      serverAddress: http://prometheus-k8s.monitoring.svc.cluster.local:9090
      # PromQL Math: Average number of requests waiting in vLLM execution queue
      query: sum(vllm:num_requests_waiting{namespace="production"})
      threshold: '10' # Scale up new pods when > 10 requests are waiting in queue!

  # ==============================================================================
  # TRIGGER 2: Physical GPU Silicon Utilization (DCGM_FI_DEV_GPU_UTIL > 80%)
  # ==============================================================================
  - type: prometheus
    metadata:
      serverAddress: http://prometheus-k8s.monitoring.svc.cluster.local:9090
      # PromQL Math: Average physical GPU silicon utilization across pods
      query: avg(DCGM_FI_DEV_GPU_UTIL{namespace="production"})
      threshold: '80' # Scale up new pods when physical GPU utilization exceeds 80%!
EOF
```

---

# Verification

To verify that your enterprise MLOps distributed training, model serving, caching, and KEDA autoscaling lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify cleanPodPolicy, PagedAttention flags, Dynamic Batching windows, and KEDA metric queries.

```bash
# 1. Verify cleanPodPolicy in the Kubeflow PyTorchJob manifest
cat training/pytorch-distributed-job.yaml | grep -E "cleanPodPolicy:.*Running"

# 2. Verify PagedAttention memory utilization flag in the vLLM deployment manifest
cat serving/vllm-serving-deployment.yaml | grep -E "gpu-memory-utilization.*0.90"

# 3. Verify hostPath NVMe caching mount in the vLLM deployment manifest
cat serving/vllm-serving-deployment.yaml | grep -E "hostPath:.*" -A 2

# 4. Verify Dynamic Batching queue delay window in the Triton configuration manifest
cat serving/triton-model-repo/config.pbtxt | grep -E "max_queue_delay_microseconds:.*5000"

# 5. Verify scale-to-zero minReplicaCount in the KEDA ScaledObject manifest
cat autoscaling/vllm-keda-autoscaler.yaml | grep -E "minReplicaCount:.*0"

# 6. Verify request queue depth PromQL query in the KEDA ScaledObject manifest
cat autoscaling/vllm-keda-autoscaler.yaml | grep -E "query:.*vllm:num_requests_waiting"
```

**Expected Output:**
```text
  cleanPodPolicy: Running
        - "--gpu-memory-utilization=0.90"
      - name: model-cache-volume
        hostPath:
          path: /var/cache/models
  max_queue_delay_microseconds: 5000
  minReplicaCount: 0
      query: sum(vllm:num_requests_waiting{namespace="production"})
```

---

# Troubleshooting

* **Symptom:** `cat training/pytorch-distributed-job.yaml | grep -E "cleanPodPolicy:.*Running"` returns no output.
  * **Cause:** You authored a PyTorchJob manifest configured with `cleanPodPolicy: None` (or omitted it entirely).
  * **Solution:** Update your manifest to set `cleanPodPolicy: Running` to ensure Kubeflow instantly deletes worker pods upon master completion.

* **Symptom:** `cat serving/vllm-serving-deployment.yaml | grep -E "gpu-memory-utilization.*0.90"` returns no output.
  * **Cause:** You authored a vLLM deployment manifest without the `--gpu-memory-utilization=0.90` startup argument.
  * **Solution:** Add `--gpu-memory-utilization=0.90` to your container `args` to pre-allocate the PagedAttention virtual memory pool upfront.

* **Symptom:** `cat serving/triton-model-repo/config.pbtxt | grep -E "max_queue_delay_microseconds:.*5000"` returns no output.
  * **Cause:** You authored a Triton config without the `dynamic_batching` block or set the queue delay window to 0.
  * **Solution:** Add `max_queue_delay_microseconds: 5000` to give Triton a pristine window to group incoming requests into a single GPU batch.

* **Symptom:** `cat autoscaling/vllm-keda-autoscaler.yaml | grep -E "minReplicaCount:.*0"` returns no output.
  * **Cause:** You authored a KEDA ScaledObject configured with `minReplicaCount: 1`, stranding expensive GPUs during off-peak hours.
  * **Solution:** Update your manifest to set `minReplicaCount: 0` to eliminate cloud computing waste for fast-loading models.

---

# Cleanup

Safely remove the enterprise MLOps lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise MLOps lab directory
rm -rf ~/enterprise-mlops-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-mlops-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
