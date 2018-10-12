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
    }
    ```
- Create instance
    ```javascript
    var rect = new MyRectangle(scene, x, y, width, height, fillColor);
    ```

### Set color

- Fill color
    ```javascript
    rect.setFillStyle(color, alpha);
    ```
- Stroke color
    ```javascript
    rect.setStrokeStyle(lineWidth, color, alpha);
    ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
