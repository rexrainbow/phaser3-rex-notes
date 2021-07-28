## Introduction

Cross-stitching post processing filter. [Reference](https://www.geeks3d.com/20110408/cross-stitching-post-processing-shader-glsl-filter-geexlab-pixel-bender/)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Cross-stitching](https://codepen.io/rexrainbow/pen/XWMEdYz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-crossstitching)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcrossstitchingpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcrossstitchingpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcrossstitchingpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcrossstitchingpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CrossStitchingPipelinePlugin from 'phaser3-rex-plugins/plugins/crossstitchingpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCrossStitchingPipeline',
                plugin: CrossStitchingPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import CrossStitchingPostFx from 'phaser3-rex-plugins/plugins/crossstitchingpipeline.js';
    var config = {
        // ...
        pipeline: [CrossStitchingPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(CrossStitchingPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(CrossStitchingPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 cross-stitching effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').add(gameObject, {
        // stitchingWidth: 6,
        // stitchingHeight: 6,
        // brightness: 0,

        // name: 'rexCrossStitchingPostFx'
    });
    ```
    - `stitchingWidth`, `stitchingHeight` : Stitching size.
    - `brightness` : Brightness of stitching edges
- Apply effect to camera. A camera only can add 1 cross-stitching effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexCrossStitchingPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexCrossStitchingPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexCrossStitchingPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrossStitchingPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexCrossStitchingPipeline').get(camera);
    ```

### Stitching size

- Get
    ```javascript
    var stitchingWidth = pipelineInstance.stitchingWidth;
    var stitchingHeight = pipelineInstance.stitchingHeight;
    ```
- Set
    ```javascript
    pipelineInstance.stitchingWidth = stitchingWidth;
    pipelineInstance.stitchingHeight = stitchingHeight;
    // pipelineInstance.stitchingWidth += value;
    // pipelineInstance.stitchingHeight += value;
    ```
    or
    ```javascript
    pipelineInstance.setStitchingWidth(stitchingWidth);
    pipelineInstance.setStitchingHeight(stitchingHeight);
    pipelineInstance.setStitchingSize(stitchingWidth, stitchingHeight);
    ```

### Brightness

- Get
    ```javascript
    var brightness = pipelineInstance.brightness;
    ```
- Set
    ```javascript
    pipelineInstance.brightness = brightness;
    // pipelineInstance.brightness += value;
    ```
    or
    ```javascript
    pipelineInstance.setBrightness(radius);
    ```
    - `brightness` : 0(black) ~ 1(white)
