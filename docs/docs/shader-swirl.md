## Introduction

Swirl post processing filter. [Reference](https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/)

- Author: Rex
- A camera filter

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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexswirlpipelineplugin').add(scene, key, config);
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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import SwirlPipeline from 'phaser3-rex-plugins/plugins/swirlpipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = new SwirlPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSwirlPipeline').add(scene, key, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // rotation: 0,  // or angle: 0
    });
    ```
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
