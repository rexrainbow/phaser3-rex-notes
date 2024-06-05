## Introduction

Key object interface mapping from multiple source of key objects.

- Author: Rex
- Member of scene

## Live demos

- [Multiple mode](https://codepen.io/rexrainbow/pen/bGyWKoz)
- [Single mode](https://codepen.io/rexrainbow/pen/LYoyrOL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/keyshub)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexkeyshubplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkeyshubplugin.min.js', true);
    ```
- Add keys-hub object
    ```javascript
    var keysHub = scene.plugins.get('rexkeyshubplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import KeysHubPlugin from 'phaser3-rex-plugins/plugins/keyshub-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexKeysHub',
                plugin: KeysHubPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add keys-hub object
    ```javascript
    var keysHub = scene.plugins.get('rexKeysHub').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import KeysHub from 'phaser3-rex-plugins/plugins/keyshub.js';
    ```
- Add keys-hub object
    ```javascript
    var keysHub = new KeysHub(scene, config);
    ```

### Create instance

```javascript
var keysHub = scene.plugins.get('rexKeysHub').add(scene, {
    // singleMode: false,
});
```

- `singleMode` :
    - `true` : Unplug old key object then plug new key object.
    - `false` : Plug new key object without unplug previous key object. Default behavior.

### Destroy

```javascript
keysHub.destroy();
```

### Plug key object

- Plug a set of key objects
    ```javascript
    keysHub.plugKeyObject({
        keyCode0: keyObject0,
        keyCode1: keyObject1,
        // ...
    });
    ```
    for example :
    ```javascript
    var keyObjects = scene.input.keyboard.addKeys({
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D'
    });
    keysHub.plugKeyObject(keyObjects);
    ```
    ```javascript
    var keyObjects = scene.input.keyboard.createCursorKeys();
    keysHub.plugKeyObject(keyObjects);
    ```
    or
    ```javascript
    var keyObjects = joystick.createCursorKeys();
    keysHub.plugKeyObject(keyObjects);
    ```
    - `keyObjects` : `{keyCode : keyObject}`
    - `joystick` : [Virtual joystick](virtualjoystick.md)
- Plug a key object
    ```javascript
    keysHub.plugKeyObject(keyObject, keyCode);
    ```

### Unplug key object

- Unplug a set of key objects
    ```javascript
    keysHubunplugKeyObjects(keyObjects);
    ```
    - `keyObjects` : `{keyCode : keyObject}`
- Unplugin a key object
    ```javascript
    keysHub.unplugKeyObject(keyObject);
    ```

### Key object interfacee

- Get key object
    ```javascript
    var keyObject = keysHub.addKey('W');  // see `Key map` section
    // var keyObject = keysHub.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    ```
    or
    ```javascript
    var keyObject = keysHub.addKey('W');
    ```
- Get key objects
    ```javascript
    var keyObjects = keysHub.addKeys('W,S,A,D');  // keyObjects.W, keyObjects.S, keyObjects.A, keyObjects.D
    ```
    or
    ```javascript
    var keyObjects = keysHub.addKeys({
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D'
    });  // keyObjects.up, keyObjects.down, keyObjects.left, keyObjects.right
    ```
- Get curor key objects
    ```javascript
    var cursorKeys = keysHub.createCursorKeys();
    ```

### Get plugged key objects

```javascript
var keyObject = keysHub.getKeyObjects(keyCode);
```

- `keyObject` : 
    - A key object if `singleMode` is set to `true`
    - A list of key objects if if `singleMode` is set to `false`
