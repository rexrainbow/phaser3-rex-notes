## Introduction

Iso-box shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var isobox = scene.add.isobox(x, y, size, height, fillTop, fillLeft, fillRight);
```

### Set color

- Fill color
    ```javascript
    isobox.setFillStyle(fillTop, fillLeft, fillRight);
    ```
- Show face
    ```javascript
    isobox.setFaces(showTop, showLeft, showRight);
    ```
    - `showTop`, `showLeft`, `showRight`: Set `true` to show that face

!!! warning "No tint methods"
    Uses `isobox.setFillStyle(fillTop, fillLeft, fillRight)` to change color.

### Projection

- Get
   ```javascript
   var projection = isobox.projection;
   ```
- Set
   ```javascript
   isobox.setProjection(value)
   ```
   or
   ```javascript
   isobox.projection = value;
   ```

### Other properties

See [game object](gameobject.md)
