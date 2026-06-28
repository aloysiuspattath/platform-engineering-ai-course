# Monitoring LLM Latency, Token Throughput & GPU Utilization

Version: 1.0.0

Purpose: Understand how to monitor and observe production AI infrastructure, focusing on LLM-specific metrics and hardware utilization.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.


# Lesson Overview

Running AI infrastructure without visibility is flying blind. Traditional web application metrics (like HTTP 500s or database query times) are insufficient for diagnosing AI bottlenecks. This lesson focuses on the specialized observability required for Large Language Models. You will learn to track Time-To-First-Token (TTFT), token generation throughput, and deep hardware metrics using tools like DCGM (Data Center GPU Manager) and Prometheus, ensuring your AI platform remains performant and cost-efficient.

---

# Learning Objectives

* Differentiate between Time-To-First-Token (TTFT) and Inter-Token Latency (ITL).
* Export and analyze hardware-level GPU metrics using NVIDIA DCGM Exporter.
* Scrape and visualize vLLM specific software metrics using Prometheus and Grafana.
* Identify thermal throttling and PCIe bottleneck signatures in metric dashboards.
* Design an SLI/SLA framework specifically tailored for generative AI endpoints.

---

# Prerequisites

* Completion of `MOD-AI-03: Production LLM Serving with vLLM`.
* Familiarity with Prometheus and Grafana for metrics and visualization.
* Basic understanding of Service Level Indicators (SLIs).

---

# Why This Exists

