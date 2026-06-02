# RexBoard Skill Writing Plan

This plan is for Codex agents writing skills for the RexBoard plugin family.

Primary entry point requested by the user:

```text
C:\mywork\phaser3\phaser3-rex-notes\plugins\board-components.js
```

Related scene-plugin entry point:

```text
C:\mywork\phaser3\phaser3-rex-notes\plugins\board-plugin.js
```

## Core Decision

Do not make RexBoard skills depend on `examples/` at usage time.

Skills may depend on source and type definitions under:

```text
plugins/board-components.js
plugins/board-components.d.ts
plugins/board-plugin.js
plugins/board-plugin.d.ts
plugins/board/**
```

Use `examples/` only while authoring skills. When an example is useful, copy the smallest complete pattern into the relevant skill as a reduced recipe under `references/` or as a runnable starter under `assets/`.

The skill content should remain usable even if the `examples/` directory is absent.

## How RexBoard Differs From RexUI

RexUI is mainly a visual component library, so its skills should follow UI construction workflows.

RexBoard is a board-game domain toolkit. Its skills should follow board-game concepts:

- Grid coordinate systems.
- Tile/world conversion.
- Board bounds, wrapping, and infinity mode.
- Chess pieces occupying tile coordinates.
- Tile layers through `tileZ`.
- Board-aware game objects.
- Movement and pathfinding.
- Matching patterns.
- Field of view.
- Mini-board composition.
- Board generation from maps or tilemaps.

Avoid one skill per source folder unless the folder represents a distinct board-game workflow.

## Entry Points And API Modes

RexBoard has two important usage modes.

### Component Barrel Export

`board-components.js` exports classes and helpers directly:

```text
Board
HexagonGrid
QuadGrid
ChessData
Shape
Image
Sprite
Match
MoveTo
PathFinder
FieldOfView
Monopoly
MiniBoard
HexagonMap
CreateTileTexture
CreateBoardFromTilemap
```

Use this mode when code imports classes directly.

### Scene Plugin Factory

`board-plugin.js` installs a scene plugin with:

```text
this.rexBoard.add.board(...)
this.rexBoard.add.quadGrid(...)
this.rexBoard.add.hexagonGrid(...)
this.rexBoard.add.shape(...)
this.rexBoard.add.image(...)
this.rexBoard.add.sprite(...)
this.rexBoard.add.moveTo(...)
this.rexBoard.add.pathFinder(...)
this.rexBoard.add.match(...)
this.rexBoard.add.fieldOfView(...)
this.rexBoard.add.monopoly(...)
this.rexBoard.add.miniBoard(...)
```

It also exposes helpers:

```text
this.rexBoard.hexagonMap
this.rexBoard.createTileTexture
this.rexBoard.createBoardFromTilemap
```

Skills must be clear about which mode they are using.

## Authoritative Sources

Prefer these sources when writing skill content:

- `plugins/board-components.js`: barrel export list.
- `plugins/board-components.d.ts`: public exported class names.
- `plugins/board-plugin.js`: scene plugin factory behavior.
- `plugins/board-plugin.d.ts`: public factory names and helper APIs.
- `plugins/board/<component>/*.d.ts`: public config, methods, events, and callback types.
- `plugins/board/<component>/Factory.js`: exact `this.rexBoard.add.*` factory signature.
- `plugins/board/<component>/*.js`: behavior details only when `.d.ts` is insufficient.

## Copied Example Policy

When a board example is useful:

1. Copy only the smallest complete board pattern.
2. Remove demo-only colors, labels, assets, randomization, and unrelated UI.
3. Keep examples focused on one board concept.
4. Preserve the essential plugin setup, grid config, board config, and tile/chess operations.
5. Include provenance in a short note, for example:

```text
Derived from examples/board/draw-grid.js, reduced for skill reference.
```

6. Store copied examples as reference recipes, not in `SKILL.md`, unless the snippet is very small.

Recommended locations:

```text
rexboard-setup-and-factory/references/plugin-setup.md
rexboard-grids-and-coordinates/references/grid-recipes.md
rexboard-board-and-chess/references/chess-recipes.md
rexboard-rendered-tiles-and-pieces/references/rendered-piece-recipes.md
rexboard-movement-and-pathfinding/references/movement-recipes.md
rexboard-match-and-puzzle/references/match-recipes.md
```

