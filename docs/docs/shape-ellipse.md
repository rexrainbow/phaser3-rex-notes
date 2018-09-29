## Introduction

Ellipse shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var ellipse = scene.add.ellipse(x, y, width, height, fillColor);
// var ellipse = scene.add.ellipse(x, y, width, height, fillColor, fillAlpha);
```

### Set color

- Fill color
    ```javascript
    ellipse.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    ellipse.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `ellipse.setFillStyle(color, alpha)` to change color.

### Propertirs

- Size
    - Get
        ```javascript
        var width = ellipse.width;
        var height = ellipse.height;
        ```
    - Set
        ```javascript
        ellipse.setSize(width, height);
        ```
### Smoothness

The number of points used when rendering it. Increase this value for smoother curves, at the cost of more polygons being rendered.

```javascript
curve.setSmoothness(smoothness);
```
or
```javascript
curve.smoothness = smoothness;
```

### Other properties

See [game object](gameobject.md)
