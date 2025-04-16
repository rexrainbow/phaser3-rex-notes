## Introduction

A [label](ui-label.md) can open a drop-down list panel.

- Author: Rex
- Game object

## Live demos

- [Drop-down list](https://codepen.io/rexrainbow/pen/RwQoXqa)
- [Drop-down wrap-list](https://codepen.io/rexrainbow/pen/PoQWobV)
- [Custom transit](https://codepen.io/rexrainbow/pen/OJvJwob)
- [Align to right side](https://codepen.io/rexrainbow/pen/BaOMWKo)
- [Cursor select](https://codepen.io/rexrainbow/pen/RwdRmdj)
- [Drop-down scrollable-list](https://codepen.io/rexrainbow/pen/qBzVQdV)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-dropdownlist)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add drop-down list object
    ```javascript
    var dropDownList = scene.rexUI.add.dropDownList(config);
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
- Add drop-down list object
    ```javascript
    var dropDownList = scene.rexUI.add.dropDownList(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { DropDownList } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add dropDownList object
    ```javascript
    var dropDownList = new DropDownList(scene, config);
    scene.add.existing(dropDownList);
    ```

### Add drop-down list object

```javascript
var dropDownList = scene.rexUI.add.dropDownList({
    options: [
        option0,
        option1,
        // ...
    ],

    list: {
        // createBackgroundCallback: function(scene) {
        //     // this : dropDownList
        //     return gameObject;
        // },

        createButtonCallback: function(scene, option, index, options) {
            // this : dropDownList
            return gameObject;
        },

        // createTrackCallback: function(scene) {
        //     // this : dropDownList
        //     return gameObject;
        // },

        // createThumbCallback: function(scene) {
        //     // this : dropDownList
        //     return gameObject;
        // },

        mouseWheelScroller: undefined,
        // mouseWheelScroller: {
        //     focus: true,
        //     speed: 0.1
        // },

        onButtonClick: function(button, index, pointer, event) {
            // this : dropDownList
        },

        // onButtonOver: function(button, index, pointer, event) {
        //     // this : dropDownList
        // },

        // onButtonOut: function(button, index, pointer, event) {
        //     // this : dropDownList
        // },

        // easeIn: 500,
        // transitIn: undefined,
        // transitIn: function(listPanel, duration) {  },

        // easeOut: 100,
        // transitOut: undefined,
        // transitOut: function(listPanel, duration) {  },

        // wrap: false,
        // maxHeight: undefined,
        // width: undefined, 
        // height: undefined,
        // alignParent: 'text',
        // alignSide: '',
        // expandDirection: 0,
        // bounds: undefined,

        // space: {
        //     left: 0, right: 0, top: 0, bottom: 0, item: 0,
        //     line: 0
        // },

        // draggable: false
    },

    setValueCallback: function(dropDownList, value, previousValue) {

    },
    setValueCallbackScope: undefined,
    value: undefined,

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
    iconMask: false,
    text: textGameObject,
    expandTextWidth: false,
    expandTextHeight: false,
    action: actionGameObject,
    actionMask: false,
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
});
```

- `options` : Array of strings, or objects.
- `list` : Configuration of list panel.
    - `list.createBackgroundCallback` : Create background of list panel
        ```javascript
        function(scene) {
            // this : dropDownList
            return gameObject;
        }
        ```
    - `list.createButtonCallback` : Create option button of list panel
        ```javascript
        function(scene, option, index, options) {
            // this : dropDownList
            return gameObject;
        }
        ```
    - `list.createTrackCallback` : Create slider's track of list panel, optional.
        ```javascript
        function(scene) {
            // this : dropDownList
            return gameObject;
        }
        ```
    - `list.createThumbCallback` : Create slider's thumb of list panel, optional.
        ```javascript
        function(scene) {
            // this : dropDownList
            return gameObject;
        }
        ```
    - `list.mouseWheelScroller` : Configuration of mouse-wheel-scroller behavior.
        - `list.mouseWheelScroller.focus` : 
            - `false`, or `0` : Without checking if cursor is over game object or not.
            - `true`, or `1` : Cursor is inside the rectangle bounds of game object. Default behavior.
            - `2` : Cursor is over game object. 
        - `list.mouseWheelScroller.speed` : Scrolling speed, default value is `0.1`.
        - Set to `false` to skip creating mouse-wheel-scroller. Default behavior.
    - `list.onButtonClick` : Callback when clicking a button
        ```javascript
        function(button, index, pointer, event) {
            // this : dropDownList
        }
        ```
    - `list.onButtonOver` : Callback when pointer over a button
        ```javascript
        function(button, index, pointer, event) {
            // this : dropDownList
        }
        ```
    - `list.onButtonOut` : Callback when pointer out a button
        ```javascript
        function(button, index, pointer, event) {
            // this : dropDownList
        }
        ```
    - `list.easeIn` : Pop-up duration in ms. Default value is `500`.
    - `list.transitIn` : Tween behavior of opening list panel.
        - `undefined` : Expand list panel by pop-up, default behavior.
        - Custom callback
            ```javascript
            function(listPanel, duration) {
    
            }
            ```
    - `list.easeOut` : Scale-down duration in ms. Default value is `100`.
    - `list.transitOut` : Tween behavior of closing list panel.
        - `undefined` : Closing list panel by scale-down, default behavior.
        - Custom callback
            ```javascript
            function(listPanel, duration) {
    
            }
            ```
    - `list.wrap` : Layout mode of buttons
        - `true` : [fixwidth-sizer](ui-fixwidthsizer.md) layout.
        - `false` : [sizer](ui-sizer.md) layout. Default behavior.
    - `list.maxHeight` : If height of button list is larger than this `maxHeight`, put this button list into scrollable panel.
        - `undefined`, or `0` : Ignore this behavior.
        - `> 0` and `list.createThumbCallback` parameter is given : If height of button list is larger than this `maxHeight`, put this button list into scrollable panel.
    - `list.width` : Minimum width.
        - `undefined` : Minimum width of panel will equal to width of parent label. Default value.
        - A number : Width of panel. Required fields when `list.wrap` is `true`.
    - `list.height` : Minimum height.
        - `undefined` : Create button list or wrap button list. Default value.
        - `> 0` and `list.createThumbCallback` parameter is given : Create scrollable button list or wrap button list.
    - `list.alignParent` : Align x position to label.
        - `'icon'` : Align x position to *icon* game object of parent label.
        - `'text'` : Align x position to *text* game object of parent label. Default behavior
        - `'label'`, or `null` : Align x position to parent label.        
    - `list.alignSide` : Align list to label's left or right side.
        - `undefined`, or `'left'` : Align list's left side to label's left side. Default behavior.
        - `'right` : Align list's right side to label's right side. Default behavior.
    - `list.expandDirection` :
        - `0`, `'down'` : Expand list down. i.e. list panel will put below parent label.
        - `1`, `'up'` : Expand list up. i.e. list panel will put above parent label.
    - `list.bounds` : Put list panel below parent label if *bottom of list panel* is inside bounds ([Rectangle](geom-rectangle.md))
        - `undefined` : Use viewport as bounds
        - [Rectangle](geom-rectangle.md)
    - `list.space` : `space` properties of list panel.
        - `left`, `right`, `top`, `bottom`, `item` : For [sizer](ui-sizer.md) layout. (`list.wrap` is `false`)
        - `left`, `right`, `top`, `bottom`, `item`, `line` : For [fixwidth-sizer](ui-fixwidthsizer.md) layout. (`list.wrap` is `true`)
    - `list.draggable` : Set `true` to drag top-most object.
- `value`, `setValueCallback`, `setValueCallbackScope` : See [value](ui-dropdownlist.md#value)
    ```javascript
    function(dropDownList, value, previousValue) {

    }
    ```
- Properties of [Label](ui-label.md#add-label-object)
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
    - `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of label.
    - `icon` : Game object of icon, optional.
    - `iconMask` : Cut into a round shape.
        - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
        - CANVAS : Apply circle mask.
    - `text` : Game object of text, optional.
    - `expandTextWidth` : Set `true` to expand width of text object.
    - `expandTextHeight` : Set `true` to expand height of text object.
    - `action` : Game object of action icon, optional.
    - `actionMask` : Cut into a round shape.
        - WEBGL : Apply [circle effect](shader-p3fx.md#circle).
        - CANVAS : Apply circle mask.
    - `align` : Alignment of icon, text, action-icon game objects.
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

### Custom class

- Define class
    ```javascript
    class MyDropDownList extends RexPlugins.UI.DropDownList {
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
    var dropDownList = new MyDropDownList(scene, config);
    ```

### Options

- Set
    ```javascript
    dropDownList.setOptions(options);
    ```
    or
    ```javascript
    dropDownList.options = options;
    ```
    - `options` : Array of strings, or objects.
- Get
    ```javascript
    var options = dropDownList.options;
    ```

### Clicking

- Enable
    ```javascript
    dropDownList.enableClick();
    ```
- Disable
    ```javascript
    dropDownList.disableClick();
    ```
- Register another clicking callback
    ```javascript
    dropDownList.onClick(callback, scope);
    ```

### Emit button click event

```javascript
dropDownList.emitButtonClick(index);
// dropDownList.emitButtonClick();
```

- `index` : Index of button/option.
    - `undefined` : Click current focus (over) button.

Will fire `'button.click'` event

```javascript
dropDownList.on('button.click', function(dropDownList, listPanel, button, index, pointer, event) {
    // ...
}, scope);
```

- `listPanel` : listPanel, or `undefined` if list is not created.
- `button` : Button game object, or option if list is not created.
- `pointer` : `undefined`
- `event` : `undefined`

This method won't close list panel.

### Emit button over event

```javascript
dropDownList.emitButtonOver(index);
```

- `index` : Index of button/option.

or

```javascript
dropDownList.focusNextButton();
dropDownList.focusPrevButton();
```

Will fire `'button.out'`, `'button.over'` event

```javascript
dropDownList.on('button.out', function(dropDownList, listPanel, button, index, pointer, event) {
    // ...
}, scope);
```
```javascript
dropDownList.on('button.over', function(dropDownList, listPanel, button, index, pointer, event) {
    // ...
}, scope);
```

- `listPanel` : listPanel, or `undefined` if list is not created.
- `button` : Button game object, or option if list is not created.
- `pointer` : `undefined`
- `event` : `undefined`


### Value

- Set value under `list.onButtonClick` callback.
    ```javascript
    dropDownList.setValue(value);
    ```
    or
    ```javascript
    dropDownList.value = value;
    ```
    - When value changing
        - Will invoke `setValueCallback`
            ```javascript
            function(dropDownList, value, previousValue) {
                
            }
            ```        
        - Will fire `'valuechange'` event
- Get
    ```javascript
    var value = dropDownList.value;
    ```

### Open/close list panel

#### Open list panel

- Click parent label to open (create and pop-up) list panel.
- Or invoke this method `dropDownList.openListPanel()`.

#### Close list panel

- When list panel is opened, click any where will close (scale-down then destroy) this list panel.
- Or invoke this method `dropDownList.closeListPanel()`.

#### Toggle list panel

```javascript
dropDownList.toggleListPanel();
```

#### Is list opened

```javascript
var isOpened = dropDownList.isOpened;
```

### Other properties

See [label object](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Events

- Open list
    ```javascript
    dropDownList.on('list.open', function(dropDownList, listPanel) {

    })
    ```
- Close list
    ```javascript
    dropDownList.on('list.close', function(dropDownList, listPanel) {

    })
    ```
- Click button
    ```javascript
    dropDownList.on('button.click', function(dropDownList, listPanel, button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button on list panel.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#pointer) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Over button
    ```javascript
    dropDownList.on('button.over', function(dropDownList, listPanel, button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button on list panel.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#pointer) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- Out button
    ```javascript
    dropDownList.on('button.out', function(dropDownList, listPanel, button, index, pointer, event) {
        // ...
    }, scope);
    ```
    - `button` : Game object of triggered button on list panel.
    - `index` : Index of triggered button.
    - `pointer` : [Pointer](touchevents.md#pointer) object.
    - Cancel remaining touched events : `event.stopPropagation()`
- On value changing
    ```javascript
    dropDownList.on('valuechange', function(dropDownList, value, previousValue) {
        // ...
    }, scope);
    ```