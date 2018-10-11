## Introduction

Chess Container, to rotate/mirror/drag chess together.

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
- `draggable` : Set `true` to enable dragging events

### Add chess

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

### Remove chess

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

Put Chess in a Miniboard object to a main board ([Board object](board.md)), or pull chess out from main board.

#### Put on main board

```javascript
miniBoard.putOnMainBoard(mainBoard, tileX, tileY, align);
```

- `mainBoard` : [Board object](board.md).
- `tileX`, `tileY` : Tile position to put on.
- `align` : Set `true` to align world position of each chess Game object to grid of main board.

#### Pull out from main board

```javascript
miniBoard.pullOutFromMainBoard();
```

Remove all chess Game object from main board.

#### Put back to previous main board

```javascript
miniBoard.putBack();
```

Previous main board and tile position will be remembered for putting back.

#### Is overlapping to main board

Return `true` if any chess is overlapping to main board

```javascript
miniBoard.isOverlapping(mainBoard);
```

or 

```javascript
miniBoard.isOverlapping(mainBoard, tileZ);
```

### Rotate

#### Can rotate

````javascript
miniBoard.canRotate(direction);
```

- `direction` :
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

#### Rotate

````javascript
miniBoard.rotate(direction);
```

- `direction` :
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

### Mirror

#### Can mirror

````javascript
miniBoard.canMirror(mode);
```

- `mode` :
    - `0`, or `'x'` : Set tileX to `-tileX`
    - `1`, or `'y'` : Set tileY to `-tileY`

#### Mirror

````javascript
miniBoard.rotate(mode);
```

- `mode` :
    - `0`, or `'x'` : Set tileX to `-tileX`
    - `1`, or `'y'` : Set tileY to `-tileY`




