## Introduction

Hash functions and procedural noise hash helpers, built-in methods of phaser.

- Author: Phaser Team

A hash is a deterministic transformation of an input into an output that appears random. 
Given the same input and settings, it always returns the same output.

!!! warning "Not cryptographic"
    These functions are intended for visual variety and procedural generation. Do not use them for security, authentication, encryption, or other cryptographic purposes.

## Usage

### Hash

Hash a number, or an array of 1 to 4 numbers, into a value from `0` to `1`.

```javascript
var value = Phaser.Math.Hash(vector);
// var value = Phaser.Math.Hash(vector, algorithm);
```

- `vector` :
    - A number.
    - An array of 1 to 4 numbers.
        - `[x]`
        - `[x, y]`
        - `[x, y, z]`
        - `[x, y, z, w]`
- `algorithm` :
    - `0` : `TRIG`. Default value.
    - `1` : `PCG`.
    - `2` : `PCG_FLOAT`.
- `value` : A number from `0` to `1`.

Use a circular input path to get a looping sequence.

```javascript
var value = Phaser.Math.Hash([
    Math.cos(time),
    Math.sin(time)
]);
```

#### TRIG

```javascript
var value = Phaser.Math.Hash(vector, 0);
```

Uses sine functions and dot products. It accepts any number input and matches the shader hash used by Phaser noise game objects.

- Accepts float inputs.
- Precision is 32 bits.
- Input values can lose distinction when larger than `4294967296`.

#### PCG

```javascript
var value = Phaser.Math.Hash(vector, 1);
```

Uses a permuted congruential generator.

- Intended for integer inputs.
- Slightly faster than `TRIG`.
- Precision is 32 bits.
- Input values can lose distinction when larger than `4294967296`.

#### PCG float

```javascript
var value = Phaser.Math.Hash(vector, 2);
```

Uses the PCG algorithm after expanding floating-point inputs into the 32-bit range.

- Accepts float inputs.
- Slightly slower than `TRIG`.
- Same 32-bit precision concerns as PCG.

### Cellular noise

Hash a number, or an array of 1 to 4 numbers, into a cellular noise value.

```javascript
var value = Phaser.Math.HashCell(vector);
```

```javascript
var value = Phaser.Math.HashCell(vector, {
    algorithm: 0,
    noiseCells: [32, 32, 32, 32],
    noiseWrap: [32, 32, 32, 32],
    noiseIterations: 1,
    noiseMode: 0,
    noiseSmoothing: 1,
    noiseSeed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
});
```

- `vector` :
    - A number.
    - An array of 1 to 4 numbers.
        - `[x]`
        - `[x, y]`
        - `[x, y, z]`
        - `[x, y, z, w]`
- `config` : Configuration of the cell field.
    - `algorithm` : Hash algorithm used internally.
        - `0` : `TRIG`. Default value.
        - `1` : `PCG`.
        - `2` : `PCG_FLOAT`.
    - `noiseCells` : Number of cells in the `0..1` range on each axis.
        - Use as many values as the input vector length.
        - Default value is `[32, 32, 32, 32]`.
    - `noiseWrap` : Number of cells before the pattern repeats.
        - Pass an array, for example `[32, 32]`.
        - Omit it to use `noiseCells`.
    - `noiseIterations` : Number of octaves of cellular noise. Default value is `1`.
    - `noiseMode` : Output mode.
        - `0` : Sharp cell boundaries. Returns distance to the nearest distorted cell center.
        - `1` : Index mode. Returns a flat random value for the nearest cell.
        - `2` : Smooth cell boundaries. Uses `noiseSmoothing`.
    - `noiseSmoothing` : Smoothness used by mode `2`. Default value is `1`.
    - `noiseSeed` : Seed values for reproducible cell patterns.
        - Need values equal to the square of the input vector length: `1`, `4`, `9`, or `16`.
