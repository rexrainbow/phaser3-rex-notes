## Introduction

Image with 4 control points.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Quad image](https://codepen.io/rexrainbow/pen/xxLeyez)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/quad-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexQuadImage(x, y, texture, frame, config);
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
    var image = scene.add.rexQuadImage(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { QuadImage } from 'phaser3-rex-plugins/plugins/quadimage.js';
    ```
- Add image object
    ```javascript    
    var image = new QuadImage(scene, x, y, texture, frame, config);
    sscene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexQuadImage(x, y, texture, frame, {
    // hideCCW: true,
});
```

or 

```javascript
var image = scene.add.rexQuadImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,
    // hideCCW: true,
});
```

Add quadimage from JSON

```javascript
var quadimage = scene.make.rexQuadImage({
    x: 0,
    y: 0,
    
    key: null,
    frame: null,

    // hideCCW: false,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyQuadImage extends QuadImage {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
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
    var image = new MyQuadImage(scene, x, y, texture, frame, config);
    ```

### Control points

```javascript
var topLeftPoint = image.topLeft;
var topRightPoint = image.topRight;
var bottomLeftPoint = image.bottomLeft;
var bottomRightPoint = image.bottomRight;
```

### Position

- Get
    ```javascript
    var worldXY = controlPoint.getWorldXY();
    var x = worldXY.x;
    var y = worldXY.y;
    // More effective
    ```
    or
    ```javascript
    var x = controlPoint.x;
    var y = controlPoint.y;
    ```
- Set
    ```javascript
    controlPoint.setPosition(x, y);
    // controlPoint.setWorldXY(x, y);
    // More effective
    ```
    or
    ```javascript
    controlPoint.x = x;
    controlPoint.y = y;
    ```

### Other properties

See [Mesh](mesh.md) game object.