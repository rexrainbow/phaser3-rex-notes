## Introduction

Cut image into pieces for jigsaw application.

- Author: Rex
- Method only

## Live demos

- [Create pieces](https://codepen.io/rexrainbow/pen/NWegLLK)
- [Custom piece shape](https://codepen.io/rexrainbow/pen/yLGoVxz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/jigsaw/)

### Install plugin

#### Load minify file

- Load script (minify file) in preload stage
    ```javascript
    scene.load.script('rexjigsaw', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexjigsaw.min.js');
    ```
- Cut image into pieces
    ```javascript
    var pieces = rexjigsaw.CreatePieces(gameObject, config);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import Jigsaw from 'phaser3-rex-plugins/templates/jigsaw/index.js';
    ```
- Add ease-data behavior
    ```javascript
    var pieces = Jigsaw.CreatePieces(gameObject, config);
    ```

### Create pieces

```javascript
var pieces = Jigsaw.CreatePieces(gameObject, {
    piecesKey: ,
    columns: , 
    rows: ,
    edgeWidth: , 
    edgeHeight: ,

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
