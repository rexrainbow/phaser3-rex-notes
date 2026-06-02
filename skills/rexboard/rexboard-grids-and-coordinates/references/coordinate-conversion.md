# Coordinate Conversion

## Raw Grid Conversion

Use raw grid methods when no board exists yet:

```js
const world = grid.getWorldXY(tileX, tileY, true);
const tile = grid.getTileXY(worldX, worldY, true);
const points = grid.getGridPoints(tileX, tileY);
const bounds = grid.getBounds(tileX, tileY, true);
```

## Board Conversion

Prefer board methods once a board exists:

```js
const world = board.tileXYToWorldXY(tileX, tileY, true);
const tile = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
const snapped = board.worldXYSnapToGrid(pointer.worldX, pointer.worldY, true);
```

Board methods also support board-level queries:

```js
const tileBounds = board.getGridBounds(tileX, tileY, true);
const boardBounds = board.getBoardBounds(true);
const points = board.getGridPoints(tileX, tileY, true);
const boundary = board.getBoundaryPoints(0);
```

## Tile Shape Queries

`LogicBoard` can convert geometry into tile coordinate arrays:

```js
const lineTiles = board.lineToTileXYArray(line);
const circleTiles = board.circleToTileXYArray(circle);
const rectTiles = board.rectangleToTileXYArray(rectangle);
const ellipseTiles = board.ellipseToTileXYArray(ellipse);
const triangleTiles = board.triangleToTileXYArray(triangle);
const polygonTiles = board.polygonToTileXYArray(polygon);
```

These queries return tile coordinates. Convert them to chess with `tileXYArrayToChessArray(...)` when needed.

## Bounds And Modes

- `board.contains(tileX, tileY, tileZ)` checks board bounds.
- `wrap: true` lets neighbor logic wrap around edges.
- `infinity: true` allows board operations beyond fixed width/height.
- Grid coordinates are still computed by the grid; board modes affect validity and neighbor behavior.
