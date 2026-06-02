---
name: rexboard-miniboard-and-composite
description: "Use this skill when working with RexBoard miniBoard, MiniBoard, board composite pieces, grouped chess pieces, drag mini board, place mini board, pull out and put back patterns, rotate or mirror composite pieces, or MiniBoard movement. Triggers on: RexBoard miniBoard, MiniBoard, board composite, drag mini board, place mini board, pullOutFromMainBoard, putOnMainBoard."
---

# RexBoard MiniBoard And Composite

Use this skill for grouped chess pieces that should move, rotate, mirror, drag, or place as one composite object.

## Use This First

Choose MiniBoard when:

| Need | Use |
|---|---|
| Several chess pieces act as one shape | `MiniBoard` |
| Drag/drop a composite onto a board | `pullOutFromMainBoard`, `canPutOnMainBoard`, `putOnMainBoard`, `putBack` |
| Rotate or mirror a composite | `rotate`, `rotateTo`, `mirror` |
| Validate placement per child | `putTestCallback` |

For a single chess piece, use `rexboard-board-and-chess` or `rexboard-movement-and-pathfinding` instead.

## Required Setup

This skill assumes RexBoard setup, a main board, and a compatible grid. If not, use setup, grid, and board skills first.

## References

Read these only when needed:

- `references/miniboard-config.md`: config fields, public API, placement methods, transforms, and interaction.
- `references/main-board-vs-mini-board.md`: mental model and placement gotchas.
- `references/miniboard-recipes.md`: reduced recipes for creating, placing, and drag-dropping a composite piece.

## Core Rules

- A `MiniBoard` has local tile coordinates for child chess.
- `putOnMainBoard` maps local coordinates onto the main board.
- Use `canPutOnMainBoard` before committing placement when placement can fail.
- Use `pullOutFromMainBoard` and `putBack` for reversible drag/drop flows.
- Keep MiniBoard and main board grids compatible unless implementing a deliberate conversion.

## Source File Map

- `plugins/board/miniboard/MiniBoard.d.ts`: config, child chess methods, placement, transforms, and interaction.
- `plugins/board/miniboard/Factory.js`: `miniBoard` factory signature.
- `plugins/board/miniboard/mainboard/*.js`: inspect placement details when needed.
- `plugins/board/board/Board.d.ts`: main board placement target.

## Related Skills

- `rexboard-board-and-chess`: main board chess model and occupancy.
- `rexboard-rendered-tiles-and-pieces`: rendered child chess objects.
- `rexboard-movement-and-pathfinding`: movement concepts and blockers.
- `rexboard-grids-and-coordinates`: grid compatibility and direction behavior.

## Gotchas

- Mini-board rotation and mirror operations are not the same as moving one chess piece.
- MiniBoard child chess are Phaser game objects; use a normal board if the workflow needs plain data pieces.
