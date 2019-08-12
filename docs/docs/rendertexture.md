## Introduction

Paste textures, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add render texture object

- Create an empty render texture object.
    ```javascript
    var rt = scene.add.renderTexture(x, y, width, height);
    ```
- Create render texture and load texture.
    ```javascript
    var rt = scene.add.renderTexture(x, y, undefined, undefined, key, frame);
    ```
    - `key` : The texture key to make the RenderTexture from.
    - `frame` : The frame to make the RenderTexture from.

Add render texture from JSON

```javascript
var rt = scene.make.renderTexture({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    // key: undefined,
    // frame: undefined,

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // scale : {
    //    x: 1,
    //    y: 1
    //},

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

### Paste texture

- Paste game object
    ```javascript
    rt.draw(gameObject, x, y);
    // rt.draw(gameObject, x, y, alpha, tint);
    ```
   - `gameObject` : a game object, or an array of game objects
- Paste game objects in a [group](group.md)
    ```javascript
    rt.draw(group, x, y);
    // rt.draw(group, x, y, alpha, tint);
    ```
- Paste game objects in a scene
    ```javascript
    rt.draw(scene.children, x, y);
    // rt.draw(scene.children, x, y, alpha, tint);
    ```
- Paste texture
    ```javascript
    rt.draw(key, x, y);
    // rt.draw(key, x, y, alpha, tint);
    ```
    or
    ```javascript
    rt.drawFrame(key, frame, x, y);
    // rt.drawFrame(key, frame, x, y, alpha, tint);
    ```
    - `key` : The key of the texture to be used, as stored in the Texture Manager.

#### Global alpha

```javascript
rt.setGlobalAlpha(alpha);
// rt.globalAlpha = alpha;
```

#### Global tint

```javascript
rt.setGlobalTint(tint);
// rt.globalTint = tint;
```

### Erase

```javascript
rt.erase(gameObject, x, y);
```

- `gameObject` : a game object, or an array of game objects

### Clear

```javascript
rt.clear();
```

### Fill

```javascript
rt.fill(rgb, alpha);
// rt.fill(rgb, alpha, x, y, width, height);
```

### Set size

```javascript
rt.setSize(width, height);
// rt.resize(width, height);
```

### Save texture

Stores a copy of this Render Texture in the Texture Manager using the given key.

```javascript
rt.saveTexture(key);
```

Calling `saveTexture` again will not save another copy of the same texture, it will just rename the key of the existing copy.

### Internal camera

Internal camera `rt.camera`

- Scroll (offset)
    ```javascript
    rt.camera.setPosition(x, y);
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

- Takes a snapshot of the whole of this Render Texture.
    ```javascript
    rt.snapshot(callback);
    // rt.snapshot(callback, type, encoderOptions);
    ```
- Takes a snapshot of the given area of this Render Texture.
    ```javascript
    rt.snapshotArea(x, y, width, height, callback);
    // rt.snapshotArea(x, y, width, height, callback, type, encoderOptions);
    ```
- Takes a snapshot of the given pixel from this Render Texture.
    ```javascript
    rt.snapshotPixel(x, y, callback);
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = rt.createBitmapMask();
```

See [mask](mask.md)