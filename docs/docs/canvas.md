## Introduction

Drawing on [canvas](https://www.w3schools.com/html/html5_canvas.asp).

- Author: Rex
- A kind of game object

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
            key: 'CanvasPlugin',
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

    //fill: null
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
    }
    ```
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

### Get canvas elemet

```javascript
var canvasElem = canvas.getCanvas();
// var context = canvasElem.getContext('2d');
// Drawing on context
```

### Update display texture

```javascript
canvas.needRedraw();
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

## Compare with [Graphics object](graphics.md)

 - Drawing method
    - This canvas object draws stuff on canvas in WEBGL or CANVAS render mode.  
    - Graphics object draws stuff on webgl render pipeline n WEBGL render mode.

- Size
    - This canvas object has size (width, height) and origin.  
    - Graphics object does not have size and origin.