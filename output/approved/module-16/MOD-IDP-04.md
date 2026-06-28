---
id: "MOD-IDP-04"
title: "Building Internal Developer Platforms with Backstage"
module: "MOD-IDP"
type: "lesson"
difficulty: "Advanced"
estimated_reading_time: "15m"
estimated_hands_on_time: "0m"
learning_objectives:
  - "Understand the architecture of Spotify's Backstage."
  - "Learn how to integrate plugins and catalogs."
prerequisites:
  - "MOD-IDP-03"
related_lessons:
  - "MOD-IDP-05"
related_labs:
  - "LAB-IDP-01"
related_projects:
  - "PROJ-IDP-01"
related_quizzes:
  - "QUIZ-IDP"
related_cheatsheets:
  - "CS-IDP"
tags:
  - "Platform Engineering"
  - "IDP"
  - "Backstage"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Building Internal Developer Platforms with Backstage

Backstage is an open-source framework for building developer portals, originally created by Spotify.

## Core Components

1. **Software Catalog**: A centralized registry of all software components (microservices, libraries, data pipelines, websites).
2. **Software Templates**: A tool for creating new projects rapidly using organizational standards.
3. **TechDocs**: A docs-like-code solution built directly into Backstage.
4. **Plugins**: An extensible ecosystem that allows integration with CI/CD tools, monitoring systems, and cloud providers.
