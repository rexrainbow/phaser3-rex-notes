## Introduction

A quad which displays random white noise, built-in game object of phaser.

- Author: Phaser Team
- Game object

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Usage

### Add noise object

```javascript
var noise = scene.add.noise({
    // noiseOffset: [0, 0],
    // noisePower: 1,
    // noiseColorStart: 0x000000,
    // noiseColorEnd: 0xffffff,
    // noiseRandomChannels: false,
    // noiseRandomNormal: false
}, x, y, width, height);
```

- `config` : Configuration of noise texture.
    - `noiseOffset` : Offset of the noise pattern, in `[x, y]`.
    - `noisePower` : Power applied to each noise value.
    - `noiseColorStart`, `noiseColorEnd` : Color mapped to low/high noise values. Default value is `0x000000`/`0xffffff`.
        - Number, 24-bit RGB (`0xRRGGBB`) or 32-bit ARGB (`0xAARRGGBB`).
        - String hex color, like `'#0033ff'`, `'#03f'`, `'0x0033ff'`, or `'0033ff'`.
        - Array in WebGL color format, `[red, green, blue]` or `[red, green, blue, alpha]`, in the range `0` to `1`.
        - [`Phaser.Display.Color` object](color.md).
    - `noiseRandomChannels` : Set `true` to render independent random noise in each color channel.
    - `noiseRandomNormal` : Set `true` to render a random normal vector per pixel. This overrides `noiseRandomChannels`.
- `x`, `y` : Position.
- `width`, `height` : Size. Default value is `128`.

Add noise object with default configuration

```javascript
var noise = scene.add.noise(undefined, x, y, width, height);
```

Add noise object from JSON

```javascript
var noise = scene.make.noise({
    x: 0,
    y: 0,
    width: 128,
    height: 128,

    config: {
        // noiseOffset: [0, 0],
        // noisePower: 1,
        // noiseColorStart: 0x000000,
        // noiseColorEnd: 0xffffff,
        // noiseRandomChannels: false,
        // noiseRandomNormal: false
    },

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyNoise extends Phaser.GameObjects.Noise {
        constructor(scene, config, x, y, width, height) {
            super(scene, config, x, y, width, height);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var noise = new MyNoise(scene, config, x, y, width, height);
    ```

### Set noise color

```javascript
noise.setNoiseColor(start, end);
```

- `start`, `end` : Color mapped to low/height noise values. Default value is `0x000000`/`0xffffff`.
    - Number, 24-bit RGB (`0xRRGGBB`) or 32-bit ARGB (`0xAARRGGBB`).
    - String hex color, like `'#0033ff'`, `'#03f'`, `'0x0033ff'`, or `'0033ff'`.
    - Array in WebGL color format, `[red, green, blue]` or `[red, green, blue, alpha]`, in the range `0` to `1`.
    - [`Phaser.Display.Color` object](color.md).

### Noise offset

- Get
    ```javascript
    var offset = noise.noiseOffset;
    var offsetX = noise.noiseOffset[0];
    var offsetY = noise.noiseOffset[1];
    ```
- Set
    ```javascript
    noise.noiseOffset = [offsetX, offsetY];
    ```

`noiseOffset` must be an array of 2 numbers. Animating it scrolls the noise pattern.

!!! note
    This shader depends on floating-point precision. Very large offsets can make the output blocky, while very small offset changes can make the pattern change abruptly.

### Noise power

- Get
    ```javascript
    var power = noise.noisePower;
    ```
- Set
    ```javascript
    noise.noisePower = power;
    ```

`noisePower` reshapes the noise levels.

- `1` : Original random value.
- Greater than `1` : Fewer bright/white pixels; the result becomes darker.
- Between `0` and `1` : More bright/white pixels; the result becomes brighter.

### Random channels

- Get
    ```javascript
    var enabled = noise.noiseRandomChannels;
    ```
- Enable
    ```javascript
    noise.noiseRandomChannels = true;
    ```
- Disable
    ```javascript
    noise.noiseRandomChannels = false;
    ```

When enabled, red, green, and blue channels receive separate random values. The result is still multiplied by the configured start/end color ramp.

### Random normal

- Get
    ```javascript
    var enabled = noise.noiseRandomNormal;
    ```
- Enable
    ```javascript
    noise.noiseRandomNormal = true;
    ```
- Disable
    ```javascript
    noise.noiseRandomNormal = false;
    ```

When enabled, each pixel renders a random normal vector in the hemisphere facing the camera. This mode overrides `noiseRandomChannels`.

### Render to texture

Noise extends [shader game object](shader.md), therefore it can render its output to a texture.

```javascript
noise.setRenderToTexture(key);
```

Then use this texture in another game object.

```javascript
var image = scene.add.image(x, y, key);
```

For scrolling noise, rendering to a texture and using it in a [TileSprite](tilesprite.md) is often more stable than scrolling by very small `noiseOffset` values.

### Other properties

See [game object](gameobject.md) and [shader game object](shader.md).

### Create mask

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
