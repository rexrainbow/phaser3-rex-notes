---
name: rexboard-board-and-chess
description: "Use this skill when working with RexBoard Board, LogicBoard, board data model, addChess, removeChess, moveChess, swapChess, tileZ layers, chess occupancy, board input events, wrap, infinity, blockers, or board-aware chess placement. Triggers on: RexBoard board, RexBoard chess, LogicBoard, addChess, moveChess, tileZ, board occupancy, board input."
---

# RexBoard Board And Chess

Use this skill for the core RexBoard data model: a board with a grid, dimensions, chess pieces, tile layers, occupancy, and optional input events.

## Use This First

Establish these before writing board logic:

| Need | Decide |
|---|---|
| Coordinate system | Which `QuadGrid` or `HexagonGrid` backs the board |
| Board extent | Fixed `width`/`height`, `wrap`, or `infinity` |
| Layers | What each `tileZ` value means |
| Chess type | Phaser game object or plain data object |
| Input | Whether `board.setInteractive()` is needed |

## Required Setup

This skill assumes RexBoard setup and a grid are already available. If not, use `rexboard-setup-and-factory` and `rexboard-grids-and-coordinates`.

## References

Read these only when needed:

- `references/board-config.md`: board construction, embedded grid configs, wrap/infinity settings.
- `references/chess-model.md`: tile/chess placement, `tileZ` layers, occupancy, blockers, and plain data pieces.
- `references/board-events.md`: interactive tile, game-object, pointer, tap, press, and swipe events.
- `references/chess-recipes.md`: reduced add/remove/move/swap/iterate recipes.

## Core Rules

- `Board` extends the logic board with scene input support; `LogicBoard` is the core data model.
- Always create or pass a grid before board operations that require coordinate conversion.
- Treat `tileZ` as part of the chess coordinate, not optional metadata.
- Use `align: true` when adding or moving rendered chess that should snap to grid world coordinates.
- Use `isEmptyTileXYZ`, `tileXYZToChess`, and `tileXYToChessArray` for occupancy checks.
- Keep plain data chess and Phaser game object chess workflows distinct.

## Source File Map

- `plugins/board/board/Board.d.ts`: board construction and input API.
- `plugins/board/board/LogicBoard.d.ts`: chess placement, occupancy, coordinate conversion, bounds, neighbors, and blockers.
- `plugins/board/chess/ChessData.d.ts`: chess metadata attached to board-aware objects.
- `plugins/board/board/Factory.js`: `board` factory signature.

## Related Skills

- `rexboard-setup-and-factory`: plugin setup and direct import mode.
- `rexboard-grids-and-coordinates`: grid configs, tile/world conversion, directions.
- `rexboard-rendered-tiles-and-pieces`: board-aware visible chess.
- `rexboard-movement-and-pathfinding`: movement constraints and path queries.

## Gotchas

- `wrap` and `infinity` change containment, neighbor, and movement behavior.
- Board input events require `board.setInteractive(...)`.
- Some emitted event names are only obvious in `plugins/board/board/input/*.js`; inspect source when documenting exact events.
- A tile can be occupied on one `tileZ` layer and empty on another.
