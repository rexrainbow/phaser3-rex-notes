## Introduction

Gray scale post processing filter.

- Author: Rex
- A camera filter

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/grayscalepipeline-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgrayscalepipelineplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-grayscale)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexGrayScalepipeline from './plugins/grayscalepipeline.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import GrayScalePipelinePlugin from './plugins/grayscalepipeline-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexGrayScalePipeline',
            plugin: GrayScalePipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexGrayScalePipeline').add(scene, key, {
        // intensity: 0
    });
    ```
    - `intensity` : 0(original color) ~ 1(gray scale)
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Intensity

- Get
    ```javascript
    var intensity = customPipeline.intensity;
    ```
- Set
    ```javascript
    customPipeline.intensity = intensity;
    // customPipeline.intensity += value;
    ```
    or
    ```javascript
    customPipeline.setIntensity(radius);
    ```
    - `intensity` : 0(original color) ~ 1(gray scale)
