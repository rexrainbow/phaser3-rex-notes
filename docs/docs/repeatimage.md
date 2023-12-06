## Introduction

Stamp image repeatly on [canvas](canvas.md), similar with [TileSprite](tilesprite.md).  
It has better rendering result when the texture size is not power of 2, in `WebGL` and `pixelArt` mode.

- Author: Rex
- Game object

## Live demos

- [PixelArt](https://codepen.io/rexrainbow/pen/zYeyMWV), compared with [TileSprite](https://codepen.io/rexrainbow/pen/OJdrXGZ)
- [Scroll](https://codepen.io/rexrainbow/pen/MWLZzGZ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/repeat-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexrepeatimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexrepeatimageplugin.min.js', true);
    ```
- Add repeat-image object
    ```javascript
    var image = scene.add.rexRepeatImage(x, y, width, height, key, frame);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RepeatImagePlugin from 'phaser3-rex-plugins/plugins/repeatimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexRepeatImagePlugin',
                plugin: RepeatImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add repeat-image object
    ```javascript
    var image = scene.add.rexRepeatImage(x, y, width, height, key, frame);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import RepeatImage from 'phaser3-rex-plugins/plugins/repeatimage.js';
    ```
- Add repeat-image object
    ```javascript    
    var image = new RepeatImage(scene, x, y, key, frame, config);
    scene.add.existing(image);
    ```

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRepeatImagePlugin',
            plugin: RepeatImagePlugin,
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
var image = scene.add.rexRepeatImage(x, y, width, height, key, frame);
```

Add image from JSON

```javascript
var image = scene.make.rexRepeatImage({
    x: 0,
    y: 0,
    width: 512,
    height: 512,
    key: '',
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyImage extends RepeatImage {
        constructor(scene, x, y, width, height, key, frame) {
            super(scene, x, y, width, height, key, frame);
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
    var image = new MyImage(scene, x, y, width, height, key, frame);
    ```

### Set texture

```javascript
image.setTexture(key, frame);
```

### Properties of tiles

- Position
    ```javascript
    image.setTilePosition(x, y);
    ```
    or
    ```javascript
    image.tilePositionX = x;
    image.tilePositionY = y;
    ```
- Scale
    ```javascript
    image.setTileScale(scaleX, scaleY);
    ```
    or
    ```javascript
    image.tileScaleX = scaleX;
    image.tileScaleY = scaleY;
    ```

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = image.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [preFX and postFX effects](shader-builtin.md)

### Compare with [TileSprite](tilesprite.md)

Using this RepeatImage when the texture size is not power of 2, in `WebGL` and `pixelArt` mode.  
Otherwise, using [tileSprite](tilesprite.md)