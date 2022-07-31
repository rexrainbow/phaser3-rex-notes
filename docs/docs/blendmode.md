## Introduction

Constant value of blend modes.

- Author: Richard Davey

## Usage

### WebGL and Canvas

- `'NORMAL'`, or `Phaser.BlendModes.NORMAL`, or `0` 
    - Default setting and draws new shapes on top of the existing canvas content.
- `'ADD'`, or `Phaser.BlendModes.ADD`, or `1`
    - Where both shapes overlap the color is determined by adding color values.
- `'MULTIPLY'`, or `Phaser.BlendModes.MULTIPLY`, or `2`
    - The pixels are of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
- `'SCREEN'`, or `Phaser.BlendModes.SCREEN`, or `3`
    - The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
- `'ERASE'`, or `Phaser.BlendModes.ERASE`, or `17`
    - Alpha erase blend mode. Only works when rendering to a framebuffer, like a *Render Texture*

### Canvas only 

- `'OVERLAY'`, or `Phaser.BlendModes.OVERLAY`, or `4`
    - A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
- `'DARKEN'`, or `Phaser.BlendModes.DARKEN`, or `5`
    - Retains the darkest pixels of both layers.
- `'LIGHTEN'`, or `Phaser.BlendModes.LIGHTEN`, or `6`
    - Retains the lightest pixels of both layers.
- `'COLOR_DODGE'`, or `Phaser.BlendModes.COLOR_DODGE`, or `7`
    - Divides the bottom layer by the inverted top layer.
- `'COLOR_BURN'`, or `Phaser.BlendModes.COLOR_BURN`, or `8`
    - Divides the inverted bottom layer by the top layer, and then inverts the result.
- `'HARD_LIGHT'`, or `Phaser.BlendModes.HARD_LIGHT`, or `9`
    - A combination of multiply and screen like overlay, but with top and bottom layer swapped.
- `'SOFT_LIGHT'`, or `Phaser.BlendModes.SOFT_LIGHT`, or `10`
    - A softer version of hard-light. Pure black or white does not result in pure black or white.
- `'DIFFERENCE'`, or `Phaser.BlendModes.DIFFERENCE`, or `11`
    - Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
- `'EXCLUSION'`, or `Phaser.BlendModes.EXCLUSION`, or `12`
    - Like difference, but with lower contrast.
- `'HUE'`, or `Phaser.BlendModes.HUE`, or `13`
    - Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
- `'SATURATION'`, or `Phaser.BlendModes.SATURATION`, or `14`
    - Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
- `'COLOR'`, or `Phaser.BlendModes.COLOR`, or `15`
    - Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
- `'LUMINOSITY'`, or `Phaser.BlendModes.LUMINOSITY`, or `16`
    - Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.
- `'SOURCE_IN'`, or `Phaser.BlendModes.SOURCE_IN`, or `18`
    - The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent.
- `'SOURCE_OUT'`, or `Phaser.BlendModes.SOURCE_OUT`, or `19`
    - The new shape is drawn where it doesn't overlap the existing canvas content.
- `'SOURCE_ATOP'`, or `Phaser.BlendModes.SOURCE_ATOP`, or `20`
    - The new shape is only drawn where it overlaps the existing canvas content.
- `'DESTINATION_OVER'`, or `Phaser.BlendModes.DESTINATION_OVER`, or `21`
    - New shapes are drawn behind the existing canvas content.
- `'DESTINATION_IN'`, or `Phaser.BlendModes.DESTINATION_IN`, or `22`
    - The existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent.
- `'DESTINATION_OUT'`, or `Phaser.BlendModes.DESTINATION_OUT`, or `23`
    - The existing content is kept where it doesn't overlap the new shape.
- `'DESTINATION_ATOP'`, or `Phaser.BlendModes.DESTINATION_ATOP`, or `24`
    - The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
- `'LIGHTER'`, or `Phaser.BlendModes.LIGHTER`, or `25`
    - Where both shapes overlap the color is determined by adding color values.
- `'COPY'`, or `Phaser.BlendModes.COPY`, or `26`
    - Only the new shape is shown.
- `'XOR'`, or `Phaser.BlendModes.XOR`, or `27`
    - Shapes are made transparent where both overlap and drawn normal everywhere else.

Blend modes have different effects under Canvas and WebGL, and from browser to browser, depending
on support. Blend Modes also cause a WebGL batch flush should it encounter a new blend mode. For these
reasons try to be careful about the construction of your Scene and the frequency in which blend modes
are used.