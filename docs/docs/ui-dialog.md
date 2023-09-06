## Introduction

A container with a title, content, buttons and background.

- Author: Rex
- Game object

## Live demos

- [Dialog](https://codepen.io/rexrainbow/pen/oQjMWE)
- [Yes-no dialog](https://codepen.io/rexrainbow/pen/MPZWZG)
- [Action buttons with Space](https://codepen.io/rexrainbow/pen/MWvoErY)
- [Radio choices dialog](https://codepen.io/rexrainbow/pen/ePoRVz)
- [Horizontal-radio choices dialog](https://codepen.io/rexrainbow/pen/bGLLVXB)
- [Wrap-radio choices dialog](https://codepen.io/rexrainbow/pen/WNMMvbg)
- [Wrap-checkboxes choices dialog](https://codepen.io/rexrainbow/pen/KKQQpyj)
- [Grid-checkboxes choices dialog](https://codepen.io/rexrainbow/pen/QWQQjJd)
- [Pop-up dialog](https://codepen.io/rexrainbow/pen/NEpjmP)
- [Ease-in, ease-out](https://codepen.io/rexrainbow/pen/qBdQRmq)
- [Show/hide buttons](https://codepen.io/rexrainbow/pen/MWwPabw)
- [Add button](https://codepen.io/rexrainbow/pen/gOpddxa)
- [Wrap label](https://codepen.io/rexrainbow/pen/NWYWMOE)
- [Modal dialog](https://codepen.io/rexrainbow/pen/VwzbqEP)
- [Content sizer](https://codepen.io/rexrainbow/pen/dywOZEa)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-dialog)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add dialog object
    ```javascript
    var dialog = scene.rexUI.add.dialog(config);
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
- Add dialog object
    ```javascript
    var dialog = scene.rexUI.add.dialog(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Dialog } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add dialog object
    ```javascript    
    var dialog = new Dialog(scene, config);
    scene.add.existing(dialog);
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

    toolbarBackground: toolbarBackgroundGameObject,
    toolbar: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],
    
    leftToolbarBackground: leftToolbarBackgroundGameObject,
    leftToolbar: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    content: contentGameObject,

    description: descriptionGameObject,

    choicesType: '',
    // choicesWidth: undefined,
    // choicesHeight: undefined,  // Used when choicesType is `'grid'`, `'grid-radio'`, or `'grid-checkboxes'`
    choicesBackground: choicesBackgroundGameObject,
    choices: [
        buttonGameObject,
        buttonGameObject,
        // ...
    ],

    actionsBackground: actionsBackgroundGameObject,
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
        titleTop: 0,
        
        toolbarItem: 0,
        leftToolbarItem: 0,

        content: 0,
        contentLeft: 0,
        contentRight: 0,

        description: 0,
        descriptionLeft: 0,
        descriptionRight: 0

        choices: 0,
        choicesLeft: 0,
        choicesRight: 0,

        // choiceLine: 0,   // Used when choicesType is `'wrap'`, `'wrap-radio'`, or `'wrap-checkboxes'`
        // choiceColumn: 0, // Used when choicesType is `'grid'`, `'grid-radio'`, or `'grid-checkboxes'`
        // choiceRow: 0,    // Used when choicesType is `'grid'`, `'grid-radio'`, or `'grid-checkboxes'`
        choicesBackgroundLeft: 0,
        choicesBackgroundRight: 0,
        choicesBackgroundTop: 0,
        choicesBackgroundBottom: 0,

        action: 0,
        actionsLeft: 0,
        actionsRight: 0,
        actionsBottom: 0,

    },

    proportion: {
        title: 0,
        content: 0,
        description: 0,
        choices: 0,
        actions: 0,
    },

    expand: {
        title: true,
        content: true,
        description: true,
        choices: true,
        actions: false,
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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of dialog.
- `title` : Game object of title, optional.
- `toolbar` : Array of Game objects for toolbar-buttons group which arranged from left to right, optional.
    - `[]` : Assign an empty array if user will add button later.
- `toolbarBackground` : [Game object of toolbar buttons background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of dialog.
- `leftToolbar` : Array of Game objects for left-toolbar-buttons group which arranged from left to right, optional.
    - `[]` : Assign an empty array if user will add button later.
- `leftToolbarBackground` : [Game object of leftToolbar buttons background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of dialog.
- `content` : Game object of content, optional.
- `description` : Game object of description, optional.
- `choices` : Array of Game objects for choice-buttons group which arranged from top to bottom, optional.
    - Array of Game objects, for [Buttons](ui-buttons.md)/[FixWidthButtons](ui-fixwidthbuttons.md) choices.
        - `[]` : Assign an empty array if user will add button later.
    - 2d Array of Game objects, for [GridButtons](ui-gridbuttons.md) choices..
- `choicesBackground` : [Game object of choices buttons background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of dialog.
- `choicesType` : Sizer type ([Buttons](ui-buttons.md)/[FixWidthButtons](ui-fixwidthbuttons.md)/[GridButtons](ui-gridbuttons.md)) and behavior (`''`/`'radio'`/`'checkboxes'`) of choice buttons.
    - `undefined`, `'x'`, or `'y'` : [Buttons](ui-buttons.md) in vertical/horizontal without any extra behavior, default behavior.
    - `'radio'`, or `'x-radio'` : [Buttons](ui-buttons.md) in vertical/horizontal, with radio behavior.
        - Name of selected button game object (`gameObject.name`) will be returned via method `dialog.setChoicesSelectedButtonName()`.
    - `'checkboxes'`, or `'x-checkboxes'` : [Buttons](ui-buttons.md) in vertical/horizontal, with checkboxes behavior.
        - Name of selected button game object (`gameObject.name`) will be return via method `dialog.getChoicessButtonStates()`.
    - `'wrap'` : [FixWidthButtons](ui-fixwidthbuttons.md) without any extra behavior, default behavior.
    - `'wrap-radio'` : [FixWidthButtons](ui-fixwidthbuttons.md) with radio behavior.
        - Name of Selected button game object (`gameObject.name`) will be returned via method `dialog.setChoicesSelectedButtonName()`
    - `'wrap-checkboxes'` : [FixWidthButtons](ui-fixwidthbuttons.md) with checkboxes behavior.
        - Name of selected button game object (`gameObject.name`) will be return via method `dialog.getChoicessButtonStates()`.
    - `'grid'` : [GridButtons](ui-gridbuttons.md) without any extra behavior, default behavior.
    - `'grid-radio'` : [GridButtons](ui-gridbuttons.md) with radio behavior.
        - Name of Selected button game object (`gameObject.name`) will be returned via method `dialog.setChoicesSelectedButtonName()`
    - `'grid-checkboxes'` : [GridButtons](ui-gridbuttons.md) with checkboxes behavior.
        - Name of selected button game object (`gameObject.name`) will be return via method `dialog.getChoicessButtonStates()`.        
- `choicesWidth`, `choicesHeight` : Minimum width, minimum height of choices.
    - Must assign `choicesHeight` value if using [GridButtons](ui-gridbuttons.md) choices.
- `actions` : Array of Game objects, or Space (`scene.rexUI.add.space()`) for action-buttons group which arranged from left to right, optional.
    - `[]` : Assign an empty array if user will add button later.
- `choicesBackground` : [Game object of choices buttons background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of dialog.
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
    - `space.leftToolbarItem` : Space between each left-toolbar item game objects.
    - `space.choice` : Space between each choice-button game objects.
    - `space.choicesBackgroundLeft`, `space.choicesBackgroundRight`, `space.choicesBackgroundTop`, `space.choicesBackgroundBottom` : Padding space around choices-background. 
    - `space.action` : Space between each action-button game objects.
- `proportion` : Keep height of element, or expand height of element.
    - `proportion.title` : Set to `1` to expand height of title. Default is `0`.
    - `proportion.content` : Set to `1` to expand height of content. Default is `0`.
    - `proportion.description` : Set to `1` to expand height of description. Default is `0`.
    - `proportion.choices` : Set to `1` to expand height of choices. Default is `0`.
    - `proportion.actions` : Set to `1` to expand height of actions. Default is `0`.
- `expand` : Expand width of element
    - `expand.title` : Set `true` to expand width of title game object. Default is `true`.
    - `expand.content` : Set `true` to expand width of content game object. Default is `true`.
    - `expand.description` : Set `true` to expand width of description game object. Default is `true`.
    - `expand.choices` : Set `true` to expand width of choices game object. Default is `true`.
    - `expand.actions` : Set `true` to expand width of actions game object. Default is `false`.
- `align` : Align element
    - `align.title`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value. *Will add Spaces at right and left sides.*
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center. *Will add a Space at right side.*
    - `align.content` : Align content game object to `'left'`/`'center'`/`'right'`, if `expand.content` is `false`.
    - `align.description` : Align description game object to `'left'`/`'center'`/`'right'`, if `expand.description` is `false`.
    - `align.choices` : Align choices game object to `'left'`/`'center'`/`'right'`, if `expand.choices` is `false`.
    - `align.actions` : Align action game objects to `'left'`/`'center'`/`'right'`, if `expand.actions` is `false`.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`..
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyDialog extends RexPlugins.UI.Dialog {
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
    var dialog = new MyDialog(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
dialog.layout();
```

See also - [dirty](ui-basesizer.md#dirty)


### Modal

Pop this dialog as modal dialog, clicking any action button to close this modal dialog.

```javascript
dialog.modal({
    // cover: {
    //     color: 0x0,
    //     alpha: 0.8,
    //     transitIn: function(gameObject, duration) { },
    //     transitOut: function(gameObject, duration) { },
    // },
    // cover: false, 

    // When to close modal dialog?
    // touchOutsideClose: false,
    // anyTouchClose: false,
    // timeOutClose: false,
    // manualClose: false,

    // duration: {
    //     in: 200,
    //     hold: 2000,
    //     out: 200
    // }

    // transitIn: 0,
    // transitOut: 0,

    // destroy: true,

    // defaultBehavior: true,
});
// dialog.modal(config, onClose);
```

or

```javascript
dialog
    .modalPromise(config)
    .then(function(data){
        
    })
```

- `config` : See [Modal behavior](modal.md#create-instance)
    - `config.defaultBehavior` :
        - `undefined`, or `true` : Will close modal dialog when clicking any action button.
        - `false` : Disable default behavior. User has to invoke `dialog.modalClose(data)` manually.
- `onClose` : Callback when closing modal dialog
    ```javascript
    function(data) {
        // var index = data.index;
        // var text = data.text;
        // var button = data.button;
        // var dialog = data.dialog;
    }
    ```
    - `data` : Contains these properties
        - `data.index` : Index of clicking action button
        - `data.text` : `button.text`, this property is valided if button game object is a label.
        - `data.button` : Clicked button game object.
        - `data.dialog` : This dialog game object.


### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Events

- Click button
    ```javascript
    dialog.on('button.click', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    dialog.on('choice.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('action.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('toolbar.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('leftToolbar.click', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, or `'toolbar'`, `'leftToolbar'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-over button
    ```javascript
    dialog.on('button.over', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    dialog.on('choice.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('action.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('toolbar.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('leftToolbar.over', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object
    - `groupName` : `'choices'`, `'actions'`, `'toolbar'`, or `'leftToolbar'`.
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Pointer-out button
    ```javascript
    dialog.on('button.out', function(button, groupName, index, pointer, event) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    dialog.on('choice.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('action.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('toolbar.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('leftToolbar.out', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, `'toolbar'`, or `'leftToolbar'`
    - `index` : Index of triggered button game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Enable button's input
    ```javascript
    dialog.on('button.enable', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    dialog.on('choice.enable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('action.enable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('toolbar.enable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('leftToolbar.enable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, `'toolbar'`, or `'leftToolbar'`
    - `index` : Index of triggered button game object.
- Disable button's input
    ```javascript
    dialog.on('button.disable', function(button, groupName, index) {
        // ...
    }, scope);
    ```
    or
    ```javascript
    dialog.on('choice.disable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('action.disable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('toolbar.disable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    ```javascript
    dialog.on('leftToolbar.disable', function(button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Triggered button game object.
    - `groupName` : `'choices'`, `'actions'`, `'toolbar'`, or `'leftToolbar'`
    - `index` : Index of triggered button game object.

#### Emit button click event

- Emit choice/action/toolbar/left-toolbar button's click event
    ```javascript
    dialog.emitChoiceClick(index);
    dialog.emitActionClick(index);
    dialog.emitToolbarClick(index);
    dialog.emitLeftToolbarClick(index);
    ```
    - `index` : A number index, or a button game object.

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
    - Description game object
        ```javascript
        var description = dialog.getElement('description');
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
    - Action button game object
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
    - Toolbar button game object
        ```javascript
        var buttons = dialog.getElement('toolbar');
        ```
        or
        ```javascript
        var button = dialog.getToolbar(index);
        ```
        or
        ```javascript
        var button = dialog.getElement('toolbar[' + index + ']');
        ```
    - Left-toolbar button game object
        ```javascript
        var buttons = dialog.getElement('leftToolbar');
        ```
        or
        ```javascript
        var button = dialog.getLeftToolbar(index);
        ```
        or
        ```javascript
        var button = dialog.getElement('leftToolbar[' + index + ']');
        ```
- Get by name
    ```javascript
    var gameObject = dialog.getElement('#' + name);
    // var gameObject = dialog.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = dialog.getByName(name);
    // var gameObject = dialog.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Add button

Add choice/action/toolbar/left-toolbar button

```javascript
dialog.addChoice(gameObject);
dialog.addAction(gameObject);
dialog.addToolbar(gameObject);
dialog.addLeftToolbar(gameObject);
```

- `gameObject` : A game object, or an array of game objects.

### Remove button

- Remove a choice/action/toolbar/left-toolbar button
    ```javascript
    dialog.removeChoice(index, destroyChild);
    dialog.removeAction(index, destroyChild);
    dialog.removeToolbar(index, destroyChild);
    dialog.removeLeftToolbar(index, destroyChild);
    ```
    - `index` : A number index, a string name, or a button game object.
    - `destroyChild` : Set `true` to destroy button game object.
- Remove all choice/action/toolbar/left-toolbar buttons
    ```javascript
    dialog.clearChoices(destroyChild);
    dialog.clearActions(destroyChild);
    dialog.clearToolbar(destroyChild);
    dialog.clearLeftToolbar(destroyChild);
    ```
    - `destroyChild` : Set `true` to destroy button game object.

### Enable/disable input of button

- Enable choice/action/toolbar/left-toolbar button
    ```javascript
    dialog.setChoiceEnable(index);
    dialog.setActionEnable(index);
    dialog.setToolbarEnable(index);
    dialog.setLeftToolbarEnable(index);
    ```
    - `index` : A number index, or a button game object.
- Enable all buttons
    ```javascript
    dialog.setAllButtonsEnable();
    ```
- Disable choice/action/toolbar/left-toolbar button's input
    ```javascript
    dialog.setChoiceEnable(index, false);
    dialog.setActionEnable(index, false);
    dialog.setToolbarEnable(index, false);
    dialog.setLeftToolbarEnable(index, false);
    ```
    - `index` : A number index, or a button game object.
- Disable all buttons
    ```javascript
    dialog.setAllButtonsEnable(false);
    ```
- Toggle choice/action/toolbar/left-toolbar button's input
    ```javascript
    dialog.toggleChoiceEnable(index);
    dialog.toggleActionEnable(index);
    dialog.toggleToolbarEnable(index);
    dialog.toggleLeftToolbarEnable(index);
    ```
    - `index` : A number index, or a button game object.
- Get choice/action/toolbar/left-toolbar button's input enable
    ```javascript
    var enabled = dialog.getChoiceEnable(index);
    var enabled = dialog.getActionEnable(index);
    var enabled = dialog.getToolbarEnable(index);
    var enabled = dialog.getLeftToolbarEnable(index);
    ```
    - `index` : A number index, or a button game object.

### Show/hide button

Hidden elements won't be counted when layouting. 
Call `dialog.layout()`, or `topSizer.layout()` after show/hide any button.

- Show choice/action/toolbar/left-toolbar button
    ```javascript
    dialog.showChoice(index);
    dialog.showAction(index);
    dialog.showToolbar(index);
    dialog.showLeftToolbar(index);
    ```
    - `index` : A number index, a string name, or a button game object.
- Hide choice/action/toolbar/left-toolbar button.
    ```javascript
    dialog.hideChoice(index);
    dialog.hideAction(index);
    dialog.hideToolbar(index);
    dialog.hideLeftToolbar(index);
    ```
    - `index` : A number index, a string name, or a button game object.

### For each button

```javascript
dialog.forEachChoice(callback, scope);
dialog.forEachAction(callback, scope);
dialog.forEachToolbar(callback, scope);
dialog.forEachLeftToolbar(callback, scope);
```

- `callback` : 
    ```javascript
    function(button, index, buttons) {
        // ...
    }
    ```

### State of choices buttons

#### Radio

- Read state
    ```javascript
    var value = dialog.getChoicesSelectedButtonName();
    ```
- Set state
    ```javascript
    dialog.setChoicesSelectedButtonName(name);
    ```

#### Checkboxes

- Read states
    ```javascript
    var states = dialog.getChoicesButtonStates();
    ```
    - `states` : `{name: boolean}`
- Set state
    ```javascript
    dialog.setChoicesButtonState(name, state);
    ```
    - `name` : Name of button game object
    - `state` : Set `true` if button is selected
- Clear all states to `false`
    ```javascript
    dialog.clearChoicesButtonStates();
    ```

#### Events

- On button state changed. For Checkboxes/radio
    ```javascript
    dialog.on('button.statechange', function(button, groupName, index, value, previousValue) {
        // ...
    }, scope);
    ```
    - Can be used to replace *setValueCallback*.
