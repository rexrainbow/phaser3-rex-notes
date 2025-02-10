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
var image = scene.make.image({
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
    // x: {base, amplitude, duration, delay, ease, yoyo},

    y: ,
    // y: {base, amplitude, duration, delay, ease, yoyo},

    rotation: ,
    // rotation: {base, amplitude, duration, delay, ease, yoyo},

    scaleX: ,
    // scaleX: {base, amplitude, duration, delay, ease, yoyo},

    scaleY: ,
    // scaleY: {base, amplitude, duration, delay, ease, yoyo},

    alpha: ,
    // alpha: {base, amplitude, duration, delay, ease, yoyo},

    tintBlend: ,
    // tintBlend: {base, amplitude, duration, delay, ease, yoyo},

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
