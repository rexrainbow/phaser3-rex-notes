## Introduction

Paste game objects or textures on [dynaimc texture](dynamic-texture.md), built-in game object of phaser.

- Author: Phaser Team

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
rt.reSize(width, height);
```

!!! warning
    `rt.setSize(width, height)` won't change size of dynamic-texture.


### Fill color

```javascript
rt.fill(rgb);
// rt.fill(rgb, alpha, x, y, width, height);
```

- `rgb` : The number color to fill this Dynamic Texture with.
- `alpha` : The alpha value used by the fill. Default value is `1`.
- `x`, `y`, `width`, `height` : The area of the fill rectangle. Default behavior is filling whole size.


### Clear

Clears a portion or everything from this Render Texture by erasing it and 
resetting it back to a blank, transparent, texture.

```javascript
rt.clear();
```

```javascript
rt.clear(x, y, width, height);
```


### Draw game object

```javascript
rt.draw(entries).render();
// rt.draw(entries,x, y).render();
// rt.draw(entries, x, y, alpha, tint).render();
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


### Capture game object

```javascript
rt.capture(gameObject, {
    transform: 'world',
    // camera: undefined,
    // x: gameObject.x,
    // y: gameObject.y,
    // alpha: gameObject.alpha,
    // tint: gameObject.tint,
    // angle: gameObject.angle,
    // rotation: gameObject.rotation,
    // scale: 1,
    // scaleX: gameObject.scaleX,
    // scaleY: gameObject.scaleY,
    // originX: gameObject.originX,
    // originY: gameObject.originY,
    // blendMode: gameObject.blendMode
}).render();
```

- `gameObject` : Any renderable Game Object.
- `transform` : The transform to use after applying other config settings. Default value is `'world'`.
    - `'local'` : Use the game object's own transform directly.
    - `'world'` : Use `parentContainer` to compute world transform.
    - `TransformMatrix` : Use this matrix directly.
- `camera` : The camera to use when rendering the game object to the render texture. Default behavior is using render texture's internal camera.
- `x`, `y` : Override the game object's position for this capture only.
- `alpha`, `tint` : Override alpha/tint for this capture only.
- `angle`, `rotation` : Override rotation for this capture only.
    - If `angle` is non-zero, `rotation` is ignored.
- `scale`, `scaleX`, `scaleY` : Override scale for this capture only.
    - `scaleX`/`scaleY` will override `scale`.
- `originX`, `originY` : Override origin for this capture only.
- `blendMode` : Override blend mode for this capture only.

!!! note
    Capture temporarily overrides these properties when rendering, then restores the original values after rendering.

### Erase

```javascript
rt.erase(entries).render();
// rt.erase(entries, x, y).render();
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
}).render();
```

- `x`, `y` : Top-left position
- `originX`, `originY` : The horizontal/vertical origin of the stamp. Default value is `0.5`/`0.5`.

!!! note
    This method ignores the `camera` property of the Dynamic Texture.


### Draw repeat frames

- Repeat frames full of size
    ```javascript
    rt.repeat(key, frame).render();
    ```
- Repeat in an area
    ```javascript
    rt.repeat(key, frame, x, y, width, height).render();
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


### Save texture

Stores a copy of this Render Texture in the Texture Manager using the given key.

```javascript
rt.saveTexture(key);
```

Calling `saveTexture` again will not save another copy of the same texture, it will just rename the key of the existing copy.


### Other properties

See [game object](gameobject.md)


### Create mask

See [mask](mask.md)


### Shader effects

Support [internal and external filters](shader-builtin.md)
