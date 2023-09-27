## Introduction

Keep aspect ratio of image game object when scale-down resizing. 
A [containerLite game object ](containerlite.md) with 1 [image game object](image.md).

- Author: Rex
- Game object

## Live demos

- [Resize](https://codepen.io/rexrainbow/pen/gOjQJOp)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/imagebox)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('reximageboxplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/reximageboxplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexImageBox(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ImageBoxPlugin from 'phaser3-rex-plugins/plugins/imagebox-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexImageBoxPlugin',
                plugin: ImageBoxPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexImageBox(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ImageBox from 'phaser3-rex-plugins/plugins/imagebox.js';
    ```
- Add image object
    ```javascript    
    var image = new ImageBox(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexImageBox(x, y, texture, frame, {
    // width: undefined,
    // height: undefined,

    // background: undefined,
    // image: undefined
});
```

- `width`, `height` : Resize this game object.
    - `undefined` : Use original size. Default behavior.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of imageBox.
- `image` : Custom image game object instance.
    - `undefined` : Use built-in image game object. Default behavior.

Add imagebox from JSON

```javascript
var image = scene.make.rexImageBox({
    x: 0,
    y: 0,
    key: null,
    frame: null,

    // width: undefined,
    // height: undefined,

    // background: undefined,
    // image: undefined

    // origin: {x: 0.5, y: 0.5},
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyImageBox extends ImageBox {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
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
    var image = new MyImageBox(scene, x, y, texture, frame, config);
    ```

### Resize

```javascript
image.resize(width, height);
```

!!! note
  - If new size is bigger than original size, uses original size. (i.e won't scale up)  
  - If new size is smaller than original size, scales down and keeps aspect ratio.

### Set texture

```javascript
image.setTexture(key, frame);
``` 

#### Current texture

```javascript
var textureKey = image.texture.key;
var frameName = image.frame.name;
```

### Clear texture

```javascript
image.setTexture();
```

Will set internal image game object to invisible.

### Scale image

```javascript
image.scaleImage();
```

`image.resize(width, height)`, or `image.setTexture(key, frame)` will invoke this method internally.

### Internal image game object

```javascript
var internalImageGO = image.image;
```

### Other properties

See [game object](gameobject.md)

### Create mask

Create mask from internal image game object (`image.image`).

```javascript
var mask = image.image.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Internal image game object (`image.image`) support [preFX and postFX effects](shader-builtin.md)
