## Introduction

Built-in touch/mouse events of phaser.

- Author: Richard Davey

## Usage

### Quick start

- Is touching
    ```javascript
    var pointer = scene.input.activePointer;
    if (pointer.isDown) {
        var touchX = pointer.x;
        var touchY = pointer.y;
        // ...
    }
    ```
- On any touching start
    ```javascript
    scene.input.on('pointerdown', function(pointer){
        var touchX = pointer.x;
        var touchY = pointer.y;
        // ...
    }, scope);
    ```
- On any touching end
    ```javascript
    scene.input.on('pointerup', function(pointer){
        var touchX = pointer.x;
        var touchY = pointer.y;
        // ...
    }, scope);
    ```
- On touch game object start
    ```javascript
    gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
        // ...
    }, scope);
    ```
- On touch game object end
    ```javascript
    gameObject.setInteractive().on('pointerup', function(pointer, localX, localY, event){
        // ...
    }, scope);
    ```
- Drag game object
    ```javascript
    gameObject
        .setInteractive({ draggable: true })
        .on('dragstart', function(pointer, dragX, dragY){
            // ...
        }, scope);
        .on('drag', function(pointer, dragX, dragY){
            gameObject.setPosition(dragX, dragY);
        }, scope);
        .on('dragend', function(pointer, dragX, dragY, dropped){
            // ...
        }, scope);
    ```

