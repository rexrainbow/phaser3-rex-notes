## Introduction

Show text message for a short while.

- Author: Rex
- Game object

## Live demos

- [Toast](https://codepen.io/rexrainbow/pen/KjEgVO)
- Depth
    - [Set depth](https://codepen.io/rexrainbow/pen/wvOxBbN)
    - [Bring to top](https://codepen.io/rexrainbow/pen/rNRrVxW)
    - [Add to layer](https://codepen.io/rexrainbow/pen/BabPRZg)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-toast)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add toast object
    ```javascript
    var toast = scene.rexUI.add.toast(config);
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
- Add toast object
    ```javascript
    var toast = scene.rexUI.add.toast(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Toast } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add toast object
    ```javascript    
    var toast = new Toast(scene, config);
    scene.add.existing(toast);
    ```

### Add toast object

```javascript
var toast = scene.rexUI.add.toast({
    x: 0,
    y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    orientation: 0,

    background: backgroundGameObject,
    icon: iconGameObject,
    iconMask: false,
    text: textGameObject,
    action: actionGameObject,
    actionMask: false,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0,
        text: 0,
    },

    duration: {
        in: 200,
        hold: 1200,
        out: 200,
    },

    // transitIn: 0,
    // transitOut: 0,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of toast.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : Game object of text.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).
- `duration` : Duration of displaying message
    - `duration.in` : Duration of transit-in stage.
    - `duration.hold` : Duration of hold stage.
    - `duration.out` : Duration of transit-out stage.
- `transitIn` : Transit-in action.
    - `0`, or `'popUp'` : Pop-up.
    - `1`, or `'fadeIn'` : Fade-in.
    - A callback : Custom transit-in function
        ```javascript
        function(toast, duration) {
            // ...
        }
        ```
    - `false`, `null` : No transitIn.
- `transitOut` : Transit-out action.
    - `0`, or `'scaleDown'` : Scale-down.
    - `1`, or `'fadeOut'` : Fade-out.
    - A callback : Custom transit-out function
        ```javascript
        function(toast, duration) {
            // ...
        }
        ```
    - `false`, `null` : No transitOut.

Toast object will be invisible at beginning.

### Custom class

- Define class
    ```javascript
    class MyToast extends RexPlugins.UI.Toast {
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
    var toast = new MyToast(scene, config);
    ```

### Show message

```javascript
toast.showMessage(message);
```

- `message` : A string, or a callback.
    - A string. Apply this content to `text` game object.
    - Callback. Invoke this callback to configurate toast object.
        ```javascript
        function(toast) {
            // var icon = toast.getElement('icon');
            // var text = toast.getElement('text');
            // var action = toast.getElement('action');
        }
        ```

Toast displays message follows these steps : *transit-in*, *hold*, *transit-out*.
New message will be pending until toast is back to idle.

### Clear messages

```javascript
toast.removeAllMessages();
```

### Is showing message

```javascript
var isShowing = toast.isShowingMessage;
```

### Display time

- Transit-in time (`duration.in`)
    - Get
        ```javascript
        var time = toast.transitInTime;
        ```
    - Set
        ```javascript
        toast.setTransitInTime(time);
        ```
- Display time (`duration.hold`)
    - Get
        ```javascript
        var time = toast.displayTime;
        ```
    - Set
        ```javascript
        toast.setDisplayTime(time);
        ```
- Transit-out time (`duration.out`)
    - Get
        ```javascript
        var time = toast.transitOutTime;
        ```
    - Set
        ```javascript
        toast.setTransitOutTime(time);
        ```

### Transit action

- Set transit-in action
    ```javascript
    toast.setTransitInCallback(callback);
    ```
    - `callback` : Transit-in action
        - `0`, or `'popUp'` : Pop-up.
        - `1`, or `'fadeIn'` : Fade-in.
        - A callback : Custom transit-in function
            ```javascript
            function(toast, duration) {
                // ...
            }
            ```
- Set transit-out action
    ```javascript
    toast.setTransitOutCallback(callback);
    ```
    - `callback` : Transit-out action
        - `0`, or `'scaleDown'` : Scale-down.
        - `1`, or `'fadeOut'` : Fade-out.
        - A callback : Custom transit-out function
            ```javascript
            function(toast, duration) {
                // ...
            }
            ```

### Event

- Transit-in
    ```javascript
    toast.on('transitin', function(toast, transitInTime) {
        // ...
    })
    ```
- Transit-out
    ```javascript
    toast.on('transitout', function(toast, transitOutTime) {
        // ...
    })
    ```

### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).
