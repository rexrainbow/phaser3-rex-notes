## Introduction

Gray scale post processing filter.

- Author: Rex
- A camera filter

## Live demos

- [Gray scale](https://codepen.io/rexrainbow/pen/MZNaNP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-grayscale)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgrayscalepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js', true);
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexgrayscalepipelineplugin').add(scene, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGrayScalePipeline',
                plugin: GrayScalePipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexGrayScalePipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import GrayScalePipeline from 'phaser3-rex-plugins/plugins/grayscalepipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = new GrayScalePipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexGrayScalePipeline').add(scene, key, {
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
    - `intensity` : 0(original color) ~ 1(gray scale)
