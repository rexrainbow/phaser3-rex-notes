## Introduction

Glow post processing filter. [Reference](https://gist.github.com/MatthewBarker/032c325ef8577c6d0188)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Glow filter](https://codepen.io/rexrainbow/pen/jObgQpY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-glowfilter)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexglowfilterpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexglowfilterpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexglowfilterpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilterpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGlowFilterPipeline',
                plugin: GlowFilterPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import GlowFilterPostFx from 'phaser3-rex-plugins/plugins/glowfilterpipeline.js';
    var config = {
        // ...
        pipeline: [GlowFilterPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(GlowFilterPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(GlowFilterPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 glow effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(gameObject, {
        // intensity: 0
    });
    ```
    - `intensity` : 0(original color) ~ 1(white color)
        - Suggestion value : 0 ~ 0.02
- Apply effect to camera. A camera only can add 1 glow effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexGlowFilterPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexGlowFilterPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexGlowFilterPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexGlowFilterPipeline').get(camera);
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
    - `intensity` : 0(original color) ~ 1(white color)
        - Suggestion value : 0 ~ 0.02
