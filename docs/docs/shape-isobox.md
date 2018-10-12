## Introduction

Iso-box shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var isoBox = scene.add.isobox(x, y, size, height, fillTop, fillLeft, fillRight);
```

### Custom class

- Define class
    ```javascript
    class MyIsoBox extends Phaser.GameObjects.IsoBox {
        constructor(scene, x, y, size, height, fillTop, fillLeft, fillRight) {
            super(scene, x, y, size, height, fillTop, fillLeft, fillRight);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var isoBox = new MyIsoBox(scene, x, y, size, height, fillTop, fillLeft, fillRight);
    ```

### Set color

- Fill color
    ```javascript
    isoBox.setFillStyle(fillTop, fillLeft, fillRight);
    ```
- Show face
    ```javascript
    isoBox.setFaces(showTop, showLeft, showRight);
    ```
    - `showTop`, `showLeft`, `showRight`: Set `true` to show that face

!!! warning "No tint methods"
    Uses `isoBox.setFillStyle(fillTop, fillLeft, fillRight)` to change color.

### Projection

- Get
   ```javascript
   var projection = isoBox.projection;
   ```
- Set
   ```javascript
   isoBox.setProjection(value)
   ```
   or
   ```javascript
   isoBox.projection = value;
   ```

### Other properties

See [game object](gameobject.md)
