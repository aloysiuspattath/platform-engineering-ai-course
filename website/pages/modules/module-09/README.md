# Module 09: Cloud Platforms & Architecture (`MOD-CLOUD`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 09: Cloud Platforms & Architecture**!

In Module 08, you mastered the declarative provisioning engine of Infrastructure as Code (IaC) using HashiCorp Terraform. You understand how to author HCL manifests, manage remote S3 state backends with DynamoDB distributed locking, and refactor existing cloud configurations without destroying physical production hardware.

Now, we must put your Terraform engine to work by architecting the master foundation of enterprise technology: **The Public Cloud (AWS, Azure, GCP)**.

Operating a high-scale enterprise cloud environment is fundamentally different from running an application on a single local server or small VPS. The public cloud offers nearly infinite compute, storage, and networking capacity, but this immense power introduces significant architectural complexity.

If you design a cloud environment without strict network segmentation, your internal databases are exposed to the public internet. If you fail to enforce rigorous Identity and Access Management (IAM) governance, a compromised developer credential allows attackers to delete your entire company. If you deploy resources without highly available multi-Availability Zone (Multi-AZ) topologies, a single data center power outage causes total platform downtime. And if you provision resources without continuous FinOps governance, your monthly cloud bill can skyrocket to hundreds of thousands of dollars overnight.

This module bridges your IaC capabilities directly into production-grade cloud foundation architecture. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract networking and IAM governance mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable cloud architectural capabilities.

---

# Capability Statement

> **"I can design secure, highly available cloud foundation architectures and manage cloud access governance."**

By the end of this module, you will establish the essential cloud engineering capabilities required to architect highly available Virtual Private Clouds (VPCs), calculate custom Classless Inter-Domain Routing (CIDR) subnets, enforce Zero-Trust IAM governance (RBAC, SCPs, OIDC dynamic federation), design resilient Multi-AZ object storage solutions, and implement automated FinOps cloud cost management controls.

---

# Essential Module Anchors

* **Why am I learning this?** Every major modern enterprise platform runs on top of public cloud infrastructure. If you cannot design a secure VPC, manage IAM role governance, or design for multi-region failure, you cannot operate as a Platform Engineer.
* **How will I use it?** You will use these exact skills to write Terraform HCL code that provisions isolated VPCs (`aws_vpc`), configure dynamic OIDC IAM roles (`aws_iam_role`), configure encrypted S3 storage buckets (`aws_s3_bucket`), and implement automated budget alerts (`aws_budgets_budget`).
* **Where does this fit into Platform Engineering?** Cloud platforms form the base foundation of Stage 3 (Cloud Core & Multi-Cloud Architectures). This is the physical cloud layer upon which your Kubernetes clusters (Stage 4), monitoring stacks (Stage 5), and AI GPU inference engines (Stage 6) are deployed.
* **What problem does it solve?** It solves the critical enterprise challenges of single points of failure, public network exposure, credential theft, and unmanaged cloud financial waste.
* **Where will I use it later?** You will use these skills directly in Module 10 (Deploying Amazon EKS Kubernetes Clusters into VPC Subnets), Module 11 (OIDC Dynamic Role Assumption in CI/CD GitOps Pipelines), Module 14 (Provisioning Auto-scaling AI GPU Node Groups), and Module 17 (Architecting Multi-Region Active-Active Platform Topologies).

---

# Lesson Directory

This module consists of four progressive, highly instructional lessons:

1. **[MOD-CLOUD-01: Cloud Virtualization, Virtual Private Clouds (VPCs) & Subnetting](lesson-01.md)**
2. **[MOD-CLOUD-02: Identity and Access Management (IAM) Governance](lesson-02.md)**
3. **[MOD-CLOUD-03: Cloud Object Storage & Highly Available Architectures](lesson-03.md)**
4. **[MOD-CLOUD-04: FinOps & Cost-Conscious Infrastructure Design](lesson-04.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 35%
* **Intermediate:** 50%
* **Advanced:** 15%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational cloud networking and IAM governance intuition before advancing into highly available storage topologies and advanced FinOps cost optimizations.*
