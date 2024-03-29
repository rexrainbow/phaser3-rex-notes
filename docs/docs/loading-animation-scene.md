## Introduction

Start loading animation scene, stop this scene when loading complete.

- Author: Rex
- Methods

## Live demos

[Loading animation scene](https://codepen.io/rexrainbow/pen/oNmxXpg)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/loading-animation-scene)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexloadinganimationsceneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexloadinganimationsceneplugin.min.js', true);
    ```
- In mainScene, start loading animation scene, or in animation scene, monitor loading status of mainScene.
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
- In mainScene, start loading animation scene, or in animation scene, monitor loading status of mainScene.
    ```javascript
    scene.plugins.get('rexLoadingAnimationScene').startScene(config);
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
- In mainScene, start loading animation scene, or in animation scene, monitor loading status of mainScene.
    ```javascript
    StartLoadingAnimationScene(config);
    ```

### Start loading animation scene

In mainScene, start loading animation scene, or in animation scene, monitor loading status of mainScene.


```javascript
scene.plugins.get('rexLoadingAnimationScene').startScene({
    mainScene: 
    animationScene:

    onLoadingComplete: undefined
    onLoadingProgress: undefined
});
```

- `mainScene` : Scene instaance of main scene.
- `animationScene` : Scene instance or scene-key of animation scene.
    - This animation scene will be stopped wheen main scene's loading complete totally.
- `onLoadingComplete` : Custom task invoked when loading complete.
    ```javascript
    function(finishLoading, animationScene) {
        // finishLoading();
    }
    ```
    - Invoke `finishLoading()` method (later) to finish loading progress totally.
- `onLoadingProgress` : Callback when loading progress is changing.
    ```javascript
    function(progress, animationScene) {

    }
    ```