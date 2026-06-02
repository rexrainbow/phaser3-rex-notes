# Directions And Neighbors

## Direction APIs

Use board-level APIs for direction and neighbor logic:

```js
const neighbor = board.getNeighborTileXY({ x: 3, y: 4 }, direction, true);
const neighbors = board.getNeighborTileXY({ x: 3, y: 4 }, null, []);
const dir = board.getNeighborTileDirection({ x: 3, y: 4 }, { x: 4, y: 4 });
const opposite = board.getOppositeDirection(3, 4, dir);
```

Other direction helpers:

```js
const distance = board.getDistance(tileA, tileB);
const angle = board.angleBetween(tileA, tileB);
const direction = board.directionBetween(tileA, tileB, true);
const inCone = board.isDirectionInCone(tileA, tileB, faceDirection, cone);
const snapped = board.angleSnapToDirection(tileA, angle);
```

## Neighbor Chess

```js
const chess = board.getNeighborChess(sourceChess, direction, 0);
const allNeighborChess = board.getNeighborChess(sourceChess, null, 0);
const areNeighbors = board.areNeighbors(tileA, tileB);
```

Use `tileZ` when asking for chess on a specific layer.

## Ranges

```js
const ring = board.ringToTileXYArray(centerTile, 2);
const filled = board.filledRingToTileXYArray(centerTile, 3, true);
const ray = board.getTileXYAtDirection(centerTile, direction, { start: 1, end: 4 });
```

## Quad Direction Mode

- `dir: '4dir'` means cardinal neighbors only.
- `dir: '8dir'` includes diagonals.
- Direction indexes depend on grid mode. Avoid hard-coding semantic labels unless the grid mode is known.

## Hex Direction Mode

Hex grids use six neighbor directions. `staggeraxis` and `staggerindex` determine which tile coordinates are adjacent in each direction.
