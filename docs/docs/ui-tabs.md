## Introduction

A container with 4 groups of buttons around a center panel.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/tabs/Tabs.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-tabs)

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

### Add Tabs object

```javascript
var tabs = scene.rexUI.add.tabs({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // Elements
    background: backgroundGameObject,
    panel: panelGameObject,

    leftButtons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    rightButtons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    topButtons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    bottomButtons: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        leftButtonsOffset: 0,
        rightButtonsOffset: 0,
        topButtonsOffset: 0,
        bottomButtonsOffset: 0,

        leftButton: 0,
        rightButton: 0,
        topButton: 0,
        bottomButton: 0
    },

    click: {
        mode: 'pointerup',
        clickInterval: 100
    }

    // name: '',
    // draggable: false
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
- `background` : Game object of background, optional. This background game object will be resized to fit the size of grid table.
- `panel` : Game object of center panel.
- `leftButtons`, `rightButtons`, `topButtons`, `bottomButtons` : Array of button game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.leftButtonsOffset`, `space.rightButtonsOffset` : Top offset of buttons group.
    - `space.topButtonsOffset`, `space.bottomButtonsOffset` : Left offset of buttons group.
    - `space.leftButton`, `space.rightButton`, `space.topButton`, `space.bottomButton` : Space between 2 button game objects.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `name` : Set name of this tabs.

### Custom class

- Define class
    ```javascript
    class MyTabs extends RexPlugins.UI.Tabs {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var tabs = new MyTabs(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
tabs.layout();
```

### Other properties

See [grid sizer object](ui-gridsizer.md), [base-sizer object](ui-basesizer.md).

### Events

- Click button
    ```javascript
    tabs.on('button.click', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
- Pointer-over button
    ```javascript
    tabs.on('button.over', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
- Pointer-out button
    ```javascript
    tabs.on('button.out', function(button, groupName, index, pointer) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.

#### Emit button click event

- Emit button click event in a given group
    ```javascript
    tabs.emitButtonClick(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.
- Emit left/right/top/bottom button click event
    ```javascript
    tabs.emitLeftButtonClick(index);
    tabs.emitRightButtonClick(index);
    tabs.emitTopButtonClick(index);
    tabs.emitBottomButtonClick(index);
    ```
    - `index` : A number index, or a button game object.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = tabs.getElement('background');
        ```
    - Panel game object
        ```javascript
        var panel = tabs.getElement('panel');
        ```
    - Buttons
        - Left button game objects
            ```javascript
            var bottons = tabs.getElement('leftButtons');
            ```
            or
            ```javascript
            var botton = tabs.getLeftButton(index);
            ```
            or
            ```javascript
            var bottons = tabs.getElement('leftButtons[0]');
            ```
            - First button of left buttons.
        - Right button game objects
            ```javascript
            var bottons = tabs.getElement('rightButtons');
            ```
            or
            ```javascript
            var botton = tabs.getRightButton(index);
            ```
            or
            ```javascript
            var bottons = tabs.getElement('rightButtons[0]');
            ```
            - First button of right buttons.
        - Top button game objects
            ```javascript
            var bottons = tabs.getElement('topButtons');
            ```
            or
            ```javascript
            var botton = tabs.getTopButton(index);
            ```
            or
            ```javascript
            var bottons = tabs.getElement('topButtons[0]');
            ```
            - First button of top buttons.
        - Bottom button game objects
            ```javascript
            var bottons = tabs.getElement('bottomButtons');
            ```
            or
            ```javascript
            var botton = tabs.getBottomButton(index);
            ```
            or
            ```javascript
            var bottons = tabs.getElement('bottomButtons[0]');
            ```
            - First button of bottom buttons.
- Get by name
    ```javascript
    var gameObject = tabs.getElement('#' + name);
    ```

### Show/hide button

Hidden elements won't be counted when layouting. 
Call `tabs.layout()`, or `topSizer.layout()` after show/hide any button.

- Show button in a group
    ```javascript
    tabs.showButton(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.
- Show left/right/top/bottom button
    ```javascript
    tabs.showLeftButton(index);
    tabs.showRightButton(index);
    tabs.showTopButton(index);
    tabs.showBottomButton(index);
    ```
    - `index` : A number index, or a button game object.
- Hide button in a group
    ```javascript
    tabs.hideButton(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.
- Hide left/right/top/bottom button.
    ```javascript
    tabs.hideLeftButton(index);
    tabs.hideRightButton(index);
    tabs.hideTopButton(index);
    tabs.hideBottomButton(index);
    ```
    - `index` : A number index, or a button game object.

### For each button

```javascript
tabs.forEachLeftButton(callback, scope);
tabs.forEachRightButton(callback, scope);
tabs.forEachTopButton(callback, scope);
tabs.forEachBottomButton(callback, scope);
```

- `callback` : 
    ```javascript
    function(button, index, buttons) {
        // ...
    }
    ```