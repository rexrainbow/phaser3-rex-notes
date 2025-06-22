## Introduction

Draw frames on [canvas texture](canvas-texture.md), or [dynamic texture](dynamic-texture.md). It maintains a list of [frame manager](framemanager.md), to support unlimited frames.

- Author: Rex
- Member of scene

## Live demos

- [Pool]()

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/framemanager)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexframemanagerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexframemanagerplugin.min.js', true);
    ```
- Add frame-manager object
    ```javascript
    var frameManagerPool = scene.plugins.get('rexframemanagerplugin').addPool(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FrameManagerPlugin from 'phaser3-rex-plugins/plugins/framemanager-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFrameManager',
                plugin: FrameManagerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add frame-manager object
    ```javascript
    var frameManagerPool = scene.plugins.get('rexFrameManager').addPool(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { FrameManagerPool } from 'phaser3-rex-plugins/plugins/framemanager.js';
    ```
- Add frame-manager object
    ```javascript
    var frameManagerPool = new FrameManagerPool(scene, config);
    ```

### Create instance

```javascript
var frameManagerPool = scene.plugins.get('rexFrameManager').addPool(scene, {
    key: '',
    width: 4096,
    height: 4096,
    cellWidth: 64,
    cellHeight: 64,
    cellPadding: 0,
    columns: undefined,
    rows: undefined,
    fillColor: undefined,
    useDynamicTexture: false,
});
```

- `key` : 
    - A callback to generate texture key (ref: [texture manager](textures.md))
        ```javascript
        function(index) {
            return key + index.toString();
        }
        ```
    - A string to generate texture key by `${key}_${index}`
- `width`, `height` : Size of canvas.
    - Calculate `width`/`height` by `columns`/`rows` and `cellWidth`/`cellHeight`, if `columns`, `rows` parameters are given.
- `columns`, `rows` : 
    - `undefined` : Calculate `columns`/`rows` by `width`/`height` and `cellWidth`/`cellHeight`.
- `cellWidth`, `cellHeight` : Maximum frame size.
- `cellPadding` : Extra space around frame. Default value is `0`.
    - Total cell width will be `cellWidth + (cellPadding * 2)`
    - Total cell height will be `cellHeight + (cellPadding * 2)`
- `fillColor` : Fill an initial color, in css color string (for [canvas-texture](canvas-texture.md)), or number (for [dynamic-texture](dynamic-texture.md))
    - `undefined` : Don't fill color.
- `useDynamicTexture`
    - `false` : Use [canvas-texture](canvas-texture.md). Default behavior.
    - `true` : Use [dynamic-texture](dynamic-texture.md).


or

```javascript
var frameManagerPool = scene.plugins.get('rexFrameManager').addPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
```

Steps of generating bitmapfont :

1. Add frames : 
   ```javascript
   frameManagerPool.paste(frameName, gameObject);
   ```
2. Update texture
   ```javascript
   frameManagerPool.updateTexture();
   ```

!!! warning
    Frame manager pool can't export date to bitmapfont

### Add frame

#### From game object

After rendering content on [text](text.md), [bbcode text](bbcodetext.md), [canvas](canvas.md)

```javascript
frameManagerPool.paste(frameName, gameObject);
```

- `frameName` : Frame name.
- `gameObject` : 
    - [Canvas-texture](canvas-texture.md) mode :
        - Game objects which has canvas, for example, [text](text.md), [bbcode text](bbcodetext.md), or [canvas](canvas.md).
    - [Dynamic-texture](dynamic-texture.md) mode :
        -  Any render-able game object except :
            -  [Graphics](graphics.md) can't paste directly, because that Graphics game object does not have size. 
                - Draw Graphics to [RenderTexture](rendertexture.md), then paste this [RenderTexture](rendertexture.md) to frameMamager.
        - Draw multiple game objects : Draw game objects on [RenderTexture](rendertexture.md), then paste this [RenderTexture]


Get textrure key of last pasting action

```javascript
var key = frameManagerPool.lastKey;
```

#### Custom drawing

```javascript
frameManagerPool.draw(frameName, callback, scope);
```

- `frameName` : Frame name.
- `callback` : 
    - [Canvas-texture](canvas-texture.md) mode : 
        ```javascript
        function(canvas, context, frameSize) {
            // The maximum frame size
            var cellWidth = frameSize.width;
            var cellHeight = frameSize.height;
        
            // Draw content in area of (0, 0) - (cellWidth, cellHeight)
            
            // Update frame size
            // frameSize.width = ...
            // frameSize.height = ...
        }
        ```
    - [Dynamic-texture](dynamic-texture.md) mode :
        ```javascript
        function(texture, frameSize) {
            // The maximum frame size
            var cellWidth = frameSize.width;
            var cellHeight = frameSize.height;
        
            // Draw content in area of (0, 0) - (cellWidth, cellHeight)
            
            // Update frame size
            // frameSize.width = ...
            // frameSize.height = ...
        }
        ```

Get textrure key of last pasting action

```javascript
var key = frameManagerPool.lastKey;
```

#### Empty frame

```javascript
frameManagerPool.addEmptyFrame(frameName);
// frameManagerPool.addEmptyFrame(frameName, width, height);
```

- `frameName` : Frame name.
- `width` : Frame width, default value is `cellWidth`
- `height` : Frame height, default value is `cellHeight`

Get textrure key of last pasting action

```javascript
var key = frameManagerPool.lastKey;
```

### Update texture

Update texture after adding frames, for [Canvas-texture](canvas-texture.md) mode.

```javascript
frameManagerPool.updateTexture();
```

Do nothing in [Dynamic-texture](dynamic-texture.md) mode.

### Remove frame

- Remove a frame
    ```javascript
    frameManagerPool.remove(frameName);
    ```
    - `frameName` : Frame name.
- Remove all frames
    ```javascript
    frameManagerPool.clear();
    ```

Remove frame data but won't clear texture image.

### Get texture key

- Get all texture keys used by frame managers
    ```javascript
    var keys = frameManagerPool.keys;
    ```
    or
    ```javascript
    var keys = frameManagerPool.getKeys();
    ```
- Get texture key by frameName
    ```javascript
    var key = frameManagerPool.getKey(frameName);
    ```

### Destroy instance

```javascript
frameManagerPool.destroy();
```