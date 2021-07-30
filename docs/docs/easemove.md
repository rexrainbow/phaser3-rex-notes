## Introduction

Ease-move game object.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/easemove/)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexeasemoveplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexeasemoveplugin.min.js', true);
    ```
- Ease-move to/from
    ```javascript
    var easemove = scene.plugins.get('rexeasemoveplugin').moveTo(gameObject, duration, x, y, ease);
    var easemove = scene.plugins.get('rexeasemoveplugin').moveFrom(gameObject, duration, x, y, ease);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import EaseMovePlugin from 'phaser3-rex-plugins/plugins/easemove-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexEaseMove',
                plugin: EaseMovePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Ease-move to/from
    ```javascript
    var easemove = scene.plugins.get('rexEaseMove').moveTo(gameObject, duration, x, y, ease);
    var easemove = scene.plugins.get('rexEaseMove').moveFrom(gameObject, duration, x, y, ease);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import { EaseMoveTo, EaseMoveFrom } from 'phaser3-rex-plugins/plugins/easemove.js';
    ```
- EaseMove-out-destroy
    ```javascript
    var easemove = EaseMoveTo(gameObject, duration, x, y, ease);
    var easemove = EaseMoveFrom(gameObject, duration, x, y, ease);
    ```

### Move to

```javascript
var easemove = scene.plugins.get('rexEaseMove').moveTo(gameObject, duration, x, y);
// var easemove = scene.plugins.get('rexEaseMove').moveTo(gameObject, duration, x, y, ease);
// easemove = scene.plugins.get('rexEaseMove').moveTo(gameObject, duration, x, y, ease, easemove);
```

- `x`, `y` : End position.
    - Number : End position x/y.
    - String(`+=300`) : Related position of current position x/y.
    - `undefined` : Don't move along x/y axis.
- `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- `easemove` : Ease-move behavior.

### Move from

```javascript
var easemove = scene.plugins.get('rexEaseMove').moveFrom(gameObject, duration, x, y);
// var easemove = scene.plugins.get('rexEaseMove').moveFrom(gameObject, duration, x, y, ease);
// easemove = scene.plugins.get('rexEaseMove').moveFrom(gameObject, duration, x, y, ease, easemove);
```

- `x`, `y` : Start position.
    - Number : Start position x/y.
    - String(`-=300`) : Related position of current position x/y.
    - `undefined` : Don't move along x/y axis.
- `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- `easemove` : Ease-move behavior.

### Events

See [Events of tween task](tween.md#events)

- Move completes or is stopped.
    ```javascript
    easemove.on('complete', function(gameObject, easemove){

    }, scope);
    ```