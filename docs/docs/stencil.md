## Introduction

Use the WebGL stencil buffer to control where later Game Objects are rendered.

- Author: Phaser Team

!!! warning "WebGL only"
    Only work in WebGL render mode.

!!! warning "Requires stencil buffer"
    Enable stencil buffer in game config. Default behavior is enabling stencil buffer.

    ```javascript
    var config = {
        type: Phaser.WEBGL,
        stencil: true,
        // ...
    };
    ```

## Usage

### Add stencil object

A Stencil is a [Container](container.md). Its children are rendered into the stencil buffer, not as normal visible color output.

```javascript
var stencil = scene.add.stencil(x, y, children, {
    // stencilLayerMode: 'addLayer',
    // stencilInvert: false,
    // stencilAlphaStrategy: 'dither',
    // stencilCompositeCheck: 'auto',
    // stencilClearValue: 0,
    // stencilValueWrap: true
});
```

- `x`, `y` : Position of the stencil container.
- `children` : A Game Object, or an array of Game Objects, used as the stencil source.
- `stencilLayerMode` :
    - `'addLayer'` : Add 1 to the stencil buffer where children draw.
    - `'subtractLayer'` : Subtract 1 from the stencil buffer where children draw.
    - `'clear'` : Clear the whole stencil buffer to `stencilClearValue`.
    - `'clearRegion'` : Clear the children region to `stencilClearValue`.
- `stencilInvert` : Invert the source area for `addLayer` and `subtractLayer`.
- `stencilAlphaStrategy` : Alpha handling while writing stencil source.
    - Default is the game renderer's `stencilAlphaStrategy`.
    - If set to `'keep'`, transparent pixels can still write to stencil unless the shader discards them.
- `stencilCompositeCheck` :
    - `true` : Always composite stencil contents to a framebuffer.
    - `false` : Never composite.
    - `'auto'` : Composite only when nested stencil children are detected.
- `stencilClearValue` : Value used by `clear` and `clearRegion`. Range is 0 to 255.
- `stencilValueWrap` : Wrap stencil values on overflow or underflow when adding or subtracting layers.

Example:

```javascript
var circle = scene.add.circle(0, 0, 160, 0xffffff);

var stencil = scene.add.stencil(400, 300, circle);
```

!!! note
    Children added to a Stencil are managed by the Stencil container. They are not drawn normally by the Scene display list.

### Add stencil from JSON

```javascript
var stencil = scene.make.stencil({
    x: 400,
    y: 300,
    children: [
        circle
    ],
    options: {
        stencilLayerMode: 'addLayer'
    },
    add: true
});
```

### Clip later objects

The stencil buffer affects Game Objects rendered after the Stencil object.

By default, a stencil layer prevents rendering where its children draw.

```javascript
var stencil = scene.add.stencil(400, 300, [
    scene.add.circle(0, 0, 160, 0xffffff)
]);

// This image will not render inside the circle area.
scene.add.image(400, 300, 'classroom');
```

Use `stencilInvert: true` to draw only inside the stencil source area.

```javascript
var stencil = scene.add.stencil(400, 300, [
    scene.add.circle(0, 0, 160, 0xffffff)
], {
    stencilInvert: true
});

// This image will render only inside the circle area.
scene.add.image(400, 300, 'classroom');
```

### Remove stencil effect

Use a StencilReference to re-render the same stencil source with another stencil mode.

```javascript
var stencil = scene.add.stencil(400, 300, [
    scene.add.circle(0, 0, 160, 0xffffff)
], {
    stencilInvert: true
});

scene.add.image(400, 300, 'classroom');

scene.add.stencilreference(stencil, {
    stencilLayerMode: 'subtractLayer',
    stencilInvert: true
});

// This object is no longer affected by the previous stencil layer.
scene.add.rectangle(400, 300, 800, 600, 0x003366, 0.4);
```

!!! note
    A StencilReference uses the target Stencil geometry and transform. Its own position does not move the stencil source.

### Add stencil reference from JSON

```javascript
var reference = scene.make.stencilreference({
    targetStencil: stencil,
    options: {
        stencilLayerMode: 'subtractLayer',
        stencilInvert: true
    },
    add: true
});
```

### Clear stencil buffer

Clear the whole stencil buffer.

```javascript
scene.add.stencil(0, 0, null, {
    stencilLayerMode: 'clear',
    stencilClearValue: 0
});
```

Clear only a region defined by children.

```javascript
scene.add.stencil(400, 300, [
    scene.add.rectangle(0, 0, 300, 200, 0xffffff)
], {
    stencilLayerMode: 'clearRegion',
    stencilClearValue: 0
});
```

!!! note
    `stencilInvert` is not used with `clear` or `clearRegion`.

### Layer order

Stencil is order-dependent.

```javascript
var stencil = scene.add.stencil(400, 300, maskShape, {
    stencilInvert: true
});

scene.add.image(400, 300, 'classroom');

scene.add.stencilreference(stencil, {
    stencilLayerMode: 'subtractLayer',
    stencilInvert: true
});
```

Only Game Objects rendered between the Stencil and the matching StencilReference are affected.

### Overlapping stencil source children

Stencil source geometry is **additive**. If two children overlap in the same Stencil, the overlap can add or subtract more than 1 from the stencil buffer.

Avoid overlapping source children when you expect simple union behavior.

### Nested stencils

Nested stencils are supported, but they can require framebuffer composition.

```javascript
var stencil = scene.add.stencil(400, 300, children, {
    stencilCompositeCheck: 'auto'
});
```

Use `stencilCompositeCheck: true` when using a custom Game Object that contains stencil behavior but cannot be detected automatically.

### Custom class

- Define class
    ```javascript
    class MyStencil extends Phaser.GameObjects.Stencil {
        constructor(scene, x, y, children, options) {
            super(scene, x, y, children, options);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var stencil = new MyStencil(scene, x, y, children, options);
    ```

### Other properties

See [container](container.md) and [game object](gameobject.md).
