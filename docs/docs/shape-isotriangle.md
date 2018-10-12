## Introduction

Iso-triangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var isoTriangle = scene.add.isotriangle(x, y, size, height, reversed, fillTop, fillLeft, fillRight);
```

### Custom class

- Define class
    ```javascript
    class MyIsoTriangle extends Phaser.GameObjects.IsoTriangle {
        constructor(scene, x, y, size, height, reversed, fillTop, fillLeft, fillRight) {
            super(scene, x, y, size, height, reversed, fillTop, fillLeft, fillRight);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var isoTriangle = new MyIsoTriangle(scene, x, y, size, height, reversed, fillTop, fillLeft, fillRight);
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
   isotrianhle.reversed = reversed;
   ```
   - Set `true` to render upside down.

### Other properties

See [game object](gameobject.md)
