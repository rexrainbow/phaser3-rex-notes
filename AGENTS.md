# AGENTS.md

## Project Purpose

This repository contains plugins for the Phaser 3 game engine.

## Directory Overview

- `plugins`
  Contains third-party game objects and related extensions.
  - `plugins/gameobjects`
    Custom game object implementations provided by external sources.

- `templates`
  Composed objects built using the base components provided by the `plugins` directory.
  - `templates/ui`
    A collection of UI components built using the rexUI plugin set.

## Repository Access Policy

Automated agents and AI systems may **edit files locally** in a developer-controlled workspace (e.g., VS Code),
but must **never submit changes** to any remote repository or open PRs.

### Allowed (Local-only)
- Read, summarize, document, and statically analyze the codebase.
- Create or modify local files to propose changes (patches) for human review.
- Produce diffs/patches and explain rationale for the proposed changes.

### Strictly Prohibited (No submit / no publish)
- Do **not** `git commit`, `git push`, `git fetch --all` with side effects, or modify remotes.
- Do **not** open pull requests, merge requests, or apply changes directly to any hosted repository.
- Do **not** trigger or modify CI/CD or workflows with the intent to run jobs remotely.
- Do **not** publish changes to package registries, releases, or any external distribution channel.

### Execution and Testing
- Do **not** execute, run, or test code from this repository unless a human explicitly requests it.
- If execution is explicitly requested, limit actions to the smallest scope needed and describe what will run.

### Language Policy
- **In-repository comments** (code comments, doc comments, inline notes, TODOs) must use **ASCII English only**
  (half-width characters). Do **not** add Traditional Chinese or other non-ASCII text inside repository files.
- **Discussion and explanations** in chat/issues/reviews should use **Traditional Chinese** by default.

## Refactoring and Architecture Consultant Mode (Preferred)

The maintainer explicitly prefers agents to operate in an **architecture consultant** mode by default.

Agents should assume maintainer-level authority for proposing changes and are encouraged to recommend
**structural improvements over minimal diffs**, including foundational refactors and multi-file changes.

When proposing changes, prioritize:
- Architectural clarity, consistency, and long-term maintainability.
- Cohesive module boundaries and clean abstractions across the repository.
- Removal of duplication and reduction of technical debt, even if it increases diff size.

Agents should NOT:
- Artificially constrain proposals to reduce the number of files changed if that results in worse design.
- Limit refactors to localized patches when a broader redesign would be cleaner.

Large or invasive proposals are acceptable as long as:
- The rationale and tradeoffs are clearly explained.
- The changes are internally consistent and follow a clear organizing principle.
- The result is reviewable as a conceptual refactor or a patch series (e.g., staged diffs).

## Operational Notes
- All edits must be clearly attributable: prefer small, reviewable changes and include explanations.
- If uncertain whether an action is permitted, default to **read-only** behavior and ask a human.

## Agent Workflow (Read First)

Before making any modifications in this repository:

1. Identify the type of files being edited (for example: `.d.ts`, `.js`, `.ts`).
2. Read `CONTRIBUTING.md` and locate the section that corresponds to the file type.
3. Follow the most specific applicable rules before starting any edits.

Do not begin modifications until the relevant contribution rules are understood.
