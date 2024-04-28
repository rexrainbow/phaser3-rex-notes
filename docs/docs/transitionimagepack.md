## Introduction

Transit texture to another one, with some pre-build effects, extended from [TransitionImage](transitionimage.md)

- Author: Rex
- Game object

## Live demos

- [Effect list](https://codepen.io/rexrainbow/full/QWJvzeP)
- [Slide modes](https://codepen.io/rexrainbow/pen/gOQgdMz)
- [Fade modes](https://codepen.io/rexrainbow/pen/xxQqEgO)
- [Mask modes](https://codepen.io/rexrainbow/pen/KKrWbYP)
- [Shader effect modes](https://codepen.io/rexrainbow/pen/NWEjBJa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/transition-image-pack)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextransitionimagepackplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextransitionimagepackplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexTransitionImagePack(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TransitionImagePackPlugin from 'phaser3-rex-plugins/templates/transitionimagepack/transitionimagepack-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTransitionImagePackPlugin',
                plugin: TransitionImagePackPlugin,
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
    var image = scene.add.rexTransitionImagePack(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TransitionImagePack from 'phaser3-rex-plugins/templates/transitionimagepack/TransitionImagePack.js';
    ```
- Add image object
    ```javascript    
    var image = new TransitionImagePack(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexTransitionImagePack(x, y, texture, frame, {   
    // duration: 1000,
    // width: undefined, height: undefined,
});
```
or

```javascript
var image = scene.add.rexTransitionImagePack(x, y, texture, frame, {
    // x: 0,
    // y: 0,
    // key: 
    // frame: 
    // duration: 1000,
    // width: undefined, height: undefined,
});
```

- `duration` : Duration of transition.
- `width`, `height` : Scale images to fit this size (`width`x`height`).
    - `undefined` : Don't scale images.

Add transitionimage from JSON

```javascript
var image = scene.make.rexTransitionImagePack({
    x: 0,
    y: 0,
    key: null,
    frame: null,

    // duration: 1000,
    // width: undefined, height: undefined,

    // origin: {x: 0.5, y: 0.5},
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyTransitionImagePack extends TransitionImagePack {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
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
    var transitionimage = new MyTransitionImagePack(scene, x, y, texture, frame, config);
    ```

### Transit

```javascript
image
    // .setDuration(duration)
    // .setEaseFunction(ease)
    .transit(texture, frame, modeName)
```

or

```javascript
image.transit({
    key: undefined,
    // frame: undefined,
    // duration: 1000,
    // ease: 'Linear',
    mode: modeName
})
```

- `duration` : Override default `duration` setting.
- `ease` : Override default `ease` setting.
- `mode` : Pre-build effects
    - Fade effects : 
        - `'fade'` : Tint old image to black, then tint new image from black to origin color.
        - `'crossFade'` : Ease alpha of old image from 1 to 0, and ease alpha of new image from 0 to 1 at the same time.
    - Slide effects : `'slideLeft'`, `'slideRight'`, `'slideUp'`, `'slideDown'`, 
      `'slideAwayLeft'`, `'slideAwayRight'`, `'slideAwayUp'`, `'slideAwayDown'`, 
      `'pushLeft'`, `'pushRight'`, `'pushUp'`, `'pushDown'`.
    - Zoom(scale) effects : `'zoomOut'`, `'zoomIn'`, `'zoomInOut'`.
    - Mask effects : `'wipeLeft'`, `'wipeRight'`, `'wipeUp'`, `'wipeDown'`,
      `'irisOut'`, `'irisIn'`,  `'irisInOut'`, `'pieOut'`, `'pieIn'`, `'pieInOut'`, 
      `'blinds'`, `'squares'`, `'diamonds'`, `'circles'`, `'curtain'`.
    - Shader effects : `'pixellate'`, `'dissolve'`, 
      `'revealLeft'`, `'revealRight'`, `'revealUp'`, `'revealDown'`

#### Current texture

```javascript
var textureKey = image.texture.key;
var frameName = image.frame.name;
```

### Transition duration

- Set
    ```javascript
    image.setDuration(duration);
    ```
- Get
    ```javascript
    var duration = image.duration;
    ```

### Ease function

- Set
    ```javascript
    image.setEaseFunction(ease);
    ```
    - `ease` : [Ease function](tween.md#ease-equations) of transition-progress.
- Get
    ```javascript
    var ease = image.easeFunction;
    ```

### Pause/Resume

```javascript
image.pause();
```

```javascript
image.resume();
```

### Stop

```javascript
image.stop();
```

Also will fire `'complete'` event.

### Events

- On complete
   ```javascript
   image.on('complete', function(){
   })
   ```

### Flip

- Flip
    ```javascript
    image.flipX(value);
    image.flipY(value);
    image.flip(x, y);
    ```
- Toggle
    ```javascript
    image.toggleFlipX();
    image.toggleFlipY();
    ```

### Other properties

See [transition image object](transitionimage.md), [game object](gameobject.md)
