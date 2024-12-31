## Introduction

Built-in filters.

- [Barrel Distortion](shader-builtin.md#barrel) : A nice pinch / bulge distortion effect.
- [Blur](shader-builtin.md#blur) : 3 different levels of gaussian blur (low, medium and high) and custom distance and color.
- [Bokeh](shader-builtin.md#bokeh) / [Tilt Shift](shader-builtin.md#tilt-shift) : A bokeh and tiltshift effect, with intensity, contrast and distance settings.
- [Color Matrix](shader-builtin.md#colormatrix) : Add a ColorMatrix to any Game Object with access to all of its methods, such as `sepia`, `greyscale`, `lsd` and lots more.
- [Glow](shader-builtin.md#glow) : Add a smooth inner or outer glow, with custom distance, strength and color.
- [Displacement](shader-builtin.md#displacement) : Use a displacement texture, such as a noise texture, to drastically (or subtly!) alter the appearance of a Game Object.
- [Pixelate](shader-builtin.md#pixelate) : Make any Game Object appear pixelated, to a varying degree.
- [Shadow](shader-builtin.md#shadow) : Add a drop shadow behind a Game Object, with custom depth and color.

All Game Objects and camera support filters. These are effects applied after the Game Object has been rendered.


- Author: Phaser Team
- Filters shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

!!! note
    Abandoned effects : Bloom, Circle Outline, Gradient, Shine, Vignette, Wipe, Reveal

## Live demos

- [Official demos](https://labs.phaser.io/index.html?dir=3.60/fx/&q=)

## Usage

#### Steps

- Game object
    1. Enable `filters`
        ```javascript
        gameObject.enableFilters();
        ```
    1. Get filter list
        ```javascript
        var filterList = gameObject.filters.internal;
        ```
        ```javascript
        var filterList = gameObject.filters.external;
        ```
    1. Add filter controller
        ```javascript
        var controller = filterList.addBarrel();
        ```
- Camera
    1. Get filter list
        ```javascript
        var filterList = camera.filters.internal;
        ```
        ```javascript
        var filterList = camera.filters.external;
        ```
    1. Add filter controller
        ```javascript
        var controller = filterList.addBarrel();
        ```

### Barrel

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addBarrel(amount);
    ```
    - `amount` : The amount of distortion applied to the barrel effect.
        - `1` : No distortion
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addBarrel();
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.amount = amount;
    ```


### Blur

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addBlur(quality, x, y, strength, color, steps);
    ```
    - `quality` : The quality of the blur effect. Default value is `0`.
        - `0` : Low Quality
        - `1` : Medium Quality
        - `2` : High Quality
    - `x`, `y` : The horizontal/vertical offset of the blur effect. Default value is `2`
    - `strength` : The strength of the blur effect. Default value is `1`.
    - `color` : The color of the blur, as a hex value. Default value is `0xffffff`.
    - `steps` : The number of steps to run the blur effect for. This value should always be an integer.
        - The higher the value, the smoother the blur, but at the cost of exponentially more gl operations.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addBlur(quality, x, y, strength, color, steps);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.quality = quality;
    controller.x = x;
    controller.y = y;
    controller.strength = strength;
    controller.color = color;
    controller.steps = steps;
    ```

### Bokeh

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addBokeh(radius, amount, contrast);
    ```
    - `radius` : The radius of the bokeh effect. Default value is `0.5`.
    - `amount` : The amount of the bokeh effect. Default value is `1`.
    - `contrast` : The color contrast of the bokeh effect. Default value is `0.2`.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addBlur(quality, x, y, strength, color, steps);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.radius = radius;
    controller.amount = amount;
    controller.contrast = contrast;
    ```

### Tilt Shift

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addTiltShift(radius, amount, contrast, blurX, blurY, strength);
    ```
    - `radius` : The radius of the bokeh effect. Default value is `0.5`.
    - `amount` : The amount of the bokeh effect. Default value is `1`.
    - `contrast` : The color contrast of the bokeh effect. Default value is `0.2`.
    - `blurX`, `blurY` : The amount of horizontal/vertical blur.
    - `strength` : The strength of the blur.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addTiltShift(radius, amount, contrast, blurX, blurY, strength);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.radius = radius;
    controller.amount = amount;
    controller.contrast = contrast;
    controller.blurX = blurX;
    controller.blurY = blurY;
    controller.strength = strength;
    ```


### ColorMatrix

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addColorMatrix();
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addColorMatrix();
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Methods
    - Brightness : Changes the brightness of this ColorMatrix by the given amount.
        ```javascript
        controller.brightness(value, multiply);
        ```
        - `value` : The amount of brightness to apply to this ColorMatrix. `0`(black)~`1`. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Saturate : Changes the saturation of this ColorMatrix by the given amount.
        ```javascript
        controller.saturate(value, multiply);
        ```
        - `value` :  The amount of saturation to apply to this ColorMatrix. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Desaturate : Desaturates this ColorMatrix (removes color from it).
        ```javascript
        controller.desaturate(value, multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Hue : Rotates the hues of this ColorMatrix by the value given.
        ```javascript
        controller.hue(rotation, multiply);
        ```
        - `rotation` : The amount of hue rotation to apply to this ColorMatrix, in degrees. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Grayscale : Sets this ColorMatrix to be grayscale.
        ```javascript
        controller.grayscale(value, multiply);
        ```
        - `value` : The grayscale scale `0`(black)~`1`. Default value is `1`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - BlackWhite : Sets this ColorMatrix to be black and white.
        ```javascript
        controller.blackWhite(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Contrast : Change the contrast of this ColorMatrix by the amount given.
        ```javascript
        controller.contrast(value, multiply);
        ```
        - `value` : The amount of contrast to apply to this ColorMatrix. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Negative : Converts this ColorMatrix to have negative values.
        ```javascript
        controller.negative(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - DesaturateLuminance : Apply a desaturated luminance to this ColorMatrix.
        ```javascript
        controller.desaturateLuminance(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Sepia : Applies a sepia tone to this ColorMatrix.
        ```javascript
        controller.sepia(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Night : Applies a night vision tone to this ColorMatrix.
        ```javascript
        controller.night(intensity, multiply);
        ```
        - `intensity` : The intensity of this effect. Default value is `0.1`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - LSD : Applies a trippy color tone to this ColorMatrix.
        ```javascript
        controller.lsd(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Brown : Applies a brown tone to this ColorMatrix.
        ```javascript
        controller.brown(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - VintagePinhole : Applies a vintage pinhole color effect to this ColorMatrix.
        ```javascript
        controller.vintagePinhole(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Kodachrome : Applies a kodachrome color effect to this ColorMatrix.
        ```javascript
        controller.kodachrome(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Technicolor : Applies a technicolor color effect to this ColorMatrix.
        ```javascript
        controller.technicolor(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Polaroid : Applies a polaroid color effect to this ColorMatrix.
        ```javascript
        controller.polaroid(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - ShiftToBGR : Shifts the values of this ColorMatrix into BGR order.
        ```javascript
        controller.shiftToBGR(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.

### Displacement

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addDisplacement(texture, x, y);
    ```
    - `texture` : The unique string-based key of the texture to use for displacement, which must exist in the Texture Manager. Default value is `'__WHITE'`.
        - You can only use a whole texture, not a frame from a texture atlas or sprite sheet.
    - `x`, `y` : The amount of horizontal/vertical displacement to apply. Default value is `0.005`.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addDisplacement(texture, x, y);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.x = x;
    controller.y = y;    
    ```
- Methods
    - Set texture
        ```javascript
        controller.setTexture(key);
        ``` 

### Glow

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addGlow(color, outerStrength, innerStrength, knockout);
    ```
    - `color` : The color of the glow effect as a number value. Default value is `0xffffff`.
    - `outerStrength`, `innerStrength` : The strength of the glow outward/inward from the edge of the Sprite. Default value is `4`/`0`.
    - `knockout` : 
        - `true` : Only the glow is drawn
        - `false` : Draw glow and texture. Default behavior.
    - `quality` : Only available for PostFX. Sets the quality of this Glow effect. Default is 0.1. Cannot be changed post-creation.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addGlow(color, outerStrength, innerStrength, knockout, quality, distance);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.color = color;
    controller.outerStrength = outerStrength;
    controller.innerStrength = innerStrength;
    controller.knockout = knockout;
    ```

### Pixelate

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addPixelate(amount);
    ```
    - `amount` : The amount of pixelation to apply, in pixels.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addPixelate(amount);
    ```
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.amount = amount;
    ```

### Shadow

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addShadow(x, y, decay, power, color, samples, intensity);
    ```
    - `padding` : The amount of padding to add to this Game Object, in pixels.
        - Used when `amount` is larger than `1`.    
    - `x`, `y` : The horizontal/vertical offset of the shadow effect. Default value is `0`.
    - `decay` : The amount of decay for shadow effect. Default value is `0.1`.
    - `power` : The power of the shadow effect. Default value is `1`.
    - `color` : The color of the shadow. Default value is `0x000000`.
    - `samples` : The number of samples that the shadow effect will run for. An integer between `1` and `12`.
    - `intensity` : The intensity of the shadow effect. Default value is `1`.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addShadow(x, y, decay, power, color, samples, intensity);
    ``` 
- Disable filter controller
    ```javascript
    controller.setActive(false);
    // controller.active = false;
    ```
- Remove filter controller
    ```javascript
    gameObject.filters.internal.remove(controller);
    ```
    ```javascript
    camera.filters.internal.remove(controller);
    ```
- Properties
    ```javascript
    controller.x = x;
    controller.y = y;
    controller.decay = decay;
    controller.power = power;
    controller.color = color;
    controller.samples = samples;
    controller.intensity = intensity;
    ```

### Remove all effects

```javascript
gameObject.filters.internal.clear();
```
```javascript
camera.filters.internal.clear();
```
