## Introduction

Easing data value of game object's data-manager.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/easedata/)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexeasedataplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexeasedataplugin.min.js', true);
    ```
- Add ease-data behavior
    ```javascript
    var easedata = scene.plugins.get('rexeasedataplugin').add(gameObject);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import EaseDataPlugin from 'phaser3-rex-plugins/plugins/easedata-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexEaseData',
                plugin: EaseDataPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add ease-data behavior
    ```javascript
    var easedata = scene.plugins.get('rexEaseData').add(gameObject);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import { EaseData } from 'phaser3-rex-plugins/plugins/easedata.js';
    ```
- EaseData-out-destroy
    ```javascript
    var easedata = new EaseData(gameObject);
    ```

### Create instance

```javascript
var easedata = scene.plugins.get('rexEaseData').add(gameObject);
```

### Ease data

- Start
    ```javascript
    easedata.easeTo(key, value, duration);
    // easedata.easeTo(key, value, duration, ease);
    ```
    or
    ```javascript
    easedata.easeTo({
        key:key,
        value:value,
        duration:1000,
        ease:'Linear'
    });
    ```
    or
    ```javascript
    easedata.easeTo({
        key:key,
        value:value,
        speed: 10,    // value changing rate, per second
        ease:'Linear'
    });
    ```
- Stop
    ```javascript
    easedata.stopEase(key);           // Set to end value
    // easedata.stopEase(key, false); // Stop at current value
    ```
    or
    ```javascript
    easedata.stopAll();           // Set to end value
    // easedata.stopAll(false);   // Stop at current value
    ```

### Events

- Easing complete
    ```javascript
    easedata.on('complete-' + key, function(gameObject, easedata){
    
    }, scope);
    ```
    ```javascript
    easedata.on('complete', function(key, gameObject, easedata){
    
    }, scope);
    ```