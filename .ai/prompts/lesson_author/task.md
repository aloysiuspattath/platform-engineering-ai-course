# Lesson Author — Task

Version: 2.0.0

---

# Objective

Generate production-quality, highly instructional markdown lessons for the **Platform Engineering & AI Infrastructure Course** based on the approved curriculum blueprint.

Every lesson must strictly adhere to the structural layout defined in `TEMPLATE_LESSON.md`, embody the Version 2.0 educational philosophy of a world-class technical instructor, enforce the formal Difficulty Progression Model, and directly fulfill the active **Capability Statement**.

Write generated lessons into `output/generated/`.

Do not generate standalone labs, projects, quizzes, cheat sheets, or website content.

---

# Deliverables

Generate the specific lesson markdown files assigned in the current execution queue into:

`output/generated/`

Each file must be named according to its canonical lesson ID (e.g., `output/generated/module-01/lesson-01.md`).

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

For every assigned lesson, you must populate all 21 standard sections defined in `TEMPLATE_LESSON.md` while embedding the Version 2.0 teaching framework:

1. Lesson Metadata
2. Lesson Overview (Must explicitly weave in the active **Capability Statement**)
3. Learning Objectives (Must explicitly support the active **Capability Statement**)
4. Prerequisites (Relying *only* on preceding lessons)
5. Why This Exists (Motivation before implementation)
6. Core Concepts (Mental models before syntax)
7. Architecture (Clear Mermaid / ASCII diagrams)
8. Real-World Example (Production perspective)
9. Hands-on Demonstration (Input → Code → Expected Output → Explanation)
10. Hands-on Lab (Summary & pointer to standalone lab)
11. Production Notes (High-level context appropriate for the module level)
12. Common Mistakes (Empathetic guidance)
13. Failure-Driven Learning (Safe, instructive failure simulation)
14. Engineering Decisions (Trade-off intuition)
15. Best Practices (Actionable rules)
16. Troubleshooting Guide (Problem → Cause → Diagnosis → Solution)
17. Summary (Key takeaways)
18. Cheat Sheet (Summary & pointer to standalone cheat sheet)
19. Knowledge Check (Pointer to standalone quiz)
20. Interview Preparation (Appropriate depth tiers)
21. Further Reading (Signposting advanced deep-dives)

---

# Execution Scope & Progression

When authoring a lesson, inspect its parent module and enforce the correct difficulty ratio:
* **Module 01 (`MOD-LINUX-BEG`):** 100% Beginner / 0% Intermediate / 0% Advanced. Keep explanations deeply intuitive. Omit deep kernel tracing or complex C-library mechanics.
* **Module 02 (`MOD-LINUX-ADM`):** 70% Beginner / 30% Intermediate / 0% Advanced. Focus on clear server administration and permissions.
* **Module 03 (`MOD-LINUX-INT`):** 20% Beginner / 50% Intermediate / 30% Advanced. Dive into kernel system calls, cgroups, and namespaces.
* **Module 04 (`MOD-NET`):** 60% Beginner / 40% Intermediate / 0% Advanced.
* **Module 05+:** Intermediate → Advanced. Ramp up production complexity as prerequisite knowledge accumulates.

---

# Constraints

Do not:

* Modify or rewrite `curriculum/curriculum.md`.
* Generate standalone lab files in `labs/`.
* Generate standalone project files in `projects/`.
* Generate standalone quiz files in `quizzes/`.
* Generate standalone cheat sheets in `cheatsheets/`.
* Introduce senior-level production internals prematurely in beginner lessons.

If any project documents conflict or required information is missing, stop and report the issue instead of making assumptions.

---

# Validation

Before completing the task, verify:

* Every generated lesson perfectly matches `TEMPLATE_LESSON.md`.
* The six core questions (What, Why, When, How, Production, Advanced Signposting) are fully answered.
* The lesson explicitly fulfills the active Capability Statement.
* Code blocks are syntactically valid and include expected outputs.
* Diagrams are valid Mermaid syntax and easy to understand.
* Content meets the Version 2.0 educational quality gates.

---

# Expected Output

Return fully populated, highly instructional markdown lesson files written directly into `output/generated/`.

---

# Completion Criteria

The task is complete only when:

* All assigned lessons in the execution batch have been generated into `output/generated/`.
* Internal validation against `TEMPLATE_LESSON.md` and the educational progression model passes.
* A complete Version 2.0 review report is generated.
* No unresolved assumptions remain.


---

# CRITICAL METADATA REQUIREMENT

You MUST prepend a fully populated YAML frontmatter block at the very top (Line 1) of every generated markdown file. Do NOT hardcode the legacy metadata inside the markdown body.
Generate this YAML block strictly according to the schema defined in standards/metadata/lesson.schema.yaml.
