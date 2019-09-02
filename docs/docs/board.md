## Introduction

Core object of Board system.

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/board-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexboardplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board)

User could import class directly, or install it by global plugin.

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import BoardPlugin from './plugins/board-plugin.js';

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

### Add board object

- Quad board
    ```javascript
    var board = scene.rexBoard.add.board({
        grid: {
            gridType: 'quadGrid',
            x: 0,
            y: 0,
            cellWidth: 0,
            cellHeight: 0,
            type: 'orthogonal'  // 'orthogonal'|'isometric'|'staggered'
        },
        width: 0,
        height: 0
    });
    ```
- Hexagon board
    ```javascript
    var board = scene.rexBoard.add.board({
        grid: {
            gridType: 'hexagonGrid',
            x: 0,
            y: 0,
            cellWidth: 0,
            cellHeight: 0,
            staggeraxis: 'x',   // 'x'|'y'
            staggerindex: 'odd' // 'odd'|'even'
        },
        width: 0,
        height: 0
    });
    ```

Configuration

- `grid` :
    - `gridType` :
        - `'quadGrid'` : [Quad grid](board-quadgrid.md)
        - `'hexagonGrid'` : [hexagon grid](board-hexagongrid.md)
- `width` : Board width in tiles
- `height` : Board height in tiles

### Custom class

- Define class
    ```javascript
    class MyBoard extends RexPlugins.Board.Board {
        constructor(scene) {
            super(scene, {
                grid: {
                    gridType: 'quadGrid',
                    x: 0,
                    y: 0,
                    cellWidth: 0,
                    cellHeight: 0,
                    type: 'orthogonal'  // 'orthogonal'|'isometric'|'staggered'
                },
                width: 0,
                height: 0
            });
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var board = new MyBoard(scene);
    ```

### Board size

- Width : Board width in tiles
    - Get
        ```javascript
        var width = board.width;
        ```
    - Set
        ```javascript
        board.setBoardWidth(width);
        ```
- Height : Board height in tiles
    - Get
        ```javascript
        var height = board.height;
        ```
    - Set
        ```javascript
        board.setBoardHeight(height);
        ```

### Add chess

```javascript
board.addChess(chess, tileX, tileY, tileZ, align);
```

- `chess` : A game object.
- `tileX` , `tileY` , `tileZ` : Tile position.
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY). Default is `true`.

!!! note "Chess and tile position"
    - Any chess has a **(tileX, tileY, tileZ)** index
    - Any (tileX, tileY, tileZ) index contains only **1** chess.
    - (tileX, tileY) could have more then 1 chess with different tileZ index.
    - tileZ is not equal to `depth`.

#### Kick-out event

Board will fire `kickout` event when adding chess to an occupied grid.

```javascript
board.on('kickout', function(chessToAdd, occupiedChess, tileXYZ){
})
```

`chessToAdd` kicks out `occupiedChess` at tile position `tileXYZ`(`{x,y,z}`).

### Remove chess

- Remove chess object from board
    ```javascript
    board.removeChess(chess, null, null, null, destroy);
    ```
    - `chess` : A game object
    - `destroy` : Set `true` to desrtoy chess object.
- Remove chess at (tileX, tileY, tileZ) from board
    ```javascript
    board.removeChess(null, tileX, tileY, tileZ, destroy);
    ```
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `destroy` : Set `true` to desrtoy chess object.
- Remove all chess
    ```javascript
    board.removeAllChess(destroy);
    ```
    - `destroy` : Set `true` to desrtoy chess object.

### Move chess

```javascript
board.moveChess(chess, toTileX, toTileY, toTileZ, align);
```

- `chess` : A game object
- `toTileX`, `toTileY`, `toTileZ` : Target tile position
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY).

### Swap chess

```javascript
board.swapChess(chessA, chessB, align);
```

- `chessA`, `chessB` : Game objects
- `align` : Set `true` to align (i.e. set position) chess to grid (tileX, tileY).

### Chess -> tile position

```javascript
var tileXYZ = board.chessToTileXYZ(chess);
```

- `chess` : A game object
- `tileXYZ` : `{x,y,z}` or `null` if chess is not added to board.

### Tile position -> chess

- Get chess at (tileX, tileY, tileZ)
    ```javascript
    var chess = board.tileXYZToChess(tileX, tileY, tileZ);
    ```
    - `chess` : A game object
