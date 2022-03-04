
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

#### Using typescript declaration file

```typescript
import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';

class Game extends Phaser.Scene {
    rexBoard: BoardPlugin;  // Declare scene property 'rexBoard' as BoardPlugin type

    create() {
        var board = this.rexBoard.add.board({
            // ...
        })
    }
}

var game = new Phaser.Game({
    scene: Game,
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
});
```

- `'phaser3-rex-plugins/plugins/board-plugin'` : Factories of board components.
- `'phaser3-rex-plugins/plugins/board-components'` : Class of board components.
    ```typescript
    import { Board } from 'phaser3-rex-plugins/plugins/board-components';
    ```

See this [example](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/board/touch-event-ts.ts)

## List of board plugins

### Board

- [Board](board.md)
- Grids
    - [Quad grid](board-quadgrid.md)
    - [Hexagon grid](board-hexagongrid.md)
- [Chess](board-chessdata.md)

### Shapes

- [Shape](board-shape.md)
- [Tile texture](board-texture.md)

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