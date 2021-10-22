## Introduction

Line shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

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
        var alpha = line.fillAlpha;
        ```
    - Set
        ```javascript
        line.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        line.setFillStyle();
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
    - Clear
        ```javascript
        line.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `line.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = line.alpha;
    ```
- Set
    ```javascript
    line.setAlpha(alpha);
    // line.alpha = alpha;
    ```

### Set end points

```javascript
line.setTo(x1, y1, x2, y2);
```

### Line width

```javascript
line.setLineWidth(startWidth, endWidth);
```

- `endWidth` : The end width of the line. Only used in WebGL.

### Display size

- Get
    ```javascript
    var width = line.displayWidth;
    var height = line.displayHeight;
    ```
- Set
    ```javascript
    line.setDisplaySize(width, height);
    ```
    or
    ```javascript
    line.displayWidth = width;
    line.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
