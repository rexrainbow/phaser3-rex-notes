## Introduction

Encrypt or decrypt string by XOR algorithm.

- Author: Rex
- Functions collection

## Source code

[Encrypt](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/xor/Encrypt.js)
[Decrypt](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/xor/Decrypt.js)

## Usage

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