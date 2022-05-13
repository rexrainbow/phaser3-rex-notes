## Introduction

Image with perspective rotation.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Flip image](https://codepen.io/rexrainbow/pen/GRqpzEV?editors)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexPerspectiveImage(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPerspectiveImagePlugin',
                plugin: PerspectiveImagePlugin,
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
    var image = scene.add.rexPerspectiveImage(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveImage } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add image object
    ```javascript    
    var image = new PerspectiveImage(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexPerspectiveImage(x, y, texture, frame, {
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

or 

```javascript
var image = scene.add.rexPerspectiveImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,
    // hideCCW: true,
    // gridWidth: 32,
    // girdHeight: 32
});
```

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexPerspectiveImage({
    x: 0,
    y: 0,
    
    key: null,
    frame: null,

    // hideCCW: false,
    // gridWidth: 32,
    // girdHeight: 32,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveImage extends PerspectiveImage {
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
    var image = new MyPerspectiveImage(scene, x, y, texture, frame, config);
    ```

### Transform vertices

Offset then rotate all vertices.

```javascript
image.transformVerts(x, y, z, rotateX, rotateY, rotateZ);
```

- `x`, `y`, `z` : Offset vertices
    - `z+` : Near
    - `z-` : Far
    - `x-` : Left
    - `x+` : Right
    - `y+` : Up
    - `y-` : Down
- `rotateX`, `rotateY`, `rotateZ` : Rotate vertices

### Rotation

- Get rotation angle
    ```javascript
    var angleX = image.angleX; // Angle in degrees
    var angleY = image.angleY; // Angle in degrees
    var angleZ = image.angleZ; // Angle in degrees
    ```
    or
    ```javascript
    var rotationX = image.rotationX; // Angle in radians
    var rotationY = image.rotationY; // Angle in radians
    var rotationZ = image.rotationZ; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    image.angleX = angleX; // Angle in degrees
    image.angleY = angleY; // Angle in degrees
    image.angleZ = angleZ; // Angle in degrees
    ```
    or
    ```javascript
    image.rotationX = rotationX; // Angle in radians
    image.rotationY = rotationY; // Angle in radians
    image.rotationZ = rotationZ; // Angle in radians
    ```

#### Flip

```javascript
scene.tweens.add({
    targets: image,
    angleY: { start: 0, to: -180}
})
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

### Change frame

Frame is bound with vertices. Use [perspective renderTexture](perspective-rendertexture.md) to change frame without recreate vertices again (assume that size of frame won't changed).

```javascript
rt.drawFrame(key, frame);
```

### Other properties

See [Mesh](mesh.md) game object.