If a user complains that "the AI is slow," traditional APM (Application Performance Monitoring) tools might just show a single HTTP request taking 15 seconds. This is useless to a platform engineer. Is the request waiting in a queue? Is the GPU thermally throttling? Is the model generating tokens fast, but the user requested a massive 2000-token response? 
To answer these questions, the industry developed specialized metrics. AI monitoring bridges software telemetry (how fast the model's math executes) with hardware telemetry (how hot the GPU is and how much power it draws). By combining vLLM metrics with NVIDIA's DCGM, platform engineers can pinpoint the exact microsecond a bottleneck occurs.

---

# Core Concepts

## The Three Pillars of LLM Latency

Generative AI does not return a single block of data instantly; it streams tokens over time. Therefore, latency is broken into three distinct phases:
1.  **Queue Time:** How long the request sat waiting for the GPU to have available capacity (KV Cache slots).
2.  **Time-To-First-Token (TTFT):** The time it takes the model to process the user's prompt (the "prefill" phase) and generate the very first word. This is the most critical metric for perceived user experience. High TTFT feels broken.
3.  **Inter-Token Latency (ITL) / Time-Per-Output-Token (TPOT):** The time it takes to generate each subsequent token (the "decode" phase). If this is slower than human reading speed (roughly 50ms per token), the UX degrades.

## DCGM (Data Center GPU Manager)

NVIDIA provides a suite of tools called DCGM. When deployed in Kubernetes (via the `dcgm-exporter`), it hooks directly into the hardware and exposes deep metrics to Prometheus. You monitor standard things like GPU Utilization and VRAM usage, but more importantly, you monitor:
*   **Power Draw & Thermal Throttling:** GPUs slow down if they get too hot. DCGM tells you if a GPU is actively throttling its clock speed to save itself from melting.
*   **Memory Bandwidth Utilization:** Tells you if you are hitting the "Memory Wall" discussed in Lesson 1.
*   **PCIe/NVLink Throughput:** Crucial for diagnosing multi-GPU communication bottlenecks.

## KV Cache Usage Monitoring

In continuous batching systems like vLLM, monitoring the KV Cache utilization is the equivalent of monitoring CPU usage in a traditional app. If the KV Cache is 99% full, the server will start queuing or dropping requests.

---

# Architecture

```mermaid
flowchart TD
    App["vLLM Inference Server"]
    GPU["NVIDIA GPU Hardware"]
    DCGM["dcgm-exporter (DaemonSet)"]
    Prometheus["Prometheus Server"]
    Grafana["Grafana Dashboards"]

    App -->|Exposes /metrics (TTFT, Token/sec, KV Cache)| Prometheus
    GPU -->|Hardware telemetry (Power, Temp, Clocks)| DCGM
    DCGM -->|Exposes /metrics| Prometheus
    Prometheus -->|Visualized in| Grafana
```

---

# Real-World Example

An enterprise deploys a chatbot. Suddenly, P99 latency spikes from 2 seconds to 12 seconds. 
The platform engineer looks at the Grafana dashboard. 
*   *DCGM GPU Utilization* is at 100%. 
*   *vLLM KV Cache Usage* is at 40% (plenty of room).
*   *vLLM Token Throughput* has plummeted.
*   *DCGM Clocks Throttle Reasons* shows `hw_slowdown`.
*   *DCGM Temperature* shows 92°C.
**Conclusion:** The server rack's cooling failed. The GPU thermally throttled its clock speeds to prevent damage, causing token generation to crawl. Software scaling (KEDA) cannot fix this; the physical infrastructure team must fix the HVAC.

---

# Hands-on Demonstration

Let's look at the raw metrics exposed by vLLM at the `/metrics` endpoint.

**Input (cURL command to a running vLLM server):**
```bash
curl http://localhost:8000/metrics | grep vllm:
```

**Expected Output (Snippet):**
```text
# HELP vllm:num_requests_running Number of requests currently running on GPU.
# TYPE vllm:num_requests_running gauge
vllm:num_requests_running{model_name="meta-llama/Llama-2-7b-chat-hf"} 42
# HELP vllm:num_requests_waiting Number of requests waiting to be processed.
# TYPE vllm:num_requests_waiting gauge
vllm:num_requests_waiting{model_name="meta-llama/Llama-2-7b-chat-hf"} 5
# HELP vllm:gpu_cache_usage_perc GPU KV-cache usage. 1 means 100 percent usage.
# TYPE vllm:gpu_cache_usage_perc gauge
vllm:gpu_cache_usage_perc{model_name="meta-llama/Llama-2-7b-chat-hf"} 0.85
# HELP vllm:time_to_first_token_seconds Histogram of time to first token in seconds.
...
vllm:time_to_first_token_seconds_bucket{model_name="...",le="0.5"} 150
```

**Explanation:**
This is the standard Prometheus exposition format. From these four metrics alone, we know the server is processing 42 concurrent users, 5 users are queued up waiting, the memory is 85% full, and 150 requests received their first token in under 0.5 seconds. These are the exact metrics KEDA uses to autoscale, and Grafana uses to build dashboards.

---

# Hands-on Lab

* **Objective:** Install Prometheus and DCGM-exporter using Helm, and query a basic hardware metric.
* **Estimated Time:** 15 minutes
* **Difficulty:** Intermediate
* **Environment:** A Kubernetes cluster with at least one NVIDIA GPU node.

## Step-by-step Instructions

1. **Add Helm Repositories:**
   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo add nvdp https://nvidia.github.io/k8s-device-plugin
   helm repo update
   ```
2. **Install DCGM Exporter:**
   This deploys a DaemonSet that runs on every GPU node to scrape hardware telemetry.
   ```bash
   helm install dcgm-exporter nvdp/dcgm-exporter
   ```
3. **Install Prometheus (Lightweight):**
   ```bash
   helm install prometheus prometheus-community/prometheus
   ```
4. **Port-Forward Prometheus Server:**
   ```bash
   kubectl port-forward svc/prometheus-server 9090:80
   ```
5. **Query a Metric:**
   Open a browser to `http://localhost:9090` and run this PromQL query:
   `DCGM_FI_DEV_GPU_TEMP`

## Verification

The Prometheus UI should return a graph or a table showing the current temperature of the GPU(s) in your cluster in Celsius.

## Troubleshooting

*   **No data returned for DCGM metrics:** The `dcgm-exporter` pods might be crashing. Ensure the node actually has an NVIDIA GPU and the proprietary drivers are installed on the host OS.
*   **Prometheus cannot scrape DCGM:** Check if the ServiceMonitor/Annotations are correctly configured. By default, the Helm chart usually adds the `prometheus.io/scrape: "true"` annotation.

## Cleanup

```bash
helm uninstall prometheus
helm uninstall dcgm-exporter
```

---

# Production Notes

*   **High Cardinality in LLM Metrics:** Be careful with histograms. vLLM exports latency metrics (like TTFT). If you add labels for `user_id` or `prompt_length_bucket`, the cardinality explodes, crashing your Prometheus server. Keep labels broad.
*   **Streaming API Considerations:** If your application uses HTTP Server-Sent Events (SSE) to stream tokens to the frontend, standard ingress controllers (like NGINX) might buffer the response. This ruins the user experience because they wait 5 seconds, and then the whole text appears at once. Ensure your Ingress/API Gateway is configured with `proxy_buffering off` for LLM routes.

---

# Common Mistakes

*   **Using "Requests Per Second" (RPS) as a primary capacity metric:** In standard web apps, RPS dictates capacity. In LLMs, it is meaningless. A request with a 10-token prompt and a 10-token response takes milliseconds. A request with a 10,000-token prompt (RAG context) and a 1000-token response takes massive compute. You must monitor **Tokens Per Second**, not Requests Per Second.
*   **Ignoring Power Draw:** Cloud providers charge a flat rate for a GPU VM, but if you run your own bare-metal datacenter, 8 H100s can draw over 8000 Watts. Monitoring `DCGM_FI_DEV_POWER_USAGE` is critical for capacity planning and preventing tripped breakers.

---

# Failure-Driven Learning

**Scenario:** You receive an alert: P99 TTFT has exceeded 5 seconds. You check the dashboard and see KV Cache utilization is at 100%.

**Diagnosis:**
1. You look at `vllm:num_requests_waiting`. It is climbing rapidly.
2. The KV Cache is full, meaning vLLM cannot accept any new requests into the continuous batching engine. It is forcing them to wait in the queue.

**Cause:**
Either you have a massive spike in traffic, or users are submitting prompts with incredibly long contexts (which consume KV Cache linearly).

**Recovery:**
Immediate mitigation: If KEDA is configured, the system should be spinning up new pods (though there is a cold-start delay).
Long-term fix: If users are consistently sending massive prompts, you must increase the cluster size, or configure vLLM to enforce a strict `--max-model-len` limit to prevent a few heavy users from starving the cache for everyone else.

---

# Engineering Decisions

**Defining Service Level Objectives (SLOs) for AI**
Platform Engineers must negotiate SLOs with product teams. You cannot guarantee a flat 2-second response time for AI.
*   *Bad SLO:* "99% of API requests will complete in under 3 seconds."
*   *Good SLO 1 (TTFT):* "95% of requests will receive the first token within 1.5 seconds."
*   *Good SLO 2 (Throughput):* "The system will generate output at a minimum rate of 30 tokens per second per active user."
By separating TTFT from Generation Speed, you accurately measure the perceived user experience.

---

# Best Practices

*   **Correlate Software and Hardware:** Always put software metrics (Tokens/sec) and hardware metrics (GPU Utilization, PCIe Bandwidth) on the same Grafana dashboard. A drop in tokens/sec without a drop in GPU utilization usually indicates a memory bottleneck or thermal throttling.
*   **Monitor GPU Memory Ecc Errors:** DCGM tracks ECC (Error Correction Code) memory errors (`DCGM_FI_DEV_ECC_DBE_VOL_TOTAL`). If a physical GPU starts experiencing double-bit errors, it is failing hardware. Drain the node and replace it immediately before the model starts hallucinating randomly.

---

# Troubleshooting Guide

## Issue 1: High Latency, but GPU utilization is low (e.g., 30%)

*   **Cause:** The application is likely bottlenecked *before* it hits the GPU. This is common if the CPU is maxed out preparing the data, or the tokenizer (which runs on the CPU) is a slow implementation.
*   **Diagnosis:** Check standard Node CPU utilization metrics. Check the network bandwidth.
*   **Solution:** Ensure you are using a fast tokenizer (like HuggingFace's Rust-based tokenizers). Ensure the host VM has enough CPU cores to feed data to the GPU efficiently.

---

# Summary

Observability in AI Platform Engineering requires a deep understanding of the full stack—from the physics of the silicon die (temperature, power, PCIe lanes) up to the mechanics of the LLM generation cycle (TTFT, Inter-Token Latency, KV Cache). By mastering tools like DCGM and vLLM's native metrics, engineers can guarantee SLA compliance, diagnose complex hardware bottlenecks, and precisely tune autoscaling policies.

---

# Cheat Sheet

*   **Key DCGM PromQL:** `DCGM_FI_DEV_GPU_UTIL` (GPU %), `DCGM_FI_DEV_FB_USED` (VRAM Used).
*   **Thermal Check PromQL:** `DCGM_FI_DEV_GPU_TEMP` (Temp in C), `DCGM_FI_DEV_CLOCK_THROTTLE_REASONS` (Is it throttling?).
*   **Key vLLM PromQL:** `vllm:gpu_cache_usage_perc` (KV Cache capacity).
*   **TTFT PromQL (P95):** `histogram_quantile(0.95, sum(rate(vllm:time_to_first_token_seconds_bucket[5m])) by (le))`

---

# Knowledge Check

## Multiple Choice Questions

1. Why is tracking "Requests Per Second" (RPS) inadequate for monitoring LLM capacity?
   * A) Because LLMs do not use HTTP.
   * B) Because the compute cost of a request varies wildly based on prompt length and generated token count.
   * C) Because Prometheus cannot scrape RPS accurately.
   * D) Because RPS only measures the prefill phase.

