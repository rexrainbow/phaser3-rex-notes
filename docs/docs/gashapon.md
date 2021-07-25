## Introduction

Pick random item from box.

- Author: Rex
- Member of scene, or game object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gashapon)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgashaponplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgashaponplugin.min.js', true);
    ```
- Add gashapon object
    ```javascript
    var gashapon = scene.plugins.get('rexgashaponplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GashaponPlugin from 'phaser3-rex-plugins/plugins/gashapon-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGashapon',
                plugin: GashaponPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add gashapon object
    ```javascript
    var gashapon = scene.plugins.get('rexGashapon').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Gashapon from 'phaser3-rex-plugins/plugins/gashapon.js';
    ```
- Add gashapon object
    ```javascript
    var gashapon = new Gashapon(config);
    ```

### Create instance

```javascript
var gashapon = scene.plugins.get('rexGashapon').add({
    mode: 'shuffle',  // 0|'shuffle'|1|'random
    items: {  // name:count
        a:1, 
        b:2, 
        c:3 
    },
    reload: true,     // true|false
    rnd: undefined,
});
```

- `mode` : 
    - `'shuffle'`, or `0` : pick item from box without put it back.
    - `'random'`, or `1` : pick item from box then put it back.
- `reload` : set `true` to reload items when box is empty for `shuffle` mode.
- `items` : initial items `{ name:count }` in box.
- `rnd` : Use [random data generator](random-data-generator.md) to generate result.
    - `undefined` : Use `Math.random()` to generate result.
    - `Phaser.Math.RND` : Use pre-defined random data generator.

### Pick item

- Pick a random item
    ```javascript
    var item = gashapon.next();
    ```
    - return `null` if pick nothing
- Pick specific item
    ```javascript
    var item = gashapon.next(name);
    ```
    - return `null` if pick nothing
- Last picked item
    ```javascript
    var item = gashapon.result;
    ```

### Set item

- Set item
    ```javascript
    gashapon.setItem(name, count);
    ```
- Add item
    ```javascript
    gashapon.addItem(name, count);
    ```
- Put item back
    ```javascript
    gashapon.putItemBack(name, count);
    ```

### Remove item

- Remove item
    ```javascript
    gashapon.removeItem(name);
    ```
- Remove all items
    ```javascript
    gashapon.removeAllItems();
    ```

### Current status

- Get current status
    ```javascript
    var status = gashapon.toJSON();
    ```
- Clone object
    ```javascript
    var state = gashapon.toJSON();
    var gashapon2 = new Gashapon(state);
    ```
- Overwrite current status
    ```javascript
    var status = gashapon.toJSON();
    // gashapon.next()...
    gashapon.resetFromJSON(status);
    ```

### Get items

- Get initial items
    ```javascript
    var items = gashapon.getItems();
    ```
- Get remainder items
    ```javascript
    var items = gashapon.getRemain();
    ```
- Get initial item count
    ```javascript
    var count = gashapon.getItemCount(name);
    ```
- Get remainder item count
    ```javascript
    var count = gashapon.getRemainCount(name);
    ```
- For each initial item
    ```javascript
    gashapon.forEachItem(function(name, count) {

    }, scope);
    ```
- For each remainder item
    ```javascript
    gashapon.forEachRemain(function(name, count) {

    }, scope);
    ```

### Set random generator

```javascript
gashapon.setRND(rnd);
```

- `rnd` : Use [random data generator](random-data-generator.md) to generate result.
    - `undefined`, or `null` : Use `Math.random()` to generate result.
    - `Phaser.Math.RND` : Use pre-defined random data generator.