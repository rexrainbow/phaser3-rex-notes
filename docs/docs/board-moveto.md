## Introduction

Move chess towards target position with a steady speed, chess behavior of Board system.

- Author: Rex
- Behavior of chess

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-moveto)

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var moveTo = scene.rexBoard.add.moveTo(chess, {
    // speed: 400,
    // rotateToTarget: false,
    // occupiedTest: false,
    // blockerTest: false,
    // sneak: false,
})
```

- `speed` : moving speed, pixels in second.
- `rotateToTarget` : Set `true` to change angle towards path.
- `occupiedTest` : Set `true` to test if target tile position is occupied or not, in moveable testing.
- `blockerTest` : Set `true` to test [blocker property](board-chessdata.md#blocker) in moveable testing.
- `sneak` : Set `true` to allow changing tileZ when target tile position is occupied. Changing back when target tile position is not occupied.
    - `occupiedTest` will be ignored when `sneak` is `true`.

### Move to destination tile

```javascript
moveTo.moveTo(tileX, tileY);
// moveTo.moveTo(tileXY);
```

- `tileXY` : Tile position `{x,y}`

### Move to neighbor tile

```javascript
moveTo.moveToward(direction);
```

- `direction` :
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
    - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

#### Move to random neighbor tile

```javascript
moveTo.moveToRandomNeighbor();
```

#### Move away or move closer

- Move away from a tile position
    ```javascript
    moveTo.moveAway(tileX, tileY);
    ```
    or
    ```javascript
    moveTo.moveAway(tileXY);
    ```
    - `tileXY` : Tile position `{x,y}`
- Move closer to a tile position
    ```javascript
    moveTo.moveCloser(tileX, tileY);
    ```
    or
    ```javascript
    moveTo.moveCloser(tileXY);
    ```
    - `tileXY` : Tile position `{x,y}`

### Can move to tile

```javascript
var canMoveTo = moveTo.canMoveTo(tileX, tileY);
```

Return `true` if chess can move to (tileX, tileY)

### Last move result

```javascript
var lastMoveResult = moveTo.lastMoveResult;
```

Return `true` if chess is moved by `moveTo.moveTo()`, `moveTo.moveToward()`, or `moveTo.moveToRandomNeighbor()`

#### Destination

```javascript
var destinationTileX = moveTo.destinationTileX;
var destinationTileY = moveTo.destinationTileY;
var destinationDirection = moveTo.destinationDirection;
```

### Pause, Resume, stop moving

```javascript
moveTo.pause();
moveTo.resume();
moveTo.stop();
```

### Enable

- Enable/resume (default)
    ```javascript
    moveTo.setEnable();
    ```
    or
    ```javascript
    moveTo.enable = true;
    ```
- Disable/pause
    ```javascript
    moveTo.setEnable(false);
    ```
    or
    ```javascript
    moveTo.enable = false;
    ```

### Set speed

```javascript
moveTo.setSpeed(speed);
// moveTo.speed = speed;
```

### Set rotate-to-target

```javascript
moveTo.setRotateToTarget(rotateToTarget);
```

- `rotateToTarget` : Set true to change angle towards target

### Events

- On reached target
    ```javascript
    moveTo.on('complete', function(moveTo, gameObject){});
    // moveTo.once('complete', function(moveTo, gameObject){});
    ```

### Status

- Is moving
    ```javascript
    var isRunning = moveTo.isRunning;
    ```
