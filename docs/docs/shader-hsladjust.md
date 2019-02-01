## Introduction

Adjust color in HSL domain, post processing filter.

- Author: Rex
- A camera filter

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/hsladjustpipeline-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexhsladjustpipelineplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-hsladjust)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexHslAdjustPipeline from './plugins/hsladjustpipeline.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import HslAdjustPipelinePlugin from './plugins/hsladjustpipeline-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexHslAdjustPipeline',
            plugin: HslAdjustPipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexHslAdjustPipeline').add(scene, key, {
        // hueRotate: 0,
        // satAdjust: 1,
        // lumAdjust: 0.5,
    });
    ```
    - `hueRotate` : Hue rotation
        - `0` : Rotate 0 degrees, original color (Default value)
        - `0.5` : Rotate 180 degrees
        - `1` : Rotate 360 degrees
    - `satAdjust` : Saturation adjustment
        - `0` : Gray
        - `1` : Original color (Default value)
        - > 1 :
    - `lumAdjust` : Lumen adjustment
        - `0` : Dark
        - `0.5` : Original color (Default value)
        - `1` : White
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Hue rotation

- Get
    ```javascript
    var hueRotate = customPipeline.hueRotate;
    ```
- Set
    ```javascript
    customPipeline.hueRotate = hueRotate;
    // customPipeline.hueRotate += value;
    ```
    or
    ```javascript
    customPipeline.setHueRotate(value);
    ```
    - `0` : Rotate 0 degrees, original color
    - `0.5` : Rotate 180 degrees
    - `1` : Rotate 360 degrees

### Saturation adjustment

- Get
    ```javascript
    var satAdjust = customPipeline.satAdjust;
    ```
- Set
    ```javascript
    customPipeline.satAdjust = satAdjust;
    // customPipeline.satAdjust += value;
    ```
    or
    ```javascript
    customPipeline.setSatAdjust(value);
    ```
    - `0` : Gray
    - `1` : Original color
    - > 1 :

### Lumen adjustment

- Get
    ```javascript
    var lumAdjust = customPipeline.lumAdjust;
    ```
- Set
    ```javascript
    customPipeline.lumAdjust = lumAdjust;
    // customPipeline.lumAdjust += value;
    ```
    or
    ```javascript
    customPipeline.setLumAdjust(value);
    ```
    - `0` : Dark
    - `0.5` : Original color
    - `1` : White
