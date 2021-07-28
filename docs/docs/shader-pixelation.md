## Introduction

Pixelation post processing filter. [Reference](https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/)

- Author: Rex
- A post-fx shader effect

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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexpixelationpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexpixelationpipelineplugin').add(camera, config);
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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexPixelationPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexPixelationPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import PixelationPostFx from 'phaser3-rex-plugins/plugins/pixelationpipeline.js';
    var config = {
        // ...
        pipeline: [PixelationPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(PixelationPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(PixelationPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 pixelation effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexPixelationPipeline').add(gameObject, {
        // pixelWidth: 0,
        // pixelHeight: 0,

        // name: 'rexPixelationPostFx'
    });
    ```
    - `pixelWidth`, `pixelHeight` : Pixel size.
- Apply effect to camera. A camera only can add 1 pixelation effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexPixelationPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexPixelationPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexPixelationPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexPixelationPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexPixelationPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexPixelationPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexPixelationPipeline').get(camera);
    ```

### Pixel size

- Get
    ```javascript
    var pixelWidth = pipelineInstance.pixelWidth;
    var pixelHeight = pipelineInstance.pixelHeight;
    ```
- Set
    ```javascript
    pipelineInstance.pixelWidth = pixelWidth;
    pipelineInstance.pixelHeight = pixelHeight;
    // pipelineInstance.pixelWidth += value;
    // pipelineInstance.pixelHeight += value;
    ```
    or
    ```javascript
    pipelineInstance.setPixelWidth(pixelWidth);
    pipelineInstance.setPixelHeight(pixelHeight);
    pipelineInstance.setPixelSize(pixelWidth, pixelHeight);
    ```