# LEARNING OBJECTIVES & CAPABILITY MASTER MATRIX

Version: 2.0.0

# Graduate Profile & Transformation Journey

By completing this curriculum, learners undergo a comprehensive professional transformation from complete beginners with zero Linux experience into highly confident, production-ready Platform Engineers and AI Infrastructure Engineers.

The learning journey follows a clear evolution:
**Beginner → Linux User → Linux Administrator → Infrastructure Engineer → Platform Engineer → Senior Platform Engineer → AI Infrastructure Engineer**

Graduates possess the practical capabilities, deep conceptual intuition, and verifiable portfolio required to operate modern enterprise platforms with absolute confidence.

---

# Capability Statements & Technical Competencies

Every module is organized around an explicit, verifiable **Capability Statement** answering: *"If the learner finishes this module, what can they confidently do that they couldn't do before?"*

## Stage 1: IT Foundations

### Getting Started with Linux (`MOD-LINUX-BEG`)
* **Capability Statement:** "I can install Linux, navigate the terminal, and manage files."
* **Core Skills:** Shell navigation, directory structure creation, basic text viewing (`cat`), and searching (`grep`).

### Linux Administration (`MOD-LINUX-ADM`)
* **Capability Statement:** "I can administer a Linux server, manage permissions, automate simple tasks, and troubleshoot common issues."
* **Core Skills:** Multi-user permission management (`chmod`, `chown`), process inspection (`ps`, `top`, `kill`), daemon configuration (`systemctl`), and basic Bash automation.

### Linux Internals (`MOD-LINUX-INT`)
* **Capability Statement:** "I understand how Linux works internally and can debug complex system behavior."
* **Core Skills:** System call interception (`strace`), `/proc` filesystem inspection, resource isolation (`cgroups v2`), and kernel namespaces.

### Networking Fundamentals (`MOD-NET`)
* **Capability Statement:** "I can configure network connections, manage DNS, set up a secure web proxy, and analyze network traffic."
* **Core Skills:** TCP/IP socket mechanics, IP subnetting, CoreDNS routing, Nginx/Envoy reverse proxies, TLS encryption, and packet analysis (`tcpdump`, Wireshark).

### Version Control with Git (`MOD-GIT`)
* **Capability Statement:** "I can track code changes, collaborate with engineering teams, resolve conflicts, and automate commit workflows."
* **Core Skills:** Git internal trees, Trunk-Based vs. GitFlow strategies, interactive rebasing, merge conflict resolution, and pre-commit hook automation.

---

## Stage 2: Core Platform Engineering

### Containers & Docker (`MOD-DOCKER`)
* **Capability Statement:** "I can containerize applications, build highly optimized images, and manage multi-container microservices."
* **Core Skills:** Container virtualization mechanics, multi-stage optimized Dockerfiles, Docker Compose orchestration, and volume storage persistence.

### Security Fundamentals (`MOD-SEC`)
* **Capability Statement:** "I can secure container workloads, manage infrastructure secrets safely, and verify software supply chains."
* **Core Skills:** Threat modeling, container vulnerability scanning (Trivy), secret encryption (SOPS/Vault), and supply chain provenance (SLSA, SBOMs).

---

## Stage 3: Cloud & Infrastructure Automation

### Infrastructure as Code (Terraform) (`MOD-TF`)
* **Capability Statement:** "I can provision immutable cloud infrastructure using declarative code and build reusable Terraform modules."
* **Core Skills:** HCL declarative syntax, remote state backends, dynamic state locking, reusable module architecture, and GitOps refactoring.

### Cloud Platforms & Architecture (`MOD-CLOUD`)
* **Capability Statement:** "I can design secure, highly available cloud foundation architectures and manage cloud access governance."
* **Core Skills:** Cloud VPC design, public/private subnetting, least-privilege IAM roles, highly available object storage, and FinOps cost optimization.

---

## Stage 4: Containerization & Orchestration

### Kubernetes Engineering (`MOD-K8S`)
* **Capability Statement:** "I can deploy, scale, operate, and troubleshoot production-grade Kubernetes cluster environments."
* **Core Skills:** Control plane reconciliation loops, Deployments, Services, Ingress controllers, Persistent Volume Claims (PVCs), ConfigMaps/Secrets, workload autoscaling (HPA, VPA, KEDA), and crash diagnostics.

