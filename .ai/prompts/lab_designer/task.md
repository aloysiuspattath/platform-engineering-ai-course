# Lab Designer — Task

Version: 1.0.0

---

# Objective

Generate highly realistic, production-inspired, guided hands-on lab markdown files for the **Platform Engineering & AI Infrastructure Course** by translating concepts from approved companion lessons into immersive engineering exercises.

Every lab must strictly adhere to the 11-section canonical lab structure, embody the workplace simulation educational philosophy, implement the four-stage progressive difficulty flow, and incorporate intentional failure-driven troubleshooting scenarios.

Write all generated lab files directly into `output/generated/`.

Do not generate, author, or modify instructional lessons, portfolio projects, quizzes, cheat sheets, or curriculum blueprints.

---

# Deliverables

Generate standalone markdown lab files for the specific modules assigned in the current execution queue into:

`output/generated/`

Each lab file must be named according to its canonical lab ID within the curriculum map.

Example: `output/generated/labs/linux-getting-started.md`

---

# Required Inputs

Before generating any lab content, load and analyze:

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
* Read the canonical lab template: `standards/templates/TEMPLATE_LAB.md`.

## Companion Lesson

* Read the specific approved lesson associated with the lab being generated (located in `output/approved/` or `modules/`).

---

# Mandatory 11-Section Lab Structure

For every assigned lab, you must populate the following 11 mandatory sections in the exact order specified, weaving together `TEMPLATE_LAB.md` requirements with the enriched lab design framework:

```markdown
# [Lab Title: Reflecting Production Challenge]

## 1. Business Scenario
Establish a highly realistic, authentic enterprise scenario modeled after the daily responsibilities of a junior Platform Engineer.
Example: *"You've just joined the infrastructure team. A new Ubuntu server has been provisioned and needs initial setup."*

## 2. Learning Objectives
List 3-5 clear, actionable capabilities the learner will achieve upon successful completion of this lab.

## 3. Prerequisites
Identify required preceding knowledge, local software packages (e.g., Docker, Git, bash), or cloud account access needed prior to execution.

## 4. Environment Setup
Provide step-by-step terminal instructions to safely configure the local or containerized sandbox environment.

## 5. Guided Exercises (With Progressive Difficulty)
Structure the main terminal exercises using the mandatory four-stage progressive difficulty evolution:
* `Stage 1: Guided` (Step-by-step hand-holding with exact commands, complete flags, expected outputs, and deep explanations).
* `Stage 2: Partially Guided` (High-level operational objectives where core commands are given but specific parameters must be recalled).
* `Stage 3: Independent` (Clear engineering tasks where the learner achieves an outcome using accumulated knowledge without copy-pasting).
* `Stage 4: Production Challenge` (A realistic, unassisted enterprise stretch objective cementing professional mastery).

*Note: For every command in Stage 1 and Stage 2, you must explicitly detail: What it does, Why it matters, and What success looks like.*

## 6. Checkpoints
Establish intermediate verification gates between exercise stages to confirm the environment state is correct before proceeding.

## 7. Validation
Provide precise verification commands, automated test scripts, or state checks that definitively prove the entire lab was completed successfully. Include the exact `Expected Output`.

## 8. Troubleshooting (Failure-Driven Learning)
Intentionally introduce one or more common engineering mistakes or simulated failure scenarios. Provide structured guidance teaching the learner how to:
* Read error messages (Break down exit codes and stack traces)
* Diagnose failures (Formulate root cause hypotheses)
* Recover safely (Execute structured remediation workflows)

## 9. Reflection Questions
List 2-3 thoughtful engineering questions that prompt the learner to consider underlying system mechanics, security implications, or architectural trade-offs.

## 10. Cleanup
Provide explicit, non-destructive terminal commands to cleanly destroy temporary resources, stop containers, and remove sandbox directories, restoring the host system to its initial pristine state.

## 11. Stretch Goals
Suggest 1-2 optional, advanced exploration tasks for ambitious learners wishing to deepen their platform engineering mastery.
```

---

# Production Relevance & Safety Constraints

## Production Realism
Ensure your exercises reflect genuine, high-impact enterprise engineering work (e.g., provisioning servers, investigating disk/inode exhaustion, diagnosing network tables, managing multi-tenant users, writing automation scripts). Avoid dry, artificial academic puzzles.

## Absolute Safety
* **No Destructive Commands:** You must never include un-isolated destructive commands (`rm -rf /*`, raw disk formatting) on host filesystems.
* **Explicit Warnings:** Provide bold, prominent warnings before any operation that alters system-wide configuration states.
* **Disposable Sandboxes:** Prefer running operations inside Docker containers, disposable VMs, or temporary workspace directories (`~/platform-labs/`).

---

# Internal Review & Validation Criteria

Before finalizing a lab file, you must internally review and verify the content against the following eight quality gates:

1. **Technical accuracy:** All commands, flags, scripts, and expected outputs are 100% correct and executable.
2. **Safety:** Zero risk of destructive host filesystem modifications; warnings are prominently displayed.
3. **Educational quality:** Clear, encouraging mentorship tone that builds unshakeable learner confidence.
4. **Beginner friendliness:** Concepts are introduced smoothly without jarring jargon spikes.
5. **Production realism:** The business scenario and exercises reflect authentic enterprise engineering work.
6. **Successful completion:** Validation steps and expected outputs definitively prove lab success.
7. **Troubleshooting quality:** The failure-driven learning scenario effectively teaches error diagnosis and safe recovery.
8. **Cleanup completeness:** Cleanup procedures cleanly and completely restore the host environment.

---

# Completion Criteria

The task is complete only when:

* All assigned labs in the execution batch have been successfully generated into `output/generated/`.
* Every generated lab fully populates the mandatory 11-section structure.
* Internal review against the eight quality gates passes perfectly.
* No unverified assumptions or placeholder comments remain.


---

# CRITICAL METADATA REQUIREMENT

You MUST prepend a fully populated YAML frontmatter block at the very top (Line 1) of every generated markdown file. Do NOT hardcode the legacy metadata inside the markdown body.
Generate this YAML block strictly according to the schema defined in standards/metadata/lab.schema.yaml.
