# TechFliq Learn Academy Architecture

TechFliq Learn is designed to be a scalable, configuration-driven, multi-course learning ecosystem. The core philosophy is "Build once. Generate forever." This means that the repository architecture supports scaling to unlimited technical courses without requiring modifications to the platform's core code.

## Architecture Layers

The academy is composed of several independent layers to enforce separation of concerns:

### 1. The Configuration Layer (Metadata)
All definitions live as configuration files (`.yaml`).
- `academy/academy.yaml`: The master configuration defining global branding, navigation, search, and the master list of learning paths.
- `courses/<course-slug>/course.yaml`: The metadata contract for an individual course, defining its title, prerequisites, tags, and technologies.

### 2. The Educational Content Layer
Markdown-based content organized strictly by course.
- Each course lives isolated in `courses/<course-slug>/`.
- Content is broken down systematically into: `modules/`, `labs/`, `projects/`, `quizzes/`, and `cheatsheets/`.

### 3. The Build & Sync Pipeline
The `website/sync-docs.js` script dynamically reads the `courses/` directory.
- It iterates over all available courses and maps them into the `website/pages/courses/` routing structure.
- Legacy URLs are preserved via permanent 301 redirects injected dynamically into Next.js configuration.

### 4. The Website Presentation Layer (Nextra)
The user-facing platform that consumes the generated routing tree.
- Uses Nextra 3 on top of Next.js for high-performance static site generation.
- The UI is designed to be premium, responsive, and fully aware of the multi-course catalog and learning path graphs.
