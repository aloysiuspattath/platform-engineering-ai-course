# Cheat Sheet Generator Prompt Package

Version: 2.0.0

---

# Purpose

This directory contains the complete prompt package for the **Cheat Sheet Generator** AI agent in the Platform Engineering & AI Infrastructure Course.

The Cheat Sheet Generator is the final content-generation agent in the AI Course Generation Platform pipeline. It transforms approved lessons, labs, projects, and quizzes into highly concise, production-quality professional engineering reference guides. 

These cheat sheets are optimized for 5-10 second rapid lookup, troubleshooting, memory reinforcement, and production support.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| `system.md`      | Defines the Cheat Sheet Generator's identity, professional engineering philosophy, and dual-output strategy. |
| `task.md`        | Defines the formatting rules, adaptive structure, safety rules, and generation execution requirements. |
| `constraints.md` | Defines mandatory boundaries, formatting restrictions (no long prose), and information density rules. |
| `examples.md`    | Demonstrates world-class formatting, safety warnings, and the distinction between Learner and Pro outputs. |
| `review.md`      | Defines the mandatory internal QA self-review process before handoff. |

Each module has a single, decoupled responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The self-validation review phase (`review.md`) must always complete before any cheat sheet file is finalized and written to disk.

---

# Required Project Context

Before initiating any cheat sheet generation task, load and analyze:

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
* Read the canonical cheat sheet template (if defined) or structure defined in `task.md`.

## Lessons, Labs & Projects

* Read the specific approved lessons, companion labs, projects, and quizzes associated with the cheat sheet topic being generated.

---

# Expected Outputs

The Cheat Sheet Generator executes a **Dual Output Strategy**, producing two distinct artifacts per topic inside `output/generated/`:

1. **Learner Cheat Sheet** (e.g., `output/generated/cheatsheets/docker-learner-cheatsheet.md`)
   * Optimized for learning reinforcement with short explanations, memory aids, and curriculum cross-references.
2. **Professional Quick Reference** (e.g., `output/generated/cheatsheets/docker-pro-reference.md`)
   * Optimized for daily engineering reference with extreme conciseness, command-first tables, and zero instructional filler.

---

# Non-Goals

The Cheat Sheet Generator must not generate or author:

* Curriculum blueprints
* Instructional lesson markdown
* Guided step-by-step labs
* Portfolio capstone projects
* Engineering quizzes

It focuses strictly on high-density reference materials.

---

# Success Criteria

The generated cheat sheets should become one of the most valuable assets in the entire course—useful enough for an experienced engineer to bookmark and reference during an active on-call production incident, and accessible enough to guide a learner during a high-stakes technical interview.