Reference : [Properties of point](touchevents.md#properties-of-point)

### Register interactive

Call `gameObject.setInteractive(...)` to register touch input of Game Object before listening touching events.

- Set hit area from width & height (rectangle) of the texture
    ```javascript
    gameObject.setInteractive();
    ```
- Set hit area from game object
    ```javascript
    gameObject.setInteractive(shape, callback);
    ```
    - [Circle](geom-circle.md)
        - shape : `new Phaser.Geom.Circle(x, y, radius)`
        - callback : `Phaser.Geom.Circle.Contains`
    - [Ellipse](geom-ellipse.md)
        - shape : `new Phaser.Geom.Ellipse(x, y, width, height)`
        - callback : `Phaser.Geom.Ellipse.Contains`
    - [Rectangle](geom-rectangle.md)
        - shape : `new Phaser.Geom.Rectangle(x, y, width, height)`
        - callback : `Phaser.Geom.Rectangle.Contains`
    - [Triangle](geom-triangle.md)
        - shape : `new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3)`
        - callback : `Phaser.Geom.Triangle.Contains`
    - [Polygon](geom-polygon.md)
        - shape : `new Phaser.Geom.Polygon(points)`
        - callback : `Phaser.Geom.Polygon.Contains`
    - [Hexagon](geom-hexagon.md)
        - shape : `new Phaser.Geom.rexHexagon(x, y, size, type)`
        - callback : `Phaser.Geom.Polygon.Contains`
    - [Rhombus](geom-rhombus.md)
        - shape : `new Phaser.Geom.rexRhombus(x, y, width, height)`
        - callback : `Phaser.Geom.Polygon.Contains`
    - Note: `x`, `y` relate to the **top-left** of the gameObject.
- Set hit area from input plugin
    ```javascript
    scene.input.setHitArea(gameObjects, shape, callback);
    ```
    - Circle
        ```javascript
        scene.input.setHitAreaCircle(gameObjects, x, y, radius);
        // scene.input.setHitAreaCircle(gameObjects, x, y, radius, callback); // callback = Circle.Contains
        ```
    - Ellipse
        ```javascript
        scene.input.setHitAreaEllipse(gameObjects, x, y, width, height);
        // scene.input.setHitAreaEllipse(gameObjects, x, y, width, height, callback); // callback = Ellipse.Contains
        ```
    - Rectangle
        ```javascript
        scene.input.setHitAreaRectangle(gameObjects, x, y, width, height);
        // scene.input.setHitAreaRectangle(gameObjects, x, y, width, height, callback); // callback = Rectangle.Contains
        ```
    - Triangle
        ```javascript
        scene.input.setHitAreaTriangle(gameObjects, x1, y1, x2, y2, x3, y3);
        // scene.input.setHitAreaTriangle(gameObjects, x1, y1, x2, y2, x3, y3, callback); // callback = Triangle.Contains
        ```
    - Note: `x`, `y` relate to the **top-left** of the gameObject.
- Set interactive configuration
    ```javascript
    gameObject.setInteractive({
        hitArea: shape,
        hitAreaCallback: callback,
        hitAreaDebug: shape,
        draggable: false,
        dropZone: false,
        useHandCursor: false,
        cursor: CSSString,
        pixelPerfect: false,
        alphaTolerance: 1
    });
    ```
    - Hit area
        - shape
        - Pixel alpha
            - `pixelPerfect` : `true`
            - `alphaTolerance` : `1` (0-255)
        - Custom hit-testing function
            - `hitAreaCallback`
                ```javascript
                function(shape, x, y, gameObject) {
                    return hit;  // true/false
                }
                ```
                - `shape` : Hit area object
                - `x`, `y` : Local position of texture.
                - `gameObject` : Game object.
        - `hitAreaDebug` : Debug shape.
    - [Dragging](touchevents.md#dragging)
        - `draggable` : `true`
    - [Drop zone](touchevents.md#drop-zone)
        - `dropZone` : `true`
    - [Cursor](cursor.md)
        - `cursor` : CSS string
        - `useHandCursor` : `true`

!!! warning "Pixel perfect hit-testing"
    This is an expensive process, should only be enabled on Game Objects that really need it.

### Disable interactive

- Disable temporary
    ```javascript
    gameObject.disableInteractive();
    ```
- Remove interaction
    ```javascript
    gameObject.removeInteractive();
    ```

### Top only

When set to `true` this Input Plugin will emulate DOM behavior by only emitting events from the top-most Game Objects in the Display List.
If set to `false` it will emit events from all Game Objects below a Pointer, not just the top one.

- Get
    ```javascript
    var topOnly = scene.input.topOnly;
    ```
- Set
    ```javascript
    scene.input.topOnly = topOnly;
    scene.input.setTopOnly(topOnly);
    ```

### Touch events

Trigger these events from top scene to bottom scene.

1. Events on touched Game object
    ```javascript
    gameObject.on('pointerdown', function(pointer, localX, localY, event){ /* ... */ }, scope);
    gameObject.on('pointerup', function(pointer, localX, localY, event){ /* ... */ }, scope);
    gameObject.on('pointermove', function(pointer, localX, localY, event){ /* ... */ }, scope);
    gameObject.on('pointerover', function(pointer, localX, localY, event){ /* ... */ }, scope);
    gameObject.on('pointerout', function(pointer, event){ /* ... */ }, scope);
    ```
    - Cancel remaining touched events
        ```javascript
        function(pointer, localX, localY, event) {
            event.stopPropagation();
        }
        ```
1. Event on input plugin for each touched Game object
    ```javascript
    scene.input.on('gameobjectdown', function(pointer, gameObject, event){ /* ... */ }, scope);
    scene.input.on('gameobjectup', function(pointer, gameObject, event){ /* ... */ }, scope);
    scene.input.on('gameobjectmove', function(pointer, gameObject, event){ /* ... */ }, scope);
    scene.input.on('gameobjectover', function(pointer, gameObject, event){ /* ... */ }, scope);
    scene.input.on('gameobjectout', function(pointer, gameObject, event){ /* ... */ }, scope);
    ```
    - Cancel remaining touched events
        ```javascript
        function(pointer, gameObject, event) {
            event.stopPropagation();
        }
        ```
1. Events to get **all** touched Game Objects
    ```javascript
    scene.input.on('pointerdown', function(pointer, currentlyOver){ /* ... */ }, scope);
    scene.input.on('pointerdownoutside', function(pointer){ /* ... */ }, scope);
    scene.input.on('pointerup', function(pointer, currentlyOver){ /* ... */ }, scope);
    scene.input.on('pointerupoutside', function(pointer){ /* ... */ }, scope);
    scene.input.on('pointermove', function(pointer, currentlyOver){ /* ... */ }, scope);
    scene.input.on('pointerover', function(pointer, justOver){ /* ... */ }, scope);
    scene.input.on('pointerout', function(pointer, justOut){ /* ... */ }, scope);
    scene.input.on('gameout', function(timeStamp, domEvent){ /* ... */ }, scope);
    scene.input.on('gameover', function(timeStamp, domEvent){ /* ... */ }, scope);
    ```

### Dragging

#### Enable dragging

- Enable dragging when [registering interactive](touchevents.md#register-interactive)
    ```javascript
    gameObject.setInteractive({ draggable: true });
    ```
- Enable dragging and add it to dragging detecting list after registered interactive
    ```javascript
    scene.input.setDraggable(gameObject);
    ```
- Enable dragging
    ```javascript
    gameObject.input.draggable = true;
    ```

#### Disable dragging

- Remove Game Object from dragging detecting list
    ```javascript
    scene.input.setDraggable(gameObject, false);
    ```
- Disable dragging but keep it in dragging detecting list
    ```javascript
    gameObject.input.draggable = false;
    ```

#### Dragging events

```javascript
gameObject.on('dragstart', function(pointer, dragX, dragY){ /* ... */ }, scope);
gameObject.on('drag', function(pointer, dragX, dragY){ /* ... */ }, scope);
gameObject.on('dragend', function(pointer, dragX, dragY, dropped){ /* ... */ }, scope);
```

```javascript
scene.input.on('dragstart', function(pointer, gameObject){ /* ... */ }, scope);
scene.input.on('drag', function(pointer, gameObject, dragX, dragY){ /* ... */ }, scope);
scene.input.on('dragend', function(pointer, gameObject, dropped){ /* ... */ }, scope);
```

- `dropped` : `'dragend'` and also `'drop'`.

#### Dragging properties

```javascript
scene.input.dragDistanceThreshold = 16;
scene.input.dragTimeThreshold = 500;
```

### Drop zone

#### Enable drop zone

- Enable dropping when [registering interactive](touchevents.md#register-interactive)
    ```javascript
    gameObject.setInteractive({ dropZone: true });
    ```
- Enable dropping after registered interactive
    ```javascript
    gameObject.input.dropZone = true;
    ```  

#### Disable drop zone

```javascript
gameObject.input.dropZone = false;
```

#### Dropping events

```javascript
gameObject.on('drop', function(pointer, target){ /* ... */ }, scope);

gameObject.on('dragenter', function(pointer, target){ /* ... */ }, scope);
gameObject.on('dragover', function(pointer, target){ /* ... */ }, scope);
gameObject.on('dragleave', function(pointer, target){ /* ... */ }, scope);
```

```javascript
scene.input.on('drop', function(pointer, gameObject, target){ /* ... */ }, scope);

scene.input.on('dragenter', function(pointer, gameObject, target){ /* ... */ }, scope);
scene.input.on('dragover', function(pointer, gameObject, target){ /* ... */ }, scope);
scene.input.on('dragleave', function(pointer, gameObject, target){ /* ... */ }, scope);
```

### First event of all

```javascript
scene.input.on('preupdate', function() { /* ... */ }, scope);
```

### Single touch

#### Pointer

```javascript
var pointer = scene.input.activePointer;
```

### Multi-touch

#### Amount of active pointers

Set amount of active pointers in game configuration

```javascript
var config = {
    // ...
    input: {
        activePointers: 1,
        // ...
    }
};
var game = new Phaser.Game(config);
```

Or add pointers in run-time.

```javascript
scene.input.addPointer(num);  // total points = num + 1
```

#### Pointers

- pointer 1 ~ 10
    ```javascript
    var pointer = scene.input.pointer1;
    // ...
    var pointer = scene.input.pointer10;
    ```
- pointer n
    ```javascript
    var pointer = scene.input.manager.pointers[n];
    ```
- Amount of total pointers
    ```javascript
    var amount = scene.input.manager.pointersTotal;
    ```
    - `1` in desktop
    - `2` in touch device. (`0` for mouse, `1` for 1 touch pointer)

### Pointer

- Position
    - Current touching
        - Position in screen : `pointer.x` , `pointer.y`
        - Position in camera :
            - Single camera :
                ```javascript
                var worldX = pointer.worldX;
                var worldY = pointer.worldY;
                ```
            - Multiple cameras :
                ```javascript
                var worldXY = pointer.positionToCamera(camera);  // worldXY: {x, y}
                // var worldXY = pointer.positionToCamera(camera, worldXY);
                var worldX = worldXY.x;
                var worldY = worldXY.y;
                ```
        - Position of previous moving : `pointer.prevPosition.x` , `pointer.prevPosition.y`
            - Updating when pointer-down, potiner-move, or pointer-up.
        - Interpolated position :
            ```javascript
            var points = pointer.getInterpolatedPosition(step);
            // var out = pointer.getInterpolatedPosition(step, out);
            ```
    - Drag
        - Touching start : `pointer.downX`, `pointer.downY`
        - Touching end : `pointer.upX`, `pointer.upY`
        - Drag distance between pointer-down to latest pointer : `pointer.getDistance()`
            - Horizontal drag distance : `pointer.getDistanceX()`
            - Vertical drag distance : `pointer.getDistanceY()`
        - Drag angle : `pointer.getAngle()`
- Time
    - Touching start : `pointer.downTime`
    - Touching end : `pointer.upTime`
    - Drag : `pointer.getDuration()`
- Touch state
    - Is touching/any button down :  `pointer.isDown`
    - Is primary button down : `pointer.primaryDown`
- Button state : `pointer.button`
    - On Touch devices the value is always `0`.
- Button down
    - No button down : `pointer.noButtonDown()`
    - Is primary (left) button down : `pointer.leftButtonDown()`
    - Is secondary (right) button down : `pointer.rightButtonDown()`
    - Is middle (mouse wheel) button down : `pointer.middleButtonDown()`
    - Is back button down : `pointer.backButtonDown()`
    - Is forward button down : `pointer.forwardButtonDown()`
- Button released
    - Is primary (left) button released : `pointer.leftButtonReleased()`
    - Is secondary (right) button released : `pointer.rightButtonReleased()`
    - Is middle (mouse wheel) button released : `pointer.middleButtonReleased()`
    - Is back button released : `pointer.backButtonReleased()`
    - Is forward button released : `pointer.forwardButtonReleased()`
- Index in `scene.input.manager.pointers` : `pointer.id`
- Motion
    - Angle: `pointer.angle`
    - Distance: `pointer.distance`
    - Velocity: `pointer.velocity`
        - `pointer.velocity.x`, ``pointer.velocity.y`

### Input object

- `gameObject.input` : Game object's input object.
- `gameObject.input.localX`, `gameObject.input.localY` : Pointer to local position of texture.
- Always receive input events, even if it's invisible or won't render :
    ```javascript
    gameObject.input.alwaysEnabled = true;
    ```
- `gameObject.input.dragStartX`, `gameObject.input.dragStartY` : The x/y coordinate of the Game Object 
  that owns this Interactive Object when the drag started.
- `gameObject.input.dragStartXGlobal`, `gameObject.input.dragStartYGlobal` : The x/y coordinate that 
  the Pointer started dragging this Interactive Object from.
- `gameObject.input.dragX`, `gameObject.input.dragY` : The x/y coordinate that this Interactive Object 
  is currently being dragged to.


### Smooth

Get touch position from interpolation of previous touch position and current touch position.

```
Touch-position = (current-touch-position * smooth-factor) + (previous-touch-position * (1 - smooth-factor))
```

1. Set smooth factor. In [game configuration](game.md#configuration)
    ```javascript
    var config = {
        // ....
        input: {
            smoothFactor: 0
        }
    }
    ```
1. Get touch position
    ```javascript
    var x = pointer.x;
    var y = pointer.y;
    var worldX = pointer.worldX;
    var worldY = pointer.worldY;
    ```

### Debug

- Enable, draw shape of hit area.
    ```javascript
    scene.input.enableDebug(gameObject);
    // scene.input.enableDebug(gameObject, color);
    ```
- Disable
    ```javascript
    scene.input.removeDebug(gameObject);
    ```

### Poll rate

- Poll when touches moved, or updated. Default behavior.
    ```javascript
    scene.input.setPollOnMove();
    ```
- Poll every tick.
    ```javascript
    scene.input.setPollAlways();
    ```
- Set poll rate.
    ```javascript
    scene.input.setPollRate(rate);
    ```
