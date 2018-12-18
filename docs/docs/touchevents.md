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
     });
    ```
- On any touching end
    ```javascript
    scene.input.on('pointerup', function(pointer){
        var touchX = pointer.x;
        var touchY = pointer.y;
        // ...
     });
    ```
- On touch game object start
    ```javascript
    gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
        // ...
    })
    ```
- On touch game object end
    ```javascript
    gameObject.setInteractive().on('pointerup', function(pointer, localX, localY, event){
        // ...
    })
    ```

Reference : [Properties of point](touchevents.md#properties-of-point)

### Register interactive

Call `gameObject.setInteractive(...)` to register touch input of Game Object before listening touching events.

- Set hit area from width & height (rectangle) of the texture
    ```javascript
    gameObject.setInteractive();
    ```
- Set hit area from shape
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
- Set interactive configuration
    ```javascript
    gameObject.setInteractive({
        hitArea: shape,
        hitAreaCallback: callback,
        pixelPerfect: true,
        alphaTolerance: 1,
        draggable: true,
        dropZone: true,
        cursor: CSSString,
        useHandCursor: true
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
    or
    ```javascript
    gameObject.setInteractive(false);
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

Scenes will trigger these events from top scene to bottom scene.

1. Events on touched Game object
    ```javascript
    gameObject.on('pointerdown', function(pointer, localX, localY, event){ /* ... */ });
    gameObject.on('pointerup', function(pointer, localX, localY, event){ /* ... */ });
    gameObject.on('pointermove', function(pointer, localX, localY, event){ /* ... */ });
    gameObject.on('pointerover', function(pointer, localX, localY, event){ /* ... */ });
    gameObject.on('pointerout', function(pointer, event){ /* ... */ });
    ```
    - Cancel remaining touched events
        ```javascript
        function(pointer, localX, localY, event) {
            event.stopPropagation();
        }
        ```
1. Event on input plugin for each touched Game object
    ```javascript
    scene.input.on('gameobjectdown', function(pointer, gameObject, event){ /* ... */ });
    scene.input.on('gameobjectup', function(pointer, gameObject, event){ /* ... */ });
    scene.input.on('gameobjectmove', function(pointer, gameObject, event){ /* ... */ });
    scene.input.on('gameobjectover', function(pointer, gameObject, event){ /* ... */ });
    scene.input.on('gameobjectout', function(pointer, gameObject, event){ /* ... */ });
    ```
    - Cancel remaining touched events
        ```javascript
        function(pointer, gameObject, event) {
            event.stopPropagation();
        }
        ```
1. Events to get **all** touched Game Objects
    ```javascript
    scene.input.on('pointerdown', function(pointer, currentlyOver){ /* ... */ });
    scene.input.on('pointerup', function(pointer, currentlyOver){ /* ... */ });
    scene.input.on('pointermove', function(pointer, currentlyOver){ /* ... */ });
    scene.input.on('pointerover', function(pointer, justOver){ /* ... */ });
    scene.input.on('pointerout', function(pointer, justOut){ /* ... */ });
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
gameObject.on('dragstart', function(pointer, dragX, dragY){ /* ... */ });
gameObject.on('drag', function(pointer, dragX, dragY){ /* ... */ });
gameObject.on('dragend', function(pointer, dragX, dragY, dropped){ /* ... */ });
```

```javascript
scene.input.on('dragstart', function(pointer, gameObject){ /* ... */ });
scene.input.on('drag', function(pointer, gameObject, dragX, dragY){ /* ... */ });
scene.input.on('dragend', function(pointer, gameObject, dropped){ /* ... */ });
```

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
gameObject.on('drop', function(pointer, target){ /* ... */ });

gameObject.on('dragenter', function(pointer, target){ /* ... */ });
gameObject.on('dragover', function(pointer, target){ /* ... */ });
gameObject.on('dragleave', function(pointer, target){ /* ... */ });
```

```javascript
scene.input.on('drop', function(pointer, gameObject, target){ /* ... */ });

scene.input.on('dragenter', function(pointer, gameObject, target){ /* ... */ });
scene.input.on('dragover', function(pointer, gameObject, target){ /* ... */ });
scene.input.on('dragleave', function(pointer, gameObject, target){ /* ... */ });
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

### Properties of point

- Position
    - Current touching
        - Position in screen : `pointer.x` , `pointer.y`
        - Position in camera : `pointer.worldX` , `pointer.worldY`
        - Position of previous moving : `pointer.prevPosition.x` , `pointer.prevPosition.y`
    - Dragable object
        - Touching start : `pointer.downX`, `pointer.downY`
        - Touching end : `pointer.upX`, `pointer.upY`
- Touch state
    - Is touching :  `pointer.isDown`
    - Is touching start : `pointer.justDown`
    - Is touching end : `pointer.justUp`
    - Is touching move : `pointer.justMoved`
- Botton down
    - No botton down : `pointer.noButtonDown()`
    - Is primary (left) botton down : `pointer.leftButtonDown()`
    - Is secondary (right) botton down : `pointer.rightButtonDown()`
    - Is middle (mouse wheel) button down : `pointer.middleButtonDown()`
    - Is back botton down : `pointer.backButtonDown()`
    - Is forward button down : `pointer.forwardButtonDown()`
- Index in `scene.input.manager.pointers` : `pointer.id`