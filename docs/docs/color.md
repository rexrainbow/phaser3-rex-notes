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

```javascript
var colorArray = Phaser.Display.Color.HSVColorWheel(s, v);
```

Get color
```javascript
var color = colorArray[i].color;  // i : 0 ~ 359
```