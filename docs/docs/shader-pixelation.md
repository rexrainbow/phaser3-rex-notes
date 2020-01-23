## Introduction

Pixelation post processing filter. [Reference](https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/)

- Author: Rex
- A camera filter

## Live demos

- [Pixelation](https://codepen.io/rexrainbow/pen/MqgmgE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-pixelation)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexpixelationpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpixelationpipelineplugin.min.js', true);
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexpixelationpipelineplugin').add(scene, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPixelationPipeline',
                plugin: PixelationPipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexPixelationPipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import PixelationPipeline from 'phaser3-rex-plugins/plugins/pixelationpipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var customPipeline = new PixelationPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexPixelationPipeline').add(scene, key, {
        // pixelWidth: 0,
        // pixelHeight: 0
    });
    ```
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Pixel size

- Get
    ```javascript
    var pixelWidth = customPipeline.pixelWidth;
    var pixelHeight = customPipeline.pixelHeight;
    ```
- Set
    ```javascript
    customPipeline.pixelWidth = pixelWidth;
    customPipeline.pixelHeight = pixelHeight;
    // customPipeline.pixelWidth += value;
    // customPipeline.pixelHeight += value;
    ```
    or
    ```javascript
    customPipeline.setPixelWidth(pixelWidth);
    customPipeline.setPixelHeight(pixelHeight);
    customPipeline.setPixelSize(pixelWidth, pixelHeight);
    ```