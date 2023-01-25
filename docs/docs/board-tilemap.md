## Introduction

Create board from [tilemap](tilemap.md)

- Author: Rex
- Help method of board

## Live demos

- [Create board from tilemap](https://codepen.io/rexrainbow/pen/WNKzBXQ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-tilemap)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Create board from tilemap
    ```javascript
    var board = scene.rexBoard.createBoardFromTilemap(tilemap, layers);
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
- Create board from tilemap
    ```javascript
    var board = scene.rexBoard.createBoardFromTilemap(tilemap, layers);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { CreateBoardFromTilemap } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Create board from tilemap
    ```javascript
    var board = CreateBoardFromTilemap(tilemap, layers);
    ```

#### Create board from tilemap

```javascript
var board = CreateBoardFromTilemap(tilemap, layers);
```

- `tilemap` : [Tilemap object](tilemap.md)
- `layers` : Add tiles of layers into board, tileZ will be name of layer (`layer.name`)
    - `undefined` : Add tiles of all layers.
    - Array of TilemapLayer game object, or a TilemapLayer game object
    - Array of layers' name, or a name of layer.
- `board` : [Board object](board.md).
