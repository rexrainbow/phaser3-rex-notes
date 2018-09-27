## Introduction

Get color value, built-in methods of phaser.

- Author: Richard Davey

## Usage

### Get color integer

- RGB to color
    ```javascript
    var color = Phaser.Display.Color.GetColor(red, green, blue);
    ```
    - red, green, blue : 0 ~ 255
- RGBA to color
    ```javascript
    var color = Phaser.Display.Color.GetColor32(red, green, blue, alpha);
    ```
    - red, green, blue, alpha : 0 ~ 255
- Hex string to color
    ```javascript
    var color = Phaser.Display.Color.HexStringToColor(hex).color;
    ```
    - hex : `#0033ff`, `#03f`, `0x0033ff`, or `0x03f`
- RGB string to color
    ```javascript
    var color = Phaser.Display.Color.RGBStringToColor(rgb);
    ```
    - rgb : `'rgb(r,g,b)'`, or `'rgba(r,g,b,a)'`
        - r, g, b : 0 ~ 255
        - a : 0 ~ 1
- HSV to color
    ```javascript
    var color = Phaser.Display.Color.HSVToRGB(h, s, v).color;
    ```
    - h, s, v : 0 ~ 1

### HSV color wheel

1. Create color array
    ```javascript
    var colorArray = Phaser.Display.Color.HSVColorWheel(s, v);
    ```
1. Get color
    ```javascript
    var color = colorArray[i].color;  // i : 0 ~ 359
    ```

### Color object

#### create color object

```javascript
var color = new Phaser.Display.Color(red, green, blue); // alpha = 255
// var color = new Phaser.Display.Color(red, green, blue, alpha);
```
- `red`, `green`, `blue`, `alpha`: 0 ~ 255

#### Set color

- Set color
    ```javascript
    color.setTo(red, green, blue);  // alpha = 255
    // color.setTo(red, green, blue, alpha);
    ```
    - `red`, `green`, `blue`, `alpha`: 0 ~ 255
- Set color in GL values
    ```javascript
    color.setGLTo(red, green, blue);  // alpha = 1
    // color.setTo(red, green, blue, alpha);
    ```
    - `red`, `green`, `blue`, `alpha`: 0 ~ 1
- Set color from color object
    ```javascript
    color.setFromRGB(color);
    ```
    - color :
        ```javascript
        {
            r: 0,
            g: 0,
            b: 0,
            // a: 0
        }
        ```
- Set color from HSV
    ```javascript
    color.setFromHSV(h, s, v);
    ```
- Set to transparent ()
    ```javascript
    color.transparent();
    ```
    - Set (red, green, blue) to `0`
- Set to gray color
   ```javascript
   color.gray(value);
   ```
   - Set (red, green, blue) to value
- Set to a random color
    ```javascript
    color.random();
    ```
    or
    ```javascript
    color.random(min, max);
    ```
- Set to random gray
    ```javascript
    color.randomGray();
    ```
    or
    ```javascript
    color.randomGray(min, max);
    ```
- Set red/green/blue/alpha channel : 0 ~ 255
    ```javascript
    color.red = value;
    // color.red += value;
    color.green = value;
    // color.green += value;
    color.blue = value;
    // color.blue += value;
    color.alpha = value;
    // color.alpha += value;
    ```
    -
- Set H/S/V channel : 0 ~ 1
    ```javascript
    color.h = value;
    // color.h += value;
    color.s = value;
    // color.s += value;
    color.v = value;
    // color.v += value;
    ```
- Set normalized red, green, blue, alpha : 0 ~ 1
    ```javascript
    color.redGL = value;
    // color.redGL += value;
    color.greenGL = value;
    // color.greenGL += value;
    color.blueGL = value;
    // color.blueGL += value;
    color.alphaGL = value;
    // color.alphaGL += value;
    ```
- Set brighten
    ```javascript
    color.brighten(value);
    ```
    - `value` : Percentage, 0 ~ 100
- Saturate : Increase the saturation (S) of this Color by the percentage amount given.
    ```javascript
    color.saturate(value);
    ```
    - `value` : Percentage, 0 ~ 100
- Desaturate : Decrease the saturation (S) of this Color by the percentage amount given.
    ```javascript
    color.desaturate(value);
    ```
    - `value` : Percentage, 0 ~ 100
- Lighten : Increase the lightness (V) of this Color by the percentage amount given.
    ```javascript
    color.lighten(value);
    ```
    - `value` : Percentage, 0 ~ 100
- Darken : Decrease the lightness (V) of this Color by the percentage amount given.
    ```javascript
    color.darken(value);
    ```
    - `value` : Percentage, 0 ~ 100

#### Clone

```javascript
var newColor = color.clone();
```

#### Properties

- RGB Color, not including the alpha channel
    ```javascript
    var c = color.color;
    ```
- RGB Color, including the alpha channel.
    ```javascript
    var c = color.color32;
    ```
- RGB color string which can be used in CSS color values.
    ```javascript
    var c = color.rgba;
    ```
- Red, green, blue, alpha : 0 ~ 255
    ```javascript
    var r = color.red;
    var g = color.green;
    var b = color.blue;
    var a = color.alpha;
    ```
- H, S, V : 0 ~ 1
    ```javascript
    var h = color.h;
    var s = color.s;
    var v = color.v;
    ```
- Normalized red, green, blue, alpha : 0 ~ 1
    ```javascript
    var r = color.redGL;
    var g = color.greenGL;
    var b = color.blueGL;
    var a = color.alphaGL;
    ```