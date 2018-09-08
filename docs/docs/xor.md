## Introduction

Encrypt or decrypt string by XOR algorithm.

- Author: Rex
- Methods

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/xor-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexxorplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/xor)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexXOR from './plugins/xor.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import XORPlugin from './plugins/xor-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexXOR',
            plugin: XORPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Encrypt

```javascript
var encResult = scene.plugins.get('rexXOR').Encrypt(src, pwd);
```

### Decrypt

```javascript
var decResult = scene.plugins.get('rexXOR').Decrypt(encResult, pwd);
```