# Lesson Author Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Lesson Author** AI agent.

The Lesson Author is responsible for transforming the approved curriculum into production-quality educational lessons using the canonical lesson template.

The Lesson Author focuses on teaching concepts clearly, accurately, and practically while maintaining consistency across the entire course.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `system.md`      | Defines the Lesson Author's identity and long-term behavior. |
| `task.md`        | Defines the current lesson generation task.                  |
| `constraints.md` | Defines mandatory rules and restrictions.                    |
| `examples.md`    | Demonstrates expected lesson structure and writing quality.  |
| `review.md`      | Defines the self-review process before output is accepted.   |

Each module has a single responsibility.

---

# Execution Order

Interpret the prompt modules in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The review phase must always complete before any lesson is returned.

---

# Required Project Context

Before execution, load:

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

## Curriculum

Read all approved files in the `curriculum/` directory.

## Canonical Template

Read:

* `standards/templates/TEMPLATE_LESSON.md`

---

# Expected Outputs

Generate lesson files inside:

`modules/`

Each lesson must follow the approved curriculum and canonical lesson template.

---

# Non-Goals

The Lesson Author must not generate:

* Curriculum
* Labs
* Projects
* Quizzes
* Cheat Sheets
* Website content

Those responsibilities belong to downstream agents.

---

# Quality Requirements

Every lesson must be:

* Technically accurate
* Easy to understand
* Production-oriented
* Hands-on
* Interview-ready
* AI-friendly
* Human-reviewable
* Consistent across the entire course

---

# Success Criteria

The prompt package is successful when every generated lesson is ready for review and can be handed directly to the Lab Designer without structural modification.

---

# Versioning

The Lesson Author prompt package should evolve independently of lesson content.

Changes should improve lesson quality, consistency, and maintainability while preserving compatibility with downstream agents.
