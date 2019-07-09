## Introduction

Drawing on [canvas](https://www.w3schools.com/html/html5_canvas.asp).

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/canvas-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexcanvasplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/canvas.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/canvas)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexCanvasPlugin',
            plugin: CanvasPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var canvas = scene.add.rexCanvas(x, y, width, height);
```

Add canvas from JSON

```javascript
var canvas = scene.make.rexCanvas({
    x: 0,
    y: 0,
    width: 256,
    height: 256,

    //fill: null,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyCanvas extends Canvas {
        constructor(scene, x, y, width, height) {
            super(scene, x, y, width, height);
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
    var canvas = new MyCanvas(scene, x, y, width, height);
    ```

### Clear or fill canvas

- Clear
    ```javascript
    canvas.clear();
    ```
- Fill color
    ```javascript
    canvas.fill(color);
    ```

### Update canvas

1. Get canvas elemet
    ```javascript
    var canvasElem = canvas.getCanvas();
    var context = canvasElem.getContext('2d');
    ```
    or
    ```javascript
    var canvaesElem = canvas.canvas;
    var context = canvas.context;
    ```
1. Draw on [context](https://www.w3schools.com/html/html5_canvas.asp)

### Update display texture

- Update texture when rendering
    ```javascript
    canvas.needRedraw();
    ```
- Update texture now
    ```javascript
    canvas.updateTexture();
    ```
    or update canvas and texture
    ```javascript
    var callback = function(canvasElem, context) { };
    canvas.updateTexture(callback);
    // canvas.updateTexture(callback, scope);
    ```

### Load or save texture

- Save canvas to texuture
    ```javascript
    canvas.generateTexture(key, x, y, width, height);
    ```
- Copy canvas from texture
    ```javascript
    canvas.loadTexture(key, resize);
    ```

### Pixel color

- Get color
    ```javascript
    var color = canvas.getPixel(x, y);
    ```
    - `color` : [Color object](color.md)
        - `color.red`, `color.green`, `color.blue`, `color.alpha`
- Set color
    ```javascript
    canvas.setPixel(x, y, r, g, b);
    // canvas.setPixel(x, y, r, g, b, a);
    ```
    or
    ```javascript
    canvas.setPixel(x, y, color);
    ```
    - `r`, `g`, `b`, `a` : Integer number between 0 ~ 255.
    - `color` : [Color object](color.md)

## Compare with [Graphics object](graphics.md)

 - Drawing method
    - This canvas object draws stuff on canvas in WEBGL or CANVAS render mode.  
    - Graphics object draws stuff on webgl render pipeline in WEBGL render mode.
- Size
    - This canvas object has size (width, height) and origin.  
    - Graphics object does not have size and origin.