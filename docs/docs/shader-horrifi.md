## Introduction

6-in-1 effect

- Bloom
- Chromatic Abberation
- Scanlines
- VHS Distortion
- CRT TV Curve
- Noise
- Vignette

Reference : [Horri-fi shader effect](https://gizmo199.itch.io/horri-fi)

- Author: Rex
- A filter shader effect

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
    scene.load.plugin('rexhorrififilterlugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhorrififilterlugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rexhorrififilterlugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexhorrififilterlugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HorrifiFilterPlugin from 'phaser3-rex-plugins/plugins/horrifipipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexHorrifiFilter',
                plugin: HorrifiFilterPlugin,
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
        var controller = scene.plugins.get('rexHorrifiFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexHorrifiFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { HorrifiFilter, HorrifiController } from 'phaser3-rex-plugins/plugins/horrifipipeline.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(HorrifiFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(HorrifiFilter.FilterName, HorrifiFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new HorrifiController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new HorrifiController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object.
    ```javascript
    var controller = scene.plugins.get('rexHorrifiFilter').add(gameObject, {
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
        noiseSeed: 0,

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
        - `noiseSeed`
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
    var controller = scene.plugins.get('rexHorrifiFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexHorrifiFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexHorrifiFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexHorrifiFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexHorrifiFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexHorrifiFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexHorrifiFilter').get(camera);
    ```

### Bloom

#### Enable

- Enable
    ```javascript
    controller.setBloomEnable();
    // controller.setBloomEnable(true);
    ```
    or
    ```javascript
    controller.bloomEnable = true;
    ```
- Disable
    ```javascript
    controller.setBloomEnable(false);
    ```
    or
    ```javascript
    controller.bloomEnable = false;
    ```
- Get
    ```javascript
    var bloomEnable = controller.bloomEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setBloomRadius(value);
    controller.setBloomIntensity(value);
    controller.setBloomThreshold(value);
    controller.setBloomTexelSize(width, height);
    ```
    or
    ```javascript
    controller.bloomRadius = value;
    controller.bloomIntensity = value;
    controller.bloomThreshold = value;
    controller.bloomTexelWidth = width;
    controller.bloomTexelHeight = height;
    ```
- Get
    ```javascript
    var bloomRadius = controller.bloomRadius;
    var bloomIntensity = controller.bloomIntensity;
    var bloomThreshold = controller.bloomThreshold;
    var bloomTexelWidth = controller.bloomTexelWidth;
    var bloomTexelHeight = controller.bloomTexelHeight;
    ```

### Chromatic abberation

#### Enable

- Enable
    ```javascript
    controller.setChromaticEnable();
    // controller.setChromaticEnable(true);
    ```
    or
    ```javascript
    controller.chromaticEnable = true;
    ```
- Disable
    ```javascript
    controller.setChromaticEnable(false);
    ```
    or
    ```javascript
    controller.chromaticEnable = false;
    ```
- Get
    ```javascript
    var chromaticEnable = controller.chromaticEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setChabIntensity(value);
    ```
    or
    ```javascript
    controller.chabIntensity = value;
    ```
- Get
    ```javascript
    var chabIntensity = controller.chabIntensity;
    ```

### Vignette

#### Enable

- Enable
    ```javascript
    controller.setVignetteEnable();
    // controller.setVignetteEnable(true);
    ```
    or
    ```javascript
    controller.vignetteEnable = true;
    ```
- Disable
    ```javascript
    controller.setVignetteEnable(false);
    ```
    or
    ```javascript
    controller.vignetteEnable = false;
    ```
- Get
    ```javascript
    var vignetteEnable = controller.vignetteEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setVignetteStrength(value);
    controller.setVignetteIntensity(value);
    ```
    or
    ```javascript
    controller.vignetteStrength = value;
    controller.vignetteIntensity = value;
    ```
- Get
    ```javascript
    var vignetteStrength = controller.vignetteStrength;
    var vignetteIntensity = controller.vignetteIntensity;
    ```

### Noise

#### Enable

- Enable
    ```javascript
    controller.setNoiseEnable();
    // controller.setNoiseEnable(true);
    ```
    or
    ```javascript
    controller.noiseEnable = true;
    ```
- Disable
    ```javascript
    controller.setNoiseEnable(false);
    ```
    or
    ```javascript
    controller.noiseEnable = false;
    ```
- Get
    ```javascript
    var noiseEnable = controller.noiseEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setNoiseStrength(value);
    controller.setNoiseSeed(value);
    ```
    or
    ```javascript
    controller.noiseStrength = value;
    controller.noiseSeed = value;
    ```
- Get
    ```javascript
    var noiseStrength = controller.noiseStrength;
    var noiseSeed = controller.noiseSeed;
    ```

### VHS

#### Enable

- Enable
    ```javascript
    controller.setVHSEnable();
    // controller.setVHSEnable(true);
    ```
    or
    ```javascript
    controller.vhsEnable = true;
    ```
- Disable
    ```javascript
    controller.setVHSEnable(false);
    ```
    or
    ```javascript
    controller.vhsEnable = false;
    ```
- Get
    ```javascript
    var vhsEnable = controller.vhsEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setVhsStrength(value);
    ```
    or
    ```javascript
    controller.vhsStrength = value;
    ```
- Get
    ```javascript
    var vhsStrength = controller.vhsStrength;
    ```

### Scanlines

#### Enable

- Enable
    ```javascript
    controller.setScanlinesEnable();
    // controller.setScanlinesEnable(true);
    ```
    or
    ```javascript
    controller.scanlinesEnable = true;
    ```
- Disable
    ```javascript
    controller.setScanlinesEnable(false);
    ```
    or
    ```javascript
    controller.scanlinesEnable = false;
    ```
- Get
    ```javascript
    var scanlinesEnable = controller.scanlinesEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setScanStrength(value);
    ```
    or
    ```javascript
    controller.scanStrength = value;
    ```
- Get
    ```javascript
    var scanStrength = controller.scanStrength;
    ```

### CRT

#### Enable

- Enable
    ```javascript
    controller.setCRTEnable();
    // controller.setCRTEnable(true);
    ```
    or
    ```javascript
    controller.crtEnable = true;
    ```
- Disable
    ```javascript
    controller.setCRTEnable(false);
    ```
    or
    ```javascript
    controller.crtEnable = false;
    ```
- Get
    ```javascript
    var crtEnable = controller.crtEnable;
    ```

#### Parameters

- Set
    ```javascript
    controller.setCrtSize(width, height);
    ```
    or
    ```javascript
    controller.crtWidth = width;
    controller.crtHeight = height;
    ```
- Get
    ```javascript
    var crtWidth = controller.crtWidth;
    var crtHeight = controller.crtHeight;
    ```

### Enable all effects

- Enable all
    ```javascript
    controller.setEnable();
    // controller.setEnable(true);
    ```
- Disable all
    ```javascript
    controller.setEnable(false);
    ```
