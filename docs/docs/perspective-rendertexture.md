## Introduction

Render texture with perspective rotation.

- Author: Rex
- Game object

## Live demos

-

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add render texture object
    ```javascript
    var rt = scene.add.rexPerspectiveRenderTexturege(x, y, width, height, config);
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
    var rt = scene.add.rexPerspectiveRenderTexturege(x, y, width, height, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Perspective from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add render texture object
    ```javascript
    var rt = new Perspective.PerspectiveRenderTexturege(scene, x, y, width, height, config);
    sscene.add.existing(rt);
    ```

### Create instance

```javascript
var image = scene.add.rexPerspectiveRenderTexturege(x, y, width, height, {
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

Add prespective render texture from JSON

```javascript
var rt = scene.make.rexPerspectiveRenderTexturege({
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

### Other properties

See [Perspective image](perspective-image.md) game object.