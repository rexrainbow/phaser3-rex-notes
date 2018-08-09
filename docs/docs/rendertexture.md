## Introduction

Paste textures, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add render texture object

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

    add: true
});
```

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
    }
    ```
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

### Clear

```javascript
rt.clear();
```

### Fill

```javascript
rt.fill(rgb, alpha);
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

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = rt.createBitmapMask();
```

See [mask](mask.md)