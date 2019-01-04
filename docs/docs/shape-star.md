## Introduction

Star shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var star = scene.add.star(x, y, points, innerRadius, outerRadius, fillColor);
// var star = scene.add.star(x, y, points, innerRadius, outerRadius, fillColor, fillAlpha);
```

- `points` : The number of points on the star. Default is 5.
- `innerRadius` : The inner radius of the star. Default is 32.
- `outerRadius` : The outer radius of the star. Default is 64.

### Custom class

- Define class
    ```javascript
    class MyStar extends Phaser.GameObjects.Star {
        constructor(scene, x, y, points, innerRadius, outerRadius, fillColor) {
            super(scene, x, y, points, innerRadius, outerRadius, fillColor);
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
    var star = new MyStar(scene, x, y, points, innerRadius, outerRadius, fillColor);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = star.fillColor;
        ```
    - Set
        ```javascript
        star.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = star.strokeColor;
        ```
    - Set
        ```javascript
        star.setStrokeStyle(lineWidth, color, alpha);
        ```

!!! warning "No tint methods"
    Uses `star.setFillStyle(color, alpha)` to change color.

### Properties

- Inner radius
    - Get
        ```javascript
        var innerRadius = star.innerRadius;
        ```
    - Set
        ```javascript
        star.setInnerRadius(innerRadius);
        ```
        or
        ```javascript
        star.innerRadius = innerRadius;
        ```
- Outer radius
    - Get
        ```javascript
        var outerRadius = star.outerRadius;
        ```
    - Set
        ```javascript
        star.setOuterRadius(outerRadius);
        ```
        or
        ```javascript
        star.outerRadius = outerRadius;
        ```
- Points
    - Get
        ```javascript
        var points = star.points;
        ```
    - Set
        ```javascript
        star.setPoints(points);
        ```
        or
        ```javascript
        star.points = points;
        ```

### Other properties

See [game object](gameobject.md)
