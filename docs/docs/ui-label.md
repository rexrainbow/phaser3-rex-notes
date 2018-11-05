## Introduction

A container with a icon, text, and background.

- Author: Rex
- A kind of game object

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
    icon: iconGameObject,
    iconMask: false,
    text: textGameObject,
    background: backgroundGameObject,
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        icon: 0,
    },

    x: 0,
    y: 0,
    width: 0,
    height: 0,
    name: '',
});
```

- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : Game object of text, optional.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of label.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.icon` : Space between icon game object and text game object.
- `name` : Set name of this label.
- `x`, `y` : Position of this label object, it is valid when this label is the top object.
- `width`, `height` : Minimum width, minimum height.

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

### Get element

- Get element
    - Background game object
        ```javascript
        var icon = label.getElement('background');
        ```
    - Icon game object
        ```javascript
        var icon = label.getElement('icon');
        ```
    - Text game object
        ```javascript
        var icon = label.getElement('text');
        ```
- Get by name
    ```javascript
    var gameObject = label.getElement('#' + name);
    ```

### Get text

- Get text string
    ```javascript
    var s = label.text;
    ```
- Get text game object
    ```javascript
    var icon = label.getElement('text');
    ```

### Draw bounds

Draw all bounds of elements.

```javascript
label.drawBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`
