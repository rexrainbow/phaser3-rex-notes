## Introduction

Store the image pasted from the clipboard into the texture manager.

- Author: Rex
- Member of scene

## Live demos

- []()

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/clickboardtotexture)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexclickboardtotextureplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexclickboardtotextureplugin.min.js', true);
    ```
- Add clickboard-to-texture object
    ```javascript
    var clickboardToTexture = scene.plugins.get('rexclickboardtotextureplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ClickboardToTexturePlugin from 'phaser3-rex-plugins/plugins/clickboardtotexture-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexClickboardToTexture',
                plugin: ClickboardToTexturePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add clickboard-to-texture object
    ```javascript
    var clickboardToTexture = scene.plugins.get('rexClickboardToTexture').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ClickboardToTexture from 'phaser3-rex-plugins/plugins/clickboardtotexture.js';
    ```
- Add clickboard-to-texture object
    ```javascript
    var clickboardToTexture = new ClickboardToTexture(scene, config);
    ```

### Create instance

```javascript
var clickboardToTexture = scene.plugins.get('rexClickboardToTexture').add(scene, {
    key: undefined,
});
```

- `key` : Store the image to texture cache by key.

### Destroy

```javascript
clickboardToTexture.destroy();
```

### Set texture

```javascript
clickboardToTexture.setKey(key);
```

### Event

- On paste
    ```javascript
    clickboardToTexture.on('paste', function(key) {
        // clickboardToTexture.setKey(newKey)
    })
    ```