- Get chess at (tileX, tileY)
    ```javascript
    var out = board.tileXYToChessArray(tileX, tileY);
    // var out = board.tileXYToChessArray(tileX, tileY, out);
    ```
    - `out` : An array of chess
- Get chess at tileZ
    ```javascript
    var out = board.tileZToChessArray(tileZ);
    // var out = board.tileZToChessArray(tileZ, out);
    ```
    - `out` : An array of chess
- Get chess from array of (tileX, tileY)
    ```javascript
    var out = board.tileXYArrayToChessArray(tileXYArray);
    // var out = board.tileXYArrayToChessArray(tileXYArray, out);
    ```
    or
    ```javascript
    var out = board.tileXYArrayToChessArray(tileXYArray, tileZ);
    // var out = board.tileXYArrayToChessArray(tileXYArray, tileZ, out);
    ```
    - `tileXYArray` : An array of tileXY `{x, y}`
    - `out` : An array of chess

### Contains

- Is (tileX, tileY) inside board?
    ```javascript
    var isTileInBoard = board.contains(tileX, tileY);
    ```
- Does (tileX, tileY, tileZ) have chess?
    ```javascript
    var isTileInBoard = board.contains(tileX, tileY, tileZ);
    ```
- Is chess inside board?
    ```javascript
    var isChessInBoard = board.exists(chess);
    ```
    - `chess` : A game object

### For each tile

```javascript
board.forEachTileXY(function(tileXY, board) {
    // var tileX = tileXY.x;
    // var tileY = tileXY.y;
}, scope, order);
```

Iteration order :

```javascript
board.forEachTileXY(function(tileXY, board) {
    // var tileX = tileXY.x;
    // var tileY = tileXY.y;
}, scope, order);
```

- `order` :
    - `0`, or `x+` : Increasing x, increasing y.
    - `1`, or `x-` : Decreasing x, increasing y.
    - `2`, or `y+` : Increasing y, increasing x.
    - `3`, or `y-` : Decreasing y, increasing x.

Or using for-loop

```javascript
for (var tileY = 0; tileY < board.height; tileY++) {
    for (var tileX = 0; tileX < board.width; tileX++) {
        // ...
    }
}
```

- `board.width` , `board.height` : Board width/height in tiles.

### Tile position -> world position

```javascript
var worldXY = board.tileXYToWorldXY(tileX, tileY);  // worldXY: {x, y}
// var out = board.tileXYToWorldXY(tileX, tileY, out);
```

### World position -> tile position

```javascript
var tileXY = board.worldXYToTileXY(worldX, worldY);  // tileXY: {x, y}
// var out = board.worldXYToTileXY(worldX, worldY, out);
```

#### World position -> Grid world position

```javascript
var gridWorldXY = board.worldXYSnapToGrid(worldX, worldY);
// var out = board.worldXYSnapToGrid(worldX, worldY, out);
```

### Ring -> tile position

- Get array of tile position around a ring.
    ```javascript
    var out = board.ringToTileXYArray(centerTileXY, radius);
    // var out = board.ringToTileXYArray(centerTileXY, radius, out);
    ```
    - `centerTileXY` : Tile position `{x, y}` of ring center.
    - `radius` : Radius of the ring.
- Get array of tile position within a filled ring.
    ```javascript
    var out = board.filledRingToTileXYArray(centerTileXY, radius);
    var out = board.filledRingToTileXYArray(centerTileXY, radius, nearToFar);
    // var out = board.filledRingToTileXYArray(centerTileXY, radius, out);
    // var out = board.filledRingToTileXYArray(centerTileXY, radius, nearToFar, out);
    ```
    - `centerTileXY` : Tile position `{x, y}` of ring center.
    - `radius` : Radius of the ring.
    - `nearToFar` : From near ring to far ring. Default value is `true`.

### Shape -> tile position

#### Line -> tile position

Get array of tile position along a line defined via (`startWorldX`, `startWorldY`) to (`endWorldX`, `endWorldY`)

```javascript
var out = board.lineToTileXYArray(startWorldX, startWorldY, endWorldX, endWorldY);
// var out = board.lineToTileXYArray(startWorldX, startWorldY, endWorldX, endWorldY, out);
```

- `startWorldX`, `startWorldY`, `endWorldX`, `endWorldY` : Start and end pointer of a line
- `out` : An array of tile position

or

```javascript
var out = board.lineToTileXYArray(line);
// var out = board.lineToTileXYArray(line, out);
```

- `line` : [Line object](geom-line.md)

#### Circle -> tile position

