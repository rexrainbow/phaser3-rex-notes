## Introduction

Enter first name and last name via a [dialog](ui-dialog.md).

- Author: Rex
- Game object

## Live demos

- [Horizontal-layout](https://codepen.io/rexrainbow/pen/LYKPzqZ)
- [Vertical-layout](https://codepen.io/rexrainbow/pen/vYqBebm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-nameinputdialog)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add dialog object
    ```javascript
    var dialog = scene.rexUI.add.nameInputDialog(style).resetDisplayContent(config);
    // var dialog = scene.rexUI.add.nameInputDialog(style, creators).resetDisplayContent(config);
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
    var dialog = scene.rexUI.add.nameInputDialog(style).resetDisplayContent(config);
    // var dialog = scene.rexUI.add.nameInputDialog(style, creators).resetDisplayContent(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { NameInputDialog } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add dialog object
    ```javascript    
    var dialog = new NameInputDialog(scene, config);
    // var dialog = new NameInputDialog(scene, config, creators);
    scene.add.existing(dialog);
    dialog.resetDisplayContent(config);
    ```

### Add dialog object

```javascript
var dialog = scene.rexUI.add.nameInputDialog({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    // Elements
    background: backgroundStyle,
    // background: null,
    
    title: titleStyle,  // SimpleLabelConfig
    // title: null,

    firstNameTitle: titleStyle,  // SimpleLabelConfig
    // firstNameTitle: null,

    firstNameInput: inputTextStyle, // CanvasInputTextConfig

    lastNameTitle: titleStyle,  // SimpleLabelConfig
    // firstNameTitle: null,

    lastNameInput: inputTextStyle, // CanvasInputTextConfig

    content: contentStyle, // SimpleLabelConfig, or TextAreaStyle
    // content: null,

    button: SimpleLabelConfig,

    // Space
    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        title: 0,
        titleLeft: 0,
        titleRight: 0,

        names: 0,
        namesLeft: 0,
        namesRight: 0,
        firstName: 0,
        firstNameTitle: 0,
        lastNamTitle: 0,

        actionsLeft: 0,
        actionsRight: 0,
        action: 0,
    },

    proportion: {
        title: 0,
        actions: 0,
    },

    expand: {
        title: true,
        actions: false,
    },

    align: {
        title: 'center',
        actions: 'center',
    },

    click: {
        mode: 'pointerup',
        clickInterval: 100
    },

    modal: {
        cover: {
            color: 0x0,
            alpha: 0.8,
            transitIn: function(gameObject, duration) { },
            transitOut: function(gameObject, duration) { },
        },
        // cover: false, 

        // When to close modal dialog?
        touchOutsideClose: false,
        anyTouchClose: false,
        timeOutClose: false,
        manualClose: false,

        duration: {
            in: 200,
            hold: 2000,
            out: 200
        }

        transitIn: 0,
        transitOut: 0,

        destroy: true,

        defaultBehavior: true,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,

    // nameInputButtonIndex: 0,
    // cancelButtonIndex: 1,

}, creators);
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
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `background` : 
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Nine-slice, or Image as background element.
    - `null` : Don't create any game object.
- `title`, `firstNameTitle`, `lastNameTitle` : 
    - [Styles of simple-label](ui-style.md#style-of-simplelabel)
    - `null` : Don't create any game object.
- `firstNameInput`, `lastNameInput` :
    - [Styles of canvas-input](ui-style.md#style-of-canvasinput)
- `button` : 
    - [Styles of simple-label](ui-style.md#style-of-simplelabel), optional.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.title` : Space between title game object and below game object.
    - `space.titleLeft`, `space.titleRight` : Extra left/right padding of title game object.
    - `space.names` : Space between names and action buttons.
    - `space.namesLeft`, `space.namesRight` : Extra left/right padding of names.    
    - `space.firstName` : Space between first name and last name.
    - `space.firstNameTitle` : Space between firstNameTitle and firstNameInput.
    - `space.lastNameTitle` : Space between lastNameTitle and lastNameInput.    
    - `space.action` : Space between each action-button game objects.
- `proportion` : Keep height of element, or expand height of element.
    - `proportion.title` : Set to `1` to expand height of title. Default is `0`.
    - `proportion.actions` : Set to `1` to expand height of actions. Default is `0`.
- `expand` : Expand width of element
    - `expand.title` : Set `true` to expand width of title game object. Default is `true`.   
    - `expand.actions` : Set `true` to expand width of actions game object. Default is `false`.
- `align` : Align element
    - `align.title`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value. *Will add Spaces at right and left sides.*
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center. *Will add a Space at right side.*    
    - `align.actions` : Align action game objects to `'left'`/`'center'`/`'right'`, if `expand.actions` is `false`.
- `click`: Configuration of [button clicking](button.md).
    - `click.mode` :
        - `'pointerdown'`, `'press'`, or `0` : Fire 'click' event when touch pressed.
        - `'pointerup'`, `'release'`, or `1` : Fire 'click' event when touch released after pressed.
    - `click.clickInterval` : Interval between 2 'click' events, in ms.
- `modal` : Configuration of [modal](#modal), See [Modal behavior](modal.md#create-instance).
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`..
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).
- `nameInputButtonIndex`, `cancelButtonIndex` : Button index for firing `'nameInput'`, `'cancel'` events. Default values are `0`, `1`.
- `creators` : Callbacks for creating components.
    ```javascript
    {
        background: undefined,
        title: undefined,
        firstNameTitle: undefined,
        lastNameTitle: undefined,
        button: undefined,
    }
    ```
    - `creators.background` : Callback to create background of dialog. Default behavior is creating a [round-rectangle-shape](shape-roundrectangle.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ``` 
    - `creators.title`, `creators.firstNameTitle`, `creators.lastNameTitle`, `creators.button` : Creators of [simple-label](ui-simplelabel.md), included these properties
        ```javascript
        {
            background: undefined,
            text: undefined,
            icon: undefined,
            action: undefined,
        }
        ```

### Custom class

- Define class
    ```javascript
    class MyDialog extends RexPlugins.UI.NameInputDialog {
        constructor(scene, config, creators) {
            super(scene, config, creators);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var dialog = new MyDialog(scene, config, creators);
    ```

### Reset display content

```javascript
dialog.resetDisplayContent({
    title: '',
    firstNameTitle: '',
    lastNameTitle: '',
    button: '',

    firstName: '',
    lastName: '',
});
```

or

```javascript
dialog.resetDisplayContent({
    title: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    firstNameTitle: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    lastNameTitle: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    button: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    firstName: '',

    lastName: ''
});
```

- `title`, `firstNameTitle`, `lastNameTitle` : Display content
    - A string : Set text of simple lable
    - Configuration of [`simpleLabel.resetDisplayContent(config)`](ui-simplelabel.md#reset-display-content) : Set icon, text, action icon of simple label.
    - `null` : Hide `title` or `firstNameTitle`, `lastNameTitle` element.
- `button` : Display content
    - A string : Set text of simple lable
    - Configuration of [`simpleLabel.resetDisplayContent(config)`](ui-simplelabel.md#reset-display-content) : Set icon, text, action icon of simple label.
- `firstName`, `lastNmae` : A string

Run `dialog.layout()` after this method, to layout children again.

### Layout children

Arrange position of all elements.

```javascript
dialog.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Modal

Pop this dialog as modal dialog, close this modal dialog when clicking action button. 


```javascript
dialog.modal(onClose);  // Use default modal config
```

or

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

    // destroy: true
}, onClose);
```

or

```javascript
dialog
    .modalPromise(config)
    .then(function(data){
        var firstName = data.firstName;
        var lastName = data.lastName;
    })
```

- `config` : See [Modal behavior](modal.md#create-instance)
    - `config.defaultBehavior` :
        - `undefined`, or `true` : Will close modal dialog when clicking any action button.
        - `false` : Disable default behavior.
- `onClose` : Callback when closing modal dialog
    ```javascript
    function(data) {
        var firstName = data.firstName;
        var lastName = data.lastName;
    }
    ```
    - `data` : Contains these properties
        - `data.firstName` : Enter string of firstNameInput.
        - `data.lastName` : Enter string of lastNameInput.

### Names input

- First name
    - Get
        ```javascript
        var firstName = dialog.firstName;
        ```
    - Set
        ```javascript
        dialog.setFirstName(value);
        // data.firstName = value;
        ```
- Last name
    - Get
        ```javascript
        var lastName = dialog.lastName;
        ```
    - Set
        ```javascript
        dialog.setLastName(value);
        // data.lastName = value;
        ```

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
    - FirstName-title game object
        ```javascript
        var firstNameTitle = dialog.getElement('firstNameTitle');
        ```
    - FirstName-input game object
        ```javascript
        var firstNameInput = dialog.getElement('firstNameInput');
        ```
    - LastName-title game object
        ```javascript
        var lastNameTitle = dialog.getElement('lastNameTitle');
        ```
    - LastName-input game object
        ```javascript
        var lastNameInput = dialog.getElement('lastNameInput');
        ```
    - Button game object
        ```javascript
        var button = dialog.getElement('button');
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


### Other properties

See [dialog](ui-dialog.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Events

- Click confirm button
    ```javascript
    dialog.on('confirm', function (data) {
        var firstName = data.firstName;
        var lastName = data.lastName;
      }, scope);
    ```
    - `data` : See [modal](ui-nameInputdialog.md#modal)
