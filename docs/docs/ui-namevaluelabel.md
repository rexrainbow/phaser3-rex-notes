## Introduction

A container with name text, value text in a row, with a [horizontal line progress bar](canvas-lineprogress.md), and an icon, background.

- Author: Rex
- Game object

## Live demos

- [Name-value label](https://codepen.io/rexrainbow/pen/NWMMmeK)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-namevaluelabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.nameValueLabel(config);
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
    var label = scene.rexUI.add.nameValueLabel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { NameValueLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new NameValueLabel(scene, config);
    scene.add.existing(label);
    ```

### Add label object

```javascript
var label = scene.rexUI.add.nameValueLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,
    // rtl: false,

    background: backgroundGameObject,
    icon: iconGameObject,
    iconMask: false,

    nameText: nameTextGameObject,
    valueText: valueTextGameObject,
    // valueTextFormatCallback: function(value, min, max) {
    //     return `${value}/${max}`;
    // },
    bar: {
        trackColor: undefined,
        trackThickness: 2,
        trackStrokeColor: undefined,
        barColor: undefined,
        barColor2: undefined,

        skewX: 0,

        rtl: false,

        easeValue: {
            duration: 0,
            ease: 'linear'
        },
    }, 
    // bar: undefined,

    action: actionGameObject,
    actionMask: false,

    align: {        
        text: 'bottom',  // 'top', 'center', 'bottom'
    },

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0, iconTop: 0, iconBottom: 0,
        name: 0, value: 0,
        bar:0, barBottom: 0, barLeft: 0, barRight: 0,
        text: 0,
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
- `nameText` : Game object of nameText. 
    - OriginX of nameText will be set to `0`.
    - Empty text will be set to a space character `' '`. To preserve height of this text game object.
- `valueText` : Game object of valueText.
    - OriginX of nameText will be set to `1`.
    - Empty text will be set to a space character `' '`. To preserve height of this text game object.
- `valueTextFormatCallback` : An optional callback to return a string set to `valueText` game object when invokeing [`label.setValue(value, min, max)` method](ui-namevaluelabel.md#set-value).
    ```javascript
    function(value, min, max) {
        return `${value}/${max}`;
    }
    ```
- `bar` : Game object of bar, or config of [horizontal line progress bar](shape-lineprogress.md), or `undefined`.
    - `undefined` : No bar game object.
    - `bar.trackColor` : Fill color of bar's track, in number or css string value.
    - `bar.trackStrokeColor` : Stroke color of bar's track, in number or css string value.
    - `bar.trackThickness` : Stroke line width of bar's track.
    - `bar.barColor`, `bar.barColor2` : Fill color of bar, in number or css string value. Assign gradient start color by `barColor2`.
    - `bar.skewX` : Horizontal skew of track and bar.
    - `bar.rtl` :
        - `false` : Bar starts from left side. Default behavior.
        - `true` : Bar starts from right side.
    - `bar.easeValue` : Parameters of easing value.
        - `bar.easeValue.duration` : Duration of value easing, default is `0` (no easing).
        - `bar.easeValue.ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.    
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `align` : 
    - `align.text` : Alignment of nameText, valueText game objects.
        - `'top'`, `'center'`, or `'bottom'`. Default value is `'bottom'`.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.iconTop`, `space.iconBottom` : Space around icon game object.
    - `space.name` : Left space of nameText game object.
    - `space.value` : Right space of valueText game object.
    - `space.bar`, `space.barLeft`, `space.barRight`, `space.barBottom` : Space around bar game object.
    - `space.text` : Space between text game object and action icon game object.
    - `space.actionTop`, `space.actionBottom` : Space around action game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyNameValueLabel extends RexPlugins.UI.NameValueLabel {
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
    var label = new MyNameValueLabel(scene, config);
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
    - NameText game object
        ```javascript
        var nameTextObject = label.getElement('name');
        ```
    - ValueText game object
        ```javascript
        var valueTextObject = label.getElement('value');
        ```
    - Bar game object
        ```javascript
        var textObject = label.getElement('bar');
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

### Name text

- Get nameText string
    ```javascript
    var s = label.nameText;
    ```
- Set nameText string
    ```javascript
    label.setNameText(s);
    ```
    or
    ```javascript
    label.nameText = s;
    ```

### Value text

- Get valueText string
    ```javascript
    var s = label.valueText;
    ```
- Set valueText string
    ```javascript
    label.setValueText(s);
    ```
    or
    ```javascript
    label.valueText = s;
    ```

### Bar

- Get bar value
    ```javascript
    var s = label.barValue;
    ```
- Set bar value
    ```javascript
    label.setBarValue(value);  // 0~1
    ```
    or
    ```javascript
    label.setBarValue(value, min, max);  // min~max
    ```
    or
    ```javascript
    label.barValue = t;  // 0~1
    ```
- Ease bar value
    ```javascript
    label.easeBarValueTo(value);  // 0~1
    ```
    or
    ```javascript
    label.easeBarValueTo(value, min, max);    // min~max
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

### Set value

Set valueText game object and bar game object.

```javascript
label.setValue(value, min, max);
```

Will invoke `valueTextFormatCallback` callback.

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).