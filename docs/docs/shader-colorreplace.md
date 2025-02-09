## Introduction

Replace color post processing filter. [Reference](https://github.com/pixijs/filters/blob/main/filters/color-replace/src/colorReplace.frag)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Color replace](https://codepen.io/rexrainbow/pen/mdwRpvW)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-colorreplace)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcolorreplacefilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcolorreplacefilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var controller = scene.plugins.get('rexcolorreplacefilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexcolorreplacefilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ColorReplaceFilterPlugin from 'phaser3-rex-plugins/plugins/colorreplacefilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexColorReplaceFilter',
                plugin: ColorReplaceFilterPlugin,
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
        var controller = scene.plugins.get('rexColorReplaceFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var controller = scene.plugins.get('rexColorReplaceFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { ColorReplaceFilter, ColorReplaceController } from 'phaser3-rex-plugins/plugins/colorreplacefilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(ColorReplaceFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(ColorReplaceFilter.FilterName, ColorReplaceFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new ColorReplaceController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new ColorReplaceController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 colorreplace effect.
    ```javascript
    var controller = scene.plugins.get('rexColorReplaceFilter').add(gameObject, {
        originalColor: 0xFF0000,
        newColor: 0x000000,
        // epsilon: 0.4,
        
        // name: 'rexColorReplacePostFx'
    });
    ```
    - `originalColor` : The color (`0xRRGGBB`) that will be changed.
    - `newColor` : The resulting color (`0xRRGGBB`).
    - `epsilon` : Tolerance/sensitivity of the floating-point comparison between colors (lower = more exact, higher = more inclusive)    
- Apply effect to camera. A camera only can add 1 colorreplace effect.
    ```javascript
    var controller = scene.plugins.get('rexColorReplaceFilter').add(camera, config);
    ```

### Remove effect

- Remove effect from game object
    ```javascript
    scene.plugins.get('rexColorReplaceFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    scene.plugins.get('rexColorReplaceFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexColorReplaceFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexColorReplaceFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexColorReplaceFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexColorReplaceFilter').get(camera);
    ```

### Original color

- Get
    ```javascript
    var color = controller.originalColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    controller.setOriginalColor(value);
    ```
    ```javascript
    controller.originalColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### New color

- Get
    ```javascript
    var color = controller.newColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    controller.setNewColor(value);
    ```
    ```javascript
    controller.newColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Epsilon

- Get
    ```javascript
    var epsilon = controller.epsilon;
    ```
- Set
    ```javascript
    controller.epsilon = epsilon;
    // controller.epsilon += value;
    ```
    or
    ```javascript
    controller.setEpsilon(value);
    ```