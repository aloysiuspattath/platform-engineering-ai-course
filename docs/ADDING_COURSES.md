# How to Add a Course to TechFliq Learn

TechFliq Learn uses a configuration-first approach to adding new courses. You do not need to modify the platform architecture to introduce new content.

## Step 1: Create the Course Directory
Every new course must be housed in its own directory under `courses/`.
For example, to add a new course on Docker:
```bash
mkdir courses/docker
```

## Step 2: Create the Course Metadata
Create a `course.yaml` inside your new directory. This file acts as the publishing contract.
```yaml
id: docker
slug: docker
title: "Docker & Containerization"
description: "Learn to build, ship, and run any application anywhere."
difficulty: Beginner
duration: "4 Weeks"
estimated_hours: 40
version: "1.0.0"
status: drafting
author:
  name: "TechFliq AI Platform"
```

## Step 3: Register the Course with the Academy
Open the global `academy/academy.yaml` configuration file and add the new course ID and path to the `courses` block:
```yaml
  courses:
    - id: platform-engineering
      path: "/courses/platform-engineering"
    - id: docker
      path: "/courses/docker"
```
If the new course is part of a Learning Path, add its `id` to the respective path's `path` array.

## Step 4: Run the AI Platform
Use the TechFliq Course Generation AI pipeline to generate the markdown content (`modules`, `labs`, `projects`, etc.) into your `courses/docker` directory.

## Step 5: Sync & Publish
Run the sync script to pull your course into the active website structure:
```bash
node website/sync-docs.js
```
Then commit and push your changes. The CI/CD pipeline will automatically build and publish the new course on the TechFliq Learn website!
