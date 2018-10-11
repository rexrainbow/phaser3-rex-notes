## Introduction

Create tile positions in hexagon/triangle/parallelogram geometry in hexagon grid. 

- Author: Rex
- Help method of board

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board-hexagonmap)

### Install scene plugin

Included in board plugin.

#### Create tile positions

##### Hexagon

```javascript
var tileXYArray = scene.rexBoard.hexagonMap.hexagon(board, radius);
// var out = scene.rexBoard.hexagonMap.hexagon(board, radius, out);
```

- `tileXYArray` : An array of tile position `{x, y}`.
- `board` : [Board object](board.md).
- `radius` : Radius in tile count.

| staggeraxis | y | x |
| ---- | ---- | ---- |
||![Hexagon-y](images/board-hexagonmap/hexagon-y.png)|![Hexagon-x](images/board-hexagonmap/hexagon-x.png)|

##### Parallelogram

```javascript
var tileXYArray = scene.rexBoard.hexagonMap.parallelogram(board, type, width, height);
// var out = scene.rexBoard.hexagonMap.parallelogram(board, type, width, height, out);
```

- `tileXYArray` : An array of tile position `{x, y}`.
- `board` : [Board object](board.md).
- `width`, `height` : Size of parallelogram

| type\staggeraxis | y                                                            | x                                                            |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 0                | ![Parallelogram-0y](images/board-hexagonmap/parallelogram-0y.png) | ![Parallelogram-0x](images/board-hexagonmap/parallelogram-0x.png) |
| 1                | ![Parallelogram-1y](images/board-hexagonmap/parallelogram-1y.png) | ![Parallelogram-1x](images/board-hexagonmap/parallelogram-1x.png) |
| 2                | ![Parallelogram-2y](images/board-hexagonmap/parallelogram-2y.png) | ![Parallelogram-2x](images/board-hexagonmap/parallelogram-2x.png) |

##### Triangle

```javascript
var tileXYArray = scene.rexBoard.hexagonMap.triangle(board, type, height);
// var out = scene.rexBoard.hexagonMap.triangle(board, type, height, out);
```

- `tileXYArray` : An array of tile position `{x, y}`.
- `board` : [Board object](board.md).
- `height` : Size of Triangle

| type\staggeraxis | y                                                       | x                                                       |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| 0                | ![Triangle-0y](images/board-hexagonmap/triangle-0y.png) | ![Triangle-0x](images/board-hexagonmap/triangle-0x.png) |
| 1                | ![Triangle-1y](images/board-hexagonmap/triangle-1y.png) | ![Triangle-1x](images/board-hexagonmap/triangle-1x.png) |

#### Retrieve tile positions

1. Offset all of tile positions to `(0, 0)`, and set board size to fit these tile positions.
    ```javascript
    var tileXYArray = board.fit(tileXYArray);
    ```
2. Retrieve tile positions
    ```javascript
    var tileXY;
    for(var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        // ...
    }
    ```