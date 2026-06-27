## Introduction

A [Layer](layer.md) game object that masks its children by rendering mask source game objects into the WebGL stencil buffer.

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

- [Mask](https://codepen.io/rexrainbow/pen/KwaqowY)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/stencilmasklayer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexstencilmasklayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexstencilmasklayerplugin.min.js', true);
    ```
- Add stencil-mask-layer object
    ```javascript
    var layer = scene.add.rexStencilMaskLayer();
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
- Add stencil-mask-layer object
    ```javascript
    var layer = scene.add.rexStencilMaskLayer();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Import class
    ```javascript
    import StencilMaskLayer from 'phaser4-rex-plugins/plugins/stencilmasklayer.js';
    ```
- Add stencil-mask-layer object
    ```javascript
    var layer = new StencilMaskLayer(scene);
    scene.add.existing(layer);
    ```

### Create instance

```javascript
var layer = scene.add.rexStencilMaskLayer();
// var layer = scene.add.rexStencilMaskLayer(children);
```

- `children` : Optional Game Object, or array of Game Objects, added as layer children.

Add stencil-mask-layer from JSON

```javascript
var layer = scene.make.rexStencilMaskLayer({
    children: [
        image
    ],

    add: true
});
```

### Add children

StencilMaskLayer extends [Layer](layer.md).

```javascript
layer.add(gameObject);
// layer.add([gameObject0, gameObject1]);
```

Only children in this layer are affected by its stencil mask.

### Add mask source

```javascript
layer.addMaskGameObject(maskGameObject);
// layer.addMaskGameObject([maskGameObject0, maskGameObject1]);
```

- `maskGameObject` : Game Object, or array of Game Objects, used as stencil mask source.

Example:

```javascript
var mask = scene.add.container(400, 300)
    .add([
        scene.add.circle(-150, 0, 200, 0xffffff),
        scene.add.circle(150, 0, 200, 0xffffff)
    ]);

var layer = scene.add.rexStencilMaskLayer()
    .addMaskGameObject(mask);

layer.add(scene.add.image(400, 300, 'classroom'));
```

!!! note
    Mask source game objects are removed from the normal display list when they are added by `addMaskGameObject()`.
    They are rendered only during the stencil mask pass.

### Remove mask source

```javascript
layer.removeMaskGameObject(maskGameObject);
// layer.removeMaskGameObject([maskGameObject0, maskGameObject1]);
```

Remove all mask source game objects.

```javascript
layer.clearMaskGameObjects();
```

### Invert mask

By default, children are visible inside the union of mask source game objects.

```javascript
layer.setStencilInvert();
// layer.setStencilInvert(true);
```

Children are visible outside the mask source area.

```javascript
layer.setStencilInvert(false);
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
    class MyStencilMaskLayer extends StencilMaskLayer {
        constructor(scene, children) {
            super(scene, children);
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
    var layer = new MyStencilMaskLayer(scene, children);
    ```

### Difference from Phaser Stencil

[Stencil](stencil.md) is an order-dependent global stencil operation. It affects later Game Objects until another stencil operation changes or removes it.

StencilMaskLayer pushes the stencil mask before rendering its own layer children, then pops it after those children are rendered.

Therefore, the mask is scoped to this layer's children.

### Other properties

See [layer](layer.md) and [game object](gameobject.md).
