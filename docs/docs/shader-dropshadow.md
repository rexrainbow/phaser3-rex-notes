## Introduction

Drop-shadow post processing filter. [Reference](https://github.com/pixijs/filters/blob/main/filters/drop-shadow/src/dropshadow.frag)

- Author: Rex
- A post-fx shader effect

## Live demos

- [Drop-shadow](https://codepen.io/rexrainbow/pen/wveyQyG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-dropshadow)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdropshadowpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropshadowpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexdropshadowpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexdropshadowpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DropShadowPipelinePlugin from 'phaser3-rex-plugins/plugins/dropshadowpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDropShadowPipeline',
                plugin: DropShadowPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import DropShadowPostFx from 'phaser3-rex-plugins/plugins/dropshadowpipeline.js';
    var config = {
        // ...
        pipeline: [DropShadowPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(DropShadowPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(DropShadowPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 dropshadow effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').add(gameObject, {
        // ** Offset **
        // rotation: 
        // angle: 45,      // degrees
        // distance: 5,

        // ** Shadow color **
        // shadowColor: 0xffffff,
        // alpha: 0.5,

        // shadowOnly: false,

        // ** Parameters of KawaseBlur **
        // blur: 4,
        // quality: 3,
        // pixelWidth: 1,
        // pixelHeight: 1,

        // name: 'rexDropShadowPostFx'
    });
    ```
    - Offset
        - `rotation`, `angle` : The angle of the shadow in radians/degrees.
        - `distance` : Distance of shadow.
    - Color
        - `shadowColor` : Color of the shadow.
        - `alpha` : Alpha of the shadow.
    - `shadowOnly` : Whether render shadow only.
    - Parameters of KawaseBlur
        - `blur` : The blur of the filter. Should be greater than `0`. If value is an Array, setting kernels.
        - `quality` : The quality of the filter. Should be an integer greater than `1`.    
        - `pixelWidth`, `pixelHeight` : Sets the pixel size of the filter. Large size is blurrier. For advanced usage.
- Apply effect to camera. A camera only can add 1 dropshadow effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexDropShadowPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexDropShadowPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexDropShadowPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDropShadowPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexDropShadowPipeline').get(camera);
    ```

### Rotation

- Get
    ```javascript
    var rotation = pipelineInstance.rotation;  // radians
    // var angle = pipelineInstance.angle;     // degrees
    ```
- Set
    ```javascript
    pipelineInstance.rotation = rotation;   // radians
    // pipelineInstance.angle = angle;      // degrees
    ```
    or
    ```javascript
    pipelineInstance.setRotation(radians);
    pipelineInstance.setAngle(degrees);
    ```

### Distance

- Get
    ```javascript
    var distance = pipelineInstance.distance;
    ```
- Set
    ```javascript
    pipelineInstance.distance = distance;
    // pipelineInstance.distance += value;
    ```
    or
    ```javascript
    pipelineInstance.setDistance(distance);
    ```

### Shadow color

- Get
    ```javascript
    var color = pipelineInstance.shadowColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    pipelineInstance.setShadowColor(value);
    ```
    ```javascript
    pipelineInstance.shadowColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Alpha

- Get
    ```javascript
    var alpha = pipelineInstance.alpha;
    ```
- Set
    ```javascript
    pipelineInstance.alpha = alpha;
    ```
    or
    ```javascript
    pipelineInstance.setAlpha(alpha);
    ```

### Shadow-only

- Get
    ```javascript
    var enable = pipelineInstance.shadowOnly;
    ```
- Set
    ```javascript
    pipelineInstance.shadowOnly = enable;
    ```
    or
    ```javascript
    pipelineInstance.setShadowOnly(enable);
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
