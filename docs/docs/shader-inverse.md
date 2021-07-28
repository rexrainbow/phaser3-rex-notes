## Introduction

Inverse color post processing filter.

- Author: Rex
- A post-fx shader effect

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-inverse)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexinversepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinversepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexinversepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexinversepipelineplugin').add(camera, config);
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
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexInversePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexInversePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import InversePostFx from 'phaser3-rex-plugins/plugins/inversepipeline.js';
    var config = {
        // ...
        pipeline: [InversePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(InversePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(InversePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 inverse effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexInversePipeline').add(gameObject, {
        // intensity: 1,

        // name: 'rexInversePostFx'
    });
    ```
    - `intensity` : 0(original color) ~ 1(inverse scale). Default value is `1`.
- Apply effect to camera. A camera only can add 1 inverse effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexInversePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexInversePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexInversePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexInversePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexInversePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexInversePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexInversePipeline').get(camera);
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
    - `intensity` : 0(original color) ~ 1(inverse color)
