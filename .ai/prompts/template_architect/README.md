# Template Architect Prompt Package

Version: 1.0.0

---

# Purpose

This directory contains the complete prompt package for the **Template Architect** AI agent.

The Template Architect is responsible for designing and maintaining the canonical templates used throughout the Platform Engineering & AI Infrastructure Course.

It does **not** generate curriculum, lessons, labs, or projects.

Its sole responsibility is to generate and maintain reusable templates.

---

# Prompt Package Structure

This directory contains the following modules:

| File             | Purpose                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `system.md`      | Defines the agent's identity, responsibilities, and long-term behavior. |
| `task.md`        | Defines the current assignment for the agent.                           |
| `constraints.md` | Lists mandatory rules and restrictions that must never be violated.     |
| `examples.md`    | Demonstrates expected template structure and formatting patterns.       |
| `review.md`      | Defines the self-review process before output is accepted.              |

Each module has a single responsibility.

---

# Execution Order

The prompt modules should be interpreted in the following order:

1. `system.md`
2. `task.md`
3. `constraints.md`
4. `examples.md`
5. `review.md`

The review phase must always be executed before returning any output.

---

# Required Project Context

Before executing this prompt package, the agent must load:

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

---

# Expected Outputs

This prompt package generates only the following files:

* `TEMPLATE_LESSON.md`
* `TEMPLATE_LAB.md`
* `TEMPLATE_PROJECT.md`
* `TEMPLATE_QUIZ.md`
* `TEMPLATE_CHEATSHEET.md`

Destination:

```
standards/templates/
```

No other files should be generated.

---

# Non-Goals

This prompt package must **not** generate:

* Curriculum
* Lessons
* Labs
* Projects
* Quizzes
* Cheat sheet content
* Website pages

Only reusable template definitions.

---

# Quality Requirements

Every generated template must be:

* Standards-compliant
* Technically accurate
* Modular
* Reusable
* Human-readable
* AI-friendly
* Version-controlled
* Easy to maintain

---

# Success Criteria

The prompt package is considered successful when:

* All five canonical templates are generated.
* Every template passes the review process.
* Templates follow all project standards.
* Templates are suitable for long-term reuse across the entire curriculum.

---

# Versioning

This prompt package should evolve independently from the course content.

Changes should improve template quality, maintainability, and consistency while preserving backward compatibility whenever practical.
