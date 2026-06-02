---
name: rexboard-map-generation-and-import
description: "Use this skill when working with RexBoard hexagonMap, HexagonMap helpers, GetHexagonMap, GetParallelogramMap, GetTriangleMap, generated board coordinate sets, create board from tilemap, createBoardFromTilemap, or map-driven createTileTexture workflows. Triggers on: RexBoard hexagonMap, GetHexagonMap, GetParallelogramMap, GetTriangleMap, createBoardFromTilemap, board tilemap import."
---

# RexBoard Map Generation And Import

Use this skill for RexBoard helper APIs that create coordinate sets or derive boards from data.

## Use This First

Choose the import/generation path:

| Need | Use |
|---|---|
| Hexagon-shaped coordinate set | `hexagonMap.hexagon(board, radius)` |
| Triangle-shaped coordinate set | `hexagonMap.triangle(board, type, height)` |
| Parallelogram coordinate set | `hexagonMap.parallelogram(board, type, width, height)` |
| Board from Phaser tilemap | `createBoardFromTilemap(tilemap, layers)` |
| Texture for generated tiles | `createTileTexture(board, key, ...)` |

## Required Setup

This skill assumes RexBoard setup. Hexagon map helpers need an existing board or logic board because coordinate generation depends on board/grid behavior.

## References

Read these only when needed:

- `references/hexagon-map.md`: `HexagonMap.hexagon`, `triangle`, and `parallelogram` signatures and coordinate application.
- `references/tilemap-board.md`: `CreateBoardFromTilemap` workflow and layer argument forms.
- `references/map-generation-recipes.md`: reduced recipes for hexagon, triangle, parallelogram, and tilemap import.

## Core Rules

- Hexagon map helpers return `TileXYType[]`; they do not create boards or render tiles.
- Use `board.fit(tileXYArray)` when generated coordinates should define board extents.
- `createBoardFromTilemap` returns a `Board` from a Phaser tilemap and selected layers.
- `createTileTexture` creates texture assets, not board coordinates or chess placement.
- Keep generated coordinate sets separate from rendering and gameplay population.

## Source File Map

- `plugins/board/hexagonmap/index.d.ts`: helper namespace shape.
- `plugins/board/hexagonmap/GetHexagonMap.d.ts`: hexagon coordinate helper.
- `plugins/board/hexagonmap/GetTriangleMap.d.ts`: triangle coordinate helper.
- `plugins/board/hexagonmap/GetParallelogramMap.d.ts`: parallelogram coordinate helper.
- `plugins/board/tilemap/CreateBoardFromTilemap.d.ts`: tilemap-to-board helper.
- `plugins/board/texture/CreateTileTexture.d.ts`: board tile texture helper.

## Related Skills

- `rexboard-grids-and-coordinates`: board/grid coordinate behavior.
- `rexboard-board-and-chess`: board dimensions, `fit`, and chess population.
- `rexboard-rendered-tiles-and-pieces`: generated tile textures and rendered board objects.

## Gotchas

- `createBoardFromTilemap` returns a board from a Phaser tilemap; verify layers and `tileZ` conventions before adding game rules.
- Hexagon map helpers are exposed as `this.rexBoard.hexagonMap.*`, not `this.rexBoard.add.*`.
- Tilemap import and rendered tile texture workflows overlap; route rendering details to `rexboard-rendered-tiles-and-pieces`.
