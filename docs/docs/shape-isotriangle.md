## Introduction

Iso-triangle shape, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Create shape

### Add shape object

```javascript
var isotriangle = scene.add.isotriangle(x, y, size, height, reversed, fillTop, fillLeft, fillRight);
```

### Set color

- Fill color
    ```javascript
    isotriangle.setFillStyle(fillTop, fillLeft, fillRight);
    ```
- Show face
    ```javascript
    isotriangle.setFaces(showTop, showLeft, showRight);
    ```
    - `showTop`, `showLeft`, `showRight`: Set `true` to show that face

!!! warning "No tint methods"
    Uses `isotriangle.setFillStyle(fillTop, fillLeft, fillRight)` to change color.

### Projection

- Get
   ```javascript
   var projection = isotriangle.projection;
   ```
- Set
   ```javascript
   isotriangle.setProjection(value)
   ```
   or
   ```javascript
   isotriangle.projection = value;
   ```

### Reverse

- Get
   ```javascript
   var isReversed = isotriangle.isReversed;
   ```
- Set
   ```javascript
   isotriangle.setReversed(reversed);
   ```
   or
   ```javascript
   isotrianhle.reversed = reversed;
   ```
   - Set `true` to render upside down.

### Other properties

See [game object](gameobject.md)
