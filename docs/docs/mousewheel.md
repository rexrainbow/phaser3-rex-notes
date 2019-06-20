## Introduction

Mouse wheel events of phaser.

- Author: Richard Davey

## Usage

### Mouse wheel events

1. Events on touched Game object
    ```javascript
    gameObject.on('wheel', function(pointer, dx, dy, dz, event){ /* ... */ });
    ```
1. Event on input plugin for each touched Game object
    ```javascript
    scene.input.on('gameobjectwheel', function(pointer, gameObject, dx, dy, dz, event){ /* ... */ });
    ```
1. Events to get **all** touched Game Objects
    ```javascript
    scene.input.on('wheel', function(pointer, currentlyOver, dx, dy, dz, event){ /* ... */ });
    ```

### Mouse wheel properties

- `pointer.deltaX` : The horizontal scroll amount that occurred due to the user moving a mouse wheel or similar input device.
- `pointer.deltaY` : The vertical scroll amount that occurred due to the user moving a mouse wheel or similar input device.
- `pointer.deltaZ` : The z-axis scroll amount that occurred due to the user moving a mouse wheel or similar input device.