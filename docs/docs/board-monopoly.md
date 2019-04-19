## Introduction

Move through path tiles, used in monopoly-like application, chess behavior of Board system.

- Author: Rex
- Behavior of chess

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-monopoly)

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var monopoly = scene.rexBoard.add.monopoly(chess, {
    face: 0,

    // ** cost **
    // pathTileZ: 0,
    // cost: 1,   // constant cost
    // costCallback: undefined,
    // costCallbackScope: undefined
})
```

- `face` : Moving direction.
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
    - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).
- Cost function
    - `pathTileZ` : TileZ of path tiles.
    - `cost` : A constant cost for each non-blocked tile
    - `costCallback`, `costCallbackScope` :  Get cost via callback
        ```javascript
        function(curTile, monopoly) {
            return cost;
        }
        ```
        - Board : `monopoly.board`
        - Chess game object : `monopoly.gameObject`
        - Cost of stop : `monopoly.STOP`
        - Cost of blocker : `monopoly.BLOCKER`

### Cost function

```javascript
var callback = function(curTileXY, preTileXY, monopoly) {
    return cost;
}
```

- `cost` : Number cost.
- `curTileXY`, `preTileXY` : TileXY position `{x, y}`. Cost of moving from `preTileXY` to `curTileXY`.
- `monopoly` : Path finder object.
    - `monopoly.board` : [Board object](board.md)
    - `monopoly.gameObject` : Chess game object.
    - `monopoly.STOP` : Cost of stop. Return this value means chess will stop at `curTileXY`.
    - `monopoly.BLOCKER` : Cost of blocker. Return this value means that chess can not move to `curTileXY`.

#### Set cost function

- Constant cost for each non-blocked tile
    ```javascript
    monopoly.setCostFunction(cost);
    ```
- Get cost via callback
    ```javascript
    monopoly.setCostFunction(callback, scope);
    ```

### Set face direction

```javascript
monopoly.setFace(direction);
```

- `direction` :
    - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
    - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
    - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).

!!! note "Moving direction"
    Get path toward this face direction.

### Get path

```javascript
var tileXYArray = monopoly.getPath(movingPoints);
// var out = monopoly.getPath(movingPoints, out);
```

- `tileXYArray` : Moving path in an array of tile positions `{x,y}`
    - Uses [moveTo behavior](board-moveto.md) to move chess along path.