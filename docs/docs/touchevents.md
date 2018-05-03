## Introduction

Built-in touch/mouse events of phaser.

- Author: Richard Davey

## Usage

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

Currently just 1 pointer supported.

### Mouse/touch events of game object

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

### Drag events

- Register game object and enable dragging

```javascript
gameObject.setInteractive();           // enable touching interactive
scene.input.setDraggable(gameObject);  // enable dragging
// scene.input.dragDistanceThreshold = 16;
// scene.input.dragTimeThreshold = 500;

// gameObject.setInteractive(false);             // disable
// scene.input.setDraggable(gameObject, false);  // disable dragging
```

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

### Drop events

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