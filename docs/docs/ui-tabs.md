## Introduction

A container with 4 groups of buttons around a center panel.

- Author: Rex
- Game object

## Live demos

- [Tabs](https://codepen.io/rexrainbow/pen/qJeVza)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-tabs)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add tabs object
    ```javascript
    var tabs = scene.rexUI.add.tabs(config);
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
- Add tabs object
    ```javascript
    var tabs = scene.rexUI.add.tabs(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Tabs } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add tabs object
    ```javascript    
    var tabs = new Tabs(scene, config);
    scene.add.existing(tabs);
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
    leftButtonsBackground: leftButtonsBackgroundGameObject,
    rightButtonsBackground: rightButtonsBackgroundGameObject,
    topButtonsBackground: topButtonsBackgroundGameObject,
    bottomButtonsBackground: bottomButtonsBackgroundGameObject,

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
    // draggable: false,
    // sizerEvents: false,
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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of grid table.
- `panel` : Game object of center panel.
- `leftButtons`, `rightButtons`, `topButtons`, `bottomButtons` : Array of button game object.
    - `[]` : Assign an empty array if user will add button later.
- `leftButtonsBackground`, `rightButtonsBackground`, `topButtonsBackground`, `bottomButtonsBackground` : Game object of leftButtons' background, rightButtons' background, topButtons' background, bottomButtons' background, optional.
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
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyTabs extends RexPlugins.UI.Tabs {
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
    var tabs = new MyTabs(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
tabs.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

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
- Enable button's input
    ```javascript
    tabs.on('button.enable', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.
- Disable button's input
    ```javascript
    tabs.on('button.disalbe', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.

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

#### Enable/disable input of button

- Enable button input in a given group
    ```javascript
    tabs.setButtonEnable(groupName, index);
    // tabs.setButtonEnable(groupName, index, true);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.
- Enable left/right/top/bottom button
    ```javascript
    tabs.setLeftButtonEnable(index);
    tabs.setRightButtonEnable(index);
    tabs.setTopButtonEnable(index);
    tabs.setBottomButtonEnable(index);
    ```
    - `index` : A number index, or a button game object.
- Disable button input in a given group
    ```javascript
    tabs.setButtonEnable(groupName, index, false);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.
- Disable choice/action/toolbar/left-toolbar button's input
    ```javascript
    tabs.setLeftButtonEnable(index, false);
    tabs.setRightButtonEnable(index, false);
    tabs.setTopButtonEnable(index, false);
    tabs.setBottomButtonEnable(index, false);
    ```
    - `index` : A number index, or a button game object.
- Toggle button input in a given group
    ```javascript
    tabs.toggleButtonEnable(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.    
- Toggle choice/action/toolbar/left-toolbar button's input
    ```javascript
    tabs.toggleLeftButtonEnable(index);
    tabs.toggleRightButtonEnable(index);
    tabs.toggleTopButtonEnable(index);
    tabs.toggleBottomButtonEnable(index);
    ```
    - `index` : A number index, or a button game object.
- Get button input enable in a given group
    ```javascript
    var enabled = tabs.getButtonEnable(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object.  
- Get choice/action/toolbar/left-toolbar button's input enable
    ```javascript
    var enabled = tabs.getLeftButtonEnable(index);
    var enabled = tabs.getRightButtonEnable(index);
    var enabled = tabs.getTopButtonEnable(index);
    var enabled = tabs.getBottomButtonEnable(index);
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
        - Button game object in a group
            ```javascript
            var bottons = tabs.getButton(groupName, index)
            ```
            - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
            - `index` : A number index.
        - Left button game object
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
        - Right button game object
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
        - Top button game object
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
        - Bottom button game object
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
    // var gameObject = tabs.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = tabs.getByName('#' + name);
    // var gameObject = tabs.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Add button

- Add button in a group
    ```javascript
    tabs.addButton(groupName, gameObject);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `gameObject` : A game object, or an array of game objects.
- Add left/right/top/bottom button
    ```javascript
    tabs.addLeftButton(gameObject);
    tabs.addRightButton(gameObject);
    tabs.addTopButton(gameObject);
    tabs.addBottomButton(gameObject);
    ```
    - `gameObject` : A game object, or an array of game objects.

### Remove button

- Remove a button from a group
    ```javascript
    tabls.removeButton(groupName, index, destroyChild);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, a string name, or a button game object.
    - `destroyChild` : Set `true` to destroy button game object.
- Remove left/right/top/bottom button
    ```javascript
    tabs.removeLeftButton(index, destroyChild);
    tabs.removeRightButton(index, destroyChild);
    tabs.removeTopButton(index, destroyChild);
    tabs.removeBottomButton(index, destroyChild);
    ```
    - `index` : A number index, a string name, or a button game object.
    - `destroyChild` : Set `true` to destroy button game object.
- Remove all buttons of a group
    ```javascript
    tabls.clearButtons(groupName, destroyChild);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `destroyChild` : Set `true` to destroy button game objects.
- Remove all left/right/top/bottom buttons
    ```javascript
    tabs.clearLeftButtons(destroyChild);
    tabs.clearRightButtons(destroyChild);
    tabs.clearTopButtons(destroyChild);
    tabs.clearBottomButtosn(destroyChild);
    ```
    - `destroyChild` : Set `true` to destroy button game objects.

### Show/hide button

Hidden elements won't be counted when layouting. 
Call `tabs.layout()`, or `topSizer.layout()` after show/hide any button.

- Show button in a group
    ```javascript
    tabs.showButton(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, a string name, or a button game object.
- Show left/right/top/bottom button
    ```javascript
    tabs.showLeftButton(index);
    tabs.showRightButton(index);
    tabs.showTopButton(index);
    tabs.showBottomButton(index);
    ```
    - `index` : A number index, a string name, or a button game object.
- Hide button in a group
    ```javascript
    tabs.hideButton(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, a string name, or a button game object.
- Hide left/right/top/bottom button.
    ```javascript
    tabs.hideLeftButton(index);
    tabs.hideRightButton(index);
    tabs.hideTopButton(index);
    tabs.hideBottomButton(index);
    ```
    - `index` : A number index, a string name, or a button game object.

### For each button

- For each button in a group
    ```javascript
    var enabled = tabs.forEachButton(groupName, index);
    ```
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : A number index, or a button game object. 
- For each button in left/right/top/bottom group
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