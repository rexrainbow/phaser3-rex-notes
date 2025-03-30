## Introduction

Dissolve transition effect. ([Reference](https://github.com/ykob/glsl-dissolve/))

- Author: Rex
- A filter shader effect

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Game object effect](https://codepen.io/rexrainbow/pen/BaQWqyX)
- [Camera effect](https://codepen.io/rexrainbow/pen/ExqwxYz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shader-dissolve)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdissolvefilterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdissolvefilterplugin.min.js', true);
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexDissolve(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexdissolvefilterplugin').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexDissolve(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexdissolvefilterplugin').add(camera, config);
        ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DissolveFilterPlugin from 'phaser3-rex-plugins/plugins/dissolvefilter-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDissolveFilter',
                plugin: DissolveFilterPlugin,
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
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.addRexDissolve(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexDissolveFilter').add(gameObject, config);
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.addRexDissolve(config);
        ```
        or
        ```javascript
        var controller = scene.plugins.get('rexDissolveFilter').add(camera, config);
        ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import filter and controller class
    ```javascript
    import { DissolveFilter, DissolveController } from 'phaser3-rex-plugins/plugins/dissolvefilter.js';
    ```
- Register effect
    ```js
    if (!scene.renderer.renderNodes.hasNode(DissolveFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(DissolveFilter.FilterName, DissolveFilter);
    }
    ```
- Apply effect
    - Apply effect to game object
        ```javascript
        gameObject.enableFilters();
        var filterList = gameObject.filters.internal;
        var controller = filterList.add(
            new DissolveController(filterList.camera, config)
        );
        ```
    - Apply effect to camera
        ```javascript
        var filterList = camera.filters.internal;
        var controller = filterList.add(
            new DissolveController(filterList.camera, config)
        );
        ```

### Apply effect

- Apply effect to game object. 
    ```javascript
    gameObject.enableFilters();
    var filterList = gameObject.filters.internal;
    var controller = filterList.addRexDissolve({
        // toTexture: textureKey,
        // toFrame: frameName,
        // resizeMode: 1,

        // noiseX: undefined,
        // noiseY: undefined,
        // noiseZ: undefined,
        // fromEdgeStart: 0.01,
        // fromEdgeWidth: 0.05,
        // toEdgeStart: 0.01,
        // toEdgeWidth: 0.05,

        // progress: 0,
        
        // name: 'rexDissolvePostFx'
    });
    ```
    - `toTexture`, `toFrame` : Texture key and frame name of transition target texture.
    - `resizeMode` : Resize mode of transition target texture.
        - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
        - `1`, or `'contain'` : The target texture is resized to fit the source texture.
        - `2`, or `'cover'` : The target texture is resized to cover the source texture.
    - `noiseX`, `noiseY`, `noiseZ` : Parameter of Perline noise.
        - `undefined` : A random value.
    - `fromEdgeStart`, `fromEdgeWidth` : Dissolve edge start, edge width of from-texture (texture of game object, or render result of camera).
    - `toEdgeStart`, `toEdgeWidth` : Reveal edge start, edge width of to-texture.
- Apply effect to camera.
    ```javascript
    var controller = scene.plugins.get('rexDissolveFilter').add(camera, config);
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
    scene.plugins.get('rexDissolveFilter').remove(gameObject);
    ```
- Remove effect from camera
    ```javascript
    var filterList = camera.filters.internal;
    filterList.remove(controller);
    ```
    or
    ```javascript
    scene.plugins.get('rexDissolveFilter').remove(camera);
    ```

### Get effect

- Get effect from game object
    ```javascript
    var controller = scene.plugins.get('rexDissolveFilter').get(gameObject)[0];
    // var controllers = scene.plugins.get('rexDissolveFilter').get(gameObject);
    ```
- Get effect from camera
    ```javascript
    var controller = scene.plugins.get('rexDissolveFilter').get(camera)[0];
    // var controllers = scene.plugins.get('rexDissolveFilter').get(camera);
    ```

### Transition target texture

- Get
    ```javascript
    var textureKey = controller.toFrame.texture.key;
    var frameName = controller.toFrame.name;
    ```
- Set
    ```javascript
    controller.setTransitionTargetTexture(textureKey, frameName);
    // controller.setTransitionTargetTexture(textureKey, frameName, resizeMode);
    ```

### Progress

- Get
    ```javascript
    var progress = controller.progress;
    ```
- Set
    ```javascript
    controller.setProgress(value);  // value: 0~1
    ```
    or
    ```javascript
    controller.progress = value;  // value: 0~1
    ```

#### Resize mode

- Get
    ```javascript
    var mode = controller.resizeMode;
    ```
- Set
    ```javascript
    controller.setResizeMode(mode);
    ```
    - `mode` : 
        - `0`, or `'stretch'` : The target texture is stretched to the size of the source texture.
        - `1`, or `'contain'` : The target texture is resized to fit the source texture.
        - `2`, or `'cover'` : The target texture is resized to cover the source texture.    

### Noise

- Get
    ```javascript
    var noiseX = controller.noiseX;
    var noiseY = controller.noiseY;
    var noiseZ = controller.noiseZ;
    ```
- Set
    ```javascript
    controller.noiseX = noiseX;
    controller.noiseY = noiseY;
    controller.noiseZ = noiseZ;
    ```
    or
    ```javascript
    controller.setNoise(noiseX, noiseY, noiseZ);
    // controller.setNoise(); // Passing 3 random float numbers
    ```

### Edge

- Get
    - From texture (texture of game object, or render result of camera)
        ```javascript
        var edgeStart = controller.fromEdgeStart;
        var edgeWidth = controller.fromEdgeWidth;
        ```
    - To texture (transition target texture)
        ```javascript
        var edgeStart = controller.toEdgeStart;
        var edgeWidth = controller.toEdgeWidth;
        ``` 
- Set
    - From texture (texture of game object, or render result of camera)
        ```javascript
        controller.fromEdgeStart = edgeStart;
        controller.fromEdgeWidth = edgeWidth;
        ```
        or
        ```javascript
        controller.setFromEdge(edgeStart, edgeWidth);
        ```
        - `edgeStart` : `0`~`1`, default value is `0.01`
        - `edgeWidth` : `0`~`1`, default value is `0.05`
    - To texture (transition target texture)
        ```javascript
        controller.toEdgeStart = edgeStart;
        controller.toEdgeWidth = edgeWidth;
        ``` 
        or
        ```javascript
        controller.setToEdge(edgeStart, edgeWidth);
        ```
        - `edgeStart` : `0`~`1`, default value is `0.01`
        - `edgeWidth` : `0`~`1`, default value is `0.05`