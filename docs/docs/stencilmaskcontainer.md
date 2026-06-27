## Introduction

A [Container](container.md) game object that masks its children by rendering mask source game objects into the WebGL stencil buffer.

- Author: Rex
- Game object

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

## Live demos

- [Mask](https://codepen.io/rexrainbow/pen/dPNzOLX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/stencilmasklayer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexstencilmasklayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexstencilmasklayerplugin.min.js', true);
    ```
- Add stencil-mask-container object
    ```javascript
    var container = scene.add.rexStencilMaskContainer(x, y);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import StencilMaskLayerPlugin from 'phaser4-rex-plugins/plugins/stencilmasklayer-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexStencilMaskLayerPlugin',
                plugin: StencilMaskLayerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add stencil-mask-container object
    ```javascript
    var container = scene.add.rexStencilMaskContainer(x, y);
    ```

!!! note
    `stencilmasklayer-plugin` registers both `rexStencilMaskLayer` and `rexStencilMaskContainer`.

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Import class
    ```javascript
    import StencilMaskContainer from 'phaser4-rex-plugins/plugins/stencilmaskcontainer.js';
    ```
- Add stencil-mask-container object
    ```javascript
    var container = new StencilMaskContainer(scene, x, y, children, config);
    scene.add.existing(container);
    ```

### Create instance

```javascript
var container = scene.add.rexStencilMaskContainer(x, y);
// var container = scene.add.rexStencilMaskContainer(x, y, children);
// var container = scene.add.rexStencilMaskContainer(x, y, children, config);
```

- `x`, `y` : Position of this container.
- `children` : Optional Game Object, or array of Game Objects, added as container children.
- `config` :
    - `local` : Render mask source game objects in container local coordinates. Default value is `true`.

Add stencil-mask-container from JSON

```javascript
var container = scene.make.rexStencilMaskContainer({
    x: 400,
    y: 300,
    children: [
        image
    ],
    local: true,

    add: true
});
```

### Add children

StencilMaskContainer extends [Container](container.md).

```javascript
container.add(gameObject);
// container.add([gameObject0, gameObject1]);
```

Only children in this container are affected by its stencil mask.

### Add mask source

```javascript
container.addMaskGameObject(maskGameObject);
// container.addMaskGameObject([maskGameObject0, maskGameObject1]);
```

- `maskGameObject` : Game Object, or array of Game Objects, used as stencil mask source.

Example:

```javascript
var mask = scene.add.container(0, 0)
    .add([
        scene.add.circle(-150, 0, 200, 0xffffff),
        scene.add.circle(150, 0, 200, 0xffffff)
    ]);

var container = scene.add.rexStencilMaskContainer(400, 300)
    .addMaskGameObject(mask);

container.add(scene.add.image(0, 0, 'classroom'));
```

!!! note
    Mask source game objects are removed from the normal display list when they are added by `addMaskGameObject()`.
    They are not added to the container children list. They are rendered only during the stencil mask pass.

### Mask coordinate space

By default, mask source game objects use this container's local coordinate space.

```javascript
var container = scene.add.rexStencilMaskContainer(400, 300, null, {
    local: true
});

var mask = scene.add.circle(0, 0, 160, 0xffffff);
container.addMaskGameObject(mask);

container.add(scene.add.image(0, 0, 'classroom'));
```

Set `local` to `false` to render mask source game objects in world coordinates.

```javascript
var container = scene.add.rexStencilMaskContainer(400, 300, null, {
    local: false
});

var mask = scene.add.circle(400, 300, 160, 0xffffff);
container.addMaskGameObject(mask);

container.add(scene.add.image(0, 0, 'classroom'));
```

Read the current mode.

```javascript
var local = container.maskLocal;
```

### Remove mask source

```javascript
container.removeMaskGameObject(maskGameObject);
// container.removeMaskGameObject([maskGameObject0, maskGameObject1]);
```

Remove all mask source game objects.

```javascript
container.clearMaskGameObjects();
```

### Invert mask

By default, children are visible inside the union of mask source game objects.

```javascript
container.setStencilInvert();
// container.setStencilInvert(true);
```

Children are visible outside the mask source area.

```javascript
container.setStencilInvert(false);
```

### Invisible mask source

Invisible mask source game objects do not affect the stencil mask.

```javascript
maskGameObject.setVisible(false);
```

### Nested stencil source

Mask source game objects can contain stencil objects. When required, the source is composited to a framebuffer before being used as stencil source.

```javascript
maskGameObject.stencilCompositeCheck = 'auto';
```

- `true` : Always composite stencil contents to a framebuffer.
- `false` : Never composite.
- `'auto'` : Composite only when nested stencil children are detected.

### Custom class

- Define class
    ```javascript
    class MyStencilMaskContainer extends StencilMaskContainer {
        constructor(scene, x, y, children, config) {
            super(scene, x, y, children, config);
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
    var container = new MyStencilMaskContainer(scene, x, y, children, config);
    ```

### Difference from Phaser Stencil

[Stencil](stencil.md) is an order-dependent global stencil operation. It affects later Game Objects until another stencil operation changes or removes it.

StencilMaskContainer pushes the stencil mask before rendering its own container children, then pops it after those children are rendered.

Therefore, the mask is scoped to this container's children.

### Other properties

See [container](container.md) and [game object](gameobject.md).
