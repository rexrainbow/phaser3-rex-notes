## Introduction

Paste game objects or textures on [dynaimc texture](dynamic-texture.md), built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add render texture object

- Create an empty render texture object.
    ```javascript
    var rt = scene.add.renderTexture(x, y, width, height);
    ```

Add render texture from JSON

```javascript
var rt = scene.make.renderTexture({
    x: 0,
    y: 0,
    width: 32,
    height: 32,

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},

    add: true
});
```

!!! note "Origin position"
    Origin position of this render texture is `(0,0)` (top-left)


### Custom class

- Define class
    ```javascript
    class MyRenderTexture extends Phaser.GameObjects.RenderTexture {
        constructor(scene, x, y, width, height) {
            super(scene, x, y, width, height);
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
    var rt = new MyRenderTexture(scene, x, y, width, height);
    ```


### Set size

```javascript
rt.setSize(width, height);
```


### Fill color

```javascript
rt.fill(rgb);
// rt.fill(rgb, alpha, x, y, width, height);
```

- `rgb` : The number color to fill this Dynamic Texture with.
- `alpha` : The alpha value used by the fill. Default value is `1`.
- `x`, `y`, `width`, `height` : The area of the fill rectangle. Default behavior is filling whole size.


### Clear

```javascript
rt.clear();
```

```javascript
rt.clear(x, y, width, height);
```


### Draw game object

```javascript
rt.draw(entries);
// rt.draw(entries,x, y);
// rt.draw(entries, x, y, alpha, tint);
```

- `entries` : 
    - Any renderable Game Object, such as a Sprite, Text, Graphics or TileSprite.
    - Tilemap Layers.
    - A Group. The contents of which will be iterated and drawn in turn.
    - A Container. The contents of which will be iterated fully, and drawn in turn.
    - A Scene Display List. Pass in `Scene.children` to draw the whole list.
    - Another Dynamic Texture, or a Render Texture.
    - A Texture Frame instance.
    - A string. This is used to look-up the texture from the Texture Manager.
- `x`, `y` : The x/y position to draw the Frame at, or the offset applied to the object.
    - If the object is a Group, Container or Display List, the coordinates are *added* to the positions of the children.
    - For all other types of object, the coordinates are exact.
- `alpha`, `tint` : Only used by Texture Frames.
    - Game Objects use their own alpha and tint values when being drawn.


### Erase

```javascript
rt.erase(entries);
// rt.erase(entries, x, y);
```

- `entries` : 
    - Any renderable Game Object, such as a Sprite, Text, Graphics or TileSprite.
    - Tilemap Layers.
    - A Group. The contents of which will be iterated and drawn in turn.
    - A Container. The contents of which will be iterated fully, and drawn in turn.
    - A Scene Display List. Pass in `Scene.children` to draw the whole list.
    - Another Dynamic Texture, or a Render Texture.
    - A Texture Frame instance.
    - A string. This is used to look-up the texture from the Texture Manager.
- `x`, `y` : The x/y position to draw the Frame at, or the offset applied to the object.
    - If the object is a Group, Container or Display List, the coordinates are *added* to the positions of the children.
    - For all other types of object, the coordinates are exact.


### Draw frame

```javascript
rt.stamp(key, frame, x, y, {
    alpha: 1,
    tint: 0xffffff,
    angle: 0,
    rotation: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    originX: 0.5,
    originY: 0.5,
    blendMode: 0,
    erase: false,
    skipBatch: false
})
```

or

```javascript
rt.drawFrame(key, frame, x, y);
// rt.drawFrame(key, frame, x, y, alpha, tint);
```

- `x`, `y` : Top-left position


### Draw repeat frames

- Repeat frames full of size
    ```javascript
    rt.repeat(key, frame);
    ```
- Repeat in an area
    ```javascript
    rt.repeat(key, frame, x, y, width, height);
    // rt.repeat(key, frame, x, y, width, height, alpha, tint, skipBatch);
    ```


### Batch draw

1. Begin
    ```javascript
    rt.beginDraw();
    ```
2. Draw
    - Draw game object
        ```javascript
        rt.batchDraw(entries, x, y, alpha, tint);
        ```
        - `entries` : 
            - Any renderable Game Object, such as a Sprite, Text, Graphics or TileSprite.
            - Tilemap Layers.
            - A Group. The contents of which will be iterated and drawn in turn.
            - A Container. The contents of which will be iterated fully, and drawn in turn.
            - A Scene Display List. Pass in `Scene.children` to draw the whole list.
            - Another Dynamic Texture, or a Render Texture.
            - A Texture Frame instance.
            - A string. This is used to look-up the texture from the Texture Manager.
    - Draw frame
        ```javascript
        rt.batchDrawFrame(key, frame, x, y, alpha, tint);
        ```
    - Draw image
        ```javascript
        rt.stamp(key, frame, x, y, {
            // ...
            skipBatch: true
        })
        ```
    - Draw repeat images
        ```javascript
        rt.repeat(key, frame, x, y, width, height, alpha, tint, true);
        ```
3. End
    ```javascript
    rt.endDraw();
    ```


### Internal camera

Internal camera `rt.camera`

- Scroll (offset)
    ```javascript
    rt.camera.setScroll(x, y);
    ```
- Zoom (scale)
    ```javascript
    rt.camera.setZoom(zoom);
    ```
- Rotate
    ```javascript
    rt.camera.setAngle(angle);  // angle in degrees
    ```


### Snapshot

#### Snapshot area

```javascript
texture.snapshot(callback);
// texture.snapshot(callback, type, encoderOptions);
```

or

```javascript
texture.snapshotArea(x, y, width, height, callback, type, encoderOptions);
```

- `callback` : The Function to invoke after the snapshot image is created.
    ```javascript
    function(imageElement) {
    }
    ```
    - `imageElement` : HTMLImageElement.
- `type` : The format of the image to create, usually `'image/png'` or `'image/jpeg'`. Default value is `'image/png'`.
- `encoderOptions` : The image quality, between `0` and `1`. Used for image formats with lossy compression, such as `'image/jpeg'`. Default value is `0.92`.
- `x`, `y`, `width`, `height` : Snapshot area.


#### Get color of a pixel

```javascript
texture.snapshotPixel(x, y, callback);
```

- `x`, `y` : The x/y coordinate of the pixel to get.
- `callback` : The Function to invoke after the snapshot image is created.
    ```javascript
    function(color) {        
    }
    ```
    - `color` : [Color](color.md) object.


### Global alpha

```javascript
rt.setGlobalAlpha(alpha);
// rt.globalAlpha = alpha;
```


### Global tint

```javascript
rt.setGlobalTint(tint);
// rt.globalTint = tint;
```


### Save texture

Stores a copy of this Render Texture in the Texture Manager using the given key.

```javascript
rt.saveTexture(key);
```

Calling `saveTexture` again will not save another copy of the same texture, it will just rename the key of the existing copy.


### Other properties

See [game object](gameobject.md)


### Create mask

```javascript
var mask = rt.createBitmapMask();
```

See [mask](mask.md)


### Shader effects

Support [preFX and postFX effects](shader-builtin.md)
