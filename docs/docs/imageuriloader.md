## Introduction

Load image by uri (base64 string) in preload stage.

Built-in [image loader](loader.md#image) dosen't support loading local image uri.

- Author: Rex
- Custom File of loader

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/imageuriloader)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    var sceneConfig = {
        // ....
        pack: {
            files: [{
                type: 'plugin',
                key: 'reximageuriloaderplugin',
                url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/reximageuriloaderplugin.min.js',
                start: true
            }]
        }
    };
    class MyScene extends Phaser.Scene {
        constructor() {
            super(sceneConfig)
        }
        // ....

        preload() {
            // reximageuriloaderplugin will be installed before preload(), but not added to loader yet
            // Call addToScene(scene) to add this await loader to loader of this scene
            this.plugins.get('reximageuriloaderplugin').addToScene(this);

            this.load.rexImageURI(key, uri);
        }
    }
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexImageURILoader',
                plugin: ImageURILoaderPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- In preload stage
    ```javascript
    scene.load.rexImageURI(key, uri);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ImageURILoader from 'phaser3-rex-plugins/plugins/imageuriloader.js';
    ```
- Start loading task
    ```javascript
    ImageURILoader.call(scene.load, key, uri);
    ```

### Load image

In preload stage:

```javascript
this.load.rexImageURI(key, uri);
```

- `key` : Texture key.
- `uri` : URI, a base64 string.