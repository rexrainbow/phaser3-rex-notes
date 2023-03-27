## Introduction

Built-in pre-fx, and post-fx shader effects

- Author: Richard Davey
- Pre-fx, and Post-fx shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Official demos](https://labs.phaser.io/index.html?dir=3.60/fx/&q=)

### Barrel

- Add pre-fx
    ```javascript
    var effectController = gameObject.preFX.addBarrel(amount);
    ```
    - `amount` : The amount of distortion applied to the barrel effect.
        - `1` : No distortion
- Add post-fx
    ```javascript
    var effectController = gameObject.postFX.addBarrel(amount);
    ```

### Bloom

### Blur

### Bokeh

### Circle

### ColorMatrix

### Displacement

### Glow

### Gradient

### Pixelate

### Shadow

### Shine

### Vignette

### Wipe