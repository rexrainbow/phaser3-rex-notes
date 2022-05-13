## Introduction

A [container](containerlite.md) with two [perspective-images](perspective-image.md).

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Flip card](https://codepen.io/rexrainbow/pen/pobEQLN)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-card)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add card object
    ```javascript
    var card = scene.add.rexPerspectiveCard(config);
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
- Add card object
    ```javascript
    var card = scene.add.rexPerspectiveCard(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveCard } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add card object
    ```javascript    
    var card = new PerspectiveCard(scene, config);
    scene.add.existing(card);
    ```

### Create instance

```javascript
var card = scene.add.rexPerspectiveImage({
    x: 0, y: 0,

    back: {key, frame},
    front: {key, frame},
    face: 0,

    orientation: 0,

    // width,
    // height,

    // flip : {
    //     frontToBack: 0,
    //     backToFront: 1,
    //     duration: 1000,
    //     ease: 'Cubic',
    //     delay: 0,
    // }
    // flip: false
});
```

- `front`, `back` : [Perspective image](perspective-image) game object for front and back face.
    - `{key, frame}` : Texture key and frame name, to create [perspective image](perspective-image)
    - `{width, height}` : Width and height, to create [perspective render texture](perspective-rendertexture.md).
    - [Perspective image](perspective-image)
    - [Perspective render texture](perspective-rendertexture.md).
- `face` : Show front or back face.
    - `'front'`, or `0` : Show front face.
    - `'back'`, or `1` : Show back face.
- `orientation` : Flipping orientation.
    - `'horizontal'`,`'h'`, `'x'`, or `0` : Flipping left-to-right, or right-to-left.
    - `'vertical'`,`'v'`, `'y'`, or `1` : Flipping top-to-bottom, or bottom-to-top.
- `width`, `height` : Specific width and height of this card container.
    - `undefined` : Use width and height of front and back face.
- `flip` : Configuration of flipping behavior.
    - `flip.frontToBack`, `flip.backToFront` : Flipping direction.
        - `'right'`, `'left-to-right'`, or `0` : Flipping from right to left.
        - `'left'`, `'right-to-left'`, or `1` : Flipping from left to right.
    - `flip.duration` : Duration of flipping, in millisecond.
    - `flip.delay` : Initial delay.
    - `flip.ease` : Ease function. Default value is `'Cubic'`.
    - `false` : Don't add flipping behavior.


Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexPerspectiveImage({
    x: 0,
    y: 0,

    front,
    back,
    face: 0,

    orientation: 0,

    width,
    height,

    flip,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveCard extends PerspectiveCard {
        constructor(scene, config) {
            super(scene, config);
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
    var card = new MyPerspectiveCard(scene, config);
    ```

### Face

- Get
    ```javascript
    var face = card.face;
    ```
    - `face`:
        - `0` : Show front face.
        - `1` : Show back face.
- Set
    ```javascript
    card.setFace(face)
    ```
    - `face`
        - `'front'`, or `0` : Show front face.
        - `'back'`, or `1` : Show back face.
- Toggle
    ```javascript
    card.toggleFace()
    ```

### Face instances

- Front face
    ```javascript
    var frontFace = card.frontFace;
    // var frontFace = card.faces.front;
    ```
- Back face
    ```javascript
    var backFace = card.backFace;
    // var backFace = card.faces.back;
    ```

### Flip behavior

#### Start flipping

```javascript
card.flip.flip(duration);
```

- `duration` : Overwrite default duration value.

or

- Flip-right
    ```javascript
    card.flip.flipRight(duration);
    ```
- Flip-left
    ```javascript
    card.flip.flipLeft(duration);
    ```

#### Stop flipping

```javascript
card.flip.stop();
```

#### Set duration

```javascript
card.flip.setDuration(duration);
// card.flip.duration = duration;
```

### Set ease

```javascript
card.flip.setEase(ease);
// card.flip.ease = ease;
```

#### Events

- On flipping complete
    ```javascript
    card.flip.on('complete', function(){
        // ...
    });
    ```

#### Status

- Is flipping
    ```javascript
    var isRunning = card.flip.isRunning;
    ```

### Rotation

- Get rotation angle
    ```javascript
    var angleX = card.angleX; // Angle in degrees
    var angleY = card.angleY; // Angle in degrees
    var angleZ = card.angleZ; // Angle in degrees
    ```
    or
    ```javascript
    var rotationX = card.rotationX; // Angle in radians
    var rotationY = card.rotationY; // Angle in radians
    var rotationZ = card.rotationZ; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    card.angleX = angleX; // Angle in degrees
    card.angleY = angleY; // Angle in degrees
    card.angleZ = angleZ; // Angle in degrees
    ```
    or
    ```javascript
    card.rotationX = rotationX; // Angle in radians
    card.rotationY = rotationY; // Angle in radians
    card.rotationZ = rotationZ; // Angle in radians
    ```

### Debug

1. Set debug [Graphics](graphics.md)
    ```javascript
    var debugGraphics = scene.add.graphics();
    card.setDebug(debugGraphics);
    ```
1. Update [Graphics](graphics.md) in `scene.update()` method.
    ```javascript
    debugGraphics.clear();
    debugGraphics.lineStyle(1, 0x00ff00);
    ```

### Other properties

See [container](containerlite.md).
