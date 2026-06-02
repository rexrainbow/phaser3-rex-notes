---
name: rexboard-movement-and-pathfinding
description: "Use this skill when working with RexBoard moveTo, pathFinder, MoveTo, PathFinder, moveToward, moveToRandomNeighbor, board paths, A*, occupiedTest, blockerTest, moveableTest, path costs, reachable areas, or tile-by-tile board movement. Triggers on: RexBoard moveTo, RexBoard pathFinder, board path, A*, occupiedTest, blockerTest, moveableTest, findArea, findPath."
---

# RexBoard Movement And Pathfinding

Use this skill for moving board chess and planning paths across RexBoard tiles.

## Use This First

Choose the movement tool:

| Need | Use |
|---|---|
| Animate a chess game object tile-by-tile | `MoveTo` |
| Test one destination tile | `MoveTo.canMoveTo(...)` |
| Find reachable area | `PathFinder.findArea(...)` |
| Find a path to a destination | `PathFinder.findPath(...)` |
| Use terrain costs or A* modes | `PathFinder` with `costCallback` |

Most tactical movement uses both: pathfind first, then move step-by-step.

## Required Setup

This skill assumes the moving chess is already on a RexBoard board. If not, use `rexboard-board-and-chess`.

## References

Read these only when needed:

- `references/moveto-config.md`: `MoveTo` config, methods, runtime setters, and events.
- `references/pathfinder-config.md`: `PathFinder` config, path modes, cost callbacks, and query APIs.
- `references/blockers-and-costs.md`: occupied tests, blocker tests, moveable tests, and cost semantics.
- `references/movement-recipes.md`: reduced recipes for moving toward a tile, following a path, and reachable tiles.

## Core Rules

- `MoveTo` needs a chess game object already registered on a board.
- `PathFinder` can be constructed with a game object or config; call `setChess(gameObject)` when created detached.
- Keep `occupiedTest`, `blockerTest`, and custom tests separate.
- Use `PathFinder.BLOCKER`/`INFINITY` from the instance in callbacks instead of hard-coded sentinel values.
- Use board occupancy and `tileZ` conventions consistently between movement and pathfinding.

## Source File Map

- `plugins/board/moveto/MoveTo.d.ts`: movement config, methods, and callback types.
- `plugins/board/pathfinder/PathFinder.d.ts`: path config, path modes, costs, and query methods.
- `plugins/board/moveto/Factory.js`: `moveTo` factory signature.
- `plugins/board/pathfinder/Factory.js`: `pathFinder` factory signatures.
- `plugins/board/moveto/methods/*.js`: inspect only when movement behavior is unclear.

## Related Skills

- `rexboard-board-and-chess`: board occupancy, `tileZ`, and chess placement.
- `rexboard-grids-and-coordinates`: directions, neighbors, distance, and wrap behavior.
- `rexboard-visibility-and-routes`: LOS and Monopoly route traversal.
- `rexboard-miniboard-and-composite`: MiniBoard-specific movement workflows.

## Gotchas

- `sneak` affects movement occupancy behavior; do not use it unless game rules require passing through occupied tiles.
- `MoveTo` mutates board chess position before the visual tween completes; account for this when checking occupancy during movement.
- `wrap` can make a neighbor move render as split movement across board edges.
