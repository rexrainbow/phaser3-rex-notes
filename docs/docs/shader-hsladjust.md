## Introduction

Adjust color in HSL domain, post processing filter.

- Author: Rex
- A camera filter

## Live demos

- [HSL adjust](https://codepen.io/rexrainbow/pen/daPdoY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-hsladjust)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhsladjustpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhsladjustpipelineplugin.min.js', true);
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexhsladjustpipelineplugin').add(scene, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HSLAdjustPipelinePlugin from 'phaser3-rex-plugins/plugins/hsladjustpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexHSLAdjustPipeline',
                plugin: HSLAdjustPipelinePlugin,
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
    var pipelineInstance = scene.plugins.get('rexHSLAdjustPipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import HSLAdjustPipeline from 'phaser3-rex-plugins/plugins/hsladjustpipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = new HSLAdjustPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHslAdjustPipeline').add(scene, key, {
        // hueRotate: 0,
        // satAdjust: 1,
        // lumAdjust: 0.5,
    });
    ```
    - `hueRotate` : Hue rotation
        - `0` : Rotate 0 degrees, original color (Default value)
        - `0.5` : Rotate 180 degrees
        - `1` : Rotate 360 degrees
    - `satAdjust` : Saturation adjustment
        - `0` : Gray
        - `1` : Original color (Default value)
        - > 1 :
    - `lumAdjust` : Lumen adjustment
        - `0` : Dark
        - `0.5` : Original color (Default value)
        - `1` : White
1. Add to render pipeline
    ```javascript
    scene.game.renderer.addPipeline(pipelineName, pipelineInstance);
    ```
1. Apply filter
    - To camera
        ```javascript
        // var camera = scene.cameras.main;
        camera.setRenderToTexture(pipelineName);
        ```
    - To game object
        ```javascript
        gameObject.setPipeline(pipelineName);
        ```
        - `pipelineName` : Name of this render pipeline, a string.

### Hue rotation

- Get
    ```javascript
    var hueRotate = pipelineInstance.hueRotate;
    ```
- Set
    ```javascript
    pipelineInstance.hueRotate = hueRotate;
    // pipelineInstance.hueRotate += value;
    ```
    or
    ```javascript
    pipelineInstance.setHueRotate(value);
    ```
    - `0` : Rotate 0 degrees, original color
    - `0.5` : Rotate 180 degrees
    - `1` : Rotate 360 degrees

### Saturation adjustment

- Get
    ```javascript
    var satAdjust = pipelineInstance.satAdjust;
    ```
- Set
    ```javascript
    pipelineInstance.satAdjust = satAdjust;
    // pipelineInstance.satAdjust += value;
    ```
    or
    ```javascript
    pipelineInstance.setSatAdjust(value);
    ```
    - `0` : Gray
    - `1` : Original color
    - > 1 :

### Lumen adjustment

- Get
    ```javascript
    var lumAdjust = pipelineInstance.lumAdjust;
    ```
- Set
    ```javascript
    pipelineInstance.lumAdjust = lumAdjust;
    // pipelineInstance.lumAdjust += value;
    ```
    or
    ```javascript
    pipelineInstance.setLumAdjust(value);
    ```
    - `0` : Dark
    - `0.5` : Original color
    - `1` : White
