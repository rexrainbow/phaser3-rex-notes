## Introduction

Create a [modal confirm dialog](ui-confirmdialog.md) temporary, to invoke action callback.

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
    scene.rexUI.confirmAction(scene, config)
        .then(function(data){ })
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
- Run confirm action
    ```javascript
    scene.rexUI.confirmAction(scene, config)
        .then(function(data){ })
    ```
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
    ConfirmAction(scene, config)
        .then(function(data){ })
    ```

### Run confirm action

```javascript
scene.rexUI.confirmAction(scene, {    
    style: confirmDialogConfig

    content: confirmDialogResetChoiceDisplayContentConfig,

    // modal: confirmDialogModalConfig

    // onCreateDialog: function(dialog) { },

    accept: function() {},
    // acceptScope: 
    // acceptButtonIndex: 0,

    reject: function() {},
    rejectScope: 
    // rejectButtonIndex: 1,
})
    .then(function(data) {
        // var buttonIndex = data.index;
        // var buttonText = data.text;
    })
```

- Build confirm dialog
    - `style` : [Config parameter of Confirm dialog](ui-confirmdialog.md#add-dialog-object)
    - `content` : [Content strings of title, content, button](ui-confirmdialog.md#reset-display-content).
    - `modal` : [Config parameter of modal method](ui-confirmdialog.md#modal)
    - `onCreateDialog` : Callback invoking after creating dialog.
        ```javascript
        function(dialog) {

        }
        ```
- Callbacks
    - `accept`, `acceptScope` : Callback invoking when click accept/OK button of Confirm dialog
    - `acceptButtonIndex` : Index of accept/OK button on Confirm dialog. Default value is `0`.
    - `reject`, `rejectScope` : Callback invoking when click reject/cancel button of Confirm dialog
    - `rejectButtonIndex` : Index of reject/cancel button on Confirm dialog. Default value is `1`.
- Return promise, with parameter `{index, text}`.


Destroy confirm dialog after clicking accept/OK, or reject/cancel button.
