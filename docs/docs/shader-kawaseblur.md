## Introduction

Kawase-blur post processing filter. [Reference](https://github.com/pixijs/filters/blob/main/filters/kawase-blur/src/kawase-blur.frag)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Kawase-blur](https://codepen.io/rexrainbow/pen/zYzzYVw)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-kawaseblur)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexkawaseblurpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexkawaseblurpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexKawaseBlurPipeline',
                plugin: KawaseBlurPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import KawaseBlurPostFx from 'phaser3-rex-plugins/plugins/kawaseblurpipeline.js';
    var config = {
        // ...
        pipeline: [KawaseBlurPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(KawaseBlurPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(KawaseBlurPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 kawaseblur effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').add(gameObject, {
        // blur: 4,
        // quality: 3,
        // pixelWidth: 1,
        // pixelHeight: 1,

        // name: 'rexKawaseBlurPostFx'
    });
    ```
    - `blur` : The blur of the filter. Should be greater than `0`. If value is an Array, setting kernels.
    - `quality` : The quality of the filter. Should be an integer greater than `1`.    
    - `pixelWidth`, `pixelHeight` : Sets the pixel size of the filter. Large size is blurrier. For advanced usage.
- Apply effect to camera. A camera only can add 1 kawaseblur effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexKawaseBlurPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexKawaseBlurPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexKawaseBlurPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexKawaseBlurPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexKawaseBlurPipeline').get(camera);
    ```

### Blur

- Get
    ```javascript
    var blur = pipelineInstance.blur;
    ```
- Set
    ```javascript
    pipelineInstance.blur = blur;
    // pipelineInstance.blur += value;
    ```
    or
    ```javascript
    pipelineInstance.setBlur(value);
    ```

### Quality

- Get
    ```javascript
    var quality = pipelineInstance.quality;
    ```
- Set
    ```javascript
    pipelineInstance.quality = quality;
    // pipelineInstance.quality += value;
    ```
    or
    ```javascript
    pipelineInstance.setQuality(value);
    ```

### Pixel size

- Get
    ```javascript
    var pixelWidth = pipelineInstance.pixelWidth;
    var pixelHeight = pipelineInstance.pixelHeight;
    ```
- Set
    ```javascript
    pipelineInstance.pixelWidth = pixelWidth;
    pipelineInstance.pixelHeight = pixelHeight;
    ```
    or
    ```javascript
    pipelineInstance.setPixelWidth(pixelWidth);
    pipelineInstance.setPixelHeight(pixelHeight);
    pipelineInstance.setPixelSize(pixelWidth, pixelHeight);
    ```
