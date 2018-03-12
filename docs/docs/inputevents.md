## Introduction

Events of mouse/touch, or keyboard.

- Author: Built-in phaser3 events

## Usage

### Mouse/touch events

```javascript
scene.input.on('pointerdown', function(pointer, currentlyOver){ /* ... */ });
scene.input.on('pointerup', function(pointer, currentlyOver){ /* ... */ });
scene.input.on('pointermove', function(pointer, currentlyOver){ /* ... */ });

scene.input.on('pointerover', function(pointer, justOver){ /* ... */ });
scene.input.on('pointerout', function(pointer, justOut){ /* ... */ });
```

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

// gameObject.setInteractive(false);             // disable
// scene.input.setDraggable(gameObject, false);  // disable dragging
```

```javascript
gameObject.on('dragstart', function(pointer, dragX, dragY){ /* ... */ });
gameObject.on('drag', function(pointer, dragX, dragY){ /* ... */ });
gameObject.on('dragend', function(pointer, dragX, dragY, dropped{ /* ... */ });
```

```javascript
scene.input.on('dragstart', function(pointer, gameObject){ /* ... */ });
scene.input.on('drag', function(pointer, gameObject, dragX, dragY){ /* ... */ });
scene.input.on('dragend', function(pointer, gameObject, dropped){ /* ... */ });
```