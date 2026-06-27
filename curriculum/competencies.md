# Observable & Measurable Competencies

Version: 2.0.0

Purpose: Unambiguous specification of observable engineering behaviors, capabilities, and execution standards required for curriculum mastery. Optimized for mastery learning and capability verification.

Required Inputs: Learning objectives, skill matrix, career milestones.

Outputs: Concrete evaluation rubrics for downstream Quiz Generator and QA Reviewer agents.

---

# Competency Evaluation Framework

Every technical competency in this curriculum must be demonstrable through observable actions rather than theoretical memorization. Reviewers and automated validation scripts will evaluate learners against the following explicit capability statements.

---

# 1. Linux Foundations & Internals Competency (`MOD-LINUX-BEG`, `MOD-LINUX-ADM`, `MOD-LINUX-INT`)

## Observable Capabilities
* **System Interaction:** The learner can install a Linux environment, navigate the terminal, create directory structures, and inspect file contents using basic pipes (`cat`, `grep`, `ls`) without UI interaction.
* **Server Administration:** The learner can manage user permissions (`chmod`, `chown`), inspect active processes (`ps`, `top`, `kill`), and configure system daemons (`systemctl`).
* **Advanced Diagnostics:** The learner can intercept application system calls using `strace` to debug failing processes and identify active cgroups and kernel namespaces in a running system.
* **Production Automation:** The learner can write an idempotent Bash script that automates service health checks, logs output to syslog, and executes on a schedule via Systemd timers.

---

# 2. Networking & Version Control Competency (`MOD-NET`, `MOD-GIT`)

## Observable Capabilities
* **Traffic Debugging:** The learner can intercept, inspect, and analyze TCP packet handshakes and DNS lookups using `tcpdump` and Wireshark to isolate network failure root causes.
* **Secure Proxies:** The learner can deploy and configure an Nginx or Envoy reverse proxy enforcing strict TLS 1.3 encryption, custom headers, and upstream load balancing.
* **Git Reconciliation:** The learner can cleanly resolve complex merge conflicts, perform interactive git rebases, and design automated pre-commit linting pipelines.

---

# 3. Containerization & Security Competency (`MOD-DOCKER`, `MOD-SEC`)

## Observable Capabilities
* **Optimized Packaging:** The learner can refactor a monolithic Dockerfile into a secure, multi-stage build that reduces image size by at least 50% and executes as a non-root user.
* **Vulnerability Mitigation:** The learner can integrate container vulnerability scanning tools (Trivy/Clair) into a local workflow to detect and remediate CVEs prior to image registry push.
* **Secret Governance:** The learner can manage infrastructure credentials securely using SOPS or HashiCorp Vault, ensuring zero cleartext secrets exist in Git repositories.

---

# 4. Infrastructure as Code & Cloud Competency (`MOD-TF`, `MOD-CLOUD`)

## Observable Capabilities
* **Declarative Provisioning:** The learner can write clean, modular Terraform HCL code to provision a secure 3-tier Virtual Private Cloud (VPC) with public/private subnets and NAT gateways.
* **State Management:** The learner can configure secure, encrypted remote state backends (S3/GCS) with dynamic state locking (DynamoDB) to prevent race conditions during CI/CD execution.
* **Cloud Governance:** The learner can design least-privilege IAM roles and security groups that permit only explicitly required ingress/egress port communication.

---

# 5. Kubernetes & CI/CD Competency (`MOD-K8S`, `MOD-CICD`)

## Observable Capabilities
* **Cluster Deployment:** The learner can deploy a highly available, multi-node Kubernetes application environment utilizing Custom Resource Definitions (CRDs), Helm charts, and Ingress controllers.
* **Autoscaling Mechanics:** The learner can configure Horizontal Pod Autoscalers (HPA) and KEDA event-driven scalars that dynamically provision replica sets based on custom metrics.
* **GitOps Execution:** The learner can construct a complete GitHub Actions or ArgoCD pipeline that automatically builds, scans, tests, and deploys containerized applications upon Git merge.

---

# 6. Observability & SRE Competency (`MOD-OBS`, `MOD-SRE`)

## Observable Capabilities
* **Telemetry Instrumentation:** The learner can configure Prometheus scrape targets and OpenTelemetry collectors to gather application metrics, structured logs, and distributed traces.
* **Mission-Critical Dashboards:** The learner can design dynamic Grafana dashboards using PromQL to visualize P99 latency, error rates, and resource saturation.
* **Incident Command:** The learner can calculate Service Level Objective (SLO) error budgets and conduct a structured, blameless postmortem following a simulated production outage.

---

# 7. AI Infrastructure & MLOps Competency (`MOD-AI`, `MOD-MLOPS`)

## Observable Capabilities
* **Enterprise Inference Serving:** The learner can deploy a production-ready vLLM or Ollama inference container to a Kubernetes cluster, configuring correct GPU memory limits and continuous batching parameters.
* **RAG Architecture:** The learner can provision a highly available vector database cluster (Qdrant/pgvector) and construct an automated data ingestion pipeline for Retrieval-Augmented Generation.
* **AI Telemetry:** The learner can monitor LLM Time-To-First-Token (TTFT), token generation throughput, and GPU hardware utilization via custom Prometheus metrics.

---

# 8. Enterprise Platform Engineering Competency (`MOD-IDP`, `MOD-ADV`, `MOD-CAP`, `MOD-CAR`)

## Observable Capabilities
* **Golden Path Scaffolding:** The learner can design a self-service Internal Developer Platform (IDP) portal that enables developers to scaffold, provision, and deploy an application within 5 minutes.
* **Developer Experience (DevEx):** The learner can implement telemetry and tracking mechanisms to measure platform adoption, deployment frequency, and lead time for changes across engineering teams.
* **System Architecture Presentation:** The learner can articulate complex architectural trade-offs, scaling bottlenecks, and failure modes on a whiteboard during an engineering system design interview.
