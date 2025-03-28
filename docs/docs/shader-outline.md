## Introduction

Outline post processing filter. [Reference](https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Outline](https://codepen.io/rexrainbow/pen/dyGNrqa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-outline)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexoutlinefilterlugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinefilterlugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexOutline(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexoutlinefilterlugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexOutline(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexoutlinefilterlugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import OutlineFilterPlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexOutlineFilter',
                plugin: OutlineFilterPlugin,
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
        var controller = filterList.addRexOutline(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexOutlineFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexOutline(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexOutlineFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { OutlineFilter, OutlineController } from 'phaser3-rex-plugins/plugins/outlinepipeline.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(OutlineFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(OutlineFilter.FilterName, OutlineFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new OutlineController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new OutlineController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 outline effect.
    ```javascript
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexOutline({
        // thickness: 3,
        // outlineColor: 0x000000,

        // quality: 0.1,

        // name: 'rexOutlinePostFx'
    });
    ```
    - `thickness` : Thickness of outline.
    - `outlineColor` : Color of outline.
    - `quality` : 0~1. The higher the number the less performant. It can't be changed after filter creation.
- Apply effect to camera. A camera only can add 1 outline effect.
    ```javascript
    var controller = scene.plugins.get('rexOutlineFilter').add(camera, config);
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
    scene.plugins.get('rexOutlineFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexOutlineFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexOutlineFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexOutlineFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexOutlineFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexOutlineFilter').get(camera);
    ```

### Thickness

- Get
    ```javascript
    var thickness = controller.thickness;
    ```
- Set
    ```javascript
    controller.thickness = thickness;
    // controller.thickness += value;
    ```
    or
    ```javascript
    controller.setThickness(value);
    ```

### Outline color

- Get
    ```javascript
    var color = controller.outlineColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    controller.setOutlineColor(value);
    ```
    ```javascript
    controller.outlineColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Quality

The quality of the outline from 0 to 1, using a higher quality setting will 
result in slower performance and more accuracy.

- Get
    ```javascript
    var quality = controller.quality;
    ```
- Set
    ```javascript
    controller.setQuality(quality);
    ```
    or
    ```javascript
    controller.quality = quality;
    ```
    - `quality` : `0` ~ `1`, default is `0.1`.
        - `0.1` : 10 sample points.
        - `0.08` : 8 sample points.
        - `1` : 100 sample points.