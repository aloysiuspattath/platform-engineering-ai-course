# AI Commands

Version: 1.0.0

---

# Purpose

This document defines the standard commands used to interact with the AI curriculum generation system.

Commands provide a consistent interface regardless of the underlying AI model.

Each command specifies:

* Purpose
* Responsible Agent
* Required Inputs
* Expected Outputs
* Output Location

---

# General Rules

All commands must:

* Read `.ai/context.md`
* Read `.ai/project_state.yaml`
* Follow project standards
* Follow the workflow
* Validate outputs before completion

Generated artifacts must never be written directly into production directories.

Use the output staging pipeline.

---

# Command: init-project

Purpose

Initialize an AI session.

Agent

System

Inputs

* .ai/context.md
* .ai/project_state.yaml

Outputs

Loaded project context.

---

# Command: generate-templates

Purpose

Generate or update canonical templates.

Agent

Template Architect

Inputs

* Standards
* AI Context

Outputs

* TEMPLATE_LESSON.md
* TEMPLATE_LAB.md
* TEMPLATE_PROJECT.md
* TEMPLATE_QUIZ.md
* TEMPLATE_CHEATSHEET.md

Destination

standards/templates/

---

# Command: build-curriculum

Purpose

Generate the curriculum.

Agent

Curriculum Architect

Outputs

* curriculum.md
* module-map.md
* learning-order.md

Destination

curriculum/

---

# Command: generate-lesson

Purpose

Generate a lesson.

Agent

Lesson Author

Inputs

* Module
* Lesson Template

Outputs

Lesson Draft

Destination

output/generated/

---

# Command: generate-lab

Purpose

Generate a lab.

Agent

Lab Designer

Destination

output/generated/

---

# Command: generate-project

Purpose

Generate a project.

Agent

Project Designer

Destination

output/generated/

---

# Command: generate-quiz

Purpose

Generate quizzes.

Agent

Quiz Generator

Destination

output/generated/

---

# Command: generate-cheatsheet

Purpose

Generate cheat sheets.

Agent

Quiz Generator

Destination

output/generated/

---

# Command: technical-review

Purpose

Perform technical review.

Agent

Reviewer

Destination

output/reviewed/

---

# Command: qa-review

Purpose

Perform QA validation.

Agent

QA Validator

Destination

output/approved/

---

# Command: publish

Purpose

Promote approved artifacts into the course.

Agent

Publisher

Destination

modules/
labs/
projects/
quizzes/
cheatsheets/

---

# Command: update-state

Purpose

Update `.ai/project_state.yaml`.

Agent

System

---

# Command: status

Purpose

Display current project status.

Information includes:

* Current phase
* Active agent
* Current task
* Completed milestones
* Pending work

---

# Standard Command Lifecycle

Every command follows this sequence.

Initialize

↓

Load Context

↓

Load Standards

↓

Execute

↓

Validate

↓

Report

↓

Update Project State

↓

Complete

---

# Exit Conditions

A command is considered complete only when:

* Required outputs exist.
* Validation passes.
* Output is stored in the correct location.
* Project state is updated.
* Errors and assumptions are reported.

---

# Error Handling

If execution cannot continue:

* Stop.
* Report the issue.
* Do not invent missing information.
* Request clarification when necessary.

---

# Future Commands

Examples of future additions:

* generate-diagram
* build-website
* export-pdf
* generate-video-script
* translate-course
* update-version
* validate-links
* regenerate-module

All future commands must follow the same structure.

---

# Definition of Success

Commands provide a stable interface between developers, AI agents, and automation tools.

The command interface should remain consistent even if the underlying AI models or orchestration systems change.

