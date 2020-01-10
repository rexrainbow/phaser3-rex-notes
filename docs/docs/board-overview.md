
### Install from minify file

1. Download minify file ([link](https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js)).
1. Install ui plugin in preload stage
    ```javascript
    scene.load.scenePlugin({
        key: 'rexboardplugin',
        url: filePath,
        sceneKey: 'rexBoard'
    });
    ```
    - `key` : Must be `'rexboardplugin'`

### Install from npm package

1. Install rex plugins
    ```
    npm i phaser3-rex-plugins
    ```
1. Install ui plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
    
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexBoard',
                plugin: RexBoardPlugin,
                mapping: 'rexBoard'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
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