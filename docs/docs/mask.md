## Introduction

Apply mask on game object. Built-in render of phaser.

- Author: Phaser Team

## Usage

### Add mask

#### Create mask object

##### Bitmap mask

1. Create image ([image](image.md), [sprite](sprite.md), [bitmap text](bitmaptext.md), [particles](particles.md), [text](text.md)),or [shader](shader.md)
    ```javascript
    var shape = scene.add.image(x, y, key).setVisible(false);
    ```
1. Create mask
    ```javascript
    var mask = shape.createBitmapMask();
    ```
    or
    ```javascript
    var mask = scene.add.bitmapMask(shape);
    ```

or

```javascript
var mask =  scene.add.bitmapMask(undefined, x, y, key, frame);
```

##### Geometry mask

The mask is essentially a clipping path which can only make a masked pixel 
fully visible or fully invisible without changing its alpha (opacity).

1. Create [graphics](graphics.md)
    ```javascript
    var shape = scene.make.graphics();
    ```
1. Create mask
    ```javascript
    var mask = shape.createGeometryMask();
    ```

#### Apply mask object

```javascript
gameObject.setMask(mask); // image.mask = mask;
```
    
A mask object could be added to many game objects.


!!! error
    Don't put game object and its mask into a [container](container.md) together.
    See this [testing](https://codepen.io/rexrainbow/pen/mdBZJmb), enable line 22-24.

!!! note
    Bitmap Mask is WebGL only.

!!! note
    Can combine Geometry Masks and Blend Modes on the same Game Object, 
    but Bitmap Masks can't.


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

### Get shape game object

- Bitmap mask
    ```javascript
    var shape = mask.bitmapMask;
    ```
- Geometry mask
    ```javascript
    var shape = mask.geometryMask;
    ```