# AI Workflow

Version: 1.0.0

---

# Purpose

This document defines the end-to-end workflow for generating, reviewing, approving, and publishing educational content.

Every AI agent must follow this workflow.

No stage should be skipped.

---

# Workflow Overview

```text
Repository Standards
        │
        ▼
Template Generation
        │
        ▼
Curriculum Planning
        │
        ▼
Lesson Generation
        │
        ▼
Lab Generation
        │
        ▼
Project Generation
        │
        ▼
Quiz & Cheat Sheet Generation
        │
        ▼
Technical Review
        │
        ▼
Quality Assurance
        │
        ▼
Approval
        │
        ▼
Publication
```

---

# Stage 1 — Repository Standards

Inputs

* COURSE_SPEC.md
* STYLE_GUIDE.md
* COURSE_PRINCIPLES.md
* LEARNING_OBJECTIVES.md
* AGENT_RULES.md
* REVIEW_CHECKLIST.md

Output

Approved project standards.

Responsible Agent

None (Human maintained).

---

# Stage 2 — Template Generation

Responsible Agent

Template Architect

Inputs

* Project standards
* AI context

Outputs

* TEMPLATE_LESSON.md
* TEMPLATE_LAB.md
* TEMPLATE_PROJECT.md
* TEMPLATE_QUIZ.md
* TEMPLATE_CHEATSHEET.md

Validation

Templates must satisfy all project standards.

---

# Stage 3 — Curriculum Planning

Responsible Agent

Curriculum Architect

Inputs

* Roadmap
* Standards
* Templates

Outputs

* Module map
* Learning order
* Curriculum
* Milestones

Validation

Learning progression must be logical and complete.

---

# Stage 4 — Lesson Generation

Responsible Agent

Lesson Author

Inputs

* Module definition
* Lesson template
* Standards

Outputs

Lesson draft.

Destination

output/generated/

---

# Stage 5 — Lab Generation

Responsible Agent

Lab Designer

Inputs

* Lesson
* Lab template

Outputs

Lab draft.

Destination

output/generated/

---

# Stage 6 — Project Generation

Responsible Agent

Project Designer

Inputs

* Module
* Project template

Outputs

Project draft.

Destination

output/generated/

---

# Stage 7 — Quiz & Cheat Sheet Generation

Responsible Agent

Quiz Generator

Inputs

* Lesson
* Quiz template
* Cheat sheet template

Outputs

* Quiz
* Cheat sheet

Destination

output/generated/

---

# Stage 8 — Technical Review

Responsible Agent

Reviewer

Tasks

* Validate technical accuracy
* Validate completeness
* Validate references
* Validate diagrams
* Validate code examples

Destination

output/reviewed/

---

# Stage 9 — Quality Assurance

Responsible Agent

QA Validator

Tasks

* Verify REVIEW_CHECKLIST.md
* Verify formatting
* Verify template compliance
* Verify consistency

Destination

output/approved/

---

# Stage 10 — Publication

Responsible Agent

Publisher (Human or Automation)

Tasks

Move approved content into the repository.

Examples

* modules/
* labs/
* projects/
* quizzes/
* cheatsheets/

---

# Quality Gates

Every artifact must pass:

1. Technical Accuracy
2. Educational Quality
3. Template Compliance
4. Style Guide Compliance
5. Grammar
6. Link Validation
7. Final QA

Failure at any stage returns the artifact to the previous generation step.

---

# Artifact Lifecycle

```text
Idea
    │
    ▼
Generated
    │
    ▼
Reviewed
    │
    ▼
Approved
    │
    ▼
Published
```

---

# Agent Communication

Each agent must provide:

* Inputs consumed
* Outputs produced
* Assumptions
* Validation performed
* Issues encountered
* Recommendations (optional)

Agents should never silently modify another agent's work.

---

# Error Handling

If an agent encounters:

* Missing inputs
* Conflicting standards
* Ambiguous requirements
* Unsupported technologies

It must stop, report the issue, and request clarification instead of making assumptions.

---

# Continuous Improvement

When improvements are identified:

1. Record the recommendation.
2. Do not modify approved content automatically.
3. Submit the recommendation for review.
4. Apply approved improvements in a future iteration.

---

# Success Criteria

The workflow succeeds when:

* Every artifact is standards-compliant.
* Every lesson is technically accurate.
* Every project is reproducible.
* Every lab is testable.
* Every quiz measures understanding.
* Published content is ready for learners without additional restructuring.

The workflow prioritizes quality, consistency, and maintainability over generation speed.
