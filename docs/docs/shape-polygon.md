## Introduction

Polygon shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var polygon = scene.add.polygon(x, y, points, fillColor);
// var polygon = scene.add.polygon(x, y, points, fillColor, fillAlpha);
```

!!! note
    Shift given points to align position **(0, 0)**

### Set color

- Fill color
    ```javascript
    polygon.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    polygon.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `polygon.setFillStyle(color, alpha)` to change color.

### Smooth

Smooths the polygon over the number of iterations specified.

```javascript
polygon.smooth(iterations);
```

### Other properties

See [game object](gameobject.md)
