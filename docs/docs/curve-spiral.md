## Introduction

Spiral curve.

- Author: Rex
- Curve object

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/curve-spiral)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexspiralcurveplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexspiralcurveplugin.min.js', true);
    ```
- Add spiral curve object
    ```javascript
    var spiral = scene.plugins.get('rexspiralcurveplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SpiralCurvePlugin from 'phaser3-rex-plugins/plugins/spiralcurve-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSpiralCurve',
                plugin: SpiralCurvePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add spiral curve object
    ```javascript
    var spiral = scene.plugins.get('rexSpiralCurve').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import SpiralCurve from 'phaser3-rex-plugins/plugins/spiralcurve.js';
    ```
- Add spiral curve object
    ```javascript
    var spiral = new SpiralCurve(config);
    ```

### Create shape

```javascript
var spiral = scene.plugins.get('rexSpiralCurve').add({
    // Origin point
    // x: 0, y:0,    
    // Ease origin point
    // startX:0, endX: 0, easeX: 'Linear',
    // startY:0, endY: 0, easeY: 'Linear',

    // x-radius
    // startXRadius: 0, endXRadius, easeXRadius: 'Linear',
    // y-radius
    // startYRadius: 0, endYRadius, easeYRadius: 'Linear',

    // angle
    // startAngle: 0, endAngle: 360, easeAngle: 'Linear',

    // rotation: 0
});
```

- Origin point
    - `x`, `y` : Fixed origin point, or
    - `startX`, `endX`, `easeX`, `startY`, `endY`, `easeY` : Ease origin point.
- Radius
    - `startXRadius`, `endXRadius`, `easeXRadius` : Ease x-radius.
    - `startYRadius`, `endYRadius`, `easeYRadius` : Ease y-radius.
- Angle
    - `startAngle`, `endAngle`, `easeAngle` : Ease angle.
- `rotation` : Rotate curve.

### Draw on [graphics](graphics.md)

See [path](path.md#draw-on-graphics).

### Set properties


### Get properties
