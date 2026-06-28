# Project Designer — Task

Version: 1.0.0

---

# Objective

Generate elite, portfolio-quality engineering project markdown files for the **Platform Engineering & AI Infrastructure Course** by synthesizing concepts from approved lessons and completed labs into authentic, high-impact enterprise workplace assignments.

Every project must strictly adhere to the mandatory 12-section project structure, enforce core production engineering principles (planning, trade-offs, automation, debugging), and provide learners with top-tier assets suitable for GitHub repositories, technical blogs, resumes, and high-stakes interview discussions.

Write all generated project files directly into `output/generated/`.

Do not generate, author, or modify instructional lessons, guided labs, quizzes, cheat sheets, or curriculum blueprints.

---

# Deliverables

Generate standalone markdown project files for the specific modules assigned in the current execution queue into:

`output/generated/`

Each project file must be named according to its canonical project ID within the curriculum map.

Example: `output/generated/projects/production-k8s-platform.md`

---

# Required Inputs

Before generating any project content, load and analyze:

## AI Platform

* `.ai/bootstrap.yaml`
* `.ai/project_state.yaml`
* `.ai/context.md`
* `.ai/workflow.md`
* `.ai/agents.md`

## Project Standards

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`

## Curriculum & Templates

* Read all approved curriculum blueprints in `curriculum/`.
* Read the canonical project template: `standards/templates/TEMPLATE_PROJECT.md`.

## Lessons & Labs

* Read the specific approved lessons and companion labs associated with the project being generated (located in `output/approved/`, `modules/`, or `labs/`).

---

# Mandatory 12-Section Project Structure

For every assigned project, you must populate the following 12 mandatory sections in the exact order specified, harmonizing `TEMPLATE_PROJECT.md` requirements with the enriched project design framework:

```markdown
# [Project Title: Executive Portfolio Showcase]

## 1. Business Scenario
Establish an authentic, high-stakes corporate business scenario detailing *why* this project is being built, the specific enterprise pain points it resolves, and the verifiable business value it delivers.
Example: *"Your enterprise is migrating 200 microservices from legacy virtual machines to a multi-tenant Kubernetes platform. You have been assigned as the Lead Platform Engineer to design, bootstrap, and verify the core GitOps delivery engine."*

## 2. Project Goals
List 3-5 definitive, high-level architectural achievements the learner will accomplish upon successful completion of this project.

## 3. Required Skills
Identify the core platform engineering competencies, tools, and technical capabilities the learner will actively exercise (e.g., Terraform state management, ArgoCD sync waves, Kyverno policy enforcement).

## 4. Prerequisites
Specify required preceding course modules, local software toolchains (e.g., Docker, Git, OpenTofu/Terraform, kubectl), and cloud sandbox accounts needed prior to execution.

## 5. Architecture Overview
Provide a comprehensive, beautifully structured system architecture diagram using clean, valid Mermaid syntax. Accompany the diagram with a thorough architectural breakdown of every decoupled layer.

## 6. Deliverables
Define the exact tangible assets, directory structures (`config/`, `scripts/`, `src/`, `tests/`), configuration manifests (`main.tf`, `golden-path.yaml`), and automation scripts the learner must produce to satisfy the project requirements.

## 7. Implementation Plan
Structure the end-to-end engineering implementation workflow into logical, sequential phases. Enforce the principle of *planning before implementation* by guiding the learner through initial design considerations before detailing terminal commands and code manifests.

## 8. Validation Criteria
Provide precise verification commands, automated test scripts (`verify-project.sh`), and integration checks that definitively prove the entire project functions flawlessly in a production-like sandbox. Include the exact `Expected Output`.

## 9. Troubleshooting Guidance
Provide structured debugging workflows for resolving complex system integration issues, failure alarms, and misconfigurations encountered during deployment. Emphasize log inspection, execution tracing, and root cause analysis.

## 10. Stretch Goals
Suggest 2-3 advanced architectural extensions (e.g., integrating Prometheus observability, implementing KEDA autoscaling, configuring Active-Active failover) for students looking to expand their portfolio into expert territory.

## 11. Reflection
List 2-3 deep engineering questions that prompt the learner to evaluate the architectural trade-offs they established, underlying system mechanics, and long-term maintainability.

## 12. Portfolio Presentation Tips
Provide dedicated, actionable guidance teaching the learner how to showcase this completed project across five professional pillars:
* `GitHub:` Structuring a pristine repository README with architectural diagrams.
* `Personal Portfolio:` Framing the project as a flagship enterprise showcase.
* `Technical Blog:` Translating architectural trade-offs into high-quality articles.
* `Resume:` Crafting verified, quantitative STAR achievement bullet points (e.g., *"Architected automated multi-tenant GPU platform reducing deployment times by 15x"*).
* `Interview Discussion:` Preparing to navigate Four-Tier Architectural Whiteboard sessions with Chief Architects and VPs of Engineering.
```

---

# Engineering & Portfolio Principles

## Engineering Principles
* **Production Inspired:** All designs must adhere to modern enterprise production standards (GitOps, immutable infrastructure, zero-trust security).
* **Planning Before Implementation:** Learners must analyze requirements and draft designs before writing code.
* **Encourage Automation:** Prioritize clean, idempotent automation shell scripts and Terraform modules over manual configurations.

## Portfolio Focus
Every completed project must serve as an elite professional asset. The learner should feel immensely proud to showcase their finished work to executive recruiters and top-tier hiring committees.

---

# Internal Review & Validation Criteria

Before finalizing a project file, you must internally review and verify the content against the following eight quality criteria:

1. **Technical correctness:** All architectural specifications, manifests, and scripts are 100% accurate and executable.
2. **Educational value:** The project successfully bridges theory and practice, cementing deep engineering intuition.
3. **Portfolio quality:** The structure, code, and documentation meet elite industry standards.
4. **Production realism:** The business scenario and technical constraints mirror live enterprise environments.
5. **Architecture quality:** System topologies are clean, decoupled, and beautifully visualized using Mermaid.
6. **Security:** Least-privilege IAM, non-root execution, secret isolation, and secure networking are actively enforced.
7. **Maintainability:** Code and configurations are highly modular, cleanly structured, and easy to extend.
8. **Documentation quality:** Explanations are clear, thorough, and formatted in flawless GitHub Flavored Markdown.

---

# Completion Criteria

The task is complete only when:

* All assigned projects in the execution batch have been successfully generated into `output/generated/`.
* Every generated project fully populates the mandatory 12-section structure.
* Internal review against the eight quality criteria passes perfectly.
* No unverified assumptions or placeholder comments remain.


---

# CRITICAL METADATA REQUIREMENT

You MUST prepend a fully populated YAML frontmatter block at the very top (Line 1) of every generated markdown file. Do NOT hardcode the legacy metadata inside the markdown body.
Generate this YAML block strictly according to the schema defined in standards/metadata/project.schema.yaml.
