## Introduction

Ellipse shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var ellipse = scene.add.ellipse(x, y, width, height, fillColor);
// var ellipse = scene.add.ellipse(x, y, width, height, fillColor, fillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyEllipse extends Phaser.GameObjects.Ellipse {
        constructor(scene, x, y, width, height, fillColor, fillAlpha) {
            super(scene, x, y, width, height, fillColor, fillAlpha);
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
    var ellipse = new MyEllipse(scene, x, y, width, height, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = ellipse.fillColor;
        ```
    - Set
        ```javascript
        ellipse.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = ellipse.strokeColor;
        ```
    - Set
        ```javascript
        ellipse.setStrokeStyle(lineWidth, color, alpha);
        ```

!!! warning "No tint methods"
    Uses `ellipse.setFillStyle(color, alpha)` to change color.

### Propertirs

- Size
    - Get
        ```javascript
        var width = ellipse.width;
        var height = ellipse.height;
        ```
    - Set
        ```javascript
        ellipse.setSize(width, height);
        ```
### Smoothness

The number of points used when rendering it. Increase this value for smoother curves, at the cost of more polygons being rendered.

```javascript
ellipse.setSmoothness(smoothness);
```
or
```javascript
ellipse.smoothness = smoothness;
```

### Other properties

See [game object](gameobject.md)
