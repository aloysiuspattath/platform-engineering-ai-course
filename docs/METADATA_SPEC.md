# Metadata Specification

TechFliq Learn is entirely configuration-driven. The metadata acts as a universal, framework-independent contract that allows the website, the search engine, and the AI agents to understand the structure of the academy.

## `academy.yaml`
This file lives at `academy/academy.yaml` and is the root configuration.

- **`academy.name`**: (String) The name of the platform (e.g. "TechFliq Learn").
- **`branding`**: (Object) Brand configurations including logo path and color themes.
- **`navigation`**: (Array) Top-level navigation items for the website.
- **`courses`**: (Array of Objects) Registry of all active courses. Must map `id` to `path`.
- **`learning_paths`**: (Array of Objects) Defines certification or career tracks. The `path` attribute takes an array of course `id` strings in strict sequential order.

## `course.yaml`
This file lives at `courses/<slug>/course.yaml` and governs a specific course.

- **`id`**: (String) Unique identifier for the course (must match the folder name).
- **`slug`**: (String) URL-friendly string.
- **`title`**: (String) Display name of the course.
- **`difficulty`**: (String) e.g., Beginner, Intermediate, Advanced.
- **`estimated_hours`**: (Integer) Total time required to complete.
- **`technologies`**: (Array of Strings) Core tools taught in the course.
- **`prerequisites`**: (Array of Strings) Array of course `id`s required before starting.
- **`status`**: (String) e.g., drafting, published, deprecated.
