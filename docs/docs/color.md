## Introduction

Get color value, built-in methods of phaser.

- Author: Phaser Team

## Usage

### Get color integer

- Hex string, or color integer
    ```javascript
    var color = Phaser.Display.Color.ValueToColor(input);
    ```
    - `input` : Hex string, or color integer
- RGB to color
    ```javascript
    var color = Phaser.Display.Color.GetColor(red, green, blue);
    ```
    - `red`, `green`, `blue` : 0 ~ 255
- RGBA to color
    ```javascript
    var color = Phaser.Display.Color.GetColor32(red, green, blue, alpha);
    ```
    - `red`, `green`, `blue`, `alpha` : 0 ~ 255
- Hex string to color
    ```javascript
    var color = Phaser.Display.Color.HexStringToColor(hex).color;
    ```
    - hex : `#0033ff`, `#03f`, `0x0033ff`, or `0x03f`
- RGB string to color
    ```javascript
    var color = Phaser.Display.Color.RGBStringToColor(rgb).color;
    ```
    - rgb : `'rgb(r,g,b)'`, or `'rgba(r,g,b,a)'`
        - r, g, b : 0 ~ 255
        - a : 0 ~ 1
- HSV to color
    ```javascript
    var color = Phaser.Display.Color.HSVToRGB(h, s, v).color;
    ```
    - `h`, `s`, `v` : 0 ~ 1
- HSL to color
    ```javascript
    var color = Phaser.Display.Color.HSLToColor(h, s, l).color;
    ```
    - `h`, `s`, `l` : 0 ~ 1

### Color integer to RGB

```javascript
var rgb = Phaser.Display.Color.IntegerToRGB(color);
```

- `color` : Color integer (`0xAARRGGBB`)
- `rgb` : JSON object (`{r, g, b, a}`)

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

#### Create color object

- Create via r,g,b,a components
    ```javascript
    var color = new Phaser.Display.Color(red, green, blue); // alpha = 255
    // var color = new Phaser.Display.Color(red, green, blue, alpha);
    ```
    - `red`, `green`, `blue`, `alpha`: 0 ~ 255
- Create via color integer
    ```javascript
    var color = Phaser.Display.Color.IntegerToColor(colorInteger);
    ```
    - colorInteger : Color integer (`0xAARRGGBB`)
- Create via `{r, g, b, a}`
    ```javascript
    var color = Phaser.Display.Color.ObjectToColor(input)
    ```
    - `input` : An object containing `r`, `g`, `b` and `a` properties in the range `0` to `255`.
- Create via RGB string
    ```javascript
    var color = Phaser.Display.Color.RGBStringToColor(rgb);
    ```
    - rgb : `'rgb(r,g,b)'`, or `'rgba(r,g,b,a)'`
        - r, g, b : 0 ~ 255
        - a : 0 ~ 1
- Create via hex string
    ```javascirpt
    var color = Phaser.Display.Color.HexStringToColor('#0033ff');
    ```
    - `hex` : The hex color value to convert, such as `#0033ff` or the short-hand format: `#03f`.
- Create via HSV
    ```javascript
    var color = Phaser.Display.Color.HSVToRGB(h, s, v);
    ```
    - `h`, `s`, `v` : 0 ~ 1
- Create via HSL
    ```javascript
    var color = Phaser.Display.Color.HSLToColor(h, s, l);
    ```
    - `h`, `s`, `l` : 0 ~ 1

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
    color.setFromRGB(rgba);
    ```
    - rgba :
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
- Set to a random color
    ```javascript
    color.random();
    ```
    or
    ```javascript
    color.random(min, max);
    ```
    - `min` : 0 ~ 255. Default value is 0.
    - `max` : 0 ~ 255. Default value is 255.
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

#### Clone

```javascript
var newColor = color.clone();
```

### To hex string

```javascript
var hexString = Phaser.Display.Color.RGBToString(color.r, color.g, color.b, color.a);
// var hexString = Phaser.Display.Color.RGBToString(color.r, color.g, color.b, color.a, prefix);
```

### Interpolation

Interpolate between 2 colors.

```javascript
var colorOut = Phaser.Display.Color.Interpolate.RGBWithRGB(r1, g1, b1, r2, g2, b2, length, index);
var colorOut = Phaser.Display.Color.Interpolate.ColorWithColor(color1, color2, length, index, hsv, hsvSign);
var colorOut = Phaser.Display.Color.Interpolate.ColorWithRGB(color, r, g, b, length, index);
```

- `length`, `index` : t = `index/length` (0~1)

```javascript
var colorOut = Phaser.Display.Color.Interpolate.HSVWithHSV(h1, s1, v1, h2, s2, v2, length, index, sign);
```

- `h1`, `h2` : Hue of the first/second color (`0` to `1`).
- `s1`, `s2` : Saturation of the first/second color (`0` to `1`).
- `v1`, `v2` : Value (brightness) of the first/second color (`0` to `1`).
- `length` : Distance to interpolate over. Default value is `100`.
- `index` : Index to start from. Default value is `0`.
- `sign` : Hue interpolation direction. 
    - `0` : nearest. Default behavior.
    - positive : always increase.
    - negative : always decrease.
