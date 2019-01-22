## Introduction

Swirl post processing filter. [Reference](https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/)

- Author: Rex
- A camera filter

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/swirlpipeline-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexswirlpipelineplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-swirl)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexSwirlpipeline from './plugins/swirlpipeline.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import SwirlPipelinePlugin from './plugins/swirlpipeline-plugin.js';

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
