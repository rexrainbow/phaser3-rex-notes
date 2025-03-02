## Introduction

Apply mask on game object.

- Author: Phaser Team

## Usage

### WEBGL render mode

1. Create mask game object, from graphics ([Graphics](graphics.md)), image ([image](image.md), [sprite](sprite.md), [bitmap text](bitmaptext.md), [particles](particles.md), [text](text.md)),or [shader](shader.md)
    ```javascript
    var maskGameObject = new Phaser.GameObjects.Graphics(scene); 
    ```
1. Create shared mask object
    ```javascript
    var maskObject = new Phaser.Filters.Mask(maskGameObject.scene.cameras.main, maskGameObject);
    maskObject.ignoreDestroy = true;
    ```
1. Apply shared mask object to game object
    ```javascript
    gameObject
        .enableFilters()
        .filters.external.add(maskObject)
    ```
1. clear mask object
    ```javascript
    gameObject.filters.external.remove(maskObject)
    ```

### CANVAS render mode

1. Create mask game object, from [Graphics](graphics.md) game object
    ```javascript
    var maskGameObject = new Phaser.GameObjects.Graphics(scene);
    ```
1. Create shared mask object
    ```javascript
    var maskObject = maskGameObject.createGeometryMask();
    ```
1. Apply shared mask object to game object
    ```javascript
    gameObject.setMask(maskObject);
    // gameObject.mask = maskObject;
    ```
1. clear mask object
    ```javascript
    gameObject.clearMask();
    // gameObject.mask = null;
    ```
