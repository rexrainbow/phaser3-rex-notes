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

### Destroy camera

```javascript
camera.destroy();
```

### View port

- Set
    - Top(x), Left(y), Width, Height
        ```javascript
        camera.setViewport(top, left, width, height);
        ```
        ```javascript
        camera.setPosition(top, left);
        // camera.x = top;
        // camera.y = left;
        ```
        ```javascript
        camera.setSize(width, height);
        // camera.width = width;
        // camera.height = height;
        ```
        ```javascript
        camera.centerOn(x, y);  // centered on the given coordinates
        ```
        ```javascript
        camera.centerToBounds();
        ```
    - Zoom
        ```javascript
        camera.setZoom(zoomValue);  // The minimum it can be is 0.001.
        camera.zoom = zoomValue;
        ```
    - Rotation
        ```javascript
        camera.setAngle(angle);  // angle in degree
        camera.setRotation(angle);  // angle in radians
        camera.rotation = angle; // angle in radians
        ```
- Get
    - Position
        - Top-left
            ```javascript
            var top = camera.x;
            var left = camera.y;
            ```
        - Center, relative to the top-left of the game canvas.
            ```javascript
            var x = camera.centerX;
            var y = camera.centerY;
            ```
        - Middle point, in 'world' coordinates.
            ```javascript
            var x = camera.midPoint.x;
            var y = camera.midPoint.y;
            ```
    - Width & height
        ```javascript
        var width = camera.width;
        var height = camera.height;
        ```
        ```javascript
        var displayWidth = camera.displayWidth;
        var displayHeight = camera.displayHeight;
        ```
    - Zoom
        ```javascript
        var zoomValue = camera.zoom;
        ```
    - Rotation
        ```javascript
        var angle = camera.rotation;  // angle in radians
        ```
    - World view, a rectangle object
        ```javascript
        var worldView = camera.worldView;
        var x = worldView.x;
        var y = worldView.y;
        var width = worldView.width;  // displayWidth
        var height = worldView.height; // displayHeight
        var left = worldView.left;  // x
        var right = worldView.right;  // x + width
        var top = worldView.top;  // y
        var bottom = worldView.bottom;  // y + height
        var centerX = worldView.centerX;
        var centerY = worldView.centerY;
        var isInside = worldView.contains(x, y);
        var randPoint = worldView.getRandomPoint(point); // point: {x, y}
        ```

### Visible

A visible camera will render and perform input tests.
An invisible camera will not render anything and will skip input tests.

```javascript
camera.setVisible(value);
// camera.visible = value
```

```javascript
var visible = camera.visible;
```

### Alpha

```javascript
camera.setAlpha(value);
// camera.alpha = value;
```

```javascript
var alpha = camera.alpha;
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
    camera.startFollow(gameObject);
    // camera.startFollow(gameObject, roundPx, lerpX, lerpY, offsetX, offsetY);  // 
    ```
    roundPx : set true to round the camera position to integers
- Stop following
    ```javascript
    camera.stopFollow();
    ```
- Set follow offset
    ```javascript
    camera.setFollowOffset(x, y);
    ```
- Set lerp
    ```javascript
    camera.setLerp(x, y);
    ```
    - `1` : Camera will instantly snap to the target coordinates.
    - `0.1` : Camera will more slowly track the target, giving a smooth transition.
- Deadzone
    ```javascript
    camera.setDeadzone(width, height);
    ```
    If the target moves outside of this area, the camera will begin scrolling in order to follow it.
    - Boundaries
        ```javascript
        var left = camera.deadzone.left;
        var right = camera.deadzone.right;
        var top = camera.deadzone.top;
        var bootom = camera.deadzone.bottom;
        ```
    - Clean deadzone
        ```javascript
        camera.setDeadzone();
        ```

#### Scroll factor

See [Scroll factor](gameobject.md#scroll-factor) in game object.

#### Set bounds

```javascript
camera.setBounds(x, y, width, height)
```

### Effects

#### Fade-in / fade-out

```javascript
camera.fadeIn(duration);   // duration in ms
// camera.fadeIn(duration, red, green, blue, callback, context);
// red/green/blue: the value to fade the red/green/blue channel from. A value between 0 and 255.
```

```javascript
camera.fadeOut(duration);   // duration in ms
// camera.fadeOut(duration, red, green, blue, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

##### Events

```javascript
camera.on('camerafadeincomplete', camera, fade);
```

```javascript
camera.on('camerafadeoutcomplete', camera, fade);
```

#### Flash

```javascript
camera.flash(duration);   // duration in ms
// camera.flash(duration, red, green, blue, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

##### Events

```javascript
camera.on('cameraflashstart', camera, flash, duration, red, green, blue);
```

```javascript
camera.on('cameraflashcomplete', camera, flash);
```

#### Shake

```javascript
camera.shake(duration);   // duration in ms
// camera.shake(duration, intensity, force, callback, context);  // callback: invoked when completed
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress) {}
    ```

##### Events

```javascript
camera.on('camerashakestart', camera, shake, duration, intensity);
```

```javascript
camera.on('camerashakecomplete', camera, shake);
```

##### Pan

```javascript
camera.pan(x, y, duration);   // duration in ms
// camera.pan(x, y, duration, ease, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress, x, y) {}
    ```

##### Events

```javascript
camera.on('camerapanstart', camera, pan, duration, x, y);
```

```javascript
camera.on('camerapancomplete', camera, pan);
```

##### Zoom

```javascript
camera.zoomTo(zoomValue, duration);   // duration in ms
// camera.zoomTo(zoomValue, duration, ease, force, callback, context);
```

- `callback` , `context` : It will be invoked every frame for the duration of the effect.
    ```javascript
    function(camera, progress, zoomValue) {}
    ```

##### Events

```javascript
camera.on('camerazoomstart', camera, zoom, duration, zoomValue);
```

```javascript
camera.on('camerazoomcomplete', camera, zoom);
```

### Set background color

```javascript
camera.setBackgroundColor(color);
```

### Ignore game object

Ignored game objects won't show at that camera.

```javascript
camera.ignore(gameObject);  // a game object, or an array of game objects
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
var controls = new Phaser.Cameras.Controls.SmoothedKeyControl(config);
// var controls = new Phaser.Cameras.Controls.FixedKeyControl(config);
```

#### Update

```javascript
scene.update = function (time, delta) {
    controls.update(delta);
}
```

#### Start / stop

```javascript
controls.start();
```

```javascript
controls.stop();
```

#### Other methods

```javascript
controls.setCamera(camera);
```