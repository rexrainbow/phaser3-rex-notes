## Introduction

Control camera's scroll by [pan](gesture-pan.md)/[cursor-at-bounds(scroll)](cursoratbounds.md), and zoom by [pinch](gesture-pinch.md)/mouse-wheel.

- Author: Rex
- Member of scene

## Live demos

- [Camera controller](https://codepen.io/rexrainbow/pen/wvbpZBQ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/camera-controller)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcameracontrollerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcameracontrollerplugin.min.js', true);
    ```
- Add camera-controller object
    ```javascript
    var cameraController = scene.plugins.get('rexcameracontrollerplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CameraControllerPlugin from 'phaser3-rex-plugins/plugins/cameracontroller-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCameraController',
                plugin: CameraControllerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add camera-controller object
    ```javascript
    var cameraController = scene.plugins.get('rexCameraController').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CameraController from 'phaser3-rex-plugins/plugins/cameracontroller.js';
    ```
- Add camera-controller object
    ```javascript
    var cameraController = new CameraController(scene, config);
    ```

### Create instance

```javascript
var cameraController = scene.plugins.get('rexCameraController').add(scene, {
    // camera: scene.cameras.main,

    // panScroll: true,
    // panScrollEnable: true,

    // pinchZoom: true,
    // pinchZoomEnable: true,
    
    // inputTarget: undefined,

    // boundsScroll: true,
    // boundsScrollEnable: true,

    // mouseWheelZoom: truem
    // mouseWheelZoomEnable: true,
    // mouseWheelZoomStep: 0.01,

    // enable: true
});
```

- `scene` : Target scene.
- `camera` :
    - `undefined` : Default camera of this `scene`.
    - A camera object : Control this camera object.
- Pan scroll: 
    - `panScroll` : Set to `false` will discard pan-scroll controller. Default is `true`.
    - `panScrollEnable` : Set to `true` to enable pan-scroll behavior. Default value is `true`.
    - `inputTarget` : 
        - `undefined` : Receive pan/pinch input by scene's input event. Default behavior.
        - A game object : Receive pan/pinch input only on this game object.        
- Pinch zoom: 
    - `pinchZoom` : Set to `false` will discard pinch-zoom controller. Default is `true`.
    - `pinchZoomEnable` : Set to `true` to enable pinch-zoom behavior. Default value is `true`.
    - `inputTarget` : 
        - `undefined` : Receive pan/pinch input by scene's input event. Default behavior.
        - A game object : Receive pan/pinch input only on this game object.    
- cursor-at-bounds scroll :
    - `boundsScroll` : Set to `false` will discard cursor-at-bounds-scroller controller. Default is `true`.
    - `boundsScrollEnable` : Set to `true` to enable bounds-scroll behavior. Default value is `true`.
- mouse-wheel zoom :
    - `mouseWheelZoom` : Set to `false` will discard mouse-wheel-zoom controller. Default is `true`.
    - `mouseWheelZoomEnable` : Set to `true` to enable mouse-wheel-zoom behavior. Default value is `true`.
    - `mouseWheelZoomStep` :Camera zoom incremental. Default value is `0.1`.
- `enable` : 
    - `false` : Disable all camera-controller temporary.
    - `true` : Restore all camera-controller's enable state to previous value. Default behavior.

### Set target camera

```javascript
cameraController.setCamera(camera);
```

### Enable controller behavior

- Pan-scroll 
    ```javascript
    cameraController.setPanScrollEnable(enable);
    // cameraController.panScrollEnable = enable;
    ```
- Pinch-zoom
    ```javascript
    cameraController.setPinchZoomEnable(enable);
    // cameraController.pinchZoomEnable = enable;
    ```
- Bounds-scroll 
    ```javascript
    cameraController.setBoundsScrollEnable(enable);
    // cameraController.boundsScrollEnable = enable;
    ```
- Wheel-zoom
    ```javascript
    cameraController.setMouseWheelZoomEnable(enable);
    // cameraController.mouseWheelZoomEnable = enable;
    ```
- Disable all behaviors
    ```javascript
    cameraController.setEnable(false);
    // cameraController.enable = false;
    ```
- Restore enable state of all behaviors
    ```javascript
    cameraController.setEnable();
    // cameraController.enable = true;
    ```
- Toggle enable state
    ```javascript
    cameraController.toggleEnable();
    // cameraController.enable = !cameraController.enable;
    ```