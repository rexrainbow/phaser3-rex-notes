## Introduction

Gray scale post processing filter.

- Author: Rex
- A post-fx shader effect

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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexgrayscalepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexgrayscalepipelineplugin').add(camera, config);
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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import GrayScalePostFx from 'phaser3-rex-plugins/plugins/grayscalepipeline.js';
    var config = {
        // ...
        pipeline: [GrayScalePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(GrayScalePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(GrayScalePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 gray-scale effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').add(gameObject, {
        // intensity: 1,
        
        // name: 'rexGrayScalePostFx'
    });
    ```
    - `intensity` : 0(original color) ~ 1(gray scale). Default value is `1`.
- Apply effect to camera. A camera only can add 1 gray-scale effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexGrayScalePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexGrayScalePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexGrayScalePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGrayScalePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexGrayScalePipeline').get(camera);
    ```

### Intensity

- Get
    ```javascript
    var intensity = pipelineInstance.intensity;
    ```
- Set
    ```javascript
    pipelineInstance.intensity = intensity;
    // pipelineInstance.intensity += value;
    ```
    or
    ```javascript
    pipelineInstance.setIntensity(radius);
    ```
    - `intensity` : 0(original color) ~ 1(gray scale)
