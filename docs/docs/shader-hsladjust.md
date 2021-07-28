## Introduction

Adjust color in HSL domain, post processing filter.

- Author: Rex
- A post-fx shader effect

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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexhsladjustpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexhsladjustpipelineplugin').add(camera, config);
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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexHSLAdjustPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexHSLAdjustPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import HSLAdjustPostFx from 'phaser3-rex-plugins/plugins/hsladjustpipeline.js';
    var config = {
        // ...
        pipeline: [HSLAdjustPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(HSLAdjustPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(HSLAdjustPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 hsl-adjust effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHslAdjustPipeline').add(gameObject, {
        // hueRotate: 0,
        // satAdjust: 1,
        // lumAdjust: 0.5,

        // name: 'rexHslAdjustPostFx'
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
- Apply effect to camera. A camera only can add 1 hsl-adjust effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHslAdjustPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexHslAdjustPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexHslAdjustPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHslAdjustPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexHslAdjustPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHslAdjustPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexHslAdjustPipeline').get(camera);
    ```

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
