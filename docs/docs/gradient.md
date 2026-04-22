## Introduction

A quad which displays a color gradient, built-in game object of phaser.

- Author: Phaser Team
- Game object

Gradient extends [shader game object](shader.md). Its color data is stored in a [`Phaser.Display.ColorRamp`](gradient.md#color-ramp), which contains one or more `Phaser.Display.ColorBand` objects.

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Usage

### Add gradient object

```javascript
var gradient = scene.add.gradient({
    // bands: {
    //     colorStart: 0x000000,
    //     colorEnd: 0xffffff
    // },
    // offset: 0,
    // repeatMode: 0,
    // shapeMode: 0,
    // start: { x: 0, y: 0 },
    // shape: { x: 1, y: 0 },
    // length: 1,
    // direction: 0,
    // dither: false
}, x, y, width, height);
```

- `config` : Configuration of gradient texture.
    - `bands` : A color band config, a `Phaser.Display.ColorBand`, or an array of them.
        ```javascript
        [
            {
                colorStart: 0x000000,
                colorEnd: 0xffffff,
                start: 0,
                middle: 0.5,
                end: 1,
                // size: 1,
                interpolation: 0,
                colorSpace: 0
            },
            {},
            // ...
        ]
        ```
        - `colorStart`, `colorEnd` : Color at the start/end of this band. Default value is `0x000000`/`colorStart`.
            - Number, 24-bit RGB (`0xRRGGBB`) or 32-bit ARGB (`0xAARRGGBB`).
            - String hex color, like `'#0033ff'`, `'#03f'`, `'0x0033ff'`, or `'0033ff'`.
            - Array in WebGL color format, `[red, green, blue]` or `[red, green, blue, alpha]`, in the range `0` to `1`.
            - [`Phaser.Display.Color` object](color.md).
        - `start`, `middle`, `end`  : Start/Middle/End point of this band inside the ramp. Default value is `0`/`0.5`/`1`.
        - `size` : Size of this band. Used if `end` is not specified.
        - `interpolation` : Controls how progress moves between `colorStart` and `colorEnd`.
            - `0` : Linear. Straight blend.
            - `1` : Curved. Color changes quickly at start and end, flattening in the middle.
            - `2` : Sinusoidal. Color changes quickly in the middle, flattening at start and end.
            - `3` : Curve start. Color changes quickly at the start, flattening at the end.
            - `4` : Curve end. Color changes quickly at the end, flattening at the start.
        - `colorSpace` : Controls where colors are blended.
            - `0` : RGBA. Channels are blended directly.
            - `1` : HSVA nearest. Hue uses the shortest angle.
            - `2` : HSVA plus. Hue angle always increases.
            - `3` : HSVA minus. Hue angle always decreases.
    - `offset` : Moves the gradient along its shape. Default value is `0`.
    - `repeatMode` : How gradient progress outside `0..1` is handled.
        - `0` : Extend. Values are clamped between `0` and `1`.
        - `1` : Truncate. Values outside `0..1` are discarded and become transparent.
        - `2` : Sawtooth. Values repeat with modulo `1`.
        - `3` : Triangular. Values rise to `1`, then fall back to `0`.
    - `shapeMode` : Shape used to calculate gradient progress. See [Shape mode](gradient.md#shape-mode).
        - `0` : Linear. A ribbon where the shape points from one side to the other.
        - `1` : Bilinear. Like linear, but reflected in both directions.
        - `2` : Radial. Gradient spreads out from `start` to the radius described by `shape`.
        - `3` : Conic symmetric. Gradient is determined by angle to `shape`, from `0` along the shape vector to `1` opposite it.
        - `4` : Conic asymmetric. Gradient is determined by angle to `shape`, from `0` to `1` with a full rotation.
    - `start` : Start point of the gradient in normalized quad coordinates. Default value is `{ x: 0, y: 0 }`.
    - `shape` : Shape vector from `start`. Default value is `{ x: 1, y: 0 }`.
    - `length` : Length of the shape vector. Used only if `shape` is not defined. Default value is `1`.
    - `direction` : Direction of the shape vector in radians. Used only if `shape` is not defined. Default value is `0`.
    - `dither` : Set `true` to add a small amount of noise and reduce banding.
- `x`, `y` : Position.
- `width`, `height` : Size. Default value is `128`.

!!! note
    Bands should be arranged end-to-end, with no gaps or overlaps. Gaps at the start or end are allowed, but gaps or overlaps between bands might not render as expected.

Add gradient object with default configuration

```javascript
var gradient = scene.add.gradient(undefined, x, y, width, height);
```

Add gradient object from JSON

```javascript
var gradient = scene.make.gradient({
    x: 0,
    y: 0,
    width: 128,
    height: 128,

    config: {
        // bands: {
        //     colorStart: 0x000000,
        //     colorEnd: 0xffffff
        // },
        // offset: 0,
        // repeatMode: 0,
        // shapeMode: 0,
        // start: { x: 0, y: 0 },
        // shape: { x: 1, y: 0 },
        // length: 1,
        // direction: 0,
        // dither: false
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
    class MyGradient extends Phaser.GameObjects.Gradient {
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
    var gradient = new MyGradient(scene, config, x, y, width, height);
    ```

### Basic examples

Linear gradient from left to right

```javascript
var gradient = scene.add.gradient(undefined, 400, 300, 800, 600);
```

Radial glow

```javascript
var gradient = scene.add.gradient({
    bands: [
        {
            start: 0,
            end: 0.35,
            colorStart: 0xffffff,
            colorEnd: [1, 1, 1, 0]
        },
        {
            start: 0.35,
            end: 1,
            colorStart: [1, 1, 1, 0],
            colorEnd: [1, 1, 1, 0]
        }
    ],
    shapeMode: 2,
    start: { x: 0.5, y: 0.5 },
    shape: { x: 0.5, y: 0 }
}, 400, 300, 800, 800);
```

Animated repeating gradient

```javascript
var gradient = scene.add.gradient({
    bands: {
        colorStart: 0x0033ff,
        colorEnd: 0xffee88
    },
    repeatMode: 2
}, 400, 300, 800, 600);

scene.tweens.add({
    targets: gradient,
    offset: 1,
    duration: 2000,
    repeat: -1
});
```

### Repeat mode

- Get
    ```javascript
    var mode = gradient.repeatMode;
    ```
- Set
    ```javascript
    gradient.repeatMode = mode;
    ```

Modes:

- `0` : Extend. Values are clamped between `0` and `1`.
- `1` : Truncate. Values outside `0..1` are discarded and become transparent.
- `2` : Sawtooth. Values repeat with modulo `1`.
- `3` : Triangular. Values rise to `1`, then fall back to `0`.

### Shape mode

- Get
    ```javascript
    var mode = gradient.shapeMode;
    ```
- Set
    ```javascript
    gradient.shapeMode = mode;
    ```

Modes:

- `0` : Linear. A ribbon where the shape points from one side to the other.
- `1` : Bilinear. Like linear, but reflected in both directions.
- `2` : Radial. Gradient spreads out from `start` to the radius described by `shape`.
- `3` : Conic symmetric. Gradient is determined by angle to `shape`, from `0` along the shape vector to `1` opposite it.
- `4` : Conic asymmetric. Gradient is determined by angle to `shape`, from `0` to `1` with a full rotation.

### Start and shape

- Get
    ```javascript
    var start = gradient.start;
    var shape = gradient.shape;
    ```
- Set
    ```javascript
    gradient.start.setTo(x, y);
    gradient.shape.setTo(x, y);
    ```

`start` and `shape` use normalized coordinates inside the quad. The default gradient starts at `{ x: 0, y: 0 }` and moves along `{ x: 1, y: 0 }`.

!!! note
    The gradient shape is fitted to a square. If width and height are not equal, the shape will be distorted.

If `shape` is not specified in the constructor config, it is created from `length` and `direction`.

```javascript
var gradient = scene.add.gradient({
    length: 1,
    direction: Math.PI / 2
}, x, y, width, height);
```

### Offset

- Get
    ```javascript
    var offset = gradient.offset;
    ```
- Set
    ```javascript
    gradient.offset = offset;
    ```
- Animate
    ```javascript
    scene.tweens.add({
        targets: gradient,
        offset: 1,
        duration: 1000,
        repeat: -1
    });
    ```

`offset` moves the start of the gradient. Its visual effect depends on `shapeMode` and `repeatMode`.

### Dither

- Enable
    ```javascript
    gradient.dither = true;
    ```
- Disable
    ```javascript
    gradient.dither = false;
    ```

Dither adds a small amount of noise to reduce gradient banding. 
It can lose effectiveness if the gradient is transformed or scaled.

### Color ramp

- Get color ramp
    ```javascript
    var ramp = gradient.ramp;
    ```
- Replace bands
    ```javascript
    gradient.ramp.setBands(bands);
    ```
- Rebuild ramp data after editing bands directly
    ```javascript
    gradient.ramp.encode();
    ```

If you edit `gradient.ramp.bands` directly, call `gradient.ramp.encode()` to rebuild the GPU data texture.

```javascript
gradient.ramp.bands[0].colorStart.setTo(255, 0, 0);
gradient.ramp.encode();
```

Fix band fit

```javascript
gradient.ramp.fixFit(start, end);
// gradient.ramp.fixFit(start, end, purgeZeroLength, encode);
```

Split a band

```javascript
gradient.ramp.splitBand(band, steps);
// gradient.ramp.splitBand(band, steps, quantize, encode);
```

Get color from ramp

```javascript
var color = gradient.ramp.getColor(index);
```

- `index` : Position in the ramp, from `0` to `1`.

### Render to texture

Gradient extends [shader game object](shader.md), therefore it can render its output to a texture.

```javascript
gradient.setRenderToTexture(key);
```

Then use this texture in another game object.

```javascript
var image = scene.add.image(x, y, key);
```

### Other properties

See [game object](gameobject.md) and [shader game object](shader.md).

### Create mask

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
