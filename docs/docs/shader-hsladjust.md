!!! note
    Phaser3.60 has a built-in [Color Matrix effects](shader-builtin.md#colormatrix).

## Introduction

Adjust color in HSL domain, post processing filter.

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [HSL adjust](https://codepen.io/rexrainbow/pen/daPdoY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-hsladjust)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexhsladjustfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhsladjustfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rexhsladjustfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexhsladjustfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import HSLAdjustFilterPlugin from 'phaser3-rex-plugins/plugins/hsladjustfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexHSLAdjustFilter',
                plugin: HSLAdjustFilterPlugin,
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
        var controller = scene.plugins.get('rexHSLAdjustFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexHSLAdjustFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { HSLAdjustFilter, HSLAdjustController } from 'phaser3-rex-plugins/plugins/hsladjustfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(HSLAdjustFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(HSLAdjustFilter.FilterName, HSLAdjustFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new HSLAdjustController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new HSLAdjustController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 hsl-adjust effect.
    ```javascript
    var controller = scene.plugins.get('rexHslAdjustFilter').add(gameObject, {
        // hueRotate: 0,
        // satAdjust: 1,
        // lumAdjust: 0.5,

        // name: 'rexHslAdjustPostFx'
    });
    ```
    - `hueRotate` : Hue rotation
        - `0` : Rotate 0 degrees, original color (Default value)
        - `0.5` : Rotate 180 degrees
        - `1` : Rotate 360 degrees
    - `satAdjust` : Saturation adjustment
        - `0` : Gray
        - `1` : Original color (Default value)
        - `> 1` :
    - `lumAdjust` : Lumen adjustment
        - `0` : Dark
        - `0.5` : Original color (Default value)
        - `1` : White
- Apply effect to camera. A camera only can add 1 hsl-adjust effect.
    ```javascript
    var controller = scene.plugins.get('rexHslAdjustFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexHslAdjustFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexHslAdjustFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexHslAdjustFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexHslAdjustFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexHslAdjustFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexHslAdjustFilter').get(camera);
    ```

### Hue rotation

- Get
    ```javascript
    var hueRotate = controller.hueRotate;
    ```
- Set
    ```javascript
    controller.hueRotate = hueRotate;
    // controller.hueRotate += value;
    ```
    or
    ```javascript
    controller.setHueRotate(value);
    ```
    - `0` : Rotate 0 degrees, original color
    - `0.5` : Rotate 180 degrees
    - `1` : Rotate 360 degrees

### Saturation adjustment

- Get
    ```javascript
    var satAdjust = controller.satAdjust;
    ```
- Set
    ```javascript
    controller.satAdjust = satAdjust;
    // controller.satAdjust += value;
    ```
    or
    ```javascript
    controller.setSatAdjust(value);
    ```
    - `0` : Gray
    - `1` : Original color
    - `> 1` :

### Lumen adjustment

- Get
    ```javascript
    var lumAdjust = controller.lumAdjust;
    ```
- Set
    ```javascript
    controller.lumAdjust = lumAdjust;
    // controller.lumAdjust += value;
    ```
    or
    ```javascript
    controller.setLumAdjust(value);
    ```
    - `0` : Dark
    - `0.5` : Original color
    - `1` : White
