## Introduction

Outline post processing filter. [Reference](https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Outline](https://codepen.io/rexrainbow/pen/dyGNrqa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-outline)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexoutlinepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexoutlinepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexoutlinepipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexOutlinePipeline',
                plugin: OutlinePipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import OutlinePostFx from 'phaser3-rex-plugins/plugins/outlinepipeline.js';
    var config = {
        // ...
        pipeline: [OutlinePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(OutlinePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(OutlinePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 outline effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(gameObject, {
        // thickness: 3,
        // outlineColor: 0x000000,

        // quality: 0.1,

        // name: 'rexOutlinePostFx'
    });
    ```
    - `thickness` : Thickness of outline.
    - `outlineColor` : Color of outline.
    - `quality` : 0~1. The higher the number the less performant. It can't be changed after filter creation.
- Apply effect to camera. A camera only can add 1 outline effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexOutlinePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexOutlinePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexOutlinePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexOutlinePipeline').get(camera);
    ```

### Thickness

- Get
    ```javascript
    var thickness = pipelineInstance.thickness;
    ```
- Set
    ```javascript
    pipelineInstance.thickness = thickness;
    // pipelineInstance.thickness += value;
    ```
    or
    ```javascript
    pipelineInstance.setThickness(value);
    ```

### Outline color

- Get
    ```javascript
    var color = pipelineInstance.outlineColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.setOutlineColor(value);
    ```
    ```javascript
    pipelineInstance.outlineColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Quality

The quality of the outline from 0 to 1, using a higher quality setting will 
result in slower performance and more accuracy.

- Get
    ```javascript
    var quality = pipelineInstance.quality;
    ```
- Set
    ```javascript
    pipelineInstance.setQuality(quality);
    ```
    or
    ```javascript
    pipelineInstance.quality = quality;
    ```
    - `quality` : `0` ~ `1`, default is `0.1`.
        - `0.1` : 10 sample points.
        - `0.08` : 8 sample points.
        - `1` : 100 sample points.