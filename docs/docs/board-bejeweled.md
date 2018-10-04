## Introduction

Match3-like gameplay.

- Author: Rex
- Template

## Source code

[Template](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/bejeweled/Bejeweled.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbejeweled.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-bejeweled)

### Create bejeweled object

```javascript
var bejeweled = new Bejeweled(scene, {
    board: {
        grid: {
            gridType: 'quadGrid',
            x: 30,
            y: 30 - 600,
            cellWidth: 60,
            cellHeight: 60,
            type: 'orthogonal' // 'orthogonal'|'isometric'|'staggered'
        },
        width: 10,
        height: 20 // Prepared rows: upper 10 rows
    },
    match: {
        // wildcard: undefined
        // dirMask: undefined
    },
    chess: {
        // pick random symbol from array, or a callback to return symbol
        symbols: [0, 1, 2, 3, 4, 5],
        // symbols: function(board, tileX, tileY, excluded) { return symbol; }

        // User-defined chess game object
        create: function (board) {
            // Create Game object (Shape, Image, or Sprite)
            var scene = board.scene;
            var gameObject = scene.add.sprite(0, 0, textureKey, frame);
            // Enable data manager
            gameObject.setData('symbol', undefined);
            // Add data changed event of 'symbol` key
            gameObject.data.events.on('changedata_symbol', function (gameObject, value, previousValue) {
                // Change the appearance of game object via new symbol value
                gameObject.setFrame(newFrame);
            });
            return gameObject;
        },

        // scope for callbacks
        scope: undefined,

        // moveTo behavior
        moveTo: {
            speed: 400
        },
        // tileZ: 1,
    },

    // callback of matched lines
    onMatchLinesCallback: function (lines, board) {
    },
    onMatchLinesCallbackScope: undefined,

    // callback of eliminating chess
    onEliminatingChessCallback: function (chess, board) {
        // return eventEmitter; // custom eliminating task, fires 'complete' event to continue FSM
    },
    onEliminatingChessCallbackScope: undefined,

    // callback of falling chess
    onFallingChessCallback: function (board) {
        // return eventEmitter; // custom falling task, fires 'complete' event to continue FSM
    },
    onFallingChessCallback: undefined,
})
```

Configurations

- Board properties
    - `board.width` : Board width in tiles.
    - `board.height` : [Board height](board-bejeweled.md#board-height) in tiles.
    - `board.grid.x`, `board.grid.y` : World position of tile (0, 0)
    - `board.grid.cellWidth`, `board.grid.cellHeight` : The width/height of the cell, in pixels.
- Chess properties
    - `chess.symbols` : An array of possible symbols, or a callback to return a symbol. See [Generate symbol](board-bejeweled.md#generate-symbol)
    - `chess.create`, `chess.scope` : Callback of [creating chess object](board-bejeweled.md#create-chess-object).
    - `chess.moveTo.speed` : Constant moving speed of chess, in pixel per-second.
- Callbacks
    - `onMatchLinesCallback`, `onMatchLinesCallbackScope`
    - `onEliminatingChessCallback`, `onEliminatingChessCallbackScope`
    - `onFallingChessCallback`, `onFallingChessCallback` 

#### Board height

Board is separated into two parts: upper and bottom

- Bottom : **Visible N rows**, to swap chess and run matching.
- Upper : **Invisible N rows**, chess in these rows will move down, to fill bottom rows.

For example, if amount of visible rows is `10`, `board.height` should set to `20`.

#### Generate symbol

Symbols are declared in property `chess.symbols` in a symbol array like `[0, 1, 2, 3, 4, 5]`, or a callback to return a symbol. The callback also use `chess.scope` as the scope.

```javascript
function(board, tileX, tileY, excluded) {
    return symbol
}
```

- `excluded` : `undefined` or a symbol array. Don't return these symbols.

#### Create chess object

Return a game object from a callback.

```javascript
function(board) {
    // Create Game object (Shape, Image, or Sprite)
    var scene = board.scene;
    var gameObject = scene.add.sprite(0, 0, textureKey, frame);
    // Enable data manager
    gameObject.setData('symbol', undefined);
    // Add data changed event of 'symbol` key
    gameObject.data.events.on('changedata_symbol', function (gameObject, value, previousValue) {
        // Change the appearance of game object via new symbol value
        gameObject.setFrame(newFrame);
    });
}
```

Each chess has a `symbol` value stored in `'symbol'` key in private data. Add data changed event of 'symbol` key to change the appearance of game object via new symbol value.

### Start gameplay

```javascript
bejeweled.start();
```
