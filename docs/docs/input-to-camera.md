## Introduction

Control camera's scroll and zoom by [pan(scroll)/pinch(zoom)](gesture-pinch.md), or [cursor-at-bounds(scroll)](cursoratbounds.md)/[mouse-wheel(zoom)](mousewheel.md).

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

    // panScrollEnable: true,
    // pinchZoomEnable: true,
    // inputTarget: undefined,

    // boundsScrollEnable: true,
    // mouseWheelZoomEnable: true,

    // enable: true
});
```

- `scene` : Target scene.
- `camera` :
    - `undefined` : Default camera of this `scene`.
    - A camera object : Control this camera object.
- [pan(scroll)/pinch(zoom)](gesture-pinch.md): 
    - `panScrollEnable` : Set to `true` to enable pan-scroll behavior. Default value is `true`.
    - `pinchZoomEnable` : Set to `true` to enable pinch-zoom behavior. Default value is `true`.
    - `inputTarget` : 
        - `undefined` : Receive pan/pinch input by scene's input event. Default behavior.
        - A game object : Receive pan/pinch input only on this game object.        
- [cursor-at-bounds(scroll)](cursoratbounds.md)/[mouse-wheel(zoom)](mousewheel.md) :
    - `boundsScrollEnable` : Set to `true` to enable bounds-scroll behavior. Default value is `true`.
    - `mouseWheelZoomEnable` : Set to `true` to enable wheel-zoom behavior. Default value is `true`.
- `enable` : 
    - `false` : Disable all camera-control behavior temporary.
    - `true` : Restore all camera-control enable state to previous value. Default behavior.

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