If a copied example is a reusable runnable Phaser scene, place it under `assets/` instead of `references/`.

## Proposed Skill Set

### 1. rexboard-setup-and-factory

Purpose:

- Explain the two entry styles: `board-components.js` direct imports and `board-plugin.js` scene plugin usage.
- Teach scene plugin registration with `key: 'rexBoard'`, `plugin: BoardPlugin`, and `mapping: 'rexBoard'`.
- Explain factory names and helper methods exposed by `this.rexBoard`.

Triggers:

- `RexBoard setup`
- `rexBoard plugin`
- `board-components.js`
- `BoardPlugin`
- `this.rexBoard`
- `mapping: 'rexBoard'`

References to create:

- `references/plugin-setup.md`: minimal scene plugin setup and direct import setup.
- `references/factory-map.md`: factory name, source folder, class/helper, common use.
- `references/entrypoint-differences.md`: when to use barrel imports vs scene plugin factories.

Example extraction:

- Reduce one board example that imports `BoardPlugin` and maps `rexBoard`.
- Keep only config and minimal scene setup.

### 2. rexboard-grids-and-coordinates

Purpose:

- Cover quad and hexagon grid coordinate systems.
- Teach tile-to-world and world-to-tile conversion.
- Explain quad grid `orthogonal` vs `isometric`, `4dir` vs `8dir`.
- Explain hexagon `staggeraxis`, `staggerindex`, `size`, `cellWidth`, and `cellHeight`.
- Cover neighbor directions and tile-shape queries.

Triggers:

- `RexBoard grid`
- `quadGrid`
- `hexagonGrid`
- `tileXY`
- `worldXY`
- `hexagon map`
- `orthogonal`
- `isometric`
- `staggeraxis`
- `direction`

References to create:

- `references/grid-config.md`: quad and hex config tables.
- `references/coordinate-conversion.md`: `getWorldXY`, `getTileXY`, bounds, grid points.
- `references/directions-and-neighbors.md`: direction indexes, neighbor APIs, 4/8 direction notes.
- `references/grid-recipes.md`: copied minimal grid recipes.

Example extraction:

- Reduce examples from `examples/board/draw-grid.js`, direction examples, and tile-shape examples.

### 3. rexboard-board-and-chess

Purpose:

- Explain `Board` / `LogicBoard` as the data model.
- Teach width, height, wrap mode, infinity mode, and grid ownership.
- Teach the tile coordinate model: `tileX`, `tileY`, `tileZ`.
- Cover `addChess`, `removeChess`, `moveChess`, occupancy, kickout behavior, and chess data.
- Cover board input events when a board is made interactive.

Triggers:

- `RexBoard board`
- `LogicBoard`
- `addChess`
- `removeChess`
- `moveChess`
- `tileZ`
- `chess`
- `board occupancy`
- `board input`

References to create:

- `references/board-config.md`: board config and grid embedding patterns.
- `references/chess-model.md`: tile/chess relation, `tileZ` layers, occupancy, blockers.
- `references/board-events.md`: tile pointer, game object pointer, tap, press, swipe callbacks.
- `references/chess-recipes.md`: copied minimal add/remove/move recipes.

Example extraction:

- Reduce examples from `examples/board`, especially add/remove/move, drag to neighbor, pointer/tap examples.

### 4. rexboard-rendered-tiles-and-pieces

Purpose:

- Cover board-aware rendered game objects.
- Include `Shape`, `Image`, `Sprite`, tile texture creation, and board-from-tilemap creation.
- Explain when to use board chess as plain data vs Phaser game objects.
- Explain `addToBoard` behavior in `this.rexBoard.add.shape/image/sprite`.

Triggers:

- `RexBoard shape`
- `RexBoard sprite`
- `RexBoard image`
- `CreateTileTexture`
- `createTileTexture`
- `CreateBoardFromTilemap`
- `board tilemap`
- `draw board`

References to create:

- `references/rendered-pieces.md`: factory signatures and when to use each rendered object.
- `references/tile-textures.md`: create tile textures for quad/hex boards.
- `references/tilemap-import.md`: creating a board from a tilemap.
- `references/rendered-piece-recipes.md`: copied minimal recipes.

Example extraction:

