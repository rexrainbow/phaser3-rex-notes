## Introduction

Rectangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var rect = scene.add.rectangle(x, y, width, height, fillColor);
// var rect = scene.add.rectangle(x, y, width, height, fillColor, fillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyRectangle extends Phaser.GameObjects.Rectangle {
        constructor(scene, x, y, width, height, fillColor) {
            super(scene, x, y, width, height, fillColor);
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
    var rect = new MyRectangle(scene, x, y, width, height, fillColor);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = rect.fillColor;
        ```
    - Set
        ```javascript
        rect.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = rect.strokeColor;
        ```
    - Set
        ```javascript
        rect.setStrokeStyle(lineWidth, color, alpha);
        ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
