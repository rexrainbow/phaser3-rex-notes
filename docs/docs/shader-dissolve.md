## Introduction

Dissolve transition post processing filter. ([Reference](https://github.com/ykob/glsl-dissolve/))

- Author: Rex
- A post-fx shader effect

## Live demos

- [Dissolve](https://codepen.io/rexrainbow/pen/BaQWqyX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-dissolve)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdissolvepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdissolvepipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexdissolvepipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexdissolvepipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DissolvePipelinePlugin from 'phaser3-rex-plugins/plugins/dissolvepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDissolvePipeline',
                plugin: DissolvePipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexDissolvePipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexDissolvePipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import DissolvePostFx from 'phaser3-rex-plugins/plugins/dissolvepipeline.js';
    var config = {
        // ...
        pipeline: [DissolvePostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(DissolvePostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(DissolvePostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 gray-scale effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDissolvePipeline').add(gameObject, {
        // toTexture: textureKey,
        // toFrame: frameName,
        // resizeMode: 1,

        // noiseX: undefined,
        // noiseY: undefined,
        // noiseZ: undefined,
        // fromEdgeStart: 0.01,
        // fromEdgeWidth: 0.05,
        // toEdgeStart: 0.01,
        // toEdgeWidth: 0.05,

        // progress: 0,
        
        // name: 'rexDissolvePostFx'
    });
    ```
    - `toTexture`, `toFrame` : Texture key and frame name of transition target texture.
    - `resizeMode` : Resize mode of transition target texture.
        - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
        - `1`, or `'contain'` : The target texture is resized to fit the source texture.
        - `2`, or `'cover'` : The target texture is resized to cover the source texture.
    - `noiseX`, `noiseY`, `noiseZ` : Parameter of Perline noise.
        - `undefined` : A random value.
    - `fromEdgeStart`, `fromEdgeWidth` : Dissolve edge start, edge width of from-texture (texture of game object, or render result of camera).
    - `toEdgeStart`, `toEdgeWidth` : Reveal edge start, edge width of to-texture.
- Apply effect to camera. A camera only can add 1 gray-scale effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDissolvePipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexDissolvePipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexDissolvePipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDissolvePipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexDissolvePipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexDissolvePipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexDissolvePipeline').get(camera);
    ```

### Transition target texture

- Get
    ```javascript
    var textureKey = pipelineInstance.toFrame.texture.key;
    var frameName = pipelineInstance.toFrame.name;
    ```
- Set
    ```javascript
    pipelineInstance.setTransitionTargetTexture(textureKey, frameName);
    // pipelineInstance.setTransitionTargetTexture(textureKey, frameName, resizeMode);
    ```

### Progress

- Get
    ```javascript
    var progress = pipelineInstance.progress;
    ```
- Set
    ```javascript
    pipelineInstance.setProgress(value);  // value: 0~1
    ```
    or
    ```javascript
    pipelineInstance.progress = value;  // value: 0~1
    ```

#### Resize mode

- Get
    ```javascript
    var mode = pipelineInstance.resizeMode;
    ```
- Set
    ```javascript
    pipelineInstance.setResizeMode(mode);
    ```
    - `mode` : 
        - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
        - `1`, or `'contain'` : The target texture is resized to fit the source texture.
        - `2`, or `'cover'` : The target texture is resized to cover the source texture.    

### Noise

- Get
    ```javascript
    var noiseX = pipelineInstance.noiseX;
    var noiseY = pipelineInstance.noiseY;
    var noiseZ = pipelineInstance.noiseZ;
    ```
- Set
    ```javascript
    pipelineInstance.noiseX = noiseX;
    pipelineInstance.noiseY = noiseY;
    pipelineInstance.noiseZ = noiseZ;
    ```
    or
    ```javascript
    pipelineInstance.setNoise(noiseX, noiseY, noiseZ);
    // pipelineInstance.setNoise(); // Passing 3 random float numbers
    ```

### Edge

- Get
    - From texture (texture of game object, or render result of camera)
        ```javascript
        var edgeStart = pipelineInstance.fromEdgeStart;
        var edgeWidth = pipelineInstance.fromEdgeWidth;
        ```
    - To texture (transition target texture)
        ```javascript
        var edgeStart = pipelineInstance.toEdgeStart;
        var edgeWidth = pipelineInstance.toEdgeWidth;
        ``` 
- Set
    - From texture (texture of game object, or render result of camera)
        ```javascript
        pipelineInstance.fromEdgeStart = edgeStart;
        pipelineInstance.fromEdgeWidth = edgeWidth;
        ```
        or
        ```javascript
        pipelineInstance.setFromEdge(edgeStart, edgeWidth);
        ```
        - `edgeStart` : `0`~`1`, default value is `0.01`
        - `edgeWidth` : `0`~`1`, default value is `0.05`
    - To texture (transition target texture)
        ```javascript
        pipelineInstance.toEdgeStart = edgeStart;
        pipelineInstance.toEdgeWidth = edgeWidth;
        ``` 
        or
        ```javascript
        pipelineInstance.setToEdge(edgeStart, edgeWidth);
        ```
        - `edgeStart` : `0`~`1`, default value is `0.01`
        - `edgeWidth` : `0`~`1`, default value is `0.05`