## Introduction

Grid cut image texture to frames, then create image game objects from these frames.

- Author: Rex
- Methods

## Live demos

- [Cut image](https://codepen.io/rexrainbow/pen/YzapXLM)
- [Cut rendertexture](https://codepen.io/rexrainbow/pen/xxWEeNX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridcutimage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgridcutimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridcutimageplugin.min.js', true);
    ```
- Create images
    ```javascript
    var images = scene.plugins.get('rexgridcutimageplugin').gridCut(gameObjects, columns, rows, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GridCutImagePlugin from 'phaser3-rex-plugins/plugins/gridcutimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGridCutImage',
                plugin: GridCutImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Create images
    ```javascript
    var images = scene.plugins.get('rexGridCutImage').gridCut(gameObjects, columns, rows, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import GridCutImage from 'phaser3-rex-plugins/plugins/gridcutimage.js';
    ```
- Create images
    ```javascript
    var images = GridCutImage(gameObjects, columns, rows, config);
    ```

### Grid cut

```javascript
scene.plugins.get('rexGridCutImage').gridCut(gameObjects, columns, rows, {
    // onCreateImage: undefined,
    // ImageClass: Phaser.GameObjects.Image,

    // originX: 0.5,
    // originY: 0.5,
    // padding: 0,
    // add: true,
    // align: true,
    // objectPool: undefined
})
```

- `gameObjects` : Target game object which has a texture, ex [Image](image.md), [RenderTexture](rendertexture.md).
- `columns`, `rows` : Cut texture in `columns` x `rows` grids
- `onCreateImage` : Custom callback to return an image game object, optional.
    ```javascript
    function(scene, texture, frame) {
        return gameObject;
    }
    ``` 
    - `texture` : A texture object.
    - `frame` : Frame name.
- `ImageClass` : Create image game object from this class. Default value is built-in [Image](image.md) class. Used when `onCreateImage` is `undefined`.
- `originX`, `originY` : Origin of created image game objects
- `padding` : Extra padded space of cutting frame. Default is 0.
    - A number for left/right/top/bottom bounds,
    - Or a plain object.
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `add` : 
    - `true` : Add these created image game objects to scene. Default value.
    - `false` : Don't add created image game objects to scene.
- `align` :
    - `true` : Align position of created image game objects to target game object (`gameObjects`). Default value when `add` is set to `true`.
    - `false` : Don't set position of created image game objects. Default value when `add` is set to `false`.
- `objectPool` : An array of image game objects, will reuse image game objects from this pool. Optional.