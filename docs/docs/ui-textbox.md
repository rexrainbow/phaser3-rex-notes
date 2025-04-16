## Introduction

A container with an icon, ([typing](texttyping.md) and [paging](textpage.md)) text, and background.

- Author: Rex
- Game object

## Live demos

- [Text box](https://codepen.io/rexrainbow/pen/MzGoJv)
- [Inner sizer](https://codepen.io/rexrainbow/pen/GRYLrje)
- [Speech bubble background](https://codepen.io/rexrainbow/pen/ExZLoWL)
- [Bitmap text](https://codepen.io/rexrainbow/pen/oNBaKOo)
- [Page break](https://codepen.io/rexrainbow/pen/JjNZZXv)
- [Show last page](https://codepen.io/rexrainbow/pen/GRwMrrP)

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
    // origin: 0.5
    // originX:
    // originY:

    layoutMode: 0,

    rtl: false,

    typingMode: 0,

    background: backgroundGameObject,

    innerBackground: backgroundGameObject,

    title: titleGameObject,
    
    separator: separatorGameObject,

    icon: iconGameObject,
    iconMask: false,

    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,

    action: actionGameObject,
    actionMask: false,

    align: {
        title: 'left',
        text: 'left',
        icon: 'center',
        action: 'center'
    },

    space: {
        left: 0, right: 0, top: 0, bottom: 0,
        innerLeft: 0, innerRight: 0, innerTop: 0, innerBottom: 0,

        title: 0, titleLeft: 0, titleRight: 0,
        icon: 0, iconTop: 0, iconBottom: 0,
        text: 0, textLeft: 0, textRight: 0,
        actionTop: 0, actionBottom: 0,
    },

    // page: { 
    //    maxLines: undefined,
    //    pageBreak: '\f\n',
    // },
    // typing: { 
    //    wrap: false,
    //    speed: 333,    
    // },

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
- `layoutMode` : 
    - `0` : [`title`, `separator`, and `text` will be layout vertically, then layout with `icon`, `action` horizontally](ui-titlelabel.md#mode-0).
    - `1` : [`icon`, `text`, and `action` will be layout horizontally, then layout with `title`, `separator` vertically](ui-titlelabel.md#mode-1). Default behavior.
- `rtl` : 
    - `false` : Layout children (`icon`, `text`, `action`) from left to right. Default behavior.
    - `true` : Layout children (`icon`, `text`, `action`) from right to left.
- `typingMode` :
    - `0`, `'page'` : Typing content page by page. Default behavior.
    - `1`, `'line'` : Typing content line by line until finished.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `innerBackground` : [Game object of background](ui-basesizer.md#background) inside innerSizer, optional.
    - In [mode 0](ui-titlelabel.md#mode-0), innerSizer contains `title`, `separator`, and `text`.
    - In [mode 1](ui-titlelabel.md#mode-1), innerSizer contains `icon`, `text`, and `action`.
- `title` : Game object of title, optional.
- `separator` : Game object of separator, optional.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
- `text` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [bitmap text object](bitmaptext.md), required.
    - Max lines and wrapped width
        - [Built-in text object](text.md) : `maxLines` and wrap width (`wordWrap.width`).
        - [BBcode text object](bbcodetext.md) : `maxLines` and wrap width (`wrap.width`).
        - [Tag text object](tagtext.md) : `maxLines` and wrap width (`wrap.width`).
        - [Bitmap text object](bitmaptext.md) : Set maxLines at `page.maxLines` in configuration of page behavior, and wrap width at `text.setMaxWidth(width)`.
    - Fixed width and fixed height
        - [Built-in text object](text.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
        - [BBcode text object](bbcodetext.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
        - [Tag text object](tagtext.md) : `fixedWidth` and `fixedHeight`, set to `0` to disable this feature.
- `expandTextWidth` : 
    - `true` : Expand `fixedWidth` and `wrapWidth` when layout, to change width of text game object to fit this textbox.
- `expandTextHeight` : 
    - `true` : Expand `fixedHeight` when layout, to change height of text game object to fit this textbox.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
- `align` : Alignment of title, text, icon, action game objects.
    - `align.title`, `align.text` : `'left'`, `'center'`, or `'right'`. Default vale is `'left'`.
    - `align.icon`, `align.action` : `'top'`, `'center'`, or `'bottom'`. Default vale is `'center'`.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.innerLeft`, `space.innerRight`, `space.innerTop`, `space.innerBottom` : Space parameter of inner sizer.
    - `space.title` : Space between title game object and separator game object.
    - `space.titleLeft`, `space.titleRight` : Space at left or right side of title game object.
    - `space.icon` : Space between icon game object and text game object.
    - `space.iconTop`, `space.iconBottom` : Space around icon game object.
    - `space.text` : Space between text game object and action icon game object.
    - `space.textLeft`, `space.textRight` : Space at left or right side of text game object.
    - `space.actionTop`, `space.actionBottom` : Space around action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).
- `page` : Configuration of [page behavior](textpage.md#create-instance)
    - `page.maxLines` : Max lines of a page. If not given in `text` game object.
    - `page.pageBreak` : Symbol of page-break. Default value is `'\f\n'`.
- `typing` : Configuration of [type behavior](texttyping.md#create-instance)    
    - `typing.wrap` : 
        - `false` : Don't insert `\n`, default behavior.
        - `true` : Insert `\n` to wrap content according to style of text, to prevent typing jittering.
    - `typing.speed` : Typing speed in ms, default value is `333`.

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

### Layout children

Arrange position of all elements.

```javascript
textBox.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Typing

- Start typing
    ```javascript
    textBox.start(content, typingSpeed);
    ```
    - `content` : Content string.
    - `speed` : Typing speed in ms.
        - `undefined` : Use previous typing speed.
- Append and continue typing
    ```javascript
    textBox.more(content, typingSpeed);
    ```
    - `content` : Content string.
    - `speed` : Typing speed in ms.
        - `undefined` : Use previous typing speed.
- Stop typing
    ```javascript
    textBox.stop();
    ```
    - Will fire `'stop'` event.
- Stop typing and show all text
    ```javascript
    textBox.stop(true);
    ```
    - Will fire `'stop'`, `'type'`, `'pageend'` event.
- Stop typing and show all text at last page
    ```javascript
    textBox.showLastPage();
    ```
    - Will fire `'type'`, `'pageend'`, `'complete'` events.
- Pause typing
    ```javascript
    textBox.pause();
    ```
    - Will fire `'pause'` event.
- Resume typing
    ```javascript
    textBox.resume();
    ```
    - Will fire `'resume'` event.
- Is typing
    ```javascript
    var isTyping = textBox.isTyping;
    ```

### Typing speed

- Change typing speed
    ```javascript
    textBox.setTypingSpeed(speed);
    ```
    - `speed` : Typing speed in ms.
- Get typing speed
    ```javascript
    var speed = textBox.typingSpeed;
    ```

### Page

- Type next page
    ```javascript
    textBox.typeNextPage();
    ```
- Is page end, after typing complete
    ```javascript
    var isPageEnd = textBox.isPageEnd;
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

### Icon texture

- Set texture
    ```javascript
    textBox.setTexture(key);
    // label.setTexture(key, frame);
    ```
- Get texture key, frame name
    ```javascript
    var textureKey = textBox.texture.key;
    var frameName = textBox.frame.name;
    ```

### Get element

- Get element
    - Background game object
        ```javascript
        var background = textBox.getElement('background');
        ```
    - InnerSizer
        ```javascript
        var innerSizer = textBox.getElement('innerSizer');
        ```
        - In [mode 0](ui-titlelabel.md#mode-0), innerSizer contains `title`, `separator`, and `text`.
        - In [mode 1](ui-titlelabel.md#mode-1), innerSizer contains `icon`, `text`, and `action`.
    - Background game object inside innerSizer
        ```javascript
        var innerBackground = textBox.getElement('innerBackground');
        ```
    - Title game object
        ```javascript
        var textObject = textBox.getElement('title');
        ```
    - Separator game object
        ```javascript
        var textObject = textBox.getElement('separator');
        ```
    - Icon game object
        ```javascript
        var icon = textBox.getElement('icon');
        ```
    - Text game object
        ```javascript
        var textObject = textBox.getElement('text');
        ```
    - Action icon game object
        ```javascript
        var action = textBox.getElement('action');
        ```
- Get by name
    ```javascript
    var gameObject = textBox.getElement('#' + name);
    // var gameObject = textBox.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = textBox.getByName(name);
    // var gameObject = textBox.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Events

- On typing start.
    ```javascript
    textBox.on('start', function() {
        // ...
    }, scope);
    ```
- On changing content of text game object, will also re-layout textbox :
    ```javascript
    textBox.on('type', function() {
        // ...
    }, scope);
    ```
- On typing a character :
    ```javascript
    textBox.on('typechar', function(char) {
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
- On typing paused by `textBox.pause()`.
    ```javascript
    textBox.on('pause', function() {
        // ...
    }, scope);
    ```
- On typing resume by `textBox.resume()`.
    ```javascript
    textBox.on('resume', function() {
        // ...
    }, scope);
    ```
- On typing stop by `textBox.stop()`.
    ```javascript
    textBox.on('stop', function() {
        // ...
    }, scope);
    ```

### Other properties

See [title label](ui-titlelabel.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).
