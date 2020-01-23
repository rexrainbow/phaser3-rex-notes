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
    var customPipeline = scene.plugins.get('rexswirlpipelineplugin').add(scene, key, config);
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
    var customPipeline = scene.plugins.get('rexSwirlPipeline').add(scene, key, config);
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
    var customPipeline = new SwirlPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var customPipeline = scene.plugins.get('rexSwirlPipeline').add(scene, key, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // rotation: 0,  // or angle: 0
    });
    ```
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Radius

- Get
    ```javascript
    var radius = customPipeline.radius;
    ```
- Set
    ```javascript
    customPipeline.radius = radius;
    // customPipeline.radius += value;
    ```
    or
    ```javascript
    customPipeline.setRadius(radius);
    ```

### Rotation

- Get
    ```javascript
    var rotation = customPipeline.rotation;  // radians
    // var angle = customPipeline.angle;     // degrees
    ```
- Set
    ```javascript
    customPipeline.rotation = rotation;
    customPipeline.rotation += value;
    // customPipeline.angle = angle;
    // customPipeline.angle += value;   
    ```
    or
    ```javascript
    customPipeline.setRotation(rotation);
    // customPipeline.setAngle(angle);
    ```

### Center position

Default value is center of window.

- Get
    ```javascript
    var x = customPipeline.centerX;
    var y = customPipeline.centerY;
    ```
- Set
    ```javascript
    customPipeline.centerX = x;
    customPipeline.centerY = y;
    ```
    or
    ```javascript
    customPipeline.setCenter(x, y);
    // customPipeline.setCenter();   // set to center of window
    ```
