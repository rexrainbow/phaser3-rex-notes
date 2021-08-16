## Introduction

Split image into 4 parts.

- Author: Rex
- A post-fx shader effect

## Live demos

- [Split](https://codepen.io/rexrainbow/pen/oNZreWK)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-split)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexsplitpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsplitpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexsplitpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexsplitpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SplitPipelinePlugin from 'phaser3-rex-plugins/plugins/splitpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSplitPipeline',
                plugin: SplitPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexSplitPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexSplitPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import SplitPostFx from 'phaser3-rex-plugins/plugins/splitpipeline.js';
    var config = {
        // ...
        pipeline: [SplitPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(SplitPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(SplitPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 split effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSplitPipeline').add(gameObject, {
        // x: undefined,  // renderer.width / 2
        // y: undefined,  // renderer.height / 2

        // width: undefined,
        // left: 0,
        // right: 0,
        // height: undefined,
        // top: 0,
        // bottom: 0,

        // angle: undefined,  // Degrees
        // rotation: 0,       // Radian

        // shiftEnable: true,

        // name: 'rexSplitPostFx'
    });
    ```
    - `x` : Vertical split position. Default value is center of **render width**.
    - `y` : Horizontal split position. Default value is center of **render height**.
    - `width`, `height` : Vertical/Horizontal split length.
    - `left`, `right` : Specify left/right part length of vertical split. Default value is half Vertical split length.
    - `top`, `bottom` : Specify top/bottom part length of horizontal split. Default value is half Horizontal split length.
    - `angle`, `rotation` : Rotation of split axis. Default value is `0`.
    - `shiftEnable` :
        - `true` : Shift splitted parts out. Default value.
        - `false` : Don't shift splitted parts. Equal to apply mask on this image.
- Apply effect to camera. A camera only can add 1 split effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSplitPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexSplitPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexSplitPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSplitPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexSplitPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexSplitPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexSplitPipeline').get(camera);
    ```

### Split position

- Get
    ```javascript
    var splitX = pipelineInstance.splitX;
    var splitY = pipelineInstance.splitY;
    ```
- Set
    ```javascript
    pipelineInstance.splitX = splitX;
    pipelineInstance.splitY = splitY;
    ```
    or
    ```javascript
    pipelineInstance.setSplit(x, y);
    ```

#### Split at center of render

```javascript
pipelineInstance.splitAtCenter();
// pipelineInstance.splitAtCenter(width, height);
```

### Split length

- Get
    ```javascript
    var splittedWidth = pipelineInstance.splittedWidth;
    var splittedHeight = pipelineInstance.splittedHeight;
    ```
- Set
    ```javascript
    pipelineInstance.splittedWidth = splittedWidth;
    pipelineInstance.splittedHeight = splittedHeight;
    ```
    or
    ```javascript
    pipelineInstance.setSplittedWidth(splittedWidth);
    pipelineInstance.setSplittedHeight(splittedHeight);
    ```

or specify left/right/top/bottom of split length

- Get
    ```javascript
    var left = pipelineInstance.spaceLeft;
    var right = pipelineInstance.spaceRight;
    var top = pipelineInstance.spaceTop;
    var bottom = pipelineInstance.spaceBottom;
    ```
- Set
    ```javascript
    pipelineInstance.spaceLeft = left;
    pipelineInstance.spaceRight = right;
    pipelineInstance.spaceTop = top;
    pipelineInstance.spaceBottom = bottom;
    ```
    or
    ```javascript
    pipelineInstance.setSpace(left, right, top, bottom);
    ```

### Rotation Axis of Split edge

- Get
    ```javascript
    var rotation = pipelineInstance.rotation;  // radians
    // var angle = pipelineInstance.angle;     // degrees
    ```
- Set
    ```javascript
    pipelineInstance.rotation = rotation;
    pipelineInstance.rotation += value;
    // pipelineInstance.angle = angle;
    // pipelineInstance.angle += value;
    ```
    or
    ```javascript
    pipelineInstance.setRotation(rotation);
    // pipelineInstance.setAngle(angle);
    ```

### Shift enable

- Get
    ```javascript
    var enable = pipelineInstance.shiftEnable;
    ```
- Set
    ```javascript
    pipelineInstance.shiftEnable = enable;
    ```
    or
    ```javascript
    pipelineInstance.setShiftEnable(enable);
    ```