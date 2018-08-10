## Introduction

Textures cache, built-in object of phaser.

- Author: Richard Davey

## Usage

### Image texture

- Load image texture
    ```javascript
    scene.load.image(key, url);
    ```
    Reference: [Loader](loader.md#image)
- Get image texture
    ```javascript
    var texture = scene.textures.get(key);
    var image = texture.getSourceImage();
    // var width = image.width;
    // var height = image.height;
    ```

### Canvas texture

- Create canvas texture
    ```javascript
    var texture = scene.textures.createCanvas(key, width, height);
    ```
- Get canvas element
    ```javascript
    var canvas = texture.getSourceImage();
    var context = canvas.getContext('2d');
    ```
    [Canvas api](https://www.w3schools.com/html/html5_canvas.asp)
- Copy image to canvas
    ```javascript
    var image = scene.textures.get(srcKey).getSourceImage();
    var canvas = scene.textures.createCanvas(destKey, image.width, image.height).getSourceImage();
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    // var pixels = context.getImageData(0, 0, image.width, image.height);  // 1d array. [r,g,b,a,r,g,b,a,...]
    ```
    - Create canvas from canvas pool
        ```javascript
        var canvas = Phaser.Display.Canvas.Pool.create(parent, width, height);
        ```
    - Release canvas
        ```javascript
        CanvasPool.remove(canvas);
        ```
- Refresh canvas texture
    ```javascript
    texture.refresh();
    ```
- Generate
    ```javascript
    var config = {
        data: data,
        // 3x3:
        // [ '...',
        //   '...',
        //   '...' ]

        pixelWidth: 1,    // pixel width of each data
        pixelHeight: 1,   // pixel height of each data

        preRender: null,  // callback, function(canvas, ctx) {}
        postRender: null, // callback, function(canvas, ctx) {}
        
        canvas: null,  // create a canvas if null
        resizeCanvas: true,
        clearCanvas: true
    };
    var texture = scene.textures.generate(key, config);
    ```

### Get pixel

```javascript
var color = scene.textures.getPixel(x, y, key);
// var color = scene.textures.getPixel(x, y, key, frame);
```

Properties of `color`

- `r` : 0 ~ 255
- `g` : 0 ~ 255
- `b` : 0 ~ 255
- `a` : 0 ~ 255
- `color` : [color](color.md) integer

```javascript
var alpha = scene.textures.getPixelAlpha(x, y, key);
// var alpha = scene.textures.getPixelAlpha(x, y, key, frame);
```

alpha : 0 ~ 255

Return `null` if the coordinates were out of bounds.

### Has key

```javascript
var hasKey = scene.textures.exists(key);
```

### Remove texture

Remove texture stored in texture cache.

```javascript
scene.textures.remove(key);
```

### Get base64

```javascript
var s = scene.textures.getBase64(key);  // type= 'image/png', encoderOptions= 0.92
// var s = scene.textures.getBase64(key, frame, type, encoderOptions);
```