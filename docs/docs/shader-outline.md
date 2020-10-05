## Introduction

Outline post processing filter. [Reference](https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag)

- Author: Rex
- A camera filter

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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexoutlinepipelineplugin').add(scene, key, config);
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
- Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(scene, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import OutlinePipeline from 'phaser3-rex-plugins/plugins/outlinepipeline.js';
    ```
- Create pipeline instance
    ```javascript
    var pipelineInstance = new OutlinePipeline(scene, key, config);
    ```

### Apply filter

1. Create pipeline instance
    ```javascript
    var pipelineInstance = scene.plugins.get('rexOutlinePipeline').add(scene, key, {
        // thickness: 3,
        // outlineColor: 0x000000
    });
    ```
    - `thickness` : Thickness of outline.
    - `outlineColor` : Color of outline.
1. Add to render pipeline
    ```javascript
    scene.game.renderer.pipelines.add(pipelineName, pipelineInstance);
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
