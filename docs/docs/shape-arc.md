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

### Custom class

- Define class
    ```javascript
    class MyArc extends Phaser.GameObjects.Arc {
        constructor(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor) {
            super(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var arc = new MyArc(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = arc.fillColor;
        ```
    - Set
        ```javascript
        arc.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = arc.strokeColor;
        ```
    - Set
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
