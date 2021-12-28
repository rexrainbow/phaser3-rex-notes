## Introduction

Quad grid object of Board system.

- Author: Rex
- Grid object of board

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board)

### Create instance

```javascript
var grid = scene.rexBoard.add.quadGrid({
    x: 0,
    y: 0,
    cellWidth: 0,
    cellHeight: 0,
    type: 0,
    // dir: 4
});
```

or

```javascript
// import { QuadGrid } from 'phaser3-rex-plugins/plugins/board-components.js';
var grid = new QuadGrid(config);
```

- `x`, `y` : World position of tile (0, 0)
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `type`
    - `0`, or `orthogonal`
    - `1`, or `isometric`
- `dir` :
    - `4` or `'4dir'` : Left/Down/Right/Up
    - `8` or `'8dir'` : Left/Down/Right/Up/Left-down/Down-right/Right-up/Up-left

### World position of tile (0, 0)

- Get
    ```javascript
    var worldX = grid.x;
    var worldY = grid.y;
    ```
- Set
    ```javascript
    grid.setOriginPosition(worldX, worldY);
    ```
    or
    ```javascript
    grid.x = worldX;
    grid.y = worldY;
    ```

### Cell size

- Get
    ```javascript
    var width = grid.width;
    var height = grid.height;
    ```
- Set
    ```javascript
    grid.setCellSize(width, height);
    ```
    or
    ```javascript
    grid.width = width;
    grid.height = height;
    ```

### Grid type

- Get
    ```javascript
    var mode = grid.mode;
    ```
- Set
    ```javascript
    grid.setType(mode);
    ```
    - `mode`
        - `0`, or `orthogonal`
        - `1`, or `isometric`

### Get world position

```javascript
var worldXY = grid.getWorldXY(tileX, tileY);  // worldXY: {x, y}
// var out = grid.getWorldXY(tileX, tileY, out);
```

### Get tile position

```javascript
var tileXY = grid.getTileXY(worldX, worldY);  // tileXY: {x, y}
// var out = grid.getTileXY(worldX, worldY, out);
```

### Directions

- `0` : Left
- `1` : Down
- `2` : Right
- `3` : Up
- `4` : Left-down
- `5` : Down-right
- `6` : Right-up
- `7` : Up-left