## Introduction

Pixelation post processing filter. [Reference](https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/)

- Author: Rex
- A camera filter

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/pixelationpipeline-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexpixelationpipelineplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-pixelation)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexPixelationPipeline from './plugins/pixelationpipeline.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import PixelationPipelinePlugin from './plugins/pixelationpipeline-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexPixelationPipeline',
            plugin: PixelationPipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexPixelationPipeline').add(scene, key, {
        // pixelWidth: 0,
        // pixelHeight: 0
    });
    ```
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Pixel size

- Get
    ```javascript
    var pixelWidth = customPipeline.pixelWidth;
    var pixelHeight = customPipeline.pixelHeight;
    ```
- Set
    ```javascript
    customPipeline.pixelWidth = pixelWidth;
    customPipeline.pixelHeight = pixelHeight;
    // customPipeline.pixelWidth += value;
    // customPipeline.pixelHeight += value;
    ```
    or
    ```javascript
    customPipeline.setPixelWidth(pixelWidth);
    customPipeline.setPixelHeight(pixelHeight);
    customPipeline.setPixelSize(pixelWidth, pixelHeight);
    ```