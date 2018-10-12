## Introduction

Triangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var triangle = scene.add.triangle(x, y, x1, y1, x2, y2, x3, y3, fillColor);
// var triangle = scene.add.triangle(x, y, x1, y1, x2, y2, x3, y3, fillColor, fillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyTriangle extends Phaser.GameObjects.Triangle {
        constructor(scene, x, y, x1, y1, x2, y2, x3, y3, fillColor) {
            super(scene, x, y, x1, y1, x2, y2, x3, y3, fillColor);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var triangle = new MyTriangle(scene, x, y, x1, y1, x2, y2, x3, y3, fillColor);
    ```

### Set color

- Fill color
    ```javascript
    triangle.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    triangle.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `triangle.setFillStyle(color, alpha)` to change color.

### Set vertices

```javascript
triangle.setTo(x1, y1, x2, y2, x3, y3);
```

### Triangle width

```javascript
triangle.setLineWidth(startWidth, endWidth);
```

- `endWidth` : The end width of the triangle. Only used in WebGL.

### Other properties

See [game object](gameobject.md)
