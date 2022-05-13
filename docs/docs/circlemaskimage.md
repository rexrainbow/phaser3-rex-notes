## Introduction

Load a texture, then apply a circle mask. Extended from [canvas plugin](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Circle-mask-image](https://codepen.io/rexrainbow/pen/XWrMKBY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/circlemaskimage)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcirclemaskimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcirclemaskimageplugin.min.js', true);
    ```
- Add circle-mask-image object
    ```javascript
    var image = scene.add.rexCircleMaskImage(x, y, key, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CircleMaskImagePlugin from 'phaser3-rex-plugins/plugins/circlemaskimage-plugin.js';
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
- Add circle-mask-image object
    ```javascript
    var image = scene.add.rexCircleMaskImage(x, y, key, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CircleMaskImage from 'phaser3-rex-plugins/plugins/circlemaskimage.js';
    ```
- Add circle-mask-image object
    ```javascript    
    var image = new CircleMaskImage(scene, x, y, key, frame, config);
    scene.add.existing(image);
    ```

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
var image = scene.add.rexCircleMaskImage(x, y, key, frame, {
    maskType: 0,
    // radius: undefined
});
```

or 

```javascript
var image = scene.add.rexCircleMaskImage(x, y, key, {
    maskType: 0,
    // radius: undefined
});
```

- `maskType` : Type of mask.
    - `null` : No mask.
    - `'circle'`, or `0` : Circle mask.
    - `'ellipse'`, or `1` : Ellipse mask.
    - `'roundRectangle'`, or `2` : Round rectangle mask.
- `radius` : Radius of round rectangle mask.
    - `0` : Disable round corner.
    - Number: 4 corners with the same radius.
    - JSON
        - 4 corners with the same radius X/Y
            ```javascript
            {
                x: radiusX,
                y: radiusY
            }
            ```
        - Eeach radius of corner
            ```javascript
            {
                tl: radius,
                tr: radius,
                bl: radius,
                br: radius
            }
            ```
            or
            ```javascript
            {
                tl: {x : radiusX, y: radiusY},
                tr: {x : radiusX, y: radiusY},
                bl: {x : radiusX, y: radiusY},
                br: {x : radiusX, y: radiusY},
            }
            ```


Add image from JSON

```javascript
var image = scene.make.rexCircleMaskImage({
    x: 0,
    y: 0,
    key: key,
    frame: name,
    maskType: 0,
    // radius: undefined
    // origin: {x: 0.5, y: 0.5},
    
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

or

```javascript
image.setTexture(key, frame, {
    maskType: 0,
    // radius: undefined
});
```

- `maskType` : Type of mask
    - `null` : No mask.
    - `0`, or `'circle'` : Circle mask. Default value.
    - `1`, or `'ellipse'` : Ellipse mask.
- `radius` : Radius of round rectangle mask.
    - `0` : Disable round corner.
    - Number: 4 corners with the same radius.
    - JSON
        - 4 corners with the same radius X/Y
            ```javascript
            {
                x: radiusX,
                y: radiusY
            }
            ```
        - Eeach radius of corner
            ```javascript
            {
                tl: radius,
                tr: radius,
                bl: radius,
                br: radius
            }
            ```
            or
            ```javascript
            {
                tl: {x : radiusX, y: radiusY},
                tr: {x : radiusX, y: radiusY},
                bl: {x : radiusX, y: radiusY},
                br: {x : radiusX, y: radiusY},
            }
            ```