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

### Create instance

- Quad board
    ```javascript
    var board = scene.rexBoard.add.board({
        grid: scene.rexBoard.add.hexagonGrid({
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

### Get tile position

```javascript
var tileXYZ = board.getChessXYZ(chess);
```

- `chess` : A game object
- `tileXYZ` : `{x,y,z}` or `null` if chess is not added to board.

### Get chess

- Get chess at (tileX, tileY, tileZ)
    ```javascript
    var chess = board.tileXYZToChess(tileX, tileY, tileZ);
    ```
    - `chess` : A game object
- Get chess at (tileX, tileY)
    ```javascript
    var out = board.tileXYToChess(tileX, tileY);
    // var out = board.tileXYToChess(tileX, tileY, out);
    ```
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
var callback = function(tileXY, board) {
    // var tileX = tileXY.x;
    // var tileY = tileXY.y;
}
board.forEachTileXY(callback, scopr);
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