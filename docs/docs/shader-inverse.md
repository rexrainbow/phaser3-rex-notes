## Introduction

Inverse color post processing filter.

- Author: Rex
- A camera filter

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-inverse)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexinversepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinversepipelineplugin.min.js', true);
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexinversepipelineplugin').add(scene, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import InversePipelinePlugin from 'phaser3-rex-plugins/plugins/inversepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexInversePipeline',
                plugin: InversePipelinePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexInversePipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import InversePipeline from 'phaser3-rex-plugins/plugins/inversepipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = new InversePipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexInversePipeline').add(scene, key, {
        // intensity: 0
    });
    ```
    - `intensity` : 0(original color) ~ 1(gray scale)
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Intensity

- Get
    ```javascript
    var intensity = customPipeline.intensity;
    ```
- Set
    ```javascript
    customPipeline.intensity = intensity;
    // customPipeline.intensity += value;
    ```
    or
    ```javascript
    customPipeline.setIntensity(radius);
    ```
    - `intensity` : 0(original color) ~ 1(inverse color)
