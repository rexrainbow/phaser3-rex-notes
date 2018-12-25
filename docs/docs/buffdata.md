## Introduction

Data manager with buffs, extends from [built-in data manager](datamanager.md).

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/buffdata-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbuffdataplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/buffdata)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexBuffData from './plugins/buffdata.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import BuffDataPlugin from './plugins/buffdata-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexBuffData',
            plugin: BuffDataPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
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
        var buffValue = data.getBuffs(key, buffKey).value;
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
        var min = data.getBounds(key).min;
        var max = data.getBounds(key).max;
        ```
- Buffed result
    - Get
        ```javascript
        var result = data.get(key);
        ```
    - [Events](datamanager.md#events)