## Introduction

Ease functions, built-in method of phaser.

- Author: Richard Davey

## Usage

### Ease functions

- Linear : `Phaser.Math.Easing.Linear`
- Quadratic, Power1
    - Quadratic ease-out : `Phaser.Math.Easing.Quadratic.Out`
    - Quadratic ease-in : `Phaser.Math.Easing.Quadratic.In`
    - Quadratic ease-in/out : `Phaser.Math.Easing.Quadratic.InOut`
- Cubic, Power2
    - Cubic ease-out : `Phaser.Math.Easing.Cubic.Out`
    - Cubic ease-in : `Phaser.Math.Easing.Cubic.In`
    - Cubic ease-in/out : `Phaser.Math.Easing.Cubic.InOut`
- Quartic, Power3
    - Quartic ease-out : `Phaser.Math.Easing.Quartic.Out`
    - Quartic ease-in : `Phaser.Math.Easing.Quartic.In`
    - Quartic ease-in/out : `Phaser.Math.Easing.Quartic.InOut`
- Quintic, Power4
    - Quintic ease-out : `Phaser.Math.Easing.Quintic.Out`
    - Quintic ease-in : `Phaser.Math.Easing.Quintic.In`
    - Quintic ease-in/out : `Phaser.Math.Easing.Quintic.InOut`
- Sinusoidal
    - Sinusoidal ease-out : `Phaser.Math.Easing.Sine.Out`
    - Sinusoidal ease-in : `Phaser.Math.Easing.Sine.in`
    - Sinusoidal ease-in/out : `Phaser.Math.Easing.Sine.InOut`
- Exponential
    - Exponential ease-out : `Phaser.Math.Easing.Expo.Out`
    - Exponential ease-in : `Phaser.Math.Easing.Expo.In`
    - Exponential ease-in/out : `Phaser.Math.Easing.Expo.InOut`
- Circular
    - Circular ease-out : `Phaser.Math.Easing.Circular.Out`
    - Circular ease-in : `Phaser.Math.Easing.Circular.In`
    - Circular ease-in/out : `Phaser.Math.Easing.Circular.InOut`
- Elastic
    - Elastic ease-out : `Phaser.Math.Easing.Elastic.Out`
    - Elastic ease-in : `Phaser.Math.Easing.Elastic.In`
    - Elastic ease-in/out : `Phaser.Math.Easing.Elastic.InOut`
- Bounce
    - Bounce ease-out : `Phaser.Math.Easing.Bounce.Out`
    - Bounce ease-in : `Phaser.Math.Easing.Bounce.In`
    - Bounce ease-in/out : `Phaser.Math.Easing.Bounce.InOut`
- Back
    - Back ease-out : `Phaser.Math.Easing.Back.Out`
    - Back ease-in : `Phaser.Math.Easing.Back.In`
    - Back ease-in/out : `Phaser.Math.Easing.Back.InOut`
- Stepped : `Phaser.Math.Easing.Stepped(v, step)`

### Get ease function via string

```javascript
var easeFunction = Phaser.Tweens.Builders.GetEaseFunction(ease);
// var easeFunction = Phaser.Tweens.Builders.GetEaseFunction(ease, easeParams);
```

- `ease` : 
    - A string : 
        - `Power0` : Linear
        - `Power1` : Quadratic.Out
        - `Power2` : Cubic.Out
        - `Power3` : Quartic.Out
        - `Power4` : Quintic.Out
        - `Linear`
        - `Quad` : Quadratic.Out
        - `Cubic` : Cubic.Out
        - `Quart` : Quartic.Out
        - `Quint` : Quintic.Out
        - `Sine` : Sine.Out
        - `Expo` : Expo.Out
        - `Circ` : Circular.Out
        - `Elastic` : Elastic.Out
        - `Back` : Back.Out
        - `Bounce` : Bounce.Out
        - `Stepped`
        - `Quad.easeIn`
        - `Cubic.easeIn`
        - `Quart.easeIn`
        - `Quint.easeIn`
        - `Sine.easeIn`
        - `Expo.easeIn`
        - `Circ.easeIn`
        - `Back.easeIn`
        - `Bounce.easeIn`
        - `Quad.easeOut`
        - `Cubic.easeOut`
        - `Quart.easeOut`
        - `Quint.easeOut`
        - `Sine.easeOut`
        - `Expo.easeOut`
        - `Circ.easeOut`
        - `Back.easeOut`
        - `Bounce.easeOut`
        - `Quad.easeInOut`
        - `Cubic.easeInOut`
        - `Quart.easeInOut`
        - `Quint.easeInOut`
        - `Sine.easeInOut`
        - `Expo.easeInOut`
        - `Circ.easeInOut`
        - `Back.easeInOut`
        - `Bounce.easeInOut`
    - A custom function
        ```javascript
        function(v) {
            return v;
        }
        ```
        ```javascript
        function(v, param0, param1, ...) {
            return v;
        }
        ```
        - `v` : `0` ~ `1`

### Get result

```javascript
var result = easeFunction(t);
```

- `t` : `0` ~ `1`