## Introduction

Start loading animation scene, stop this scene when loading complete.

- Author: Rex
- Methods

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/loading-animation-scene)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexloadinganimationsceneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexloadinganimationsceneplugin.min.js', true);
    ```
- Start loading animation scene
    ```javascript
    scene.plugins.get('rexloadinganimationsceneplugin').startScene(scene, animationSceneKey);
    ```
- This plugin will also install [AwaitLoader](awaitloader.md).

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LoadingAnimationScenePlugin from 'phaser3-rex-plugins/plugins/loadinganimationscene-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLoadingAnimationScene',
                plugin: LoadingAnimationScenePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Start loading animation scene
    ```javascript
    scene.plugins.get('rexLoadingAnimationScene').startScene(scene, animationSceneKey);
    ```
- This plugin will also install [AwaitLoader](awaitloader.md).

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import StartLoadingAnimationScene from 'phaser3-rex-plugins/plugins/loadinganimationscene.js';
    ```
- Start loading animation scene
    ```javascript
    StartLoadingAnimationScene(scene, animationSceneKey);
    ```

### Start loading animation scene

```javascript
scene.plugins.get('rexLoadingAnimationScene').startScene(scene, animationSceneKey);
// scene.plugins.get('rexLoadingAnimationScene').startScene(scene, animationSceneKey, animationSceneData);
```

or

```javascript
scene.plugins.get('rexLoadingAnimationScene').startScene(scene, animationSceneKey, onLoadingComplete);
// scene.plugins.get('rexLoadingAnimationScene').startScene(scene, animationSceneKey, animationSceneData, onLoadingComplete);
```
- `onLoadingComplete` : Custom task 
    ```javascript
    function(finishLoading) {
        // finishLoading();
    }
    ```
    - Invoke `finishLoading()` method (later) to finish current loading progress.