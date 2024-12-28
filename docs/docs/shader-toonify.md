## Introduction

Draw outlines and quantize color in HSV domain. [Reference](https://www.geeks3d.com/20140523/glsl-shader-library-toonify-post-processing-filter/)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Toonify](https://codepen.io/rexrainbow/pen/ErWNXa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-toonify)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextoonifyfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextoonifyfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rextoonifyfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rextoonifyfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ToonifyFilterPlugin from 'phaser3-rex-plugins/plugins/toonifyfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexToonifyFilter',
                plugin: ToonifyFilterPlugin,
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
        var controller = scene.plugins.get('rexToonifyFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexToonifyFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { ToonifyFilter, ToonifyController } from 'phaser3-rex-plugins/plugins/toonifyfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(ToonifyFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(ToonifyFilter.FilterName, ToonifyFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new ToonifyController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new ToonifyController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object.
    ```javascript
    var controller = scene.plugins.get('rexToonifyFilter').add(gameObject, {
        // edgeThreshold: 0.2,
        // hueLevels: 0,
        // sLevels: 0,
        // vLevels: 0,
        // edgeColor: 0,

        // name: 'rexToonifyPostFx'
    });
    ```
    - `edgeThreshold` : Threshold of edge. Set `1.1` (or any number larger then `1`) to disable this feature.
    - `hueLevels` : Amount of hue levels. Set `0` to disable this feature.
    - `sLevels` : Amount of saturation levels. Set `0` to disable this feature.
    - `vLevels` : Amount of value levels. Set `0` to disable this feature.
    - `edgeColor` : Color of edge, could be a number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`
- Apply effect to camera.
    ```javascript
    var controller = scene.plugins.get('rexToonifyFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexToonifyFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexToonifyFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexToonifyFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexToonifyFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexToonifyFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexToonifyFilter').get(camera);
    ```

### Edge threshold

- Get
    ```javascript
    var edgeThreshold = controller.edgeThreshold;
    ```
- Set
    ```javascript
    controller.edgeThreshold = edgeThreshold;
    ```
    or
    ```javascript
    controller.setEdgeThreshold(value);
    ```
    - Set `1.1` (or any number larger then `1`) to disable this feature.

### Hue levels

- Get
    ```javascript
    var hueLevels = controller.hueLevels;
    ```
- Set
    ```javascript
    controller.hueLevels = hueLevels;
    ```
    or
    ```javascript
    controller.setHueLevels(value);
    ```
    - Set `0` to disable this feature.

### Saturation levels

- Get
    ```javascript
    var satLevels = controller.satLevels;
    ```
- Set
    ```javascript
    controller.satLevels = satLevels;
    ```
    or
    ```javascript
    controller.setSatLevels(value);
    ```
    - Set `0` to disable this feature.

### Value levels

- Get
    ```javascript
    var valLevels = controller.valLevels;
    ```
- Set
    ```javascript
    controller.valLevels = valLevels;
    ```
    or
    ```javascript
    controller.setValLevels(value);
    ```
    - Set `0` to disable this feature.

### Edge color

- Get
    ```javascript
    var color = controller.edgeColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    controller.setEdgeColor(value);
    ```
    or
    ```javascript
    controller.edgeColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`
