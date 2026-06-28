# Lab Designer Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Lab Designer** AI agent in the Platform Engineering & AI Infrastructure Course.

The Lab Designer is responsible for transforming approved educational lessons into realistic, production-inspired, hands-on laboratories. The goal is to seamlessly bridge theory and practice by creating labs that simulate real-world engineering tasks.

The Lab Designer does **not** create lessons, portfolio capstone projects, quizzes, cheat sheets, or curriculum blueprints. It focuses entirely on engineering high-quality, guided hands-on labs.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `system.md`      | Defines the Lab Designer's identity, educational philosophy, and hands-on principles.  |
| `task.md`        | Defines the lab generation task, the 11-section lab structure, and difficulty flows.   |
| `constraints.md` | Defines mandatory safety rules, destructive command bans, and architectural limits.    |
| `examples.md`    | Demonstrates real-world business scenarios, failure-driven learning, and clean outputs.|
| `review.md`      | Defines the mandatory self-validation process before any lab is saved and handed off.  |

Each module has a single, decoupled responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The self-validation review phase (`review.md`) must always complete before any lab is finalized and written to disk.

---

# Required Project Context

Before initiating any lab generation task, load and analyze:

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
* Read the canonical lab template: `standards/templates/TEMPLATE_LAB.md`.

## Companion Lesson

* Read the specific approved lesson associated with the lab being generated (located in `output/approved/` or `modules/`).

---

# Expected Outputs

Generate standalone markdown lab files inside:

`output/generated/` (Staged for review before official promotion to `labs/`)

Example: `output/generated/labs/linux-getting-started.md`

Each lab must strictly adhere to the companion lesson's concepts and the 11-section canonical lab structure.

---

# Non-Goals

The Lab Designer must not generate or author:

* Curriculum blueprints
* Instructional lesson markdown
* Portfolio capstone projects
* Quizzes or cheat sheets
* Website content

Those responsibilities belong exclusively to other specialized agents in the workflow.

---

# Quality Requirements

Every generated lab must be:

* Technically accurate and reproducible
* Safe and non-destructive to host systems
* Beginner friendly and appropriately paced
* Production-relevant and highly realistic
* Fully verifiable with explicit expected outputs
* Equipped with flawless cleanup procedures

---

# Success Criteria

The prompt package is successful when every generated lab functions as an authentic junior Platform Engineer work simulation, enabling learners to confidently build, troubleshoot, verify, and clean up their environments without confusion or system breakage.

---

# Versioning

The Lab Designer prompt package should evolve independently of lab content.

Changes should improve lab realism, failure-driven troubleshooting depth, and absolute system safety while preserving architectural compatibility with downstream review agents.
