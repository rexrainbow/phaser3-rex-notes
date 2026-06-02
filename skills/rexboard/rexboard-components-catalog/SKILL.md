---
name: rexboard-components-catalog
description: "Use this skill when choosing RexBoard components, browsing the RexBoard component catalog, answering which RexBoard board/grid/chess helper to use, or routing a RexBoard request to the right specialized skill. Triggers on: RexBoard components, RexBoard catalog, which RexBoard, RexBoard API list, board-components, rexBoard factory list."
---

# RexBoard Components Catalog

Use this skill as the component selection index for RexBoard. It should answer "Which RexBoard component should I use?" and then route to the correct specialized RexBoard skill for implementation details.

## Use This First

For any RexBoard request:

1. Confirm the project has RexBoard setup. If not, use `rexboard-setup-and-factory`.
2. Identify the board-game intent: grid, board/chess, rendering, movement/pathfinding, matching, MiniBoard, visibility/routes, or map import.
3. Read `references/component-catalog.md` to choose the component and related skill.
4. Use the specialized skill for config details and recipes.

## Routing

| User asks for | Route to |
|---|---|
| Plugin install, `this.rexBoard`, factory names | `rexboard-setup-and-factory` |
| Quad/hex grids, tile/world conversion, directions | `rexboard-grids-and-coordinates` |
| Board model, chess placement, occupancy, input events | `rexboard-board-and-chess` |
| Shape/image/sprite chess, tile texture, tilemap visuals | `rexboard-rendered-tiles-and-pieces` |
| Animated movement, reachable areas, paths, blockers/costs | `rexboard-movement-and-pathfinding` |
| Symbol matching, match-3, group matching | `rexboard-match-and-puzzle` |
| Composite grouped pieces, drag/drop placement | `rexboard-miniboard-and-composite` |
| Field of view, line of sight, route traversal | `rexboard-visibility-and-routes` |
| Hexagon map helpers, tilemap import, generated coordinates | `rexboard-map-generation-and-import` |

## Reference

Read `references/component-catalog.md` for the complete compact selection table.

## Selection Rules

- Use `Board` as the central data model for placement, occupancy, bounds, input, and board-level coordinate conversion.
- Use `QuadGrid` or `HexagonGrid` before board operations that need coordinates.
- Use plain Phaser game objects plus `board.addChess(...)` when rendering is custom.
- Use RexBoard `Shape`, `Image`, or `Sprite` when the object should be created directly at board tile coordinates.
- Use `MoveTo` for animated tile movement and `PathFinder` for planning.
- Use `Match` for symbols and patterns; it does not replace board occupancy.
- Use `MiniBoard` when multiple chess pieces move, rotate, mirror, or place as one composite.

## Gotchas

- This skill is an index, not a config reference. Do not invent full configs from it alone.
- Do not trigger on generic board-game questions unless the user mentions RexBoard, `rexBoard`, board-components, or Rex plugin usage.
- Some behavior details are clearer in implementation than in `.d.ts`; for exact events and factory signatures, inspect `plugins/board/<component>/Factory.js` or the relevant source file.
- Keep helper/factory boundaries clear: factories are on `this.rexBoard.add`, helpers are on `this.rexBoard`.
