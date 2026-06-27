## Introduction

A [Layer](layer.md) game object that builds an ordered sequence of [Stencil](stencil.md), [Layer](layer.md) or [Container](contaniner.md), and [StencilReference game objects](stencil.md).

Use it when stencil ranges can overlap or interleave, for example:

```text
add stencil A
render layer0/container0
add stencil B
render layer1/container1
remove stencil A
render layer2/container2
remove stencil B
render layer3/container3
```

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

- [Mask](https://codepen.io/rexrainbow/pen/PwWjvQj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/stencillayers)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexstencillayersplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexstencillayersplugin.min.js', true);
    ```
- Add stencil-layers object
    ```javascript
    var mainLayer = scene.add.rexStencilLayers();
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import StencilLayersPlugin from 'phaser4-rex-plugins/plugins/stencillayers-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexStencilLayersPlugin',
                plugin: StencilLayersPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add stencil-layers object
    ```javascript
    var mainLayer = scene.add.rexStencilLayers();
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser4-rex-plugins
    ```
- Import class
    ```javascript
    import StencilLayers from 'phaser4-rex-plugins/plugins/stencillayers.js';
    ```
- Add stencil-layers object
    ```javascript
    var mainLayer = new StencilLayers(scene);
    scene.add.existing(mainLayer);
    ```

### Create instance

```javascript
var mainLayer = scene.add.rexStencilLayers();
```

Add stencil-layers from JSON

```javascript
var mainLayer = scene.make.rexStencilLayers({
    add: true
});
```

### Build stencil sequence

Create a stencil start operation and the section rendered after it.

```javascript
mainLayer.addStencil(stencilName, layerName, config);
```

or

```javascript
mainLayer.addStencil({
    stencilName: 'stencilA',
    layerName: 'layer0',
    stencilInvert: true,
    // useContainer: false,

    // stencilInvert: false,
    // stencilAlphaStrategy: 'dither',
    // stencilCompositeCheck: 'auto',
    // stencilClearValue: 0,
    // stencilValueWrap: true
});
```

- `useContainer` :
    - `false` : Append a new [Layer game object](layer.md) after [stencil game object](stencil.md). Default behavior.
    - `true` : Append a new [Container game object](container.md) after [stencil game object](stencil.md).

Create a stencil reference operation that removes an open stencil, and the section rendered after it.

```javascript
mainLayer.removeStencil(stencilName, layerName, config);
```

or

```javascript
mainLayer.removeStencil({
    stencilName: 'stencilA',
    layerName: 'layer1',
    // useContainer: false,

    // stencilAlphaStrategy: 'dither',
    // stencilCompositeCheck: 'auto',
    // stencilClearValue: 0,
    // stencilValueWrap: true
});
```

- `useContainer` :
    - `false` : Append a new [Layer game object](layer.md) after [stencil reference game object](stencil.md). Default behavior.
    - `true` : Append a new [Container game object](container.md) after [stencil reference game object](stencil.md).

Verify that all stencils have matching remove operations. 
Throws an error if any stencil has not been removed. A stencil can only be removed once.

```javascript
mainLayer.end();
```

#### Example

```javascript
var mainLayer = scene.add.rexStencilLayers()
    .addStencil({
        stencilName: 'stencilA',
        layerName: 'layer0',
        stencilInvert: true
    })
    .addStencil({
        stencilName: 'stencilB',
        layerName: 'layer1',
        stencilInvert: true
    })
    .removeStencil({
        stencilName: 'stencilA',
        layerName: 'layer2'
    })
    .removeStencil({
        stencilName: 'stencilB',
        layerName: 'layer3'
    })
    .end();
```

The generated display order is:

```text
mainLayer
  - stencilA            (Stencil)
  - layer0              (Layer or Container)
  - stencilB            (Stencil)
  - layer1              (Layer or Container)
  - stencilA reference  (Stencil reference)
  - layer2              (Layer or Container)
  - stencilB reference  (Stencil reference)
  - layer3              (Layer or Container)
```

Add stencil source children.

```javascript
mainLayer.getStencil('stencilA').add(
    scene.add.circle(250, 300, 200, 0xffffff)
);

mainLayer.getStencil('stencilB').add(
    scene.add.circle(550, 300, 200, 0xffffff)
);
```

Add render content into generated sections.

```javascript
mainLayer.getLayer('layer0').add(gameObject);
mainLayer.getLayer('layer1').add(gameObject);
mainLayer.getLayer('layer2').add(gameObject);
mainLayer.getLayer('layer3').add(gameObject);
```

### Get generated objects

Get a generated Stencil.

```javascript
var stencil = mainLayer.getStencil(stencilName);
```

Get a generated section.

```javascript
var layer = mainLayer.getLayer(layerName);
// var container = mainLayer.getContainer(layerName);
```

### Custom class

- Define class
    ```javascript
    class MyStencilLayers extends StencilLayers {
        constructor(scene) {
            super(scene);
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
    var mainLayer = new MyStencilLayers(scene);
    ```

### Difference from StencilMaskLayer

- [StencilMaskLayer](stencilmasklayer.md) applies one stencil mask to its own layer children.
- StencilLayers manages an ordered stencil sequence and exposes the generated sections by name. Use StencilLayers when stencil add/remove operations need to interleave.

### Other properties

See [layer](layer.md) and [game object](gameobject.md).
