## Introduction

A container with a group of buttons.

- Author: Rex
- Game object

## Live demos

- [Expand](https://codepen.io/rexrainbow/pen/XWbRZLR)
- [Checkboxes/radio](https://codepen.io/rexrainbow/pen/PowMEjX)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-buttons)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add buttons object
    ```javascript
    var buttons = scene.rexUI.add.buttons(config);
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
- Add buttons object
    ```javascript
    var buttons = scene.rexUI.add.buttons(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add buttons object
    ```javascript    
    var buttons = new Buttons(scene, config);
    sscene.add.existing(buttons);
    ```

### Add Buttons object

```javascript
var buttons = scene.rexUI.add.buttons({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,

    // Elements
    // background: backgroundGameObject,

    buttons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    expand: false,
    align: undefined,
    click: {
        mode: 'pointerup',
        clickInterval: 100
    },

    // space: 0,
    // space: {
    //    top: 0,
    //    bottom: 0,
    //    left: 0,
    //    right: 0,
    //    item: 0
    //},    

    // name: '',
    // draggable: false,
    // eventEmitter: this,
    // groupName: undefined,

    // type: undefined,
    // setValueCallback: undefined,
    // setValueCallbackScope: undefined
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
- `orientation` : Main orientation of button game objects.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange button game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange button game objects from top to bottom.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of grid table.
- `buttons` : Array of button game objects.
- `expand` : Set `true` to expand width, or height of buton game objects.
- `align` : Alignment of these button game objects. Only valid when `expand` is `false`.
    - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top.
    - `'center'` : Align game objects at center.
    - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `space` :
    - A number: Space between 2 button game objects.
    - An object: Padding of button game objects.
        - `space.item` : Space between 2 button game objects.
        - `space.top`, `space.bottom`, `space.left`, `space.right` : Padding around bottoms.        
- `name` : Set name of this button game objects.
- `eventEmitter` : Dispatch buttons' touch events to other game obhect, default is this buttons game object.
- `groupName` : Optional group name for argument of touch events.
- `type` : Type/behavior of these buttons.
    - `undefined` : No extra behavior, default value.
    - `'checkboxes'` : Set these buttons to checkboxes.
    - `'radio'` : Set these buttons to radio.
- `setValueCallback` : Callback to set value of a button.
    - `undefined` : No callback, default value.
    - A function object.
        ```javascript
        function(button, value, previousValue) {
            // ...
        }
        ```
        - `button` : Button game object.
        - `value`: `true`, or `false`.
        - `previousValue` : `true`, or `false`.

### Custom class

- Define class
    ```javascript
    class MyButtons extends RexPlugins.UI.Buttons {
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
    var buttons = new MyButtons(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
buttons.layout();
```

### Other properties

See [sizer object](ui-sizer.md)

### Events

- Click button
    ```javascript
    buttons.on('button.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.click', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `button` : Triggered button game object.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-over button
    ```javascript
    buttons.on('button.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.over', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `button` : Triggered button game object
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-out button
    ```javascript
    buttons.on('button.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.out', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `button` : Triggered button game object.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Enable button's input
    ```javascript
    buttons.on('button.enable', function(button, index) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.enable', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `button` : Triggered button game object.
    - `index` : Index of triggered button game object.
- Disable button's input
    ```javascript
    buttons.on('button.disalbe', function(button, index) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.disalbe', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `groupName` : Optional group name.
    - `button` : Triggered button game object.
    - `index` : Index of triggered button game object.

#### Emit button click event

```javascript
buttons.emitButtonClick(index);
```

- `index` : Index of triggered button game object, or a button game object.

#### Enable/disable input of button 

- Enable a button's input
    ```javascript
    buttons.setButtonEnable(index);
    // buttons.setButtonEnable(index, true);
    ```
    - `index` : Index of triggered button game object, or a button game object.
- Enable all buttons' input
    ```javascript
    buttons.setButtonEnable();
    // buttons.setButtonEnable(true);
    ```
- Disable
    ```javascript
    buttons.setButtonEnable(index, true);
    ```
    - `index` : Index of triggered button game object, or a button game object.
- Disable all buttons' input
    ```javascript
    buttons.setButtonEnable(false);
    ```
- Toggle
    ```javascript
    buttons.toggleButtonEnable(index);
    ```
- Toggle all buttons's input
    ```javascript
    buttons.toggleButtonEnable();
    ```
- Get button's input enable
    ```javascript
    var enabled = bottons.getButtonEnable(index);
    ```

### Get element

- Get element
    - Background game object
        ```javascript
        var background = buttons.getElement('background');
        ```
    - Button game objects
        ```javascript
        var buttonObjects = buttons.getElement('buttons');
        ```
        or
        ```javascript
        var buttonObject = buttons.getButton(index);
        ```
        or
        ```javascript
        var buttonObjects = buttons.getElement('buttons[0]'); // First button
        ```
- Get by name
    ```javascript
    var gameObject = buttons.getElement('#' + name);
    ```

### Add button

- Add button
    ```javascript
    buttons.addButton(gameObject)
    ```
    - `gameObject` : A game object, or an array of game objects.

### Remove buttton

- Remove button
    ```javascript
    buttons.removeButton(gameObject, destroyChild);
    ```
    - `gameObject` : 
        - Game object, or array of game objects : Button game object.
        - A number, or array of numbers : Index of button game object.
        - A string, or array of strings : Name of button game object.
    - `destroyChild` : Set `true` to destroy button game object.
- Remove all buttton
    ```javascript
    buttons.clearButtons(destroyChild);
    ```
    - `destroyChild` : Set `true` to destroy button game objects.

### Show/hide button

Hidden elements won't be counted when layouting. 
Call `buttons.layout()`, or `topSizer.layout()` after show/hide any button.

- Show button
    ```javascript
    buttons.showButton(index);
    ```
    - `index` : A number index, or a button game object.
- Hide button.
    ```javascript
    buttons.hideButton(index);
    ```
    - `index` : A number index, or a button game object.

### For each button

```javascript
buttons.forEachButtton(callback, scope);
```

- `callback` : 
    ```javascript
    function(button, index, buttonArray) {
        // ...
    }
    ```

### Checkboxes/radio

- Configure buttons to checkboxes/radio
    ```javascript
    var buttons = scene.rexUI.add.buttons({
        buttons: [
            buttonGameObject,
            buttonGameObject,
            // ...
        ],
    
        type: 'checkboxes',
        setValueCallback: function(button, value, previousValue) {
            // ...
        },
        // setValueCallbackScope: undefined
    });
    ```
    - `buttons` : Array of button game objects.
        - Property `name` of each button game object will be used as a key in [`buttons.data`](gameobject.md#private-data)
    - `type` : Set type to `'checkboxes'`, or `'radio'`.
    - `setValueCallback` : Callback to set value of a button.
        ```javascript
        function(button, value) {
            // ...
        }
        ```
        - `button` : Button game object.
        - `value`: `true`, or `false`.
        - `previousValue` : `true`, or `false`.
    - State of a button : Stored in [`buttons.data`](gameobject.md#private-data)

!!! note
    Checkboxes and radio don't support add, remove, show, or hide methods.

#### Checkboxes

- Read state
    ```javascript
    var state = buttons.getData(key);
    ```
    - `key` : `name` property of a button game object. (i.e. `button.name`)
    - `state` : `true`, or `false`
- Set state
    ```javascript
    buttons.setData(key, state);
    ```
    - `key` : `name` property of a button game object. (i.e. `button.name`)
    - `state` : `true`, or `false`

#### Radio

- Read state
    ```javascript
    var value = buttons.value;
    ```
    - `value` : `name` property of a button game object. (i.e. `button.name`)
- Set state
    ```javascript
    buttons.value = key;
    ```
    - `key` : `name` property of a button game object. (i.e. `button.name`)
