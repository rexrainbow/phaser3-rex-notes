## Introduction

A container with a title, foldable child, and background.

- Author: Rex
- Game object

## Live demos

- [Scrollable folders](https://codepen.io/rexrainbow/pen/wvxvYOM)
- [Draggable folder](https://codepen.io/rexrainbow/pen/jOpPLqz)
- [Nested folders](https://codepen.io/rexrainbow/pen/vYPpxRB)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-folder)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add folder object
    ```javascript
    var folder = scene.rexUI.add.folder(config);
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
- Add folder object
    ```javascript
    var folder = scene.rexUI.add.folder(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Folder } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add folder object
    ```javascript    
    var folder = new Folder(scene, config);
    scene.add.existing(folder);
    ```

### Add folder object

```javascript
var folder = scene.rexUI.add.folder({
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

    title: titleGameObject,    
    
    child: childGameObject,
    // customChildOrigin: false,

    toggleByTarget: undefined,
    toggleClickConfig: {
        mode:'pointerup',
        clickInterval: 100,
        threshold: undefined,
    },

    align: {
        title: 'left',
        child: 'left',
    },

    expand: {
        title: true,
        child: true,
    },

    space: { 
        left: 0, right:0, top:0, bottom:0, item:0,

        titleLeft: 0, titleRight: 0, titleTop: 0, titleBottom: 0,
        childLeft: 0, childRight: 0, childTop: 0, childBottom: 0,
    },
    
    transition: {
        duration: 200,
        expandCallback: undefined,
        collapseCallback: undefined,
    },

    reLayoutTarget: undefined,

    onExpandStart: undefined,
    onExpandComplete: undefined,
    onCollapseStart: undefined,
    onCollapseComplete: undefined,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        item: 0,
    },

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
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of folder.
- `title` : Game object of title, required.
- `child` : Game object of child, required.
- `customChildOrigin` : 
    - `false` : Set origin of child to `0`, or `1` (if `rtl` is set to `true`). Default behavior.
    - `true` : Don't change origin of child.
- `toggleByTarget` : Toggle expanding/collapsing by clicking this target game object
    - `undefined` : Toggle by clicking title game object.
- `toggleClickConfig` : Configuration of [clicking behavior](button.md#create-instance)
    - `undefined` : Use default configuration.
- `align.title`, `align.child` : Alignment of title, child game objects.    
    - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top. Default behavior.
    - `'center'` : Align game objects at center.
    - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
- `expand.title`, `expand.child` : Expand width/height of title, child game objects.    
    - `true` : Expand width/heigh. Default behavior.
    - `false` : Use origin width/height.
- `transition` : Configuration of expanding/collapsing transition.
    - `transition.duration` : Duration of expanding/collapsing transition.
    - `transition.expandCallback` : Callback invoked when expading child. Default behavior is scale-up.
    - `transition.collapseCallback` : Callback invoked when collapsing child. Default behavior is scale-down.
- `reLayoutTarget` : Layout topmost sizer when expanding/collapsing start.
    - `undefined` : Topmost sizer will be layouted again. Default behavior.
    - A sizer : Layout this sizer.
- `onExpandStart` : Callback invoked when expanding start. Register this callback on `'expand.start'` event.
    ```javascript
    function(folder) {  }
    ```
- `onExpandComplete` : Callback invoked when expanding complete. Register this callback on `'expand.complete'` event.
    ```javascript
    function(folder) {  }
    ```
- `onCollapseStart` : Callback invoked when collapsing start. Register this callback on `'collapse.start'` event.
    ```javascript
    function(folder) {  }
    ```
- `onCollapseComplete` : Callback invoked when collapsing complete. Register this callback on `'collapse.complete'` event.
    ```javascript
    function(folder) {  }
    ```
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.text` : Space between text game object and action icon game object.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyFolder extends RexPlugins.UI.Folder {
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
    var folder = new MyFolder(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
folder.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

!!! note
    Layout topmost sizer when expanding/collapsing start.

### Get element

- Get element
    - Background game object
        ```javascript
        var background = folder.getElement('background');
        ```
    - Title game object
        ```javascript
        var title = folder.getElement('title');
        ```
    - Child game object
        ```javascript
        var child = folder.getElement('child');
        ```    
- Get by name
    ```javascript
    var gameObject = folder.getElement('#' + name);
    // var gameObject = folder.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = folder.getByName(name);
    // var gameObject = folder.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Expand/collapse

- Expand, will re=layout from topmost sizer
    ```javascript
    folder.expand();
    // folder.expand(duration);
    ```
    ```javascript
    folder.expand(0);  // Immediately, won't invoke expandCallback
    ```
- Collapse, will re=layout from topmost sizer
    ```javascript
    folder.collapse();
    // folder.collapse(duration);
    ```
    ```javascript
    folder.collapse(0);  // Immediately, won't invoke collapseCallback
    ```
- Toggle, will re=layout from topmost sizer
    ```javascript
    folder.toggle();
    // folder.toggle(duration);
    ```
    ```javascript
    folder.toggle(0);  // Immediately, won't invoke expandCallback/collapseCallback
    ```
- Set expanded state without re-layouting
    ```javascript
    folder.setExpandedState(expanded);  // true, or false
    ```
- Get expanded state
    ```javascript
    var expanded = folder.expanded;
    ```
    - `expanded` : Initial value is `undefined`

### Transition callbacks

- Set transition callbacks
    ```javascript
    folder.setExpandCallback(callback);
    folder.setCollapseCallback(callback);
    ```
    - `callback` :
        ```javascript
        function(gameObject, duration) {
        }
        ```
        - `gameObject` : Child game object
- Transition duration
    - Set
        ```javascript
        folder.setTransitionDuration(duration);
        ``` 
    - Get
        ```javascript
        var duration = folder.transitionDuration;
        ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Events

- On expand-start
    ```javascript
    folder.on('expand.start', function(folder){

    })
    ```    
    ```javascript
    title.on('folder.expand', function(folder){

    })
    ```
    ```javascript
    child.on('folder.expand', function(folder){

    })
    ```
- On expand-complete
    ```javascript
    folder.on('expand.complete', function(folder){
        
    })
    ```
- On collapse-start
    ```javascript
    folder.on('collapse.start', function(folder){

    })
    ```
    ```javascript
    title.on('folder.collapse', function(folder){

    })
    ```
    ```javascript
    child.on('folder.collapse', function(folder){

    })
    ```
- On collapse-complete
    ```javascript
    folder.on('collapse.complete', function(folder){
        
    })
    ```