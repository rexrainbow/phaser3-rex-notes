## Introduction

Queue messages for a short while.

- Author: Rex
- Game object

## Live demos

- [Toast queue](https://codepen.io/rexrainbow/pen/ZENYQzm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-toastqueue)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add toast-queue object
    ```javascript
    var toastQueue = scene.rexUI.add.toastQueue(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add toast-queue object
    ```javascript
    var toastQueue = scene.rexUI.add.toastQueue(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ToastQueue } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add toast-queue object
    ```javascript    
    var toastQueue = new ToastQueue(scene, config);
    scene.add.existing(toastQueue);
    ```

### Add toast-queue object

```javascript
var toastQueue = scene.rexUI.add.toastQueue({
    x: 0,
    y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    orientation: 1,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        item: 0,
    },

    createMessageLabelCallback(scene, message, toastQueue) {
        // return gameObject;
    },

    queueDirection: 1, // 'bottom-to-top', or 'top-to-bottom'

    duration: {
        in: 200,
        hold: 2000,
        out: 200,
    },

    // transitIn: undefined,
    // transitOut: undefined,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y`, `aspectRatio` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `aspectRatio` :
        - `undefined`, or `false` : Does not keep aspect ratio. Default behavior.
        - `true` : Use the current width and height as the aspect ratio.
        - A number : Use given number as the aspect ratio.    
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between 2 children game objects.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).
- `createMessageLabelCallback` : Callback for creating message label game object
    ```javascript
    function(scene, message, toastQueue) {
        // 
        return gameObject;
    }
    ```
    - `message` : `message` parameter passing from [`showMessage` method](#show-message).
    - `toastQueue` : This toast-queue game object.
- `queueDirection` : Direction of message queue
    - `1`, or `'bottom-to-top'` : Message queue from bottom to top. Default value.
    - `0`, or `'top-to-bottom'` : Message queue from top to bottom.
- `duration` : Duration of displaying message
    - `duration.in` : Duration of transit-in stage.
    - `duration.hold` : Duration of hold stage.
    - `duration.out` : Duration of transit-out stage.
- `transitIn` : Transit-in action.
    - `undefined` (not gived) : Pop up message label.
    - A callback : Custom transit-in function
        ```javascript
        function(messageLabel, duration, toastQueue) {
            // ...
        }
        ```
    - `false`, `null` : No transitOut.
- `transitOut` : Transit-out action.
    - `undefined` (not gived) : Fade out message label.
    - A callback : Custom transit-out function
        ```javascript
        function(messageLabel, duration, toastQueue) {
            // ...
        }
        ```
    - `false`, `null` : No transitOut.

Message Label will be destroyed when

- Clicking, or
- Timeout

### Custom class

- Define class
    ```javascript
    class MyToastQueue extends RexPlugins.UI.ToastQueue {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var toastQueue = new MyToastQueue(scene, config);
    ```

### Show message

```javascript
toastQueue.showMessage(message);
```

- `message` : A string, or an object. Will pass to `createMessageLabelCallback` callback.

### Clear messages

```javascript
toastQueuetoast.removeAllMessages();
```

Invoke transition-out of all message labels.

### Display time

- Transit-in time (`duration.in`)
    - Get
        ```javascript
        var time = toastQueue.transitInTime;
        ```
    - Set
        ```javascript
        toastQueue.setTransitInTime(time);
        ```
- Display time (`duration.hold`)
    - Get
        ```javascript
        var time = toastQueue.displayTime;
        ```
    - Set
        ```javascript
        toastQueue.setDisplayTime(time);
        ```
- Transit-out time (`duration.out`)
    - Get
        ```javascript
        var time = toastQueue.transitOutTime;
        ```
    - Set
        ```javascript
        toastQueue.setTransitOutTime(time);
        ```

### Transit action

- Set transit-in action
    ```javascript
    toastQueue.setTransitInCallback(callback);
    ```
    - `callback` : Transit-in action
        ```javascript
        function(messageLabel, duration, toastQueue) {
            // ...
        }
        ```
- Set transit-out action
    ```javascript
    toastQueue.setTransitOutCallback(callback);
    ```
    - `callback` : Transit-out action
        ```javascript
        function(messageLabel, duration, toastQueue) {
            // ...
        }
        ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).
