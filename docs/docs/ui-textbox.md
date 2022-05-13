## Introduction

A container with an icon, ([typing](texttyping.md) and [paging](textpage.md)) text, and background.

- Author: Rex
- Game object

## Live demos

- [Text box](https://codepen.io/rexrainbow/pen/MzGoJv)
- [Speech bubble background](https://codepen.io/rexrainbow/pen/ExZLoWL)
- [Bitmap text](https://codepen.io/rexrainbow/pen/oNBaKOo)
- [Page break](https://codepen.io/rexrainbow/pen/JjNZZXv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-textbox)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add text-box object
    ```javascript
    var textBox = scene.rexUI.add.textBox(config);
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
- Add text-box object
    ```javascript
    var textBox = scene.rexUI.add.textBox(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add text-box object
    ```javascript    
    var textBox = new TextBox(scene, config);
    scene.add.existing(textBox);
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

    // page: { 
    //    maxLines: undefined,
    //    pageBreak: '\f\n',
    // },
    // type: { 
    //    wrap: false,
    //    speed: 333,    
    // },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
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
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of textBox.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [bitmap text object](bitmaptext.md)
    - Max lines and wrapped width
        - [Built-in text object](text.md) : `maxLines` and wrap width (`wordWrap.width`).
        - [BBcode text object](bbcodetext.md) : `maxLines` and wrap width (`wrap.width`).
        - [Tag text object](tagtext.md) : `maxLines` and wrap width (`wrap.width`).
        - [Bitmap text object](bitmaptext.md) : Set maxLines at `page.maxLines` in configuration of page behavior, and wrap width at `text.setMaxWidth(width)`.
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
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `page` : Configuration of [page behavior](textpage.md#create-instance)
    - `page.maxLines` : Max lines of a page.
    - `page.pageBreak` : Symbol of page-break. Default value is `'\f\n'`.
- `type` : Configuration of [type behavior](texttyping.md#create-instance)    
    - `type.wrap` : 
        - `false` : Don't insert `\n`, default behavior.
        - `true` : Insert `\n` to wrap content according to style of text, to prevent typing jittering.
    - `type.speed` : Typing speed in ms, default value is `333`.

### Custom class

- Define class
    ```javascript
    class MyTextBox extends RexPlugins.UI.TextBox {
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
    var textBox = new MyTextBox(scene, config);
    ```

### Typing

- Start
    ```javascript
    textBox.start(content, typingSpeed);
    ```
    - `content` : Content string.
    - `speed` : Typing speed in ms.
        - `undefined` : Use previous typing speed.
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
- Change typing speed
    ```javascript
    textBox.setTypeSpeed(speed);
    ```
    - `speed` : Typing speed in ms.

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
    var isFirstPage = textBox.isFirstPage;
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
    textBox.on('type', function() {
        // ...
    }, scope);
    ```
- On Typing the last character of current page.
    ```javascript
    textBox.on('pageend', function() {
        if (textBox.isLastPage) {
            // ...            
        }
    }, scope);
    ```
- On typing all pages complete, equal to `'pageend'` event with `textBox.isLastPage`.
    ```javascript
    textBox.on('complete', function() {
        // ...
    }, scope);
    ```

### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).
