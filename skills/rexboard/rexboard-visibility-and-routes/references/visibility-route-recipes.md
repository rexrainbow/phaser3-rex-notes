# Visibility Route Recipes

## Find Visible Tiles

```js
const fov = this.rexBoard.add.fieldOfView(piece, {
  face: 0,
  cone: 3,
  coneMode: 'direction',
  blockerTest: true,
  cost: 1
});

const visible = fov.findFOV(8);
```

## Test Line Of Sight

```js
const canSeeTarget = fov.isInLOS(targetPiece, 8);
```

## Filter Visible Targets

```js
const visibleEnemies = fov.LOS(enemies, 8, board.chessToTileXYZ(piece), []);
```

## Build A Route

```js
const monopoly = this.rexBoard.add.monopoly(piece, {
  face: 0,
  pathTileZ: 0,
  cost: 1
});

const routeTiles = monopoly.getPath(10);
```

These recipes are reduced for skill reference from common RexBoard FieldOfView and Monopoly patterns. They do not require the `examples/` directory.
