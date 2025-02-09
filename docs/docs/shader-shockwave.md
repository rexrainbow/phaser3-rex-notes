## Introduction

Shockwave post processing filter. [Reference](https://www.geeks3d.com/20091116/shader-library-2d-shockwave-post-processing-filter-glsl/)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Shockwave](https://codepen.io/rexrainbow/pen/PopeyLv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-shockwave)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexshockwavefilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshockwavefilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rexshockwavefilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexshockwavefilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ShockwaveFilterPlugin from 'phaser3-rex-plugins/plugins/shockwavefilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexShockwaveFilter',
                plugin: ShockwaveFilterPlugin,
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
        var controller = scene.plugins.get('rexShockwaveFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexShockwaveFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { ShockwaveFilter, ShockwaveController } from 'phaser3-rex-plugins/plugins/shockwavefilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(ShockwaveFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(ShockwaveFilter.FilterName, ShockwaveFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new ShockwaveController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new ShockwaveController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 shockwave effect.
    ```javascript
    var controller = scene.plugins.get('rexShockwaveFilter').add(gameObject, {
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // waveRadius: 0,
        // waveWidth: 20,
        // powBaseScale: 0.8,
        // powExponent: 0.1,

        // name: 'rexShockwavePostFx'
    });
    ```
    - `waveRadius` : Radius of shockwave, in pixels.
    - `waveWidth` : Width of shockwave, in pixels.
    - `powBaseScale`, `powExponent` : Parameters of shockwave.
- Apply effect to camera. A camera only can add 1 shockwave effect.
    ```javascript
    var controller = scene.plugins.get('rexShockwaveFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexShockwaveFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexShockwaveFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexShockwaveFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexShockwaveFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexShockwaveFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexShockwaveFilter').get(camera);
    ```

### Wave radius

- Get
    ```javascript
    var waveRadius = controller.waveRadius;
    ```
- Set
    ```javascript
    controller.waveRadius = waveRadius;
    ```
    or
    ```javascript
    controller.setWaveRadius(waveRadius);
    ```

### Wave width

- Get
    ```javascript
    var waveWidth = controller.waveWidth;
    ```
- Set
    ```javascript
    controller.waveWidth = waveWidth;
    ```
    or
    ```javascript
    controller.setWaveWidth(waveWidth);
    ```
