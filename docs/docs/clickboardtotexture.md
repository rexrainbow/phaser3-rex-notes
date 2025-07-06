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
    var clickboardToTexture = scene.plugins.get('rexclickboardtotextureplugin').add(scene);
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
    var clickboardToTexture = scene.plugins.get('rexClickboardToTexture').add(scene);
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
    var clickboardToTexture = new ClickboardToTexture(scene);
    ```

### Create instance

```javascript
var clickboardToTexture = scene.plugins.get('rexClickboardToTexture').add(scene);
```

### Destroy

```javascript
clickboardToTexture.destroy();
```

### Event

- On paste
    ```javascript
    clickboardToTexture.on('paste', async function(clickboardToTexture) {
        // await clickboardToTexture.saveTexturePromise(key);
        // ...
    })
    ```

### Save texture

```javascript
clickboardToTexture.saveTexture(key, onComplete);
```

- `onComplete` : Callback invoked upon completion of texture saving.

or

```javascript
await clickboardToTexture.saveTexturePromise(key);
```

### Release clickboard data

```javascript
clickboardToTexture.releaseFile();
```
