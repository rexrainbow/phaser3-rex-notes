## Introduction

A container with an icon, text, and background.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/label/Label.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-label)

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

### Add label object

```javascript
var label = scene.rexUI.add.label({
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

    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
    name: '',
});
```

- `x`, `y` : Position of this dialog object, it is valid when this dialog is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
- `width`, `height` : Minimum width, minimum height.
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of label.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : Game object of text, optional.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this label.

### Custom class

- Define class
    ```javascript
    class MyLabel extends RexPlugins.UI.Label {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var label = new MyLabel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

### Get element

- Get element
    - Background game object
        ```javascript
        var background = label.getElement('background');
        ```
    - Icon game object
        ```javascript
        var icon = label.getElement('icon');
        ```
    - Text game object
        ```javascript
        var icon = label.getElement('text');
        ```
    - Action icon game object
        ```javascript
        var action = label.getElement('action');
        ```
- Get by name
    ```javascript
    var gameObject = label.getElement('#' + name);
    ```

### Text

- Get text string
    ```javascript
    var s = label.text;
    ```
- Set text string
    ```javascript
    label.setText(s);
    ```
    or
    ```javascript
    label.text = s;
    ```

### Other properties

See [sizer object](ui-sizer.md)
