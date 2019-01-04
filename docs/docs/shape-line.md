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

### Custom class

- Define class
    ```javascript
    class MyCurve extends Phaser.GameObjects.Line {
        constructor(scene, x, y, x1, y1, x2, y2, strokeColor) {
            super(scene, x, y, x1, y1, x2, y2, strokeColor);
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
    var line = new MyLine(scene, x, y, x1, y1, x2, y2, strokeColor);
    ```

### Set color

- Fill color
    - Get
        ```javascript
        var color = line.fillColor;
        ```
    - Set
        ```javascript
        line.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = line.strokeColor;
        ```
    - Set
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
