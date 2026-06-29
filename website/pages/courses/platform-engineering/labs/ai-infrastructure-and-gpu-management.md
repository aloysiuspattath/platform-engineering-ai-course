# AI Infrastructure, GPU Slicing, CNI Injection & DCGM Observability

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure.

Required Inputs: Associated lesson, lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-AI-01`
* **Associated Lesson:** Module 14 (`MOD-AI`: AI Infrastructure & GPU Management)
* **Objective:** Author a declarative Time-Slicing ConfigMap manifest, create a declarative ClusterPolicy Custom Resource manifest with DKMS, architect a HostDevice CNI configuration manifest for InfiniBand Virtual Function injection, and author a PrometheusRule manifest for DCGM XID hardware faults and VRAM exhaustion.
* **Estimated Time:** 45 minutes
* **Difficulty:** Advanced

---

# Prerequisites

* Completion of Module 13 (`MOD-SRE`: Site Reliability Engineering) and Module 12 (`MOD-OBS`: Observability & Reliability).
* Foundational understanding of YAML Custom Resources, Kubernetes DaemonSets, CNI conflist specifications, and PromQL time-series mathematics.
* Access to a local bash terminal environment (with standard tools like `mkdir`, `cat`, and `grep`).

---

# Environment Setup

Prepare your local terminal sandbox environment by setting up the required directory structure for your enterprise AI infrastructure manifests, GPU operator configurations, high-throughput CNI definitions, and DCGM hardware alert rules.

```bash
# Create the parent directory for the AI infrastructure and GPU management lab manifests
mkdir -p ~/enterprise-ai-lab/sharing
mkdir -p ~/enterprise-ai-lab/operator
mkdir -p ~/enterprise-ai-lab/networking
mkdir -p ~/enterprise-ai-lab/monitoring
cd ~/enterprise-ai-lab

# Verify the directory structure was created successfully
pwd
```

---

# Step-by-Step Instructions

## Step 1: Authoring a Declarative Time-Slicing ConfigMap Manifest

In this step, you will author a declarative Time-Slicing ConfigMap manifest (`sharing/time-slicing-config.yaml`) that configures the NVIDIA k8s-device-plugin to multiply a single physical GPU into 4 virtual `nvidia.com/gpu` resources (`replicas: 4`), eliminating hardware stranding for trusted internal development environments.

```bash
cat << 'EOF' > sharing/time-slicing-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nvidia-time-slicing-config
  namespace: kube-system
data:
  any: |-
    version: v1
    flags:
      # Do not rename resource strings; keep advertising generic nvidia.com/gpu!
      renameByDefault: false
    sharing:
      timeSlicing:
        # Enable Time-Slicing! Allow up to 4 pods to share a single physical GPU concurrently!
        # (Multiplies 1 physical GPU into 4 virtual nvidia.com/gpu resources!)
        resources:
        - name: nvidia.com/gpu
          replicas: 4
EOF
```

## Step 2: Creating a Declarative `ClusterPolicy` Manifest with DKMS

In this step, you will author a declarative `ClusterPolicy` Custom Resource manifest (`operator/cluster-policy.yaml`) that configures the NVIDIA GPU Operator to deploy containerized drivers (`driver.version: 550.54.15`), enable Dynamic Kernel Module Support (`ENABLE_DKMS: "true"`) to survive Linux kernel updates, mount your Time-Slicing ConfigMap, and enable `dcgm-exporter`.

```bash
cat << 'EOF' > operator/cluster-policy.yaml
apiVersion: nvidia.com/v1
kind: ClusterPolicy
metadata:
  name: cluster-policy
spec:
  # 1. Containerized NVIDIA Driver Configuration!
  driver:
    enabled: true
    version: "550.54.15" # Specify exact proprietary driver version to deploy across nodes!
    image: "driver"
    repository: "nvcr.io/nvidia"
    manager:
      env:
      # Enable Dynamic Kernel Module Support (DKMS) to ensure driver survives kernel updates!
      - name: ENABLE_DKMS
        value: "true"

  # 2. NVIDIA Container Toolkit Configuration!
  toolkit:
    enabled: true
    version: "v1.15.0-ubuntu22.04"
    installDir: "/usr/local/nvidia" # Mount path on host worker node!

  # 3. NVIDIA k8s-device-plugin Configuration!
  devicePlugin:
    enabled: true
    version: "v0.15.0"
    config:
      # Mount our Time-Slicing ConfigMap to eliminate hardware stranding!
      name: "nvidia-time-slicing-config"
      default: "any"

  # 4. NVIDIA DCGM Exporter Configuration (GPU Hardware Telemetry)!
  dcgmExporter:
    enabled: true
    version: "3.3.5-3.4.0-ubuntu22.04"
    serviceMonitor:
      enabled: true # Automatically generate Prometheus Operator ServiceMonitor!

  # 5. Multi-Instance GPU (MIG) Configuration!
  mig:
    strategy: single # Set to single or mixed depending on cluster multi-tenancy requirements
