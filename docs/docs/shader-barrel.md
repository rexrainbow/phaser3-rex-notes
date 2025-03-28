!!! note
    Phaser4 has a built-in [barrel effect](shader-builtin.md#barrel).


## Introduction

Barrel post processing filter. [Reference](http://www.geeks3d.com/20140213/glsl-shader-library-fish-eye-and-dome-and-barrel-distortion-post-processing-filters/)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Barrel](https://codepen.io/rexrainbow/pen/OJmGGVB)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-barrel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbarrelfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbarrelfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexBarrel(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexbarrelfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexBarrel(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexbarrelfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BarrelFilterPlugin from 'phaser3-rex-plugins/plugins/barrelfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBarrelFilter',
                plugin: BarrelFilterPlugin,
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
        var controller = filterList.addRexBarrel(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexBarrelFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexBarrel(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexBarrelFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { BarrelFilter, BarrelController } from 'phaser3-rex-plugins/plugins/barrelfilter.js';
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(BarrelFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(BarrelFilter.FilterName, BarrelFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new BarrelController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new BarrelController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. A game object only can add 1 barrel effect.
    ```javascript
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexBarrel({
        // shrink: false,
        // center: {
        //    x: windowWidth / 2,
        //    y: windowHeight / 2
        //}
        // radius: 0,
        // power: 0.5,
        // intensity: 1,
        
        // name: 'rexBarrelPostFx'
    });
    ```
    - `shrink` : 
        - `false` : Fish-eye effect
        - `true` : Anti fish-eye effect.
    - `center.x`, `center.y` : Local position of barrel center.
    - `radius` : Barrel radius.
    - `power` : 0~1.
    - `intensity` : 0(original) ~ 1(barrel). Default value is `1`.
- Apply effect to camera. A camera only can add 1 barrel effect.
    ```javascript
    var controller = scene.plugins.get('rexBarrelFilter').add(camera, config);
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
    scene.plugins.get('rexBarrelFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexBarrelFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexBarrelFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexBarrelFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexBarrelFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexBarrelFilter').get(camera);
    ```

### Shrink mode

- Get
    ```javascript
    var shrinkMode = controller.shrinkMode;
    ```
- Set
    ```javascript
    controller.setShrinkMode(true);
    // controller.setShrinkMode(false);
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

### Power

- Get
    ```javascript
    var power = controller.power;
    ```
- Set
    ```javascript
    controller.power = power;
    ```
    or
    ```javascript
    controller.setPower(power);
    ```

### Intensity

- Get
    ```javascript
    var intensity = controller.intensity;
    ```
- Set
    ```javascript
    controller.intensity = intensity;
    // controller.intensity += value;
    ```
    or
    ```javascript
    controller.setIntensity(radius);
    ```
    - `intensity` : 0(original) ~ 1(barrel)

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