## Introduction

Show text message for a short while.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/toast/Toast.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-toast)

### Install scene plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

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

### Add toast object

```javascript
var toast = scene.rexUI.add.toast({
    x: 0,
    y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

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

    name: ''
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of toast.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : Game object of text.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this toast.
- `duration` : Duration of displaying message
    - `duration.in` : Duration of transit-in stage.
    - `duration.hold` : Duration of hold stage.
    - `duration.out` : Duration of transit-out stage.
- `transitIn` : Callback of transit-in.
    - `0`, or `popUp` : Pop-up.
    - `1`, or `fadeIn` : Fade-in.
    - A callback : Custom transit-in function
        ```javascript
        function(gameObject, duration) {
            // ...
        }
        ```
- `transitOut` : Callback of transit-out.
    - `0`, or `scaleDown` : Scale-down.
    - `1`, or `fadeOut` : Fade-out.
    - A callback : Custom transit-out function
        ```javascript
        function(gameObject, duration) {
            // ...
        }
        ```

Toast object will be invisible at beginning.

### Custom class

- Define class
    ```javascript
    class MyToast extends RexPlugins.UI.Toast {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var toast = new MyToast(scene, config);
    ```

### Layout children

Arrange position of all children. 
*This will be called when showing new message, user does not need call it again generally.*

```javascript
toast.layout();
```

### Show message

```javascript
toast.show(message);
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

### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).
