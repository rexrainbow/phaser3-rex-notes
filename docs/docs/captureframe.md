## Introduction

Capture the current state of the render, stored as a texture.

- Author: Phaser Team

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Usage

### Add capture-frame object

- Setup
    - Capture rendering result in scene's display list
        ```javascript
        camera.setForceComposite(true);
        ```
        or
        ```javascript
        camera.filtersForceComposite = true;
        ```
    - Capture rendering result in [Layer](layer.md) or [Container](container.md)
        ```javascript
        layer.setForceComposite(true);
        ```
        or
        ```javascript
        layer.filtersForceComposite = true;
        ```
- Create a capture-frame object.
    ```javascript
    var captureFrame = scene.add.captureFrame(key);
    ```
    - `key` : Texture key.

Add render texture from JSON

```javascript
var captureFrame = scene.make.renderTexture({
    // key: null,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyCaptureFrame extends Phaser.GameObjects.CaptureFrame {
        constructor(scene, key) {
            super(scene, key);
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
    var captureFrame = new MyCaptureFrame(scene, key);
    ```

### Display texture

Display captured result by [Image game object](image.md)

```javascript
var image = scene.add.image(x, y, key);
```

!!! note
    Place a fully opaque image at the bottom.

### Snapshot

Snapshot captured result by [RenderTexture game object's snapshot method](rendertexture.md#snapshot)

```javascript
var rt = scene.add.rendertexture(0, 0, windowW, height)
    .draw(captureFrame).render().snapshot(callback);
```

### Other properties

See [game object](gameobject.md)
