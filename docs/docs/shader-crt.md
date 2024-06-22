## Introduction

CRT post processing filter. [Reference](https://www.shadertoy.com/view/WsVSzV)

- Author: Rex
- A post-fx shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [CRT](https://codepen.io/rexrainbow/pen/qBGoeOO)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-crt)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcrtpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcrtpipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcrtpipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexcrtpipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CrtPipelinePlugin from 'phaser3-rex-plugins/plugins/crtpipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCrtPipeline',
                plugin: CrtPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexCrtPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexCrtPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import CrtPostFx from 'phaser3-rex-plugins/plugins/crtpipeline.js';
    var config = {
        // ...
        pipeline: [CrtPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(CrtPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(CrtPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 crt effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrtPipeline').add(gameObject, {
        // warpX: 0.75,
        // warpY: 0.75,
        // scanStrength: 0.2,
        // scanLineWidth: 1024,
        
        // name: 'rexCrtPostFx'
    });
    ```
    - `warpX`, `warpY` : Horizontal and Vertical warp.
    - `scanStrength`, `scanLineWidth` : Scan line parameters.
- Apply effect to camera. A camera only can add 1 crt effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrtPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexCrtPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexCrtPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrtPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexCrtPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexCrtPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexCrtPipeline').get(camera);
    ```

### Warp

- Get
    ```javascript
    var warpX = pipelineInstance.warpX;
    var warpY = pipelineInstance.warpY;
    ```
- Set
    ```javascript
    pipelineInstance.setWarp(warpX, warpY);
    ```
    or
    ```javascript
    pipelineInstance.warpX = warpX;
    pipelineInstance.warpY = warpY;
    ```

### Scan lines

- Get
    ```javascript
    var scanStrength = pipelineInstance.scanStrength;
    var scanLineWidth = pipelineInstance.scanLineWidth;
    ```
- Set
    ```javascript
    pipelineInstance.setScanStrength(scanStrength);
    pipelineInstance.setScanLineWidth(scanLineWidth);
    ```
    or
    ```javascript
    pipelineInstance.scanStrength = scanStrength;
    pipelineInstance.scanLineWidth = scanLineWidth;
    ```
