## Introduction

Pop-up dialog for loading-progress, then scale-down this dialog.

- Author: Rex
- Behavior of game object

## Live demos

- [Loading progress](https://codepen.io/rexrainbow/pen/NWYNZgO)
- [Custom transit](https://codepen.io/rexrainbow/pen/wvmGLJX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/loading-progress)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexloadingprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexloadingprogressplugin.min.js', true);
    ```
- Add loading-progress behavior
    ```javascript
    var loadingProgress = scene.plugins.get('rexloadingprogressplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add loading-progress behavior
    ```javascript
    var loadingProgress = scene.plugins.get('rexLoadingProgress').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LoadingProgress from 'phaser3-rex-plugins/plugins/loadingprogress.js';
    ```
- Add loadingprogress behavior
    ```javascript
    var loadingProgress = new LoadingProgressBehavoir(gameObject, config);
    ```

### Create instance

```javascript
var loadingProgress = scene.plugins.get('rexLoadingProgress').add(gameObject, {
    // duration: {
    //     in: 200,
    //     out: 200
    // }

    // progress: function(gameObject, progress) {},
    // transitIn: function(gameObject, duration) {},
    // transitOut: function(gameObject, duration) {},
});
```

- `gameObject` : Game object for presenting loading-progress.
- `duration` : Duration of transition-in, trantion-out.
    - `duration.in` : Duration of transition-in (open dialog).
    - `duration.out` : Duration of transition-out (close dialog). Game object will be destroyed after transiting out.
- `progress` : Callback of loading-progress
    ```javascript
    function(gameObject, progress) {

    }
    ```
    - `progress` : Number between 0 to 1.
- `transitIn` : Tween behavior of opening dialog.
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `transitOut` : Tween behavior of closing dialog.
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```

### Events

- On progress
    ```javascript
    loadingProgress.on('progress', function(progress) {
    })
    ```
- On opened dialog
    ```javascript
    loadingProgress.on('open', function(gameObject, loadingProgress) {
    })
    ```
- On closed dialog
    ```javascript
    loadingProgress.on('close', function() {
    })
    ```
