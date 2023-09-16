## Introduction

Using json style to create confirm [dialog](ui-dialog.md), composed of [simple-label](ui-simplelabel.md) title, [simple-label](ui-simplelabel.md) content, with [simple-label](ui-simplelabel.md) 0, 1, or 2 action button(s).

- Author: Rex
- Game object

## Live demos

- [Yes-no buttons](https://codepen.io/rexrainbow/pen/zYLbNzb)
- [Ok button](https://codepen.io/rexrainbow/pen/poZYRVO)
- [Any-touch closing](https://codepen.io/rexrainbow/pen/jOpJyRe)
- [TextArea content](https://codepen.io/rexrainbow/pen/mdGdypN)
- [Radio-choices](https://codepen.io/rexrainbow/pen/GRXOqwJ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-confirmdialog)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add dialog object
    ```javascript
    var dialog = scene.rexUI.add.confirmDialog(style).resetDisplayContent(config);
    // var dialog = scene.rexUI.add.confirmDialog(style, creators).resetDisplayContent(config);
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
    var dialog = scene.rexUI.add.confirmDialog(style).resetDisplayContent(config);
    // var dialog = scene.rexUI.add.confirmDialog(style, creators).resetDisplayContent(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ConfirmDialog } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add dialog object
    ```javascript    
    var dialog = new ConfirmDialog(scene, config);
    // var dialog = new ConfirmDialog(scene, config, creators);
    scene.add.existing(dialog);
    dialog.resetDisplayContent(config);
    ```

### Add dialog object

```javascript
var dialog = scene.rexUI.add.confirmDialog({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    // Elements
    background: {
        radius: 0,
        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
        color: undefined,
        alpha: undefined,
        strokeColor: undefined,
        strokeAlpha: undefined,
        strokeWidth: undefined,
    },

    // SimpleLabelConfig
    title: {
        // width: undefined,
        // height: undefined,
    
        orientation: 0,
        // rtl: false,
    
        background: {
            radius: 0,
            // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
        
            color: undefined,
            alpha: undefined,
            strokeColor: undefined,
            strokeAlpha: undefined,
            strokeWidth: undefined,
        },
        
        // iconMask: false,
        // squareFitIcon: false,
        // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,
    
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
        // expandTextWidth: false,
        // expandTextHeight: false,
    
        // squareFitAction: false,
        // actionMask: false,
        // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,
    
        space: {
            left: 0, right: 0, top: 0, bottom:0, 
            icon: 0, text: 0
        }
    
        align: undefined,  // 'left' | 'top' | 'right' | 'bottom' | 'center        
    },

    content: SimpleLabelConfig,

    /* TextArea
    content: {
        space: { left: 0, right: 0, top: 0, bottom: 0, text: 0, },

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

        // textWidth: undefined,
        // textHeight: undefined,
        // textMask: false,
        // alwaysScrollable: false,

        slider: {
            track: { 
                width: 1, height: 1,
                radius: 0, 
                color: undefined, alpha: 1,
                strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
                shape: undefined
            },

            thumb: { 
                width: 1, height: 1,
                radius: 0, 
                color: undefined, alpha: 1,
                strokeColor: undefined, strokeAlpha: 1, strokeWidth: 2,
                shape: undefined
            },

            // input: 'drag',
            // position: 'right',

            // hideUnscrollableSlider: false,
            // adaptThumbSize: false,
            // minThumbSize: undefined,
        },

        // scroller: {
        //     threshold: 10,
        //     slidingDeceleration: 5000,
        //     backDeceleration: 2000,
        //     pointerOutRelease: true,
        //     dragRate: 1,
        // },

        mouseWheelScroller: false,
        // mouseWheelScroller: {
        //     focus: true,
        //     speed: 0.1
        // },

        clamplChildOY: false,
    }
    */

    buttonMode: 0,  // 0|1|2

    button: SimpleLabelConfig,
    // buttonA: SimpleLabelConfig
    // buttonB: SimpleLabelConfig
    
    // choice: SimpleLabelConfig,
    // choicesType
    // choicesWidth: undefined,
    // choicesHeight: undefined,

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

        actionsLeft: 0,
        actionsRight: 0,
        action: 0,

        choices: 0,
        choicesLeft: 0,
        choicesRight: 0,
        choice: 0,
        choiceLine: 0,
        choiceColumn: 0, choiceRow: 0,
        choicesBackgroundLeft: 0,
        choicesBackgroundRight: 0,
        choicesBackgroundTop: 0,
        choicesBackgroundBottom: 0,
    },

    proportion: {
        title: 0,
        content: 0,
        actions: 0,
        choices: 0,
    },

    expand: {
        title: true,
        content: true,
        actions: false,
        choices: true,
    },

    align: {
        title: 'center',
        content: 'center',
        actions: 'center',
        choices: 'center',
    },

    click: {
        mode: 'pointerup',
        clickInterval: 100
    }

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
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
- `background` : [Styles of simple-label](ui-simplelabel.md#add-label-object)
- `title` : [Styles of simple-label](ui-simplelabel.md#add-label-object)
- `content` : [Styles of simple-label](ui-simplelabel.md#add-label-object), or [TextArea](ui-textarea.md#add-text-area-object)
    - Style with `slider`, or `scroller` properties : [TextArea](ui-textarea.md#add-text-area-object)
    - Otherwise : [SimpleLabel](ui-simplelabel.md#add-label-object)
- `buttonMode` : `0`, `1`, or `2`
    - `0` : No action button, any touch can close modal dialog
    - `1`, `2` : Dialog with 1 or 2 action buttons, clicking any action button to close modal dialog.
- `button` : [Styles of simple-label](ui-simplelabel.md#add-label-object), optional.
- `choice` : [Styles of simple-label](ui-simplelabel.md#add-label-object), optional.
- `choicesType` : Sizer type ([Buttons](ui-buttons.md)/[FixWidthButtons](ui-fixwidthbuttons.md)/[GridButtons](ui-gridbuttons.md)) and behavior (`''`/`'radio'`/`'checkboxes'`) of choice buttons.
    - `undefined`, `''`, or `'y'` : [Buttons](ui-buttons.md) in vertical/horizontal without any extra behavior, default behavior.
    - `'radio'`, or `'x-radio'` : [Buttons](ui-buttons.md) in vertical/horizontal, with radio behavior.
        - Name of selected button game object (`gameObject.name`) will be returned via method `dialog.setChoicesSelectedButtonName()`.
    - `'checkboxes'`, or `'x-checkboxes'` : [Buttons](ui-buttons.md) in vertical/horizontal, with checkboxes behavior.
        - Name of selected button game object (`gameObject.name`) will be return via method `dialog.getChoicessButtonStates()`.
    - `'wrap'` : [FixWidthButtons](ui-fixwidthbuttons.md) without any extra behavior, default behavior.
    - `'wrap-radio'` : [FixWidthButtons](ui-fixwidthbuttons.md) with radio behavior.
        - Name of Selected button game object (`gameObject.name`) will be returned via method `dialog.setChoicesSelectedButtonName()`
    - `'wrap-checkboxes'` : [FixWidthButtons](ui-fixwidthbuttons.md) with checkboxes behavior.
        - Name of selected button game object (`gameObject.name`) will be return via method `dialog.getChoicessButtonStates()`.    
- `choicesWidth`, `choicesHeight` : Minimum width, minimum height of choices.
    - Must assign `choicesHeight` value if using [GridButtons](ui-gridbuttons.md) choices.
- `space` : Pads spaces
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.title` : Space between title game object and below game object.
    - `space.titleLeft`, `space.titleRight` : Extra left/right padding of title game object.
    - `space.content` : Space between content game object and below game object.
    - `space.contentLeft`, `space.contentRight` : Extra left/right padding of content game object.        
    - `space.action` : Space between each action-button game objects.
- `proportion` : Keep height of element, or expand height of element.
    - `proportion.title` : Set to `1` to expand height of title. Default is `0`.
    - `proportion.content` : Set to `1` to expand height of content. Default is `0`.    
    - `proportion.actions` : Set to `1` to expand height of actions. Default is `0`.
- `expand` : Expand width of element
    - `expand.title` : Set `true` to expand width of title game object. Default is `true`.
    - `expand.content` : Set `true` to expand width of content game object. Default is `true`.    
    - `expand.actions` : Set `true` to expand width of actions game object. Default is `false`.
- `align` : Align element
    - `align.title`
        - `'center'`, or `Phaser.Display.Align.CENTER` : Align game object at center. Default value. *Will add Spaces at right and left sides.*
        - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align game object at left-center.
        - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game object at right-center. *Will add a Space at right side.*
    - `align.content` : Align content game object to `'left'`/`'center'`/`'right'`, if `expand.content` is `false`.    
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
- `creators` : Callbacks for creating components.
    ```javascript
    {
        background: undefined,
        title: undefined,
        content: undefined,
        button: undefined,
        buttonA: undefined,
        buttonB: undefined,
    }
    ```
    - `creators.background` : Callback to create background of dialog. Default behavior is creating a [round-rectangle-shape](shape-roundrectangle.md).
        ```javascript
        function(scene, config)  {
            return gameObject;
        }
        ``` 
    - `creators.title`, `creators.content`, `creators.button`, `creators.buttonA`, `creators.buttonB` : Creators of [simple-label](ui-simplelabel.md), included these properties
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
    class MyDialog extends RexPlugins.UI.ConfirmDialog {
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
    content: '',
    buttonA: '',
    buttonB: '',
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

    content: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    buttonA: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    buttonB: {
        text: '',
    
        icon: undefined, iconFrame: undefined,
        iconSize: undefined,
    
        action: undefined, actionFrame: undefined,
        actionSize: undefined,
    
    },

    choices: [
        {
            text: '', value: undefined,
    
            icon: undefined, iconFrame: undefined,
            iconSize: undefined,
    
            action: undefined, actionFrame: undefined,
            actionSize: undefined,
        },        
        // ...
    ]
});
```

- `title`, `content`,`buttonA`, `buttonB` : Display content
    - A string : Set text of simple lable
    - Configuration of [`simpleLabel.resetDisplayContent(config)`](ui-simplelabel.md#reset-display-content) : Set icon, text, action icon of simple label.
- `choices` : Array of display content
    - A string : Set text of simple lable, also use this string as option value.
    - Configuration of [`simpleLabel.resetDisplayContent(config)`](ui-simplelabel.md#reset-display-content) : Set icon, text, action icon of simple label.
        - Property `value` : Option value.

Run `dialog.layout()` after this method, to layout children again.

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

    // destroy: true
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
        - `false` : Disable default behavior.
- `onClose` : Callback when closing modal dialog
    ```javascript
    function(data) {
        // var index = data.index;
        // var text = data.text;
        // var value = data.value;
        // var button = data.button;
        // var dialog = data.dialog;
    }
    ```
    - `data` : Contains these properties
        - `data.index` : Index of clicking action button
        - `data.text` : `button.text`, this property is valided if button game object is a label.
        - `data.value` :
            - A single value : Return selected value, if `choicesType` is `'radio'`
            - A dictionary contains `{value: boolean}` : Return selected values, if `choicesType` is `'checkboxes'`
            - `undefined` : Default value
        - `data.button` : Clicked button game object.
        - `data.dialog` : This dialog game object.

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
    - Buttons game object
        ```javascript
        var buttonA = dialog.getElement('buttonA');
        var buttonB = dialog.getElement('buttonB');
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
