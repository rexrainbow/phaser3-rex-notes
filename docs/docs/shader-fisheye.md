## Introduction

Fish-eye post processing filter. [Reference](https://www.geeks3d.com/20140213/glsl-shader-library-fish-eye-and-dome-and-barrel-distortion-post-processing-filters/6/)

- Author: Rex
- A post-fx shader effect

## Live demos

- [FishEye](https://codepen.io/rexrainbow/pen/mdmgLZY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-fisheye)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfisheyepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfisheyepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexfisheyepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexfisheyepipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FishEyePipelinePlugin from 'phaser3-rex-plugins/plugins/fisheyepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFishEyePipeline',
                plugin: FishEyePipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexFishEyePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexFishEyePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import FishEyePostFx from 'phaser3-rex-plugins/plugins/fisheyepipeline.js';
    var config = {
        // ...
        pipeline: [FishEyePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(FishEyePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(FishEyePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 fisheye effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexFishEyePipeline').add(gameObject, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // intensity: 1,
        // mode:0,  // 0|1|'asin'|'sin'

        // name: 'rexFishEyePostFx'
    });
    ```
    - `center.x`, `center.y` : Local position of fisheye center.
    - `radius` : FishEye radius.
    - `intensity` : 0(original) ~ 1(fisheye). Default value is `1`.
    - `mode` : 
        - `0`, or `'asin'` : asin mode. Defaule value is `0`.
        - `1`, or `'sin'` : sin mode.
- Apply effect to camera. A camera only can add 1 fisheye effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexFishEyePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexFishEyePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexFishEyePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexFishEyePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexFishEyePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexFishEyePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexFishEyePipeline').get(camera);
    ```

### Radius

- Get
    ```javascript
    var radius = pipelineInstance.radius;
    ```
- Set
    ```javascript
    pipelineInstance.radius = radius;
    // pipelineInstance.radius += value;
    ```
    or
    ```javascript
    pipelineInstance.setRadius(radius);
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
    pipelineInstance.setIntensity(intensity);
    ```
    - `intensity` : 0(original) ~ 1(fisheye)

### Center position

Default value is center of window.

- Get
    ```javascript
    var x = pipelineInstance.centerX;
    var y = pipelineInstance.centerY;
    ```
- Set
    ```javascript
    pipelineInstance.centerX = x;
    pipelineInstance.centerY = y;
    ```
    or
    ```javascript
    pipelineInstance.setCenter(x, y);
    // pipelineInstance.setCenter();   // set to center of window
    ```

### Mode

- Get
    ```javascript
    var mode = pipelineInstance.fishEyeMode;
    ```
- Set
    ```javascript
    pipelineInstance.setFishEyeMode(mode);
    ```
    - `0`, or `'asin'` : asin mode.
    - `1`, or `'sin'` : sin mode.