## Introduction

Transit texture to another one. A [containerLite game object](containerlite.md) with 2 [image game objects](image.md).

- Author: Rex
- Game object

## Live demos

- Ease property of current/next image
    - [Cross-fade](https://codepen.io/rexrainbow/pen/XWRwQNm)
    - [Scale](https://codepen.io/rexrainbow/pen/YzVoXBo)
    - [Slide](https://codepen.io/rexrainbow/pen/GRmbEbE)
- Apply shader effect to current/next image, then ease property this shader effect.
    - [Split](https://codepen.io/rexrainbow/pen/OJmeqXX)
    - [Dissolve](https://codepen.io/rexrainbow/pen/qBjObWp)
- Grid cut current/next image to cell images, then ease property of cell images
    - [Grid cut](https://codepen.io/rexrainbow/pen/RwVzXbK)
    - [3 columns](https://codepen.io/rexrainbow/pen/bGRwqdL)
- Morph custom mask game object
    - [Pie mask](https://codepen.io/rexrainbow/pen/OJgXMmw)
- [Transition modes](https://codepen.io/rexrainbow/pen/abQpjZr)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/transition-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextransitionimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextransitionimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexTransitionImage(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TransitionImagePlugin from 'phaser3-rex-plugins/plugins/transitionimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTransitionImagePlugin',
                plugin: TransitionImagePlugin,
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
    var image = scene.add.rexTransitionImage(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TransitionImage from 'phaser3-rex-plugins/plugins/transitionimage.js';
    ```
- Add image object
    ```javascript    
    var image = new TransitionImage(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexTransitionImage(x, y, texture, frame, {
    // dir: 0,
    // onStart: function(parent, currentImage, nextImage, t) { },
    // onStartScope: undefined,
    // onProgress: function(parent, currentImage, nextImage, t) { },
    // onProgressScope: undefined,
    // onComplete: function(parent, currentImage, nextImage, t) { },
    // onCompleteScope: undefined,    
    // duration: 1000,
    // ease: 'Linear',
    // mask: undefined,

    // width: undefined, height: undefined,
});
```
or

```javascript
var image = scene.add.rexTransitionImage(x, y, texture, frame, {
    // x: 0,
    // y: 0,
    // key: 
    // frame: 
    // dir: 0,
    // onStart: function(parent, currentImage, nextImage, t) { },
    // onStartScope: undefined,
    // onProgress: function(parent, currentImage, nextImage, t) { },
    // onProgressScope: undefined,
    // onComplete: function(parent, currentImage, nextImage, t) { },
    // onCompleteScope: undefined,    
    // duration: 1000,
    // ease: 'Linear',
    // mask: undefined,

    // width: undefined, height: undefined,
});
```

- `dir` : Transition direction.
    - `0`, or `'out'` : Transit current texture/[image](image.md) out.
    - `1`, or `'in'` : Transit next texture/[image](image.md) in.
- `onStart`, `onStartScope` : Callback and scope of transition-start. See [Set transition callbacks](transitionimage.md#transition-callbacks)
- `onProgress`, `onProgressScope` : Callback and scope of transition-progress. See [Set transition callbacks](transitionimage.md#transition-callbacks)
- `onComplete`, `onCompleteScope` : Callback and scope of transition-complete. See [Set transition callbacks](transitionimage.md#transition-callbacks)
- `duration` : Duration of transition.
- `ease` : [Ease function](tween.md#ease-equations) of transition-progress.
- `mask` : Mask game object.
    - `true` : Default graphics game object.
    - Any shape game object, or [custom shape](shape-custom-shapes.md), [custom progress](shape-custom-progress.md) game object.
- `width`, `height` : Scale images to fit this size (`width`x`height`).
    - `undefined` : Don't scale images.


If `onStart`, `onProgress` and `onComplete` are all `undefined`, it will use **cross-fade** as default transition callbacks.

Add transitionimage from JSON

```javascript
var image = scene.make.rexTransitionImage({
    x: 0,
    y: 0,
    key: null,
    frame: null,

    // dir: 0,
    // onStart: function(parent, currentImage, nextImage, t) { },
    // onStartScope: undefined,
    // onProgress: function(parent, currentImage, nextImage, t) { },
    // onProgressScope: undefined,
    // onComplete: function(parent, currentImage, nextImage, t) { },
    // onCompleteScope: undefined,
    // duration: 1000,
    // ease: 'Linear',
    // mask: undefined,

    // width: undefined, height: undefined,

    // origin: {x: 0.5, y: 0.5},
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyTransitionImage extends TransitionImage {
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
    var transitionimage = new MyTransitionImage(scene, x, y, texture, frame, config);
    ```

### Transit

```javascript
image
    // .setTransitionDirection(dir)
    // .setTransitionStartCallback(onStart, onStartScope)
    // .setTransitionProgressCallback(onProgress, onProgressScope)
    // .setTransitionCompleteCallback(onComplete, onCompleteScope)
    // .setDuration(duration)
    // .setEaseFunction(ease)
    // .setMaskEnable(enable)
    .transit(texture, frame)
```

or

```javascript
image.transit({
    key: undefined,
    // frame: undefined,
    // dir: 0,
    // onStart: function(parent, currentImage, nextImage, t) { },
    // onStartScope: undefined,
    // onProgress: function(parent, currentImage, nextImage, t) { },
    // onProgressScope: undefined,
    // onComplete: function(parent, currentImage, nextImage, t) { },
    // onCompleteScope: undefined,
    // duration: 1000,
    // ease: 'Linear',
    // mask: undefined,
})
```

- `mask` : Mask game object.
    - `true` : Default graphics game object. Also apply this mask to current and next textures/[images](image.md)
    - Any shape game object, or [custom shape](shape-custom-shapes.md), [custom progress](shape-custom-progress.md) game object.
        - Apply mask to current texture : 
            ```javascript
            image.setCurrentImageMaskEnable();
            // image.setCurrentImageMaskEnable(enable, invertAlpha);
            ```
        - Apply mask to next texture : 
            ```javascript
            image.setNextImageMaskEnable();
            // image.setNextImageMaskEnable(enable, invertAlpha);
            ```
        - Apply mask to both current and next trextures :
            ```javascript
            image.setMaskEnable();
            // image.setMaskEnable(enable, invertAlpha);
            ```

Fire `'complete'` event when transition completed.

#### Register transtion mode

- Register transtion mode
    ```javascript
    image.addTransitionMode(modeName, {
        // dir: 0,
        // onStart: function(parent, currentImage, nextImage, t) { },
        // onStartScope: undefined,
        // onProgress: function(parent, currentImage, nextImage, t) { },
        // onProgressScope: undefined,
        // onComplete: function(parent, currentImage, nextImage, t) { },
        // onCompleteScope: undefined,
        // duration: 1000,
        // ease: 'Linear',
        // mask: undefined,
    });
    ```
- Trnasit by transition mode
    ```javascript
    image.transit(texture, frame, modeName);
    // image.transit(texture, frame, modeNames);
    ```
    or
    ```javascript
    image.transit({
        key: undefined,
        // frame: undefined,

        mode: modeName, // or modeName
        // dir: 0,
        // onStart: function(parent, currentImage, nextImage, t) { },
        // onStartScope: undefined,
        // onProgress: function(parent, currentImage, nextImage, t) { },
        // onProgressScope: undefined,
        // onComplete: function(parent, currentImage, nextImage, t) { },
        // onCompleteScope: undefined,
        // duration: 1000,
        // ease: 'Linear',
        // mask: undefined,
    })
    ```
    - Can override configuration of transition mode
    - `modeName` : A string, or an array of string to pick a random mode.
- Current transition mode
    ```javascript
    var modeName = image.currentTransitionMode;
    ```

#### Current texture

```javascript
var textureKey = image.texture.key;
var frameName = image.frame.name;
```

### Transition callbacks

- Set transition direction
    ```javascript
    image.setTransitionDirection(dir);
    ```
    - `0`, or `'out'` : Transit current texture out.
    - `1`, or `'in'` : Transit next texture in.
- Set transition-start callback
    ```javascript
    image.setTransitionStartCallback(onStart, onStartScope)
    ```
    - `onStart`
        ```javascript
        function(parent, currentImage, nextImage, t) { }
        ```
        - `parent` : Transition image game object, extends from [ContainerLite](containerlite.md)
        - `currentImage` : [Image game object](image.md) to display current texture.
        - `nextImage` : [Image game object](image.md) to display next texture.
        - `t` : Progress percentage. It is `0` in this case.
- Set transition-progress callback
    ```javascript
    image.setTransitionProgressCallback(onProgress, onProgressScope)
    ```
    - `onProgress`
        ```javascript
        function(parent, currentImage, nextImage, t) { 
            // parent.setChildLocalAlpha(currentImage, 1 - t);
            // parent.setChildLocalScale(currentImage, 1 - t);
            // parent.setChildLocalPosition(currentImage, x, 0);
        }
        ```
        - `parent` : Transition image game object, extends from [ContainerLite](containerlite.md)
        - `currentImage` : [Image game object](image.md) to display current texture.
            - Set alpha of currentImage, or nextImage by `parent.setChildLocalAlpha(currentImage, alpha)`.
            - Set scale of currentImage, or nextImage by `parent.setChildLocalScale(currentImage, scale)`.
            - Set position of currentImage, or nextImage by `parent.setChildLocalScale(currentImage, x, y)`.        
        - `nextImage` : [Image game object](image.md) to display next texture.
        - `t` : Progress percentage. `0`~`1`.
- Set transition-complete callback
    ```javascript
    image.setTransitionCompleteCallback(onComplete, onCompleteScope)
    ```
    - `onComplete`
        ```javascript
        function(parent, currentImage, nextImage, t) { }
        ```
        - `parent` : Transition image game object, extends from [ContainerLite](containerlite.md)
        - `currentImage` : [Image game object](image.md) to display current texture.
        - `nextImage` : [Image game object](image.md) to display next texture.
        - `t` : Progress percentage. It is `1` in this case.

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

### Mask

- Apply mask to current texture : 
    ```javascript
    image.setCurrentImageMaskEnable();
    // image.setCurrentImageMaskEnable(enable, invertAlpha);
    ```
- Apply mask to next texture : 
    ```javascript
    image.setNextImageMaskEnable();
    // image.setNextImageMaskEnable(enable, invertAlpha);
    ```
- Apply mask to both current and next trextures :
    ```javascript
    image.setMaskEnable();
    // image.setMaskEnable(enable, invertAlpha);
    ```
- Assign default mask game object
    ```javascript
    image.setMaskGameObject(true);
    ```
- Assign custom mask game object
    ```javascript
    image.setMaskGameObject(maskGameObject);
    ```
    - `maskGameObject` : A [graphics game object](graphics.md), or any shape game objects, [custom-progress shape game object](shape-custom-progress.md)

### Grid cut

Grid cut texture to cells.

- Grid cut current texture :
    ```javascript
    var cellImageGameObjects = image.gridCutCurrentImage(columns, rows);
    ```
    - `cellImageGameObjects` : Array of cell game objects.
- Grid cut next texture :
    ```javascript
    var cellImageGameObjects = image.gridCutNextImage(columns, rows);
    ```
    - `cellImageGameObjects` : Array of cell game objects.
- Get cut cell image game objects, after cutting.
    ```javascript
    var cellImageGameObjects = image.getCellImages();
    ```
- Apply mask to cell images
    ```javascript
    image.setCellImagesMaskEnable();
    // image.setCellImagesMaskEnable(enable, invertAlpha);
    ```

Cut cell image game objects will be set to invisible after transition complete.

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

Apply `flipX`, `flipY` to both current and next trextures.

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

### Tint

Apply `tint` to both current and next trextures.

```javascript
image.setTint(value);
```

### Use cases

- Ease property of current/next image.
    - [Scale](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/scale.js)
    - [Slide](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/slide.js), apply mask to current/next image.
- Apply shader effect to current/next image, then ease property this shader effect.
    - [Dissolve](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/dissolve.js)
    - [Split](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/split.js)
- Grid cut current/next image to cell images, then ease property of cell images
    - [Grid cut](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/grid-cut.js)
    - [Three-columns](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/three-columns.js), apply mask to cell images.
- Morph custom mask game object
    - [Pie-mask](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/transition-image/pie-mask.js), mask current/next image by a [custom-progress game object](shape-custom-progress.md).


### Internal image game object

- Current, next image game object
    ```javascript
    var curentImageGO = image.currentImage;
    var nextImageGO = image.nextImage;
    ```
- Front, back image game object
    ```javascript
    var frontImageGO = image.frontImage;
    var backImageGO = image.backImage;
    ```

### Other properties

See [game object](gameobject.md)

### Shader effects

Internal image game objects (`image.currentImage`, `image.nextImage`) support [internal and external filters](shader-builtin.md)
