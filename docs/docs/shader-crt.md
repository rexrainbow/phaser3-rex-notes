## Introduction

CRT effect. [Reference](https://www.shadertoy.com/view/WsVSzV)

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [CRT](https://codepen.io/rexrainbow/pen/qBGoeOO)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-crt)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcrtfilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcrtfilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexCrt(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexcrtfilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexCrt(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexcrtfilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CrtFilterPlugin from 'phaser3-rex-plugins/plugins/crtfilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCrtFilter',
                plugin: CrtFilterPlugin,
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
        var controller = filterList.addRexCrt(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexCrtFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexCrt(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexCrtFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { CrtFilter, CrtController } from 'phaser3-rex-plugins/plugins/crtfilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(CrtFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(CrtFilter.FilterName, CrtFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        // gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new CrtController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new CrtController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object.
    ```javascript
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexCrt({
        // warpX: 0.75,
        // warpY: 0.75,
        // scanLineStrength: 0.2,
        // scanLineWidth: 1024,
        
        // name: 'rexCrtPostFx'
    });
    ```
    - `warpX`, `warpY` : Horizontal and Vertical warp.
    - `scanLineStrength`, `scanLineWidth` : Scan line parameters.
- Apply effect to camera.
    ```javascript
    var controller = scene.plugins.get('rexCrtFilter').add(camera, config);
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
    scene.plugins.get('rexCrtFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexCrtFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexCrtFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexCrtFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexCrtFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexCrtFilter').get(camera);
    ```

### Warp

- Get
    ```javascript
    var warpX = controller.warpX;
    var warpY = controller.warpY;
    ```
- Set
    ```javascript
    controller.setWarp(warpX, warpY);
    ```
    or
    ```javascript
    controller.warpX = warpX;
    controller.warpY = warpY;
    ```

### Scan lines

- Get
    ```javascript
    var scanLineStrength = controller.scanLineStrength;
    var scanLineWidth = controller.scanLineWidth;
    ```
- Set
    ```javascript
    controller.setScanStrength(scanLineStrength);
    controller.setScanLineWidth(scanLineWidth);
    ```
    or
    ```javascript
    controller.scanLineStrength = scanLineStrength;
    controller.scanLineWidth = scanLineWidth;
    ```
