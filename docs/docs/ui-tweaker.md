## Introduction

Fine-tuning properties of target object. [Reference](https://cocopon.github.io/tweakpane/)

- Author: Rex
- Game object

## Live demos

- [Tweaker](https://codepen.io/rexrainbow/pen/YzvPOGM)
- [Bind target](https://codepen.io/rexrainbow/pen/vYraBBY)
- [Horizontal tweaker](https://codepen.io/rexrainbow/pen/MWBGqzN)

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
    // orientation: 0,

    styles : {
        itemWidth : 0,

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
- `orientation` : Main orientation of the tweaker.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange game objects from top to bottom. Default value is `1`.
- `styles` : Styles settings of input rows, separator, folder, and tab. See [Styles chapter](ui-tweaker.md#styles) for more detail.
    - `style.itemWidth` : Width of input row, used if `orientation` is set to `'y'`(`1`).
    - `styles.space` : Pads spaces.
        - `styles.space.left`, `styles.space.right`, `styles.space.top`, `styles.space.bottom` : Space of bounds.
        - `styles.space.item` : Space between 2 input rows.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

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
    - `false` : Don't update input text from current object. Default behavior.
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

See [Styles of text input](ui-tweaker.md#styles-of-text-input)

#### Text-Area input row

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {    
    view: 'textarea',

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
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text from current object. Default behavior.
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

See [Styles of text-area input](ui-tweaker.md#styles-of-text-area-input)

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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of list input](ui-tweaker.md#styles-of-list-input)

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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of buttons input](ui-tweaker.md#styles-of-buttons-input)

#### Number input row

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // view: 'number',

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
- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `monitor` : 
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of text input](ui-tweaker.md#styles-of-text-input)



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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of range input](ui-tweaker.md#styles-of-range-inputut)


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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of list input](ui-tweaker.md#styles-of-list-input)


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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of buttons input](ui-tweaker.md#styles-of-buttons-input)


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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

See [Styles of color input](ui-tweaker.md#styles-of-color-input)


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
    - `false` : Don't update input text from current object. Default behavior.
    - `true` : Update input text from current object, in `postupdate` event of scene.
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.

See [Styles of boolean input](ui-tweaker.md#styles-of-boolean-input)


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
- `label` : Display text of button.
- `callback` : Callback when clicking button
    ```javascript
    function(target) { }
    ```
- `key` : Add this child into childMap, which could be read back by `tweaker.getElement(key)`.
    - `undefined` : Don't add this child. Default value.


See [Styles of botton](ui-tweaker.md#styles-of-botton)


### Add separator

```javascript
tweaker.addSeparator();
```


See [Styles of separator](ui-tweaker.md#styles-of-separator)


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


See [Styles of folder](ui-tweaker.md#styles-of-folder)


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


See [Styles of tab](ui-tweaker.md#styles-of-tab)


### Layout children

Arrange position of all elements.

```javascript
tweaker.layout();
```

See also - [dirty](ui-basesizer.md#dirty)


### Styles

#### Styles of text input 

Style of text-area input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.inputText` 
- `styles.inputRow.background`

```javascript
{
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

#### Styles of text-area input 

Style of text-area input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.inputTextArea` 
- `styles.inputRow.inputText` 
- `styles.inputRow.slider` 
- `styles.inputRow.background`

```javascript
{
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

#### Styles of list input 

Style of text/number list input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.list` 
- `styles.inputRow.background`

```javascript
{
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


#### Styles of buttons input

Style of buttons input is defined in 

- `styles.inputRow.title`
- `styles.inputRow.button` 
- `styles.inputRow.background`


```javascript
{
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


#### Styles of range input

Style of range input is defined in 

- `styles.inputRow.title`, 
- `styles.inputRow.slider`
- `styles.inputRow.inputText` 
- `styles.inputRow.background`

```javascript
{
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
            }

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

#### Styles of color input

Style of color input is defined in 

- `styles.inputRow.title`, 
- `styles.inputRow.inputText` 
- `styles.inputRow.colorInput`
- `styles.inputRow.background`

```javascript
{
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


#### Styles of boolean input


Style of boolean input is defined in 

- `styles.inputRow.title`, 
- `styles.inputRow.checkbox`, or `styles.inputRow.toggleSwitch`
- `styles.inputRow.background`

```javascript
{
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

#### Styles of botton

Style of button is defined in 

- `styles.inputRow.title`, 
- `styles.inputRow.button`
- `styles.inputRow.background`

```javascript
{
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


#### Styles of separator

Style of separator is defined in 

- `styles.separator`

```javascript
{
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


#### Styles of folder

Style of folder is defined in 

- `styles.folder`

```javascript
{
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


#### Styles of tab

Style of tab is defined in 

- `styles.tab`

```javascript
{
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


### Bind target

All input rows will bind to this new target, and update display status.

```javascript
tweaker.setBindingTarget(object);
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

