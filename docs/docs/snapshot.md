## Introduction

Get snapshot image, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Get snapshot image

```javascript
game.renderer.snapshot(callback);
// game.renderer.snapshot(callback, type, encoderOptions)
```

- `type` : `'image/png'`
- `encoderOptions` : `0.92`
- `callback` :
    ```javascript
    function(image){ /* ... */};
    ```
    - `image` : Image element