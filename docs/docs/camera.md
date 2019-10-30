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

### Create cameras from JSON

```javascript
scene.cameras.fromJSON(config);
// scene.cameras.fromJSON(configArray);
```

- `config` :
    ```javascript
    {
        name: '',
        x: 0,
        y: 0,
        width: scene.sys.scale.width,
        height: scene.sys.scale.height,
        zoom: 1,
        rotation: 0,
        scrollX: 0,
        scrollY: 0,
        roundPixels: false,
        visible: true,
        backgroundColor: false,
        bounds: null, // {x, y, width, height}
    }
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
    ```javascript
    camera.setViewport(top, left, width, height);
    ```
    or
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
    - Width & height
        ```javascript
        var width = camera.width;
        var height = camera.height;
        ```
        ```javascript
        var displayWidth = camera.displayWidth;
        var displayHeight = camera.displayHeight;
        ```

### Zoom

- Set
    ```javascript
    camera.setZoom(zoomValue);  // The minimum it can be is 0.001.
    camera.zoom = zoomValue;
    ```
- Get
    ```javascript
    var zoomValue = camera.zoom;
    ```

### Rotation

- Set
    ```javascript
    camera.setAngle(angle);  // angle in degree
    camera.setRotation(angle);  // angle in radians
    camera.rotation = angle; // angle in radians
    ```
- Get
    ```javascript
    var angle = camera.rotation;  // angle in radians
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

### Scroll

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
camera.centerOn(x, y);  // centered on the given coordinates
```

```javascript
camera.centerOnX(x);
camera.centerOnY(y);
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
    - Clear deadzone
        ```javascript
        camera.setDeadzone();
        ```

#### Scroll factor

See [Scroll factor](gameobject.md#scroll-factor) in game object.

#### Bounds

- Set
    ```javascript
    camera.setBounds(x, y, width, height)
    ```
- Get
    ```javascript
    var bounds = camera.getBounds();  // bounds: a rectangle object
    // var out = camera.getBounds(out);
    ```

### World coordinates

- World view, a [rectangle object](geom-rectangle.md)
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
- Middle point
    ```javascript
    var x = camera.midPoint.x;
    var y = camera.midPoint.y;
    ```
-  Get world position
    ```javascript
    var out = camera.getWorldPoint(x, y);
    // var out = camera.getWorldPoint(x, y, out);
    ```
    - `x` , `y` : Position of camera.
    - `out` : World position `{x, y}`
    - Works for zoom of 1 with any resolution, but **resolution > 1 and zoom !== 1 breaks**

### Set background color

```javascript
camera.setBackgroundColor(color);
```

### Ignore game object

Ignored game objects won't show at that camera.

```javascript
camera.ignore(gameObject);
```

- `gameObject` :
    - A game object
    - An array of game objects
    - A [group](group.md)

### Get cameras below pointer

```javascript
var cameras = scene.cameras.getCamerasBelowPointer(pointer);
```

- `cameras` : An array of cameras.
- `pointer` : `{x, y}`