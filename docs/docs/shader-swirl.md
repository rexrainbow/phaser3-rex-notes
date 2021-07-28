## Introduction

Swirl post processing filter. [Reference](https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Swirl](https://codepen.io/rexrainbow/pen/RBXQBo)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-swirl)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexswirlpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexswirlpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexswirlpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexswirlpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SwirlPipelinePlugin from 'phaser3-rex-plugins/plugins/swirlpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSwirlPipeline',
                plugin: SwirlPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import SwirlPostFx from 'phaser3-rex-plugins/plugins/swirlpipeline.js';
    var config = {
        // ...
        pipeline: [SwirlPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(SwirlPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(SwirlPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 swirl effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(gameObject, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // rotation: 0,  // or angle: 0,

        // name: 'rexSwirlPostFx'
    });
    ```
    - `center.x`, `center.y` : Local position of swirl center.
    - `radius` : Swirl radius.
    - `rotation` (`angle`) : Swirl angle.
- Apply effect to camera. A camera only can add 1 swirl effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexSwirlPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexSwirlPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexSwirlPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexSwirlPipeline').get(camera);
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

### Rotation

- Get
    ```javascript
    var rotation = pipelineInstance.rotation;  // radians
    // var angle = pipelineInstance.angle;     // degrees
    ```
- Set
    ```javascript
    pipelineInstance.rotation = rotation;
    pipelineInstance.rotation += value;
    // pipelineInstance.angle = angle;
    // pipelineInstance.angle += value;
    ```
    or
    ```javascript
    pipelineInstance.setRotation(rotation);
    // pipelineInstance.setAngle(angle);
    ```

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
