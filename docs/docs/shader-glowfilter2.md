## Introduction

Glow post processing filter, port from pixi. [Reference](https://github.com/pixijs/filters/blob/main/filters/glow/src/glow.frag)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Glow filter](https://codepen.io/rexrainbow/pen/WNOoNyj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-glowfilter2)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexglowfilter2pipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilter2pipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexglowfilter2pipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexglowfilter2pipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGlowFilterPipeline',
                plugin: GlowFilterPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import GlowFilterPostFx from 'phaser3-rex-plugins/plugins/glowfilter2pipeline.js';
    var config = {
        // ...
        pipeline: [GlowFilterPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(GlowFilterPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(GlowFilterPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 glowfilter effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(gameObject, {    
        // outerStrength: 4,
        // innerStrength: 0,
        // glowColor: 0xffffff,
        // knockout: false,

        // distance: 10,
        // quality: 0.1,

        // name: 'rexGlowFilterPostFx'
    });
    ```    
    - `outerStrength` : The strength of the glow outward from the edge of the texture.
    - `innerStrength` : The strength of the glow inward from the edge of the texture.
    - `glowColor` : The color of the glow.
    - `knockout` :
        - `true` : Only show effect.
        - `false` : Show content and effect.
    - `distance` : The distance of the glow. It can't be changed after filter creation.
    - `quality` : 0~1. The higher the number the less performant. It can't be changed after filter creation.
- Apply effect to camera. A camera only can add 1 glowfilter effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexGlowFilterPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexGlowFilterPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexGlowFilterPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexGlowFilterPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexGlowFilterPipeline').get(camera);
    ```

### Outer strength

- Get
    ```javascript
    var outerStrength = pipelineInstance.outerStrength;
    ```
- Set
    ```javascript
    pipelineInstance.outerStrength = outerStrength;
    // pipelineInstance.outerStrength += value;
    ```
    or
    ```javascript
    pipelineInstance.setOuterStrength(value);
    ```

### Inner strength

- Get
    ```javascript
    var innerStrength = pipelineInstance.innerStrength;
    ```
- Set
    ```javascript
    pipelineInstance.innerStrength = innerStrength;
    // pipelineInstance.innerStrength += value;
    ```
    or
    ```javascript
    pipelineInstance.setInnerStrength(value);
    ```

### Glow color

- Get
    ```javascript
    var color = pipelineInstance.glowColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.setGlowColor(value);
    ```
    ```javascript
    pipelineInstance.glowColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Distance

The distance of the glow. Make it 2 times more for resolution=2. 
It can't be changed after filter creation.

- Get
    ```javascript
    var distance = pipelineInstance.distance;
    ```
- Set
    ```javascript
    pipelineInstance.setDistance(distance);
    ```
    or
    ```javascript
    pipelineInstance.distance = distance;
    ```
    - `distance` : The distance of the glow.

### Quality

A number between 0 and 1 that describes the quality of the glow. 
The higher the number the less performant.

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