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

### Generate texture from array

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

### Texture

#### Get texture

```javascript
var texture = scene.textures.get(key);
```

#### Has frame

```javascript
var hasFrame = texture.has(frameName);
```

#### Add frame

```javascript
var frame = texture.add(frameName, sourceIndex, x, y, width, height);
```

- `key` : Texture key.
- `frameName` : The name of this Frame. The name is unique within the Texture.
- `sourceIndex` : The index of the TextureSource that this Frame is a part of.
- `x`, `y` : The x/y coordinate of the top-left of this Frame.
- `width`, `height` : The width/height of this Frame.

#### Remove frame

```javascript
var removed = texture.remove(frameName);
```

### Frame object

####　Get frame

```javascript
var frame = scene.textures.getFrame(key, frame);
```

#### Properties

- `frame.source.image` : Image of texture source.
- `frame.cutX` : X position within the source image to cut from.
- `frame.cutY` : Y position within the source image to cut from.
- `frame.cutWidth` : The width of the area in the source image to cut.
- `frame.cutHeight` : The height of the area in the source image to cut.
