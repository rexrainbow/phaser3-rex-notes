## Introduction

A container with a title, content, buttons and background.

- Author: Rex
- A kind of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/dialog/Dialog.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-dialog)

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

### Add dialog object

```javascript
var dialog = scene.rexUI.add.dialog({
    // Position
    x: 0,
    y: 0,

    // Elements
    background: backgroundGameObject,
    title: titleGameObject,
    content: contentGameObject,
    buttonsOrientation: 0,
    buttons: [
        button0GameObject,
        button1GameObject,
        // ...
    ],

    // Space
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        title: 0,
        content: 0,
        button: 0,
    },

    width: 0,
    height: 0,
    name: '',
});
```

- `x`, `y` : Position of this dialog object, it is valid when this dialog is the top object.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of dialog.
- `title` : Game object of title, optional.
- `content` : Game object of content, optional.
- `buttonsOrientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange button game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange button game objects from top ot buttom.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.title` : Space between title game object and below game object (content or buttons).
    - `space.content` : Space between content game object and below game object (buttons).
    - `space.button` : Space between 2 button game objects.
- `name` : Set name of this dialog.
- `x`, `y` : Position of this dialog object, it is valid when this dialog is the top object.
- `width`, `height` : Minimum width, minimum height.

### Layout children

Arrange position of all elements.

```javascript
dialog.layout();
```

### Events

- Click button
    ```javascript
    dialog.on('button.click', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `index` : Index of triggered button game object
- Pointer-over button
    ```javascript
    dialog.on('button.over', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `index` : Index of triggered button game object
- Pointer-out button
    ```javascript
    dialog.on('button.out', function(button, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `index` : Index of triggered button game object

### Get element

- Get element
    - Background game object
        ```javascript
        var icon = dialog.getElement('background');
        ```
    - Title game object
        ```javascript
        var title = dialog.getElement('title');
        ```
    - Content game object
        ```javascript
        var content = dialog.getElement('content');
        ```
    - Button game object
        ```javascript
        var button = dialog.getElement('button[' + index + ']');
        ```
- Get by name
    ```javascript
    var gameObject = dialog.getElement('#' + name);
    ```

### Draw bounds

Draw all bounds of elements.

```javascript
dialog.drawBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`
