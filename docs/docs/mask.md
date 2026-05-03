## Introduction

Apply mask on game object or camera.

- Author: Phaser Team

## Usage

### WEBGL render mode

#### Private mask

1. Create mask game object, from graphics ([Graphics](graphics.md)), image ([image](image.md), [sprite](sprite.md), [bitmap text](bitmaptext.md), [particles](particles.md), [text](text.md)),or [shader](shader.md)
    ```javascript
    var maskGameObject = new Phaser.GameObjects.Graphics(scene); 
    ```
1. Enable filter list
    ```javascript
    gameObject.enableFilters();
    ```
1. Create mask object
    ```javascript
    var maskObject = gameObject
        .filters.external.addMask(maskGameObject)
        // .filters.external.addMask(maskGameObject, invert, viewCamera, 'world', scaleFactor)
    ```
    ```javascript
    var maskObject = gameObject
        .filters.internal.addMask(maskGameObject, undefined, undefined, 'local', undefined)
        // .filters.internal.addMask(maskGameObject, invert, viewCamera, 'local', scaleFactor)
    ```
1. clear mask object
    ```javascript
    gameObject.filters.external.remove(maskObject)
    ```
    ```javascript
    gameObject.filters.internal.remove(maskObject)
    ```

#### Shared mask

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
