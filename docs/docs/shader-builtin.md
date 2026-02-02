## Introduction

Built-in filters.

- [Barrel Distortion](#barrel) : A nice pinch / bulge distortion effect.
- [Blend mode](#blend) : Adds a Blend effect.
- [Blocky](#blocky) : Uses one color per block for a sharp, pixelated style. Ideal for retro art or clear visual masking.
- [Blur](#blur) : 3 different levels of gaussian blur (low, medium and high) and custom distance and color.
- [Bokeh](#bokeh) / [Tilt Shift](#tilt-shift) : A bokeh and tiltshift effect, with intensity, contrast and distance settings.
- [Color Matrix](#colormatrix) : Add a ColorMatrix to any Game Object with access to all of its methods, such as `sepia`, `greyscale`, `lsd` and lots more.
- [Displacement](#displacement) : Use a displacement texture, such as a noise texture, to drastically (or subtly!) alter the appearance of a Game Object.
- [Glow](#glow) : Add a smooth inner or outer glow, with custom distance, strength and color.
- [Image Light](#image-light) : Image-based lighting from panorama environment maps and normal maps.
- [Key](#key) : Remove or isolate a target color with threshold and feather controls.
- [NormalTools](#normaltools) : Rotate and reshape normal maps, or output normal-facing ratio masks.
- [Panorama Blur](#panorama-blur) : Panorama-aware blur for environment maps.
- [Parallel](#parallel) : Blend result of 2 filter lists.
- [Pixelate](#pixelate) : Blends colors in each block for a soft, mosaic look. Great for smooth transitions or gentle censorship.
- [Shadow](#shadow) : Add a drop shadow behind a Game Object, with custom depth and color.

All Game Objects and camera support filters. These are effects applied after the Game Object has been rendered.


- Author: Phaser Team
- Filters shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

!!! note
    Abandoned effects : Bloom, Circle, Gradient, Shine, Vignette, Wipe, Reveal. 
    Use [p3-fx](shader-p3fx.md) to reintroduce unsupported features.

## Live demos

- [Official demos](https://labs.phaser.io/index.html?dir=3.60/fx/&q=)

## Usage

#### Steps

- Game object
    1. Enable `filters`
        ```javascript
        gameObject.enableFilters();
        ```
    1. Setup internal camera, optional
        ```javascript
        gameObject.focusFilters();
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
    1. Apply filter padding, default is no filter padding
        ```javascript
        controller.setPaddingOverride(null);
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.amount = amount;
    ```

### Blend

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addBlend(texture, blendMode, amount, color);
    ```
    - `texture` : The texture to apply to the view.
        - `undefined` : Use built-in 4x4 white `'__WHITE'` texture.
    - `blendMode` : The blend mode to apply to the view.
        - `Phaser.BlendModes.NORMAL`, or `0` : Normal blend mode. Default value.
        - `Phaser.BlendModes.ADD`, or `1` : Add blend mode. Where both shapes overlap the color is determined by adding color values.
        - `Phaser.BlendModes.MULTIPLY`, or `2` : Multiply blend mode. The pixels are of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
        - `Phaser.BlendModes.SCREEN`, or `3` : Screen blend mode. The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
        - `Phaser.BlendModes.OVERLAY`, or `4` : Overlay blend mode. A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
        - `Phaser.BlendModes.DARKEN`, or `5` : Darken blend mode. Retains the darkest pixels of both layers.
        - `Phaser.BlendModes.LIGHTEN`, or `6` : Lighten blend mode. Retains the lightest pixels of both layers.
        - `Phaser.BlendModes.COLOR_DODGE`, or `7` : Color Dodge blend mode. Divides the bottom layer by the inverted top layer.
        - `Phaser.BlendModes.COLOR_BURN`, or `8` : Color Burn blend mode. Divides the inverted bottom layer by the top layer, and then inverts the result.
        - `Phaser.BlendModes.HARD_LIGHT`, or `9` : Hard Light blend mode. A combination of multiply and screen like overlay, but with top and bottom layer swapped.
        - `Phaser.BlendModes.SOFT_LIGHT`, or `10` : Soft Light blend mode. A softer version of hard-light. Pure black or white does not result in pure black or white.
        - `Phaser.BlendModes.DIFFERENCE`, or `11` : Difference blend mode. Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
        - `Phaser.BlendModes.EXCLUSION`, or `12` : Exclusion blend mode. Like difference, but with lower contrast.
        - `Phaser.BlendModes.HUE`, or `13` : Hue blend mode. Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
        - `Phaser.BlendModes.SATURATION`, or `14` : Saturation blend mode. Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
        - `Phaser.BlendModes.COLOR`, or `15` : Color blend mode. Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
        - `Phaser.BlendModes.LUMINOSITY`, or `16` : Luminosity blend mode. Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.
        - `Phaser.BlendModes.ERASE`, or `17` : Alpha erase blend mode.
        - `Phaser.BlendModes.SOURCE_IN`, or `18` : Source-in blend mode. The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent.
        - `Phaser.BlendModes.SOURCE_OUT`, or `19` : Source-out blend mode. The new shape is drawn where it doesn't overlap the existing canvas content.
        - `Phaser.BlendModes.SOURCE_ATOP`, or `20` : Source-out blend mode. The new shape is only drawn where it overlaps the existing canvas content.
        - `Phaser.BlendModes.DESTINATION_OVER`, or `21` : Destination-over blend mode. New shapes are drawn behind the existing canvas content.
        - `Phaser.BlendModes.DESTINATION_IN`, or `22` : Destination-in blend mode. The existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent.
        - `Phaser.BlendModes.DESTINATION_OUT`, or `23` : Destination-out blend mode. The existing content is kept where it doesn't overlap the new shape.
        - `Phaser.BlendModes.DESTINATION_ATOP`, or `24` : Destination-out blend mode. The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
        - `Phaser.BlendModes.LIGHTER`, or `25` : Lighten blend mode. Where both shapes overlap the color is determined by adding color values.
        - `Phaser.BlendModes.COPY`, or `26` : Copy blend mode. Only the new shape is shown.
        - `Phaser.BlendModes.XOR`, or `27` : Xor blend mode. Shapes are made transparent where both overlap and drawn normal everywhere else.
    - `amount` : The amount of the blend effect to apply to the view. The expected range is `0` to `1`.
        - `0` : The original image is preserved. 
        - `1` : The blend texture is fully applied. Default value.
    - `color` : The color `[r, g, b, a]` to apply to the blend texture, each component's range is `0` to `1`
        - `undefined` : The default value is `[1, 1, 1, 1]`.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addBlend();
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.amount = amount;
    ```

### Blocky

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addBlocky({size, offset});
    ```
    - `size` : The size of the blocks.
        - A number : Sets both x and y to the same value. Default value is `4`.
        - `{x, y}` 
    - `offset` : The offset of the blocks.
        - A number : Sets both x and y to the same value.  Default value is `0`.
        - `{x, y}` 
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addBlocky({size, offset});
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
    - Also destroy this controller.
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
    - Also destroy this controller.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.radius = radius;
    controller.amount = amount;
    controller.contrast = contrast;
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
    - Also destroy this controller.
- Methods
    - Brightness : Changes the brightness of this ColorMatrix by the given amount.
        ```javascript
        controller.colorMatrix.brightness(value, multiply);
        ```
        - `value` : The amount of brightness to apply to this ColorMatrix. `0`(black)~`1`. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Saturate : Changes the saturation of this ColorMatrix by the given amount.
        ```javascript
        controller.colorMatrix.saturate(value, multiply);
        ```
        - `value` :  The amount of saturation to apply to this ColorMatrix. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Desaturate : Desaturates this ColorMatrix (removes color from it).
        ```javascript
        controller.colorMatrix.desaturate(value, multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Hue : Rotates the hues of this ColorMatrix by the value given.
        ```javascript
        controller.colorMatrix.hue(rotation, multiply);
        ```
        - `rotation` : The amount of hue rotation to apply to this ColorMatrix, in degrees. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Grayscale : Sets this ColorMatrix to be grayscale.
        ```javascript
        controller.colorMatrix.grayscale(value, multiply);
        ```
        - `value` : The grayscale scale `0`(black)~`1`. Default value is `1`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - BlackWhite : Sets this ColorMatrix to be black and white.
        ```javascript
        controller.colorMatrix.blackWhite(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Contrast : Change the contrast of this ColorMatrix by the amount given.
        ```javascript
        controller.colorMatrix.contrast(value, multiply);
        ```
        - `value` : The amount of contrast to apply to this ColorMatrix. Default value is `0`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Negative : Converts this ColorMatrix to have negative values.
        ```javascript
        controller.colorMatrix.negative(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - DesaturateLuminance : Apply a desaturated luminance to this ColorMatrix.
        ```javascript
        controller.colorMatrix.desaturateLuminance(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Sepia : Applies a sepia tone to this ColorMatrix.
        ```javascript
        controller.colorMatrix.sepia(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Night : Applies a night vision tone to this ColorMatrix.
        ```javascript
        controller.colorMatrix.night(intensity, multiply);
        ```
        - `intensity` : The intensity of this effect. Default value is `0.1`.
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - LSD : Applies a trippy color tone to this ColorMatrix.
        ```javascript
        controller.colorMatrix.lsd(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Brown : Applies a brown tone to this ColorMatrix.
        ```javascript
        controller.colorMatrix.brown(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - VintagePinhole : Applies a vintage pinhole color effect to this ColorMatrix.
        ```javascript
        controller.colorMatrix.vintagePinhole(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Kodachrome : Applies a kodachrome color effect to this ColorMatrix.
        ```javascript
        controller.colorMatrix.kodachrome(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Technicolor : Applies a technicolor color effect to this ColorMatrix.
        ```javascript
        controller.colorMatrix.technicolor(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - Polaroid : Applies a polaroid color effect to this ColorMatrix.
        ```javascript
        controller.colorMatrix.polaroid(multiply);
        ```
        - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
            - `true` : Multiply the resulting.
            - `false` : Set the resulting. Default behavior.
    - ShiftToBGR : Shifts the values of this ColorMatrix into BGR order.
        ```javascript
        controller.colorMatrix.shiftToBGR(multiply);
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
    - Also destroy this controller.
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
        .filters.internal.addGlow(color, outerStrength, innerStrength, scale, knockout, quality, distance)
        .setPaddingOverride(null)
    ```
    - `color` : The color of the glow effect as a number value. Default value is `0xffffff`.
    - `outerStrength`, `innerStrength` : The strength of the glow outward/inward from the edge of the Sprite. Default value is `4`/`0`.
    - `scale` : The scale of the glow effect. This multiplies the fixed distance. Default value is `1`.
    - `knockout` : 
        - `true` : Only the glow is drawn
        - `false` : Draw glow and texture. Default behavior.
    - `quality` : The quality of the glow effect. Default is `10`. Cannot be changed after the filter has been created.
    - `distance` : The distance of the glow effect. Default is `10`. Cannot be changed after the filter has been created.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addGlow(color, outerStrength, innerStrength, scale, knockout, quality, distance);
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.color = color;
    controller.outerStrength = outerStrength;
    controller.innerStrength = innerStrength;
    controller.knockout = knockout;
    ```

### Image Light

Image-based lighting using a panorama environment map and a normal map.

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addImageLight(config);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addImageLight(config);
    ```
- `config`
    - `environmentMap` : Panorama texture key or texture instance. Default value is `'__WHITE'`.
    - `normalMap` : Normal map texture key or texture instance. Default value is `'__NORMAL'`.
    - `viewMatrix` : Matrix data for environment orientation. Optional.
    - `modelRotation` : Model rotation in radians. Default value is `0`.
    - `modelRotationSource` : Rotation source.
        - A callback function returning radians.
        - A Game Object with transform component.
        - `null` : Use `modelRotation`. Default behavior.
    - `bulge` : Surface bulge amount. Default value is `0`.
    - `colorFactor` : Light intensity factor per color channel, `[r, g, b]`. Default value is `[1, 1, 1]`.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.viewMatrix = viewMatrix;
    controller.modelRotation = modelRotation;
    controller.modelRotationSource = modelRotationSource;
    controller.bulge = bulge;
    controller.colorFactor = [r, g, b];
    ```
- Methods
    - Set environment map
        ```javascript
        controller.setEnvironmentMap(texture);
        ```
    - Set normal map
        ```javascript
        controller.setNormalMap(texture);
        ```
    - Set normal map from Game Object texture data source
        ```javascript
        controller.setNormalMapFromGameObject(gameObject);
        ```
    - Get current model rotation in radians
        ```javascript
        var rotation = controller.getModelRotation();
        ```

### Key

The Key effect removes or isolates a specific color from an image.

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addKey(config);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addKey(config);
    ```
- `config`
    - `color` : The color to use for the key.
        - A number : Hex color, like `0xff00ff`.
        - A string : Hex string, like `'#ff00ff'`.
        - An array : `[r, g, b]`, each component in range `0` to `1`.
        - A `Phaser.Display.Color` instance.
        - Default value is `[1, 1, 1, 1]`.
    - `alpha` : Alpha value of key color, range `0` to `1`. Default value is `1`.
    - `isolate` : Keep or remove matching area.
        - `true` : Keep the area matching key color, remove others.
        - `false` : Remove the area matching key color, keep others. Default behavior.
    - `threshold` : Match threshold, range `0` to `1`. Default value is `0.0625` (`1 / 16`).
    - `feather` : Soft transition outside threshold, range `0` to `1`. Default value is `0`.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.color = [r, g, b, a];  // Each component in range 0 to 1
    controller.isolate = isolate;
    controller.threshold = threshold;
    controller.feather = feather;
    ```
- Methods
    - Set key color
        ```javascript
        controller.setColor(color);
        ```
    - Set key alpha
        ```javascript
        controller.setAlpha(alpha);
        ```

### NormalTools

Manipulate normal maps (rotation, facing power, and ratio output).

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addNormalTools(config);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addNormalTools(config);
    ```
- `config`
    - `rotation` : Initial 2D rotation in radians. Default value is `0`.
    - `rotationSource` : Rotation source.
        - A callback function returning radians.
        - A Game Object with transform component.
        - `null` : Do not auto-update from source. Default behavior.
    - `facingPower` : Facing strength. Default value is `1`.
    - `outputRatio` : Output grayscale normal-facing ratio map. Default value is `false`.
    - `ratioVector` : Direction vector `[x, y, z]` for ratio output. Default value is `[0, 0, 1]`.
    - `ratioRadius` : Hemisphere ratio radius. Default value is `1`.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.viewMatrix = viewMatrix;
    controller.rotationSource = rotationSource;
    controller.facingPower = facingPower;
    controller.outputRatio = outputRatio;
    controller.ratioVector = ratioVector;
    controller.ratioRadius = ratioRadius;
    ```
- Methods
    - Get current 2D rotation
        ```javascript
        var rotation = controller.getRotation();
        ```
    - Set 2D rotation
        ```javascript
        controller.setRotation(rotation);
        ```
    - Update rotation from rotation source
        ```javascript
        controller.updateRotation();
        ```

### Panorama Blur

Blur a panorama texture with spherical distortion awareness.

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addPanoramaBlur(config);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addPanoramaBlur(config);
    ```
- `config`
    - `radius` : Blur radius. `1` samples a hemisphere, `0` samples a point. Default value is `1`.
    - `samplesX` : Sample count on X axis. Default value is `32`.
    - `samplesY` : Sample count on Y axis. Default value is `16`.
    - `power` : Sample power curve. Default value is `1`.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.radius = radius;
    controller.samplesX = samplesX;
    controller.samplesY = samplesY;
    controller.power = power;
    ```
    - Changing `samplesX` or `samplesY` will trigger shader recompilation.

### Parallel

Blend results of 2 filter lists

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addParallelFilters()
    var top = controller.top;
    var bottom = controller.bottom;
    var blend = controller.blend;
    ```
    - `top`, `bottom` : FilterList, add controller by `top.addThreshold(0.5, 1)`...
    - `blend` : [Blend controller](#blend)
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addParallelFilters();
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
    - Also destroy this controller.

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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.amount = amount;
    ```

### Shadow

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addShadow(x, y, decay, power, color, samples, intensity)
        .setPaddingOverride(null)
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
    - Also destroy this controller.
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
    - Also destroy this controller.
- Properties
    ```javascript
    controller.radius = radius;
    controller.amount = amount;
    controller.contrast = contrast;
    controller.blurX = blurX;
    controller.blurY = blurY;
    controller.strength = strength;
    ```

### Remove all effects

```javascript
gameObject.filters.internal.clear();
```
```javascript
camera.filters.internal.clear();
```

