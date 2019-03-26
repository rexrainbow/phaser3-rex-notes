## Introduction

Hexagon grid object of Board system.

- Author: Rex
- Grid object of board

## Source code

Included in [board plugin](board.md#source-code).

## Usage

See [board examples](board.md#usage).

### Install scene plugin

Included in board plugin.

### Create instance

```javascript
var grid = scene.rexBoard.add.hexagonGrid({
    x: 0,
    y: 0,
    cellWidth: 0,
    cellHeight: 0,
    // size: undefined,
    staggeraxis: 1,
    staggerindex: 1
});
```

- `x`, `y` : World position of origin tile (i.e. tileX = 0, tileY = 0)
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `size` : Distance between center to each corner. Get `cellWidth` and `cellHeight` from `size` if this parameter is not undefined.
- `staggeraxis`
    - `0`, or `y`
    - `1`, or `x`
- `staggerindex`
    - `0`, or `even`
    - `1`, or `odd`

### Set world position of tile (0, 0)

```javascript
grid.setOriginPosition(worldX, worldY);
```

### Set cell size

```javascript
grid.setCellSize(cellWidth, cellHeight);
```

### Set grid type

```javascript
grid.setType(staggeraxis, staggerindex);
```

- `staggeraxis`
    - `0`, or `y`
    - `1`, or `x`
- `staggerindex`
    - `0`, or `even`
    - `1`, or `odd`

### Get world position

```javascript
var worldXY = grid.getWorldXY(tileX, tileY);  // worldXY: {x, y}
// var out = grid.getWorldXY(tileX, tileY, out);
```

### Get tile position

```javascript
var tileXY = grid.getWorldXY(tileX, tileY);  // tileXY: {x, y}
// var out = grid.getWorldXY(tileX, tileY, out);
```

### Directions

- staggeraxis = `0`/`y`
    - `0` : Down-right
    - `1` : Down
    - `2` : Down-left
    - `3` : Up-left
    - `4` : Up
    - `5` : Up-right
- staggeraxis = `1`/`x`
    - `0` : Right
    - `1` : Down-right
    - `2` : Down-left
    - `3` : Left
    - `4` : Up-left
    - `5` : Up-right