### CI/CD Pipelines & Automation (`MOD-CICD`)
* **Capability Statement:** "I can build automated CI/CD pipelines that build, test, scan, and deploy applications using GitOps principles."
* **Core Skills:** Declarative GitHub Actions workflows, automated container build/scan pipelines, progressive delivery (Canary, Blue/Green), and rollback automation (ArgoCD).

---

## Stage 5: Observability & Reliability

### Observability (Prometheus & Grafana) (`MOD-OBS`)
* **Capability Statement:** "I can instrument distributed systems with metrics, logs, and traces, and build mission-critical dashboards."
* **Core Skills:** Three pillars (Metrics, Logs, Traces), Prometheus PromQL time-series instrumentation, dynamic Grafana dashboard design, OpenTelemetry distributed tracing, and AlertManager routing.

### Site Reliability Engineering (SRE) (`MOD-SRE`)
* **Capability Statement:** "I can manage production incident lifecycles, calculate error budgets, and conduct blameless root cause analyses."
* **Core Skills:** SLI/SLO/SLA error budget calculations, incident command workflows, structured blameless postmortems (RCAs), and Chaos Engineering.

---

## Stage 6: AI Infrastructure

### AI Infrastructure & LLM Serving (`MOD-AI`)
* **Capability Statement:** "I can deploy, serve, autoscale, and monitor production LLM inference engines on GPU-enabled Kubernetes clusters."
* **Core Skills:** AI hardware architecture (GPUs, CUDA, Memory Bandwidth), local Ollama runtimes, production vLLM serving with continuous batching, KEDA event-driven GPU autoscaling, and LLM telemetry monitoring (TTFT, throughput).

### MLOps & Vector Databases (`MOD-MLOPS`)
* **Capability Statement:** "I can build highly scalable Retrieval-Augmented Generation (RAG) infrastructure and deploy vector database clusters."
* **Core Skills:** RAG infrastructure pipeline design, vector database deployment (Qdrant, Milvus, pgvector), automated model weight ingestion, and MLOps artifact provenance.

---

## Stage 7: Enterprise Platform Engineering

### Internal Developer Platforms (IDPs) (`MOD-IDP`)
* **Capability Statement:** "I can design self-service developer portals that provide automated infrastructure scaffolding and golden paths."
* **Core Skills:** Developers-as-customers principles, Backstage developer portals, automated software templates, golden paths, and DevEx telemetry.

### Advanced Systems & Scaling (`MOD-ADV`)
* **Capability Statement:** "I can architect multi-region distributed platform topologies and manage high-throughput distributed systems."
* **Core Skills:** Highly available multi-region active-active architectures, distributed caching/sharding, and Kubernetes Cluster Mesh.

---

## Stage 8 & 9: Synthesis & Career Mastery

### Capstone Portfolio (`MOD-CAP`)
* **Capability Statement:** "I can synthesize end-to-end curriculum knowledge into production-grade architectural blueprints and portfolio assets."
* **Core Skills:** Building complete, reproducible Enterprise IDPs and Scalable AI Inference Engines from scratch.

### Career & System Design (`MOD-CAR`)
* **Capability Statement:** "I can articulate complex architectural trade-offs on a whiteboard and confidently navigate engineering interviews."
* **Core Skills:** Structured system design frameworks, whiteboard architecture presentations, behavioral communication, and portfolio refinement.

---

# Learning Tracks

Every lesson is divided into three optional depth levels to accommodate diverse learner backgrounds:

* 🟢 **Core:** Essential theory, fundamental commands, and foundational labs. Required for all students.
* 🔵 **Professional:** Production practices, troubleshooting workflows, real-world edge cases, and portfolio projects.
* 🟣 **Expert:** System internals, performance optimization, advanced architecture deep dives, and research topics.

---

# Final Graduate Outcome

A graduate who completes the Core and Professional tracks—and optionally completes the Proof of Competency capstones—possesses the verifiable capabilities, elite portfolio, and absolute confidence required to excel in modern Platform Engineering, DevOps, Cloud Engineering, Site Reliability Engineering, and AI Infrastructure roles.