2. What does the metric "Time-To-First-Token" (TTFT) primarily indicate?
   * A) How fast the model can generate a paragraph of text.
   * B) The total time taken to download the model to the GPU.
   * C) The time spent waiting in the queue plus the time required to process the user's prompt (prefill phase).
   * D) The speed of the network connection between the user and the load balancer.

## Scenario Questions

You are monitoring a multi-node Kubernetes cluster running a massive 70B model using Tensor Parallelism across 4 GPUs on a single node. Generation speed (Tokens/Sec) suddenly drops by 80%. GPU Temperatures are normal (60C). GPU Utilization is high. VRAM is 50% full. What hardware metric should you check next using DCGM?

## Short Answer Questions

What is the purpose of the DCGM exporter in a Kubernetes environment?

<details>
<summary><b>View Answers</b></summary>

### Multiple Choice
1. **[B]** - A request asking for "yes or no" takes virtually zero compute compared to a request asking for a 5-page essay based on a 10,000-word context. Token throughput is the true measure of work.
2. **[C]** - TTFT represents the initial delay before the user sees any response. It comprises network latency, queue time, and the compute-heavy phase of reading and understanding the input prompt.

### Scenario
You should check the PCIe/NVLink bandwidth metrics (`DCGM_FI_DEV_NVLINK_BANDWIDTH_TOTAL` or similar). Because Tensor Parallelism requires constant, heavy communication between the 4 GPUs for every single mathematical layer, a failure in the NVLink bridge or a fallback to slow PCIe lanes will cause the GPUs to spend all their time waiting for data from each other, destroying generation speed even if temps and VRAM are fine.

