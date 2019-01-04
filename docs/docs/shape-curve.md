## Introduction

Curve shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var curve = scene.add.curve(x, y, path, fillColor);
// var curve = scene.add.curve(x, y, path, fillColor, fillAlpha);
```

- `path` : [Path object](path.md).

### Custom class

- Define class
    ```javascript
    class MyCurve extends Phaser.GameObjects.Curve {
        constructor(scene, x, y, path, fillColor, fillAlpha) {
            super(scene, x, y, path, fillColor, fillAlpha);
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
    var curve = new MyCurve(scene, x, y, path, fillColor, fillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = curve.fillColor;
        ```
    - Set
        ```javascript
        curve.setFillStyle(color, alpha);
        ```
- Stroke color
    - Get
        ```javascript
        var color = curve.strokeColor;
        ```
    - Set
        ```javascript
        curve.setStrokeStyle(lineWidth, color, alpha);
        ```

!!! warning "No tint methods"
    Uses `curve.setFillStyle(color, alpha)` to change color.

### Smoothness

The number of points used when rendering it. Increase this value for smoother curves, at the cost of more polygons being rendered.

```javascript
curve.setSmoothness(smoothness);
```
or
```javascript
curve.smoothness = smoothness;
```

### Other properties

See [game object](gameobject.md)
