---
name: rexboard-visibility-and-routes
description: "Use this skill when working with RexBoard fieldOfView, FieldOfView, board visibility, line of sight, LOS, blockers, cone mode, visible tiles, RexBoard Monopoly, board route traversal, route cost, or directional board paths. Triggers on: RexBoard fieldOfView, FieldOfView, board visibility, line of sight, LOS, RexBoard Monopoly, board route."
---

# RexBoard Visibility And Routes

Use this skill for board algorithms that answer visibility and route traversal questions.

## Use This First

Choose the helper:

| Need | Use |
|---|---|
| Visible tiles around a chess piece | `FieldOfView.findFOV(...)` |
| Can a piece see a target | `FieldOfView.isInLOS(...)` or `LOS(...)` |
| Filter visible targets | `FieldOfView.LOS(targets, ...)` |
| Directional route traversal | `Monopoly.getPath(...)` |
| Route stop/blocker rules | `Monopoly.costCallback` |

## Required Setup

This skill assumes pieces are already registered as RexBoard chess. If not, use `rexboard-board-and-chess`.

## References

Read these only when needed:

- `references/fieldofview-config.md`: FOV config, callbacks, costs, blockers, LOS, and cone options.
- `references/monopoly-config.md`: route traversal config, callbacks, and sentinels.
- `references/visibility-route-recipes.md`: reduced recipes for visible tiles, LOS, target filtering, and route paths.

## Core Rules

- Use `FieldOfView` for visibility; use `PathFinder` for shortest/reachable paths.
- Use `Monopoly` for directional route traversal, not general A* pathfinding.
- Keep occupied tests, blocker tests, pre-test callbacks, and cost callbacks separate.
- Use instance sentinels (`fov.BLOCKER`, `fov.INFINITY`, `monopoly.STOP`, `monopoly.BLOCKER`) in callbacks.
- Choose `coneMode: 'direction'` for grid-direction cones and `coneMode: 'angle'` for angular cones.

## Source File Map

- `plugins/board/fieldofview/FieldOfView.d.ts`: visibility config, callbacks, LOS, and FOV methods.
- `plugins/board/monopoly/Monopoly.d.ts`: route config, cost callback, and path methods.
- `plugins/board/fieldofview/Factory.js`: `fieldOfView` factory signature.
- `plugins/board/monopoly/Factory.js`: `monopoly` factory signature.

## Related Skills

- `rexboard-board-and-chess`: board chess and blockers.
- `rexboard-grids-and-coordinates`: directions, cones, distances, and line tile queries.
- `rexboard-movement-and-pathfinding`: PathFinder and MoveTo workflows.

## Gotchas

- `FieldOfView.BLOCKER` is `null`; `FieldOfView.INFINITY` is `undefined`.
- `Monopoly.STOP` is `-1`; `Monopoly.BLOCKER` is `null`.
- `LOS` has several overloads; keep argument order explicit in generated code.
