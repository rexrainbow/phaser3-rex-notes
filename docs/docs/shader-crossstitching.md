## Introduction

Cross-stitching post processing filter. [Reference](https://www.geeks3d.com/20110408/cross-stitching-post-processing-shader-glsl-filter-geexlab-pixel-bender/)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Cross-stitching](https://codepen.io/rexrainbow/pen/XWMEdYz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-crossstitching)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcrossstitchingfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcrossstitchingfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rexcrossstitchingfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexcrossstitchingfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CrossStitchingFilterPlugin from 'phaser3-rex-plugins/plugins/crossstitchingfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCrossStitchingFilter',
                plugin: CrossStitchingFilterPlugin,
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
        var controller = scene.plugins.get('rexCrossStitchingFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexCrossStitchingFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { CrossStitchingFilter, CrossStitchingController } from 'phaser3-rex-plugins/plugins/crossstitchingfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(CrossStitchingFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(CrossStitchingFilter.FilterName, CrossStitchingFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new CrossStitchingController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new CrossStitchingController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 cross-stitching effect.
    ```javascript
    var controller = scene.plugins.get('rexCrossStitchingFilter').add(gameObject, {
        // stitchingWidth: 6,
        // stitchingHeight: 6,
        // brightness: 0,

        // name: 'rexCrossStitchingPostFx'
    });
    ```
    - `stitchingWidth`, `stitchingHeight` : Stitching size.
    - `brightness` : Brightness of stitching edges
- Apply effect to camera. A camera only can add 1 cross-stitching effect.
    ```javascript
    var controller = scene.plugins.get('rexCrossStitchingFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexCrossStitchingFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexCrossStitchingFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexCrossStitchingFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexCrossStitchingFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexCrossStitchingFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexCrossStitchingFilter').get(camera);
    ```

### Stitching size

- Get
    ```javascript
    var stitchingWidth = controller.stitchingWidth;
    var stitchingHeight = controller.stitchingHeight;
    ```
- Set
    ```javascript
    controller.stitchingWidth = stitchingWidth;
    controller.stitchingHeight = stitchingHeight;
    // controller.stitchingWidth += value;
    // controller.stitchingHeight += value;
    ```
    or
    ```javascript
    controller.setStitchingWidth(stitchingWidth);
    controller.setStitchingHeight(stitchingHeight);
    controller.setStitchingSize(stitchingWidth, stitchingHeight);
    ```

### Brightness

- Get
    ```javascript
    var brightness = controller.brightness;
    ```
- Set
    ```javascript
    controller.brightness = brightness;
    // controller.brightness += value;
    ```
    or
    ```javascript
    controller.setBrightness(radius);
    ```
    - `brightness` : 0(black) ~ 1(white)
