## Introduction

Grid (polygon) shape object.

- Author: Rex
- Polygon Shape Game object of Board system

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Add shape object
    ```javascript
    var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
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
- Add shape object
    ```javascript
    var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
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
- Add shape object
    ```javascript
    var shape = new Shape(board, tileX, tileY, tileZ, fillColor);
    scene.add.existing(shape);
    ```

### Add shape object

- Create shape object and add to board
    ```javascript
    var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
    // var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor, fillAlpha);
    ```
    - `board` : [Board object](board.md)
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `fillColor`, `fillAlpha` : Color of this shape object
- Create shape object but *not* add to board
    ```javascript
    var shape = scene.rexBoard.add.shape(board, x, y, undefined, fillColor, fillAlpha, false);
    ```
    - `board` : [Board object](board.md)
    - `x`, `y` : World position
    - `fillColor`, `fillAlpha` : Color of this shape object


### Set color

- Fill color
    ```javascript
    polygon.setFillStyle(color, alpha)
    ```
- Stroke color
    ```javascript
    polygon.setStrokeStyle(lineWidth, color, alpha)
    ```

!!! warning "No tint methods"
    Uses `shape.setFillStyle(color, alpha)` to change color.

### Other properties

See [polygon shape game object](shape-polygon.md), [game object](gameobject.md)
