## Introduction

Rectangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

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
        var alpha = rect.fillAlpha;
        ```
    - Set
        ```javascript
        rect.setFillStyle(color, alpha);        
        ```
    - Clear
        ```javascript
        rect.setFillStyle();
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
    - Clear
        ```javascript
        rect.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `rect.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = rect.alpha;
    ```
- Set
    ```javascript
    rect.setAlpha(alpha);
    // rect.alpha = alpha;
    ```

### Size

- Get
    ```javascript
    var width = rect.width;
    var height = rect.height;
    ```
- Set
    ```javascript
    rect.setSize(width, height);
    ```
    or
    ```javascript
    rect.width = width;
    rect.height = height;
    ```

### Display size

- Get
    ```javascript
    var width = rect.displayWidth;
    var height = rect.displayHeight;
    ```
- Set
    ```javascript
    rect.setDisplaySize(width, height);
    ```
    or
    ```javascript
    rect.displayWidth = width;
    rect.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
