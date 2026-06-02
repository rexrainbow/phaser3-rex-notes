---
name: rexboard-rendered-tiles-and-pieces
description: "Use this skill when creating RexBoard rendered tiles or pieces with shape, image, sprite, board-aware game objects, addToBoard, CreateTileTexture, createTileTexture, CreateBoardFromTilemap, createBoardFromTilemap, tilemap-rendered boards, or drawing RexBoard tiles. Triggers on: RexBoard shape, RexBoard image, RexBoard sprite, RexBoard rendered chess, addToBoard, createTileTexture, board tilemap rendering."
---

# RexBoard Rendered Tiles And Pieces

Use this skill when RexBoard chess must be visible Phaser game objects or when board tiles need generated textures.

## Use This First

Choose the rendering approach:

| Need | Use |
|---|---|
| Custom visual object | Create Phaser object, then `board.addChess(...)` |
| Polygon tile/chess object | `this.rexBoard.add.shape(...)` |
| Static texture piece | `this.rexBoard.add.image(...)` |
| Animated/frame-based piece | `this.rexBoard.add.sprite(...)` |
| Reusable tile texture | `this.rexBoard.createTileTexture(...)` |
| Board from Phaser tilemap | `this.rexBoard.createBoardFromTilemap(...)` |

## Required Setup

This skill assumes RexBoard setup and a board/grid are already available. If not, use `rexboard-setup-and-factory`, `rexboard-grids-and-coordinates`, and `rexboard-board-and-chess`.

## References

Read these only when needed:

- `references/rendered-pieces.md`: `Shape`, `Image`, `Sprite` factory signatures and `addToBoard`.
- `references/tile-textures.md`: `CreateTileTexture` usage and generated texture workflow.
- `references/tilemap-import.md`: board creation from Phaser tilemaps.
- `references/rendered-piece-recipes.md`: reduced recipes for drawn tiles, sprite pieces, and generated tile textures.

## Core Rules

- Use `board.addChess(...)` for custom Phaser game objects.
- Use RexBoard `Shape`, `Image`, or `Sprite` when tile coordinates should be part of construction.
- Set `addToBoard: true` only when the object should register as board chess immediately.
- Use a consistent `tileZ` convention for tile visuals, pieces, overlays, and blockers.
- Treat `createTileTexture` as texture generation only; it does not place chess on the board.

## Source File Map

- `plugins/board/shape/Shape.d.ts` and `plugins/board/shape/Factory.js`.
- `plugins/board/image/Image.d.ts` and `plugins/board/image/Factory.js`.
- `plugins/board/sprite/Sprite.d.ts` and `plugins/board/sprite/Factory.js`.
- `plugins/board/texture/CreateTileTexture.d.ts`.
- `plugins/board/tilemap/CreateBoardFromTilemap.d.ts`.

## Related Skills

- `rexboard-board-and-chess`: chess placement and `tileZ` model.
- `rexboard-grids-and-coordinates`: board geometry and tile/world conversion.
- `rexboard-map-generation-and-import`: tilemap import and generated coordinate sets.
- `rexboard-miniboard-and-composite`: rendered pieces inside MiniBoard.

## Gotchas

- `createBoardFromTilemap` returns a board from tilemap data; still inspect the returned board/grid before adding game rules.
- `Shape`, `Image`, and `Sprite` can target a `Board` or `MiniBoard`.
- Passing `addToBoard: false` means future code must explicitly call `board.addChess(...)` or `miniBoard.addChess(...)`.
