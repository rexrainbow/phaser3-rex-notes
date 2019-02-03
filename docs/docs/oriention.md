## Introduction

Get oriention, built-in method of phaser.

- Author: Richard Davey

## Usage

### Orientation

```javascript
var orientation = scene.scale.orientation;
```

### Events

- On orientation change
    ```javascript
    scene.scale.on('orientationchange', function(orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            // ...
        } else if (orientation === Phaser.Scale.LANDSCAPE) {
            // ...
        }
    });
    ```

### Lock orientation

```javascript
scene.scale.lockOrientation(orientation)
```

- `orientation` :   
    - `'portrait'`
    - `'landscape'`
    - `'portrait-primary'`
    - `'portrait-secondary'`
    - `'landscape-primary'`
    - `'landscape-secondary'`
    - `'default'`
