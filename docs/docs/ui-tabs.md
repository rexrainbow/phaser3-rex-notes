## Introduction

A container with 4 groups of buttons around a center panel.

- Author: Rex
- A kind of game object

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

### Add TABS object

```javascript
var tabs = scene.rexUI.add.tabs({
    // Position
    x: 0,
    y: 0,

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
    }

    name: '',
});
```

- `x`, `y` : Position of this grid table object, it is valid when this tabs is the top object.
- `background` : Game object of background, optional. This background game object will be resized to fit the size of grid table.
- `panel` : Game object of center panel.
- `leftButtons`, `rightButtons`, `topButtons`, `bottomButtons` : Array of button game object.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds
    - `space.leftButtonsOffset`, `space.rightButtonsOffset` : Top offset of buttons group.
    - `space.topButtonsOffset`, `space.bottomButtonsOffset` : Left offset of buttons group.
    - `space.leftButton`, `space.rightButton`, `space.topButton`, `space.bottomButton` : Space between 2 button game objects.
- `name` : Set name of this tabs.

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
- `index` : Index of triggered button game object.

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
        - Left buttons
            ```javascript
            var bottons = tabs.getElement('leftButtons');
            ```
        - Right buttons
            ```javascript
            var bottons = tabs.getElement('rightButtons');
            ```
        - Top buttons
            ```javascript
            var bottons = tabs.getElement('topButtons');
            ```
        - Bottom buttons
            ```javascript
            var bottons = tabs.getElement('bottomButtons');
            ```
- Get by name
    ```javascript
    var gameObject = tabs.getElement('#' + name);
    ```
