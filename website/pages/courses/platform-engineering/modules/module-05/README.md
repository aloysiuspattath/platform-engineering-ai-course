# Module 05: Version Control with Git (`MOD-GIT`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 05: Version Control with Git**!

In Modules 01 through 04, you established the foundational operating system mechanics and networking plumbing required to manage standalone Linux servers, construct container namespaces, inspect IP routing tables, configure edge reverse proxies, and capture live wire packets.

However, in modern enterprise cloud platforms, administrators no longer manually log into individual servers via SSH to type configuration commands or edit plain-text files. Modern infrastructure is designed, reviewed, deployed, and audited entirely as **Code**. Whether you are writing Terraform modules, Kubernetes deployment manifests, Python AI inference microservices, or GitHub Actions pipelines, your entire engineering workflow relies on a single, legendary master engine of collaboration: **Git**.

This module bridges your standalone system administration knowledge directly into enterprise GitOps workflows. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract Git tree mechanics with crystal-clear real-world analogies, and ensuring you develop elite, verifiable version control capabilities.

---

# Capability Statement

> **"I can track code changes, collaborate with engineering teams, resolve conflicts, and automate commit workflows."**

By the end of this module, you will establish the essential version control engineering capabilities required to inspect raw Git commit objects, execute interactive rebases (`git rebase -i`), resolve complex merge conflicts cleanly, and automate code quality checks using pre-commit hooks across distributed enterprise teams.

---

# Essential Module Anchors

* **Why am I learning this?** Modern infrastructure is written as code. Git is the operating system of engineering collaboration. If you cannot track changes, branch code, or resolve merge conflicts, you cannot collaborate in a modern engineering team.
* **How will I use it?** You will use these exact skills to inspect Git commit histories (`git log`), create feature branches (`git checkout -b`), perform interactive squashing (`git rebase -i`), resolve merge conflict markers (`<<<<<<<`), and enforce pre-commit linting hooks (`.git/hooks/pre-commit`).
* **Where does this fit into Platform Engineering?** Git is the core engine behind GitOps, CI/CD pipelines (Stage 4), and automated infrastructure deployments. Every single Terraform module or Kubernetes manifest you write will be stored, reviewed, and deployed via Git.
* **What problem does it solve?** Manual code sharing, lost file versions, accidental configuration overwrites, and uncoordinated engineering changes cause catastrophic production outages. Git provides an immutable, cryptographically verified historical ledger of every single line of code ever written.
* **Where will I use it later?** You will use these skills directly in Module 08 (Terraform Module Management), Module 11 (CI/CD GitOps Automation with ArgoCD / GitHub Actions), Module 15 (MLOps Model Weight Tracking), and Module 16 (Internal Developer Platform Template Scaffolding).

---

# Lesson Directory

This module consists of five progressive, highly instructional lessons:

1. **[MOD-GIT-01: Git Internal Tree Mechanics & Hash Objects (Blobs, Trees, Commits)](lesson-01.md)**
2. **[MOD-GIT-02: Branching Strategies & Collaboration (Trunk-Based vs. GitFlow)](lesson-02.md)**
3. **[MOD-GIT-03: Advanced Rebasing, Interactive Squashing & Clean Histories](lesson-03.md)**
4. **[MOD-GIT-04: Merge Conflict Resolution & Team Workflow Etiquette](lesson-04.md)**
5. **[MOD-GIT-05: Git Automation, Pre-commit Hooks & Submodules](lesson-05.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 40%
* **Intermediate:** 40%
* **Advanced:** 20%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational object-level Git mechanics and branching intuition before advancing into interactive rebasing, conflict resolution, and automated commit hooks.*
