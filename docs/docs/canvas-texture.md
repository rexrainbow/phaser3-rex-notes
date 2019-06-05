## Introduction

Canvas texture stored in [texture cache](texture.md), built-in object of phaser.

- Author: Richard Davey

## Usage

### Create canvas texture

```javascript
var texture = scene.textures.createCanvas(key, width, height);
```

### Get canvas element

```javascript
var canvas = texture.getCanvas();
var context = texture.getContext();
```

[Canvas api](https://www.w3schools.com/html/html5_canvas.asp)

### Draw frame

```javascript
texture.drawFrame(key, frame, x, y);
```

### Clear

```javascript
texture.clear();
```

```javascript
texture.clear(x, y, width, height);
```

### Refresh texture

```javascript
texture.refresh();
```

### Color

- Set
    ```javascript
    texture.setPixel(x, y, red, green, blue);
    // texture.setPixel(x, y, red, green, blue, alpha);
    ```
- Get
    ```javascript
    var color = texture.getPixel(x, y);
    // var color = texture.getPixel(x, y, color);
    ```
    ```javascript
    var colors = texture.getPixels(x, y, width, height);
    ```
    - `colors` : `[{x, y, color, alpha}, ...]`

### Image data

- Set
    ```javascript
    texture.putData(imageData, x, y);
    ```
- Get
    ```javascript
    var imageData = texture.getData(x, y, width, height);
    ```

### Add frame

```javascript
texture.add(name, sourceIndex, x, y, width, height);
```

- `name` : The name of this Frame. The name is unique within the Texture.
- `sourceIndex` : The index of the TextureSource that this Frame is a part of.
- `x` : The x coordinate of the top-left of this Frame.
- `y` : The y coordinate of the top-left of this Frame.
- `width` : The width of this Frame.
- `height` : The height of this Frame.