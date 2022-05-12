## Introduction

Attach `polarOX`, `polarOY`, `polarRotation`, `polarAngle`, and `polarRadius` properties to a game object.

- Author: Rex
- Method only

## Live demos

- [Circle](https://codepen.io/rexrainbow/pen/yLvaNVL)
- [Spiral](https://codepen.io/rexrainbow/pen/KKQgpNO?)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/polar-coordinate)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexpolarcoordinateplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpolarcoordinateplugin.min.js', true);
    ```
- Attach `polarOX`, `polarOY`, `polarRotation`, `polarAngle`, and `polarRadius` properties.
    ```javascript
    scene.plugins.get('rexpolarcoordinateplugin').add(gameObject, ox, oy, rotation, radius);
    gameObject.polarRadius = 200;
    gameObject.polarAngle = -45;
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import PolarCoordinatePlugin from 'phaser3-rex-plugins/plugins/polarcoordinate-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexPolarCoordinate',
                plugin: PolarCoordinatePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Attach `polarOX`, `polarOY`, `polarRotation`, `polarAngle`, and `polarRadius` properties.
    ```javascript
    scene.plugins.get('rexPolarCoordinate').add(gameObject, ox, oy, rotation, radius);
    gameObject.polarRadius = 200;
    gameObject.polarAngle = -45;
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import AddPolarCoordinateProperties from 'phaser3-rex-plugins/plugins/polarcoordinate.js';
    ```
- Attach `polarOX`, `polarOY`, `polarRotation`, `polarAngle`, and `polarRadius` properties.
    ```javascript
    AddPolarCoordinateProperties(gameObject, ox, oy, rotation, radius);
    gameObject.polarOX = 400;
    gameObject.polarOY = 300;
    gameObject.polarRadius = 200;
    gameObject.polarAngle = -45;
    ```

### Attach properties

```javascript
scene.plugins.get('rexPolarCoordinate').add(gameObject, ox, oy, rotation, radius);
gameObject.polarOX = 400;
gameObject.polarOY = 300;
gameObject.polarRadius = 200;
gameObject.polarAngle = -45;
```

- `ox`, `oy` : Position of origin point.
- `rotation` : Polar angle, in radian.
- `radius` : Polar radius.

```
x = ( polarRadius * cos(polarRotation) ) + polarOX
y = ( polarRadius * sin(polarRotation) ) + polarOY
``` 

### Circle

```javascript
scene.tweens.add({
    targets: gameObject,
    polarAngle: 360,
    duration: 3000
})
```