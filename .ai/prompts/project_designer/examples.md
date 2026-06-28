# Project Designer — Examples

Version: 1.0.0

---

# Purpose

This document demonstrates the exact project design mindset, workplace assignment philosophy, architectural sophistication, and portfolio presentation standards required of the Project Designer.

These examples teach you *how* to construct world-class engineering capstone projects by comparing **Flawed/Weak Project Design** (dry copy-paste tutorials, missing trade-offs, superficial portfolio tips) with **Excellent Project Design** (authentic enterprise mandates, elegant Mermaid diagrams, deep architectural trade-offs, elite portfolio tips).

---

# Example 1 — Business Scenario & Engineering Principles

## Weak Project Design (Copy-Paste Tutorial Style)
```markdown
# 1. Business Scenario

In this project, you will deploy a simple Kubernetes deployment containing an Nginx container. You will use `kubectl apply -f deployment.yaml` to create the pod and verify it runs. This helps you practice basic Kubernetes commands.
```

### Project Designer Critique
* **Critique:** This scenario fails the workplace assignment gate entirely. It reads like a basic, superficial terminal tutorial rather than an elite engineering project. It acts as a simple copy-paste exercise, provides zero enterprise business context, fails to require planning before implementation, and offers nothing worthy of a professional portfolio.

---

## Excellent Project Design (Enterprise Workplace Mandate Style)
```markdown
# 1. Business Scenario

You have been hired as the Lead Platform Engineer at a rapidly scaling global e-commerce enterprise. Currently, the enterprise operates 200 monolithic microservices across un-isolated virtual machines, resulting in severe configuration drift, massive weekly deployment outages ($450,000 in lost revenue per incident), and 45-minute developer onboarding times.

Executive leadership has mandated the design, bootstrapping, and verification of an automated, multi-tenant GitOps delivery engine on Kubernetes from scratch in 14 days. Your platform must empower 300 software developers to self-serve pristine, pre-governed microservice environments in under 3 minutes while strictly enforcing zero-trust container security policies.
```

### Project Designer Critique
* **Critique:** This scenario is a masterclass in enterprise project design. It places the learner directly into an authentic, high-stakes workplace assignment (bootstrapping an enterprise GitOps engine to stop massive financial outages). It establishes immediate motivation, enforces production relevance, and frames the project as a flagship portfolio showcase.

---

# Example 2 — Architecture Overview & Trade-Off Analysis

## Weak Project Design (Text-Dump Style)
```markdown
# 5. Architecture Overview

The architecture uses GitHub for storing code, ArgoCD for deploying files to Kubernetes, and Kyverno for checking security. When a developer pushes a commit, ArgoCD syncs it to the cluster.

# 7. Implementation Plan

Create this file `argocd-app.yaml` and apply it:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
spec:
  project: default
```
```

### Project Designer Critique
* **Critique:** This section catastrophically fails our architectural standards and engineering principles. It lacks a Mermaid system diagram, dumps a basic YAML file without requiring initial design planning, and completely skips evaluating structural architectural trade-offs.

---

## Excellent Project Design (Architectural Blueprint Style)
```markdown
# 5. Architecture Overview

Let's examine the master decoupled system topology for our Enterprise GitOps Delivery Engine.

```mermaid
flowchart TD
    subgraph DeveloperPortal [Layer 1: Self-Service Engine (Backstage)]
        DEV["Software Developer"]
        TMPL["Software Template (kind: Template)"]
        DEV --> |Scaffolds Microservice| TMPL
    end

    subgraph GitOpsEngine [Layer 2: GitOps Automation (ArgoCD)]
        REPO["Git Repository (tier: golden-path)"]
        ARGO["ArgoCD ApplicationSet (selfHeal: true)"]
        TMPL --> |Pushes Clean Manifests| REPO
        REPO --> |Webhooks / Polling| ARGO
    end

    subgraph ClusterTarget [Layer 3: Multi-Tenant Cluster Target (AWS EKS)]
        KYV["Kyverno ClusterPolicy (validationFailureAction: Enforce)"]
        POD["Application Pod (runAsNonRoot: true)"]
        ARGO --> |Attempts Sync| KYV
        KYV --> |Evaluates Least-Privilege| POD
    end
```

## 7. Implementation Plan (Planning Before Implementation)

Before writing terminal commands or code manifests, we must evaluate our core architectural trade-offs and draft our delivery strategy!

