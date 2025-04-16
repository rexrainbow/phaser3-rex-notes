## Introduction

A transparent file chooser button (`<input type="file">`) above a [Label](ui-label.md).

- Author: Rex
- Game object, [DOM Game object](domelement.md)

## Live demos

- [File selector button](https://codepen.io/rexrainbow/pen/NWBemgQ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-fileselectorbutton)

### Install plugin

#### Load minify file

- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add file selector button object
    ```javascript
    var button = scene.add.fileSelectorButton(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FileChooserPlugin from 'phaser3-rex-plugins/plugins/filechooser-plugin.js';
    var config = {    
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
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
- Add file selector button object
    ```javascript
    var button = scene.add.fileSelectorButton(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },
        input: {
            mouse: {
                target: divId
            },
            touch: {
                target: divId
            },
        },
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Import class
    ```javascript
    import { FileSelectorButton } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add file chooser object
    ```javascript
    var button = new FileSelectorButton(scene, config);
    scene.add.existing(button);
    ```

### Add file chooser object

```javascript
var button = scene.add.fileSelectorButton({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0,
        text: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,

    // accept: '',
    // multiple: false,
});
// var fileChooser = scene.add.fileSelectorButton(x, y, width, height, config);
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
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
- `icon` : Game object of icon, optional.
- `iconMask` : Cut into a round shape.
    - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
    - CANVAS : Apply circle mask.
- `squareFitIcon` : 
    - `true` : Resize icon size to square to fit label height/width.
    - `false` : Ignore this feature. Default behavior.
- `iconSize` : Set display size of icon game object to `iconSize`x`iconSize`
- `iconWidth` : Set display width of icon game object to `iconWidth`. 
    - If `iconHeight` is `undefined`, set `scaleY` of icon game object to `scaleX` of icon game object, to keep size ratio.
- `iconHeight` : Set display height of icon game object to `iconHeight`. 
    - If `iconWidth` is `undefined`, set `scaleX` of icon game object to `scaleY` of icon game object, to keep size ratio.
- `text` : Game object of text, optional.
- `expandTextWidth` : 
    - `false` : Keep width of text to original size. Default behavior.
    - `true` : Expand width of text object. Will set display width by default.
        - Must set to `true` if using [`scene.rexUI.wrapExpandText` method](ui-overview.md#behaviors-of-text) with any text game object.
- `expandTextHeight` : Set `true` to expand height of text object.
- `action` : Game object of action icon, optional.
- `actionMask` : Cut into a round shape.
    - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
    - CANVAS : Apply circle mask.
- `squareFitAction` : 
    - `true` : Resize action icon size to square to fit label height/width.
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
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#render-layer).
- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from.
- `multiple` : Set `true` to select multiple files.


### Custom class

- Define class
    ```javascript
    class MyFileSelectorButton extends RexPlugins.UI.FileSelectorButton {
        constructor(scene, config) {
            super(scene, config) {
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var button = new MyFileSelectorButton(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = label.getElement('background');
        ```
    - Icon game object
        ```javascript
        var icon = label.getElement('icon');
        ```
    - Text game object
        ```javascript
        var textObject = label.getElement('text');
        ```
    - Action icon game object
        ```javascript
        var action = label.getElement('action');
        ```
    - File chooser game object
        ```javascript
        var fileChooser = label.getElement('fileChooser');
        ```    
- Get by name
    ```javascript
    var gameObject = label.getElement('#' + name);
    // var gameObject = label.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = label.getByName(name);
    // var gameObject = label.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Selected files

```javascript
var files = fileChooser.files;
```

- `files` : Array of file object.

### Set accept filter

```javascript
fileChooser.setAccept(accept);
```

- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from.

### Multiple files

- Enable
    ```javascript
    fileChooser.setMultiple();
    ```
- Disable
    ```javascript
    fileChooser.setMultiple(false);
    ```

### Events

- Selected file(s) changed
    ```javascript
    button.on('select', function(files, button) {        
        var file = files[0];
        var url = URL.createObjectURL(file);
        // ...
    })
    ```

### Load file to cache

```javascript
fileChooser.loadFile(file, loaderType, key);
// fileChooser.loadFile(file, loaderType, key, cahceType);
```

or

```javascript
fileChooser.loadFilePromise(file, loaderType, key, cahceType)
    .then(function(content) {

    })
```

- `file` : File object, see [Events](filechooser.md#events)
- `loaderType` : `image`, `text`, `binary`, ... See [Loader](loader.md)
- `key` : Unique string key.
- `cahceType` : 
    - `undefined` : Use default value.
- `content` : Content of file.

### Create object URL

- [Create object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
    ```javascript
    var objectURL = URL.createObjectURL(file);
    ```
- [Release object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
    ```javascript
    URL.createObjectURL(objectURL);
    ```


### Interactive with other game objects

See [dom-element's Interactive with other game objects](domelement.md#interactive-with-other-game-objects)


### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).