## Introduction

Circle shape, built-in game object of phaser.

- Author: Phaser Team

## Usage

### Create shape object

```javascript
var circle = scene.add.circle(x, y, radius, fillColor);
// var circle = scene.add.circle(x, y, radius, fillColor, fillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyCircle extends Phaser.GameObjects.Arc {
        constructor(scene, x, y, radius, fillColor, fillAlpha) {
            super(scene, x, y, radius, 0, 360, false, fillColor, fillAlpha);
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
    var circle = new MyCircle(scene, x, y, radius, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = circle.fillColor;
        var alpha = circle.fillAlpha;
        ```
    - Set
        ```javascript
        circle.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        circle.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var color = circle.strokeColor;
        ```
    - Set
        ```javascript
        circle.setStrokeStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        circle.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `circle.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = circle.alpha;
    ```
- Set
    ```javascript
    circle.setAlpha(alpha);
    // circle.alpha = alpha;
    ```

### Radius

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
        var iterations = circle.iterations;
        ```
    - Set
        ```javascript
        circle.iterations = iterations;
        ```

### Display size

- Get
    ```javascript
    var width = circle.displayWidth;
    var height = circle.displayHeight;
    ```
- Set
    ```javascript
    circle.setDisplaySize(width, height);
    ```
    or
    ```javascript
    circle.displayWidth = width;
    circle.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = circle.createGeometryMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
