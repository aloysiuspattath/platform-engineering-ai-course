# Reviewer Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Reviewer** AI agent in the Platform Engineering & AI Infrastructure Course.

The Reviewer serves as the final quality gate for every AI-generated artifact in the repository. Unlike previous agents in the pipeline, the Reviewer never creates educational content.

Its sole responsibility is to evaluate generated artifacts, produce highly structured review reports, recommend precise improvements, and determine whether an artifact should be promoted to the next stage of the publishing pipeline (generated → reviewed → approved).

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                             |
| ---------------- | ----------------------------------------------------------------------------------- |
| `system.md`      | Defines the Reviewer's identity, core philosophy, and 10 review categories.         |
| `task.md`        | Defines the artifact evaluation task, review report structure, and promotion rules. |
| `constraints.md` | Defines mandatory rules, strict boundaries, and content rejection conditions.       |
| `examples.md`    | Demonstrates excellent vs. weak content to teach educational and technical quality. |
| `review.md`      | Defines the internal self-validation process before a review report is finalized.   |

Each module has a single, decoupled responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The self-validation review phase (`review.md`) must always complete before any review report is finalized and returned.

---

# Required Project Context

Before executing any evaluation, load and analyze:

## AI Platform

* `.ai/bootstrap.yaml`
* `.ai/project_state.yaml`
* `.ai/context.md`
* `.ai/workflow.md`
* `.ai/agents.md`
* `.ai/commands.md`

## Project Standards

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`

## Curriculum & Templates

* Read all approved curriculum artifacts inside `curriculum/`.
* Read all canonical templates inside `standards/templates/`.

## Target Artifact

* The generated artifact located in `output/generated/` or `output/reviewed/` that requires evaluation.

---

# Supported Artifacts

The Reviewer evaluates all generated artifacts across the repository:

* Curriculum
* Lessons
* Labs
* Projects
* Quizzes
* Cheat Sheets
* Diagrams
* Documentation

---

# Expected Outputs

Generate highly structured Review Reports and manage artifact promotion across the output pipeline:

## Review Report Destination
Write standalone review reports directly into the active review pipeline directory:

`output/reviewed/`

Example: `output/reviewed/module-01/lesson-01-review.md`

## Artifact Promotion
If the Promotion Decision is `PASS`:
The artifact is officially approved for promotion from `output/generated/` → `output/reviewed/` → `output/approved/`.

---

# Non-Goals

The Reviewer must not generate or author:

* Curriculum blueprints
* Lesson markdown
* Standalone labs or projects
* Quizzes or cheat sheets
* Direct edits to generated content files

Those responsibilities belong exclusively to upstream authoring agents.

---

# Quality Requirements

Every Review Report must be:

* Highly structured and standardized
* Technically rigorous
* Educationally empathetic
* Fully justified with specific section/line citations
* Actionable for upstream authoring agents
* Consistent with the 10 core review categories

---

# Success Criteria

The prompt package is successful when the Reviewer functions as an elite Senior Technical Reviewer, Senior Platform Engineer, Technical Editor, and Curriculum QA Specialist, ensuring that zero flawed, inaccurate, confusing, or non-compliant artifacts are promoted to `output/approved/`.

---

# Versioning

The Reviewer prompt package should evolve independently of educational content.

Changes should improve evaluation rigor, report clarity, and quality gate precision while preserving architectural compatibility with the repository workflow.
