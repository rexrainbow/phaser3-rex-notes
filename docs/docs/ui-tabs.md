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
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,

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

    name: '',
});
```

- `x`, `y` : Position of this dialog object, it is valid when this dialog is the top object.
    - Number : World position in pixels.
    - String (`'p%+n'`) : Position based on visible window. See [anchor](anchor.md#create-instance).
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

See [grid sizer object](ui-gridsizer.md)

### Events

- Click button
    ```javascript
    tabs.on('button.click', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.
- Pointer-over button
    ```javascript
    tabs.on('button.over', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object
- Pointer-out button
    ```javascript
    tabs.on('button.out', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
    - `index` : Index of triggered button game object.

#### Emit button click event

```javascript
tabs.emitButtonClick(groupName, index);
```

- `groupName` : `'left'`, `'right'`, `'top'`, or `'bottom'`.
- `index` : Index of triggered button game object, or a button game object.

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
            var bottons = tabs.getElement('leftButtons[0]');
            ```
            - First button of left buttons.
        - Right button game objects
            ```javascript
            var bottons = tabs.getElement('rightButtons');
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
            var bottons = tabs.getElement('topButtons[0]');
            ```
            - First button of top buttons.
        - Bottom button game objects
            ```javascript
            var bottons = tabs.getElement('bottomButtons');
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
