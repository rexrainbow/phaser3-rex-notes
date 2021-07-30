## Introduction

Scale down (i.e. ease scaleX, scaleY to `0`) game object then destroy it.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/scale/scaledown-destroy.js)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexscaleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscaleplugin.min.js', true);
    ```
- Scale down, then destroy object
    ```javascript
    scene.plugins.get('rexscaleplugin').scaleDownDestroy(gameObject, duration);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexScale',
                plugin: ScalePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Scale down, then destroy object
    ```javascript
    scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ScaleDownDestroy from 'phaser3-rex-plugins/plugins/scale-down-destroy.js';
    ```
- Scale down, then destroy object
    ```javascript
    ScaleDownDestroy(gameObject, duration);
    ```

### Scale down

- Scale down width and height
    ```javascript
    var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration);
    // var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration, undefined, ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- Scale down width only
    ```javascript
    var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration, 'x');
    // var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration, 'x', ease);
    ```
- Scale down height only
    ```javascript
    var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration, 'y');
    // var scale = scene.plugins.get('rexScale').scaleDownDestroy(gameObject, duration, 'y', ease);
    ```

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    scale.on('complete', function(gameObject, scale){

    }, scope);
    ```