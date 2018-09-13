## Introduction

Quad grid object of Board system.

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
var grid = scene.rexBoard.add.quadGrid({
    x: 0,
    y: 0,
    cellWidth: 0,
    cellHeight: 0,
    type: 0
});
```

- `x`, `y` : World position of origin tile (i.e. tileX = 0, tileY = 0)
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `type`
    - `0`, or `orthogonal`
    - `1`, or `isometric`
    - `2`, or `staggered`

### Get world position

```javascript
var worldX = grid.getWorldX(tileX, tileY);
var worldY = grid.getWorldY(tileX, tileY);
```

### Get tile position

```javascript
var tileX = grid.getTileX(worldX, worldY);
var tileY = grid.getTileY(worldX, worldY);
```