EOF
```

## Step 3: Architecting a HostDevice CNI Configuration Manifest for InfiniBand VF Injection

In this step, you will author a declarative HostDevice CNI plugin configuration manifest (`networking/ib-sriov-cni.conflist`) that bypasses virtual ethernet (`veth`) pairs entirely (`type: host-device`) to inject physical InfiniBand Virtual Functions (`ib0`) directly into container pods, unlocking kernel-bypassing GPUDirect RDMA.

```bash
cat << 'EOF' > networking/ib-sriov-cni.conflist
{
  "cniVersion": "0.3.1",
  "name": "ib-sriov-network",
  "plugins": [
    {
      # Utilize HostDevice CNI plugin! Bypasses virtual ethernet (veth) pairs entirely!
      "type": "host-device",
      # Specify exact physical InfiniBand Virtual Function (VF) device name on host!
      "device": "ib0",
      "ipam": {
        "type": "host-local",
        "subnet": "192.168.100.0/24",
        "routes": [
          { "dst": "0.0.0.0/0" }
        ]
      }
    }
  ]
}
EOF
```

## Step 4: Authoring a `PrometheusRule` Manifest for DCGM XID Hardware Faults

In this step, you will author a declarative Prometheus Operator `PrometheusRule` manifest (`monitoring/dcgm-alerts.yaml`) that enforces PromQL mathematical expressions for VRAM exhaustion (`DCGM_FI_DEV_FB_USED / ... > 95`), XID hardware faults (`DCGM_FI_DEV_XID_ERRORS > 0`), and thermal throttling (`DCGM_FI_DEV_GPU_TEMP > 85`).

```bash
cat << 'EOF' > monitoring/dcgm-alerts.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: production-gpu-hardware-alerts
  namespace: production
  labels:
    release: prometheus-stack # Mandatory label matching Prometheus Operator selector!
spec:
  groups:
  - name: dcgm-gpu-alerts
    rules:
    # ==============================================================================
    # ALERT 1: VRAM EXHAUSTION (Alerts BEFORE a fatal CUDA OOM crash occurs!)
    # ==============================================================================
    - alert: GpuVramExhaustionWarning
      # PromQL Math: Used VRAM / Total VRAM * 100 > 95%
      expr: >-
        DCGM_FI_DEV_FB_USED / DCGM_FI_DEV_FB_TOTAL * 100 > 95.0
      for: 2m
      labels:
        severity: warning # Skips PagerDuty! Sends peaceful Slack warning!
        tier: ai-platform
      annotations:
        summary: "GPU VRAM utilization exceeded 95% on node {{ $labels.instance }} (GPU {{ $labels.gpu }})"
        description: "AI workload is approaching maximum High Bandwidth Memory capacity. Danger of CUDA Out-Of-Memory (OOM) crash."
        runbook_url: "https://wiki.mycompany.com/runbooks/gpu-vram-exhaustion"

    # ==============================================================================
    # ALERT 2: XID HARDWARE FAULT (Fatal Silicon Error -> PAGERDUTY PHONE CALL!)
    # ==============================================================================
    - alert: GpuXidHardwareFault
      # PromQL Math: Any active XID error code > 0 (e.g., XID 43: GPU fell off PCIe bus!)
      expr: DCGM_FI_DEV_XID_ERRORS > 0
      for: 1m
      labels:
        severity: critical # Master routing label! Triggers PagerDuty phone call!
        tier: ai-platform
      annotations:
        summary: "Fatal NVIDIA XID Error Code {{ $value }} detected on node {{ $labels.instance }} (GPU {{ $labels.gpu }})"
        description: "Underlying physical GPU silicon encountered a fatal hardware or kernel driver fault (e.g., XID 43 bus disconnect or XID 48 ECC corruption)."
        runbook_url: "https://wiki.mycompany.com/runbooks/gpu-xid-faults"

    # ==============================================================================
    # ALERT 3: THERMAL THROTTLING (Overheating -> PEACEFUL SLACK WARNING!)
    # ==============================================================================
    - alert: GpuThermalThrottlingWarning
      # PromQL Math: Physical GPU core temperature > 85 Celsius
      expr: DCGM_FI_DEV_GPU_TEMP > 85
      for: 3m
      labels:
        severity: warning
        tier: ai-platform
      annotations:
        summary: "GPU Core Temperature exceeded 85C on node {{ $labels.instance }} (GPU {{ $labels.gpu }})"
        runbook_url: "https://wiki.mycompany.com/runbooks/gpu-thermal-throttling"
