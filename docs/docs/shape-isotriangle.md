## Introduction

Iso-triangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

```javascript
var isoTriangle = scene.add.isotriangle(x, y, width, height, reversed, fillTop, fillLeft, fillRight);
```

### Custom class

- Define class
    ```javascript
    class MyIsoTriangle extends Phaser.GameObjects.IsoTriangle {
        constructor(scene, x, y, width, height, reversed, fillTop, fillLeft, fillRight) {
            super(scene, x, y, width, height, reversed, fillTop, fillLeft, fillRight);
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
    var isoTriangle = new MyIsoTriangle(scene, x, y, width, height, reversed, fillTop, fillLeft, fillRight);
    ```

### Set color

- Fill color
    ```javascript
    isoTriangle.setFillStyle(fillTop, fillLeft, fillRight);
    ```
- Show face
    ```javascript
    isoTriangle.setFaces(showTop, showLeft, showRight);
    ```
    - `showTop`, `showLeft`, `showRight`: Set `true` to show that face

!!! warning "No tint methods"
    Uses `isoTriangle.setFillStyle(fillTop, fillLeft, fillRight)` to change color.

### Alpha

- Get
    ```javascript
    var alpha = isoTriangle.alpha;
    ```
- Set
    ```javascript
    isoTriangle.setAlpha(alpha);
    // isoTriangle.alpha = alpha;
    ```

### Projection

- Get
   ```javascript
   var projection = isoTriangle.projection;
   ```
- Set
   ```javascript
   isoTriangle.setProjection(value)
   ```
   or
   ```javascript
   isoTriangle.projection = value;
   ```

### Reverse

- Get
   ```javascript
   var isReversed = isoTriangle.isReversed;
   ```
- Set
   ```javascript
   isoTriangle.setReversed(reversed);
   ```
   or
   ```javascript
   isoTriangle.reversed = reversed;
   ```
   - Set `true` to render upside down.

### Display size

- Get
    ```javascript
    var width = isoTriangle.displayWidth;
    var height = isoTriangle.displayHeight;
    ```
- Set
    ```javascript
    isoTriangle.setDisplaySize(width, height);
    ```
    or
    ```javascript
    isoTriangle.displayWidth = width;
    isoTriangle.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
