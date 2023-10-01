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
- Load image texture via base64 string
    ```javascript
    scene.textures.addBase64(key, data)
    ```
- Get image texture
    ```javascript
    var texture = scene.textures.get(key);
    var image = texture.getSourceImage();
    // var width = image.width;
    // var height = image.height;
    ```
- Get image texture from frame object
    ```javascript
    var texture = scene.textures.get(frameObject);
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

### Default textures

- Default : `'__DEFAULT'`
- Missing : `'__MISSING'`
- 4x4 white : `'__WHITE'`

### Get key list of all textures

```javascript
var keys = scene.textures.getTextureKeys();
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

#### Get name of frames

```javascript
var nameList = texture.getFrameNames();
// nameList does not include `__BASE`
```

or

```javascript
var nameList = texture.getFrameNames(true);
// nameList includes `__BASE`
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

### Add atlas

```javascript
scene.textures.addAtlas(key, HTMLImageElement, data);
// scene.textures.addAtlas(key, HTMLImageElement, data, dataSource);
```

- `key` : The unique string-based key of the Texture.
- `HTMLImageElement` : HTML Image element/s.
- `data` : The Texture Atlas data/s.
    ```javascript
    {
        frames: [
            {
                // Location of frame image
                frame: {
                    x, y, w, h
                },

                // trimmed
                trimmed:
                sourceSize: {
                    w, h
                },
                spriteSourceSize: {
                    x, y, w, h
                },

                rotated:

                // Custom origin
                anchor: 
                pivot: {
                    x, y
                },

                // Other custom properties of this frame ...
            }
        ],

        // Other custom properties of this texture ...
    }
    ```
- `dataSource` : An optional data Image element (normal map).

or

```javascript
scene.textures.addAtlas(undefined, texture, data);
// scene.textures.addAtlas(undefined, texture, data, dataSource);
```

- `texture` : Phaser Texture.

### Add sprite sheet

```javascript
scene.textures.addSpriteSheet(key, HTMLImageElement, config);
// scene.textures.addAtlas(key, HTMLImageElement, config, dataSource);
```

- `key` : The unique string-based key of the Texture.
- `HTMLImageElement` : HTML Image element/s.
- `config` : The configuration object for this Sprite Sheet.
    ```javascript
    {
        frameWidth: ,
        frameHeight: ,
        startFrame: 0,
        endFrame: -1,
        margin: 0,
        spacing: 0
    }
    ```
- `dataSource` : An optional data Image element (normal map).

or

```javascript
scene.textures.addSpriteSheet(undefined, texture, config);
// scene.textures.addSpriteSheet(undefined, texture, config, dataSource);
```

- `texture` : Phaser Texture.

### Events

- Texture manager is ready
    ```javascript
    scene.textures.on('ready', function() {

    })
    ```
- Add texture
    ```javascript
    scene.textures.on('addtexture', function(key) {

    })
    ```
    or
    ```javascript
    scene.textures.on('addtexture-' + key, function() {
        
    })
    ```
- Error when adding texture
    ```javascript
    scene.textures.on('onerror', function(key) {
        
    })
    ```
- Remove texture
    ```javascript
    scene.textures.on('removetexture', function(key) {

    })
    ```
    or
    ```javascript
    scene.textures.on('removetexture-' + key, function() {

    })
    ```

