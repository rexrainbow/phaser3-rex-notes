## Introduction

Fine-tuning properties of target object. [Reference](https://cocopon.github.io/tweakpane/)

- Author: Rex
- Game object

## Live demos

- [Tweaker](https://codepen.io/rexrainbow/pen/YzvPOGM)
- [Bind target](https://codepen.io/rexrainbow/pen/vYraBBY)
- [Horizontal tweaker](https://codepen.io/rexrainbow/pen/MWBGqzN)
- [Columns](https://codepen.io/rexrainbow/pen/MWMKNLM)
- [Wrap](https://codepen.io/rexrainbow/pen/jOjmaOY)
- [Buttons](https://codepen.io/rexrainbow/pen/vYvbpXY)
- [Add rows](https://codepen.io/rexrainbow/pen/NWVKyKW)
- [Edit item](https://codepen.io/rexrainbow/pen/vYwEXQe)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-tweaker)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add tweaker object
    ```javascript
    var tweaker = scene.rexUI.add.tweaker(config);
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
- Add tweaker object
    ```javascript
    var tweaker = scene.rexUI.add.tweaker(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Tweaker } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add tweaker object
    ```javascript    
    var tweaker = new Tweaker(scene, config);
    scene.add.existing(tweaker);
    ```

### Add tweaker object

```javascript
var tweaker = scene.rexUI.add.tweaker({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:
    // orientation: 0,

    // style: { ... }
    styles : {
        itemWidth : 0,
        itemHeight: 0,

        inputRow: {
            background: {

            },

            title: {

            },

            inputText: {

            },

            inputTextArea: {
                height:
            },

            list: {
                label: {

                },

                button: {

                }
            },

            button: {

            },

            slider: {
                track: {

                },

                indicator: {

                },

                thumb: {

                }
            },

            colorInput: {
                colorPicker: {

                },

                colorComponents: {
                    inputText: {
                        
                    }
                }
            },

            checkbox: {

            },

            toggleSwitch: {

            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            }
        },

        separator: {

        },

        folder: {
        },

        tab: {
        },

        scrollable: {
        },

        space: {
            left: 0, right: 0, top: 0, bottom: 0, item: 0
        },
    },


    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y`, `aspectRatio` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `aspectRatio` :
        - `undefined`, or `false` : Does not keep aspect ratio. Default behavior.
        - `true` : Use the current width and height as the aspect ratio.
        - A number : Use given number as the aspect ratio.    
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` : Main orientation of the tweaker.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom. Default value is `1`.
- `styles`, or `style` : Styles settings of input rows, separator, folder, tab, and scrollable. See [Styles chapter](ui-tweaker.md#styles) for more detail.
    - `style.itemWidth` : Width of input row, used if `orientation` is set to `'y'`(`1`).
    - `styles.space` : Pads spaces.
        - `styles.space.left`, `styles.space.right`, `styles.space.top`, `styles.space.bottom` : Space of bounds.
        - `styles.space.item` : Space between 2 input rows.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).

### Custom class

- Define class
    ```javascript
    class MyTweaker extends RexPlugins.UI.Tweaker {
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
    var tweaker = new MyTweaker(scene, config);
    ```

### Add input row

An input row can fine-tuning properties of target object. 

#### Text input row

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {    
    // view: 'string',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // monitor: false,

    // key: undefined,

    // autoUpdate: true,
    // onValidate: undefined,
    // onValueChange: undefined,    
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'string',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // monitor: false,

    // key: undefined,

    // autoUpdate: true,
    // onValidate: undefined,
    // onValueChange: undefined,    
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'string'`, if `bindingTarget` is not given.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.
- `autoUpdate` : 
    - `true` : Update binding key when user input. Default behavior.
    - `false` : Use `onValueChange` to set value of binding key when user input.
- `onValidate` : 
    - Callback invoked when new value input.
        ```javascript
        function(newValue, oldValue, bindingTarget, bindingKey) { 
            return true;
        }
        ```
        - `true` : Accept this new value.
        - `false` : Reject this new value.
    - `undefined` : Always accept new value changing. Default behavior.
- `onValueChange` : 
    - Callback invoked when binding value changing.
        ```javascript
        function(newValue, oldValue, bindingTarget, bindingKey) { 
        
        }
        ```
    - `undefined` : Ignore this feature. Default value.

See [Style of text input](#style-of-text-input)

#### Text-Area input row

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {    
    view: 'textarea',

    // height: undefined,
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // monitor: false,

    // key: undefined,

    // autoUpdate: true,
    // onValidate: undefined,
    // onValueChange: undefined,    
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    view: 'textarea',

    // height: undefined,
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // monitor: false,

    // key: undefined,

    // autoUpdate: true,
    // onValidate: undefined,
    // onValueChange: undefined,    
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : `'textarea'`.
- `height` : Height of this input row.
    - `undefined` : Use children height.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.
- `autoUpdate` : 
    - `true` : Update binding key when user input. Default behavior.
    - `false` : Use `onValueChange` to set value of binding key when user input.
- `onValidate` : 
    - Callback invoked when new value input.
        ```javascript
        function(newValue, oldValue, bindingTarget, bindingKey) { 
            return true;
        }
        ```
        - `true` : Accept this new value.
        - `false` : Reject this new value.
    - `undefined` : Always accept new value changing. Default behavior.
- `onValueChange` : 
    - Callback invoked when binding value changing.
        ```javascript
        function(newValue, oldValue, bindingTarget, bindingKey) { 
        
        }
        ```
    - `undefined` : Ignore this feature. Default value.

See [Style of text-area input](#style-of-text-area-input)

#### Text input from list

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {
    // view: 'list',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0, /* icon: , iconFrame, .. */ },
        {text: text1, value: value1, /* icon: , iconFrame, .. */ },
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'list',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0, /* icon: , iconFrame, .. */ },
        {text: text1, value: value1, /* icon: , iconFrame, .. */ },
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'list'`, if `bindingTarget` is not given.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.
    - `icon`, `iconFrame`, ... : See [Reset display content of Label](ui-label.md#reset-display-content)
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of list input](#style-of-list-input)

#### Text input from buttons

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'buttons'`.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of buttons input](#style-of-buttons-input)

#### Number input row

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // view: 'number',
    // int: undefined,

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'number',
    // int: undefined,

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'number'`, if `bindingTarget` is not given.
- `int` : Set to `true` to truncate float number to integer number.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of text input](#style-of-text-input)



#### Number input in a range

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // view: 'range',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    min: minValue, 
    max: maxValue,
    // step: undefined,

    // format: function(value) { return s; },
    // inputTextReadOnly: false,
    
    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'range',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    min: minValue, 
    max: maxValue,
    // step: undefined,

    // format: function(value) { return s; },
    // inputTextReadOnly: false,
    
    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'range'`, if `bindingTarget` is not given.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `min`, `max` : Minimum, maximun value of range.
- `step` : Step/gap of slider, optional.
- `format` : Callback to return formatted string for input text field.
    ```javascript
    function(value) {
        return s;
    }
    ```
- `inputTextReadOnly` :
    - `false` : Input text field is editable. Default behavior.
    - `true` : Input text field is read-only.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of range input](#style-of-range-input)


#### Number input in inc-dec buttons

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    view: 'incdec',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // min: undefined, 
    // max: undefined,
    // step: 1,

    // format: function(value) { return s; },
    // inputTextReadOnly: false,
    
    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'incdec',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    // min: undefined, 
    // max: undefined,
    // step: 1,

    // format: function(value) { return s; },
    // inputTextReadOnly: false,
    
    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'incdec'`, if `bindingTarget` is not given.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `step` : Incremental or decremental value when clicking inc-button, or dec-button
- `min`, `max` : Minimum, maximun value of range, optional.
- `format` : Callback to return formatted string for input text field.
    ```javascript
    function(value) {
        return s;
    }
    ```
- `inputTextReadOnly` :
    - `false` : Input text field is editable. Default behavior.
    - `true` : Input text field is read-only.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of incdec input](#style-of-inc-dec-input)


#### Number input from list

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // view: 'list',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'list',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],
    
    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'list'`, if `bindingTarget` is not given.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of list input](#style-of-list-input)


#### Number input from buttons

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],

    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    // orientation: 'x',

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ],

    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'buttons'`.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of buttons input](#style-of-buttons-input)


#### Color input

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    view: 'color',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    view: 'color',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'color'`.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

See [Style of color input](#style-of-color-input)


#### Boolean input row

`object[key]` is a boolean value.

```javascript
tweaker.addInput(object, key, {
    // view: 'boolean',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

or

```javascript
tweaker.addInput({
    bindingTarget: object,
    bindingKey: key,
    // view: 'boolean',
    // view: 'toggleSwitch',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `bindingKey` : Bind to target's property key. Necessary field
- `view` : Set to `'boolean'`, or `'toggleSwitch'`, if `bindingTarget` is not given.
    - `'boolean'` : Checkbox input. Default behavior.
    - `'toggleSwitch'` : Toggle switch input.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

See [Style of boolean input](#style-of-boolean-input)


#### Value callbacks row

```javascript
tweaker.addInput({
    bindingTarget: object,

    onGetValue(bindingTarget) {

    },

    onSetValue(bindingTarget, value) {

    },
    
    view: ,

    // Other properties..
    
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
    
    // orientation: 'x',

    // monitor: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target object.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `onGetValue` : Callback to get dispaly value
    ```javascript
    function(bindingTarget) {
        return value;
    }
    ```
- `onSetValue` : Callback to set value to bindingTarget
    ```javascript
    function(bindingTarget, value) {        
    }
    ```
- `view` : Any kind of view listed before.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text every tick from target. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


!!! note
    No `bindingKey` parameter in this case.


### Add button

```javascript
tweaker.addButton({
    // bindingTarget: object,

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    title: undefined,

    label: undefined,

    callback: function(target) {},

    // key: undefined,
})
```

- `bindingTarget` : Binding target will pass to callback. Optional.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label.
- `label` : Display text of button, [a string or a plain object](ui-label.md#reset-display-content).
    ```javascript
    {
        text: '',
    
        icon: undefined, 
        iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, 
        actionFrame: undefined,
        actionSize: undefined,
    
    }
    ```
- `callback` : Callback when clicking button
    ```javascript
    function(target) { }
    ```
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of botton](#style-of-botton)

### Add buttons

```javascript
tweaker.addButtons({
    // bindingTarget: object,

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    title: undefined,

    buttons:[
        {
            label: undefined,
            callback: function(target) {},
        },
        {
            label: undefined,
            callback: function(target) {},
        },
        // ...
    ],

    wrap: false,

    // key: undefined,
})
```

- `bindingTarget` : Binding target will pass to callback. Optional.
    - Can bind target later via `tweaker.setBindingTarget(object)`.
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label.
- `buttons` : Array of button label and button callback
    ```javascript
    {
        label: undefined,
        callback: function(target) {},
    }
    ```
    - `label` : Display text of button, [a string or a plain object](ui-label.md#reset-display-content).
        ```javascript
        {
            text: '',
        
            icon: undefined, 
            iconFrame: undefined,
            iconSize: undefined,
        
            action: undefined, 
            actionFrame: undefined,
            actionSize: undefined,
        
        }
    ```
    - `callback` : Callback when clicking button
        ```javascript
        function(target) { }
        ```
- `wrap` : Layout mode of buttons.
    - `true` : [fixwidth-sizer](ui-fixwidthsizer.md) layout.
    - `false` : [sizer](ui-sizer.md) layout. Default behavior.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Style of botton](#style-of-botton)


### Add separator

```javascript
tweaker.addSeparator();
```


See [Style of separator](#style-of-separator)


### Add folder

Folder contains collapsible child tweaker game object.

```javascript
var childTweaker = tweaker.addFolder({
    title: titleA,

    // expanded: true,
});

// childTweaker.addInput(...)
```

- `childTweaker` : Child tweaker game object. Add input rows by `addInput` method.
- `title` Title of folder. Click title can collapse or expand child tweaker game object.
- `expanded` : 
    - `true` : Expand child tweaker game object at beginning. Default behavior.
    - `false` : Collapse child tweaker game object at beginning.


See [Style of folder](#style-of-folder)


### Add tab

Tab containes pages. Each page is a tweaker game object.

```javascript
var childrenTweakers = tweaker.addTab({
    pages: [
        {
            title: titleA, 
            // show: false
        },
        {
            title: titleB
            // show: false
        },
        // ...
    ]
});

// childrenTweakers[0].addInput(...)
// childrenTweakers[1].addInput(...)
```

- `childrenTweakers` : Array of children tweaker game object. Add input rows by `addInput` method.
- `pages` : Array of page setting.
    ```javascript
    {
        title: titleA,
        show: false,
    }
    ```
    - `title` : Display text of page title
    - `show` : Set to `true` to show this page at beginning


See [Style of tab](#style-of-tab)


### Add columns

Multiple columns in a row. Each column is a tweaker game object.

```javascript
var childrenTweakers = tweaker.addColumns(amount);

// childrenTweakers[0].addInput(...)
// childrenTweakers[1].addInput(...)
```

or

```javascript
var childrenTweakers = tweaker.addColumns({
    // title: title,

    columns: [
        {
            // width: 0,
            // expand: true
        },
        {
            // width: 0,
            // expand: true
        },
    ]
});

// childrenTweakers[0].addInput(...)
// childrenTweakers[1].addInput(...)
```

- `childrenTweakers` : Array of children tweaker game object. Add input rows by `addInput` method.
- `amount` : A number, amount of columns. Will use default column config.
- `columns` : Array of column config, each column config contains
    - `width` : Minimum width of this column, default value is `0`, will set `proportion` to `1`.
    - `expand` : Expand height of this column, default value is `true`.


See [Style of columns](#style-of-columns)


### Add wrap

A tweaker panel which Wrap input rows into multiple lines.

```javascript
var childTweaker = tweaker.addWrap({
    // title: titleA,

    itemWidth: 0,
    itemHeight: 0,
});

// childTweaker.addInput(...)
```

- `childTweaker` : Child tweaker game object. Add input rows by `addInput` method.
- `title` Title of folder. Click title can collapse or expand child tweaker game object.
- `itemWidth`, `itemHeight` : Size of input row.


See [Style of wrap](#style-of-wrap)


### Add scrollable

[Scrollable(Panel)](ui-scrollablepanel.md) contains child tweaker game object and slider.

```javascript
var childTweaker = tweaker.addScrollable({
    // title: title,

    // height: 0
});

// childTweaker.addInput(...)
```

- `childTweaker` : Child tweaker game object. Add input rows by `addInput` method.
- `title` Title of scrolable.
    - A string : Title string.
    - `undefined` : Hide this title game object.
- `height` :
    - A number : Height of this [Scrollable(Panel)](ui-scrollablepanel.md).
    - `undefined`, or `0` : Expand this scrollable(Panel).


See [Style of scrollable](#style-of-scrollable)



### Add rows

Add mutiple rows (input row, button, buttons, separator, folder, tab) in a single method

```javascript
tweaker.addRows(properties, target);
// tweaker.addRows(properties, target, monitor);
```

- `properties` : A list of properties, each property could be one of 
    - Input row
        ```javascript
        {
            $key: '',
            // $target:
            // More properties...
        }
        ```
        - `$key` : Assign this value to `bindingKey`       
        - `$target` : Assign this value to `bindingTarget`
            - `undefined` : Use `target` parameter from `addRows` method. Default behavior
        - More properties. See 
            - [Text input row](#text-input-row), 
            - [Text area input row](#text-area-input-row), 
            - [Text input from list](#text-input-from-list)
            - [Text input from buttons](#text-input-from-buttons)
            - [Number input row](#number-input-row)
            - [Number input in a range](#number-input-in-a-range)
            - [Number input from list](#number-input-from-list)
            - [Number input from buttons](#number-input-from-buttons)
            - [Color input row](#color-input)
            - [Boolean input row](#boolean-input-row)
            - [Value callback row](#value-callbacks-row)
    - Button
        ```javascript
        {
            $type: 'button', title: '', label: '',
            callback(target) {
            }
        }
        ```
    - Buttons
    - Separator
        ```javascript
        { $type: 'separator' }
        ```
    - Folder
        ```javascript
        {
            $type: 'folder', title: '',
            // $target: 
            $properties: [
                // ...
            ]
        }
        ```
        - `$target` : Override `target` value pass to remainder `$properties`.
            - `undefined` : Use previous `target` value. Default behavior.
    - Tab
        ```javascript
        {
            $type: 'tab',
            // $target:
            pages: [
                {
                    title: '',
                    $properties: [
                        // ...
                    ]
                },
                {
                    title: '',
                    $properties: [
                        // ...
                    ]
                },
                // ... More pages
            ]
        }
        ```
        - `$target` : Override `target` value pass to remainder `$properties`.
            - `undefined` : Use previous `target` value. Default behavior.
    - Columns
        ```javascript
        {
            $type: 'columns',
            // $target:
            columns: [
                {
                    // width: 0,
                    // expand: true,
                    $properties: [
                        // ...
                    ]
                },
                {
                    // width: 0,
                    // expand: true,
                    $properties: [
                        // ...
                    ]
                },
                // ... More columns
            ]
        }
        ```
        - `$target` : Override `target` value pass to remainder `$properties`.
            - `undefined` : Use previous `target` value. Default behavior.
    - Wrap
        ```javascript
        {
            $type: 'wrap', title: '',
            // $target: 
            $properties: [
                // ...
            ]
        }
        ```
        - `$target` : Override `target` value pass to remainder `$properties`.
            - `undefined` : Use previous `target` value. Default behavior.
    - Scrollable
        ```javascript
        {
            $type: 'scrollable', title: undefined,
            // $target: 
            $properties: [
                // ...
            ]
        }
        ```
        - `$target` : Override `target` value pass to remainder `$properties`.
            - `undefined` : Use previous `target` value. Default behavior.
- `monitor` : 
    - `false` : Don't update input text every tick from target.
    - `true` : Update input text from current object, in `postupdate` event of scene. Default behavior.


### Layout children

Arrange position of all elements.

```javascript
tweaker.layout();
```

See also - [dirty](ui-basesizer.md#dirty)


### Styles

#### Style of text input 

Style of text-area input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.inputText` 
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            inputText: {
                background: {
                    color: null,
                    color2: null,
                    horizontalGradient: true,

                    stroke: null,
                    strokeThickness: 2,

                    cornerRadius: 0,
                    cornerIteration: null
                },
                focusStyle: {
                    // color:
                    // color2:
                    // horizontalGradient:

                    // stroke:
                    // strokeThickness:

                    // cornerRadius:
                    // cornerIteration:
                },

                style: {
                    bold: false,
                    italic: false,
                    fontSize: '16px',
                    fontFamily: 'Courier',
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadowColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 0,
                    backgroundColor: null,
                    backgroundHeight: undefined,
                    backgroundBottomY: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                cursorStyle: {
                    // bold:
                    // italic:
                    // fontSize:
                    // fontFamily:
                    // color:
                    // stroke:
                    // strokeThickness:
                    // shadowColor:
                    // shadowOffsetX:
                    // shadowOffsetY:
                    // shadowBlur:
                    // backgroundColor:
                    // backgroundHeight:
                    // backgroundBottomY:
                    // offsetX:
                    // offsetY:
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },

            proportion: {
                title: 0, inputField: 0,
            }
        }
    }
}
```

#### Style of text-area input 

Style of text-area input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.inputTextArea` 
- `styles.inputRow.inputText` 
- `styles.inputRow.slider` 
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            inputTextArea: {
                height: undefined,

                text: {

                },

                slider: {
                    // ...
                }
            },

            inputText: {
                background: {
                    color: null,
                    color2: null,
                    horizontalGradient: true,

                    stroke: null,
                    strokeThickness: 2,

                    cornerRadius: 0,
                    cornerIteration: null
                },
                focusStyle: {
                    // color:
                    // color2:
                    // horizontalGradient:

                    // stroke:
                    // strokeThickness:

                    // cornerRadius:
                    // cornerIteration:
                },

                style: {
                    bold: false,
                    italic: false,
                    fontSize: '16px',
                    fontFamily: 'Courier',
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadowColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 0,
                    backgroundColor: null,
                    backgroundHeight: undefined,
                    backgroundBottomY: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                cursorStyle: {
                    // bold:
                    // italic:
                    // fontSize:
                    // fontFamily:
                    // color:
                    // stroke:
                    // strokeThickness:
                    // shadowColor:
                    // shadowOffsetX:
                    // shadowOffsetY:
                    // shadowBlur:
                    // backgroundColor:
                    // backgroundHeight:
                    // backgroundBottomY:
                    // offsetX:
                    // offsetY:
                }
            },

            slider: {
                track: {
                    height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                indicator: {
                    height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                thumb: {
                    width: 0, height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }
        }
    }
}
```

Style of text-area is defined at `styles.inputRow.inputTextArea` :

- Define style of input text at `styles.inputRow.inputTextArea.text`, if not given, it will use
  `styles.inputRow.inputText`.
- Define style of slider at `styles.inputRow.inputTextArea.slider`, if not given, it will use
  `styles.inputRow.slider`.

#### Style of list input 

Style of text/number list input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.list` 
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            list: {
                label: {
                    background: {
                        radius: 0,
                        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                        color: undefined,
                        alpha: undefined,
                        strokeColor: undefined,
                        strokeAlpha: undefined,
                        strokeWidth: undefined,
                    },

                    text: {
                        fontFamily: 'Courier',
                        fontSize: '16px',
                        fontStyle: '',
                        backgroundColor: null,
                        color: '#fff',
                        stroke: '#fff',
                        strokeThickness: 0,
                        shadow: {
                            offsetX: 0,
                            offsetY: 0,
                            color: '#000',
                            blur: 0,
                            stroke: false,
                            fill: false
                        },                  
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        },
                        // more text styles
                    },

                    iconSize: undefined,
                    iconWidth: undefined, iconHeight: undefined,

                    space: {
                        left: 0, right: 0, top: 0, bottom:0, 
                        icon: 0, text: 0
                    }

                },

                button: {
                    background: {
                        radius: 0,
                        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                        color: undefined,
                        alpha: undefined,
                        strokeColor: undefined,
                        strokeAlpha: undefined,
                        strokeWidth: undefined,
    
                        'hover.color': undefined,
                        'hover.alpha': undefined,
                        'hover.strokeColor': undefined,
                        'hover.strokeAlpha': undefined,
                        'hover.strokeWidth': undefined,
                    },

                    text: {
                        fontFamily: 'Courier',
                        fontSize: '16px',
                        fontStyle: '',
                        backgroundColor: null,
                        color: '#fff',
                        stroke: '#fff',
                        strokeThickness: 0,
                        shadow: {
                            offsetX: 0,
                            offsetY: 0,
                            color: '#000',
                            blur: 0,
                            stroke: false,
                            fill: false
                        },                  
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        },
                        // more text styles
                    },

                    iconSize: undefined,
                    iconWidth: undefined, iconHeight: undefined,

                    space: {
                        left: 0, right: 0, top: 0, bottom:0, 
                        icon: 0, text: 0
                    }
                },

                list: {
                    alignParent: 'text',
                    alignSide: 'left',
                    expandDirection: 'down',
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }
        }
    }
}
```


#### Style of buttons input

Style of buttons input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.button` 
- `styles.inputRow.background`


```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            button: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                },

                expand: true
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }

        }
    }
}
```


#### Style of range input

Style of range input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.slider`
- `styles.inputRow.inputText` 
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            slider: {
                track: {
                    height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                indicator: {
                    height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                thumb: {
                    width: 0, height: 0,

                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                }
            },

            inputText: {
                background: {
                    color: null,
                    color2: null,
                    horizontalGradient: true,

                    stroke: null,
                    strokeThickness: 2,

                    cornerRadius: 0,
                    cornerIteration: null
                },
                focusStyle: {
                    // color:
                    // color2:
                    // horizontalGradient:

                    // stroke:
                    // strokeThickness:

                    // cornerRadius:
                    // cornerIteration:
                },

                style: {
                    bold: false,
                    italic: false,
                    fontSize: '16px',
                    fontFamily: 'Courier',
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadowColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 0,
                    backgroundColor: null,
                    backgroundHeight: undefined,
                    backgroundBottomY: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                cursorStyle: {
                    // bold:
                    // italic:
                    // fontSize:
                    // fontFamily:
                    // color:
                    // stroke:
                    // strokeThickness:
                    // shadowColor:
                    // shadowOffsetX:
                    // shadowOffsetY:
                    // shadowBlur:
                    // backgroundColor:
                    // backgroundHeight:
                    // backgroundBottomY:
                    // offsetX:
                    // offsetY:
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
                range: {
                    slider: 0,
                    inputText: 0,
                }
            }

        }
    }
}
```

- Set `proportion.range.slider` and `proportion.range.inputText` to layout slider and inputText.

#### Style of inc-dec input

Style of range input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.incDec`
- `styles.inputRow.inputText` 
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            incDec: {
                incButton: {
                    background: {
                        radius: 0,
                        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
        
                        color: undefined,
                        alpha: undefined,
                        strokeColor: undefined,
                        strokeAlpha: undefined,
                        strokeWidth: undefined,
                    },
    
                    icon: {
                        key:,
                        frame:,
                    },
    
                    text: null,
                    action: null,

                    iconSize: undefined,
                    iconWidth: undefined, iconHeight: undefined,
    
                    space: {
                        left: 0, right: 0, top: 0, bottom:0, 
                        icon: 0, text: 0
                    }
                },

                decButton: {
                    background: {
                        radius: 0,
                        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
        
                        color: undefined,
                        alpha: undefined,
                        strokeColor: undefined,
                        strokeAlpha: undefined,
                        strokeWidth: undefined,
                    },
    
                    icon: {
                        key:,
                        frame:,
                    },
    
                    text: null,
                    action: null,

                    iconSize: undefined,
                    iconWidth: undefined, iconHeight: undefined,
    
                    space: {
                        left: 0, right: 0, top: 0, bottom:0, 
                        icon: 0, text: 0
                    }
                },

                inputTextIndex: 0, // 0,1,2
            },


            inputText: {
                background: {
                    color: null,
                    color2: null,
                    horizontalGradient: true,

                    stroke: null,
                    strokeThickness: 2,

                    cornerRadius: 0,
                    cornerIteration: null
                },
                focusStyle: {
                    // color:
                    // color2:
                    // horizontalGradient:

                    // stroke:
                    // strokeThickness:

                    // cornerRadius:
                    // cornerIteration:
                },

                style: {
                    bold: false,
                    italic: false,
                    fontSize: '16px',
                    fontFamily: 'Courier',
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadowColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 0,
                    backgroundColor: null,
                    backgroundHeight: undefined,
                    backgroundBottomY: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                cursorStyle: {
                    // bold:
                    // italic:
                    // fontSize:
                    // fontFamily:
                    // color:
                    // stroke:
                    // strokeThickness:
                    // shadowColor:
                    // shadowOffsetX:
                    // shadowOffsetY:
                    // shadowBlur:
                    // backgroundColor:
                    // backgroundHeight:
                    // backgroundBottomY:
                    // offsetX:
                    // offsetY:
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
                range: {
                    slider: 0,
                    inputText: 0,
                }
            }

        }
    }
}
```

#### Style of color input

Style of color input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.inputText` 
- `styles.inputRow.colorInput`
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            colorInput: {
                swatch: {
                    radius: 0,
                    size: undefined,
                },

                inputText: {
                    background: {
                        color: null,
                        color2: null,
                        horizontalGradient: true,
    
                        stroke: null,
                        strokeThickness: 2,
    
                        cornerRadius: 0,
                        cornerIteration: null
                    },
                    focusStyle: {
                        // color:
                        // color2:
                        // horizontalGradient:
    
                        // stroke:
                        // strokeThickness:
    
                        // cornerRadius:
                        // cornerIteration:
                    },

                    style: {
                        bold: false,
                        italic: false,
                        fontSize: '16px',
                        fontFamily: 'Courier',
                        color: '#fff',
                        stroke: '#fff',
                        strokeThickness: 0,
                        shadowColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 0,
                        backgroundColor: null,
                        backgroundHeight: undefined,
                        backgroundBottomY: undefined,
                        offsetX: 0,
                        offsetY: 0
                    },
                    cursorStyle: {
                        // bold:
                        // italic:
                        // fontSize:
                        // fontFamily:
                        // color:
                        // stroke:
                        // strokeThickness:
                        // shadowColor:
                        // shadowOffsetX:
                        // shadowOffsetY:
                        // shadowBlur:
                        // backgroundColor:
                        // backgroundHeight:
                        // backgroundBottomY:
                        // offsetX:
                        // offsetY:
                    }
                },                
                // inputText: false,

                colorPicker: {
                    background: {
                        radius: 0,
                        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                        color: undefined,
                        alpha: undefined,
                        strokeColor: undefined,
                        strokeAlpha: undefined,
                        strokeWidth: undefined,
                    }
                },

                colorComponents: {
                    inputText: {
                        background: {
                            color: null,
                            color2: null,
                            horizontalGradient: true,

                            stroke: null,
                            strokeThickness: 2,

                            cornerRadius: 0,
                            cornerIteration: null
                        },
                        focusStyle: {
                            // color:
                            // color2:
                            // horizontalGradient:

                            // stroke:
                            // strokeThickness:

                            // cornerRadius:
                            // cornerIteration:
                        },

                        style: {
                            bold: false,
                            italic: false,
                            fontSize: '16px',
                            fontFamily: 'Courier',
                            color: '#fff',
                            stroke: '#fff',
                            strokeThickness: 0,
                            shadowColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 0,
                            backgroundColor: null,
                            backgroundHeight: undefined,
                            backgroundBottomY: undefined,
                            offsetX: 0,
                            offsetY: 0
                        },
                        cursorStyle: {
                            // bold:
                            // italic:
                            // fontSize:
                            // fontFamily:
                            // color:
                            // stroke:
                            // strokeThickness:
                            // shadowColor:
                            // shadowOffsetX:
                            // shadowOffsetY:
                            // shadowBlur:
                            // backgroundColor:
                            // backgroundHeight:
                            // backgroundBottomY:
                            // offsetX:
                            // offsetY:
                        }

                    }
                }

                // colorComponents: false,

            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }

        }
    }
}
```


#### Style of boolean input


Style of boolean input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.checkbox`, or `styles.inputRow.toggleSwitch`
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            // For checkbox view
            checkbox: {
                // size: undefined,

                color: 0x005cb2,
                boxFillAlpha: 1,
                uncheckedColor: null,
                uncheckedBoxFillAlpha: 1,

                boxLineWidth: 4,
                boxStrokeColor: 0x005cb2,
                boxStrokeAlpha: 1,
                uncheckedBoxStrokeColor: 0x005cb2,
                uncheckedBoxStrokeAlpha: 1,

                checkerColor: 0xffffff,
                checkerAlpha: 1,

                circleBox: false

                animationDuration: 150,

                readOnly: false,
            },

            // For toggle switch view
            toggleSwitch: {
                // size: undefined,
                
                color: 0x005cb2,
                trackFillAlpha: 1,
                falseValueTrackColor: undefined,
                falseValueTrackFillAlpha: 1,

                thumbColor: 0xffffff,
                thumbAlpha: 1,

                trackWidth: 0.9,
                trackHeight: 0.5,
                trackCornerRadius: (trackHeight * 0.5),

                thumbHeight: (trackHeight * 0.9),
                thumbWidth: (thumbHeight),
                thumbCornerRadius: (thumbHeight * 0.5),

                thumbLeft: 0.3,
                thumbRight: (1 - thumbLeft),
                rtl: false,

                animationDuration: 150,

                readOnly: false,
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }

        }
    }
}
```

#### Style of botton

Style of button is defined in 

- `styles.inputRow.title`
- `styles.inputRow.button`
- `styles.inputRow.background`

```javascript
{
    // style: {...}
    styles: {
        inputRow: {
            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },
    
                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            button: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            space: {
                left: 0, right: 0, top: 0, bottom: 0,
                title: 0
            },
            
            proportion: {
                title: 0, inputField: 0,
            }

        }
    }
}
```


#### Style of separator

Style of separator is defined in 

- `styles.separator`

```javascript
{
    // style: {...}
    styles: {
        separator: {
            height: 0,

            radius: 0,
            // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

            color: undefined,
            alpha: undefined,
            strokeColor: undefined,
            strokeAlpha: undefined,
            strokeWidth: undefined,
        }
    }
}
```


#### Style of folder

Style of folder is defined in 

- `styles.folder`

```javascript
{
    // style: {...}
    styles: {
        folder: {
            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                },

                expandedIcon: {
                    color: undefined,
                    alpha: 1,

                    strokeColor: undefined,
                    strokeAlpha: 1,
                    strokeWidth: 1,
                    arrowOnly: false,

                    easeDuration: 0,
                }
            },

            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            space: {
                left: 0, right: 0, top: 0, bottom:0, 
            }
        }
    }
}
```


#### Style of tab

Style of tab is defined in 

- `styles.tab`

```javascript
{
    // style: {...}
    styles: {
        tab: {
            tab: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,

                    'active.color': undefined,
                    'active.alpha': undefined,
                    'active.strokeColor': undefined,
                    'active.strokeAlpha': undefined,
                    'active.strokeWidth': undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                }
            },

            wrapTabs: false,

            tabs: {
                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    item: 0,
                }
            },

            pages: {
                fadeIn: 0,
            }
        }
    }
}
```



#### Style of columns

Style of columns is defined in 

- `styles.columns`

```javascript
{
    // style: {...}
    styles: {
        columns: {
            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                },

                expandedIcon: {
                    color: undefined,
                    alpha: 1,

                    strokeColor: undefined,
                    strokeAlpha: 1,
                    strokeWidth: 1,
                    arrowOnly: false,

                    easeDuration: 0,
                }
            },

            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            //background: [
            //    {
            //        radius: 0,
            //        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
            //
            //        color: undefined,
            //        alpha: undefined,
            //        strokeColor: undefined,
            //        strokeAlpha: undefined,
            //        strokeWidth: undefined,
            //    }
            //],

            space: {
                left: 0, right: 0, top: 0, bottom:0, 
                column: 0,
            }
        }
    }
}
```


#### Style of wrap

Style of wrap is defined in 

- `styles.wrap`

```javascript
{
    // style: {...}
    styles: {
        wrap: {
            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                },

                expandedIcon: {
                    color: undefined,
                    alpha: 1,

                    strokeColor: undefined,
                    strokeAlpha: 1,
                    strokeWidth: 1,
                    arrowOnly: false,

                    easeDuration: 0,
                }
            },

            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            space: {
                item: 0, line: 0
            },

            align: 'justify-cneter'
        }
    }
}
```

- `align` : Align children of a line.
    - `0`, `'left'` : Align children of a line to left/top side.
    - `1`, `'right'` : Align children of a line to right/bottom side.
    - `2`, `'center'` : Align children of a line to ceter.
    - `3`, `'justify'`, `'justify-left'` : If remainder space is less or equal than 25%, then justify children. Else align children to left/top side.
    - `4`, `'justify-right'` : If remainder space is less or equal than 25%, then justify children. Else align children to right/bottom side.
    - `5`, `'justify-cneter'` : If remainder space is less or equal than 25%, then justify children. Else align children to center.


#### Style of scrollable

Style of scrollable is defined in 

- `styles.scrollable`

```javascript
{
    // style: {...}
    styles: {
        scrollable: {
            title: {
                background: {
                    radius: 0,
                    // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                    color: undefined,
                    alpha: undefined,
                    strokeColor: undefined,
                    strokeAlpha: undefined,
                    strokeWidth: undefined,
                },

                text: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    fontStyle: '',
                    backgroundColor: null,
                    color: '#fff',
                    stroke: '#fff',
                    strokeThickness: 0,
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        color: '#000',
                        blur: 0,
                        stroke: false,
                        fill: false
                    },                  
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    },
                    // more text styles
                },

                iconSize: undefined,
                iconWidth: undefined, iconHeight: undefined,

                space: {
                    left: 0, right: 0, top: 0, bottom:0, 
                    icon: 0, text: 0
                },

                expandedIcon: {
                    color: undefined,
                    alpha: 1,

                    strokeColor: undefined,
                    strokeAlpha: 1,
                    strokeWidth: 1,
                    arrowOnly: false,

                    easeDuration: 0,
                }
            },

            background: {
                radius: 0,
                // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}

                color: undefined,
                alpha: undefined,
                strokeColor: undefined,
                strokeAlpha: undefined,
                strokeWidth: undefined,
            },

            slider: {
                track: { 
                    width: 1, height: 1,
                    radius: 0, 
                    color: undefined, alpha: 1,
                    strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
                    shape: undefined
                },

                thumb: { 
                    width: 1, height: 1,
                    radius: 0, 
                    color: undefined, alpha: 1,
                    strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
                    shape: undefined
                },
                
                // hideUnscrollableSlider: false,
                // disableUnscrollableDrag: false,
                // adaptThumbSize: false,
                // minThumbSize: undefined,
            },

            space: {
                panel:0, 
            }
        }
    }
}
```

### Bind target

All input rows will bind to this new target, and update display status.

```javascript
tweaker.setBindingTarget(object);
```

### Events

- On value change of any bindingKey
    ```javascript
    tweaker.on('valuechange', function(newValue, oldValue, bindingTarget, bindingKey) {

    })
    ```


### Get element

- Get by key
    ```javascript
    var gameObject = tweaker.getElement(key);
    ```
    - `key` : Add by `key` parameter in `tweaker.addInput(config)` method
        ```javascript
        tweaker.addInput({
            key: ...
        })
        ```
- Get by name
    ```javascript
    var gameObject = tweaker.getElement('#' + name);
    // var gameObject = pages.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = tweaker.getByName(name);
    // var gameObject = tweaker.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

