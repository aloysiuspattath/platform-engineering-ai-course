# Curriculum Architect — Task

Version: 1.0.0

---

# Objective

Design the complete curriculum for the **Platform Engineering & AI Infrastructure Course**.

The curriculum must transform the analyzed roadmap, project standards, and learning objectives into a structured, production-ready learning journey.

Generate only curriculum planning artifacts.

Do not generate educational content.

---

# Deliverables

Generate or update the following files inside the `curriculum/` directory:

* `roadmap.md`
* `analysis.md`
* `curriculum.md`
* `learning-order.md`
* `module-map.md`
* `module-dependencies.md`
* `milestones.md`
* `capstone-roadmap.md`
* `skill-matrix.md`
* `competencies.md`

---

# Required Inputs

Before beginning, read and understand:

## AI Platform

* `.ai/bootstrap.yaml`
* `.ai/project_state.yaml`
* `.ai/context.md`
* `.ai/workflow.md`

## Project Standards

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`
* `standards/COURSE_METADATA.yaml`

## Existing Curriculum

Read every file in the `curriculum/` directory before generating new content.

## Canonical Templates

Review every template inside `standards/templates/` to ensure the curriculum supports downstream lesson, lab, project, quiz, and cheat sheet generation.

---

# Curriculum Design Goals

The curriculum must:

* Progress from beginner to advanced.
* Build concepts before tools.
* Emphasize practical engineering.
* Reinforce theory with hands-on work.
* Include meaningful milestones.
* Develop a professional portfolio.
* Prepare learners for Platform Engineering and AI Infrastructure roles.

---

# Learning Progression

Design the curriculum so that learners move through the following stages:

1. Foundations
2. Core Platform Engineering
3. Cloud & Infrastructure Automation
4. Containerization & Orchestration
5. Observability & Reliability
6. AI Infrastructure
7. Enterprise Platform Engineering
8. Capstone Projects
9. Interview & Career Preparation

Each stage should naturally build on the previous one.

---

# Requirements

Ensure that:

* Every module has a clear purpose.
* Dependencies are explicit.
* Competencies are measurable.
* Skills progressively increase in difficulty.
* Milestones align with learner achievements.
* Capstone projects integrate knowledge from multiple modules.

---

# Constraints

Do not:

* Generate lessons.
* Generate labs.
* Generate projects.
* Generate quizzes.
* Generate cheat sheets.
* Duplicate topics.
* Skip prerequisites.
* Recommend outdated technologies.

If project standards conflict, stop and report the issue rather than making assumptions.

---

# Validation

Before completing the task, verify:

* All required curriculum files have been generated.
* Learning order is logical.
* Dependencies are correct.
* Milestones are achievable.
* Competencies are measurable.
* Curriculum aligns with project standards.
* Curriculum supports downstream AI agents.

---

# Expected Output

Produce a complete curriculum that serves as the authoritative blueprint for all future lesson, lab, project, quiz, and website generation.

The output should be suitable for direct handoff to the Lesson Author.

---

# Completion Criteria

The task is complete only when:

* All required curriculum files are generated.
* Internal validation passes.
* No unresolved assumptions remain.
* The curriculum is ready for review and approval.
