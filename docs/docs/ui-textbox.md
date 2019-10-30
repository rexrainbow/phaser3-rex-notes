## Introduction

A container with an icon, ([typing](texttyping.md) and [paging](textpage.md)) text, and background.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/textbox/Textbox.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-textbox)

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

### Add textbox object

```javascript
var textBox = scene.rexUI.add.textBox({
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
- `background` : Game object of background, optional. This background game object will be resized to fit the size of textBox.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : Game object of text.
    - Max lines and wrapped width
        - [Built-in text object](text.md) : `maxLines` and wrap width (`wordWrap.width`).
        - [BBcode text object](bbcodetext.md) : `maxLines` and wrap width (`wrap.width`).
        - [Tag text object](tagtext.md) : `maxLines` and wrap width (`wrap.width`).
    - Fixed width and fixed height
        - [Built-in text object](text.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
        - [BBcode text object](bbcodetext.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
        - [Tag text object](tagtext.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this textBox.
- `draggable` : Set `true` to drag to-most sizer.

### Custom class

- Define class
    ```javascript
    class MyTextBox extends RexPlugins.UI.TextBox {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var textBox = new MyTextBox(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
textBox.layout();
```

This method will be invoked when size of text has been changed automatically.

### Typing

- Start
    ```javascript
    textBox.start(content, typingSpeed);
    ```
    - `content` : Content string.
    - `speed` : Typing speed in ms.
- Stop
    ```javascript
    textBox.stop();
    ```
- Stop and show all text
    ```javascript
    textBox.stop(true);
    ```
- Pause
    ```javascript
    textBox.pause();
    ```
- Resume
    ```javascript
    textBox.resume();
    ```
- Is typing
    ```javascript
    var isTyping = textBox.isTyping;
    ```

### Page

- Type next page
    ```javascript
    textBox.typeNextPage();
    ```
- Is last page
    ```javascript
    var isLastPage = textBox.isLastPage;
    ```
- Is first page
    ```javascript
    var isLastPage = textBox.isFirstPage;
    ```
- Current page index
    ```javascript
    var pageIndex = textBox.pageIndex;
    ```
- Number of pages
    ```javascript
    var pageIndex = textBox.pageCount;
    ```

### Events

- On typing a character
    ```javascript
    dialog.on('type', function() {
        // ...
    }, scope);
    ```
- On Typing the last character of current page.
    ```javascript
    dialog.on('pageend', function() {
        // ...
    }, scope);
    ```

### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).
