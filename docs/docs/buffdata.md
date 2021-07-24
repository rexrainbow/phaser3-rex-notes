## Introduction

Data manager with buffs, extends from [built-in data manager](datamanager.md).

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/buffdata)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbuffdataplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuffdataplugin.min.js', true);
    ```
- Add buff data manager object
    ```javascript
    var data = scene.plugins.get('rexbuffdataplugin').add(parent);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BuffDataPlugin from 'phaser3-rex-plugins/plugins/buffdata-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBuffData',
                plugin: BuffDataPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add buff data manager object
    ```javascript
    var data = scene.plugins.get('rexBuffData').add(parent);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import BuffData from 'phaser3-rex-plugins/plugins/buffdata.js';
    ```
- Add buff data manager object
    ```javascript
    var data = new BuffData(parent);
    ```

### Create instance

```javascript
var data = scene.plugins.get('rexBuffData').add(parent);
// var data = scene.plugins.get('rexBuffData').add(parent, eventEmitter);
```

- `data` : Buff data manager
- `parent` : The object (a scene, or a game object) that this DataManager belongs to.
- `eventEmitter` : The DataManager's [event emitter](eventemitter3.md).

#### Extend existing data manager

```javascript
var data = scene.plugins.get('rexBuffData').extend(data);
```

- `data` : Existing data manager

### Buff

A value is composed of `baseValue`, and some `buffs`, clamped by `min`, `max` values.

- Base value
    - Set
        ```javascript
        data.setBaseValue(key, value);
        ```
    - Remove
        ```javascript
        data.removeBaseValue(key);
        ```        
    - Get
        ```javascript
        var baseValue = data.getBaseValue(key);
        ```

- Buffs, each value can have many buffs, or no buff.
    - Add/set a buff
        ```javascript
        data.setBuff(key, buffKey, value);
        ```
        - `value` :
            - A number
            - A string for percentage like `'10%'`, which means that `(baseValue * percentage)`
    - Remove a buff of a key
        ```javascript
        data.removeBuff(key, buffKey);
        ```
    - Remove all buffs of a key
        ```javascript
        data.removeBuff(key);
        ```
    - Get a buff value
        ```javascript
        var buffValue = data.getBuffValue(key, buffKey);
        ```
- Min, max bounds, optional.
    - Set
        ```javascript
        data.setMin(key, min);
        ```
        ```javascript
        data.setMax(key, max);
        ```
        ```javascript
        data.setBounds(key, min, max);
        ```
        - `min`, `max` : Clamp buffed result value between `min` and `max` value. Set `undefined` to ignore it.
    - Get
        ```javascript
        var min = data.getMinBound(key);
        var max = data.getMaxBound(key);
        ```
- Buffed result
    - Get
        ```javascript
        var result = data.get(key);
        ```
    - [Events](datamanager.md#events)