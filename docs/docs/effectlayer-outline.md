## Introduction

Draw outline of target game objects.

- Author: Rex
- Game object

## Live demos

- [Outline](https://codepen.io/rexrainbow/pen/abdpPMb)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/effectlayer-outline)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexoutlineeffectlayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlineeffectlayerplugin.min.js', true);
    ```
- Add outline effect layer object
    ```javascript
    var effectLayer = scene.add.rexOutlineEffectLayer(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import OutlineEffectLayerPlugin from 'phaser3-rex-plugins/plugins/outlineeffectlayer-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexOutlineEffectLayerPlugin',
                plugin: OutlineEffectLayerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add outline effect layer object
    ```javascript
    var effectLayer = scene.add.rexOutlineEffectLayer(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import OutlineEffectLayer from 'phaser3-rex-plugins/plugins/outlineeffectlayer.js';
    ```
- Add outline effect layer object
    ```javascript
    var effectLayer = new OutlineEffectLayer(scene, config);
    scene.add.existing(effectLayer);
    ```

### Create instance

```javascript
var effectLayer = scene.add.rexOutlineEffectLayer({
    // knockout: false,
    // thickness: 3,
    // outlineColor: 0x000000
});
```

- `knockout` :
    - `true` : Draw outline only.
    - `false` : Draw source texture and outline both.
- `thickness` : Thickness of outline.
- `outlineColor` : Color of outline.

### Custom class

- Define class
    ```javascript
    class MyOutlineEffectLayer extends OutlineEffectLayer {
        constructor(scene, config) {
            super(scene, config);
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
    var effectLayer = new MyOutlineEffectLayer(scene, config);
    ```

### Thickness

- Get
    ```javascript
    var thickness = effectLayer.thickness;
    ```
- Set
    ```javascript
    effectLayer.thickness = thickness;
    // effectLayer.thickness += value;
    ```
    or
    ```javascript
    effectLayer.setThickness(value);
    ```

### Outline color

- Get
    ```javascript
    var color = effectLayer.outlineColor;
    ```
    - `color` : [Color](color.md) object.
        - Red: `color.red`, 0~255.
        - Green: `color.green`, 0~255.
        - Blue: `color.blue`, 0~255.
- Set
    ```javascript
    effectLayer.setOutlineColor(value);
    ```
    ```javascript
    effectLayer.outlineColor = value;
    ```
    - `value` : A number `0xRRGGBB`, or a JSON object `{r:255, g:255, b:255}`

### Target game objects

Draw outline of added target game objects.

- Add
    ```javascript
    effectLayer.add(gameObject);
    ```
- Remove
    ```javascript
    effectLayer.remove(gameObject);
    ```
- Clear
    ```javascript
    effectLayer.clear();
    ```
- Contains
    ```javascript
    var hasGameObject = effectLayer.contains(gameObject);
    ```

### Limitation

* Can't support if `camera.zoom` is less then 1

* Can't support if `camera.startFollow(gameObject)`, i.e. 
  please scroll camera before target game objects draw on effect layer game object.