
## Install plugin

### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Add board object
    ```javascript
    var board = scene.rexBoard.add.board(config);
    ```

### Import plugin

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
- Add board object
    ```javascript
    var board = scene.rexBoard.add.board(config);
    ```

## List of board plugins

### Board

- [Board](board.md)
- Grids
    - [Quad grid](board-quadgrid.md)
    - [Hexagon grid](board-hexagongrid.md)
- [Chess](board-chessdata.md)

### Shapes

- [Shape](board-shape.md)

### Behaviors

- [Move to](board-moveto.md)

### Applications

- [Path finder](board-pathfinder.md)
- [Monopoly](board-monopoly.md)
- [Field of view](board-fieldofview.md)
- [Match](board-match.md)
- [Hexagon map](board-hexagonmap.md)

### Mini-board

- [Mini-board](board-miniboard.md)

### Templates

- [Bejeweled](board-bejeweled.md)