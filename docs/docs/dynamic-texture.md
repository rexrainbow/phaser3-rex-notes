## Introduction

Canvas Dynamic Texture stored in [texture cache](textures.md), built-in object of phaser.

- Author: Richard Davey

## Usage

### Create dynamic texture

```javascript
var texture = scene.textures.addDynamicTexture(key, width, height);
```

Disable `texture.isSpriteTexture` if this texture is not a base texture for Sprite Game Objects.

```javascript
texture.setIsSpriteTexture(false);
// texture.isSpriteTexture = false;
```

### Set size

```javascript
texture.setSize(width, height);
```

### Fill color

```javascript
texture.fill(rgb);
// texture.fill(rgb, alpha, x, y, width, height);
```

- `rgb` : The number color to fill this Dynamic Texture with.
- `alpha` : The alpha value used by the fill. Default value is `1`.
- `x`, `y`, `width`, `height` : The area of the fill rectangle. Default behavior is filling whole size.

### Clear

```javascript
texture.clear();
```

```javascript
texture.clear(x, y, width, height);
```

### Draw game object

```javascript
texture.draw(entries);
// texture.draw(entries,x, y);
// texture.draw(entries, x, y, alpha, tint);
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
texture.erase(entries);
// texture.erase(entries, x, y);
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
texture.stamp(key, frame, x, y, {
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
texture.drawFrame(key, frame, x, y);
// texture.drawFrame(key, frame, x, y, alpha, tint);
```

- `x`, `y` : Top-left position


### Draw repeat frames

- Repeat frames full of size
    ```javascript
    texture.repeat(key, frame);
    ```
- Repeat in an area
    ```javascript
    texture.repeat(key, frame, x, y, width, height);
    // texture.repeat(key, frame, x, y, width, height, alpha, tint, skipBatch);
    ```

### Add frame

```javascript
texture.add(name, sourceIndex, x, y, width, height);
```

- `name` : The name of this Frame. The name is unique within the Texture.
- `sourceIndex` : The index of the TextureSource that this Frame is a part of.
- `x` : The x coordinate of the top-left of this Frame.
- `y` : The y coordinate of the top-left of this Frame.
- `width` : The width of this Frame.
- `height` : The height of this Frame.


### Batch draw

1. Begin
    ```javascript
    texture.beginDraw();
    ```
2. Draw
    - Draw game object
        ```javascript
        texture.batchDraw(entries, x, y, alpha, tint);
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
        texture.batchDrawFrame(key, frame, x, y, alpha, tint);
        ```
    - Draw image
        ```javascript
        texture.stamp(key, frame, x, y, {
            // ...
            skipBatch: true
        })
        ```
    - Draw repeat images
        ```javascript
        texture.repeat(key, frame, x, y, width, height, alpha, tint, true);
        ```
3. End
    ```javascript
    texture.endDraw();
    ```

### Internal camera

Internal camera `texture.camera`

- Scroll (offset)
    ```javascript
    texture.camera.setScroll(x, y);
    ```
- Zoom (scale)
    ```javascript
    texture.camera.setZoom(zoom);
    ```
- Rotate
    ```javascript
    texture.camera.setAngle(angle);  // angle in degrees
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