# Executable Learning Order

Version: 2.0.0

Purpose: Step-by-step sequential execution path mapping modules to estimated study durations, learning tracks, and capability outcomes. Optimized for mastery learning and low cognitive load.

Required Inputs: Curriculum specification, learning tracks, progression stages.

Outputs: Chronological study plan for learners and execution queue for AI generators.

---

# Phase 1: Foundational Systems (Estimated Duration: 5 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `MOD-LINUX-BEG` | Getting Started with Linux | 🟢 Core | 10 Hours | Install Linux, navigate terminal, manage files |
| **02** | `MOD-LINUX-ADM` | Linux Administration | 🟢 Core / 🔵 Prof | 15 Hours | Administer servers, manage permissions, write basic bash |
| **03** | `MOD-LINUX-INT` | Linux Internals | 🔵 Prof / 🟣 Exp | 15 Hours | Debug system calls (`strace`), inspect cgroups/namespaces |
| **04** | `MOD-NET` | Networking Fundamentals | 🟢 Core / 🔵 Prof | 14 Hours | Setup reverse proxies (Nginx) and DNS routing |
| **05** | `MOD-GIT` | Version Control with Git | 🟢 Core / 🔵 Prof | 10 Hours | Resolve merge conflicts and automate pre-commit hooks |

---

# Phase 2: Containerization & Security (Estimated Duration: 3 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **06** | `MOD-DOCKER` | Containers & Docker | 🟢 Core / 🔵 Prof | 16 Hours | Build optimized multi-stage container microservices |
| **07** | `MOD-SEC` | Security Fundamentals | 🟢 Core / 🔵 Prof | 12 Hours | Scan containers for CVEs and manage encrypted secrets |

---

# Phase 3: Infrastructure Automation (Estimated Duration: 4 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **08** | `MOD-TF` | Infrastructure as Code (Terraform) | 🟢 Core / 🔵 Prof | 18 Hours | Provision modular, versioned cloud infrastructure |
| **09** | `MOD-CLOUD` | Cloud Platforms & Architecture | 🟢 Core / 🔵 Prof | 14 Hours | Architect highly available, secure Cloud VPC foundations |

---

# Phase 4: Orchestration & CI/CD (Estimated Duration: 5 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10** | `MOD-K8S` | Kubernetes Engineering | 🟢 Core / 🔵 Prof / 🟣 Exp | 26 Hours | Deploy and scale production Kubernetes clusters |
| **11** | `MOD-CICD` | CI/CD Pipelines & Automation | 🟢 Core / 🔵 Prof | 16 Hours | Build GitOps automated build/scan/deploy pipelines |

---

# Phase 5: Observability & Reliability (Estimated Duration: 4 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **12** | `MOD-OBS` | Observability (PromQL/Grafana) | 🟢 Core / 🔵 Prof / 🟣 Exp | 18 Hours | Design mission-critical PromQL/Grafana dashboards |
| **13** | `MOD-SRE` | Site Reliability Engineering | 🟢 Core / 🔵 Prof | 14 Hours | Manage incident lifecycles and calculate error budgets |

---

# Phase 6: AI Infrastructure & MLOps (Estimated Duration: 5 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **14** | `MOD-AI` | AI Infrastructure & LLM Serving | 🟢 Core / 🔵 Prof / 🟣 Exp | 24 Hours | Deploy auto-scaling vLLM GPU inference engines |
| **15** | `MOD-MLOPS` | MLOps & Vector Databases | 🟢 Core / 🔵 Prof | 16 Hours | Deploy distributed vector DBs and RAG ingestion pipelines|

---

# Phase 7: Enterprise Platforms & Capstones (Estimated Duration: 6 Weeks)

| Seq | Module ID | Module Title | Track Scope | Est. Duration | Major Capability Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **16** | `MOD-IDP` | Internal Developer Platforms | 🔵 Prof / 🟣 Exp | 20 Hours | Build self-service developer portal with Golden Paths |
| **17** | `MOD-ADV` | Advanced Systems & Scaling | 🟣 Expert | 14 Hours | Architect active-active multi-region cluster topologies |
| **18** | `MOD-CAP` | Capstone Portfolio | 🔵 Prof / 🟣 Exp | 30 Hours | Deliver two enterprise production architectural blueprints|
| **19** | `MOD-CAR` | Career & System Design | 🔵 Professional | 16 Hours | Articulate whiteboard trade-offs in engineering interviews|
