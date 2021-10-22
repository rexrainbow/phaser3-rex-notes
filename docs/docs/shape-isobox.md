## Introduction

Iso-box shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape object

```javascript
var isoBox = scene.add.isobox(x, y, width, height, fillTop, fillLeft, fillRight);
```

### Custom class

- Define class
    ```javascript
    class MyIsoBox extends Phaser.GameObjects.IsoBox {
        constructor(scene, x, y, width, height, fillTop, fillLeft, fillRight) {
            super(scene, x, y, width, height, fillTop, fillLeft, fillRight);
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
    var isoBox = new MyIsoBox(scene, x, y, width, height, fillTop, fillLeft, fillRight);
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

### Alpha

- Get
    ```javascript
    var alpha = isoBox.alpha;
    ```
- Set
    ```javascript
    isoBox.setAlpha(alpha);
    // isoBox.alpha = alpha;
    ```

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

### Display size

- Get
    ```javascript
    var width = isoBox.displayWidth;
    var height = isoBox.displayHeight;
    ```
- Set
    ```javascript
    isoBox.setDisplaySize(width, height);
    ```
    or
    ```javascript
    isoBox.displayWidth = width;
    isoBox.displayHeight = height;
    ```

### Other properties

See [game object](gameobject.md)
