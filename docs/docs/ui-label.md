## Introduction

A container with an icon, text, and background.

- Author: Rex
- Game object

## Live demos

- [Align](https://codepen.io/rexrainbow/pen/WNvpoWw)
- [Add to layer](https://codepen.io/rexrainbow/pen/oNZKmKZ)
- [Text wrap in horizontal label](https://codepen.io/rexrainbow/pen/rNdyveo)
- [Text wrap in vertical label](https://codepen.io/rexrainbow/pen/vYRymQq)
- [Square fit icon](https://codepen.io/rexrainbow/pen/xxJWGza)
- [Icon size](https://codepen.io/rexrainbow/pen/jOKPKWa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-label)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.label(config);
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
    var label = scene.rexUI.add.label(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new Label(scene, config);
    scene.add.existing(label);
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
    // rtl: false,

    background: backgroundGameObject,

    icon: iconGameObject,
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,
    
    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,

    action: actionGameObject,
    // actionMask: false,
    // squareFitAction: false,
    // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,

    align: undefined,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0, 
        iconTop: 0, iconBottom: 0, iconLeft: 0, iconRight: 0,

        text: 0,
        actionTop: 0, actionBottom: 0, actionLeft: 0, actionRight: 0,
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
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `squareFitIcon` : 
    - `true` : Resize icon size to square to fit label height/width.
        - Can't work wit `expandTextWidth: true`
    - `false` : Ignore this feature. Default behavior.
- `iconSize` : Set display size of icon game object to `iconSize`x`iconSize`
- `iconWidth` : Set display width of icon game object to `iconWidth`. 
    - If `iconHeight` is `undefined`, set `scaleY` of icon game object to `scaleX` of icon game object, to keep size ratio.
- `iconHeight` : Set display height of icon game object to `iconHeight`. 
    - If `iconWidth` is `undefined`, set `scaleX` of icon game object to `scaleY` of icon game object, to keep size ratio.
- `text` : Game object of text, optional.
- `expandTextWidth` : 
    - `false` : Keep width of text to original size. Default behavior.
    - `true` : Expand width of text object. Will set display width by default.
        - Must set to `true` if using [`scene.rexUI.wrapExpandText` method](ui-overview.md#behaviors-of-text) with any text game object.
        - Can't work with `squareFitIcon: true`.
- `expandTextHeight` : Set `true` to expand height of text object.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `squareFitAction` : 
    - `true` : Resize action icon size to square to fit label height/width.
    - `false` : Ignore this feature. Default behavior.
- `actionSize` : Set display size of action game object to `actionSize`x`actionSize`
- `actionWidth` : Set display width of action game object to `actionWidth`. 
    - If `actionHeight` is `undefined`, set `scaleY` of action game object to `scaleX` of action game object, to keep size ratio.
- `actionHeight` : Set display height of action game object to `actionHeight`. 
    - If `actionWidth` is `undefined`, set `scaleX` of action game object to `scaleY` of action game object, to keep size ratio.
- `align` : Alignment of icon, text, action game objects.
    - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top.
    - `'center'` : Align game objects at center.
    - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.iconTop`, `space.iconBottom`, `space.iconLeft`, `space.iconRight` : Space around icon game object.
    - `space.text` : Space between text game object and action icon game object.
    - `space.actionTop`, `space.actionBottom`, `space.actionLeft`, `space.actionRight` : Space around action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

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

Or uses [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [canvasInput object](canvasinput.md).

### Custom class

- Define class
    ```javascript
    class MyLabel extends RexPlugins.UI.Label {
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
    var label = new MyLabel(scene, config);
    ```

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
- Append text string
    ```javascript
    label.appendText(text);
    // label.text += '\n' + text;
    ```
    or
    ```javascript
    label.appendText(text, false);
    // label.text += text;
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
- Get texture, frame
    ```javascript
    var texture = label.texture;
    var frame = label.frame;
    ```
- Get texture key, frame name
    ```javascript
    var textureKey = label.texture.key;
    var frameName = label.frame.name;
    ```

### Reset display content

```javascript
label.resetDisplayContent({
    text: '',

    icon: undefined, 
    iconFrame: undefined,
    iconSize: undefined,

    action: undefined, 
    actionFrame: undefined,
    actionSize: undefined,

})
```

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