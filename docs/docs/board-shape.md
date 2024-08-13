## Introduction

[Grid (polygon) shape](shape-polygon.md) chess object.

- Author: Rex
- Chess Game object of Board system

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-chess)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Add chess object
    ```javascript
    var chess = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
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
- Add chess object
    ```javascript
    var chess = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Shape } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Add chess object
    ```javascript
    var chess = new Shape(board, tileX, tileY, tileZ, fillColor);
    scene.add.existing(chess);
    ```

### Add chess object

- Create chess object and add to board
    ```javascript    
    var chess = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor, fillAlpha);
    ```
    - `board` : [Board object](board.md)
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `fillColor`, `fillAlpha` : Color of this shape chess object
- Create chess object but *not* add to board
    ```javascript
    var chess = scene.rexBoard.add.shape(board, x, y, undefined, fillColor, fillAlpha, false);
    ```
    - `board` : [Board object](board.md)
    - `x`, `y` : World position
    - `fillColor`, `fillAlpha` : Color of this shape chess object


### Set color

- Fill color
    ```javascript
    chess.setFillStyle(color, alpha)
    ```
- Stroke color
    ```javascript
    chess.setStrokeStyle(lineWidth, color, alpha)
    ```

!!! warning "No tint methods"
    Uses `shape.setFillStyle(color, alpha)` to change color.

### Other properties

See [polygon shape game object](shape-polygon.md), [game object](gameobject.md)
