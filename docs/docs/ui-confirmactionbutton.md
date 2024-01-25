## Introduction

Click this [label](ui-label.md) to invoke [ConfirmAction](ui-confirmaction.md). It will 
create a [modal confirm dialog](ui-confirmdialog.md) temporary, invoke callback after clicking button.

- Author: Rex
- Game object

## Live demos

- [Open page](https://codepen.io/rexrainbow/pen/ExMwoEz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-confirmactionbutton)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add button object
    ```javascript
    var button = scene.rexUI.add.confirmActionButton(config);
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
- Add button object
    ```javascript
    var button = scene.rexUI.add.confirmActionButton(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ConfirmActionButton } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add button object
    ```javascript
    var button = new ConfirmActionButton(scene, config);
    scene.add.existing(button);
    ```

### Add button object

```javascript
var button = scene.rexUI.confirmActionButton({
    // Parameters of Label


    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,
    // rtl: false,

    background: backgroundGameObject,

    icon: iconGameObject,
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,
    
    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,

    action: actionGameObject,
    // actionMask: false,
    // squareFitAction: false,
    // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,

    align: undefined,

    space: {
        left: 0, right: 0, top: 0, bottom: 0,

        icon: 0, 
        iconTop: 0, iconBottom: 0, iconLeft: 0, iconRight: 0,

        text: 0,
        actionTop: 0, actionBottom: 0, actionLeft: 0, actionRight: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
    

    // Parameter of building confirm dialog
    confirmDialog: {
        style: confirmDialogConfig
        // content: confirmDialogResetChoiceDisplayContentConfig,
        // modal: confirmDialogModalConfig,
        // onCreateDialog: function(dialog) { },

        // acceptButtonIndex: 0,
        // rejectButtonIndex: 1,

    },
    
    // Callbacks
    accept: function() {},
    // acceptScope: 
    // 

    // reject: function() {},
    // rejectScope: 
});
```

- [Parameters of Label](ui-label.md#add-label-object)...
- Parameter of building confirm dialog
    - `confirmDialog.style` : [Config parameter of Confirm dialog](ui-confirmdialog.md#add-dialog-object)
    - `confirmDialog.content` : [Content strings of title, content, button](ui-confirmdialog.md#reset-display-content). Can assign this value later.
    - `confirmDialog.modal` : [Config parameter of modal method](ui-confirmdialog.md#modal)
    - `confirmDialog.onCreateDialog` : Callback invoking after creating dialog.
        ```javascript
        function(dialog) {

        }
        ```
    - `confirmDialog.acceptButtonIndex` : Index of accept/OK button on Confirm dialog. Default value is `0`.
    - `confirmDialog.rejectButtonIndex` : Index of reject/cancel button on Confirm dialog. Default value is `1`.
- Callbacks
    - `accept`, `acceptScope` : Callback invoking when click accept/OK button of Confirm dialog    
    - `reject`, `rejectScope` : Callback invoking when click reject/cancel button of Confirm dialog


Destroy confirm dialog after clicking accept/OK, or reject/cancel button.

### Custom class

- Define class
    ```javascript
    class MyButton extends RexPlugins.UI.ConfirmActionButton {
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
    var button = new MyButton(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
button.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

See [Get element](ui-label.md#get-element)

### Set callbacks

- Callback after clicking accept/OK button of confirm dialog
    ```javascript
    button.setAcceptCallback(callback);
    // button.setAcceptCallback(callback, scope);
    ```
    - `callback` : Any function object
        ```javascript
        function() {

        }
        ```
- Callback after clicking reject/cancel button of confirm dialog
    ```javascript
    button.setRejectCallback(callback);
    // button.setRejectCallback(callback, scope);
    ```
    - `callback` : Any function object
        ```javascript
        function() {
            
        }
        ```

### Set display content of confirm dialog

```javascript
button.setConfirmDialogContent({
    title: '',
    content: '',
    buttonA: '',
    buttonB: '',
});
```

or

```javascript
button.setConfirmDialogContent({
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

### Set style of confirm dialog

```javascript
button.setConfitmDialogStyle(style);
```

- `style` : See [Config parameter of Confirm dialog](ui-confirmdialog.md#add-dialog-object)

### Set configuration of confirm dialog's modal behavior

```javascript
button.setConfitmDialogModalConfig(config);
```

- `config` : See [Config parameter of modal method](ui-confirmdialog.md#modal)

### Other properties

See [label](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).