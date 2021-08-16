## Introduction

Barrel post processing filter. [Reference](http://www.geeks3d.com/20140213/glsl-shader-library-fish-eye-and-dome-and-barrel-distortion-post-processing-filters/)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Barrel](https://codepen.io/rexrainbow/pen/OJmGGVB)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-barrel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbarrelpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbarrelpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexbarrelpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexbarrelpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BarrelPipelinePlugin from 'phaser3-rex-plugins/plugins/barrelpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBarrelPipeline',
                plugin: BarrelPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexBarrelPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexBarrelPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import BarrelPostFx from 'phaser3-rex-plugins/plugins/barrelpipeline.js';
    var config = {
        // ...
        pipeline: [BarrelPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(BarrelPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(BarrelPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 barrel effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexBarrelPipeline').add(gameObject, {
        // shrink: false,
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // power: 0.5,
        // intensity: 1,
        
        // name: 'rexBarrelPostFx'
    });
    ```
    - `shrink` : 
        - `false` : Fish-eye effect
        - `true` : Anti fish-eye effect.
    - `center.x`, `center.y` : Local position of barrel center.
    - `radius` : Barrel radius.
    - `power` : 0~1.
    - `intensity` : 0(original) ~ 1(barrel). Default value is `1`.
- Apply effect to camera. A camera only can add 1 barrel effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexBarrelPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexBarrelPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexBarrelPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexBarrelPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexBarrelPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexBarrelPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexBarrelPipeline').get(camera);
    ```

### Shrink mode

- Get
    ```javascript
    var shrinkMode = pipelineInstance.shrinkMode;
    ```
- Set
    ```javascript
    pipelineInstance.setShrinkMode(true);
    // pipelineInstance.setShrinkMode(false);
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

### Power

- Get
    ```javascript
    var power = pipelineInstance.power;
    ```
- Set
    ```javascript
    pipelineInstance.power = power;
    ```
    or
    ```javascript
    pipelineInstance.setPower(power);
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
    - `intensity` : 0(original) ~ 1(barrel)

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