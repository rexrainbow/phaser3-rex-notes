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

    layoutMode: 0,

    rtl: false,

    background: backgroundGameObject,

    innerBackground: backgroundGameObject,

    title: titleGameObject,
    
    separator: separatorGameObject,

    icon: iconGameObject,
    iconMask: false,

    text: textGameObject,

    action: actionGameObject,
    actionMask: false,

    align: {
        title: 'left',
        text: 'left',
    },

    space: {
        left: 0, right: 0, top: 0, bottom: 0,
        innerLeft: 0, innerRight: 0, innerTop: 0, innerBottom: 0,

        title: 0, titleLeft: 0, titleRight: 0,
        icon: 0, iconTop: 0, iconBottom: 0,
        text: 0, textLeft: 0, textRight: 0,
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
- `separator` : Game object of separator, optional.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.   
- `text` : Game object of text.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `align` : Alignment of title, text game objects.
    - `align.title` : `'left'`, or `'right'`. Default vale is `'left'`.
    - `align.text` : `'left'`, or `'right'`. Default vale is `'left'`.
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

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).