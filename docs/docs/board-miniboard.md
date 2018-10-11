## Introduction

Chess [Container](containerlite.md), to rotate/mirror/drag chess together.

- Author: Rex
- Container Game object of chess group

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-miniBoard)

### Install scene plugin

Included in board plugin.

### Add Container

```javascript
var miniBoard = scene.rexBoard.add.miniBoard(x, y, {
    grid: grid,
    draggable: undefined,
});
```

- `grid` : Create [board object](board.md) first, then get grid object via `board.grid`.
    - `gridType` :
        - `'quadGrid'` : [Quad grid](board-quadgrid.md)
        - `'hexagonGrid'` : [hexagon grid](board-hexagongrid.md)
- `draggable` : Set `true` to [enable dragging events](board-miniboard.md#set-drag-able)

#### Add chess

```javascript
miniBoard.addChess(gameObject, tileX, tileY, tileZ);
```

- `chess` : A game object.
- `tileX` , `tileY` , `tileZ` : Tile position.

!!! note "Chess and tile position"
    - Any chess has a **(tileX, tileY, tileZ)** index
    - Any (tileX, tileY, tileZ) index contains only **1** chess.
    - (tileX, tileY) could have more then 1 chess with different tileZ index.
    - tileZ is not equal to `depth`.

These world properties of chess will be changed with container.

- Position/Angle/Scale
- Visible
- Alpha
- Scroll factor
- Mask

#### Remove chess

- Remove chess object from board
    ```javascript
    miniBoard.removeChess(chess, null, null, null, destroy);
    ```
    - `chess` : A game object
    - `destroy` : Set `true` to desrtoy chess object.
- Remove chess at (tileX, tileY, tileZ) from board
    ```javascript
    miniBoard.removeChess(null, tileX, tileY, tileZ, destroy);
    ```
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `destroy` : Set `true` to desrtoy chess object.
- Remove all chess
    ```javascript
    miniBoard.removeAllChess(destroy);
    ```
    - `destroy` : Set `true` to desrtoy chess object.

### Main board

Put chess to a main-board ([Board object](board.md)) with the same tile position in mini-board, or pull chess out from main-board.

#### Put on main-board

```javascript
miniBoard.putOnMainBoard(mainBoard, tileX, tileY);
// miniBoard.putOnMainBoard(mainBoard, tileX, tileY, align);
```

- `mainBoard` : [Board object](board.md).
- `tileX`, `tileY` : Tile position to put on.
- `align` : Set `true` to align world position of each chess Game object to grid of main-board. Default is `true`.

or

```javascript
miniBoard.putOnMainBoard(mainBoard);
```

To put this mini-board to nearest grid of main-board.

#### Pull out from main-board

```javascript
miniBoard.pullOutFromMainBoard();
```

Remove all chess from main-board.

#### Put back to previous main-board

```javascript
miniBoard.putBack();
```

Previous main-board and tile position will be remembered for putting back.

#### Is overlapping to main-board

Return `true` if any chess is overlapping to main-board.

```javascript
miniBoard.isOverlapping(mainBoard);
```

or

```javascript
miniBoard.isOverlapping(mainBoard, tileZ);
```

#### Align world position to grid of main-board

```javascript
miniBoard.alignToMainBoard(mainBoard, tileX, tileY);
```

- `mainBoard` : [Board object](board.md)
- `tileX`, `tileY` : Tile position on main-board

or

```javascript
miniBoard.alignToMainBoard(mainBoard);
```

to align this mini-board to nearest grid of main-board.

#### Get current main-board

```javascript
var board = miniBoard.mainBoard;
```

- `board` : [Board object](board.md)

Return `null` if this mini-board is not at any main-board.

### Rotate

#### Can rotate

```javascript
miniBoard.canRotate(n);
```

- `n` : Rotate to direction `current direction + n`

or 

```javascript
miniBoard.canRotateTo(direction);
```

- `direction` : Rotate to direction
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions).
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

Always return `true` if this mini-board is not on a main-board.

#### Rotate

```javascript
miniBoard.rotate(n);
```

- `n` : Rotate direction to `current direction + n`

or

```javascript
miniBoard.rotateTo(direction);
```

- `direction` : Rotate to direction
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions).
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

Return `true` if this rotating request is accepted.

```javascript
var isSuccess = miniBoard.lastTransferResult;
```

### Mirror

#### Can mirror

```javascript
miniBoard.canMirror(mode);
```

- `mode` :
    - `0`, or `'x'` : Set tileX to `-tileX`
    - `1`, or `'y'` : Set tileY to `-tileY`
    - `3`, or `'x&y'` : Set tileX to `-tileX`, and tileY to `-tileY`

Always return `true` if this mini-board is not on a main-board.

#### Mirror

```javascript
miniBoard.rotate(mode);
```

- `mode` :
    - `0`, or `'x'` : Set tileX to `-tileX`
    - `1`, or `'y'` : Set tileY to `-tileY`
    - `3`, or `'x&y'` : Set tileX to `-tileX`, and tileY to `-tileY`

Return `true` if this mirroring request is accepted.

```javascript
var isSuccess = miniBoard.lastTransferResult;
```

### Touch events

#### Set interactive

- Enable
    ```javascript
    miniBoard.setInteractive();
    ```
- Disable
    ```javascript
    miniBoard.setInteractive(false);
    ```

#### Set drag-able

- Enable
    ```javascript
    miniBoard.setDragEnable();
    ```
- Disable
    ```javascript
    miniBoard.setDragEnable(false);
    ```

#### Drag events

- Drag-start
    ```javascript
    miniBoard.on('dragstart', function(pointer, dragX, dragY){
        /*
        miniBoard.pullOutFromMainBoard();
        */
    }, scope);
    ```
    Pull out from main-board for dragging.
- Dragging
    ```javascript
    miniBoard.on('drag', function(pointer, dragX, dragY){
        /*
        miniBoard.setPosition(dragX, dragY);
        if (miniBoard.isOverlapping(mainBoard)) {
            miniBoard.alignToMainBoard(mainBoard);
        }
        */
    }, scope);
    ```
    Set world position of mini-board via (`dragX`, `dragY`), align to nearest grid of main-board if overlapping with that main-board.
- Drag-end
    ```javascript
    miniBoard.on('dragend', function(pointer, dragX, dragY){
        /*
        miniBoard.putOnMainBoard(mainBoard);
        if (miniBoard.mainBoard) {
        }
        */
    }, scope);
    ```
    Put chess on main-board at nearest grid.

#### Touch event

- Pointer down at a chess
    ```javascript
    miniBoard.on('gameobjectdown', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('miniboard.pointerdown', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)
- Pointer up at a chess
    ```javascript
    miniBoard.on('gameobjectup', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('miniboard.pointerup', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)    
- Pointer move to another chess
    ```javascript
    miniBoard.on('gameobjectmove', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('miniboard.pointermove', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)