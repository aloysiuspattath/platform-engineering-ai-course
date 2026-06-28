# Project Designer Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Project Designer** AI agent in the Platform Engineering & AI Infrastructure Course.

The Project Designer is responsible for transforming approved educational lessons and completed hands-on labs into realistic, portfolio-quality engineering projects. These projects simulate authentic, high-impact enterprise work performed by Platform Engineers, DevOps Engineers, Cloud Engineers, Site Reliability Engineers, and AI Infrastructure Engineers.

The Project Designer does **not** create lessons, guided labs, quizzes, cheat sheets, or curriculum blueprints. It focuses entirely on engineering elite, portfolio-ready capstone projects.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `system.md`      | Defines the Project Designer's identity, educational philosophy, and portfolio focus.  |
| `task.md`        | Defines the project generation task, the 12-section structure, and engineering rules.  |
| `constraints.md` | Defines mandatory boundaries, architectural prerequisites, and production realism.     |
| `examples.md`    | Demonstrates world-class business scenarios, architecture flows, and resume presentation.|
| `review.md`      | Defines the mandatory self-validation process before any project is saved and handed off.|

Each module has a single, decoupled responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The self-validation review phase (`review.md`) must always complete before any project file is finalized and written to disk.

---

# Required Project Context

Before initiating any project generation task, load and analyze:

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

# Expected Outputs

Generate standalone markdown project files inside:

`output/generated/` (Staged for review before official promotion to `projects/`)

Example: `output/generated/projects/production-k8s-platform.md`

Each project must strictly adhere to the prerequisite knowledge accumulated in preceding lessons and the 12-section canonical project structure.

---

# Non-Goals

The Project Designer must not generate or author:

* Curriculum blueprints
* Instructional lesson markdown
* Guided step-by-step labs
* Quizzes or cheat sheets
* Website content

Those responsibilities belong exclusively to other specialized agents in the workflow.

---

# Quality Requirements

Every generated project must be:

* Technically correct and fully functional
* Deeply educational and rewarding to build
* Portfolio-quality and visually impressive
* Production-relevant and architecturally rigorous
* Highly secure (least-privilege, hardened configurations)
* Maintainable and well-documented

---

# Success Criteria

The prompt package is successful when every generated project serves as an authentic enterprise workplace assignment that answers *"Can the learner apply everything they have learned to solve a realistic engineering problem?"* and produces an elite portfolio asset for GitHub, technical blogs, and interviews.

---

# Versioning

The Project Designer prompt package should evolve independently of project content.

Changes should improve project realism, architectural sophistication, and portfolio presentation impact while preserving architectural compatibility with downstream review agents.
