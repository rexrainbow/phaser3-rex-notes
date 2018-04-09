## Introduction

Camera to display game objects, built-in object of phaser.

- Author: Richard Davey

## Usage

### Get camera

Each scene has one or more cameras.

- Main camera
    ```javascript
    var camera = scene.cameras.main;
    ```
- Add new camera
    ```javascript
    var camera = scene.cameras.add(x, y, width, height);
    ```

- Add existed camera
    ```javascript
    scene.cameras.addExisting(camera);
    ```

### Remove camera

```javascript
scene.cameras.remove(camera);
```

### Set view port

```javascript
camera.setViewport(x, y, width, height);
```

```javascript
camera.setPosition(x, y);
// camera.x = x;
// camera.y = y;
// var x = camera.x;
// var y = camera.y;
```

```javascript
camera.setSize(width, height);
// camera.width = width;
// camera.height = height;
// var width = camera.width;
// var height = camera.height;
```

### Scroll camera

```javascript
camera.setScroll(x, y)
```

```javascript
camera.scrollX = scrollX;
camera.scrollY = scrollY;
```

```javascript
camera.centerToBounds();
```

```javascript
camera.centerToSize();
```

#### Follow game object

- Start following
    ```javascript
    camera.startFollow(gameobject);
    // camera.startFollow(gameobject, roundPx);
    ```
- Stop following
    ```javascript
    camera.stopFollow();
    ```

#### Scroll factor

See [Scroll factor](gameobject.md#scroll-factor) in game object.

#### Set bounds

```javascript
camera.setBounds(x, y, width, height)
```

### Zoom

```javascript
camera.setZoom(v);
// camera.zoom = v;
// var zoom = camera.zoom;
```

### Rotation

Spin camera around center.

```javascript
camera.setRotation(rad);
// camera.setAngle(degree);
// camera.rotation = rad;
```

### Effects

#### Fade-in / fade-out

```javascript
camera.fadeIn(duration);   // duration in ms
// camera.fadeIn(duration, callback);  // callback: invoked when completed
// camera.fadeIn(duration, callback, red, green, blue);
// red/green/blue: the value to fade the red/green/blue channel from. A value between 0 and 1.
```

```javascript
camera.fadeOut(duration);   // duration in ms
// camera.fadeOut(duration, callback);  // callback: invoked when completed
// camera.fadeOut(duration, callback, red, green, blue);
// red/green/blue: the value to fade the red/green/blue channel from. A value between 0 and 1.
```

#### Flash

```javascript
camera.flash(duration);   // duration in ms
// camera.flash(duration, red, green, blue, force, callback);
```

#### Shake

```javascript
camera.shake(duration);   // duration in ms
// camera.shake(duration, intensity);  // intensity: the intensity of the shake.
// camera.shake(duration, intensity, force);  // force: force the shake effect to start immediately, even if already running.
// camera.shake(duration, intensity, force, callback);  // callback: invoked when completed
```

### Set background color

```javascript
camera.setBackgroundColor(color);
```

### Ignore game object

Ignored game objects won't show at that camera.

```javascript
camera.ignore(gameobject);  // a game object, or an array of game objects
```

### Camera Controllor

#### Create controllor

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
var controls = new Phaser.Cameras.Controls.Smoothed(config);
```

#### Update

```javascript
scene.update = function (time, delta) {
    controls.update(delta);
}
```