- Reduce examples from `examples/board-texture`, `examples/board-tilemap`, and basic rendered board examples.

### 5. rexboard-movement-and-pathfinding

Purpose:

- Cover `MoveTo` components and `PathFinder`.
- Explain tile-by-tile movement, speed, rotate-to-target, sneak, occupied tests, blocker tests, and custom moveable tests.
- Explain path modes, costs, blocker callbacks, cache cost, and A* variants.
- Explain how movement and pathfinding interact with board occupancy.

Triggers:

- `RexBoard moveTo`
- `moveToward`
- `moveToRandomNeighbor`
- `pathFinder`
- `A*`
- `board path`
- `occupiedTest`
- `blockerTest`
- `moveableTest`

References to create:

- `references/moveto-config.md`: MoveTo config, methods, events.
- `references/pathfinder-config.md`: PathFinder config, cost callbacks, path modes.
- `references/movement-recipes.md`: copied minimal movement and pathfinding recipes.
- `references/blockers-and-costs.md`: common movement constraints.

Example extraction:

- Reduce examples from `examples/board-moveto`, `examples/board-pathfinder`, and `examples/board-miniboard-moveto`.

### 6. rexboard-match-and-puzzle

Purpose:

- Cover `Match` and match-style board puzzles.
- Explain symbol refresh, wildcard, direction mask, line patterns, group matching, and match result handling.
- Provide Bejeweled-style recipes without requiring complete game examples.

Triggers:

- `RexBoard match`
- `board match`
- `match-3`
- `bejeweled`
- `wildcard`
- `dirMask`
- `refreshSymbols`

References to create:

- `references/match-config.md`: Match config and callbacks.
- `references/match-patterns.md`: line, group, number, array, wildcard patterns.
- `references/match-recipes.md`: copied minimal match recipes.

Example extraction:

- Reduce examples from `examples/board-match`, `examples/board-bejeweled`, and `examples/board-bejeweled2`.

### 7. rexboard-miniboard-and-composite

Purpose:

- Cover `MiniBoard` as a movable group of chess pieces.
- Explain mini-board placement onto a main board, pull-out/put-back patterns, drag/drop, and composite pieces.
- Explain how mini-board movement differs from moving one chess piece.

Triggers:

- `RexBoard miniBoard`
- `MiniBoard`
- `board composite`
- `drag mini board`
- `place mini board`
- `board group piece`

References to create:

- `references/miniboard-config.md`: public API and placement methods.
- `references/miniboard-recipes.md`: copied minimal composite movement recipes.
- `references/main-board-vs-mini-board.md`: mental model and gotchas.

Example extraction:

- Reduce examples from `examples/board-miniboard` and `examples/board-miniboard-moveto`.

### 8. rexboard-visibility-and-routes

Purpose:

- Cover `FieldOfView` and `Monopoly`.
- Explain visibility checks on a board, blockers, line-of-sight style queries, and route traversal.
- Keep this skill algorithm-focused rather than game-specific.

Triggers:

- `RexBoard fieldOfView`
- `FieldOfView`
- `board visibility`
- `line of sight`
- `Monopoly`
- `board route`

References to create:

- `references/fieldofview-config.md`: FOV public API and blocker model.
- `references/monopoly-config.md`: route movement helper usage.
- `references/visibility-route-recipes.md`: copied minimal recipes.

Example extraction:

- Reduce examples from `examples/board-fieldofview` and `examples/board-monopoly`.

### 9. rexboard-map-generation-and-import

Purpose:

- Cover helper APIs that create board coordinates or boards from data.
- Include `HexagonMap`, `CreateTileTexture`, and `CreateBoardFromTilemap`.
- Explain parallelogram, hexagon, and triangle hex maps.

Triggers:

- `RexBoard hexagonMap`
- `GetHexagonMap`
- `GetParallelogramMap`
- `GetTriangleMap`
- `create board from tilemap`
- `createTileTexture`

References to create:

- `references/hexagon-map.md`: map generation helpers.
- `references/tilemap-board.md`: tilemap conversion workflow.
- `references/map-generation-recipes.md`: copied minimal recipes.

Example extraction:

- Reduce examples from `examples/board-hexagonmap`, `examples/board-tilemap`, and `examples/board-texture`.

### 10. rexboard-components-catalog

