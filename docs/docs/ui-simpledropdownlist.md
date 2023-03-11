## Introduction

Using plain object to create [drop down list](ui-simpledropdownlist.md).

- Author: Rex
- Game object

## Live demos

- [Drop-down list](https://codepen.io/rexrainbow/pen/NWLwZRW)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-simpledropdownlist)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add drop-down list object
    ```javascript
    var dropDownList = scene.rexUI.add.simpleDropDownList(config);
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
    var dropDownList = scene.rexUI.add.simpleDropDownList(config);
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
    var dropDownList = new SimpleDropDownList(scene, config);
    scene.add.existing(dropDownList);
    ```

### Add drop-down list object

```javascript
var dropDownList = scene.rexUI.add.simpleDropDownList({
    label: SimpleLabelConfig,

    button: SimpleLabelConfig,

    list: {
        // easeIn: 500,
        // transitIn: undefined,
        // transitIn: function(listPanel, duration) {  },
    
        // easeOut: 100,
        // transitOut: undefined,
        // transitOut: function(listPanel, duration) {  },
    
        // wrap: false,
        // width: undefined, 
        // height: undefined,
        // alignParent: 'text',
        // expandDirection: 0,
        // bounds: undefined,

        // space: {
        //     left: 0, right: 0, top: 0, bottom: 0, item: 0,
        //     line: 0
        // },

        // draggable: false        
    }

}, creators);
```

- `label` : [Styles of simple-label](ui-simplelabel.md#add-label-object), for creating label.
- `button` : [Styles of simple-label](ui-simplelabel.md#add-label-object), for creating each button on drop-down list.
    - Use `label` parameter of `button` parameter is not given.
- `list` : Configuration of list panel.
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
    - `list.wrap` : 
        - `true` : [fixwidth-sizer](ui-fixwidthsizer.md) layout, a row within buttons.
        - `false` : [sizer](ui-sizer.md) layout, a row within a button. Default behavior.
    - `list.width` : Minimum width.
        - `undefined` : Minimum width of panel will equal to width of parent label. Default value.
        - A number : Width of panel. Required fields when `list.wrap` is `true`.
    - `list.height` : Minimum height.
        - `undefined` : Default value.
    - `list.alignParent` : Align x position to label.
        - `'icon'` : Align x position to *icon* game object of parent label.
        - `'text'` : Align x position to *text* game object of parent label. Default behavior
        - `'label'`, or `null` : Align x position to parent label.        
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
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyDropDownList extends RexPlugins.UI.SimpleDropDownList {
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
    - `options` : Array of strings, or objects contains these properties.
        ```javascript
        {
            text: string,
            value: any
        }
        ```
- Get
    ```javascript
    var options = dropDownList.options;
    ```

### Other properties

See [drop-down list](ui-dropdownlist.md), [label](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).

### Events

See [Events section of drop-down list](ui-dropdownlist.md#events)