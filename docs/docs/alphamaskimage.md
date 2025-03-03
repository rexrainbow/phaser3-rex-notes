## Introduction

Load a texture, then apply an alpha mask from another texture. Extended from [canvas plugin](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Alpha-mask-image](https://codepen.io/rexrainbow/pen/poLrpER)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/alphamaskimage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexalphamaskimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexalphamaskimageplugin.min.js', true);
    ```
- Add alpha-mask-image object
    ```javascript
    var image = scene.add.rexAlphaMaskImage(x, y, key, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import AlphaMaskImagePlugin from 'phaser3-rex-plugins/plugins/alphamaskimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexAlphaMaskImagePlugin',
                plugin: AlphaMaskImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add alpha-mask-image object
    ```javascript
    var image = scene.add.rexAlphaMaskImage(x, y, key, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import AlphaMaskImage from 'phaser3-rex-plugins/plugins/alphamaskimage.js';
    ```
- Add alpha-mask-image object
    ```javascript    
    var image = new AlphaMaskImage(scene, x, y, key, frame, config);
    scene.add.existing(image);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexAlphaMaskImagePlugin',
            plugin: AlphaMaskImagePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var image = scene.add.rexAlphaMaskImage(x, y, key, frame, {
    mask: {
        key: textureKey,
        // frame: frameName,
        // invertAlpha: false,
        // scale: undefined,
    }
   
    // backgroundColor: undefined,
});
```

or 

```javascript
var image = scene.add.rexAlphaMaskImage(x, y, key, {
    mask: {
        key: textureKey,
        // frame: frameName,
        // invertAlpha: false,
        // scale: undefined,
    }
   
    // backgroundColor: undefined,
});
```

- `key`, `frame` : Texture key, frame name of target texture.
- `mask.key`, `mask.frame` : Texture key, frame name of the mask texture.
- `mask.invertAlpha` :
    - `false` : Mask non-alpha (alpha === 0) area. Default behavior.
    - `true` : Mask alpha (alpha > 0) area.
- `mask.scale` :
    - `undefined` : Expand mask texture size to fit target texture.
    - A number : Scale mask texture size.
- `backgroundColor` : Background color filled with masked area.
    - `undefiined` : No background color.


Add image from JSON

```javascript
var image = scene.make.rexAlphaMaskImage({
    x: 0,
    y: 0,
    key: key,
    frame: name,
    mask: {
        key: textureKey,
        // frame: frameName,
        // invertAlpha: false,
        // scale: undefined,
    }
   
    // backgroundColor: undefined,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyImage extends AlphaMaskImage {
        constructor(scene, x, y, key, frame, config) {
            super(scene, x, y, key, frame, config);
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
    var image = new MyImage(scene, key, frame, config);
    ```

### Set texture

```javascript
image.setTexture(key, frame);
// image.setTexture(key, frame, mask);
```

or

```javascript
image.setTexture(key, frame, {
    mask: {
        key: textureKey,
        // frame: frameName,
        // invertAlpha: false,
        // scale: undefined,
    }
   
    // backgroundColor: undefined,
});
```

- `mask.key`, `mask.frame` : Texture key, frame name of the mask texture.
- `mask.invertAlpha` :
    - `false` : Mask non-alpha (alpha === 0) area. Default behavior.
    - `true` : Mask alpha (alpha > 0) area.
- `mask.scale` :
    - `undefined` : Expand mask texture size to fit target texture.
    - A number : Scale mask texture size.
- `backgroundColor` : Background color filled with masked area.
    - `undefiined` : No background color.

### Other properties

See [game object](gameobject.md)

### Create mask

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
