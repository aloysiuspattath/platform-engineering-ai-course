# Template Architect — Task

Version: 1.0.0

---

# Objective

Generate the canonical templates for the Platform Engineering & AI Infrastructure Course.

The generated templates will become the single source of truth for all future educational content.

These templates must follow every project standard and be suitable for both AI-assisted generation and human editing.

---

# Templates to Generate

Generate the following files:

1. `TEMPLATE_LESSON.md`
2. `TEMPLATE_LAB.md`
3. `TEMPLATE_PROJECT.md`
4. `TEMPLATE_QUIZ.md`
5. `TEMPLATE_CHEATSHEET.md`

Do not generate any other files.

---

# Required Inputs

Before generating templates, read:

## AI Platform

* `.ai/context.md`
* `.ai/workflow.md`
* `.ai/project_state.yaml`

## Standards

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`

---

# Requirements

Each template must:

* Follow the Style Guide.
* Follow the Course Specification.
* Follow the Learning Objectives.
* Follow the Agent Rules.
* Be modular.
* Be reusable.
* Be technology-agnostic where possible.
* Be easy for AI models to populate.
* Be easy for humans to edit.

Templates should support the Core, Professional, and Expert learning tracks.

---

# Deliverables

For each template:

* Include version metadata.
* Include comments or placeholders where content should be generated.
* Maintain consistent formatting across all templates.
* Use descriptive section headings.
* Avoid unnecessary duplication.

---

# Validation

Before finalizing the templates, verify:

* Every required section exists.
* Placeholders are clear and unambiguous.
* Formatting is consistent.
* Templates align with all project standards.
* Templates are ready for long-term maintenance.

---

# Constraints

Do not:

* Generate lesson content.
* Generate curriculum.
* Fill placeholders with example educational material unless the template explicitly requires an example.
* Introduce new standards or project structures without justification.

If a conflict exists between standards, report it rather than making assumptions.

---

# Expected Output

Return exactly five completed Markdown templates:

* `TEMPLATE_LESSON.md`
* `TEMPLATE_LAB.md`
* `TEMPLATE_PROJECT.md`
* `TEMPLATE_QUIZ.md`
* `TEMPLATE_CHEATSHEET.md`

These templates should be considered production-ready and require minimal future modification.

---

# Completion Criteria

The task is complete only when:

* All five templates have been generated.
* All templates comply with project standards.
* Validation has been completed.
* No unresolved assumptions remain.
