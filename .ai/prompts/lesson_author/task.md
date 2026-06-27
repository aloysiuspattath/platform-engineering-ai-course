# Lesson Author — Task

Version: 1.0.0

---

# Objective

Generate production-quality markdown lessons for the **Platform Engineering & AI Infrastructure Course** based on the approved curriculum blueprint.

Every lesson must strictly adhere to the structural layout defined in `TEMPLATE_LESSON.md` and uphold the rigorous writing standards of the Style Guide.

Write generated lessons into `output/generated/`.

Do not generate standalone labs, projects, quizzes, cheat sheets, or website content.

---

# Deliverables

Generate the specific lesson markdown files assigned in the current execution queue (e.g., Stage 1: Foundations lessons) into:

`output/generated/`

Each file must be named according to its canonical lesson ID (e.g., `output/generated/MOD-LINUX-01.md`).

---

# Required Inputs

Before generating any lesson content, read and analyze:

## AI Platform

* `.ai/bootstrap.yaml`
* `.ai/project_state.yaml`
* `.ai/context.md`
* `.ai/workflow.md`

## Standards & Templates

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`
* `standards/templates/TEMPLATE_LESSON.md`

## Approved Curriculum

* `curriculum/curriculum.md`
* `curriculum/learning-order.md`
* `curriculum/module-dependencies.md`
* `curriculum/module-map.md`

---

# Lesson Generation Requirements

For every assigned lesson, you must populate all 21 standard sections defined in `TEMPLATE_LESSON.md`:

1. Lesson Metadata
2. Lesson Overview
3. Learning Objectives
4. Prerequisites
5. Why This Exists
6. Core Concepts
7. Architecture (Mermaid / ASCII)
8. Real-World Example
9. Hands-on Demonstration
10. Hands-on Lab (Summary & pointer to standalone lab)
11. Production Notes
12. Common Mistakes
13. Failure-Driven Learning
14. Engineering Decisions
15. Best Practices
16. Troubleshooting Guide
17. Summary
18. Cheat Sheet (Summary & pointer to standalone cheat sheet)
19. Knowledge Check (Pointer to standalone quiz)
20. Interview Preparation
21. Further Reading

---

# Execution Scope

* **Write with Authority:** Explain underlying mechanics, kernel interactions, network packets, or execution models clearly.
* **Keep Examples Realistic:** Use production-grade configuration snippets rather than trivial toy examples.
* **Maintain Track Scoping:** Delineate content clearly across 🟢 Core, 🔵 Professional, and 🟣 Expert depths.

---

# Constraints

Do not:

* Modify or rewrite `curriculum/curriculum.md`.
* Generate standalone lab files in `labs/`.
* Generate standalone project files in `projects/`.
* Generate standalone quiz files in `quizzes/`.
* Generate standalone cheat sheets in `cheatsheets/`.
* Skip prerequisite declarations or invent unsupported technical claims.

If any project documents conflict or required information is missing, stop and report the issue instead of making assumptions.

---

# Validation

Before completing the task, verify:

* Every generated lesson perfectly matches `TEMPLATE_LESSON.md`.
* Code blocks are syntactically valid and include expected outputs.
* Diagrams are valid Mermaid syntax.
* Content meets the definition of done established in `STYLE_GUIDE.md`.

---

# Expected Output

Return fully populated, production-ready markdown lesson files written directly into `output/generated/`.

---

# Completion Criteria

The task is complete only when:

* All assigned lessons in the execution batch have been generated into `output/generated/`.
* Internal validation against `TEMPLATE_LESSON.md` passes.
* A complete review report is generated.
* No unresolved assumptions remain.
