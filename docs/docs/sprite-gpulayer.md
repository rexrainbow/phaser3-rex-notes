## Introduction

SpriteGPULayer efficiently batches and renders animated quads in WebGL with one draw call.

- Author: Phaser Team

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add sprite-gpulayer object

```javascript
var image = scene.add.spriteGPULayer(texture, size);
// var image = scene.add.spriteGPULayer(texture);
```

- `size` : The maximum number of quads that this SpriteGPULayer will hold. This can be increased later if necessary. Default value is `1`.

Add image from JSON

```javascript
var image = scene.make.spriteGPULayer({
    key: '',
    // size: 1,

    // alpha: 1,

    add: true
});
```

- `key` : 
    - A string
    - An array of string to pick one element at random

### Custom class

- Define class
    ```javascript
    class MySpriteGPULayer extends Phaser.GameObjects.SpriteGPULayer {
        constructor(scene, texture, size) {
            super(scene, texture, size);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var layer = new MySpriteGPULayer(scene, texture, size);
    ```

### Texture

See [game object - texture](gameobject.md#texture)

### Members

A "member" is an individual quad with its own position, animation, and visual properties.

#### Add member

```javascript
layer.addMember({
    x: 0,
    // x: {base, amplitude, duration, delay, ease, yoyo, loop},

    y: ,
    // y: {base, amplitude, duration, delay, ease, yoyo, loop},

    rotation: ,
    // rotation: {base, amplitude, duration, delay, ease, yoyo, loop},

    scaleX: ,
    // scaleX: {base, amplitude, duration, delay, ease, yoyo, loop},

    scaleY: ,
    // scaleY: {base, amplitude, duration, delay, ease, yoyo, loop},

    alpha: ,
    // alpha: {base, amplitude, duration, delay, ease, yoyo, loop},

    tintBlend: ,
    // tintBlend: {base, amplitude, duration, delay, ease, yoyo, loop},

    originX: 0.5,
    originY: 0.5,

    tintFill: false,

    scrollFactorX: 1,
    scrollFactorY: 1,

    frame: ,
    animation: ,

    tintBottomLeft: undefined,
    tintTopLeft: undefined,
    tintBottomRight: undefined,
    tintTopRight: undefined,

    alphaBottomLeft: undefined,
    alphaTopLeft: undefined,
    alphaBottomRight: undefined,
    alphaTopRight: undefined,

})
```

```
value = base + amplitude * ease(time)
```

- `tintFill` : 
    - `false` : The member texture will be multiplied by the tint. 
    - `true` :  The member will use the texture alpha and the tint color.
- `tintBlend` : The tint blend mode of the member. `0` is no tint (equivalent to white), `1` is full tint.
- `tintBottomLeft`, `tintTopLeft`, `tintBottomRight`, `tintTopRight` : Tint color of the member, as a 24-bit RGB value.
- `alphaBottomLeft`, `alphaTopLeft`, `alphaBottomRight`, `alphaTopRight` : Alpha value of the member, in the range `0`-`1`.

##### Porperties to buffer index mapping table

| index | property name       |
|-------|---------------------|
| 0     | x-base              |
| 1     | x-amplitude         |
| 2     | x-duration          |
| 3     | x-delay             |
| 4     | y-base              |
| 5     | y-amplitude         |
| 6     | y-duration          |
| 7     | y-delay             |
| 8     | rotation-base       |
| 9     | rotation-amplitude  |
| 10    | rotation-duration   |
| 11    | rotation-delay      |
| 12    | scaleX-base         |
| 13    | scaleX-amplitude    |
| 14    | scaleX-duration     |
| 15    | scaleX-delay        |
| 16    | scaleY-base         |
| 17    | scaleY-amplitude    |
| 18    | scaleY-duration     |
| 19    | scaleY-delay        |
| 20    | alpha-base          |
| 21    | alpha-amplitude     |
| 22    | alpha-duration      |
| 23    | alpha-delay         |
| 24    | frame-base          |
| 25    | frame-amplitude     |
| 26    | frame-duration      |
| 27    | frame-delay         |
| 28    | tintBlend-base      |
| 29    | tintBlend-amplitude |
| 30    | tintBlend-duration  |
| 31    | tintBlend-delay     |
| 32    | tintBottomLeft      |
| 33    | tintTopLeft         |
| 34    | tintBottomRight     |
| 35    | tintTopRight        |
| 36    | originX             |
| 37    | originY             |
| 38    | tintFill            |
| 39    | creationTime        |
| 40    | scrollFactorX       |
| 41    | scrollFactorY       |

#### Insert member

```javascript
layer.insertMembers(index, {x,y,rotation,...});
```

#### Get member

```javascript
var member = layer.getMember(index);
```

- `member` : `{x, y, rotation, scaleX, scaleY, alpha, tintBlend, ...}`

#### Edit member

```javascript
layer.editMember(index, { /*...*/ });
```

!!! warning
    This is an expensive operation, as it requires the whole buffer to be updated.

#### Patch member

```javascript
layer.patchMember(index, member);
```

or

```javascript
layer.patchMember(index, member, mask);
```

- `index` : The index of the member to patch.
- `member` : The new member data stored in `Uint32Array` array. See [table](#porperties-to-buffer-index-mapping-table)
- `mask` : Optional.
    - `umdefined` or `null` : Overwrite all elements to buffer. 
    - An array contains `0` (skip this element modification), or `1` (overwrite buffer by this element).

### Remove member

```javascript
layer.removeMembers(index);
// layer.removeMembers(index, count);
```

!!! warning
    This is an expensive operation, as it requires the whole buffer to be updated.

### Other properties

See [game object](gameobject.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
