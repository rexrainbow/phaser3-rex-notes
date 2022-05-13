## Introduction

Display [live2d](https://www.live2d.com/en/) model.

- Author: Rex
- Game object

## Live demos

- [Transform and hit area](https://codepen.io/rexrainbow/pen/BaYaJyy)
- [Change model](https://codepen.io/rexrainbow/pen/NWyPaEz)

The example Live2D models, Haru and Hiyori, are redistributed under Live2D's [Free Material License](https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/live2d)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlive2dplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlive2dplugin.min.js', true);
    ```
- Load live2d core script, in preload stage
    ```javascript
    scene.load.rexLive2dCoreScript(coreScriptURL);
    ```
- Load model assets, in preload stage
    ```javascript
    scene.load.rexLive2d(key, modelSettingURL);
    ```
- Add live2d object
    ```javascript
    var live2dGameObject = scene.add.rexLive2d(x, y, key, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import Live2dPlugin from 'phaser3-rex-plugins/plugins/live2d-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLive2dPlugin',
                plugin: Live2dPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Load live2d core script, in preload stage
    ```javascript
    scene.load.rexLive2dCoreScript(coreScriptURL);
    ```
- Load model assets, in preload stage
    ```javascript
    scene.load.rexLive2d(key, modelSettingURL);
    ```
- Add live2d object
    ```javascript
    var live2dGameObject = scene.add.rexLive2d(x, y, key, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import {
        Live2dCoreScriptFileCallback,
        Live2dFileCallback,
        Live2dGameObject
    } from 'phaser3-rex-plugins/plugins/live2d.js';
    ```
- Load live2d core script, in preload stage
    ```javascript
    Live2dCoreScriptFileCallback.call(scene.load, coreScriptURL);
    ```
- Load model assets, in preload stage
    ```javascript
    Live2dFileCallback.call(scene.load, key, modelSettingURL);
    ```
- Add live2d object
    ```javascript
    var live2dGameObject = new Live2dGameObject(scene, x, y, key, config);
    scene.add.existing(live2dGameObject);
    ```

### Create instance

```javascript
var live2dGameObject = scene.add.rexLive2d(x, y, key, {
    // autoPlayIdleMotion: motionGroupName
});
```

- `autoPlayIdleMotion` : Start motion when idle (i.e. all motions are finished).

Add live2d from JSON

```javascript
var live2d = scene.make.rexLive2d({
    x: 0,
    y: 0,
    key: 256,
    // autoPlayIdleMotion: motionGroupName,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyLive2d extends Live2d {
        constructor(scene, x, y, key, config) {
            super(scene, x, y, key, config);
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
    var live2dGameObject = new MyLive2d(scene, x, y, key, config);
    ```

### Change model

```javascript
live2dGameObject.setModel(key);
```

or

```javascript
live2dGameObject.setModel(key, {
    // autoPlayIdleMotion: motionGroupName
})
```

### Expression

- Set expression
    ```javascript
    live2dGameObject.setExpression(name);
    ```
- Get expression names
    ```javascript
    var names = live2dGameObject.getExpressionNames();
    ```
    - `names` : Array of expression names

### Motion

- Start motion
    ```javascript
    live2dGameObject.startMotion(group, no);
    // live2dGameObject.startMotion(group, no, priority);
    ```
    - `group` : Group name of motion
    - `no` : Number of motion in `group`
    - `priority` : Priority of this motion
        - `'idle'`, or `1`
        - `'normal'`, or `2`, default value
        - `'force'` or `3`
- Start random motion
    ```javascript
    live2dGameObject.startMotion(group);
    // live2dGameObject.startMotion(group, undefined, priority);
    ```
- Stop all motions
    ```javascript
    live2dGameObject.stopAllMotions();
    ```
- Get motion names
    ```javascript
    var names = live2dGameObject.getMotionNames();
    ```
- Get motion names of a group
    ```javascript
    var names = live2dGameObject.getMotionNames(group);
    ```
    - `group` : Group name of motion
- Get motion group names
    ```javascript
    var names = live2dGameObject.getMotionGroupNames();
    ```
- Get current playing motion names
    ```javascript
    var names = live2dGameObject.getPlayinigMotionNames();
    ```
- Is any motion playing?
    ```javascript
    var isPlaying = live2dGameObject.isAnyMotionPlaying();
    ```
- Start motion when idle (i.e. all motions are finished)
    ```javascript
    live2dGameObject.autoPlayIdleMotion(group);
    ```
    - `group` : Group name of motion

### Look at

- Look at
    ```javascript
    live2dGameObject.lookAt(x, y, {
        // camera: scene.cameras.main,

        // eyeBallX: 1, eyeBallY: 1,
        // angleX: 30, angleY: 30, angleZ: 30,
        // bodyAngleX: 10
    })
    ```
    - `x`, `y` : Look at position.
    - `camera` : Default value is `scene.cameras.main`.
    - `eyeBallX`, `eyeBallY` : Weight of parameter `ParamEyeBallX`, `ParamEyeBallY`.
    - `angleX`, `angleY`, `angleZ` : Weight of parameter `ParamAngleX`, `ParamAngleY`, `ParamAngleZ`.
    - `bodyAngleX` : Weight of parameter `ParamBodyAngleX`.
- Look forward
    ```javascript
    live2dGameObject.lookForward();
    ```

### Lip sync

- Set lip sync value
    ```javascript
    live2dGameObject.setLipSyncValue(value);
    ```
    or
    ```javascript
    live2dGameObject.lipSyncValue = value;
    ```
- Get lip sync value
    ```javascript
    var value = live2dGameObject.lipSyncValue;
    ```

### Hit test

#### Touch events

1. Set interactive
    ```javascript
    live2dGameObject.setInteractive();
    ```
1. Register touch events of hit area
    - On pointer down
        ```javascript
        live2dGameObject.on('pointerdown-' + hitAreaName, function(pointer, localX, localY, event){

        }, scope);
        ```
        or
        ```javascript
        live2dGameObject.on('pointerdown', function(pointer, localX, localY, event){
            var hitTestResult = live2dGameObject.getHitTestResult(); // {hitAreaName: isHit}
        }, scope);
        ```
    - On pointer up
        ```javascript
        live2dGameObject.on('pointerup-' + hitAreaName, function(pointer, localX, localY, event){

        }, scope);
        ```
        or
        ```javascript
        live2dGameObject.on('pointerup', function(pointer, localX, localY, event){
            var hitTestResult = live2dGameObject.getHitTestResult(); // {hitAreaName: isHit}
        }, scope);
        ```
    - On pointer move
        ```javascript
        live2dGameObject.on('pointermove-' + hitAreaName, function(pointer, localX, localY, event){

        }, scope);
        ```
        or
        ```javascript
        live2dGameObject.on('pointermove', function(pointer, localX, localY, event){
            var hitTestResult = live2dGameObject.getHitTestResult(); // {hitAreaName: isHit}
        }, scope);
        ```

#### Is hit

```javascript
var isHit = live2dGameObject.hitTest(hitAreaName, x, y);
// var isHit = live2dGameObject.hitTest(hitAreaName, x, y, camera);
```

### Parameter

1. Register parameter
    ```javascript
    live2dGameObject.registerParameter(name);
    ```
    - `name` : Register parameter id = `Param` + capitalize(`name`)
1. Reset and add value
    ```javascript
    live2dGameObject
        .resetParameterValue(name)
        .addParameterValue(name, value);
    ```
    or
    ```javascript
    var parameters = live2dGameObject.getParameters();  // {name: value}
    parameters[name] = value;
    ```