- `value` : Distance-like or cell-index-like value, depending on `noiseMode`.

Cellular noise is also called Worley noise or Voronoi noise. It distorts a grid into cells. Very similar inputs usually produce very similar outputs, so it can be used to create continuous procedural patterns.

### Simplex noise

Hash a number, or an array of 1 to 3 numbers, into a simplex noise value from `-1` to `1`.

```javascript
var value = Phaser.Math.HashSimplex(vector);
```

```javascript
var value = Phaser.Math.HashSimplex(vector, {
    noiseCells: [32, 32, 32],
    noisePeriod: [32, 32, 32],
    noiseOffset: [0, 0, 0],
    noiseFlow: 0,
    noiseWarpAmount: 0,
    noiseIterations: 1,
    noiseWarpIterations: 1,
    noiseDetailPower: 2,
    noiseFlowPower: 2,
    noiseContributionPower: 2,
    noiseWarpDetailPower: 2,
    noiseWarpFlowPower: 2,
    noiseWarpContributionPower: 2,
    noiseSeed: [1, 2, 3]
});
```

- `vector` :
    - A number.
    - An array of 1 to 3 numbers.
- `config` : Configuration of the simplex field.

- `noiseCells` : Number of cells in each dimension. Default value is `[32, 32, 32]`.
    - `noisePeriod` : Number of cells before the pattern repeats.
        - By default, this is the same as `noiseCells`.
    - `noiseOffset` : Offset of the noise field. Default value is `[0, 0, 0]`.
    - `noiseFlow` : Flow value used to evolve the pattern. Default value is `0`.
    - `noiseWarpAmount` : Turbulence amount. Set `0` to disable warp.
    - `noiseIterations` : Number of octaves of noise. Default value is `1`.
    - `noiseWarpIterations` : Number of octaves used by the warp calculation. Default value is `1`.
    - `noiseDetailPower` : Frequency multiplier between noise octaves. Default value is `2`.
    - `noiseFlowPower` : Flow multiplier between noise octaves. Default value is `2`.
    - `noiseContributionPower` : Contribution divisor between noise octaves. Default value is `2`.
    - `noiseWarpDetailPower` : Frequency multiplier between warp octaves. Default value is `2`.
    - `noiseWarpFlowPower` : Flow multiplier between warp octaves. Default value is `2`.
    - `noiseWarpContributionPower` : Contribution divisor between warp octaves. Default value is `2`.
    - `noiseSeed` : Seed offset for reproducible patterns. Default value is `[1, 2, 3]`.
- `value` : A noise value from `-1` to `1`.

Simplex noise is a smooth gradient noise. Very similar inputs produce very similar outputs. One-dimensional input is supported by padding the input to 2 dimensions internally.

Animated flow

```javascript
var value = Phaser.Math.HashSimplex([x, y], {
    noiseCells: [8, 8],
    noiseFlow: time
});
```

Use different seeds to create different deterministic outputs from the same input.

```javascript
var offsetX = Phaser.Math.HashSimplex([x, y], { noiseSeed: [1, 2] });
var offsetY = Phaser.Math.HashSimplex([x, y], { noiseSeed: [3, 4] });
```

!!! note
    `HashSimplex` does not apply `noiseValueFactor`, `noiseValueAdd`, or `noiseValuePower`. Process the returned `-1..1` value directly if you need remapping.

#### Remap output

Remap `HashSimplex` output from `-1..1` to `0..1`.

```javascript
var value = Phaser.Math.HashSimplex([x, y]);
var normalized = (value + 1) / 2;
```

Clamp and apply power.

```javascript
var value = Phaser.Math.HashSimplex([x, y]);

value = Phaser.Math.Clamp(value * factor + add, 0, 1);
value = Math.pow(value, power);
```

### Related

- [Noise](noise.md)
- [Simplex noise game object](noise-simplex.md)
- [Cell noise game object](noise-cell.md)
