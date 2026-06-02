# Chess Model

## Tile Coordinates

RexBoard chess placement uses:

```js
{ x: tileX, y: tileY, z: tileZ }
```

`tileZ` is commonly used as a layer. Typical layer choices:

| Layer | Example meaning |
| --- | --- |
| `0` | Main pieces |
| `1` | Terrain or floor markers |
| `'blocker'` | Blocking data |
| `'item'` | Collectibles or overlays |

Use a consistent project convention.

## Add, Move, Remove

```js
board.addChess(chess, tileX, tileY, tileZ, true);
board.moveChess(chess, toTileX, toTileY, toTileZ, true);
board.setChessTileZ(chess, newTileZ, true);
board.removeChess(chess, null, null, null, false);
board.removeChess(null, tileX, tileY, tileZ, true);
```

## Queries

```js
const tileXYZ = board.chessToTileXYZ(chess);
const chess = board.tileXYZToChess(tileX, tileY, tileZ);
const stack = board.tileXYToChessArray(tileX, tileY);
const layerPieces = board.tileZToChessArray(tileZ);
const all = board.getAllChess();
```

## Occupancy And Empty Tiles

```js
const empty = board.isEmptyTileXYZ(tileX, tileY, tileZ);
const randomEmpty = board.getRandomEmptyTileXY(tileZ, true);
const emptyTiles = board.getEmptyTileXYArray(tileZ);
```

Use `tileZ` in occupancy checks. A tile may be occupied on one layer and empty on another.

## Plain Data Chess

Chess can be a plain object:

```js
const unit = { id: 'unit-1', hp: 10 };
board.addChess(unit, 2, 3, 0, false);
```

Do not pass `align: true` expecting visual movement unless the chess object has Phaser-style position data that RexBoard can align.

## Blockers

`board.hasBlocker(tileX, tileY, tileZ)` checks blocker state used by movement/path helpers. Keep blockers distinct from ordinary occupied pieces when game rules require different behavior.
