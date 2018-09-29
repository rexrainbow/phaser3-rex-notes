## Introduction

Grid (polygon) shape object.

- Author: Rex
- Polygon Shape Game object of Board system

## Source code

Included in [board plugin](board.md#source-code).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/board)

### Install scene plugin

Included in board plugin.

### Add shape object

- Create shape object and add to board
    ```javascript
    var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor);
    // var shape = scene.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor, fillAlpha);
    ```
    - `board` : [Board object](board.md)
    - `tileX`, `tileY`, `tileZ` : Tile position
    - `fillColor`, `fillAlpha` : Color of this shape object
- Create shape object but *not* add to board
    ```javascript
    var shape = scene.rexBoard.add.shape(board, x, y, undefined, fillColor, fillAlpha, false);
    ```
    - `board` : [Board object](board.md)
    - `x`, `y` : World position
    - `fillColor`, `fillAlpha` : Color of this shape object


### Set color

- Fill color
    ```javascript
    polygon.setFillStyle(color, alpha)
    ```
- Stroke color
    ```javascript
    polygon.setStrokeStyle(lineWidth, color, alpha)
    ```

!!! warning "No tint methods"
    Uses `shape.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
