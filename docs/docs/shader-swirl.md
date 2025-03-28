## Introduction

Swirl post processing filter. [Reference](https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Swirl](https://codepen.io/rexrainbow/pen/RBXQBo)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-swirl)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexswirlfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexswirlfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexSwirl(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexswirlfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexSwirl(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexswirlfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SwirlFilterPlugin from 'phaser3-rex-plugins/plugins/swirlfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSwirlFilter',
                plugin: SwirlFilterPlugin,
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
        var controller = filterList.addRexSwirl(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexSwirlFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexSwirl(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexSwirlFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { SwirlFilter, SwirlController } from 'phaser3-rex-plugins/plugins/swirlfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(SwirlFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(SwirlFilter.FilterName, SwirlFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new SwirlController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new SwirlController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 swirl effect.
    ```javascript
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexSwirl({
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // rotation: 0,  // or angle: 0,

        // name: 'rexSwirlPostFx'
    });
    ```
    - `center.x`, `center.y` : Local position of swirl center.
    - `radius` : Swirl radius.
    - `rotation` (`angle`) : Swirl angle.
- Apply effect to camera. A camera only can add 1 swirl effect.
    ```javascript
    var controller = scene.plugins.get('rexSwirlFilter').add(camera, config);
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
    scene.plugins.get('rexSwirlFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexSwirlFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexSwirlFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexSwirlFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexSwirlFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexSwirlFilter').get(camera);
    ```

### Radius

- Get
    ```javascript
    var radius = controller.radius;
    ```
- Set
    ```javascript
    controller.radius = radius;
    // controller.radius += value;
    ```
    or
    ```javascript
    controller.setRadius(radius);
    ```

### Rotation

- Get
    ```javascript
    var rotation = controller.rotation;  // radians
    // var angle = controller.angle;     // degrees
    ```
- Set
    ```javascript
    controller.rotation = rotation;
    controller.rotation += value;
    // controller.angle = angle;
    // controller.angle += value;
    ```
    or
    ```javascript
    controller.setRotation(rotation);
    // controller.setAngle(angle);
    ```

### Center position

Default value is center of window.

- Get
    ```javascript
    var x = controller.centerX;
    var y = controller.centerY;
    ```
- Set
    ```javascript
    controller.centerX = x;
    controller.centerY = y;
    ```
    or
    ```javascript
    controller.setCenter(x, y);
    // controller.setCenter();   // set to center of window
    ```
