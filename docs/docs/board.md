## Introduction

Core object of Board system.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/board-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexboardplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board)

User could import class directly, or install it by global plugin.

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import BoardPlugin from './plugins/board-plugin.js';

var config = {
    // ...
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add board object

- Quad board
    ```javascript
    var board = scene.rexBoard.add.board({
        grid: scene.rexBoard.add.quadGrid({
            x: 0,
            y: 0,
            cellWidth: 0,
            cellHeight: 0,
            type: 'orthogonal'  // 'orthogonal'|'isometric'|'staggered'
        }),
        width: 0,
        height: 0
    });
    ```
- Hexagon board
    ```javascript
    var board = scene.rexBoard.add.board({
        grid: scene.rexBoard.add.hexagonGrid({
            x: 0,
            y: 0,
            cellWidth: 0,
            cellHeight: 0,
            staggeraxis: 'x',   // 'x'|'y'
            staggerindex: 'odd' // 'odd'|'even'
        }),
        width: 0,
        height: 0
    });
    ```

Configuration

- `grid` : [Quad grid](board-quadgrid.md) or [hexagon grid](board-hexagongrid.md)
- `width` : Board width in tiles
- `height` : Board height in tiles

### Custom class

- Define class
    ```javascript
    class MyBoard extends RexPlugins.Board.Board {
        constructor(scene) {
            super(scene, {
                grid: scene.rexBoard.add.quadGrid({
                    x: 0,
                    y: 0,
                    cellWidth: 0,
                    cellHeight: 0,
                    type: 'orthogonal'  // 'orthogonal'|'isometric'|'staggered'
                }),
                width: 0,
                height: 0
            });
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var board = new MyBoard(scene);
    ```

### Board size

- Width : Board width in tiles
    - Get
        ```javascript
        var width = board.width;
        ```
    - Set
        ```javascript
        board.setBoardWidth(width);
        ```
- Height : Board height in tiles
    - Get
        ```javascript
        var height = board.height;
        ```
    - Set
        ```javascript
        board.setBoardHeight(height);
        ```

### Add chess

```javascript
board.addChess(chess, tileX, tileY, tileZ, align);
```

- `chess` : A game object.
- `tileX` , `tileY` , `tileZ` : Tile position.
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY).

!!! note "Chess and tile position"
    - Any chess has a **(tileX, tileY, tileZ)** index
    - Any (tileX, tileY, tileZ) index contains only **1** chess.
    - (tileX, tileY) could have more then 1 chess with different tileZ index.
    - tileZ is not equal to `depth`.

### Remove chess

- Remove chess object from board
    ```javascript
    board.removeChess(chess, null, null, null, destroy);
    ```
    - `chess` : A game object
    - `destroy` : Set `true` to desrtoy chess object.
- Remove chess at (tileX, tileY, tileZ) from board
    ```javascript
    board.removeChess(null, tileX, tileY, tileZ, destroy);
    ```
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `destroy` : Set `true` to desrtoy chess object.
- Remove all chess
    ```javascript
    board.removeAllChess(destroy);
    ```
    - `destroy` : Set `true` to desrtoy chess object.

### Move chess

```javascript
board.moveChess(chess, toTileX, toTileY, toTileZ, align);
```

- `chess` : A game object
- `toTileX`, `toTileY`, `toTileZ` : Target tile position
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY).

### Swap chess

```javascript
board.swapChess(chessA, chessB, align);
```

- `chessA`, `chessB` : Game objects
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY).

### Chess -> tile position

```javascript
var tileXYZ = board.chessToTileXYZ(chess);
```

- `chess` : A game object
- `tileXYZ` : `{x,y,z}` or `null` if chess is not added to board.

### Tile position -> chess

- Get chess at (tileX, tileY, tileZ)
    ```javascript
    var chess = board.tileXYZToChess(tileX, tileY, tileZ);
    ```
    - `chess` : A game object
- Get chess at (tileX, tileY)
    ```javascript
    var out = board.tileXYToChessArray(tileX, tileY);
    // var out = board.tileXYToChessArray(tileX, tileY, out);
    ```
    - `out` : An array of chess
- Get chess from array of (tileX, tileY)
    ```javascript
    var out = board.tileXYArrayToChessArray(tileXYArray);
    // var out = board.tileXYArrayToChessArray(tileXYArray, out);
    ```
    or
    ```javascript
    var out = board.tileXYArrayToChessArray(tileXYArray, tileZ);
    // var out = board.tileXYArrayToChessArray(tileXYArray, tileZ, out);
    ```
    - `tileXYArray` : An array of tileXY `{x, y}`
    - `out` : An array of chess

### Contains

- Is (tileX, tileY) inside board?
    ```javascript
    var isTileInBoard = board.contains(tileX, tileY);
    ```
- Does (tileX, tileY, tileZ) have chess?
    ```javascript
    var isTileInBoard = board.contains(tileX, tileY, tileZ);
    ```
- Is chess inside board?
    ```javascript
    var isChessInBoard = board.exists(chess);
    ```
    - `chess` : A game object

### For each tile

```javascript
board.forEachTileXY(function(tileXY, board) {
    // var tileX = tileXY.x;
    // var tileY = tileXY.y;
}, scopr);
```

Iteration order :

