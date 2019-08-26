## Introduction

Load a texture, then apply a circle mask. Extended from [canvas plugin](canvas.md).

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/circlemaskimage-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcirclemaskimageplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/circlemaskimage.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/circlemaskimage)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCircleMaskImagePlugin',
            plugin: CircleMaskImagePlugin,
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
var image = scene.add.rexCircleMaskImage(x, y, key, frame, config);
```

- `config` :
    - `maskType` : Type of mask.
        - `null` : No mask.
        - `0`, or `'circle'` : Circle mask.
        - `1`, or `'ellipse'` : Ellipse mask.


Add image from JSON

```javascript
var image = scene.make.rexCircleMaskImage({
    x: 0,
    y: 0,
    key: key,
    frame: name,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyImage extends CircleMaskImage {
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
// image.setTexture(key, frame, maskType);
```

- `maskType` : Type of mask
    - `null` : No mask.
    - `0`, or `'circle'` : Circle mask. Default value.
    - `1`, or `'ellipse'` : Ellipse mask.