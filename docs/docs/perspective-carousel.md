## Introduction

A [container](containerlite.md) with [cards](perspective-carousel.md).

- Author: Rex
- Game object

## Live demos

-

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-image)

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
    import Perspective from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add carousel object
    ```javascript    
    var carousel = new Perspective.PerspectiveCarousel(scene, config);
    sscene.add.existing(carousel);
    ```

### Create instance

```javascript
var carousel = scene.add.rexPerspectiveImage({
    x: 0, y: 0,

    faces: [],
    // face: 0,

    // width,
    // height,

    // faceWidth,
    // faceSpace: 0,

    // z: 1,
    // zEnd: 0
});
```

- `faces` : Array of [perspective-card](perspective-card.md), [perspective-rendertexture](perspective-rendertexture.md), [perspective-image](perspective-image.md), or `null`.
    - *Assume that all faces have the same size*
- `face` : Index or name of current face (face at angle `0`).
- `width`, `height` : Specific width and height of this card container.
    - `undefined` : Use width and height of first face.
- `faceWidth` : Width of face. 
    - `undefined` : Use width of face. Assume that all faces have the same size.
- `faceSpace` : Extra space of face width. Used when `faceWidth` is `undefined`.
- `z`, `zEnd` : Range of faces' z-index. Default value is `1`/`0`.

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexPerspectiveImage({
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

### Rotation

- Get rotation angle
    ```javascript
    var angleY = card.angleY; // Angle in degrees
    ```
    or
    ```javascript
    var rotationY = card.rotationY; // Angle in radians
    ```
- Set rotation angle
    ```javascript
    card.angleY = angleY; // Angle in degrees
    ```
    or
    ```javascript
    card.rotationY = rotationY; // Angle in radians
    ```