Purpose:

- Provide a compact RexBoard component selection index.
- Answer "Which RexBoard class/helper should I use?"
- Route Codex to the correct specialized RexBoard skill.

Triggers:

- `RexBoard components`
- `RexBoard catalog`
- `which RexBoard`
- `board-components`
- `RexBoard API list`

References to create:

- `references/component-catalog.md`: component/helper, factory name if any, source path, common use, related skill.

Example extraction:

- No large examples. Keep this skill mostly tabular.

## Skill Folder Layout

For global installation, use top-level skill folders:

```text
$CODEX_HOME/skills/rexboard-setup-and-factory/SKILL.md
$CODEX_HOME/skills/rexboard-grids-and-coordinates/SKILL.md
$CODEX_HOME/skills/rexboard-board-and-chess/SKILL.md
...
```

For repository-local drafting, this folder may be used as a staging area:

```text
skills/rexboard/rexboard-setup-and-factory/
skills/rexboard/rexboard-grids-and-coordinates/
...
```

Before installing, copy or link each individual skill folder so Codex can discover it as its own skill.

## SKILL.md Writing Rules

Each `SKILL.md` should:

- Keep frontmatter description specific to RexBoard to avoid triggering on generic chess, grid, pathfinding, or Phaser requests.
- Include `RexBoard`, `rexBoard`, and relevant factory names in the description.
- Keep the body concise.
- Move large API tables, callback signatures, and recipes into `references/`.
- Link directly to every reference file that Codex may need.
- Prefer `.d.ts` public API summaries over implementation details.
- Include a "Use This First" section when the skill has a dominant workflow.
- Include gotchas that prevent invalid generated code.

Avoid:

- Long copied source files.
- Complete demo scenes when a reduced recipe is enough.
- References that require reading `examples/`.
- Deeply nested references.
- Generic trigger words such as `board`, `grid`, `chess`, `path`, or `match` without `RexBoard`.

## Common RexBoard Gotchas To Capture

Every relevant skill should mention these when applicable:

- `board-components.js` exports classes directly; `board-plugin.js` provides `this.rexBoard.add.*`.
- `this.rexBoard` exists only when `BoardPlugin` is installed and mapped.
- A board needs a grid; grid config determines coordinate conversion and neighbor directions.
- `tileZ` is part of chess placement and often represents a layer.
- Board chess can be a Phaser game object or plain data, depending on the workflow.
- `addToBoard` controls whether rendered board objects are immediately registered as chess.
- Occupied tests, blocker tests, and moveable tests are separate concepts.
- `wrap` and `infinity` change neighbor and bounds behavior.
- Some helpers operate on `LogicBoard` data, not only rendered game objects.
- Pathfinding and movement should respect the board's occupancy model.

## Build Order

1. Write `rexboard-setup-and-factory`.
2. Write `rexboard-components-catalog`.
3. Write `rexboard-grids-and-coordinates`.
4. Write `rexboard-board-and-chess`.
5. Write `rexboard-rendered-tiles-and-pieces`.
6. Write `rexboard-movement-and-pathfinding`.
7. Write `rexboard-match-and-puzzle`.
8. Write `rexboard-miniboard-and-composite`.
9. Write `rexboard-visibility-and-routes`.
10. Write `rexboard-map-generation-and-import`.

Reason:

- Setup and catalog establish the API surface.
- Grid and board data models are required before rendered pieces, movement, matching, and algorithms.
- Specialized board-game helpers can then build on the shared coordinate and chess model.

## Validation Checklist

For each skill:

- Frontmatter has only `name` and `description`.
- Description includes clear RexBoard-specific triggers.
- `SKILL.md` is short enough to load cheaply.
- Detailed config, callback signatures, and recipes are moved to `references/`.
- Copied examples are reduced and self-contained.
- No reference requires `examples/` at usage time.
- Source file map points to `plugins/board-components.*`, `plugins/board-plugin.*`, and relevant `plugins/board/**` files.
- At least one realistic user prompt can be answered from the skill plus its references.
- Generated code is explicit about direct class imports vs `this.rexBoard.add.*`.
- Generated plugin code uses `mapping: 'rexBoard'` when relying on `this.rexBoard`.
- Generated board code creates a grid before board operations that require coordinate conversion.
