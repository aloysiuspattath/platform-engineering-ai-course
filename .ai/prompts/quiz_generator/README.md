# Quiz Generator Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Quiz Generator** AI agent in the Platform Engineering & AI Infrastructure Course.

The Quiz Generator is responsible for transforming approved educational lessons, hands-on labs, and portfolio projects into high-quality assessments. These quizzes evaluate deep conceptual understanding, practical reasoning, troubleshooting ability, and engineering judgment.

The objective is never superficial memorization. The objective is to definitively measure genuine engineering competence.

The Quiz Generator does **not** create lessons, guided labs, capstone projects, cheat sheets, or curriculum blueprints. It focuses entirely on authoring world-class engineering assessments.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `system.md`      | Defines the Quiz Generator's identity, assessment philosophy, and Bloom's framework.   |
| `task.md`        | Defines the quiz generation task, question type distribution, and feedback rules.      |
| `constraints.md` | Defines mandatory boundaries, trivia bans, and elimination of ambiguous/trick phrasing.|
| `examples.md`    | Demonstrates world-class command interpretation, log analysis, and deep answer keys.   |
| `review.md`      | Defines the mandatory self-validation process before any quiz is saved and handed off. |

Each module has a single, decoupled responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The self-validation review phase (`review.md`) must always complete before any quiz file is finalized and written to disk.

---

# Required Project Context

Before initiating any quiz generation task, load and analyze:

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
* Read the canonical quiz template: `standards/templates/TEMPLATE_QUIZ.md`.

## Lessons, Labs & Projects

* Read the specific approved lessons, companion labs, and projects associated with the quiz being generated (located in `output/approved/`, `modules/`, `labs/`, or `projects/`).

---

# Expected Outputs

Generate standalone markdown quiz files inside:

`output/generated/` (Staged for review before official promotion to `quizzes/`)

Example: `output/generated/quizzes/terraform-fundamentals-quiz.md`

Each quiz must strictly adhere to the prerequisite knowledge accumulated in preceding modules and the canonical quiz structure.

---

# Non-Goals

The Quiz Generator must not generate or author:

* Curriculum blueprints
* Instructional lesson markdown
* Guided step-by-step labs
* Portfolio capstone projects
* Cheat sheets or website content

Those responsibilities belong exclusively to other specialized agents in the workflow.

---

# Quality Requirements

Every generated quiz must be:

* Technically accurate and verified
* Deeply educational and confidence-building
* Appropriately paced for the target module difficulty
* Balanced across Bloom's Taxonomy tiers
* Completely free of trick or ambiguous questions
* Firmly rooted in realistic enterprise engineering scenarios

---

# Success Criteria

The prompt package is successful when every generated quiz functions as an inspiring, high-impact assessment that accurately validates engineering competence, reinforces core mental models, and provides rich educational value even after completion.

---

# Versioning

The Quiz Generator prompt package should evolve independently of quiz content.

Changes should improve question realism, troubleshooting depth, and Bloom's Taxonomy alignment while preserving architectural compatibility with downstream review agents.
