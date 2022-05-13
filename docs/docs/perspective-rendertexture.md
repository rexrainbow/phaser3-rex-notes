## Introduction

Render texture with perspective rotation.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [RenderTexture](https://codepen.io/rexrainbow/pen/ExvzZBJ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-render-texture)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add render texture object
    ```javascript
    var image = scene.add.rexPerspectiveRenderTexture(x, y, width, height, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPerspectiveImagePlugin',
                plugin: PerspectiveImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add render texture object
    ```javascript
    var image = scene.add.rexPerspectiveRenderTexturege(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveRenderTexture } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add render texture object
    ```javascript
    var image = new PerspectiveRenderTexture(scene, x, y, width, height, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexPerspectiveRenderTexturege(x, y, width, height, {
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

or

```javascript
var image = scene.add.rexPerspectiveRenderTexturege({
    // x: 0,
    // y: 0,
    // width: 32,
    // height: 32,
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

Add prespective render texture from JSON

```javascript
var image = scene.make.rexPerspectiveRenderTexturege({
    x: 0,
    y: 0,    
    width: 32,
    height: 32,

    // hideCCW: false,
    // gridWidth: 32,
    // girdHeight: 32,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveRenderTexturege extends PerspectiveRenderTexturege {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var image = new MyPerspectiveRenderTexturege(scene, x, y, width, height, config);
    ```

### Internal render texture

```javascript
var rt = image.rt;
```

- `rt` : [Render texture](rendertexture.md)

#### Paste texture

- Paste game object
    ```javascript
    image.rt.draw(gameObject, x, y);
    // image.rt.draw(gameObject, x, y, alpha, tint);
    ```
   - `gameObject` : a game object, or an array of game objects
- Paste game objects in a [group](group.md)
    ```javascript
    image.rt.draw(group, x, y);
    // image.rt.draw(group, x, y, alpha, tint);
    ```
- Paste game objects in a scene
    ```javascript
    image.rt.draw(scene.children, x, y);
    // image.rt.draw(scene.children, x, y, alpha, tint);
    ```
- Paste texture
    ```javascript
    image.rt.draw(key, x, y);
    // image.rt.draw(key, x, y, alpha, tint);
    ```
    or
    ```javascript
    image.rt.drawFrame(key, frame, x, y);
    // image.rt.drawFrame(key, frame, x, y, alpha, tint);
    ```
    - `key` : The key of the texture to be used, as stored in the Texture Manager.

#### Erase

```javascript
image.rt.erase(gameObject, x, y);
```

- `gameObject` : a game object, or an array of game objects

#### Clear

```javascript
image.rt.clear();
```

#### Fill

```javascript
image.rt.fill(rgb, alpha);
// image.rt.fill(rgb, alpha, x, y, width, height);
```

### Other properties

See [Perspective image](perspective-image.md) game object.