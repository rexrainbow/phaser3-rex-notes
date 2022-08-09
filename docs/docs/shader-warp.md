## Introduction

Warp post processing filter. 

- Author: Rex
- A post-fx shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Warp](https://codepen.io/rexrainbow/pen/dymddOj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-warp)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexwarppipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwarppipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexwarppipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexwarppipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import WarpPipelinePlugin from 'phaser3-rex-plugins/plugins/warppipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexWarpPipeline',
                plugin: WarpPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexWarpPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexWarpPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import WarpPostFx from 'phaser3-rex-plugins/plugins/warppipeline.js';
    var config = {
        // ...
        pipeline: [WarpPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(WarpPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(WarpPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 warp effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexWarpPipeline').add(gameObject, {
        // frequencyX: 10,
        // frequencyY: 10,

        // amplitudeX: 10,
        // amplitudeY: 10,

        // speedX: 0,
        // speedY: 0,
        // speedEnable: 

        // name: 'rexWarpPostFx'
    });
    ```
    - `frequencyX`, `frequencyY` : Horizontal/vertical frequency, in pixel.
    - `amplitudeX`, `amplitudeY` : Horizontal/vertical amplitude, in pixel.
    - `speedX`, `speedY` : Horizontal/vertical speed.
    - `speedEnable`
        - `true` : Enable speed. Default value if `speedX` or `speedY` is not `0`.
        - `false` : Disable speed. Default value if `speedX` and `speedY` are both `0`.

- Apply effect to camera. A camera only can add 1 warp effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexWarpPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexWarpPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexWarpPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexWarpPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexWarpPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexWarpPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexWarpPipeline').get(camera);
    ```

### Frequency

Horizontal/vertical frequency, in pixel.

- Get
    ```javascript
    var frequencyX = pipelineInstance.frequencyX;
    var frequencyY = pipelineInstance.frequencyY;
    ```
- Set
    ```javascript
    pipelineInstance.frequencyX = frequencyX;
    pipelineInstance.frequencyY = frequencyY;
    // pipelineInstance.frequencyX += value;
    // pipelineInstance.frequencyY += value;
    ```
    or
    ```javascript
    pipelineInstance.setFrequencyX(frequencyX);
    pipelineInstance.setFrequencyY(frequencyY);
    pipelineInstance.setFrequency(frequencyX, frequencyY);
    ```

### Amplitude

Horizontal/vertical amplitude, in pixel.

- Get
    ```javascript
    var amplitudeX = pipelineInstance.amplitudeX;
    var amplitudeY = pipelineInstance.amplitudeY;
    ```
- Set
    ```javascript
    pipelineInstance.amplitudeX = amplitudeX;
    pipelineInstance.amplitudeY = amplitudeY;
    // pipelineInstance.amplitudeX += value;
    // pipelineInstance.amplitudeY += value;
    ```
    or
    ```javascript
    pipelineInstance.setAmplitudeX(amplitudeX);
    pipelineInstance.setAmplitudeY(amplitudeY);
    pipelineInstance.setAmplitude(amplitudeX, amplitudeY);
    ```

### Speed

Horizontal/vertical speed.

- Eanble/resume
    ```javascript
    pipelineInstance.setSpeedEnable();
    ```
- Pause
    ```javascript
    pipelineInstance.setSpeedEnable(false);
    ```
- Get
    ```javascript
    var speedX = pipelineInstance.speedX;
    var speedY = pipelineInstance.speedY;
    ```
- Set
    ```javascript
    pipelineInstance.speedX = speedX;
    pipelineInstance.speedY = speedY;
    // pipelineInstance.speedX += value;
    // pipelineInstance.speedY += value;
    ```
    or
    ```javascript
    pipelineInstance.setSpeedX(speedX);
    pipelineInstance.setSpeedY(speedY);
    pipelineInstance.setSpeed(speedX, speedY);
    ```