---
name: rexboard-grids-and-coordinates
description: "Use this skill when working with RexBoard grid coordinates, quadGrid, hexagonGrid, tileXY, worldXY, tile-to-world conversion, world-to-tile conversion, orthogonal, isometric, staggeraxis, staggerindex, direction indexes, neighbor tiles, or board grid shape queries. Triggers on: RexBoard grid, rexBoard quadGrid, rexBoard hexagonGrid, tileXY, worldXY, getWorldXY, getTileXY, RexBoard direction, RexBoard neighbors."
---

# RexBoard Grids And Coordinates

Use this skill for RexBoard coordinate systems and board geometry. It covers quad/hex grid creation, tile/world conversion, neighbor directions, and shape-to-tile queries.

## Use This First

Pick the grid factory before writing board logic:

| Need | Use |
|---|---|
| Orthogonal square/rect board | `quadGrid` with `type: 'orthogonal'` |
| Isometric diamond board | `quadGrid` with `type: 'isometric'` |
| Hex board | `hexagonGrid` with `staggeraxis` and `staggerindex` |

Then pass the grid into `this.rexBoard.add.board({ grid, width, height })` or `new Board(scene, { grid, width, height })`.

## Required Setup

This skill assumes RexBoard is available as `this.rexBoard` or through direct imports from `board-components.js`. If not, use `rexboard-setup-and-factory`.

## References

Read these only when needed:

- `references/grid-config.md`: quad/hex config fields and embedded board grid configs.
- `references/coordinate-conversion.md`: `getWorldXY`, `getTileXY`, board conversion, bounds, and shape queries.
- `references/directions-and-neighbors.md`: direction indexes, neighbor APIs, range queries, and quad/hex direction notes.
- `references/grid-recipes.md`: reduced recipes for orthogonal, isometric, hex, and pointer-to-tile patterns.

## Core Rules

- A `Board` delegates coordinate conversion to its `grid`.
- Prefer board conversion methods after a board exists: `tileXYToWorldXY`, `worldXYToTileXY`, and `worldXYSnapToGrid`.
- Use raw grid methods only for grid-only work: `grid.getWorldXY`, `grid.getTileXY`, `grid.getGridPoints`, and `grid.getBounds`.
- Quad `dir: '4dir'` versus `dir: '8dir'` changes neighbor directions.
- Hex `staggeraxis` and `staggerindex` affect both visual layout and adjacency.
- Direction indexes depend on grid mode. Avoid hard-coding semantic names unless the grid mode is fixed.

## Source File Map

- `plugins/board/grid/quad/Quad.d.ts`: quad grid config and conversion methods.
- `plugins/board/grid/hexagon/Hexagon.d.ts`: hex grid config and conversion methods.
- `plugins/board/board/LogicBoard.d.ts`: board-level conversion, bounds, neighbors, ranges, and shape queries.
- `plugins/board/grid/quad/Factory.js`: `quadGrid` factory signature.
- `plugins/board/grid/hexagon/Factory.js`: `hexagonGrid` factory signature.

## Related Skills

- `rexboard-setup-and-factory`: plugin setup and factory discovery.
- `rexboard-components-catalog`: choose a board component family.
- `rexboard-board-and-chess`: board construction, `tileZ`, occupancy, and input events.
- `rexboard-map-generation-and-import`: generated hex map coordinate sets.

## Gotchas

- `wrap` and `infinity` are board settings, not grid settings, but they change neighbor and bounds behavior.
- `tileX`/`tileY` identify grid coordinates; chess placement also needs `tileZ`.
- Shape-to-tile queries return tile coordinate arrays, not chess objects.
