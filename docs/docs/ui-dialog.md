## Introduction

A container with a title, content, buttons and background.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/ui-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexuiplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/ui/dialog/Dialog.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-dialog)

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

### Add dialog object

```javascript
var dialog = scene.rexUI.add.dialog({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // Elements
    background: backgroundGameObject,

    title: titleGameObject,

    toolbar: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    content: contentGameObject,

    description: descriptionGameObject,

    choices: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    actions: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    // Space
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        title: 0,
        titleLeft: 0,
        titleRight: 0,
        content: 0,
        contentLeft: 0,
        contentRight: 0,
        description: 0,
        descriptionLeft: 0,
        descriptionRight: 0
        choices: 0,
        choicesLeft: 0,
        choicesRight: 0,
        actionsLeft: 0,
        actionsRight: 0,

        toolbarItem: 0,
        choice: 0,
        action: 0,
    },

    expand: {
        title: true,
        content: true,
        description: true,
        choices: true,
        actions: true,
    },

    align: {
        title: 'center',
        content: 'center',
        description: 'center',
        choices: 'center',
        actions: 'center',
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
- `background` : Game object of background, optional. This background game object will be resized to fit the size of dialog.
- `title` : Game object of title, optional.
- `toolbar` : Array of Game objects for toolbar-buttons group which arranged from left to right, optional.
- `content` : Game object of content, optional.
- `description` : Game object of description, optional.
- `choices` : Array of Game objects for choice-buttons group which arranged from top to bottom, optional.
- `actions` : Array of Game objects for action-buttons group which arranged from left to right, optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.title` : Space between title game object and below game object.
    - `space.titleLeft`, `space.titleRight` : Extra left/right padding of title game object.
    - `space.content` : Space between content game object and below game object.
    - `space.contentLeft`, `space.contentRight` : Extra left/right padding of content game object.
    - `space.description` : Space between description game object and below game object.
    - `space.descriptionLeft`, `space.descriptionRight` : Extra left/right padding of description game object.
    - `space.choices` : Space between last choice-button and below game object.
    - `space.choicesLeft`, `space.choicesRight` : Extra left/right padding of choice buttons.
    - `space.actionsLeft`, `space.actionsRight` : Extra left/right padding of actions buttons.
    - `space.toolbarItem` : Space between each toolbar item game objects.
    - `space.choice` : Space between each choice-button game objects.
    - `space.action` : Space between each action-button game objects.
- `expand` : Expand width of element
    - `expand.title` : Set `true` to expand width of title game object.
    - `expand.content`
    - `expand.description`
    - `expand.choices`
    - `expand.actions`
- `align` : Align element
    - `align.title`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value.
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center.
    - `align.content`
    - `align.description`
    - `align.choices`
    - `align.actions` : Alignment of action-buttons.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `name` : Set name of this dialog.

### Custom class

- Define class
    ```javascript
    class MyDialog extends RexPlugins.UI.Dialog {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var dialog = new MyDialog(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
dialog.layout();
```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).

### Events

- Click button
    ```javascript
    dialog.on('button.click', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, or `'toolbar'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-over button
    ```javascript
    dialog.on('button.over', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : `'choices'`, `'actions'`, or `'toolbar'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-out button
    ```javascript
    dialog.on('button.out', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, or `'toolbar'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`

#### Emit button click event

- Emit action/choice button click event
    ```javascript
    dialog.emitChoiceClick(index);
    dialog.emitActionClick(index);
    ```
    - `index` : Index of triggered button game object, or a button game object.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = dialog.getElement('background');
        ```
    - Title game object
        ```javascript
        var title = dialog.getElement('title');
        ```
    - Content game object
        ```javascript
        var content = dialog.getElement('content');
        ```
    - Choice button game object
        ```javascript
        var buttons = dialog.getElement('choices');
        ```
        or
        ```javascript
        var button = dialog.getChoice(index);
        ```
        or
        ```javascript
        var button = dialog.getElement('choices[' + index + ']');
        ```
    - Acrion button game object
        ```javascript
        var buttons = dialog.getElement('actions');
        ```
        or
        ```javascript
        var button = dialog.getAction(index);
        ```
        or
        ```javascript
        var button = dialog.getElement('actions[' + index + ']');
        ```        
- Get by name
    ```javascript
    var gameObject = dialog.getElement('#' + name);
    ```

### Show/hide button

Hidden elements won't be counted when layouting. 
Call `dialog.layout()`, or `topSizer.layout()` after show/hide any button.

- Show choice/action button
    ```javascript
    dialog.showChoice(index);
    dialog.showAction(index);
    ```
    - `index` : A number index, or a button game object.
- Hide action/choice button.
    ```javascript
    dialog.hideChoice(index);
    dialog.hideAction(index);
    ```
    - `index` : A number index, or a button game object.

### For each button

```javascript
dialog.forEachChoice(callback, scope);
dialog.forEachAction(callback, scope);
```

- `callback` : 
    ```javascript
    function(button, index, buttons) {
        // ...
    }
    ```