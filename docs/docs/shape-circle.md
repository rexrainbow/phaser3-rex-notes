## Introduction

Circle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var circle = scene.add.circle(x, y, radius, fillColor);
// var circle = scene.add.circle(x, y, radius, fillColor, fillAlpha);
```

### Set color

- Fill color
    ```javascript
    circle.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    circle.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `circle.setFillStyle(color, alpha)` to change color.

### Propertirs

- Radius
    - Get
        ```javascript
        var radius = circle.radius;
        ```
    - Set
        ```javascript
        circle.setRadius(radius);
        ```
        or
        ```javascript
        circle.radius = radius;
        ```
- Iterations: Increase this value for smoother arcs, at the cost of more polygons being rendered. Default is `0.01`
    - Get
        ```javascript
        var iterations = arc.iterations;
        ```
    - Set
        ```javascript
        arc.iterations = iterations;
        ```

### Other properties

See [game object](gameobject.md)
