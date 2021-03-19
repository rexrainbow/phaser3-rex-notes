## Introduction

Create [canvas-texture](canvas-texture) of tile.

- Author: Rex
- Help method of board

## Live demos

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-texture)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Create tile texture
    ```javascript
    scene.rexBoard.createTileTexture(board, key, fillStyle, strokeStyle, lineWidth);
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
- Create tile texture
    ```javascript
    scene.rexBoard.createTileTexture(board, key, fillStyle, strokeStyle, lineWidth);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { CreateTileTexture } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Create tile texture
    ```javascript
    CreateTileTexture(board, key, fillStyle, strokeStyle, lineWidth);
    ```

#### Create tile texture

##### Hexagon

```javascript
CreateTileTexture(board, key, fillStyle, strokeStyle, lineWidth);
// CreateTileTexture(board, key, fillStyle, strokeStyle, lineWidth, lineJoin);
```

- `board` : [Board object](board.md).
- `fillStyle` : Fill color of tile texture.
    - `undefined` : Don't fill tile texture.
- `strokeStyle`, `lineWidth` : Stroke color, stroke line width of tile texture.
    - `undefined` : Don't stroke tile texture.
- `lineJoin` : Join style of stroke lines. `'round'`, `'bevel'` and `'miter'`. Default is `'miter'`.
