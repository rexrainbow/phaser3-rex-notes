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
        // .filters.external.addMask(maskGameObject, invert, viewCamera, viewTransform, scaleFactor)
    ```
    ```javascript
    var maskObject = gameObject
        .filters.internal.addMask(maskGameObject, undefined, undefined, 'local', undefined)
        // .filters.internal.addMask(maskGameObject, invert, viewCamera, 'local', scaleFactor)
        // .filters.internal.addMask(maskGameObject, invert, viewCamera, viewTransform, scaleFactor)
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

####  `scaleFactor` and `viewTransform`

When `scaleFactor` is not `1`, the mask texture size is changed, but the mask
game object's capture transform is not adjusted automatically. In this case,
do not pass `'local'` or `'world'` directly as `viewTransform`; create a
`TransformMatrix` that applies the matching scale, as shown below.

```javascript
import { GameObjects as PhaserGameObjects } from 'phaser';
const TransformMatrix = PhaserGameObjects.Components.TransformMatrix;

var GetMaskFilterViewTransformByScaleFactor = function (maskGameObject, scaleFactor, maskType, viewTransform) {
    // maskType: 'local' or 'world'
    if (scaleFactor === 1) {
        return maskType;
    }

    if (viewTransform === undefined) {
        viewTransform = new TransformMatrix();
    }

    var scale = 1 / scaleFactor;
    viewTransform.applyITRS(0, 0, 0, scale, scale);

    if ((maskType === 'world') && maskGameObject.parentContainer) {
        viewTransform.multiply(
            maskGameObject.parentContainer.getWorldTransformMatrix(ParentTransform),
            viewTransform
        );
    }

    return viewTransform;
}

const ParentTransform = new TransformMatrix();
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
