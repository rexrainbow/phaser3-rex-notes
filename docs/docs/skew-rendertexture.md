## Introduction

Skewable render texture.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

## Usage

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);
    ```
- Add render texture object
    ```javascript
    var image = scene.add.rexSkewRenderTexture(x, y, width, height);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import QuadImagePlugin from 'phaser4-rex-plugins/plugins/quadimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexQuadImagePlugin',
                plugin: QuadImagePlugin,
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
    var image = scene.add.rexSkewRenderTexturege(x, y, width, height);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Import class
    ```javascript
    import { SkewRenderTexture } from 'phaser4-rex-plugins/plugins/quadimage.js';
    ```
- Add render texture object
    ```javascript
    var image = new SkewRenderTexture(scene, x, y, width, height);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexSkewRenderTexturege(x, y, width, height);
```

or

```javascript
var image = scene.add.rexSkewRenderTexturege({
    // x: 0,
    // y: 0,
    // width: 32,
    // height: 32,
});
```

Add prespective render texture from JSON

```javascript
var image = scene.make.rexSkewRenderTexturege({
    x: 0,
    y: 0,    
    width: 32,
    height: 32,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MySkewRenderTexturege extends SkewRenderTexturege {
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
    var image = new MySkewRenderTexturege(scene, x, y, width, height);
    ```

### Internal render texture

```javascript
var rt = image.rt;
```

- `rt` : [Render texture](rendertexture.md)

#### Paste texture

- Paste game object
    ```javascript
    image.rt.draw(gameObject, x, y).render();
    // image.rt.draw(gameObject, x, y, alpha, tint).render();
    ```
   - `gameObject` : a game object, or an array of game objects
- Paste game objects in a [group](group.md)
    ```javascript
    image.rt.draw(group, x, y).render();
    // image.rt.draw(group, x, y, alpha, tint).render();
    ```
- Paste game objects in a scene
    ```javascript
    image.rt.draw(scene.children, x, y).render();
    // image.rt.draw(scene.children, x, y, alpha, tint).render();
    ```
- Paste texture
    ```javascript
    image.rt.draw(key, x, y).render();
    // image.rt.draw(key, x, y, alpha, tint).render();
    ```
    or
    ```javascript
    image.rt.drawFrame(key, frame, x, y).render();
    // image.rt.drawFrame(key, frame, x, y, alpha, tint).render();
    ```
    - `key` : The key of the texture to be used, as stored in the Texture Manager.

#### Erase

```javascript
image.rt.erase(gameObject, x, y).render();
```

- `gameObject` : a game object, or an array of game objects

#### Clear

```javascript
image.rt.clear().render();
```

#### Fill

```javascript
image.rt.fill(rgb, alpha).render();
// image.rt.fill(rgb, alpha, x, y, width, height).render();
```

### Other properties

See [Skew image game object](skew-image.md), [Mesh2D game object](mesh2d.md), [game object](gameobject.md)

### Create mask

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
