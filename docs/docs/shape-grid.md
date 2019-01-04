## Introduction

Grid shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

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
        ```
    - Set
        ```javascript
        grid.setFillStyle(color, alpha);
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
- Alternating color
    - Get
        ```javascript
        var color = grid.altFillColor;
        ```
    - Set
        ```javascript
        grid.setAltFillStyle(color, alpha);
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

!!! warning "No tint methods"
    Uses `grid.setFillStyle(color, alpha)` to change color.

### Other properties

See [game object](gameobject.md)