EOF
```

---

# Verification

To verify that your enterprise AI infrastructure, GPU slicing, CNI injection, and DCGM observability lab was completed successfully, execute the following verification commands to inspect your manifest contents and verify Time-Slicing multipliers, DKMS enablers, HostDevice injection, and DCGM mathematical strings.

```bash
# 1. Verify Time-Slicing multiplier in the sharing ConfigMap manifest
cat sharing/time-slicing-config.yaml | grep -E "replicas:.*4"

# 2. Verify DKMS enabler in the ClusterPolicy manifest
cat operator/cluster-policy.yaml | grep -E "ENABLE_DKMS.*true"

# 3. Verify HostDevice plugin type in the CNI configuration manifest
cat networking/ib-sriov-cni.conflist | grep -E "type.*host-device"

# 4. Verify InfiniBand Virtual Function device name in the CNI manifest
cat networking/ib-sriov-cni.conflist | grep -E "device.*ib0"

# 5. Verify XID hardware fault PromQL math in the DCGM alerting manifest
cat monitoring/dcgm-alerts.yaml | grep -E "DCGM_FI_DEV_XID_ERRORS.*>.*0"
```

**Expected Output:**
```text
          replicas: 4
      - name: ENABLE_DKMS
        value: "true"
      "type": "host-device",
      "device": "ib0",
      expr: DCGM_FI_DEV_XID_ERRORS > 0
```

---

# Troubleshooting

* **Symptom:** `cat sharing/time-slicing-config.yaml | grep -E "replicas:.*4"` returns no output.
  * **Cause:** You authored a ConfigMap without defining the `replicas: 4` multiplication parameter under `sharing.timeSlicing`.
  * **Solution:** Add `replicas: 4` to your manifest to eliminate hardware stranding for trusted internal development environments.

* **Symptom:** `cat operator/cluster-policy.yaml | grep -E "ENABLE_DKMS.*true"` returns no output.
  * **Cause:** You authored a ClusterPolicy manifest without the `ENABLE_DKMS` environment variable block under `spec.driver.manager.env`.
  * **Solution:** Ensure your `driver` block explicitly passes `ENABLE_DKMS: "true"` to guarantee the driver survives host Linux kernel updates.

* **Symptom:** `cat networking/ib-sriov-cni.conflist | grep -E "type.*host-device"` returns no output.
  * **Cause:** You authored a CNI conflist configured with `type: calico` or `type: bridge`, forcing traffic through `veth` pairs.
  * **Solution:** Update your manifest to use `type: host-device` and `device: ib0` to unlock kernel-bypassing GPUDirect RDMA.

* **Symptom:** `cat monitoring/dcgm-alerts.yaml | grep -E "DCGM_FI_DEV_XID_ERRORS.*>.*0"` returns no output.
  * **Cause:** You authored a PrometheusRule manifest without the `DCGM_FI_DEV_XID_ERRORS > 0` hardware fault equation.
  * **Solution:** Add the `DCGM_FI_DEV_XID_ERRORS > 0` expression to ensure Prometheus fires critical PagerDuty calls for silicon disconnects.

---

# Cleanup

Safely remove the enterprise AI infrastructure lab directory and temporary manifest files from your terminal environment.

```bash
# Safely remove the enterprise AI infrastructure lab directory
rm -rf ~/enterprise-ai-lab

# Verify the directory was removed successfully
ls -la ~/enterprise-ai-lab 2>/dev/null || echo "Cleanup complete. Directory successfully removed."
```
