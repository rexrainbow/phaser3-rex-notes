## Introduction

Transit texture to another one. A [containerLite game object](containerlite.md) with 2 [image](image.md) game objects.

- Author: Rex
- Game object

## Live demos

- [Cross-fade](https://codepen.io/rexrainbow/pen/XWRwQNm)
- [Scale](https://codepen.io/rexrainbow/pen/YzVoXBo)
- [Slide](https://codepen.io/rexrainbow/pen/GRmbEbE)
- [Split](https://codepen.io/rexrainbow/pen/OJmeqXX)

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
    sscene.add.existing(image);
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
});
```

- `dir` : Transition direction.
    - `0`, or `'out'` : Transit current texture out.
    - `1`, or `'in'` : Transit next texture in.
- `onStart`, `onStartScope` : Callback and scope of transition-start. See [Set transition callbacks](transitionimage.md#set-transition-callbacks)
- `onProgress`, `onProgressScope` : Callback and scope of transition-progress. See [Set transition callbacks](transitionimage.md#set-transition-callbacks)
- `onComplete`, `onCompleteScope` : Callback and scope of transition-complete. See [Set transition callbacks](transitionimage.md#set-transition-callbacks)
- `duration` : Duration of transition.
- `ease` : [Ease function](tween.md#ease-equations) of transition-progress.

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
    var transitionimage = new MyTransitionImage(scene, x, y, width, height);
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
    .transit(texture, frame)
```

or

```javascript
image.transit({
    // dir: 0,
    // onStart: function(parent, currentImage, nextImage, t) { },
    // onStartScope: undefined,
    // onProgress: function(parent, currentImage, nextImage, t) { },
    // onProgressScope: undefined,
    // onComplete: function(parent, currentImage, nextImage, t) { },
    // onCompleteScope: undefined,
    // duration: 1000,
    // ease: 'Linear',
})
```

Fire `'complete'` event when transition completed.

### Set transition callbacks

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
        - Set alpha of currentImage, or nextImage by `parent.setChildLocalAlpha(currentImage, alpha)`.
        - Set scale of currentImage, or nextImage by `parent.setChildLocalScale(currentImage, scale)`.
        - Set position of currentImage, or nextImage by `parent.setChildLocalScale(currentImage, x, y)`.
- Set transition-complete callback
    ```javascript
    image.setTransitionCompleteCallback(onComplete, onCompleteScope)
    ```
    - `onComplete`
        ```javascript
        function(parent, currentImage, nextImage, t) { }
        ```

### Set transition duration

```javascript
image.setDuration(duration);
```

### Set ease function

```javascript
image.setEaseFunction(ease);
```

- `ease` : [Ease function](tween.md#ease-equations) of transition-progress.

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