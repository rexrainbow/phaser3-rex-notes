## Introduction

Pick random item from box.

- Author: Rex
- Member of scene, or game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gashapon-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgashaponplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gashapon)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexGashapon from './plugins/gashapon.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import GashaponPlugin from './plugins/gashapon-plugin.js';

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
- `items` : initial items in box
- `rnd` : Use [random data generator](random-data-generator.md) to generate result.
    - `undefined` : Use `Math.random()` to generate result.
    - `Phaser.Math.RND` : Use pre-defined random data generator.

### Pick item

#### Pick a random item

```javascript
var item = gashapon.next();
```

- return `null` if pick nothing

#### Pick specific item

```javascript
var item = gashapon.next('a');
```

- return `null` if pick nothing

#### Last picked item

```javascript
var item = gashapon.result;
```

### Set item

#### Set item

```javascript
gashapon.setItem('a', 1);
// gashapon.setItem('a', 1).setItem('b', 2).setItem('c', 3);
```

#### Add item

```javascript
gashapon.addItem('a',1);
```

### Remove item

#### Remove item

```javascript
gashapon.removeItem('a');
// gashapon.removeItem('b').gashapon.removeItem('c');
```

#### Remove all items

```javascript
gashapon.removeAllItems();
```

### Current status

#### Get current status

```javascript
var status = gashapon.toJSON();
```

#### Clone object

```javascript
var status = gashapon.toJSON();
var gashapon2 = new Gashapon(status);
```

#### Overwrite current status

```javascript
var status = gashapon.toJSON();
// gashapon.next()...
gashapon.resetFromJSON(status);
```

### Get items

#### For each item

```javascript
gashapon.eachItem(function(name, count){
    console.log(name + ": " + count);
});
```

#### Get items

```javascript
var items = gashapon.getItems();
```

### Set random generator

```javascript
gashapon.setRND(rnd);
```

- `rnd` : Use [random data generator](random-data-generator.md) to generate result.
    - `undefined` : Use `Math.random()` to generate result.
    - `Phaser.Math.RND` : Use pre-defined random data generator.