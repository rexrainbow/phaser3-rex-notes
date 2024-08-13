## Introduction

[Sprite](sprite.md) chess object.

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
    var chess = scene.rexBoard.add.sprite(board, tileX, tileY, tileZ, key, frame);
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
    var chess = scene.rexBoard.add.sprite(board, tileX, tileY, tileZ, key, frame);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Sprite } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Add chess object
    ```javascript
    var chess = new Sprite(board, tileX, tileY, tileZ, key, frame);
    scene.add.existing(chess);
    ```

### Add chess object

- Create chess object and add to board
    ```javascript
    var chess = scene.rexBoard.add.sprite(board, tileX, tileY, tileZ, key, frame);
    ```
    - `board` : [Board object](board.md)
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `key`, `frame` : Frame of this sprite chess object
- Create chess object but *not* add to board
    ```javascript
    var chess = scene.rexBoard.add.sprite(board, x, y, undefined, key, frame, false);
    ```
    - `board` : [Board object](board.md)
    - `x`, `y` : World position
    - `key`, `frame` : Frame of this sprite chess object

### Other properties

See [Sprite game object](sprite.md), [game object](gameobject.md)
