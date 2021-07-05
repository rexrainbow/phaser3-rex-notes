## Introduction

Get matched chess in lines, or neighbors grouping.

- Author: Rex
- Application of Board system

## Live demos

- [Match line](https://codepen.io/rexrainbow/pen/RwPaVvg)
- [Match neighbors](https://codepen.io/rexrainbow/pen/wvaGdQm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-match)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
    ```
- Add match object
    ```javascript
    var match = scene.rexBoard.add.match(config);
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
- Add match object
    ```javascript
    var match = scene.rexBoard.add.match(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Match } from 'phaser3-rex-plugins/plugins/board-components.js';
    ```
- Add match object
    ```javascript
    var match = new Match(config);
    ```

### Add match object

```javascript
var match = scene.rexBoard.add.match({
   board: board,
   // wildcard: undefined
   // dirMask: undefined
});
```

- `board` : A [board](board.md) object
- `wildcard` : A string or a number
- `dirMask` : Enable/Disable matching at directions, all directions are enbale by default.
    - [Quad grid](board-quadgrid.md), 4 directions
        ```javascript
        {
            0: true,  // set false to disable left/right matching
            1: true   // set false to disable up/down matching
        }
        ```
    - [Quad grid](board-quadgrid.md), 8 directions
        ```javascript
        {
            0: true,  // set false to disable left/right matching
            1: true,  // set false to disable up/down matching
            4: true,  // set false to disable left-down/right-up matching
            5: true   // set false to disable right-down/left-up matching
        }
        ```
    - [Hexagon grid](board-hexagongrid.md)
        ```javascript
        {
            0: true,
            1: true,
            3: true
        }
        ```

### Custom class

- Define class
    ```javascript
    class MyMatch extends RexPlugins.Board.Match {
        constructor(config) {
            super(config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var match = new MyMatch(config);
    ```

### Set board

[Board object](board.md) could be assigned later.

```javascript
match.setBoard(board);
```

### Update symbols

Each tile position (tileX, tileY)  has a symbol.

#### Update all symbols in board

```javascript
match.refreshSymbols(function(tileXY, board) {
    // var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
    // if (chess == null) { return null; }
    return symbol;
}, scope);
```

- `tileXY` : Tile position `{x, y}`
- `board` : [Board](board.md) object
- `symbol` : A string or a number
    - `null` : No symbol

#### Updata a symbol

```javascript
match.setSymbol(tileX, tileY, symbol);
```

#### Get symbol

```javascript
var symbol = match.getSymbol(tileX, tileY);
```

#### For each symbol cahce

```javascript
match.forEach(function(tileXY, symbol, board) {
    // return true; // Break for each loop
}, scope)
```

- `tileXY` : Tile position `{x, y}`
- `symbol` : A string or a number
    - `null` : No symbol
- `board` : [Board](board.md) object

#### Wildcard symbol

- Set
    ```javascript
    match.setWildcard(symbol);
    ```
    or
    ```javascript
    match.wildcard = symbol;
    ```
- Get
    ```javascript
    var wildcard = match.wildcard;
    ```

### Directions mask

Enable/Disable matching at directions, all directions are enbale by default.

```javascript
match.setDirMask(dir, value);
```

- `dir` :
    - [Quad grid](board-quadgrid.md), 4 directions : `0`, `1`
    - [Quad grid](board-quadgrid.md), 8 directions : `0`, `1`, `4`, `5`
    - [Hexagon grid](board-hexagongrid.md) : `0`, `1`, `2`
- `value` : `true` or `false`

### Line grouping

#### Match-N

```javascript
match.match(n, function (result, board) {
    // var chess = board.tileXYArrayToChess(result.tileXY, 0);
    // GroupCall(chess, function (chess) { chess.setScale(0.8); });

    // return true; // Break for each loop
}, scope);
```

- `n` : A number, to get matched chess with n equal symbols
- `result` : A group of chess
    ```javascript
    {
        tileXY: [],
        direction: 0
        pattern: symbol
    }
    ```
    - `tileXY` : An array of tile positions `{x, y}`
    - `direction` : Direction of this chess group
        - `0`, `1`, for [quad grid](board-quadgrid.md) with 4 directions
        - `0`, `1`, `4`, `5`, for [quad grid](board-quadgrid.md) with 8 directions
        - `0`, `1`, `2`, for [hexagon grid](board-hexagongrid.md)
    - `pattern` : Matched symbol
- `board` : [Board](board.md) object

##### Any match-N

```javascript
var hasAnyMatchN = match.anyMatch(n);
```

#### Match pattern

```javascript
match.match(pattern, function (result, board) {
    // var chess = board.tileXYArrayToChess(result.tileXY, 0);
    // GroupCall(chess, function (chess) { chess.setScale(0.8); });
}, scope);
```

- `pattern` : A list of symbols

##### Any match pattern

```javascript
var hasAnyMatchN = match.anyMatch(pattern);
```

### Neighbors grouping

- Group by neighbors with the same symbol
    ```javascript
    tileXYArray = match.group(startTileX, startTileY);
    // out = match.group(startTileX, startTileY, out);
    ```
    - `startTileX`, `startTileY` : Tile position of grouping, to group neighbors with the same symbol. Can't start from `null`, `undefined` or wildcard symbol.