### Phase 1: Architectural Trade-Off Analysis
* **ArgoCD ApplicationSet vs. Standalone Application Manifests:** Standalone Application manifests are simple to configure but require manual YAML creation for every new microservice. In an enterprise with 200 microservices, this introduces severe management overhead and copy-paste errors. ArgoCD `ApplicationSet` manifests allow us to use a single templated generator (`git` directory generator) to automatically discover and deploy all microservices dynamically. I selected `ApplicationSet` to guarantee zero-touch onboarding for our 300 developers.
* **Kyverno Admission Controller vs. Open Policy Agent (OPA) Gatekeeper:** OPA Gatekeeper is highly versatile but requires writing complex policies in a proprietary language (Rego), creating a steep learning curve for junior platform engineers. Kyverno allows us to write powerful validating and mutating admission policies using native Kubernetes YAML (`kind: ClusterPolicy`). I selected Kyverno to ensure long-term maintainability and seamless peer review across our engineering team.

### Phase 2: Bootstrapping the Governance Engine
We will begin our technical execution by deploying our foundational Kyverno admission policy to physically block privileged container execution across the cluster:
```bash
cat << 'EOF' > clusterpolicy.yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: enforce-least-privilege-security
spec:
  validationFailureAction: Enforce # Forcefully reject non-compliant pods!
  rules:
    - name: prevent-root-containers
      match:
        resources:
          kinds:
            - Pod
      validate:
        message: "Severe Security Alarm: Application Pods must execute as non-root (runAsNonRoot: true)!"
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true
EOF
kubectl apply -f clusterpolicy.yaml
```
```

### Project Designer Critique
* **Critique:** This section perfectly embodies our engineering principles (`Production Inspired`, `Planning Before Implementation`, `Include Trade-Offs`, `Encourage Automation`). It features an elegant, beautifully decoupled Mermaid system diagram, thoroughly evaluates structural trade-offs between ArgoCD ApplicationSets and standalone manifests, and details pristine, highly secure configuration code (`validationFailureAction: Enforce`).

---

# Example 3 — Portfolio Presentation Tips

## Weak Project Design (Superficial Tips)
```markdown
# 12. Portfolio Presentation Tips

Put this code on GitHub and add a link to your resume. You can tell interviewers you know how to use ArgoCD and Kubernetes.
```

### Project Designer Critique
* **Critique:** This provides zero professional value. Telling a learner to "put this on GitHub and add a link" fails to teach them how to structure an executive portfolio, craft verified resume bullet points, or navigate high-stakes system design whiteboard interviews.

---

## Excellent Project Design (Executive Portfolio Pillars)
```markdown
# 12. Portfolio Presentation Tips

To secure top-tier Staff, Principal, or Senior Platform Engineering roles, you must present this completed project as an elite, verified enterprise capstone. Here is how to showcase your work across five professional pillars:

## 1. GitHub Repository Architecture
* **Pristine README:** Structure your repository root `README.md` to include your Mermaid system architecture diagram, your business scenario, and explicit setup instructions.
* **Professional Directory Layout:** Organize your codebase into clean horizontal layers (`config/`, `scripts/`, `src/`, `tests/`) rather than dumping all YAML files into the root directory.

## 2. Personal Portfolio Framing
* **Flagship Showcase:** Frame this project as a flagship enterprise case study. Title it: *"Building an Automated Multi-Tenant GitOps Platform for 300 Developers."* Highlight your automated verification scripts (`verify-project.sh`) to prove production readiness.

## 3. Technical Blog Article
* **Focus on Trade-Offs:** Write a dedicated technical article titled: *"Why We Chose Kyverno over OPA Gatekeeper for Enterprise Kubernetes Governance."* Use your trade-off analysis from Phase 1 to demonstrate deep architectural maturity and thought leadership.

## 4. Executive Resume Bullet Points
Inject verified, quantitative STAR achievement bullet points directly into your resume:
* *"Architected an automated multi-tenant GitOps delivery engine using ArgoCD ApplicationSets, reducing microservice onboarding times from 45 minutes to 3 minutes (15x developer velocity acceleration)."*
* *"Enforced zero-trust container security across 200 microservices by deploying Kyverno ClusterPolicies (`validationFailureAction: Enforce`), physically eliminating privileged container escape risks."*

## 5. System Design Interview Discussion
When a Chief Architect or VP of Engineering asks you to whiteboard an internal developer platform, structure your answer using the Four-Tier Architectural Model:
* **Tier 1 (Scope):** Establish the enterprise scale (200 microservices, 300 developers, 99.99% availability SLA).
* **Tier 2 (Topology):** Whiteboard your decoupled layers (Backstage Portal -> Git Golden Path -> ArgoCD ApplicationSet -> Kyverno Enforcement).
* **Tier 3 (Bottlenecks):** Explain how you solved configuration drift via automated self-healing (`selfHeal: true`).
* **Tier 4 (Trade-Offs):** Articulate your structural architectural decisions (e.g., why you chose ApplicationSets over standalone manifests to prevent copy-paste errors).
```

### Project Designer Critique
* **Critique:** This section turns a technical project into an indispensable career asset. It provides actionable, world-class guidance across GitHub, personal portfolios, technical blogs, resumes (featuring exact quantitative STAR bullet points), and high-stakes system design whiteboard interviews.
