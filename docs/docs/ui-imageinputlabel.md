## Introduction

A container with a [canvas](canvas.md) icon, text, and background. Click icon to popup a 
(image) file chooser dialog, display selected image on [canvas](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Save texture](https://codepen.io/rexrainbow/pen/GRPdMBm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-imageinputlabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add image-input label object
    ```javascript
    var imageInputLabel = scene.rexUI.add.imageInputLabel(config);
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
- Add image-input label object
    ```javascript
    var imageInputLabel = scene.rexUI.add.imageInputLabel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ImageInputLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add image-input label object
    ```javascript    
    var imageInputLabel = new ImageInputLabel(scene, config);
    scene.add.existing(imageInputLabel);
    ```

### Add imageInputLabel object

```javascript
var imageInputLabel = scene.rexUI.add.imageInputLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,
    // rtl: false,

    background: backgroundGameObject,

    canvas: {
        // width: 128, 
        // height: 128,
        // fill: undefined,

        // key: undefined, 
        // frame: undefined,        
    },

    // scaleUpIcon: false,

    iconBackground: iconBackgroundGameObject,    
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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0, 
        iconTop: 0, iconBottom: 0, iconLeft: 0, iconRight: 0,

        text: 0,
        actionTop: 0, actionBottom: 0, actionLeft: 0, actionRight: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,

    // clickTarget: undefined,
    // domButton: true,
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
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of imageInputLabel.
- `canvas` : Parameters of creating [canvas game object](canvas.md).
    - `canvas.width`, `canvas.height`, `canvas.fill` : Create canvas with size (`canvas.width` x `canvas.height`), filling by color `canvas.fill`.
    - `canvas.key`, `canvas.frame` : Create canvas then paste texture `canvas.key`, `canvas.frame`.
- `iconBackground` : Game object of iconBackground, optional.
    - `icon` game object will be created internally by [imageBox](imagebox.md) with [canvas](canvas.md).
- `squareFitIcon` : 
    - `true` : Resize icon size to square to fit imageInputLabel height/width.
        - Can't work wit `expandTextWidth: true`
    - `false` : Ignore this feature. Default behavior.
- `iconSize` : Set display size of icon game object to `iconSize`x`iconSize`
- `iconWidth` : Set display width of icon game object to `iconWidth`. 
    - If `iconHeight` is `undefined`, set `scaleY` of icon game object to `scaleX` of icon game object, to keep size ratio.
- `iconHeight` : Set display height of icon game object to `iconHeight`. 
    - If `iconWidth` is `undefined`, set `scaleX` of icon game object to `scaleY` of icon game object, to keep size ratio.
- `scaleUpIcon` :
    - `true` : Scale-up canvas game object if its size is smaller than icon (imageBox).
    - `false` : Keep current size when its size is smaller than icon (imageBox). Default behavior.
- `text` : Game object of text, optional.
- `expandTextWidth` : 
    - `false` : Keep width of text to original size. Default behavior.
    - `true` : Expand width of text object. Will set display width by default.
        - Must set to `true` if using [`scene.rexUI.wrapExpandText` method](ui-overview.md#behaviors-of-text) with any text game object.
        - Can't work with `squareFitIcon: true`.
- `expandTextHeight` : Set `true` to expand height of text object.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `squareFitAction` : 
    - `true` : Resize action icon size to square to fit imageInputLabel height/width.
    - `false` : Ignore this feature. Default behavior.
- `actionSize` : Set display size of action game object to `actionSize`x`actionSize`
- `actionWidth` : Set display width of action game object to `actionWidth`. 
    - If `actionHeight` is `undefined`, set `scaleY` of action game object to `scaleX` of action game object, to keep size ratio.
- `actionHeight` : Set display height of action game object to `actionHeight`. 
    - If `actionWidth` is `undefined`, set `scaleX` of action game object to `scaleY` of action game object, to keep size ratio.
- `align` : Alignment of icon, text, action game objects.
    - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top.
    - `'center'` : Align game objects at center.
    - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.iconTop`, `space.iconBottom`, `space.iconLeft`, `space.iconRight` : Space around icon game object.
    - `space.text` : Space between text game object and action icon game object.
    - `space.actionTop`, `space.actionBottom`, `space.actionLeft`, `space.actionRight` : Space around action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).
- `clickTarget` : Click target to open file chooser dialog
    - A string, `'icon'`, `'text'`, `'action'`, `'background'` : Click `icon`, `text`, `action`, `background` game object to open file chooser dialog.
    - `undefined` : Click this ImageInputLabel game object to open file chooser dialog. Default behavior.
    - `null`, `false` : No `clickTarget`. [Open file chooser dialog](ui-imageinputlabel.md#open-file-chooser-dialog) manually under a [touch event](touchevents.md).
- `domButton` :
    - `true` : Put DOM buttom above `clickTarget`, to receive click event.
    - `false` : Add [click event](button.md) at `clickTarget`.
        - **This mode won't work at ios**    


#### Expand size of text

Expand width/height of text when `expandTextWidth`/`expandTextHeight` is `true`

To resize text object, text object should have `resize` method. For example

```javascript
class MyText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.add.existing(this);
    }
    resize(width, height) {
        this.setFixedSize(width, height);
        return this;
    }
}
```

Or uses [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), [canvasInput object](canvasinput.md).

### Custom class

- Define class
    ```javascript
    class MyLabel extends RexPlugins.UI.ImageInputLabel {
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
    var imageInputLabel = new MyLabel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
imageInputLabel.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Open file chooser dialog

!!! failure
    This method can't run at ios.

!!! note
    Open a file chooser dialog **under any touch event**. i.e. User can't open file chooser dialog directly.

```javascript
imageInputLabel.openPromise()
    .then(function(file){
    })
```

- `file` : [File object](https://developer.mozilla.org/en-US/docs/Web/API/File)



```javascript
imageInputLabel.open()
```


### Enable clicking-open

- Enable
    ```javascript
    imageInputLabel.setClickOpenEnable();
    // imageInputLabel.setClickOpenEnable(true);
    ```
- Disable
    ```javascript
    imageInputLabel.setClickOpenEnable(false)
    ```

### Save texture

Save image on [canvas](canvas.md) into [texture manager](textures.md).

```javascript
imageInputLabel.saveTexture(key);
```

### Events

- Select file
    ```javascript
    imageInputLabel.on('select', function(file, imageInputLabel) {
        
    })
    ```
    - `file` : [File object](https://developer.mozilla.org/en-US/docs/Web/API/File)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = imageInputLabel.getElement('background');
        ```
    - Canvas game object (a [canvas game object](canvas.md) created internally)
        ```javascript
        var canvas = imageInputLabel.getElement('canvas');
        ```
    - Icon background game object
        ```javascript
        var iconBackground = imageInputLabel.getElement('iconBackground');
        ```
    - Icon game object (an [imageBox game object](imagebox.md) created internally)
        ```javascript
        var imageBox = imageInputLabel.getElement('icon');
        ```
    - Text game object
        ```javascript
        var textObject = imageInputLabel.getElement('text');
        ```
    - Action icon game object
        ```javascript
        var action = imageInputLabel.getElement('action');
        ```
    - [File chooser game object](filechooser.md), if `domButton` is set to `true`
        ```javascript
        var fileChooser = imageInputLabel.getElement('fileChooser');
        ```
- Get by name
    ```javascript
    var gameObject = imageInputLabel.getElement('#' + name);
    // var gameObject = imageInputLabel.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = imageInputLabel.getByName(name);
    // var gameObject = imageInputLabel.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [label](ui-label.md)), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).