### Short Answer
The DCGM (Data Center GPU Manager) exporter is a DaemonSet that runs on GPU-enabled nodes. It directly interfaces with the NVIDIA drivers and hardware to extract deep telemetry (temperature, power draw, clock speeds, ECC errors, NVLink status) and formats it for Prometheus to scrape, bridging the gap between hardware health and software monitoring.

</details>

---

# Interview Preparation

## Beginner Questions

* What is the difference between TTFT (Time-To-First-Token) and TPOT (Time-Per-Output-Token)?

## Intermediate Questions

* If your vLLM server's `gpu_cache_usage_perc` metric hits 100%, what happens to new incoming requests?

## Advanced Questions

* Explain how you would architect a Prometheus/Grafana alerting strategy to detect "Silent Hardware Failures" on GPUs (e.g., ECC errors or thermal degradation) before they impact user latency.

## Scenario-Based Discussions

* Your product manager wants to implement a hard SLA: "All LLM API responses must complete within 5 seconds." As a Platform Engineer, explain why this SLA is fundamentally flawed and propose a mathematically sound alternative based on generative AI mechanics.

<details>
<summary><b>View Answers</b></summary>

### Beginner
* **TTFT vs TPOT:** TTFT (Time-To-First-Token) is the latency before the very first word appears, encompassing queue time and processing the initial prompt. TPOT (Time-Per-Output-Token) is the speed at which subsequent words are generated one by one. TTFT feels like "loading time", while TPOT feels like "typing speed".

### Intermediate
* **Cache at 100%:** If the KV Cache is full, the server physically cannot process new concurrent sequences. New requests will be placed in a waiting queue (`vllm:num_requests_waiting`). If the queue gets too long or a timeout is reached, the API will start rejecting requests (HTTP 503 or 429).

### Advanced
* **Alerting on Silent Failures:** You must alert on DCGM metrics, not just software latency. Create a critical alert for `DCGM_FI_DEV_ECC_DBE_VOL_TOTAL > 0` (Double Bit Errors indicate failing VRAM and require immediate node cordoning). Create a warning alert if `DCGM_FI_DEV_CLOCK_THROTTLE_REASONS` indicates thermal slowing, even if the temperature hasn't hit the critical threshold yet, as this predicts HVAC failure or a clogged server vent before users notice the slowdown.

### Scenario-Based Discussions
* **Refuting the SLA:** The SLA is flawed because response time depends entirely on the requested output length. Generating a 5-token response might take 0.5 seconds, while a 2000-token response is physically impossible to generate in 5 seconds due to hardware memory bandwidth limits (the Memory Wall). I would propose two separate SLAs: 1) "95th percentile TTFT must be under 2 seconds," ensuring the system feels responsive, and 2) "TPOT must be under 50ms per token," ensuring the text generates fast enough for a human to read comfortably, regardless of the total length.

</details>

---

# Further Reading

1. [NVIDIA DCGM Documentation](https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/index.html)
2. [Monitoring vLLM](https://docs.vllm.ai/en/latest/serving/metrics.html)
3. [Understanding LLM Latency Metrics (Baseten Blog)](https://www.baseten.co/blog/llm-inference-performance-metrics-ttft-and-tpot/)
4. [Prometheus Query Language (PromQL) Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
