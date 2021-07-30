## Introduction

Scale up (i.e. ease scaleX, scaleY from `0` to `1`) game object.

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
- Pop-up object
    ```javascript
    scene.plugins.get('rexscaleplugin').popup(gameObject, duration);
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
- Pop-up object
    ```javascript
    scene.plugins.get('rexScale').popup(gameObject, duration);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import PopUp from 'phaser3-rex-plugins/plugins/popup.js';
    ```
- Pop-up object
    ```javascript
    PopUp(gameObject, duration);
    ```

### Pop up

- Pop up width and height
    ```javascript
    var scale = scene.plugins.get('rexScale').popup(gameObject, duration);
    // var scale = popUp(gameObject, duration, undefined, ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
- Pop up width only
    ```javascript
    var scale = scene.plugins.get('rexScale').popup(gameObject, duration, 'x');
    // var scale = popUp(gameObject, duration, 'x', ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
- Pop up height only
    ```javascript
    var scale = scene.plugins.get('rexScale').popup(gameObject, duration, 'y');
    // var scale = popUp(gameObject, duration, 'y', ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    scale.on('complete', function(gameObject, scale){

    }, scope);
    ```