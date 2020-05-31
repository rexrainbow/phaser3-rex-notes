## Introduction

Glow post processing filter. [Reference](https://gist.github.com/MatthewBarker/032c325ef8577c6d0188)

- Author: Rex
- A camera filter

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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexglowfilterpipelineplugin').add(scene, key, config);
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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import GlowFilterPipeline from 'phaser3-rex-plugins/plugins/glowfilterpipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = new GlowFilterPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(scene, key, {
        // intensity: 0
    });
    ```
    - `intensity` : 0(original color) ~ 1(white color)
        - Suggestion value : 0 ~ 0.02
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
