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