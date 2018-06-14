## Introduction

Built-in touch/mouse events of phaser.

- Author: Richard Davey

## Usage

### Register

Call `gameObject.setInteractive(...)` to register touch input of Game Object.

- Set hit area from texture width & height
    ```javascript
    gameObject.setInteractive();
    ```
- Set hit area from shape
    ```javascript
    gameObject.setInteractive(shape, callback);
    ```
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
            - `hitArea`: shape
            - `hitAreaCallback`: callback
        - Pixel alpha
            - `pixelPerfect` : `true`
            - `alphaTolerance` : `1`
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

### Mouse/touch events

```javascript
scene.input.on('pointerdown', function(pointer, currentlyOver){ /* ... */ });
scene.input.on('pointerup', function(pointer, currentlyOver){ /* ... */ });
scene.input.on('pointermove', function(pointer, currentlyOver){ /* ... */ });

scene.input.on('pointerover', function(pointer, justOver){ /* ... */ });
scene.input.on('pointerout', function(pointer, justOut){ /* ... */ });
```

### Active pointer

```javascript
var pointer = scene.input.activePointer;
// var x = pointer.x;
// var y = pointer.y;
```

### Mouse/touch

- Register game object
    ```javascript
    gameObject.setInteractive();       // enable
    // gameObject.setInteractive(false);  // disable
    ```
- Mouse/touch events of a game object
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

- Dragable
    ```javascript
    gameObject.setInteractive({ draggable: true });
    ```
- Disable dragable
    ```javascript
    scene.input.setDraggable(gameObject, false);
    ```
- Dragging events
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
- Dragging properties
    ```javascript
    scene.input.dragDistanceThreshold = 16;
    scene.input.dragTimeThreshold = 500;
    ```

### Drop zone

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

### Properties of point

- Position of current touching: `pointer.x` , `pointer.y`
- Position of touching start: `pointer.downX`, `pointer.downY`
- Position of touching end: `pointer.upX`, `pointer.upY`
- No botton down: `pointer.noButtonDown()`
- Is left botton down: `pointer.leftButtonDown()`
- Is right botton down: `pointer.rightButtonDown()`