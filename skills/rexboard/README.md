# RexBoard Skills Maintenance Guide

This README is a maintainer guide for the repository-local RexBoard skill set. It is not itself a Codex skill.

Each subfolder with a `SKILL.md` is an independent skill draft. When RexBoard changes, update the smallest relevant skill/reference files and keep `rexboard-components-catalog` as the routing index.

## Folder Role

This folder stages Codex skills for:

```text
plugins/board-plugin.js
plugins/board-components.js
plugins/board/**
```

Do not treat this folder as a single skill. For installation or discovery, each child folder should be copied or linked as its own skill folder.

## Skill Set Outline

| Skill | Responsibility |
| --- | --- |
| `rexboard-setup-and-factory` | Plugin setup, `BoardPlugin`, `mapping: 'rexBoard'`, direct barrel imports, factory registration. |
| `rexboard-components-catalog` | Component selection index and routing to specialized skills. |
| `rexboard-grids-and-coordinates` | Quad/hex grids, tile/world conversion, directions, neighbors, grid shape queries. |
| `rexboard-board-and-chess` | Board data model, `tileZ`, chess placement, occupancy, board input events. |
| `rexboard-rendered-tiles-and-pieces` | Board-aware `Shape`, `Image`, `Sprite`, tile textures, tilemap-rendered workflows. |
| `rexboard-movement-and-pathfinding` | `MoveTo`, `PathFinder`, movement tests, blockers, costs, reachable areas, paths. |
| `rexboard-match-and-puzzle` | `Match`, symbols, wildcard, `dirMask`, line/group matching, match puzzle flows. |
| `rexboard-miniboard-and-composite` | `MiniBoard`, composite pieces, drag/drop placement, rotate/mirror, put back flows. |
| `rexboard-visibility-and-routes` | `FieldOfView`, LOS, visibility costs, `Monopoly`, route traversal. |
| `rexboard-map-generation-and-import` | `HexagonMap`, generated tile coordinate sets, tilemap board import. |

## Source Of Truth

Prefer these sources when updating skills:

| Source | Use |
| --- | --- |
| `plugins/board-plugin.js` | Check scene plugin construction, helpers, and factory imports. |
| `plugins/board-plugin.d.ts` | Check public factory names and helper method names. |
| `plugins/board-components.js` | Check direct barrel export names. |
| `plugins/board-components.d.ts` | Check TypeScript-facing direct exports. |
| `plugins/board/ObjectFactory.js` | Check factory registration mechanism. |
| `plugins/board/<component>/Factory.js` | Confirm exact `this.rexBoard.add.*` factory name and argument shape. |
| `plugins/board/<component>/*.d.ts` | Confirm config fields, events, methods, callback types, and public names. |
| `plugins/board/<component>/*.js` | Read implementation details only when `.d.ts` is insufficient or contradictory. |
| `examples/` | Use only as source material for reduced patterns; never make skills depend on reading examples at usage time. |

For npm-installed project examples, use package paths such as:

```js
import BoardPlugin from 'phaser4-rex-plugins/plugins/board-plugin.js';
```

Local paths such as `plugins/board/board/Board.js` are source-map paths for maintainers.

## Updating Existing Skills

Keep responsibilities split:

- `SKILL.md`: concise trigger-specific rules, routing, source map, and gotchas.
- `references/*-catalog.md`: component choice tables and source links.
- `references/*-config.md`: config fields, event names, method summaries, and exact signatures.
- `references/*-recipes.md`: reduced patterns that Codex can adapt without reading `examples/`.
- `rexboard-components-catalog/references/component-catalog.md`: global component index.

Avoid duplicating the same long table or recipe in multiple skills. Link to the owning reference instead.

## Common Gotchas To Preserve

- `this.rexBoard` exists only after `BoardPlugin` is installed with `mapping: 'rexBoard'`.
- Factories live on `this.rexBoard.add`; helper APIs such as `hexagonMap`, `createTileTexture`, and `createBoardFromTilemap` live directly on `this.rexBoard`.
- `board-components.js` direct exports and `board-plugin.js` scene plugin factories are different entry styles.
- A board needs a grid; grid choice controls tile/world conversion and neighbor directions.
- `tileZ` is part of chess placement and usually represents a layer.
- Chess can be a Phaser game object or plain data, depending on the workflow.
- `addToBoard` controls whether rendered RexBoard chess objects register themselves immediately.
- Occupied tests, blocker tests, and moveable/cost tests are different concepts.
- `wrap` and `infinity` change neighbor and bounds behavior.
- Some event names are clearer in source than in `.d.ts`; inspect input implementation files when documenting emitted events.

## Validation Checklist

- Every `SKILL.md` frontmatter has only `name` and `description`.
- Descriptions are RexBoard-specific and avoid generic triggers such as bare `board`, `grid`, `chess`, `path`, or `match`.
- New components appear in `rexboard-components-catalog/references/component-catalog.md`.
- Factory/helper names are checked against `Factory.js`, `board-plugin.js`, and `board-plugin.d.ts`.
- Direct exports are checked against `board-components.js` and `board-components.d.ts`.
- Recipes do not depend on reading `examples/` at usage time.
- Examples use npm package paths when showing full imports.
- Helper/factory boundaries are not mixed up, for example `this.rexBoard.add.createTileTexture(...)`.
- Known source/type mismatch or typo is documented as a gotcha in the closest reference.
