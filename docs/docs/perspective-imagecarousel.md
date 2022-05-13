## Introduction

Display list of images.

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [List](https://codepen.io/rexrainbow/pen/OJXEXyO)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/perspective-image-carousel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexperspectiveimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexperspectiveimageplugin.min.js', true);
    ```
- Add carousel object
    ```javascript
    var carousel = scene.add.rexPerspectiveImageCarousel(config);
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
    var carousel = scene.add.rexPerspectiveImageCarousel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { PerspectiveImageCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
    ```
- Add carousel object
    ```javascript    
    var carousel = new PerspectiveImageCarousel(scene, config);
    scene.add.existing(carousel);
    ```

### Create instance

```javascript
var carousel = scene.add.rexPerspectiveImageCarousel({
    x: 0, y: 0,

    images: [],  // Array of {key, frame}
    // index: 0,
    // rtl: false,
    // repeat: true,

    // width,
    // height,
    // faceCount: 4,

    // z: 1,
    // zEnd: 0,

    // roll : {
    //     duration: 1000,
    //     ease: 'Cubic',
    //     delay: 0,
    // }
});
```

- `images` : Array of textures `{key, frame}`
    - *Assume that all textures have the same size*
- `index` : Index of current image.
- `rtl`
    - `false` : Place images from left to right. Default behavior.
    - `true` : Place images from right to left.
- `repeat` : Set `true` to roll to first image from last, or last to first.
- `width`, `height` : Specific width and height of this carousel container.
    - `undefined` : Use width and height of first image.
- `faceCount` : Faces count of this carousel. A integer which `>=3`.
- `z`, `zEnd` : Range of faces' z-index. Default value is `1`/`0`.
- `roll` : Configuration of rolling behavior.
    - `roll.duration` : Duration of rolling, in millisecond.
    - `roll.delay` : Initial delay.
    - `roll.ease` : Ease function. Default value is `'Cubic'`.
    - `false` : Don't add rolling behavior.

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexPerspectiveImageCarousel({
    x: 0,
    y: 0,
    
    images: [],  // Array of {key, frame}
    // index: 0,
    // rtl: false,
    // repeat: true,

    // width,
    // height,
    // faceCount: 4,

    // z: 1,
    // zEnd: 0,

    // roll : {
    //     duration: 1000,
    //     ease: 'Cubic',
    //     delay: 0,
    // }

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyPerspectiveImageCarousel extends PerspectiveImageCarousel {
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
    var carousel = new MyPerspectiveImageCarousel(scene, config);
    ```

### Roll behavior

#### Start rolling

- Roll to next image
    ```javascript
    carousel.roll.toNext(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to previous image
    ```javascript
    carousel.roll.toPrevious(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to right image
    ```javascript
    carousel.roll.toRight(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to left image
    ```javascript
    carousel.roll.toLeft(duration);
    ```
    - `duration` : Overwrite default duration value.
- Roll to image
    ```javascript
    carousel.roll.to(faceIndex, duration);
    ```
    - `faceIndex` : 
        - A number : Index of image.
    - `duration` : Overwrite default duration value.

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
