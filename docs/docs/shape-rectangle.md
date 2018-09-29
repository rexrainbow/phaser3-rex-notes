## Introduction

Rectangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var rect = scene.add.rectangle(x, y, width, height, fillColor);
// var rect = scene.add.rectangle(x, y, width, height, fillColor, fillAlpha);
```

### Set color

- Fill color
    ```javascript
    rect.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    rect.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
