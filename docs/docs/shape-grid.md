## Introduction

Grid shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

```javascript
var grid = scene.add.grid(x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha);
```

### Custom class

- Define class
    ```javascript
    class MyGrid extends Phaser.GameObjects.Grid {
        constructor(scene, x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha) {
            super(scene, x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha);
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
    var grid = new MyGrid(scene, x, y, width, height, cellWidth, cellHeight, fillColor, fillAlpha, outlineFillColor, outlineFillAlpha);
    ```

### Color

- Fill color
    - Get
        ```javascript
        var color = grid.fillColor;
        var alpha = grid.fillAlpha;
        ```
    - Set
        ```javascript
        grid.setFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        grid.setFillStyle();
        ```
- Stroke color
    - Get
        ```javascript
        var color = grid.strokeColor;
        ```
    - Set
        ```javascript
        grid.setStrokeStyle(lineWidth, color, alpha);
        ```
    - Clear
        ```javascript
        grid.setStrokeStyle();
        ```
- Alternating color
    - Get
        ```javascript
        var color = grid.altFillColor;
        ```
    - Set
        ```javascript
        grid.setAltFillStyle(color, alpha);
        ```
    - Clear
        ```javascript
        grid.setAltFillStyle();
        ```
- Outline color
    - Get
        ```javascript
        var color = grid.outlineFillColor;
        ```
    - Set
        ```javascript
        grid.setOutlineStyle(color, alpha;
        ```
    - Clear
        ```javascript
        grid.setOutlineStyle();
        ```

!!! warning "No tint methods"
    Uses `grid.setFillStyle(color, alpha)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = grid.alpha;
    ```
- Set
    ```javascript
    grid.setAlpha(alpha);
    // grid.alpha = alpha;
    ```

### Display size

- Get
    ```javascript
    var width = grid.displayWidth;
    var height = grid.displayHeight;
    ```
- Set
    ```javascript
    grid.setDisplaySize(width, height);
    ```
    or
    ```javascript
    grid.displayWidth = width;
    grid.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
