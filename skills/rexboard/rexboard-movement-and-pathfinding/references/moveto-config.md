# MoveTo Config

Factory:

```js
const moveTo = this.rexBoard.add.moveTo(gameObject, config);
```

Constructor:

```js
const moveTo = new MoveTo(gameObject, config);
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `speed` | Move speed in tiles per second |
| `rotateToTarget` | Rotate game object toward destination |
| `occupiedTest` | Reject occupied destination tiles |
| `blockerTest` | Reject blocked destination tiles |
| `moveableTest` | Custom callback for game rules |
| `moveableTestScope` | Scope for callback |
| `sneak` | Avoid occupancy behavior where appropriate |

Custom test:

```js
const moveTo = this.rexBoard.add.moveTo(piece, {
  speed: 6,
  occupiedTest: true,
  blockerTest: true,
  moveableTest(fromTileXYZ, toTileXYZ, direction, board) {
    return board.contains(toTileXYZ.x, toTileXYZ.y, toTileXYZ.z);
  }
});
```

## Methods

```js
moveTo.moveTo(tileX, tileY);
moveTo.moveTo({ x: tileX, y: tileY });
moveTo.moveToward(direction);
moveTo.moveToRandomNeighbor();
moveTo.moveAway(targetTile);
moveTo.moveCloser(targetTile);
moveTo.canMoveTo(tileX, tileY);
```

Runtime setters:

```js
moveTo.setEnable(true);
moveTo.setSpeed(8);
moveTo.setRotateToTarget(true);
moveTo.setSneakEnable(false);
moveTo.setOccupiedTest(true);
moveTo.setBlockerTest(true);
moveTo.setMoveableTestCallback(callback, scope);
```

## Events

Common event families:

```js
moveTo.on('complete', (gameObject, moveTo) => {});
moveTo.on('occupy', (occupiedGameObject, gameObject, moveTo) => {});
```

Use event names already present in the project if they differ.
