## Introduction

Fade out game object then destroy it.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/fade/fadeout-destroy.js)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfadeplugin.min.js', true);
    ```
- Fade-out-destroy
    ```javascript
    var fade = scene.plugins.get('rexfadeplugin').fadeOutDestroy(gameObject, duration);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFade',
                plugin: FadePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Fade-out-destroy
    ```javascript
    var fade = scene.plugins.get('rexFade').fadeOutDestroy(gameObject, duration);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';
    ```
- Fade-out-destroy
    ```javascript
    var fade = FadeOutDestroy(gameObject, duration);
    ```

### Fade-out-destroy

```javascript
var fade = scene.plugins.get('rexFade').fadeOutDestroy(gameObject, duration);
```

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    fade.on('complete', function(gameObject, fade){

    }, scope);
    ```

### Inject methods

- Inject methods into game object
    ```javascript
    scene.plugins.get('rexFade').injectMethods(gameObject);
    ```
- Inject methods into class of game object
    ```javascript
    scene.plugins.get('rexFade').injectMethods(GameObjectClass.prototype);
    // scene.plugins.get('rexFade').injectMethods(Phaser.GameObjects.Sprite.prototype);
    ```
- Inject methods into class of game object
    ```javascript
    scene.plugins.get('rexFade').injectMethods(GameObjectClass.prototype);
    // scene.plugins.get('rexFade').injectMethods(Phaser.GameObjects.Sprite.prototype);
    ```
- Inject methods into root class of game object
    ```javascript
    scene.plugins.get('rexFade').injectMethodsToRootClass(e);
    // scene.plugins.get('rexFade').injectMethods(Phaser.GameObjects.GameObject.prototype);
    ```

#### Injected methods

- Fade-in
    ```javascript
    gameObject.fadeIn(duration);
    ```
    or
    ```javascript
    gameObject.fadeIn(duration, endAlpha);
    ```
    or
    ```javascript
    gameObject.fadeIn(duration, {start:0, end:1});
    ```
    or
    ```javascript
    gameObject.fadeInPromise(duration, endAlpha)
        .then(function(){
            // ...
        })
    ```
    or
    ```javascript
    gameObject.fadeInPromise(duration, {start:0, end:1})
        .then(function(){
            // ...
        })
    ```
- Fade-out destroy
    ```javascript
    gameObject.fadeOutDestroy(duration);
    ```
    or
    ```javascript
    gameObject.fadeOutDestroyPromise(duration)
        .then(function(){
            // ...
        })
    ```
- Fade-out without destroy
    ```javascript
    gameObject.fadeOut(duration);
    ```
    or
    ```javascript
    gameObject.fadeOutPromise(duration)
        .then(function(){
            // ...
        })
    ```
- Events
    - Fade-in complete
        ```javascript
        gameObject.on('fadein.complete', function(gameObject) { });
        ```
    - Fade-out, fade-out destroy complete
        ```javascript
        gameObject.on('fadeout.complete', function(gameObject) { });
        ```