Get array of tile position inside a [circle shape](geom-circle.md)

```javascript
var out = board.circleToTileXYArray(circle);
// var out = board.circleToTileXYArray(circle, out);
```

- `circle` : [Circle shape](geom-circle.md)
- `out` : An array of tile position

#### Rectangle -> tile position

Get array of tile position inside a [rectangle shape](geom-rectangle.md)

```javascript
var out = board.rectangleToTileXYArray(rectangle);
// var out = board.rectangleToTileXYArray(rectangle, out);
```

- `rectangle` : [Rectangle shape](geom-rectangle.md)
- `out` : An array of tile position

#### Ellipse -> tile position

Get array of tile position inside a [ellipse shape](geom-ellipse.md)

```javascript
var out = board.ellipseToTileXYArray(ellipse);
// var out = board.ellipseToTileXYArray(ellipse, out);
```

- `ellipse` : [Ellipse shape](geom-ellipse.md)
- `out` : An array of tile position

#### Triangle -> tile position

Get array of tile position inside a [triangle shape](geom-triangle.md)

```javascript
var out = board.triangleToTileXYArray(triangle);
// var out = board.triangleToTileXYArray(triangle, out);
```

- `triangle` : [Triangle shape](geom-triangle.md)
- `out` : An array of tile position

#### Polygon -> tile position

Get array of tile position inside a [polygon shape](geom-polygon.md)

```javascript
var out = board.polygonToTileXYArray(polygon);
// var out = board.polygonToTileXYArray(polygon, out);
```

- `polygon` : [Polygon shape](geom-polygon.md)
- `out` : An array of tile position

### Angle between world position of 2 tiles

```javascript
var radian = board.angleBetween(tileXY0, tileXY1);
```

- `radian` : Angle between world position of 2 tiles, in radian.
- `tileXY0`, `tileXY1` : tile position `{x, y}`

### Is angle in cone

```javascript
var isInCone = board.isAngleInCone(chessA, chessB, face, cone);
```

- `chessA`, `chessB` : Direction from chessA to chessB. Chess object, or tileXY. 
- `face`, `cone` : Range of compared angle is between `face - (cone/2)` to `face + (cone/2)`. Angle in radian.

### Direction between 2 tiles

```javascript
var direction = board.directionBetween(chessA, chessB);
```

