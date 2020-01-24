## Introduction

Encrypt or decrypt string by XOR algorithm.

- Author: Rex
- Methods

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/xor)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexxorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexxorplugin.min.js', true);
    ```
- Encrypt, or decrypt
    ```javascript
    var encResult = scene.plugins.get('rexxorplugin').Encrypt(src, pwd);
    var decResult = scene.plugins.get('rexxorplugin').Decrypt(encResult, pwd);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import XORPlugin from 'phaser3-rex-plugins/plugins/xor-plugin.js';
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
- Encrypt, or decrypt
    ```javascript
    var encResult = scene.plugins.get('rexXOR').Encrypt(src, pwd);
    var decResult = scene.plugins.get('rexXOR').Decrypt(encResult, pwd);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import XOR from 'phaser3-rex-plugins/plugins/xor.js';
    ```
- Encrypt, or decrypt
    ```javascript
    var encResult = XOR.Encrypt(src, pwd);
    var decResult = XOR.Decrypt(encResult, pwd);
    ```

### Encrypt

```javascript
var encResult = scene.plugins.get('rexXOR').Encrypt(src, pwd);
```

### Decrypt

```javascript
var decResult = scene.plugins.get('rexXOR').Decrypt(encResult, pwd);
```