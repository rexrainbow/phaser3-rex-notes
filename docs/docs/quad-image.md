## Introduction

Image with 4 or 9 vertex control points.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Quad image](https://codepen.io/rexrainbow/pen/xxLeyez)
- [Nine points](https://codepen.io/rexrainbow/pen/WNEBgvd)

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
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexQuadImage(x, y, texture, frame, {
    // ninePointMode: false,
});
```

or 

```javascript
var image = scene.add.rexQuadImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,
    // ninePointMode: false,
});
```

- `ninePointMode` :
    - `true` : Add 9 vertex control points.
    - `false` : Add 4 vertex control points. Default behavior.

Add quadimage from JSON

```javascript
var quadimage = scene.make.rexQuadImage({
    x: 0,
    y: 0,
    
    key: null,
    frame: null,

    // ninePointMode: false,

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

### Vertex control points

- Array of vertex control points
    ```javascript
    var controlPoints = image.controlPoints;
    ```
    - 4, or 9 vertex control points
- 4 vertex control points
    ```javascript
    var topLeftPoint = image.topLeft;         // image.controlPoints[0]
    var topRightPoint = image.topRight;       // image.controlPoints[1]
    var bottomLeftPoint = image.bottomLeft;   // image.controlPoints[2]
    var bottomRightPoint = image.bottomRight; // image.controlPoints[3]
    ```
- 9 vertex control points
    ```javascript
    var topLeft = image.topLeft;               // image.controlPoints[0]
    var topCenter = image.topCenter;           // image.controlPoints[1]
    var topRight = image.topRight;             // image.controlPoints[2]
    var centerLeft = image.centerLeft;         // image.controlPoints[3]
    var center = image.center;                 // image.controlPoints[4]
    var centerRight = image.centerRight;       // image.controlPoints[5]
    var bottomLeft = image.bottomLeft;         // image.controlPoints[6]
    var bottomCenter = image.bottomCenter;     // image.controlPoints[7]
    var bottomRight = image.bottomRight;       // image.controlPoints[8]
    ```

#### Position

- Get
    ```javascript
    var worldXY = controlPoint.getWorldXY();
    var x = worldXY.x;
    var y = worldXY.y;
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
    ```
    or
    ```javascript
    controlPoint.x = x;
    controlPoint.y = y;
    ```

### Tint color

- Get
   ```javascript
   var color = image.tint;
   ```
- Set
    ```javascript
    image.tint = color;
    ```
    or
    ```javascript
    image.setTint(color);
    ```

### Other properties

See [Mesh](mesh.md) game object.