## Introduction

A container with a group of buttons.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/buttons/Buttons.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-buttons)

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

### Add Buttons object

```javascript
var buttons = scene.rexUI.add.buttons({
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
    orientation: 0,

    // Elements
    background: backgroundGameObject,

    buttons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    groupName: undefined,
    align: undefined,
    click: {
        mode: 'pointerup',
        clickInterval: 100
    }

    space: 0,

    name: '',
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
- `width`, `height` : Minimum width, minimum height.
- `orientation` : Main orientation of button game objects.
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Arrange button game objects from left ot right.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Arrange button game objects from top to bottom.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of grid table.
- `buttons` : Array of button game objects.
- `groupName` : Group name of these button game objects, used in triggered events. Set to `undefined` to ignore this parameter in event callback.
- `align` : Alignment of these button game objects.
    - `undefined`, or `'left'`, or `'top'` : Align game object at left, or top.
    - `'center'` : Align game object at center.
    - `'right'`, or `'bottom'` : Align game object at right, or bottom.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `space` : Spaces between 2 button game objects.
- `name` : Set name of this button game objects.

### Custom class

- Define class
    ```javascript
    class MyButtons extends RexPlugins.UI.Buttons {
        constructor(scene, config) {
            super(scene, config);
            // ...
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
    buttons.on('button.click', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.click', function(button, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : Group name defined in constructor configuration. Set to `undefined` to ignore this parameter in event callback.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
- Pointer-over button
    ```javascript
    buttons.on('button.over', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.over', function(button, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : Group name defined in constructor configuration. Set to `undefined` to ignore this parameter in event callback.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
- Pointer-out button
    ```javascript
    buttons.on('button.out', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    buttons.on('button.out', function(button, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : Group name defined in constructor configuration. Set to `undefined` to ignore this parameter in event callback.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.

#### Emit button click event

```javascript
buttons.emitButtonClick(index);
```

- `index` : Index of triggered button game object, or a button game object.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = buttons.getElement('background');
        ```
    - Button game objects
        ```javascript
        var bottons = buttons.getElement('buttons');
        ```
        or
        ```javascript
        var button = buttons.getButton(index);
        ```
        or
        ```javascript
        var botton = buttons.getElement('buttons[0]'); // First button
        ```
- Get by name
    ```javascript
    var gameObject = buttons.getElement('#' + name);
    ```

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
    function(button, index, buttons) {
        // ...
    }
    ```