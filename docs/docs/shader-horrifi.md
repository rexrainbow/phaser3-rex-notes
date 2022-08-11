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

#### Enable

- Enable
    ```javascript
    pipelineInstance.setBloomEnable();
    // pipelineInstance.setBloomEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.bloomEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setBloomEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.bloomEnable = false;
    ```
- Get
    ```javascript
    var bloomEnable = pipelineInstance.bloomEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setBloomRadius(value);
    pipelineInstance.setBloomIntensity(value);
    pipelineInstance.setBloomThreshold(value);
    pipelineInstance.setBloomTexelSize(width, height);
    ```
    or
    ```javascript
    pipelineInstance.bloomRadius = value;
    pipelineInstance.bloomIntensity = value;
    pipelineInstance.bloomThreshold = value;
    pipelineInstance.bloomTexelWidth = width;
    pipelineInstance.bloomTexelHeight = height;
    ```
- Get
    ```javascript
    var bloomRadius = pipelineInstance.bloomRadius;
    var bloomIntensity = pipelineInstance.bloomIntensity;
    var bloomThreshold = pipelineInstance.bloomThreshold;
    var bloomTexelWidth = pipelineInstance.bloomTexelWidth;
    var bloomTexelHeight = pipelineInstance.bloomTexelHeight;
    ```

### Chromatic abberation

#### Enable

- Enable
    ```javascript
    pipelineInstance.setChromaticEnable();
    // pipelineInstance.setChromaticEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.chromaticEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setChromaticEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.chromaticEnable = false;
    ```
- Get
    ```javascript
    var chromaticEnable = pipelineInstance.chromaticEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setChabIntensity(value);
    ```
    or
    ```javascript
    pipelineInstance.chabIntensity = value;
    ```
- Get
    ```javascript
    var chabIntensity = pipelineInstance.chabIntensity;
    ```

### Vignette

#### Enable

- Enable
    ```javascript
    pipelineInstance.setVignetteEnable();
    // pipelineInstance.setVignetteEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.vignetteEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setVignetteEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.vignetteEnable = false;
    ```
- Get
    ```javascript
    var vignetteEnable = pipelineInstance.vignetteEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setVignetteStrength(value);
    pipelineInstance.setVignetteIntensity(value);
    ```
    or
    ```javascript
    pipelineInstance.vignetteStrength = value;
    pipelineInstance.vignetteIntensity = value;
    ```
- Get
    ```javascript
    var vignetteStrength = pipelineInstance.vignetteStrength;
    var vignetteIntensity = pipelineInstance.vignetteIntensity;
    ```

### Noise

#### Enable

- Enable
    ```javascript
    pipelineInstance.setNoiseEnable();
    // pipelineInstance.setNoiseEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.noiseEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setNoiseEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.noiseEnable = false;
    ```
- Get
    ```javascript
    var noiseEnable = pipelineInstance.noiseEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setNoiseStrength(value);
    pipelineInstance.setSeed(value);
    ```
    or
    ```javascript
    pipelineInstance.noiseStrength = value;
    pipelineInstance.seed = value;
    ```
- Get
    ```javascript
    var noiseStrength = pipelineInstance.noiseStrength;
    var seed = pipelineInstance.seed;
    ```

### VHS

#### Enable

- Enable
    ```javascript
    pipelineInstance.setVHSEnable();
    // pipelineInstance.setVHSEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.vhsEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setVHSEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.vhsEnable = false;
    ```
- Get
    ```javascript
    var vhsEnable = pipelineInstance.vhsEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setVhsStrength(value);
    ```
    or
    ```javascript
    pipelineInstance.vhsStrength = value;
    ```
- Get
    ```javascript
    var vhsStrength = pipelineInstance.vhsStrength;
    ```

### Scanlines

#### Enable

- Enable
    ```javascript
    pipelineInstance.setScanlinesEnable();
    // pipelineInstance.setScanlinesEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.scanlinesEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setScanlinesEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.scanlinesEnable = false;
    ```
- Get
    ```javascript
    var scanlinesEnable = pipelineInstance.scanlinesEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setScanStrength(value);
    ```
    or
    ```javascript
    pipelineInstance.scanStrength = value;
    ```
- Get
    ```javascript
    var scanStrength = pipelineInstance.scanStrength;
    ```

### CRT

#### Enable

- Enable
    ```javascript
    pipelineInstance.setCRTEnable();
    // pipelineInstance.setCRTEnable(true);
    ```
    or
    ```javascript
    pipelineInstance.crtEnable = true;
    ```
- Disable
    ```javascript
    pipelineInstance.setCRTEnable(false);
    ```
    or
    ```javascript
    pipelineInstance.crtEnable = false;
    ```
- Get
    ```javascript
    var crtEnable = pipelineInstance.crtEnable;
    ```

#### Parameters

- Set
    ```javascript
    pipelineInstance.setCrtSize(width, height);
    ```
    or
    ```javascript
    pipelineInstance.crtWidth = width;
    pipelineInstance.crtHeight = height;
    ```
- Get
    ```javascript
    var crtWidth = pipelineInstance.crtWidth;
    var crtHeight = pipelineInstance.crtHeight;
    ```

### Enable all effects

- Enable all
    ```javascript
    pipelineInstance.setEnable();
    // pipelineInstance.setEnable(true);
    ```
- Disable all
    ```javascript
    pipelineInstance.setEnable(false);
    ```
