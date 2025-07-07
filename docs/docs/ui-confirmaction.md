## Introduction

Create a [modal confirm dialog](ui-confirmdialog.md) temporary, invoke callback after clicking button.

- Author: Rex
- Method

## Live demos

- [Confirm action](https://codepen.io/rexrainbow/pen/bGZoYgG)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-confirmaction)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Run confirm action
    ```javascript
    var dialog = scene.rexUI.confirmAction(scene, config);
    ```
    - `dialog` : Confirm dialog will be destroy after clicking any button.

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
- Run confirm action
    ```javascript
    var dialog = scene.rexUI.confirmAction(scene, config)
    ```
    - `dialog` : Confirm dialog will be destroy after clicking any button.

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ConfirmAction } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Run confirm action
    ```javascript
    var dialog = ConfirmAction(scene, config)
    ```
    - `dialog` : Confirm dialog will be destroy after clicking any button.

### Run confirm action

```javascript
var dialog = scene.rexUI.confirmAction(scene, {    
    style: confirmDialogConfig

    content: confirmDialogResetChoiceDisplayContentConfig,

    // modal: confirmDialogModalConfig,

    // onCreateDialog: function(dialog) { },

    confirm: function() {},
    // confirmScope: 
    // confirmButtonIndex: 0,

    // cancel: function() {},
    // cancelScope: 
    // cancelButtonIndex: 1,
})
```

- Build confirm dialog
    - `style` : [Config parameter of Confirm dialog](ui-confirmdialog.md#add-dialog-object)
        - `style.buttonMode` : Default is `2`, dialog with 2 action buttons, clicking any action button to close modal dialog.
    - `content` : [Content strings of title, content, button](ui-confirmdialog.md#reset-display-content).
    - `modal` : [Config parameter of modal method](ui-confirmdialog.md#modal)
    - `onCreateDialog` : Callback invoking after creating dialog.
        ```javascript
        function(dialog) {

        }
        ```
- Callbacks
    - `confirm`, `confirmScope` : Callback invoking when click confirm/OK button of Confirm dialog
    - `confirmButtonIndex` : Index of confirm/OK button on Confirm dialog. Default value is `0`.
    - `cancel`, `cancelScope` : Callback invoking when click cancel/cancel button of Confirm dialog
    - `cancelButtonIndex` : Index of cancel/cancel button on Confirm dialog. Default value is `1`.
- `dialog` : Confirm dialog will be destroy after clicking any button.