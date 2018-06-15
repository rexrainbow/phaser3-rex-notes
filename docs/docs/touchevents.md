## Introduction

Built-in touch/mouse events of phaser.

- Author: Richard Davey

## Usage

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
    - Circle
        - shape : `new Phaser.Geom.Circle(x, y, radius)`
        - callback : `Phaser.Geom.Circle.Contains`
    - Ellipse
        - shape : `new Phaser.Geom.Ellipse(x, y, width, height)`
        - callback : `Phaser.Geom.Ellipse.Contains`    
    - Rectangle
        - shape : `new Phaser.Geom.Rectangle(x, y, width, height)`
        - callback : `Phaser.Geom.Rectangle.Contains`      
    - Triangle
        - shape : `new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3)`
        - callback : `Phaser.Geom.Triangle.Contains`       
    - Polygon
        - shape : `new Phaser.Geom.Polygon(points)`
        - callback : `Phaser.Geom.Polygon.Contains`
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
    Properties:
    - Hit area
        - Shape
            - Circle
                - `hitArea` : `new Phaser.Geom.Circle(x, y, radius)`
                - `hitAreaCallback` : `Phaser.Geom.Circle.Contains`
            - Ellipse
                - `hitArea` : `new Phaser.Geom.Ellipse(x, y, width, height)`
                - `hitAreaCallback` : `Phaser.Geom.Ellipse.Contains`    
            - Rectangle
                - `hitArea` : `new Phaser.Geom.Rectangle(x, y, width, height)`
                - `hitAreaCallback` : `Phaser.Geom.Rectangle.Contains`      
            - Triangle
                - `hitArea` : `new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3)`
                - `hitAreaCallback` : `Phaser.Geom.Triangle.Contains`       
            - Polygon
                - `hitArea` : `new Phaser.Geom.Polygon(points)`
                - `hitAreaCallback` : `Phaser.Geom.Polygon.Contains`
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

```javascript
gameObject.setInteractive(false);
```

### Touch events

- Events to get **all** touched Game Objects
    ```javascript
    scene.input.on('pointerdown', function(pointer, currentlyOver){ /* ... */ });
    scene.input.on('pointerup', function(pointer, currentlyOver){ /* ... */ });
    scene.input.on('pointermove', function(pointer, currentlyOver){ /* ... */ });

    scene.input.on('pointerover', function(pointer, justOver){ /* ... */ });
    scene.input.on('pointerout', function(pointer, justOut){ /* ... */ });
    ```
- Events to get touched Game object
    ```javascript
    gameObject.on('pointerdown', function(pointer, localX, localY, camera){ /* ... */ });
    gameObject.on('pointerup', function(pointer, localX, localY){ /* ... */ });
    gameObject.on('pointermove', function(pointer, localX, localY){ /* ... */ });
    
    gameObject.on('pointerover', function(pointer, localX, localY){ /* ... */ });
    gameObject.on('pointerout', function(pointer){ /* ... */ });
    ```
    ```javascript
    scene.input.on('gameobjectdown', function(pointer, gameObject){ /* ... */ });
    scene.input.on('gameobjectup', function(pointer, gameObject){ /* ... */ });
    scene.input.on('gameobjectmove', function(pointer, gameObject){ /* ... */ });
    
    scene.input.on('gameobjectover', function(pointer, gameObject){ /* ... */ });
    scene.input.on('gameobjectout', function(pointer, gameObject){ /* ... */ });
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

### Properties of point

- Position
    - Current touching
        - Position in screen : `pointer.x` , `pointer.y`
        - Position in camera : `pointer.worldX` , `pointer.worldY`
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