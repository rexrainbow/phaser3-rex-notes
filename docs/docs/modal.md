## Introduction

Pop-up modal dialog, then scale-down this dialog.

- Author: Rex
- Behavior of game object

## Live demos

- [Manual](https://codepen.io/rexrainbow/pen/KKvmzod)
- [Timeout](https://codepen.io/rexrainbow/pen/xxLdEbv)
- [Touch outside](https://codepen.io/rexrainbow/pen/XWYzGax)
- [Custom transit](https://codepen.io/rexrainbow/pen/yLvwxJX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/modal)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);
    ```
- Add modal behavior
    ```javascript
    var modal = scene.plugins.get('rexmodalplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add modal behavior
    ```javascript
    var modal = scene.plugins.get('rexModal').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ModalBehavoir } from 'phaser3-rex-plugins/plugins/modal.js';
    ```
- Add modal behavior
    ```javascript
    var modal = new ModalBehavoir(gameObject, config);
    ```

### Create instance

```javascript
var modal = scene.plugins.get('rexModal').add(gameObject, {
    // cover: {
    //     color: 0x0,
    //     alpha: 0.8,
    //     transitIn: function(gameObject, duration) { },
    //     transitOut: function(gameObject, duration) { },
    // },
    // cover: false, 

    // When to close modal dialog?
    // touchOutsideClose: false,
    // anyTouchClose: false,
    // timeOutClose: false,
    // manualClose: false,

    // duration: {
    //     in: 200,
    //     hold: 2000,
    //     out: 200
    // }

    // transitIn: 0,
    // transitOut: 0,

    // destroy: true
});
```

- `cover` : Configuration of [Cover](shape-cover.md#create-cover-object) -- A [rectangle shape covered full window](shape-fullwindowrectangle.md), and [block all touch events](toucheventstop.md).
    - `false` : Don't create cover game object.
    - `cover.transitIn` : Custom callback. Default behavior is fade-in.
        ```javascript
        function(gameObject, duration) {

        }
        ```
    - `cover.transitOut` : Custom callback. Default behavior is fade-out.
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `touchOutsideClose` : Set to `true` to close modal dialog when clicking out side of gameObject. 
    - Default value is `false`.  Will be set to `false` if `anyTouchClose` is set to `true`.
- `anyTouchClose` : Set to `true` to close modal dialog when any clicking. 
    - Default value is `false`.
- `timeOutClose` : Set to `true` to close modal dialog when holding time out (`duration.hold`).
    - If `duration.hold` is given, default value is `true`. Otherwise default value is `false`.
- `manualClose` : Set to `true` to close modal dialog via `modal.requestClose()` method.
    - Default value is `false`. When this parameter is `true`, other closing methods will be disabled.
    - If `touchOutsideClose`,  `anyTouchClose`, and `timeOutClose` are `false`, it is equal to `manualClose`.
- `duration` : Duration of transition-in, hold, trantion-out.
    - `duration.in` : Duration of transition-in (open dialog).
        - `0` : No transition, open dialog immediately.
    - `duration.out` : Duration of transition-out (close dialog).
        - `0` : No transition, close dialog immediately.
    - `duration.hold` : Duration of hold.
        - `-1` : Disable `timeOutClose`.
- `transitIn` : Transition behavior of opening dialog.
    - `0`, `'popUp'` : Pop up dialog from `0` to current scale.
    - `1`, `'fadeIn'` : Fade in dialog
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `transitOut` : Tween behavior of closing dialog.
    - `0`, `'scaleDown'` : Scale down dialog
    - `1`, `'fadeOut'` : Fade out dialog
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `destroy`
    - `true` : Destroy dialog game object and this behavior when closing completed. Default behavior.
    - `fasle` : Keep dialog game object and this behavior when closing completed. Could [reuse it](modal.md#open) later.


### Open

- Will open modal dialog game object (run transition-in callback) when creating this behavior
- Invoke `modal.requestOpen()` to open modal dialog game object again, after closing modal dialog.
    - Set `destroy` to `false` to reuse dialog game object and this behavior.

### Close

```javascript
modal.requestClose();
// modal.requestClose(closeEventData);
```

-  `closeEventData` : Emit `'close'` event when closed dialog complete, pass `closeEventData` to callback of this event.
    ```javascript
    modal.on('close', function(closeEventData) {
    })
    ```


### Events

- On opened dialog
    ```javascript
    modal.on('open', function(gameObject, modal) {
    })
    ```
- On closed dialog
    ```javascript
    modal.on('close', function(closeEventData) {
    })
    ```
