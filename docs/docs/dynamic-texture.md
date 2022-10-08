## Introduction

Paste renderable game objects, or frames on a texture, built-in object of phaser.

- Author: Richard Davey

## Usage

### Create dynamic texture

- Create dynamic texture, added to texture manager
    ```javascript
    var texture = scene.textures.addDynamicTexture(key, width, height);
    ```
    - Use this texture in any texture-based game object
        ```javascript
        this.add.image(x, y, texture.key);
        ```
        or
        ```javascript
        this.add.image(x, y, texture);
        ```
- Create dynamic texture. (Not added to texture manager)
    ```javascript
    var texture = new Phaser.Textures.DynamicTexture(scene.sys.textures, null, width, height)    
    ```
    - Use this texture in any texture-based game object
        ```javascript
        this.add.image(x, y, texture);
        ```

### Paste texture

- Paste game object
    ```javascript
    texture.draw(gameObject, x, y);
    // texture.draw(gameObject, x, y, alpha, tint);
    ```
   - `gameObject` : a game object, or an array of game objects
- Paste game objects in a [group](group.md)
    ```javascript
    texture.draw(group, x, y);
    // texture.draw(group, x, y, alpha, tint);
    ```
- Paste game objects in a scene's display list
    ```javascript
    texture.draw(scene.children, x, y);
    // texture.draw(scene.children, x, y, alpha, tint);
    ```
- Paste texture/frame
    ```javascript
    texture.draw(key, x, y);
    // texture.draw(key, x, y, alpha, tint);
    ```
    or
    ```javascript
    texture.drawFrame(key, frame, x, y);
    // texture.drawFrame(key, frame, x, y, alpha, tint);
    ```
    or
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

        erase: false
    })
    ```
    - `key` : The key of the texture to be used, as stored in the Texture Manager.
- Paste texture/frame repeatly
    - Full size
        ```javascript
        texture.repeat(key, frame);
        ```
    - An area (x, y, width, height)
        ```javascript
        texture.repeat(key, frame, x, y, width, height, alpha, tint, skipBatch);
        ```

### Erase

```javascript
texture.erase(gameObject, x, y);
```

- `gameObject` : a game object, or an array of game objects

### Clear

```javascript
texture.clear();
```

### Fill

```javascript
texture.fill(rgb, alpha);
// texture.fill(rgb, alpha, x, y, width, height);
```

### Set size

```javascript
texture.setSize(width, height);
// texture.resize(width, height);
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

- Takes a snapshot of the whole of this Render Texture.
    ```javascript
    texture.snapshot(callback);
    // texture.snapshot(callback, type, encoderOptions);
    ```
- Takes a snapshot of the given area of this Render Texture.
    ```javascript
    texture.snapshotArea(x, y, width, height, callback);
    // texture.snapshotArea(x, y, width, height, callback, type, encoderOptions);
    ```
- Takes a snapshot of the given pixel from this Render Texture.
    ```javascript
    texture.snapshotPixel(x, y, callback);
    ```

### Batch draw

See also [Paste texture](dynamic-texture.md#paste-texture)

1. Start drawing
    ```javascript
    texture.beginDraw();
    ```
1. Drawing
    - Draw game objects
        ```javascript
        texture.batchDraw(gameObject, x, y, alpha, tint);
        ```
        - `gameObject` : Any renderable Game Object, or Group, Container, Display List, other Render Texture, Texture Frame or an array of any of these.
    - Draw frame
        ```javascript
        texture.batchDrawFrame(key, frame, x, y, alpha, tint);
        ```
    - Repeat frame
        ```javascript
        texture.repeat(key, frame, x, y, width, height, alpha, tint, true);
        ```
1. End drawing
    ```javascript
    texture.endDraw();
    ```