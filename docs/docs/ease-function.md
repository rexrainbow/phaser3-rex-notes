## Introduction

Get ease function, built-in method of phaser.

- Author: Richard Davey

## Usage

### Get ease function

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