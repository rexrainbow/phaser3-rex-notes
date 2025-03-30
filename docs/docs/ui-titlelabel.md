## Introduction

A container with title, text in two rows, and an icon, background.

- Author: Rex
- Game object

## Live demos

- [Title-label](https://codepen.io/rexrainbow/pen/abGYYpO)
- [Layout modes](https://codepen.io/rexrainbow/pen/dyQpPjr)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-titlelabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.titleLabel(config);
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
- Add label object
    ```javascript
    var label = scene.rexUI.add.titleLabel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { TitleLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new TitleLabel(scene, config);
    scene.add.existing(label);
    ```

### Add label object

```javascript
var label = scene.rexUI.add.titleLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    layoutMode: 0,

    // rtl: false,

    background: backgroundGameObject,

    innerBackground: backgroundGameObject,

    title: titleGameObject,
    // wrapTitle: false,
    // adjustTitleFontSize: false,
    // expandTitleWidth: false,
    // expandTitleHeight: false,
    
    separator: separatorGameObject,

    icon: iconGameObject,
    iconMask: false,

    text: textGameObject,
    // wrapText: false,
    // adjustTextFontSize: false,
    // expandTextWidth: false,
    // expandTextHeight: false,

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
        separator: 0, separatorLeft: 0, separatorRight: 0,
        actionTop: 0, actionBottom: 0,
    },

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
    - `1` : [`icon`, `text`, and `action` will be layout horizontally, then layout with `title`, `separator` vertically](ui-titlelabel.md#mode-1).
- `rtl` : 
    - `false` : Layout children (`icon`, `text`, `action`) from left to right. Default behavior.
    - `true` : Layout children (`icon`, `text`, `action`) from right to left.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `innerBackground` : [Game object of background](ui-basesizer.md#background) inside innerSizer, optional.
    - In [mode 0](ui-titlelabel.md#mode-0), innerSizer contains `title`, `separator`, and `text`.
    - In [mode 1](ui-titlelabel.md#mode-1), innerSizer contains `icon`, `text`, and `action`.
- `title` : Game object of title, optional.
- `wrapTitle` : Enable [WrapExpandText](ui-text-helper.md#wrap-expand-text) feature.
    - `false`, `0` : No WrapExpandText feature. Default behavior.
    - `true`, `1`, `'word'` : Word WrapExpandText.
    - `2`, `'char'` : Character WrapExpandText.
- `adjustTitleFontSize` : Enable [FontSizeExpandText](ui-text-helper.md#fontsize-expand-text) feature.
    - `false` : No FontSizeExpandText feature. Default behavior.
    - `true` : Enable FontSizeExpandText feature. Can't work with `wrapTitle: true`.
        - Text-width and text-height will be expanding.
        - Use BBCodeText (`scene.rexUI.add.BBCodeText`) with `{valign: 'center'}` style.
- `expandTitleWidth` : 
    - `false` : Keep width of title to original size. Default behavior.
    - `true` : Expand width of title object. Will set display width by default.
        - Must set to `true` if using [`scene.rexUI.wrapExpandText` method](ui-overview.md#behaviors-of-text) with any text game object.
        - Can't work with `squareFitIcon: true`.
- `expandTitleHeight` : Set `true` to expand height of title object.
- `separator` : Game object of separator, optional.
- `icon` : Game object of icon, optional.
- `iconMask` : Cut into a round shape.
    - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
    - CANVAS : Apply circle mask.  
- `text` : Game object of text.
- `wrapText` : Enable [WrapExpandText](ui-text-helper.md#wrap-expand-text) feature.
    - `false`, `0` : No WrapExpandText feature. Default behavior.
    - `true`, `1`, `'word'` : Word WrapExpandText.
    - `2`, `'char'` : Character WrapExpandText.
- `adjustTextFontSize` : Enable [FontSizeExpandText](ui-text-helper.md#fontsize-expand-text) feature.
    - `false` : No FontSizeExpandText feature. Default behavior.
    - `true` : Enable FontSizeExpandText feature. Can't work with `wrapText: true`.
        - Text-width and text-height will be expanding.
        - Use BBCodeText (`scene.rexUI.add.BBCodeText`) with `{valign: 'center'}` style.- `expandTextWidth` : 
    - `false` : Keep width of text to original size. Default behavior.
    - `true` : Expand width of text object. Will set display width by default.
        - Must set to `true` if using [`scene.rexUI.wrapExpandText` method](ui-overview.md#behaviors-of-text) with any text game object.
        - Can't work with `squareFitIcon: true`.
- `expandTextHeight` : Set `true` to expand height of text object.
- `action` : Game object of action icon, optional.
- `actionMask` : Cut into a round shape.
    - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
    - CANVAS : Apply circle mask.
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
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyTitleLabel extends RexPlugins.UI.TitleLabel {
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
    var label = new MyTitleLabel(scene, config);
    ```

### Layout modes

#### Mode 0

`title`, `separator`, and `text` will be layout vertically inside innerSizer, then layout with `icon`, `action` horizontally.

<table border="1px solid black">
 <tr>
  <td rowspan="3" align="center" valign="center">Icon</td>
  <td>Title</td>
  <td rowspan="3" align="center" valign="center">Action</td>
 </tr>
 <tr>
  <td>Separator</td>
 </tr>
 <tr>
  <td>Text</td>
 </tr>
</table>

#### Mode 1

`icon`, `text`, and `action` will be layout horizontally inside innerSizer, then layout with `title`, `separator` vertically.

<table border="1px solid black">
 <tr>
  <td colspan="3" align="center" valign="center">Title</td>
 </tr>
 <tr>
  <td colspan="3" align="center" valign="center">Separator</td>
 </tr>
 <tr>
  <td>Icon</td>
  <td>Text</td>
  <td>Action</td>
 </tr>
</table>

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = label.getElement('background');
        ```
    - InnerSizer
        ```javascript
        var innerSizer = label.getElement('innerSizer');
        ```
        - In [mode 0](ui-titlelabel.md#mode-0), innerSizer contains `title`, `separator`, and `text`.
        - In [mode 1](ui-titlelabel.md#mode-1), innerSizer contains `icon`, `text`, and `action`.
    - Background game object inside innerSizer
        ```javascript
        var innerBackground = label.getElement('innerBackground');
        ```
    - Title game object
        ```javascript
        var textObject = label.getElement('title');
        ```
    - Separator game object
        ```javascript
        var textObject = label.getElement('separator');
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
    // var gameObject = label.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = label.getByName(name);
    // var gameObject = label.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Title

- Get title string
    ```javascript
    var s = label.title;
    ```
- Set title string
    ```javascript
    label.setTitle(s);
    ```
    or
    ```javascript
    label.title = s;
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

### Icon texture

- Set texture
    ```javascript
    label.setTexture(key);
    // label.setTexture(key, frame);
    ```
- Set texture via texture object
    ```javascript
    label.setTexture(texture);
    // label.setTexture(texture, frame);
    ```
- Get texture, frame.
    ```javascript
    var texture = label.texture;
    var frame = label.frame;
    ```
- Get texture key, frame name.
    ```javascript
    var textureKey = label.texture.key;
    var frameName = label.frame.name;
    ```

### Reset display content

```javascript
label.resetDisplayContent({
    title: '',
    text: '',

    icon: undefined, 
    iconFrame: undefined,
    iconSize: undefined,

    action: undefined, 
    actionFrame: undefined,
    actionSize: undefined,

})
```

or

```javascript
label.resetDisplayContent(text);
```

- `title` : Set title's text string.
- `text` : Set text string.
- `icon`, `iconFrame`
    - A string : Set texture of icon game object.
    - `undefined`, or `null` : Hide icon game object.
    - `true` : Show icon game object without change its texture.
- `iconSize` : Set display size of icon game object.
- `action`, `actionFrame`
    - A string : Set texture of icon game object.
    - `undefined`, or `null` : Hide action game object.
    - `true` : Show action game object without change its texture.
- `actionSize` : Set display size of action game object.

Run `label.layout()` after this method, to layout children again.

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).