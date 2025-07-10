## Introduction

Load a YAML text file, parse its contents, and store the result in a JSON cache.

- Author: Rex
- Custom File of loader

## Live demos

- []()

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/yamlloader)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    var sceneConfig = {
        // ....
        pack: {
            files: [{
                type: 'plugin',
                key: 'rexyamlloaderplugin',
                url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/    rexyamlloaderplugin.min.js',
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
            // rexyamlloaderplugin will be installed before preload(), but not added to loader yet
            // Call addToScene(scene) to add this yaml loader to loader of this scene
            this.plugins.get('rexyamlloaderplugin').addToScene(this);

            this.load.rexYAML(key, url);
            // this.load.rexYAML(key, url, dataKey, xhrSettings);
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
    import YAMLLoaderPlugin from 'phaser3-rex-plugins/plugins/yamlloader-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexYAMLLoader',
                plugin: YAMLLoaderPlugin,
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
    scene.load.rexYAML(key, url);
    // scene.load.rexYAML(key, url, dataKey, xhrSettings);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import YAMLLoader from 'phaser3-rex-plugins/plugins/yamlloader.js';
    ```
- Start loading task
    ```javascript
    YAMLLoader.call(scene.load, key, url);
    // YAMLLoader.call(scene.load, key, url, dataKey, xhrSettings)
    ```

### Start loading task

In preload stage:

```javascript
scene.load.rexYAML(key, url);
// scene.load.rexYAML(key, url, dataKey, xhrSettings);
```

### On load complete

```javascript
scene.load.on('filecomplete-json-' + key, function(key, type, data) {}, scope);
```

#### Get data

```javascript
var data = scene.cache.json.get(key);
```