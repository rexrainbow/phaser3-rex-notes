# Blockers And Costs

## Three Separate Constraints

| Concept | Where used | Meaning |
| --- | --- | --- |
| Occupancy | `occupiedTest` | Another chess occupies the destination |
| Blockers | `blockerTest`, `board.hasBlocker(...)` | Board rule marks a tile or edge as blocked |
| Moveable test | `moveableTest` | Custom game rule callback |

Do not collapse these concepts into one boolean unless the game rules truly do.

## MoveTo Constraint Example

```js
const moveTo = this.rexBoard.add.moveTo(piece, {
  occupiedTest: true,
  blockerTest: true,
  moveableTest(fromTileXYZ, toTileXYZ, direction, board) {
    return !isEnemyZone(toTileXYZ.x, toTileXYZ.y);
  }
});
```

## PathFinder Cost Example

```js
const pathFinder = this.rexBoard.add.pathFinder(piece, {
  pathMode: 'A*',
  occupiedTest: true,
  blockerTest: true,
  costCallback(curTile, preTile, finder) {
    if (board.hasBlocker(curTile.x, curTile.y, 0)) {
      return finder.BLOCKER;
    }

    return terrainCost(curTile.x, curTile.y);
  }
});
```

## Cost Semantics

- Return a number for normal movement cost.
- Return `pathFinder.BLOCKER` to block a tile.
- Return `pathFinder.INFINITY` for infinite/unavailable cost.
- Use `cacheCost: true` only when tile costs are stable for the query lifetime.
