## Introduction

A [container](containerlite.md) with [cards](perspective-carousel.md).

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Carousel](https://codepen.io/rexrainbow/pen/gOMggrj)
- [List](https://codepen.io/rexrainbow/pen/NWrppPK)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-carousel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add carousel object
    ```javascript
    var carousel = scene.add.rexPerspectiveCarousel(config);
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
- Add carousel object
    ```javascript
    var carousel = scene.add.rexPerspectiveCarousel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add carousel object
    ```javascript    
    var carousel = new PerspectiveCarousel(scene, config);
    scene.add.existing(carousel);
    ```

### Create instance

```javascript
var carousel = scene.add.rexPerspectiveCarousel({
    x: 0, y: 0,

    faces: [],
    // face: 0,
    // rtl: false,

    // width,
    // height,

    // faceWidth,
    // faceSpace: 0,

    // z: 1,
    // zEnd: 0,

    // roll : {
    //     duration: 1000,
    //     ease: 'Cubic',
    //     delay: 0,
    // }
});
```

- `faces` : Array of [perspective-card](perspective-card.md), [perspective-rendertexture](perspective-rendertexture.md), [perspective-image](perspective-image.md), or `null`.
    - *Assume that all faces have the same size*
- `face` : Index or name of current face (face at angle `0`).
- `rtl`
    - `false` : Place faces from left to right. Default behavior.
    - `true` : Place faces from right to left.
- `width`, `height` : Specific width and height of this carousel container.
    - `undefined` : Use width and height of first face.
- `faceWidth` : Width of face. 
    - `undefined` : Use width of face. Assume that all faces have the same size.
- `faceSpace` : Extra space of face width. Used when `faceWidth` is `undefined`.
- `z`, `zEnd` : Range of faces' z-index. Default value is `1`/`0`.
- `roll` : Configuration of rolling behavior.
    - `roll.duration` : Duration of rolling, in millisecond.
    - `roll.delay` : Initial delay.
    - `roll.ease` : Ease function. Default value is `'Cubic'`.
    - `false` : Don't add rolling behavior.

Add carousel from JSON

```javascript
var carousel = scene.make.rexPerspectiveCarousel({
    x: 0,
    y: 0,

    faces: [],

    // width,
    // height,

    // faceWidth,
    // faceSpace: 0,

    // z: 1,
    // zEnd: 0,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveCarousel extends PerspectiveCarousel {
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
    var carousel = new MyPerspectiveCarousel(scene, config);
    ```

### Face instances

```javascript
var faces = carousel.faces;
```

- `faces` : Array of face instances.

### Face

- Get
    ```javascript
    var face = carousel.face;
    ```
    - `face`: Index of `carousel.faces`.
- Set
    ```javascript
    carousel.setFace(face)
    ```
    - `face` : Index or name of current face (face at angle `0`).

### Roll behavior

#### Start rolling

- Roll to next face
    ```javascript
    carousel.roll.toNext(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to previous face
    ```javascript
    carousel.roll.toPrevious(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to right face
    ```javascript
    carousel.roll.toRight(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to left face
    ```javascript
    carousel.roll.toLeft(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to face
    ```javascript
    carousel.roll.to(faceIndex, duration);
    ```
    - `faceIndex` : 
        - A number : Index of face in `carousel.faces`
        - A string : Name of face  (`face.setName(name)`)
    - `duration` : Overwrite default duration value.

#### Stop flipping

```javascript
carousel.roll.stop();
```

#### Set duration

```javascript
carousel.roll.setDuration(duration);
// carousel.roll.duration = duration;
```

### Set ease

```javascript
carousel.roll.setEase(ease);
// carousel.roll.ease = ease;
```

#### Events

- On rolling complete
    ```javascript
    carousel.roll.on('complete', function(){
        // ...
    });
    ```

#### Status

- Is rolling
    ```javascript
    var isRunning = carousel.roll.isRunning;
    ```

### Rotation

- Get rotation angle
    ```javascript
    var angleY = carousel.angleY; // Angle in degrees
    ```
    or
    ```javascript
    var rotationY = carousel.rotationY; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    carousel.angleY = angleY; // Angle in degrees
    ```
    or
    ```javascript
    carousel.rotationY = rotationY; // Angle in radians
    ```

### Other properties

See [container](containerlite.md).