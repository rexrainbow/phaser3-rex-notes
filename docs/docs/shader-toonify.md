## Introduction

Draw edges and quantize color in HSV domain, post processing filter. [Reference](https://www.geeks3d.com/20140523/glsl-shader-library-toonify-post-processing-filter/)

- Author: Rex
- A camera filter

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/toonifypipeline-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextoonifypipelineplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-toonify)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexToonifyPipeline from './plugins/toonifypipeline.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import ToonifyPipelinePlugin from './plugins/toonifypipeline-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexToonifyPipeline',
            plugin: ToonifyPipelinePlugin,
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
    var customPipeline = scene.plugins.get('rexToonifyPipeline').add(scene, key, {
        // edgeThreshold: 0.2,
        // hueLevels: 0,
        // sLevels: 0,
        // vLevels: 0
    });
    ```
    - `edgeThreshold` : Threshold of edge. Set `1.1` (or any number larger then `1`) to disable this feature.
    - `hueLevels` : Amount of hue levels. Set `0` to disable this feature.
    - `sLevels` : Amount of saturation levels. Set `0` to disable this feature.
    - `vLevels` : Amount of value levels. Set `0` to disable this feature.
2. Add pipeline to camera
    ```javascript
    // var camera = scene.cameras.main;
    camera.setRenderToTexture(customPipeline);
    ```

### Edge threshold

- Get
    ```javascript
    var edgeThreshold = customPipeline.edgeThreshold;
    ```
- Set
    ```javascript
    customPipeline.edgeThreshold = edgeThreshold;
    ```
    or
    ```javascript
    customPipeline.setEdgeThreshold(value);
    ```
    - Set `1.1` (or any number larger then `1`) to disable this feature.

### Hue levels

- Get
    ```javascript
    var hueLevels = customPipeline.hueLevels;
    ```
- Set
    ```javascript
    customPipeline.hueLevels = hueLevels;
    ```
    or
    ```javascript
    customPipeline.setHueLevels(value);
    ```
    - Set `0` to disable this feature.

### Saturation levels

- Get
    ```javascript
    var satLevels = customPipeline.satLevels;
    ```
- Set
    ```javascript
    customPipeline.satLevels = satLevels;
    ```
    or
    ```javascript
    customPipeline.setSatLevels(value);
    ```
    - Set `0` to disable this feature.

### Value levels

- Get
    ```javascript
    var valLevels = customPipeline.valLevels;
    ```
- Set
    ```javascript
    customPipeline.valLevels = valLevels;
    ```
    or
    ```javascript
    customPipeline.setValLevels(value);
    ```
    - Set `0` to disable this feature.



