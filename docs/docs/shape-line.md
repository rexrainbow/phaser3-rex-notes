## Introduction

Line shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var line = scene.add.line(x, y, x1, y1, x2, y2, strokeColor);
// var line = scene.add.line(x, y, x1, y1, x2, y2, strokeColor, strokeAlpha);
```

### Set color

- Fill color
    ```javascript
    line.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    line.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `line.setFillStyle(color, alpha)` to change color.

### Set end points

```javascript
line.setTo(x1, y1, x2, y2);
```

### Line width

```javascript
line.setLineWidth(startWidth, endWidth);
```

- `endWidth` : The end width of the line. Only used in WebGL.

### Other properties

See [game object](gameobject.md)
