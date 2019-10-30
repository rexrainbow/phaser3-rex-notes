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
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,

    background: backgroundGameObject,
    icon: iconGameObject,
    iconMask: false,
    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,
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

    // name: '',
    // draggable: false
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
- `background` : Game object of background, optional. This background game object will be resized to fit the size of label.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `text` : Game object of text, optional.
- `expandTextWidth` : Set `true` to expand width of text object.
- `expandTextHeight` : Set `true` to expand height of text object.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this label.
- `draggable` : Set `true` to drag to-most sizer.

#### Expand size of text

Expand width/height of text when `expandTextWidth`/`expandTextHeight` is `true`

To resize text object, text object should have `resize` method. For example

```javascript
class MyText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this);
    }
    resize(width, height) {
        this.setFixedSize(width, height);
        return this;
    }
}
```

Or uses [bbcode text object](bbcodetext.md), or [tag text object](tagtext.md)

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
        var textObject = label.getElement('text');
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

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).