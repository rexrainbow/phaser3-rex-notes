## Introduction

Apply mask on game object. Built-in render of phaser.

- Author: Richard Davey

## Usage

### Add mask

1. Create mask object
    - Create mask from texture
        1. Create image ([image](image.md), [sprite](sprite.md), [quad](quad.md), bitmap text, [particles](particles.md), [text](text.md))
            ```javascript
            var shape = scene.add.image(x, y, key).setVisible(false);
            ```
        1. Create mask
            ```javascript
            var mask = shape.createBitmapMask();
            ```
            or
            ```javascript
            var mask = new Phaser.Display.Masks.BitmapMask(scene, shape);
            ```
        WebGL only
    - Create mask from graphics
        1. Create graphics
            ```javascript
            var shape = scene.make.graphics();
            ```
        1. Create mask
            ```javascript
            var mask = shape.createGeometryMask();
            ```
            or
            ```javascript
            var mask = new Phaser.Display.Masks.GeometryMask(scene, shape);
            ```
1. Add mask object to image game object
    ```javascript
    // var image = scene.add.image(...);
    image.setMask(mask); // image.mask = mask;
    ```
    A mask object could be added to many game objects.

### Clear mask

- Clear mask
    ```javascript
    image.clearMask();
    ```
- Clear mask and destroy mask object
    ```javascript
    image.clearMask(true);
    ```

### Invert alpha

Only GeometryMask has `inverse alpha` feature.

- Inverse alpha
    ```javascript
    mask.setInvertAlpha();
    // mask.invertAlpha = true;
    ```
- Disable
    ```javascript
    mask.setInvertAlpha(false);
    // mask.invertAlpha = false;
    ```