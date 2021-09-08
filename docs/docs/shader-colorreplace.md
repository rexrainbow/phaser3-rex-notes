## Introduction

Replace color post processing filter. [Reference](https://github.com/pixijs/filters/blob/main/filters/color-replace/src/colorReplace.frag)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Color replace](https://codepen.io/rexrainbow/pen/mdwRpvW)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-colorreplace)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcolorreplacepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcolorreplacepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcolorreplacepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcolorreplacepipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ColorReplacePipelinePlugin from 'phaser3-rex-plugins/plugins/colorreplacepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexColorReplacePipeline',
                plugin: ColorReplacePipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import ColorReplacePostFx from 'phaser3-rex-plugins/plugins/colorreplacepipeline.js';
    var config = {
        // ...
        pipeline: [ColorReplacePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(ColorReplacePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(ColorReplacePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 colorreplace effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').add(gameObject, {
        originalColor: 0xFF0000,
        newColor: 0x000000,
        // epsilon: 0.4,
        
        // name: 'rexColorReplacePostFx'
    });
    ```
    - `originalColor` : The color (`0xRRGGBB`) that will be changed.
    - `newColor` : The resulting color (`0xRRGGBB`).
    - `epsilon` : Tolerance/sensitivity of the floating-point comparison between colors (lower = more exact, higher = more inclusive)    
- Apply effect to camera. A camera only can add 1 colorreplace effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexColorReplacePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexColorReplacePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexColorReplacePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexColorReplacePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexColorReplacePipeline').get(camera);
    ```

### Original color

- Get
    ```javascript
    var color = pipelineInstance.originalColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.setOriginalColor(value);
    ```
    ```javascript
    pipelineInstance.originalColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### New color

- Get
    ```javascript
    var color = pipelineInstance.newColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.setNewColor(value);
    ```
    ```javascript
    pipelineInstance.newColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Epsilon

- Get
    ```javascript
    var epsilon = pipelineInstance.epsilon;
    ```
- Set
    ```javascript
    pipelineInstance.epsilon = epsilon;
    // pipelineInstance.epsilon += value;
    ```
    or
    ```javascript
    pipelineInstance.setEpsilon(value);
    ```