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
        switch (orientation) {
            case Phaser.Scale.PORTRAIT:
            case Phaser.Scale.PORTRAIT_SECONDARY:
                // ...
                break;

            default:  // Phaser.Scale.LANDSCAPE or Phaser.Scale.LANDSCAPE_SECONDARY
                // ...
                break;
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
