# Template Architect — Examples

Version: 1.0.0

---

# Purpose

This document demonstrates the expected quality, consistency, and structure of generated templates.

Examples illustrate patterns—not complete educational content.

Agents should learn the design principles rather than copying the examples.

---

# Example 1 — Template Metadata

Every template should begin with clear metadata.

```markdown
# Template Name

Version: 1.0.0

Purpose

Required Inputs

Outputs
```

Good

* Consistent
* Simple
* Human readable

Avoid

* Missing version
* Missing purpose
* Missing metadata

---

# Example 2 — Clear Placeholders

Good

```markdown
## Learning Objectives

<!-- AI generates learning objectives here -->
```

Bad

```markdown
## Learning Objectives

Lorem ipsum...
```

Templates should use explicit placeholders instead of example educational content.

---

# Example 3 — Logical Section Order

Good

Metadata

↓

Overview

↓

Objectives

↓

Theory

↓

Practice

↓

Summary

Bad

Summary

↓

Objectives

↓

Theory

↓

Metadata

Sections should follow a logical learning progression.

---

# Example 4 — Reusable Design

Good

```markdown
## Hands-on Lab

Objective

Estimated Time

Prerequisites

Environment

Instructions

Verification
```

Bad

```markdown
## Kubernetes Lab
```

Templates should remain technology-agnostic whenever possible.

---

# Example 5 — Consistent Formatting

Use:

* Markdown headings
* Lists
* Tables where appropriate
* Consistent spacing

Avoid:

* Mixed heading styles
* Inconsistent indentation
* Decorative formatting

---

# Example 6 — AI-Friendly Templates

Good

```markdown
## Placeholder

<!-- Generate concise explanation -->
```

Good placeholders explain what should be generated.

---

# Example 7 — Human-Friendly Templates

Templates should be understandable without reading project documentation.

A contributor opening the template should immediately understand how to use it.

---

# Example 8 — Maintainability

Good

One reusable section.

Bad

Repeated copies of the same structure.

Minimize duplication.

---

# Guiding Principle

Generate templates that are:

* Predictable
* Reusable
* Easy to populate
* Easy to review
* Easy to maintain

Templates should define structure—not educational content.
