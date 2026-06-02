---
name: rexboard-match-and-puzzle
description: "Use this skill when working with RexBoard match, Match, board symbol matching, match-3, bejeweled-style RexBoard puzzles, wildcard symbols, dirMask, refreshSymbols, line patterns, array patterns, group matching, or board puzzle resolution. Triggers on: RexBoard match, RexBoard Match, board match, match-3, bejeweled, wildcard, dirMask, refreshSymbols."
---

# RexBoard Match And Puzzle

Use this skill for symbol and pattern matching on a RexBoard board.

## Use This First

Choose the matching style:

| Need | Use |
|---|---|
| Same-symbol line | `match(3, callback)` or another length |
| Specific pattern | `match(['A', 'A', 'B'], callback)` |
| Any-match validation | `anyMatch(...)` |
| Connected same-symbol group | `group(tileX, tileY)` |
| Symbols stored on chess objects | `refreshSymbols(callback)` |

`Match` reports tile coordinates. Game code still swaps pieces, removes chess, spawns replacements, and animates results.

## Required Setup

This skill assumes a RexBoard `Board` or `LogicBoard` exists. If symbols live on chess objects, use `rexboard-board-and-chess` first.

## References

Read these only when needed:

- `references/match-config.md`: setup, config fields, callbacks, and methods.
- `references/match-patterns.md`: fixed-length, array, wildcard, direction mask, and group matching.
- `references/match-recipes.md`: reduced recipes for matching symbols from chess, test swaps, and group rules.

## Core Rules

- Keep board occupancy and match symbols in sync.
- Prefer `refreshSymbols` when symbols live on chess objects.
- Use `null` for empty/no symbol; use an explicit wildcard symbol for wildcard behavior.
- Use `dirMask` to limit which board directions are checked.
- Do not expect `Match` to animate, destroy, or spawn game objects.

## Source File Map

- `plugins/board/match/Match.d.ts`: config, callbacks, methods, and result type.
- `plugins/board/match/Factory.js`: `match` factory signature.
- `plugins/board/board/LogicBoard.d.ts`: board traversal and chess lookup used by matching.

## Related Skills

- `rexboard-board-and-chess`: chess lookup, swaps, removal, and occupancy.
- `rexboard-grids-and-coordinates`: direction masks depend on grid direction behavior.
- `rexboard-rendered-tiles-and-pieces`: rendered puzzle pieces.
- `rexboard-movement-and-pathfinding`: animated movement after match decisions.

## Gotchas

- Direction indexes depend on grid mode; configure `dirMask` after choosing quad/hex grid behavior.
- Test-swap workflows must restore the board if the swap is rejected.