- `chessA`, `chessB` : A chess object, or tile position `{x,y}`.
- `direction` : Integer number.
    - [Quad grid](board-quadgrid.md#directions) : `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`.
    - [Hexagon grid](board-hexagongrid.md#directions) : `0`, `1`, `2`, `3`, `4`, `5`.

```javascript
var direction = board.directionBetween(chessA, chessB, false);
```

- `direction` : Integer number, or float number.
    - [Quad grid](board-quadgrid.md#directions) : `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, or float number between 0~1, 1~2, 2~3, 3~4, 4~5, 5~6, 6~7.
    - [Hexagon grid](board-hexagongrid.md#directions) : `0`, `1`, `2`, `3`, `4`, `5`, or float number between 0~1, 1~2, 2~3, 3~4, 4~5, 5~6.

### Is direction in cone

```javascript
var isInCone = board.isDirectionInCone(chessA, chessB, face, cone);
```

- `chessA`, `chessB` : Direction from chessA to chessB. Chess object, or tileXY. 
- `face`, `cone` : Range of compared direction is between `face - (cone/2)` to `face + (cone/2)`. Integer number, or float number.
    - [Quad grid](board-quadgrid.md#directions) : `0`, `1`, `2`, `3`, or float number between 0~1, 1~2, 2~3, 3~4.
    - [Hexagon grid](board-hexagongrid.md#directions) : `0`, `1`, `2`, `3`, `4`, `5`, or float number between 0~1, 1~2, 2~3, 3~4, 4~5, 5~6.

### Opposite direction

```javascript
var direction = board.getOppositeDirection(tileX, tileY, direction);
```

### Align world position to grid

- Align one chess object
    ```javascript
    board.gridAlign(chess);
    ```
- Align all chess
    ```javascript
    board.gridAlign();
    ```

### Is overlapping with world position

```javascript
var isOverlapping = board.isOverlappingPoint(worldX, worldY);
```

or

```javascript
var isOverlapping = board.isOverlappingPoint(worldX, worldY, tileZ);
```

### Neighbors

#### Neighbor tile position

- Get neighbor tile position at 1 direction
    ```javascript
    var neighborTileXY = board.getNeighborTileXY(srcTileXY, direction);
    // var out = board.getNeighborTileXY(srcTileXY, direction, out);
    ```
    - `srcTileXY` : Tile position `{x, y}` of source.
    - `direction` : Number, or string number.
        - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
        - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
        - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).
    - `neighborTileXY` : Tile position `{x, y}` of neighbor. Retrun `null` if no neighbor there (i.e. source chess is at the edge of board.)
- Get neighbor tile position at directions
    ```javascript
    var neighborTileXY = board.getNeighborTileXY(srcTileXY, directions);
    // var out = board.getNeighborTileXY(srcTileXY, directions, out);
    ```
    - `directions`
        - Array of numbers, `[0, 2, 4]`.
        - String number concatenated via `,`, `'0,2,4'`.
    - `out` : Tile position array of all neighbors
- Get neighbor tile position at all directions
    ```javascript
    var out = board.getNeighborTileXY(srcTileXY, null);
    // var out = board.getNeighborTileXY(srcTileXY, null, out);
    ```
    - `out` : Tile position array of all neighbors
- Get direction between 2 tile positions
    ```javascript
    var direction = board.getNeighborTileDirection(srcTile, neighborTileXY);
    ```
    - `direction` : Return `null` if these 2 tile positions are not neighbors.

#### Neighbor chess

- Get neighbor chess at 1 direction
    ```javascript
    var neighborChess = board.getNeighborChess(chess, direction); // neighborTileZ = tileZ of chess
    // var neighborChess = board.getNeighborChess(chess, direction, neighborTileZ);
    ```
    - `chess` : A chess object, or tile position `{x,y,z}`.
    - `direction` : Number, or string number.
        - `0` ~ `3` : [Quad grid](board-quadgrid.md#directions) in 4 directions mode.
        - `0` ~ `7` : [Quad grid](board-quadgrid.md#directions) in 8 directions mode.
        - `0` ~ `5` : [Hexagon grid](board-hexagongrid.md#directions).
    - `neighborChess` : A chess object.
- Get neighbor chess at directions
    ```javascript
    var out = board.getNeighborChess(chess, directions); // neighborTileZ = tileZ of chess
    // var out = board.getNeighborChess(chess, directions, neighborTileZ);
    ```
    - `chess` : A chess object, or tile position `{x,y,z}`.
    - `directions`
        - Array of numbers, `[0, 2, 4]`.
        - String number concatenated via `,`, `'0,2,4'`.
    - `out` : Chess array of neighbors.
- Get neighbor chess at all directions
    ```javascript
    var out = board.getNeighborChess(chess, null); // neighborTileZ = tileZ of chess
    // var out = board.getNeighborChess(chess, null, neighborTileZ);
    ```
    - `chess` : A chess object, or tile position `{x,y,z}`.
    - `out` : Chess array of all neighbors.
- Get direction between 2 chess
    ```javascript
    var direction = board.getNeighborChessDirection(chess, neighborChess);
    ```
    - `direction` : Return `null` if these 2 chess are not neighbors.
- Are 2 chess neighbors?
   ```javascript
   var areNeighbor = board.areNeighbors(chessA, chessB);
   ```
   - `areNeighbor` : Return `true` if `chessA` and `chessB` are neighbors.

### Empty tile position

- Get a random tile position which does not have any chess
    ```javascript
    var tileXY = board.getRandomEmptyTileXY(tileZ);
    // var out = board.getRandomEmptyTileXY(tileZ, out);
    ```
    - `tileXY` : Tile position `{x, y}`, return `null` if all positions are occupied.
- Get an array of tile position which does not have any chess
    ```javascript
    var tileXYArray = board.getEmptyTileXYArray(tileZ);
    // var out = board.getEmptyTileXYArray(tileZ, out);
    ```
    - `tileXYArray` : An array of tile position

### Get all chess

```javascript
var chessArray = board.getAllChess();
```

### Fit

```javascript
var out = board.fit(tileXYArray);
```

- `tileXYArray` : An array of tile position `{x,y}`.

Offset all of tile positions to `(0, 0)`, and set board size to fit these tile positions.

### Blocker

- Set blocker property : See [chess data](board-chessdata.md#blocker)
- Has blocker at tile position (tileX, tileY, tileZ)
    ```javascript
    var hasBlocker = board.hasBlocker(tileX, tileY, tileZ);
    ```
- Any chess at (tileX, tileY) has `blocker` property
    ```javascript
    var hasBlocker = board.hasBlocker(tileX, tileY);
    ```

### Touch events

#### Set interactive

- Enable
    ```javascript
    board.setInteractive();
    ```
- Disable
    ```javascript
    board.setInteractive(false);
    ```

#### Pointer down

- Pointer down at any tile
    ```javascript
    board.on('tiledown', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `tileXY` : `{x, y}`
- Pointer down at chess
    ```javascript
    board.on('gameobjectdown', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.pointerdown', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)

#### Pointer up

- Pointer up at any tile
    ```javascript
    board.on('tileup', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `tileXY` : `{x, y}`
- Pointer up at chess
    ```javascript
    board.on('gameobjectup', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.pointerup', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)

#### Pointer move

- Pointer move to another tile
    ```javascript
    board.on('tilemove', function(pointer, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `tileXY` : `{x, y}`
    - Only triggered when `tileXY` is changed.
- Pointer move to another chess
    ```javascript
    board.on('gameobjectmove', function(pointer, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.pointermove', function(pointer) {
    })
    ```
    - `pointer` : [Touch pointer](touchevents.md#properties-of-point)
    - `gameObject` : Game object at touched (tileX, tileY)

#### [Tap](gesture-tap.md)

- Tap at any tile
    ```javascript
    board.on('tiletap', function(tap, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
        // var tapsCount = tap.tapsCount;
    });
    ```
    - `tap` : [Tap behavior](gesture-tap.md).
        - `tap.tapsCount` : Taps count.
    - `tileXY` : `{x, y}`
- N-taps at any tile
    ```javascript
    board.on('tile' + tapsCount + 'tap' , function(tap, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `'tile' + tapsCount + 'tap'` : `'tile1tap'`, `'tile2tap'`, `'tile3tap'`, etc ...
    - `tap` : [Tap behavior](gesture-tap.md).
    - `tileXY` : `{x, y}`
- Tap at chess
    ```javascript
    board.on('gameobjecttap', function(tap, gameObject) {
        // var tapsCount = tap.tapsCount;
    })
    ```
    or
    ```javascript
    gameObject.on('board.tap', function(tap) {
        // var tapsCount = tap.tapsCount;
    })
    ```
    - `tap` : [Tap behavior](gesture-tap.md).
        - `tap.tapsCount` : Taps count.
    - `gameObject` : Game object at touched (tileX, tileY)
- N-taps at chess
    ```javascript
    board.on('gameobject' + tapsCount + 'tap' , function(tap, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.' + tapsCount + 'tap', function(tap) {
    })
    ```
    - `'gameobject' + tapsCount + 'tap'` : `'gameobject1tap'`, `'gameobject2tap'`, `'gameobject3tap'`, etc ...
    - `'board.' + tapsCount + 'tap'` : `'board.1tap'`, `'board.2tap'`, `'board.3tap'`, etc ...
    - `tap` : [Tap behavior](gesture-tap.md).
    - `gameObject` : Game object at touched (tileX, tileY)

#### [Press](gesture-press.md)

- Press-start at any tile
    ```javascript
    board.on('tilepressstart', function(press, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `press` : [Press behavior](gesture-press.md).
    - `tileXY` : `{x, y}`
- Press-end at any tile
    ```javascript
    board.on('tilepressend', function(press, tileXY) {
        // var tileX = tileXY.x;
        // var tileY = tileXY.y;
    });
    ```
    - `press` : [Press behavior](gesture-press.md).
    - `tileXY` : `{x, y}`
- Press-star at chess
    ```javascript
    board.on('gameobjectpressstart', function(press, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.pressstart', function(press) {
    })
    ```
    - `press` : [Press behavior](gesture-tap.md).
    - `gameObject` : Game object at touched (tileX, tileY)
- Press-end at chess
    ```javascript
    board.on('gameobjectpressend', function(press, gameObject) {
    })
    ```
    or
    ```javascript
    gameObject.on('board.pressend', function(press) {
    })
    ```
    - `press` : [Press behavior](gesture-tap.md).
    - `gameObject` : Game object at touched (tileX, tileY)

### Grid points

- Get an array of grid points at tile position (tileX, tileY).
    ```javascript
    var points = board.getGridPoints(tileX, tileY);
    // var out = board.getGridPoints(tileX, tileY, out);
    ```
- Draw grid polygon on [graphics object](graphics.md#lines)
    ```javascript
    graphics.strokePoints(points, true);
    ```

### Other properties

- Scene
    ```javascript
    var scene = board.scene;
    ```
