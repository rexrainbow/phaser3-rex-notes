## Introduction

Display a texture-based object that can be stretched both horizontally and vertically, 
but that retains fixed-sized corners, built-in game object of phaser.

- Author: Richard Davey

!!! warning "WebGL only"
    Only work in WebGL render mode.


## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add nine slice object

```javascript
var nineSlice = scene.add.nineslice(x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
```

Add nine slice from JSON

```javascript
var nineSlice = scene.make.image({
    x: 0,
    y: 0,
    key: '',
    // frame: '',

    // width: 256,
    // height: 256,
    // leftWidth: 10,
    // rightWidth: 10,
    // topHeight: 0,
    // bottomHeight: 0,

    // angle: 0,
    // alpha: 1,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyNineSlice extends Phaser.GameObjects.NineSlice {
        constructor(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight) {
            super(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var nineSlice = new MyNineSlice(scene, x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
    ```

### Resize

```javascript
nineSlice.setSize(width, height);
```

### Set texture of source image

```javascript
nineSlice.setTexture(texture, frame);
nineSlice.setSlices(width, height, leftWidth, rightWidth, topHeight, bottomHeight);
```

### Texture

See [game object - texture](gameobject.md#texture)

### Other properties

See [game object](gameobject.md)

### Create mask

```javascript
var mask = nineSlice.createBitmapMask();
```

See [mask](mask.md)

### Compare with [nine-patch](ninepatch.md)

- Nine-slice has better render performance.
    - Nine-patch extends from [render-texture](rendertexture.md), which will create a new texture, then draw frames on it.
- Nine-slice is webgl mode only.
- Nine-slice does not have `flip`, `crop` methods.
