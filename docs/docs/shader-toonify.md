## Introduction

Draw outlines and quantize color in HSV domain, post processing filter. [Reference](https://www.geeks3d.com/20140523/glsl-shader-library-toonify-post-processing-filter/)

- Author: Rex
- A camera filter

## Live demos

- [Toonify](https://codepen.io/rexrainbow/pen/ErWNXa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-toonify)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextoonifypipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextoonifypipelineplugin.min.js', true);
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rextoonifypipelineplugin').add(scene, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ToonifyPipelinePlugin from 'phaser3-rex-plugins/plugins/toonifypipeline-plugin.js';
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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexToonifyPipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ToonifyPipeline from 'phaser3-rex-plugins/plugins/toonifypipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = new ToonifyPipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexToonifyPipeline').add(scene, key, {
        // edgeThreshold: 0.2,
        // hueLevels: 0,
        // sLevels: 0,
        // vLevels: 0,
        // edgeColor: 0
    });
    ```
    - `edgeThreshold` : Threshold of edge. Set `1.1` (or any number larger then `1`) to disable this feature.
    - `hueLevels` : Amount of hue levels. Set `0` to disable this feature.
    - `sLevels` : Amount of saturation levels. Set `0` to disable this feature.
    - `vLevels` : Amount of value levels. Set `0` to disable this feature.
    - `edgeColor` : Color of edge, could be a number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`
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

### Edge threshold

- Get
    ```javascript
    var edgeThreshold = pipelineInstance.edgeThreshold;
    ```
- Set
    ```javascript
    pipelineInstance.edgeThreshold = edgeThreshold;
    ```
    or
    ```javascript
    pipelineInstance.setEdgeThreshold(value);
    ```
    - Set `1.1` (or any number larger then `1`) to disable this feature.

### Hue levels

- Get
    ```javascript
    var hueLevels = pipelineInstance.hueLevels;
    ```
- Set
    ```javascript
    pipelineInstance.hueLevels = hueLevels;
    ```
    or
    ```javascript
    pipelineInstance.setHueLevels(value);
    ```
    - Set `0` to disable this feature.

### Saturation levels

- Get
    ```javascript
    var satLevels = pipelineInstance.satLevels;
    ```
- Set
    ```javascript
    pipelineInstance.satLevels = satLevels;
    ```
    or
    ```javascript
    pipelineInstance.setSatLevels(value);
    ```
    - Set `0` to disable this feature.

### Value levels

- Get
    ```javascript
    var valLevels = pipelineInstance.valLevels;
    ```
- Set
    ```javascript
    pipelineInstance.valLevels = valLevels;
    ```
    or
    ```javascript
    pipelineInstance.setValLevels(value);
    ```
    - Set `0` to disable this feature.

### Edge color

- Get
    ```javascript
    var color = pipelineInstance.edgeColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.edgeColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`
