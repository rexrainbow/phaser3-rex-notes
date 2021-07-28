## Introduction

Shockwave post processing filter. [Reference](https://www.geeks3d.com/20091116/shader-library-2d-shockwave-post-processing-filter-glsl/)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Shockwave](https://codepen.io/rexrainbow/pen/PopeyLv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-shockwave)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexshockwavepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshockwavepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexshockwavepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexshockwavepipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ShockwavePipelinePlugin from 'phaser3-rex-plugins/plugins/shockwavepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexShockwavePipeline',
                plugin: ShockwavePipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexShockwavePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexShockwavePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import ShockwavePostFx from 'phaser3-rex-plugins/plugins/shockwavepipeline.js';
    var config = {
        // ...
        pipeline: [ShockwavePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(ShockwavePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(ShockwavePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 shockwave effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexShockwavePipeline').add(gameObject, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // waveRadius: 0,
        // waveWidth: 20,
        // powBaseScale: 0.8,
        // powExponent: 0.1,

        // name: 'rexShockwavePostFx'
    });
    ```
    - `waveRadius` : Radius of shockwave, in pixels.
    - `waveWidth` : Width of shockwave, in pixels.
    - `powBaseScale`, `powExponent` : Parameters of shockwave.
- Apply effect to camera. A camera only can add 1 shockwave effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexShockwavePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexShockwavePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexShockwavePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexShockwavePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexShockwavePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexShockwavePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexShockwavePipeline').get(camera);
    ```

### Wave radius

- Get
    ```javascript
    var waveRadius = pipelineInstance.waveRadius;
    ```
- Set
    ```javascript
    pipelineInstance.waveRadius = waveRadius;
    ```
    or
    ```javascript
    pipelineInstance.setWaveRadius(waveRadius);
    ```

### Wave width

- Get
    ```javascript
    var waveWidth = pipelineInstance.waveWidth;
    ```
- Set
    ```javascript
    pipelineInstance.waveWidth = waveWidth;
    ```
    or
    ```javascript
    pipelineInstance.setWaveWidth(waveWidth);
    ```
