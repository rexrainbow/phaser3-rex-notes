## Introduction

6-in-1 post processing filter

- Bloom
- Chromatic Abberation
- Scanlines
- VHS Distortion
- CRT TV Curve
- Noise
- Vignette

Reference : [Horri-fi shader effect](https://gizmo199.itch.io/horri-fi)

- Author: Rex
- A post-fx shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Horrifi](https://codepen.io/rexrainbow/pen/eYMjJMP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-horrifi)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhorrifipipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhorrifipipelineplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var pipelineInstance = scene.plugins.get('rexhorrifipipelineplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexhorrifipipelineplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HorrifiPipelinePlugin from 'phaser3-rex-plugins/plugins/horrifipipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexHorrifiPipeline',
                plugin: HorrifiPipelinePlugin,
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
        var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add to game config
    ```javascript
    import HorrifiPostFx from 'phaser3-rex-plugins/plugins/horrifipipeline.js';
    var config = {
        // ...
        pipeline: [HorrifiPostFx]
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.setPostPipeline(HorrifiPostFx);
        ```
    - Apply effect to camera
        ```javascript
        camera.setPostPipeline(HorrifiPostFx);
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 horrifi effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').add(gameObject, {
        enable: false,

        // Bloom
        bloomEnable: false,
        bloomRadius: 0, bloomIntensity: 0, bloomThreshold: 0,
        bloomTexelWidth: 0, bloomTexelHeight: 0,

        // Chromatic abberation
        chromaticEnable: false,
        chabIntensity: 0,

        // Vignette
        vignetteEnable: false,
        vignetteStrength: 0, vignetteIntensity: 0,

        // Noise
        noiseEnable: false,
        noiseStrength: 0,
        seed: 0,

        // VHS
        vhsEnable: false,
        vhsStrength: 0,

        // Scanlines
        scanlinesEnable: false,
        scanStrength: 0,

        // CRT
        crtEnable: false,
        crtWidth: 0, crtHeight: 0,

        // name: 'rexHorrifiPostFx'
    });
    ```
    - `enable` : Default `enable` value for all shader effects.
    - Bloom
        - `bloomEnable` : Set `true` to enable bloom effect.
        - `bloomRadius`, `bloomIntensity`, `bloomThreshold`
        - `bloomTexelWidth`, `bloomTexelHeight`
    - Chromatic abberation
        - `chromaticEnable` : Set `true` to enable chromatic abberation effect.
        - `chabIntensity`
    - Vignette
        - `vignetteEnable` : Set `true` to enable vignette effect.
        - `vignetteStrength`, `vignetteIntensity`
    - Noise
        - `noiseEnable` : Set `true` to enable noise effect.
        - `noiseStrength`
        - `seed`
    - VHS
        - `vhsEnable` : Set `true` to enable VHS effect.
        - `vhsStrength`
    - Scanlines
        - `scanlinesEnable` : Set `true` to enable Scanlines effect.
        - `scanStrength`
    - CRT
        - `crtEnable` : Set `true` to enable Scanlines effect.
        - `crtWidth`, `crtHeight`
- Apply effect to camera. A camera only can add 1 horrifi effect.
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexHorrifiPipeline').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexHorrifiPipeline').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').get(gameObject)[0];
    // var pipelineInstances = scene.plugins.get('rexHorrifiPipeline').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var pipelineInstance = scene.plugins.get('rexHorrifiPipeline').get(camera)[0];
    // var pipelineInstances = scene.plugins.get('rexHorrifiPipeline').get(camera);
    ```

### Bloom
