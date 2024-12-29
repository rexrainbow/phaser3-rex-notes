## Introduction

Get snapshot image, built-in methods of phaser.

- Author: Phaser Team

## Usage

### Get snapshot image

- Whole canvas
    ```javascript
    game.renderer.snapshot(callback);
    // game.renderer.snapshot(callback, type, encoderOptions);
    ```
- A rectangle area
    ```javascript
    game.renderer.snapshotArea(x, y, width, height, callback);
    // game.renderer.snapshot(x, y, width, height, callback, type, encoderOptions);
    ```
    - `x`, `y`, `width`, `height` : Top-left position and size based on game viewport. (not the world)
- A pixel
    ```javascript
    game.renderer.snapshotPixel(x, y, callback);
    ```

Parameters:

- `type` : `'image/png'`
- `encoderOptions` : `0.92`
- `callback` :
    ```javascript
    function(image){ /* ... */};
    ```
    - `image` : Image element