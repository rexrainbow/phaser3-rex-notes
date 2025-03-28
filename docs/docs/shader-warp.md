## Introduction

Warp post processing filter. 

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Warp](https://codepen.io/rexrainbow/pen/dymddOj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-warp)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexwarpfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwarpfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexWarp(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexwarpfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexWarp(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexwarpfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import WarpFilterPlugin from 'phaser3-rex-plugins/plugins/warpfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexWarpFilter',
                plugin: WarpFilterPlugin,
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
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexWarp(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexWarpFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexWarp(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexWarpFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { WarpFilter, WarpController } from 'phaser3-rex-plugins/plugins/warpfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(WarpFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(WarpFilter.FilterName, WarpFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new WarpController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new WarpController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 warp effect.
    ```javascript
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexWarp({
        // frequencyX: 10,
        // frequencyY: 10,

        // amplitudeX: 10,
        // amplitudeY: 10,

        // speedX: 0,
        // speedY: 0,
        // speedEnable: 

        // name: 'rexWarpPostFx'
    });
    ```
    - `frequencyX`, `frequencyY` : Horizontal/vertical frequency, in pixel.
    - `amplitudeX`, `amplitudeY` : Horizontal/vertical amplitude, in pixel.
    - `speedX`, `speedY` : Horizontal/vertical speed.
    - `speedEnable`
        - `true` : Enable speed. Default value if `speedX` or `speedY` is not `0`.
        - `false` : Disable speed. Default value if `speedX` and `speedY` are both `0`.

- Apply effect to camera. A camera only can add 1 warp effect.
    ```javascript
    var controller = scene.plugins.get('rexWarpFilter').add(camera, config);
    ```

### Disable effect

```javascript
controller.setActive(false);
// controller.active = false;
```

### Remove effect

- Remove effect from game object
    ```javascript
    var filterList = gameObject.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexWarpFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexWarpFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexWarpFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexWarpFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexWarpFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexWarpFilter').get(camera);
    ```

### Frequency

Horizontal/vertical frequency, in pixel.

- Get
    ```javascript
    var frequencyX = controller.frequencyX;
    var frequencyY = controller.frequencyY;
    ```
- Set
    ```javascript
    controller.frequencyX = frequencyX;
    controller.frequencyY = frequencyY;
    // controller.frequencyX += value;
    // controller.frequencyY += value;
    ```
    or
    ```javascript
    controller.setFrequencyX(frequencyX);
    controller.setFrequencyY(frequencyY);
    controller.setFrequency(frequencyX, frequencyY);
    ```

### Amplitude

Horizontal/vertical amplitude, in pixel.

- Get
    ```javascript
    var amplitudeX = controller.amplitudeX;
    var amplitudeY = controller.amplitudeY;
    ```
- Set
    ```javascript
    controller.amplitudeX = amplitudeX;
    controller.amplitudeY = amplitudeY;
    // controller.amplitudeX += value;
    // controller.amplitudeY += value;
    ```
    or
    ```javascript
    controller.setAmplitudeX(amplitudeX);
    controller.setAmplitudeY(amplitudeY);
    controller.setAmplitude(amplitudeX, amplitudeY);
    ```

### Speed

Horizontal/vertical speed.

- Eanble/resume
    ```javascript
    controller.setSpeedEnable();
    ```
- Pause
    ```javascript
    controller.setSpeedEnable(false);
    ```
- Get
    ```javascript
    var speedX = controller.speedX;
    var speedY = controller.speedY;
    ```
- Set
    ```javascript
    controller.speedX = speedX;
    controller.speedY = speedY;
    // controller.speedX += value;
    // controller.speedY += value;
    ```
    or
    ```javascript
    controller.setSpeedX(speedX);
    controller.setSpeedY(speedY);
    controller.setSpeed(speedX, speedY);
    ```