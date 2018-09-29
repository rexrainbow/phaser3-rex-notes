## Introduction

Arc shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var arc = scene.add.arc(x, y, radius, startAngle, endAngle, anticlockwise, fillColor);
// var arc = scene.add.arc(x, y, radius, startAngle, endAngle, anticlockwise, fillColor, fillAlpha);
```

### Set color

- Fill color
    ```javascript
    arc.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    arc.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `arc.setFillStyle(color, alpha)` to change color.

### Propertirs

- Radius
    - Get
        ```javascript
        var radius = arc.radius;
        ```
    - Set
        ```javascript
        arc.setRadius(radius);
        ```
        or
        ```javascript
        arc.radius = radius;
        ```
- Start angle, in degrees.
    - Get
        ```javascript
        var startAngle = arc.startAngle;
        ```
    - Set
        ```javascript
        arc.setStartAngle(startAngle);
        // arc.setStartAngle(startAngle, anticlockwise);
        ```
        or
        ```javascript
        arc.startAngle = startAngle;
        ```
- End angle, in degrees.
    - Get
        ```javascript
        var endAngle = arc.endAngle;
        ```
    - Set
        ```javascript
        arc.seEndAngle(endAngle);
        ```
        or
        ```javascript
        arc.endAngle = endAngle;
        ```
- Anticlockwise (`true`, or `false`)
    - Get
        ```javascript
        var anticlockwise = arc.anticlockwise;
        ```
    - Set
        ```javascript
        arc.anticlockwise = anticlockwise;
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
