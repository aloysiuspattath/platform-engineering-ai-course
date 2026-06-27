# AI Agent Registry

Version: 1.0.0

---

# Purpose

This document defines every AI agent used within the Platform Engineering & AI Infrastructure Curriculum generation system.

Each agent has a single responsibility and participates in the content generation workflow.

Agents are designed to be model-agnostic and reusable across AI platforms.

---

# Core Principles

Every agent must:

* Follow project standards.
* Read the required context before execution.
* Produce modular output.
* Validate its own work.
* Hand off cleanly to the next agent.
* Never overwrite approved content.

---

# Standard Agent Contract

Every agent is defined using the following contract.

## Role

Primary responsibility.

## Inputs

Required documents and artifacts.

## Outputs

Generated artifacts.

## Permissions

Actions the agent is allowed to perform.

## Validation

Checks performed before completion.

## Handoff

Expected next stage in the workflow.

---

# Agent: Template Architect

## Purpose

Design and maintain the canonical templates used across the project.

## Inputs

* AI Context
* Workflow
* Standards
* Existing Templates

## Outputs

* TEMPLATE_LESSON.md
* TEMPLATE_LAB.md
* TEMPLATE_PROJECT.md
* TEMPLATE_QUIZ.md
* TEMPLATE_CHEATSHEET.md

## Permissions

* Create templates
* Update templates
* Refactor templates

## Validation

Templates must satisfy all project standards.

## Handoff

Curriculum Architect

---

# Agent: Curriculum Architect

## Purpose

Design the overall curriculum structure.

## Inputs

* Course standards
* Templates
* Roadmap
* Learning objectives

## Outputs

* Curriculum
* Module Map
* Learning Order
* Milestones

## Permissions

Create curriculum artifacts.

## Validation

Curriculum must follow learning progression.

## Handoff

Lesson Author

---

# Agent: Lesson Author

## Purpose

Generate lessons.

## Inputs

* Curriculum
* Module
* Lesson Template

## Outputs

Lesson drafts.

## Destination

output/generated/

## Validation

Lesson must satisfy TEMPLATE_LESSON.md.

## Handoff

Lab Designer

---

# Agent: Lab Designer

## Purpose

Generate practical labs.

## Inputs

* Lesson
* Lab Template

## Outputs

Lab drafts.

## Destination

output/generated/

## Validation

Lab must be reproducible.

## Handoff

Project Designer

---

# Agent: Project Designer

## Purpose

Generate real-world projects.

## Inputs

* Module
* Project Template

## Outputs

Project drafts.

## Destination

output/generated/

## Validation

Project must simulate production engineering work.

## Handoff

Quiz Generator

---

# Agent: Quiz Generator

## Purpose

Generate assessments and cheat sheets.

## Inputs

* Lesson
* Quiz Template
* Cheat Sheet Template

## Outputs

* Quiz
* Cheat Sheet

## Destination

output/generated/

## Validation

Questions should measure understanding, not memorization.

## Handoff

Reviewer

---

# Agent: Reviewer

## Purpose

Perform technical review.

## Inputs

Generated artifacts.

## Outputs

Reviewed artifacts.

## Destination

output/reviewed/

## Validation

* Technical accuracy
* Completeness
* References
* Code correctness
* Diagram correctness

## Handoff

QA Validator

---

# Agent: QA Validator

## Purpose

Validate project standards.

## Inputs

Reviewed artifacts.

## Outputs

Approved artifacts.

## Destination

output/approved/

## Validation

* REVIEW_CHECKLIST.md
* Style Guide
* Template Compliance
* Formatting
* Grammar

## Handoff

Publisher

---

# Agent: Publisher

## Purpose

Publish approved content.

## Inputs

Approved artifacts.

## Outputs

Production-ready course content.

## Destination

modules/
labs/
projects/
quizzes/
cheatsheets/

## Validation

Approved content only.

---

# Agent Communication Rules

Every agent must report:

* Inputs consumed
* Outputs produced
* Validation performed
* Assumptions
* Warnings
* Recommendations

---

# Agent Permissions

Agents may:

* Read project standards.
* Read templates.
* Generate new artifacts.
* Improve draft artifacts.

Agents may not:

* Delete approved content.
* Ignore project standards.
* Skip validation.
* Invent unsupported technical information.

---

# Agent Lifecycle

```text
Initialize
      │
      ▼
Read Context
      │
      ▼
Read Standards
      │
      ▼
Generate
      │
      ▼
Validate
      │
      ▼
Report
      │
      ▼
Handoff
```

---

# Future Expansion

Additional agents may be introduced for:

* Diagram generation
* Website generation
* Localization
* Accessibility review
* SEO optimization
* Video script generation
* Documentation maintenance

New agents must follow the Standard Agent Contract.

---

# Definition of Success

An AI agent is successful when it produces standards-compliant, technically accurate, maintainable output that integrates seamlessly into the curriculum generation workflow.
