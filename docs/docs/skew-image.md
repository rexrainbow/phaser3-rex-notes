## Introduction

Skewable Image.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Skew image](https://codepen.io/rexrainbow/pen/YzejpBy)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/skew-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexSkewImage(x, y, texture, frame);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import QuadImagePlugin from 'phaser3-rex-plugins/plugins/quadimage-plugin.js';
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
- Add image object
    ```javascript
    var image = scene.add.rexSkewImage(x, y, texture, frame);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { SkewImage } from 'phaser3-rex-plugins/plugins/quadimage.js';
    ```
- Add image object
    ```javascript    
    var image = new SkewImage(scene, x, y, texture, frame);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexSkewImage(x, y, texture, frame);
```

or 

```javascript
var image = scene.add.rexSkewImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,
});
```

Add quadimage from JSON

```javascript
var quadimage = scene.make.rexSkewImage({
    x: 0,
    y: 0,
    
    key: null,
    frame: null,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MySkewImage extends SkewImage {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
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
    var image = new MySkewImage(scene, x, y, texture, frame);
    ```

### Skew

- Set
    ```javascript
    image.setSkewX(skewXRad);
    image.setSkewXDeg(skewXDeg);
    ```
    ```javascript
    image.setSkewY(skewXRad);
    image.setSkewYDeg(skewXDeg);
    ```
    ```javascript
    image.setSkew(skewXRad, skewYRad);
    image.setSkewDeg(skewXDeg, skewYDeg);
    ```
    ```javascript
    image.skewX = skewXRad;
    image.skewXDeg = skewXDeg;
    ```
    ```javascript
    image.skewY = skewYRad;
    image.skewYDeg = skewYDeg;
    ```
- Get
    ```javascript
    var skewXRad = image.skewX;
    var skewXDeg = image.skewXDeg;
    ```
    ```javascript
    var skewYRad = image.skewY;
    var skewYDeg = image.skewYDeg;
    ```

### Other properties

See [Mesh](mesh.md) game object.