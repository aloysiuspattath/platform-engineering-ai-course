# Comprehensive Module Map

Version: 2.0.0

Purpose: Structural matrix mapping modules to primary capability statements, career milestones, target technologies, and completion verification artifacts. Optimized for mastery learning.

Required Inputs: Curriculum directory, course specifications, career milestones.

Outputs: Authoritative validation map for downstream QA and technical review agents.

---

# Foundational Core Map

| Module ID | Career Milestone | Core Technologies | Target Capability Statement | Verification Artifact |
| :--- | :--- | :--- | :--- | :--- |
| `MOD-LINUX-BEG` | Milestone 1 (IT Foundations) | Linux CLI, Shell Navigation | "I can install Linux, navigate the terminal, and manage files." | `labs/linux-getting-started.md` |
| `MOD-LINUX-ADM` | Milestone 1 (IT Foundations) | Permissions, `systemctl`, `ps` | "I can administer a Linux server, manage permissions, and automate simple tasks." | `labs/linux-administration.md` |
| `MOD-LINUX-INT` | Milestone 1 (IT Foundations) | `strace`, cgroups, namespaces | "I understand how Linux works internally and can debug complex system behavior." | `labs/linux-internals-debugging.md` |
| `MOD-NET` | Milestone 1 (IT Foundations) | TCP/IP, DNS, TLS, Wireshark | "I can configure network connections, manage DNS, and set up a secure web proxy." | `labs/network-proxy-dns.md` |
| `MOD-GIT` | Milestone 1 (IT Foundations) | Git, GitHub, Git Hooks | "I can track code changes, collaborate with engineering teams, and resolve conflicts." | `labs/git-collaboration.md` |

---

# Infrastructure & Orchestration Map

| Module ID | Career Milestone | Core Technologies | Target Capability Statement | Verification Artifact |
| :--- | :--- | :--- | :--- | :--- |
| `MOD-DOCKER` | Milestone 2 (Infra Eng) | Docker, Docker Compose | "I can containerize applications, build highly optimized images, and manage microservices."| `projects/container-stack.md` |
| `MOD-SEC` | Milestone 2 (Infra Eng) | Trivy, SOPS, Cosign, SLSA | "I can secure container workloads, manage infrastructure secrets safely, and verify SBOMs." | `labs/security-hardening.md` |
| `MOD-TF` | Milestone 3 (Cloud & DevOps) | Terraform, HCL, OpenTofu | "I can provision immutable cloud infrastructure using declarative code and build reusable modules."| `projects/terraform-infra.md` |
| `MOD-CLOUD` | Milestone 3 (Cloud & DevOps) | Cloud VPC, IAM, S3, FinOps | "I can design secure, highly available cloud foundation architectures and manage access governance."| `labs/cloud-foundation.md` |
| `MOD-K8S` | Milestone 4 (K8s Eng) | Kubernetes, KEDA, Helm | "I can deploy, scale, operate, and troubleshoot production-grade Kubernetes cluster environments."| `projects/k8s-platform.md` |
| `MOD-CICD` | Milestone 3 & 4 (DevOps/K8s) | GitHub Actions, ArgoCD | "I can build automated CI/CD pipelines that build, test, scan, and deploy applications via GitOps."| `labs/cicd-pipeline.md` |

---

# Reliability, AI & Platform Architecture Map

| Module ID | Career Milestone | Core Technologies | Target Capability Statement | Verification Artifact |
| :--- | :--- | :--- | :--- | :--- |
| `MOD-OBS` | Milestone 5 (Observability) | Prometheus, Grafana, OTel | "I can instrument distributed systems with metrics, logs, and traces, and build dashboards." | `projects/observability-stack.md` |
| `MOD-SRE` | Milestone 5 (Observability) | SLO/SLI models, Chaos Mesh| "I can manage production incident lifecycles, calculate error budgets, and conduct blameless RCAs."| `labs/sre-incident.md` |
| `MOD-AI` | Milestone 6 (AI Infra Eng) | vLLM, Ollama, CUDA, GPUs | "I can deploy, serve, autoscale, and monitor production LLM inference engines on GPU clusters." | `projects/ai-inference-platform.md` |
| `MOD-MLOPS` | Milestone 6 (AI Infra Eng) | Qdrant, pgvector, RAG | "I can build highly scalable Retrieval-Augmented Generation (RAG) infrastructure and vector DBs." | `labs/rag-infrastructure.md` |
| `MOD-IDP` | Milestone 7 (Senior Platform) | Backstage, Golden Paths | "I can design self-service developer portals that provide automated infrastructure scaffolding." | `projects/idp-platform.md` |
| `MOD-ADV` | Milestone 7 (Senior Platform) | Cluster Mesh, Sharding | "I can architect multi-region distributed platform topologies and manage high-throughput systems." | `labs/advanced-scaling.md` |
| `MOD-CAP` | All Milestones | Full Stack Synthesis | "I can synthesize end-to-end curriculum knowledge into production-grade architectural blueprints."| `projects/capstone-master.md` |
| `MOD-CAR` | All Milestones | System Design Frameworks | "I can articulate complex architectural trade-offs on a whiteboard and navigate interviews." | `labs/system-design-prep.md` |
