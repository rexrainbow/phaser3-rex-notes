## Introduction

Grid shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var grid = scene.add.grid(x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha);
```

### Set color

- Fill color
    ```javascript
    grid.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    grid.setStrokeStyle(lineWidth, color, alpha);
    ```
- Alternating color
    ```javascript
    grid.setAltFillStyle(color, alpha);
    ```
- Outline color
    ```javascript
    grid.setOutlineStyle(color, alpha;
    ```

!!! warning "No tint methods"
    Uses `grid.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
