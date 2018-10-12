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
    }
    ```
- Create instance
    ```javascript
    var star = new MyStar(scene, x, y, points, innerRadius, outerRadius, fillColor);
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
