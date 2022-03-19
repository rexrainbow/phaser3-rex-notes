## Introduction

Generate bitmapfont from [text game object](text.md), or [bbcode text game object](bbcodetext.md).

- Author: Rex
- Member of scene

## Live demos

- [Paste text](https://codepen.io/rexrainbow/pen/PoOXdwE)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvasframemanager)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexcanvasframemanagerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasframemanagerplugin.min.js', true);
    ```
- Add canvas-frame-manager object
    ```javascript
    var canvasFrames = scene.plugins.get('rexcanvasframemanagerplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import CanvasFrameManagerPlugin from 'phaser3-rex-plugins/plugins/canvasframemanager-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexCanvasFrameManager',
                plugin: CanvasFrameManagerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add canvas-frame-manager object
    ```javascript
    var canvasFrames = scene.plugins.get('rexCanvasFrameManager').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import CanvasFrameManager from 'phaser3-rex-plugins/plugins/canvasframemanager.js';
    ```
- Add canvas-frame-manager object
    ```javascript
    var canvasFrames = new CanvasFrameManager(scene, config);
    ```

### Create instance

```javascript
var canvasFrames = scene.plugins.get('rexCanvasFrameManager').add(scene, {
    key: '',
    width: 4096,
    height: 4096,
    cellWidth: 64,
    cellHeight: 64,
    fillColor: undefined
});
```

- `key` : Texture key in [texture manager](textures.md)
- `width`, `height` : Size of canvas.
- `cellWidth`, `cellHeight` : Maximum frame size.
- `fillColor` : Fill an initial color, in css color string.
    - `undefined` : Don't fill color.

or

```javascript
var canvasFrames = scene.plugins.get('rexCanvasFrameManager').add(scene, key, width, height, cellWidth, cellHeight, fillColor);
```

Steps of generating bitmapfont :

1. Add frames : 
   ```javascript
   canvasFrames.paste(frameName, gameObject);
   ```
1. Update texture
   ```javascript
   canvasFrames.updateTexture();
   ```
1. Export frame data to bitmapfont
   ```javascript
   canvasFrames.addToBitmapFont();
   ```

### Add frame

#### From game object

After rendering content on [text](text.md), [bbcode text](bbcodetext.md), [canvas](canvas.md)

```javascript
canvasFrames.paste(frameName, gameObject);
```

- `frameName` : Frame name.
- `gameObject` : [text](text.md), [bbcode text](bbcodetext.md), or [canvas](canvas.md).

#### Custom drawing

```javascript
canvasFrames.draw(frameName, callback, scope)
```

- `frameName` : Frame name.
- `callback` : 
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

#### Empty frame

```javascript
canvasFrames.addEmptyFrame(frameName);
// canvasFrames.addEmptyFrame(frameName, width, height);
```

- `frameName` : Frame name.
- `width` : Frame width, default value is `cellWidth`
- `height` : Frame height, default value is `cellHeight`

### Update texture

Update texture after adding frames.

```javascript
canvasFrames.updateTexture();
```

### Remove frame

```javascript
canvasFrames.remove(frameName);
```

- `frameName` : Frame name.

### Export to bitmapfont

```javascript
canvasFrames.addToBitmapFont();
```

### Destroy instance

```javascript
canvasFrames.destroy();
```