```javascript
board.forEachTileXY(function(tileXY, board, order) {
    // var tileX = tileXY.x;
    // var tileY = tileXY.y;
}, scopr);
```

- `order` :
    - `0`, or `x+` : Increasing x, increasing y.
    - `1`, or `x-` : Decreasing x, increasing y.
    - `2`, or `y+` : Increasing y, increasing x.
    - `3`, or `y-` : Decreasing y, increasing x.

Or using for-loop

```javascript
for (var tileY = 0; tileY < board.height; tileY++) {
    for (var tileX = 0; tileX > board.width; tileX++) {
        // ...
    }
}
```

- `board.width` , `board.height` : Board width/height in tiles.

### Tile position -> world position

```javascript
var worldX = board.tileXYToWorldX(tileX, tileY);
var worldY = board.tileXYToWorldY(tileX, tileY);
```

### World position -> tile position

```javascript
var tileX = board.worldXYToTileX(worldX, worldY);
var tileY = board.worldXYToTileY(worldX, worldY);
```

### Align world position to grid

- Align one chess object
    ```javascript
    board.gridAlign(chess);
    ```
- Align all chess
    ```javascript
    board.gridAlign();
    ```

### Neighobrs

- Get tile position of neighbor
    ```javascript
    var neighborTileXY = board.getNeighborTileXY(srcTileXY, direction);
    // var out = board.getNeighborTileXY(srcTileXY, direction, out);
    ```
    - `srcTileXY` : Tile position `{x, y}` of source.
    - `direction` :
        - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
        - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
        - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).
    - `neighborTileXY` : Tile position `{x, y}` of neighbor. Retrun `null` if no neighbor there (i.e. source chess is at the edge of board.)
- Get all directions of neighbor chess
    ```javascript
    var out = board.getNeighborTileXY(srcTileXY, null);
    // var out = board.getNeighborTileXY(srcTileXY, null, out);
    ```
    - `out` : Tile position array of all neighbors
- Get neighbor chess
    ```javascript
    var neighborChess = board.getNeighborChess(chess, direction); // neighborTileZ = tileZ of chess
    // var neighborChess = board.getNeighborChess(chess, direction, neighborTileZ);
    ```
- Get chess of all neighbors
    ```javascript
    var out = board.getNeighborChess(chess, null); // neighborTileZ = tileZ of chess
    // var out = board.getNeighborChess(chess, null, neighborTileZ);
    ```
    - `out` : Chess array of all neighbors
- Are 2 chess neighbors?
   ```javascript
   var areNeighbor = board.areNeighbors(chessA, chessB);
   ```
   - `areNeighbor` : Return `true` if `chessA` and `chessB` are neighbors.
- Get direction between 2 tile positions
    ```javascript
    var direction = board.getNeighborTileDirection(srcTile, neighborTileXY);
    ```
    - `direction` : Return `null` if these 2 tile positions are not neighbors.
- Get direction between 2 chess
    ```javascript
    var direction = board.getNeighborChessDirection(chess, neighborChess);
    ```
    - `direction` : Return `null` if these 2 chess are not neighbors.

### Empty tile position

- Get a random tile position which does not have any chess
    ```javascript
    var tileXY = board.getRandomEmptyTileXY(tileZ);
    // var out = board.getRandomEmptyTileXY(tileZ, out);
    ```
    - `tileXY` : Tile position `{x, y}`, return `null` if all positions are occupied.
- Get an array of tile position which does not have any chess
    ```javascript
    var tileXYArray = board.getEmptyTileXYArray(tileZ);
    // var out = board.getEmptyTileXYArray(tileZ, out);
    ```
    - `tileXYArray` : An array of tile position

### Get all chess

```javascript
var chessArray = board.getAllChess();
```

### Blocker

- Set blocker property : See [chess data](board-chessdata.md#blocker)
- Has blocker at tile position (tileX, tileY, tileZ)
    ```javascript
    var hasBlocker = board.hasBlocker(tileX, tileY, tileZ);
    ```
- Any chess at (tileX, tileY) has `blocker` property
    ```javascript
    var hasBlocker = board.hasBlocker(tileX, tileY);
    ```

### Touch events

#### Set interactive

- Enable
    ```javascript
    board.setInteractive();
    ```
- Disable
    ```javascript
    board.setInteractive(false);
    ```

#### Touch events

- Pointer down at any tile
    ```javascript
    board.on('tiledown', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `tileXY`
        - `tileXY.x`
        - `tileXY.y`
- Pointer up at any tile
    ```javascript
    board.on('tileup', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
- Pointer move to another tile
    ```javascript
    board.on('tilemove', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - Only triggered when `tileXY` is changed.
- Pointer down at a chess
    ```javascript
    board.on('gameobjectdown', function(pointer, gameObject) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)
- Pointer up at a chess
    ```javascript
    board.on('gameobjectup', function(pointer, gameObject) {
    })
    ```

### Grid polygon

- Get a [polygon object](geom-polygon.md) at tile position (tileX, tileY).
    ```javascript
    var poly = board.getGridPolygon(tileX, tileY);
    // var out = board.getGridPolygon(tileX, tileY, out);
    ```
- Draw grid polygon on [graphics object](graphics.md#lines)
    ```javascript
    graphics.strokePoints(poly.points, true);
    ```