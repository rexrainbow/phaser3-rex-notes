## Introduction

Scroll/zoom camera.

- Author: Richard Davey

## Usage

### Setup

1. Create controllor
    ```javascript
    // var cursors = scene.input.keyboard.createCursorKeys();
    var config = {
        camera: camera,
    
        left: cursors.left,    // { isDown, isUp }
        right: cursors.right,  // { isDown, isUp }
        up: cursors.up,        // { isDown, isUp }
        down: cursors.down,    // { isDown, isUp }
        zoomIn: null,          // { isDown, isUp }
        zoomOut: null,         // { isDown, isUp }
    
        zoomSpeed: 0.01,
    
        acceleration: null,
        // acceleration: {
        //    x: 0,
        //    y: 0
        // }
    
        drag: null,
        // drag: {
        //    x: 0,
        //    y: 0
        // }
    
        maxSpeed: null
        // maxSpeed: {
        //    x: 0,
        //    y: 0
        // }
    };
    var controls = new Phaser.Cameras.Controls.SmoothedKeyControl(config);
    // var controls = new Phaser.Cameras.Controls.FixedKeyControl(config);
    ```
1. Update
    ```javascript
    scene.update = function (time, delta) {
        controls.update(delta);
    }
    ```

### Other methods

- Start
    ```javascript
    controls.start();
    ```
- Stop
    ```javascript
    controls.stop();
    ```
- Set camera
    ```javascript
    controls.setCamera(camera);
    ```