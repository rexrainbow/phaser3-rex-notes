## Introduction

Cut image into pieces for jigsaw application.

- Author: Rex
- Method only

## Live demos

- [Create pieces](https://codepen.io/rexrainbow/pen/NWegLLK)
- [Custom piece shape](https://codepen.io/rexrainbow/pen/yLGoVxz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/cutjigsawimage/)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcutjigsawimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcutjigsawimageplugin.min.js', true);
    ```
- Cut image into pieces
    ```javascript
    var pieces = scene.plugins.get('rexcutjigsawimageplugin').gridCut(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CutJigsawImagePlugin from 'phaser3-rex-plugins/plugins/cutjigsawimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCutJigsawImage',
                plugin: CutJigsawImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Cut image into pieces
    ```javascript
    var pieces = scene.plugins.get('rexCutJigsawImage').gridCut(gameObjects, config);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import CutJigsawImage from 'phaser3-rex-plugins/plugins/cutjigsawimage.js';
    ```
- Cut image into pieces
    ```javascript
    var images = CutJigsawImage(gameObjects, config);
    ```

### Create pieces

```javascript
var pieces = scene.plugins.get('rexCutJigsawImage').gridCut(gameObject, {
    piecesKey: ,
    columns: , 
    rows: ,
    edgeWidth: , 
    edgeHeight: ,

    // drawShapeCallback: undefined,
    // edges: undefined,    

    // createImageCallback: undefined,
    // ImageClass: Phaser.GameObjects.Image,

    // originX: 0.5,
    // originY: 0.5,
    // add: true,
    // align: true,
    // objectPool: undefined
});
```

- `gameObjects` : Target game object which has a texture, ex [Image](image.md), [RenderTexture](rendertexture.md).
- `piecesKey` : Store frame of each piece in this dynamic texture.
    - `undefined` : Use `'gameObjects.texture.key' + '_pieces'` as texture key.
- `columns`, `rows` : Cut texture in `columns` x `rows` grids
- `edgeWidth`, `edgeHeight` : Padding around piece.
- `drawShapeCallback` : Callback of creating piece shape
    - `undefined` : Use default piece shape.
    - A function object
        ```javascript
        function(graphics, width, height, edgeWidth, edgeHeight, edgeMode) {
        }
        ```
        - `graphics` : Draw piece shape on a [Graphics game object](graphics.md)
        - `width`, `height` : Frame size of this piece
        - `edgeWidth`, `edgeHeigh` : Padding around piece.
        - `edgeMode` :
            ```javascript
            {
                left: 0,   // 0|1|2
                right: 0,  // 0|1|2
                top: 0,    // 0|1|2
                bottom: 0  // 0|1|2
            }
            ```
            - `left`, `right`, `top`, `bottom`
                - `0` : Flat edge
                - `1` : Convex edge
                - `2` : Concave edge
- `edges` : `edgeMode` in a 2d array for each piece
    - `undefined` : Create random edges for each piece.
- `createImageCallback` : Custom callback to return an image game object, optional.
    ```javascript
    function(scene, texture, frame) {
        return gameObject;
    }
    ``` 
    - `texture` : A texture object.
    - `frame` : Frame name.
- `ImageClass` : Create image game object from this class. Default value is built-in [Image](image.md) class. Used when `createImageCallback` is `undefined`.
- `originX`, `originY` : Origin of created image game objects
- `add` : 
    - `true` : Add these created image game objects to scene. Default value.
    - `false` : Don't add created image game objects to scene.
- `align` :
    - `true` : Align position of created image game objects to target game object (`gameObjects`). Default value when `add` is set to `true`.
    - `false` : Don't set position of created image game objects. Default value when `add` is set to `false`.
- `objectPool` : An array of image game objects, will reuse image game objects from this pool. Optional.
- `pieces` : Return piece game objects.
    - Size of any piece game object (frame size) :
        - width : `(gameObjects.width / columns) + (2 * edgeWidth)`
        - height : `(gameObjects.height / rows) + (2 * edgeHeigh)`
    - Frame name of a piece game object : `columnIndex + ',' + rowIndex` 
