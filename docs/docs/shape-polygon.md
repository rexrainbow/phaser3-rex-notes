## Introduction

Polygon shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

```javascript
var polygon = scene.add.polygon(x, y, points, fillColor);
// var polygon = scene.add.polygon(x, y, points, fillColor, fillAlpha);
```

- `points` : 
    - An array of number : `[x0, y0, x1, y1, ...]`
    - An array of points : `[{x:x0, y:y0}, {x:x1, y:y1}, ...]`
    - A string : `'x0 y0 x1 y1 ...'`

!!! note
    Shift given points to align position **(0, 0)**

### Custom class

- Define class
    ```javascript
    class MyPolygon extends Phaser.GameObjects.Polygon {
        constructor(scene, x, y, points, fillColor) {
            super(scene, x, y, points, fillColor);
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
    var polygon = new MyPolygon(scene, x, y, points, fillColor);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = polygon.fillColor;
        var alpha = polygon.fillAlpha;
        ```
    - Set
        ```javascript
        polygon.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        polygon.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var color = polygon.strokeColor;
        ```
    - Set
        ```javascript
        polygon.setStrokeStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        polygon.setStrokeStyle();
        ```

!!! warning "No tint methods"
    Uses `polygon.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = polygon.alpha;
    ```
- Set
    ```javascript
    polygon.setAlpha(alpha);
    // polygon.alpha = alpha;
    ```

### Smooth

Smooths the polygon over the number of iterations specified.

```javascript
polygon.smooth(iterations);
```

### Display size

- Get
    ```javascript
    var width = polygon.displayWidth;
    var height = polygon.displayHeight;
    ```
- Set
    ```javascript
    polygon.setDisplaySize(width, height);
    ```
    or
    ```javascript
    polygon.displayWidth = width;
    polygon.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
