## Introduction

Move through path tiles, used in monopoly-like application, chess behavior of Board system.

- Author: Rex
- Behavior of chess

## Live demos

- [Monopoly](https://codepen.io/rexrainbow/pen/WWJxZL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-monopoly)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Add monopoly behavior
    ```javascript
    var monopoly = scene.rexBoard.add.monopoly(chess, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
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
- Add monopoly behavior
    ```javascript
    var monopoly = scene.rexBoard.add.monopoly(chess, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Monopoly } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Add monopoly behavior
    ```javascript
    var board = new Monopoly(chess, config);
    ```

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
    - `costCallback`, `costCallbackScope` :  [Get cost via callback](board-monopoly.md#cost-function)
        ```javascript
        function(curTileXY, preTileXY, monopoly) {
            return cost;
        }
        ```

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
    - `monopoly.STOP`, or `-1` : Cost of stop. Return this value means chess will stop at `curTileXY`.
    - `monopoly.BLOCKER`, or `null` : Cost of blocker. Return this value means that chess can not move to `curTileXY`.

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