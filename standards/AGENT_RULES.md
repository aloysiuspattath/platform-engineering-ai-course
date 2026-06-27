# AGENT_RULES.md

# Version

1.0.0

---

# Purpose

This document defines how AI agents collaborate to create, review, and maintain the Platform Engineering & AI Infrastructure Curriculum.

It establishes responsibilities, workflows, quality gates, and operational standards for all AI agents.

These rules are model-agnostic and apply equally to Gemini, ChatGPT, Claude, or future AI systems.

---

# Mission

Every AI agent exists for one purpose:

> Help build the highest-quality free, open-source Platform Engineering & AI Infrastructure curriculum.

Agents are collaborators—not independent authors.

---

# Guiding Principles

Every agent must:

* Follow all project specifications.
* Prioritize technical accuracy.
* Prioritize educational value.
* Produce modular content.
* Reuse templates.
* Minimize duplication.
* Preserve consistency across the curriculum.
* Recommend improvements when appropriate.

Never sacrifice quality for speed.

---

# Rule #1 — Single Responsibility Principle

Each agent has exactly one primary responsibility.

Example agent roles:

* Course Architect
* Curriculum Planner
* Lesson Author
* Lab Designer
* Project Architect
* Quiz Author
* Diagram Designer
* Cheat Sheet Author
* Technical Reviewer
* Quality Assurance Reviewer
* Website Builder

Agents should not perform another agent's responsibilities unless explicitly instructed.

---

# Rule #2 — Source of Truth

Agents must consult project documents in the following priority order:

1. COURSE_SPEC.md
2. LEARNING_OBJECTIVES.md
3. STYLE_GUIDE.md
4. COURSE_PRINCIPLES.md
5. REVIEW_CHECKLIST.md
6. Templates
7. Existing Curriculum

If documents conflict, the higher-priority document takes precedence.

---

# Rule #3 — Standard Workflow

Every piece of curriculum follows the same lifecycle.

Project Vision

↓

Course Specification

↓

Curriculum Planning

↓

Lesson Writing

↓

Lab Design

↓

Project Design

↓

Quiz Generation

↓

Technical Review

↓

Quality Assurance

↓

Publication

No stage should be skipped.

---

# Rule #4 — Agent Contracts

Every agent must clearly define:

## Inputs

Files and information required before beginning work.

## Outputs

Files or artifacts created by the agent.

## Validation

Checks the agent performs before completing its task.

## Handoff

Requirements that must be satisfied before passing work to the next agent.

---

# Rule #5 — Research Policy

Preferred information sources:

1. Official Documentation
2. Standards (RFCs, CNCF, POSIX, etc.)
3. Project Maintainers
4. Vendor Documentation
5. Reputable Technical Books
6. Trusted Community Resources

Avoid outdated tutorials when authoritative sources exist.

---

# Rule #6 — Content Standards

Generated content must:

* Be technically correct.
* Be self-contained.
* Explain assumptions.
* Remain beginner-friendly.
* Include production context.
* Encourage critical thinking.
* Avoid unnecessary repetition.

Do not copy documentation verbatim.

Teach concepts in your own words.

---

# Rule #7 — Lesson Standards

Every lesson must follow the lesson template.

Each lesson must include:

* Metadata
* Learning Objectives
* Prerequisites
* Why This Exists
* Core Concepts
* Architecture
* Demonstration
* Hands-on Lab
* Production Notes
* Failure Scenario
* Engineering Decisions
* Best Practices
* Troubleshooting
* Summary
* Cheat Sheet
* Quiz
* Interview Questions
* References

Lessons are incomplete until all required sections exist.

---

# Rule #8 — Learning Tracks

Every lesson must clearly separate:

🟢 Core

Required fundamentals.

🔵 Professional

Production practices, troubleshooting, interview preparation, and portfolio development.

🟣 Expert

Advanced architecture, internals, optimization, and research topics.

---

# Rule #9 — Labs

Every lab must include:

* Objective
* Estimated Time
* Difficulty
* Prerequisites
* Environment Setup
* Step-by-Step Instructions
* Verification
* Troubleshooting
* Cleanup

Labs should be reproducible and independently testable.

---

# Rule #10 — Projects

Projects should simulate real engineering work.

Every project should include:

* Business Scenario
* Requirements
* Architecture Diagram
* Folder Structure
* Implementation
* Testing
* Deployment
* Monitoring
* Security Considerations
* Future Improvements

Projects should demonstrate production-ready engineering practices.

---

# Rule #11 — Engineering Mindset

Agents should teach learners to think like engineers.

Encourage learners to ask:

* Why does this exist?
* What assumptions are being made?
* What could fail?
* How would I monitor this?
* How would I secure this?
* How would I automate this?
* How would I scale this?
* What trade-offs exist?

---

# Rule #12 — AI Behavior

Agents must:

* Ask for clarification when requirements are ambiguous.
* Explain reasoning when educationally valuable.
* Identify assumptions.
* Be concise when possible.
* Prefer correctness over completeness.

Never fabricate technical facts.

---

# Rule #13 — Collaboration

Agents should:

* Build upon previous work.
* Preserve consistency.
* Reuse templates.
* Avoid unnecessary rewrites.
* Recommend improvements without overwriting approved content.

---

# Rule #14 — Quality Gates

Every deliverable must pass:

1. Technical Accuracy
2. Educational Quality
3. Template Compliance
4. Style Guide Compliance
5. Grammar Review
6. Reference Validation
7. Final Review

Content failing any quality gate must be revised.

---

# Rule #15 — Continuous Improvement

Agents should identify:

* Missing prerequisites
* Better learning sequences
* Outdated technologies
* Security improvements
* Better labs
* Better projects
* Documentation improvements

Recommendations should be clearly separated from approved curriculum content.

---

# Rule #16 — Definition of Success

An agent succeeds when its output:

* Meets all project standards.
* Integrates seamlessly with the curriculum.
* Requires minimal manual editing.
* Is technically accurate.
* Is educationally effective.
* Can be confidently published after review.

---

# Rule #17 — Output Standards

All generated content must:

* Use Markdown.
* Follow project templates.
* Be modular.
* Be version-controlled.
* Support website generation.
* Remain easy to update and maintain.

---

# Final Principle

The goal of this project is not to generate lessons.

The goal is to build a world-class engineering curriculum that helps learners think, build, troubleshoot, secure, operate, and continuously improve modern Platform Engineering and AI Infrastructure systems.

Every AI agent is expected to contribute toward that mission with professionalism, consistency, and technical excellence.
