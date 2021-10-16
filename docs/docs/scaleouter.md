## Introduction

Scroll and zoom camera to make default game window fit the display area, in [**RESIZE scale mode**](scalemanager.md).

- Author: Rex
- Member of scene

## Live demos

- [Static camera](https://codepen.io/rexrainbow/pen/ExvPaqY)
- [Tween camera](https://codepen.io/rexrainbow/pen/powXPBq)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/scaleouter)

### Install plugin

#### Set scale mode to RESIZE

```javascript
var config = {
    // ...
    scale: {
        parent: divId,
        mode: Phaser.Scale.RESIZE,
        width: 1024,    // Default game window width
        height: 768,    // Default game window height
        // ...
    }
}
var game = new Phaser.Game(config);
```

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexscaleouterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscaleouterplugin.min.js', 'rexScaleOuter', 'rexScaleOuter');
    ```
- Scale outer is created as a member of scene (`scene.rexScaleOuter`) for each scene. 
  It will control main camera (`scene.cameras.main`) by default.

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install scene plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ScaleOuterPlugin from 'phaser3-rex-plugins/plugins/scaleouter-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexScaleOuter',
                plugin: ScaleOuterPlugin,
                mapping: 'rexScaleOuter'
            }]
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Scale outer is created as a member of scene (`scene.rexScaleOuter`) for each scene. 
  It will control main camera (`scene.cameras.main`) by default.

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import ScaleOuter from 'phaser3-rex-plugins/plugins/scaleouter.js';
    ```
- Add scaleouter object
    ```javascript
    var scaleouter = new ScaleOuter(scene);
    ```

### Create instance

ScaleOuter plugin is a scene plugin, which created as a member of scene (`scene.rexScaleOuter`) 
for each scene. It does not have to create other scale outer instance.

### Add camera

- Add camera manually, under `scene.create() { ... }`
    ```javascript
    scene.rexScaleOuter.add(camera);
    ```
- Scale outer will control main camera (`scene.cameras.main`) if no camera added.

### Remove instance

Invoke `scene.rexScaleOuter.destroy()` under `scene.create() { ... }`.
