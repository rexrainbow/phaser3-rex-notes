## Introduction

Built-in filters.

- [Barrel Distortion](#barrel) : A nice pinch / bulge distortion effect.
- [Blend mode](#blend) : Adds a Blend effect.
- [Blocky](#blocky) : Uses one color per block for a sharp, pixelated style. Ideal for retro art or clear visual masking.
- [Blur](#blur) : 3 different levels of gaussian blur (low, medium and high) and custom distance and color.
- [Bokeh](#bokeh) / [Tilt Shift](#tilt-shift) : A bokeh and tiltshift effect, with intensity, contrast and distance settings.
- [Color Matrix](#colormatrix) : Add a ColorMatrix to any Game Object with access to all of its methods, such as `sepia`, `greyscale`, `lsd` and lots more.
- [Combine Color Matrix](#combine-color-matrix) : Combine channels from base and transfer textures with color matrix control.
- [Displacement](#displacement) : Use a displacement texture, such as a noise texture, to drastically (or subtly!) alter the appearance of a Game Object.
- [Glow](#glow) : Add a smooth inner or outer glow, with custom distance, strength and color.
- [Gradient Map](#gradient-map) : Recolor an image by mapping its progress value through a color ramp.
- [Image Light](#image-light) : Image-based lighting from panorama environment maps and normal maps.
- [Key](#key) : Remove or isolate a target color with threshold and feather controls.
- [NormalTools](#normaltools) : Rotate and reshape normal maps, or output normal-facing ratio masks.
- [Panorama Blur](#panorama-blur) : Panorama-aware blur for environment maps.
- [Parallel](#parallel) : Blend result of 2 filter lists.
- [Pixelate](#pixelate) : Blends colors in each block for a soft, mosaic look. Great for smooth transitions or gentle censorship.
- [Shadow](#shadow) : Add a drop shadow behind a Game Object, with custom depth and color.
- [Threshold](#threshold) : Converts channel values to hard or soft threshold output, with per-channel edge and invert controls.
- [Vignette](#vignette) : Darken or color the edges of the view to draw attention toward a focal point.
- [Wipe/Reveal](#wipereveal) : Directionally hide or reveal the input, optionally using another texture for transitions.

All Game Objects and camera support filters. These are effects applied after the Game Object has been rendered.


Composite filters

- [Bloom](groupactions.md#add-bloom-effect)
- [Shine](groupactions.md#add-shine-effect)


!!! warning "WebGL only"
    Only work in WebGL render mode.

!!! note
    Abandoned effects : Circle, Gradient.
    Use [p3-fx](shader-p3fx.md) to reintroduce unsupported features.

- Author: Phaser Team
- Filters shader effects

## Live demos

- [Official demos](https://labs.phaser.io/index.html?dir=3.60/fx/&q=)

## Usage

### Steps

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
        .filters.internal.addBarrel(amount)
        .setPaddingOverride(null)
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
- Use color matrix effect
    ```javascript
    controller.colorMatrix.brightness(value);
    ```
    ```javascript
    controller.colorMatrix.saturate(value);
    controller.colorMatrix.desaturate();
    ```
    ```javascript
    controller.colorMatrix.contrast(value);
    ```
    ```javascript
    controller.colorMatrix.grayscale(value);
    ```
    And more... see [color matrix](#color-matrix)
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
    var colorMatrix = controller.colorMatrix;
    ```
    - `colorMatrix` : See [color matrix](#color-matrix)


### Combine Color Matrix

Combine channels from the base input and a transfer texture.

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addCombineColorMatrix(texture);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addCombineColorMatrix(texture);
    ```
    - `texture` : Transfer texture key or texture instance.
        - `undefined` : Use built-in `'__WHITE'` texture.
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
    var colorMatrixSelf = controller.colorMatrixSelf;
    var colorMatrixTransfer = controller.colorMatrixTransfer;
    controller.colorMatrixTransfer;
    controller.additions = [r, g, b, a];
    controller.multiplications = [r, g, b, a];
    ```
    - `colorMatrixSelf`, `colorMatrixTransfer` : See [color matrix](#color-matrix) 
    - `additions` : Add weights of final channels. Default value is `[1, 1, 1, 0]`. See [How to use `additions` and `multiplications`](#how-to-use-additions-and-multiplications)
    - `multiplications` : Multiply weights of final channels. Default value is `[0, 0, 0, 1]`. See [How to use `additions` and `multiplications`](#how-to-use-additions-and-multiplications)
- Methods
    - Set transfer texture
        ```javascript
        controller.setTexture(texture);
        ```
    - Configure common alpha transfer behavior
        ```javascript
        controller.setupAlphaTransfer(
            colorSelf,
            colorTransfer,
            brightnessToAlphaSelf,
            brightnessToAlphaTransfer,
            brightnessToAlphaInverseSelf,
            brightnessToAlphaInverseTransfer
        );
        ```
        - `colorSelf` : 
            - `true` : Keep color from the base image.
        - `colorTransfer` :
            - `true` : Keep color from the transfer texture.
        - `brightnessToAlphaSelf` :
            - `true` : Determine the base alpha from the base brightness
        - `brightnessToAlphaTransfer` :
            - `true` : Determine the transfer alpha from the transfer brightness.
        - `brightnessToAlphaInverseSelf` :
            - `true` : Determine the base alpha from the base brightness, inverted. This overrides `brightnessToAlphaSelf`.
        - `brightnessToAlphaInverseTransfer` :
            - `true` : Determine the transfer alpha from the transfer brightness, inverted. This overrides `brightnessToAlphaTransfer`.


#### How to use `additions` and `multiplications`

`additions` and `multiplications` control how the processed `self` and `transfer` results are merged per channel.

For each output channel (`r`, `g`, `b`, `a`), the filter computes:

```javascript
output = (self + transfer) * additions + (self * transfer) * multiplications;
```

This means:

- `additions` controls the additive part of the final result.
- `multiplications` controls the multiplicative part of the final result.
- Each array entry maps to one channel: `[r, g, b, a]`.
- A value of `1` keeps that contribution; a value of `0` disables it.

Examples:

- `additions = [1, 1, 1, 1]`, `multiplications = [0, 0, 0, 0]`
  Use when all channels should be combined by addition. Useful for overlay-like or glow-like texture merging.

- `additions = [0, 0, 0, 0]`, `multiplications = [1, 1, 1, 1]`
  Use when all channels should be combined by multiplication. Useful for masking, darkening, or intersection-like blending.

- `additions = [1, 1, 1, 0]`, `multiplications = [0, 0, 0, 1]`
  Use when RGB should be added, but alpha should be multiplied. This is useful when combining color from both textures while keeping visibility limited by both alpha channels.

- `additions = [0, 0, 0, 1]`, `multiplications = [1, 1, 1, 0]`
  Use when RGB should be multiplied, but alpha should be added. This is useful when a transfer texture acts like a lightmap or tint mask, while alpha remains more permissive.

- RGB from `self`, alpha from `transfer`
  A common setup when you want to preserve the base color but use another texture to define transparency, such as applying an external alpha mask.

A simple rule of thumb:

- Use `addition` when you want to layer or expand visible contribution.
- Use `multiplication` when you want to restrict, mask, or darken the result.


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

### Gradient Map

Color conversion can collide: 
different input colors can produce the same progress value, 
then map to the same output color on the ramp.

Use this effect for brightness remapping, grayscale recoloring, duotone looks, heatmap-style recoloring, 
or palette-like remapping when the source image already fits a one-dimensional value scale.


- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addGradientMap(config);
    ```
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addGradientMap(config);
    ```
    - `config.ramp` : The color ramp used to map progress to output color.
        - `undefined` : Use a simple black-to-white ramp.
        - A band config object, or an array of band config objects.
            ```javascript
            {
                colorStart: 0x000000,
                colorEnd:
                size:
                start: 0, middle: 0.5, end: 1,
                interpolation: 0,
            }
            ```                
            ```javascript
            [
                {
                    colorStart: ,
                    colorEnd: ,
                    colorSpace: ,
                    size:
                },
                {
                    colorStart: ,
                    colorEnd: ,
                    colorSpace: ,
                    size:
                },
                // ...
            ]
            ```
            - `colorStart`, `colorEnd` : Start and end color of the band, can be a number, hex string, `[r, g, b]` / `[r, g, b, a]`, or a `Phaser.Display.Color` instance.                
            - `start`, `end` : Normalized range of this band in the ramp, usually `0` to `1`.
            - `size` : Alternative to `end`, meaning `end = start + size`.
            - `middle` : Midpoint bias of interpolation. Default value is `0.5`.
            - `interpolation` : Interpolation style.
                - `0` : LINEAR - a straight blend.
                - `1` : CURVED - color changes quickly at start and end, flattening in the middle. Good for convex surfaces.
                - `2` : SINUSOIDAL - color changes quickly in the middle, flattening at start and end. Good for smooth transitions.
                - `3` : CURVE_START - color changes quickly at the start, flattening at the end.
                - `4` : CURVE_END - color changes quickly at the end, flattening at the start.
            - `colorSpace` : `colorStart` and `colorEnd` blending space.
                - `0` : RGBA - channels are blended directly. This can be inaccurate.
                - `1` : HSVA_NEAREST - colors are blended in HSVA space, better preserving saturation and lightness. The hue is blended with the shortest angle, e.g. red and blue blend via purple, not green.
                - `2` : HSVA_PLUS - as HSVA_NEAREST, but hue angle always increases.
                - `3` : HSVA_MINUS - as HSVA_NEAREST, but hue angle always decreases.
    - `config.dither` : Use Interleaved Gradient Noise to reduce ramp banding. Default value is `false`.
    - `config.color` : Values added to ramp progress after `colorFactor`. Default value is `[0, 0, 0, 0]`.
    - `config.colorFactor` : Weights used to convert the input sample into ramp progress. Default value is `[0.3, 0.6, 0.1, 0]`.
    - `config.unpremultiply` : Unpremultiply the input before computing progress. Default value is `true`.
    - `config.alpha` : Blend amount of the mapped result over the original image. Default value is `1`.
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
    controller.ramp = ramp;
    controller.dither = dither;
    controller.color = [r, g, b, a];
    controller.colorFactor = [r, g, b, a];
    controller.unpremultiply = unpremultiply;
    controller.alpha = alpha;
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

### Threshold

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addThreshold(edge1, edge2, invert);
    ```
    - `edge1` : The first edge of the threshold.
        - A number : Sets RGBA channels to the same value. Default value is `0.5`.
        - An array `[r, g, b, a]` : Sets each channel separately, each component's range is `0` to `1`.
    - `edge2` : The second edge of the threshold.
        - A number : Sets RGBA channels to the same value. Default value is `0.5`.
        - An array `[r, g, b, a]` : Sets each channel separately, each component's range is `0` to `1`.
        - `undefined` : Use `edge1`.
    - `invert` : Whether each channel is inverted.
        - A boolean : Sets RGBA channels to the same value. Default value is `false`.
        - An array `[r, g, b, a]` : Sets each channel separately.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addThreshold(edge1, edge2, invert);
    ```
- Set edges
    ```javascript
    controller.setEdge(edge1, edge2);
    ```
    - If `edge2` is not provided, it will be set to `edge1`.
    - If any channel in `edge1` is greater than the same channel in `edge2`, these values are swapped.
- Set invert
    ```javascript
    controller.setInvert(invert);
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
    controller.edge1 = edge1;
    controller.edge2 = edge2;
    controller.invert = invert;
    ```
    - `edge1`, `edge2` : Threshold edge arrays `[r, g, b, a]`, each component's range is `0` to `1`.
        - If the two edges are the same, the threshold has no interpolation and outputs either `0` or `1`.
        - Values between two different edges are linearly interpolated.
    - `invert` : Invert state array `[r, g, b, a]`.

### Vignette

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addVignette(x, y, radius, strength, color, blendMode);
    ```
    - `x`, `y` : The horizontal/vertical offset of the vignette center. Range is `0` to `1`. Default value is `0.5`.
    - `radius` : The radius of the vignette effect. Range is `0` to `1`. Default value is `0.5`.
    - `strength` : The strength of the vignette effect. Default value is `0.5`.
    - `color` : The color of the vignette effect. Default value is `0x000000`.
        - A number : Hex color, for example `0x000000`.
        - A string : Hex string, for example `'#000000'`.
        - A color object : `Phaser.Display.Color`, or `{r, g, b, a}`.
    - `blendMode` : The blend mode to use with the vignette. Default value is `Phaser.BlendModes.NORMAL`.
        - `Phaser.BlendModes.NORMAL`, or `0` : Normal blend mode.
        - `Phaser.BlendModes.ADD`, or `1` : Add blend mode.
        - `Phaser.BlendModes.MULTIPLY`, or `2` : Multiply blend mode.
        - `Phaser.BlendModes.SCREEN`, or `3` : Screen blend mode.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addVignette(x, y, radius, strength, color, blendMode);
    ```
- Set color
    ```javascript
    controller.setColor(color);
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
    controller.radius = radius;
    controller.strength = strength;
    controller.blendMode = blendMode;
    ```
    ```javascript
    var color = controller.color;
    ```
    - `color` : A `Phaser.Display.Color` instance.

### Wipe/Reveal

- Add filter controller to game object
    ```javascript
    var controller = gameObject
        .enableFilters()
        .filters.internal.addWipe(wipeWidth, direction, axis, reveal, wipeTexture);
    ```
    - `wipeWidth` : The width of the wipe effect. Range is `0` to `1`. Default value is `0.1`.
    - `direction` : The direction of the wipe effect. Default value is `0`.
        - `0` : Left to right on the X axis, or bottom to top on the Y axis.
        - `1` : Right to left on the X axis, or top to bottom on the Y axis.
    - `axis` : The axis of the wipe effect. Default value is `0`.
        - `0` : X axis.
        - `1` : Y axis.
    - `reveal` : Is this a reveal or wipe effect? Default value is `0`.
        - `0` : Wipe effect. Shows the input in unwiped areas.
        - `1` : Reveal effect. Shows the input in wiped areas.
    - `wipeTexture` : Texture or texture key to use where the input texture is not shown.
        - `undefined` : Use built-in blank `'__DEFAULT'` texture.
- Add filter controller to camera
    ```javascript
    var controller = camera
        .filters.internal.addWipe(wipeWidth, direction, axis, reveal, wipeTexture);
    ```
- Progress transition
    ```javascript
    controller.setProgress(value);
    ```
    ```javascript
    controller.progress = value;
    ```
    - `value` : Progress of the wipe effect. Range is `0` to `1`.
        - `0` : The transition has not started.
        - `1` : The transition is complete.
- Set wipe width
    ```javascript
    controller.setWipeWidth(width);
    ```
    - `width` : The width of the wipe effect. Range is `0` to `1`. Default value is `0.1`.
- Set direction
    ```javascript
    controller.setLeftToRight();
    ```
    ```javascript
    controller.setRightToLeft();
    ```
    ```javascript
    controller.setTopToBottom();
    ```
    ```javascript
    controller.setBottomToTop();
    ```
    - Direction mappings :
        - Left to right : `direction = 0`, `axis = 0`
        - Right to left : `direction = 1`, `axis = 0`
        - Top to bottom : `direction = 1`, `axis = 1`
        - Bottom to top : `direction = 0`, `axis = 1`
- Set effect mode
    ```javascript
    controller.setWipeEffect();
    ```
    ```javascript
    controller.setRevealEffect();
    ```
    - `setWipeEffect()` : Sets `reveal` to `0`, and resets `progress` to `0`.
    - `setRevealEffect()` : Sets `reveal` to `1`, resets `progress` to `0`, and resets `wipeTexture` to the default blank texture.
- Set wipe texture
    ```javascript
    controller.setTexture(texture);
    ```
    - `texture` : Texture or texture key to use where the input is removed.
        - `undefined` : Use built-in blank `'__DEFAULT'` texture.
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
    controller.progress = progress;
    controller.wipeWidth = wipeWidth;
    controller.direction = direction;
    controller.axis = axis;
    controller.reveal = reveal;
    ```
    ```javascript
    var wipeTexture = controller.wipeTexture;
    ```
    - `wipeTexture` : A `Phaser.Textures.Texture` instance.

### Remove all effects

```javascript
gameObject.filters.internal.clear();
```
```javascript
camera.filters.internal.clear();
```

### Color matrix

- Brightness : Changes the brightness of this ColorMatrix by the given amount.
    ```javascript
    colorMatrix.brightness(value, multiply);
    ```
    - `value` : The amount of brightness to apply to this ColorMatrix. `0`(black)~`1`. Default value is `0`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Saturate : Changes the saturation of this ColorMatrix by the given amount.
    ```javascript
    colorMatrix.saturate(value, multiply);
    ```
    - `value` :  The amount of saturation to apply to this ColorMatrix. Default value is `0`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Desaturate : Desaturates this ColorMatrix (removes color from it).
    ```javascript
    colorMatrix.desaturate(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Hue : Rotates the hues of this ColorMatrix by the value given.
    ```javascript
    colorMatrix.hue(rotation, multiply);
    ```
    - `rotation` : The amount of hue rotation to apply to this ColorMatrix, in degrees. Default value is `0`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Grayscale : Sets this ColorMatrix to be grayscale.
    ```javascript
    colorMatrix.grayscale(value, multiply);
    ```
    - `value` : The grayscale scale `0`(black)~`1`. Default value is `1`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- BlackWhite : Sets this ColorMatrix to be black and white.
    ```javascript
    colorMatrix.blackWhite(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Black : Sets this ColorMatrix to be black, only preserving alpha.
    ```javascript
    colorMatrix.black(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Contrast : Change the contrast of this ColorMatrix by the amount given.
    ```javascript
    colorMatrix.contrast(value, multiply);
    ```
    - `value` : The amount of contrast to apply to this ColorMatrix. Default value is `0`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Negative : Converts this ColorMatrix to have negative values.
    ```javascript
    colorMatrix.negative(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- DesaturateLuminance : Apply a desaturated luminance to this ColorMatrix.
    ```javascript
    colorMatrix.desaturateLuminance(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Sepia : Applies a sepia tone to this ColorMatrix.
    ```javascript
    colorMatrix.sepia(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Night : Applies a night vision tone to this ColorMatrix.
    ```javascript
    colorMatrix.night(intensity, multiply);
    ```
    - `intensity` : The intensity of this effect. Default value is `0.1`.
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- LSD : Applies a trippy color tone to this ColorMatrix.
    ```javascript
    colorMatrix.lsd(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Brown : Applies a brown tone to this ColorMatrix.
    ```javascript
    colorMatrix.brown(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- VintagePinhole : Applies a vintage pinhole color effect to this ColorMatrix.
    ```javascript
    colorMatrix.vintagePinhole(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Kodachrome : Applies a kodachrome color effect to this ColorMatrix.
    ```javascript
    colorMatrix.kodachrome(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Technicolor : Applies a technicolor color effect to this ColorMatrix.
    ```javascript
    colorMatrix.technicolor(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- Polaroid : Applies a polaroid color effect to this ColorMatrix.
    ```javascript
    colorMatrix.polaroid(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- AlphaToBrightness : Replaces color with a grayscale version of alpha, where black represents transparency and white represents opacity, and sets alpha to full.
    ```javascript
    colorMatrix.alphaToBrightness(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- AlphaToBrightnessInverse : Replaces color with a grayscale version of alpha, where white represents transparency and black represents opacity, and sets alpha to full.
    ```javascript
    colorMatrix.alphaToBrightnessInverse(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- BrightnessToAlpha : Preserves RGB, but replaces alpha with the brightness of the color.
    ```javascript
    colorMatrix.brightnessToAlpha(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- BrightnessToAlphaInverse : Preserves RGB, but replaces alpha with the inverted brightness of the color.
    ```javascript
    colorMatrix.brightnessToAlphaInverse(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
- ShiftToBGR : Shifts the values of this ColorMatrix into BGR order.
    ```javascript
    colorMatrix.shiftToBGR(multiply);
    ```
    - `multiply` : Multiply the resulting ColorMatrix (`true`), or set it (`false`) ?
        - `true` : Multiply the resulting.
        - `false` : Set the resulting. Default behavior.
