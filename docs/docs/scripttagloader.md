## Introduction

Load script tag in preload stage.

- Author: Rex
- Custom File of loader

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/scripttagloader)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    var sceneConfig = {
        // ....
        pack: {
            files: [{
                type: 'plugin',
                key: 'rexscripttagloaderplugin',
                url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscripttagloaderplugin.min.js',
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
            // rexscripttagloaderplugin will be installed before preload(), but not added to loader yet
            // Call addToScene(scene) to add this await loader to loader of this scene
            this.plugins.get('rexscripttagloaderplugin').addToScene(this);

            this.load.rexScriptTag(url);
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
    import ScriptTagLoaderPlugin from 'phaser3-rex-plugins/plugins/scripttagloader-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexScriptTagLoader',
                plugin: ScriptTagLoaderPlugin,
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
    scene.load.rexScriptTag(url);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ScriptTagLoader from 'phaser3-rex-plugins/plugins/scripttagloader.js';
    ```
- Start loading task
    ```javascript
    ScriptTagLoader.call(scene.load, url);
    ```

### Load script tag

In preload stage:

```javascript
this.load.rexScriptTag(url);
```

### Compare with script loader

- Built-in script loader uses AJAX to load text as script, which might have CORS issue.
- Script tag loader uses `<script>` tag to load script.