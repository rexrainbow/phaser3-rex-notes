## Introduction

Fine-tuning properties of target object.

- Author: Rex
- Game object

## Live demos

- [Tweaker](https://codepen.io/rexrainbow/pen/YzvPOGM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-tweaker)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add tweaker object
    ```javascript
    var tweaker = scene.rexUI.add.tweaker(config);
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
- Add tweaker object
    ```javascript
    var tweaker = scene.rexUI.add.tweaker(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Tweaker } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add tweaker object
    ```javascript    
    var tweaker = new Tweaker(scene, config);
    scene.add.existing(tweaker);
    ```

### Add tweaker object

```javascript
var tweaker = scene.rexUI.add.tweaker({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,


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

- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyTweaker extends RexPlugins.UI.Tweaker {
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
    var tweaker = new MyTweaker(scene, config);
    ```

### Add input row

An input row can fine-tuning properties of target object. 

#### Text input row

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.

#### Text input from list

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ]
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.

#### Text input from buttons

`object[key]` is a text value.

```javascript
tweaker.addInput(object, key, {
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ]
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.

#### Number input row

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.

##### Number input in a range

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    min: minValue, 
    max: maxValue,

    // format: function(value) { return s; },
    // inputTextReadOnly: false,
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `min`, `max` : Minimum, maximun value of range.
- `format` : Callback to return formatted string for input text field.
    ```javascript
    function(value) {
        return s;
    }
    ```
- `inputTextReadOnly` :
    - `false` : Input text field is editable. Default behavior.
    - `true` : Input text field is read-only.

#### Number input from list

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ]
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.

#### Number input from buttons

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    view: 'buttons',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,

    options: [
        {text: text0, value: value0},
        {text: text1, value: value1},
        // ...
    ]
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.
- `options` : Option list, each item contains
    - `text` : Display text.
    - `value` : Set `key` to this value.

##### Color input

`object[key]` is a number value.

```javascript
tweaker.addInput(object, key, {
    view: 'color',

    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.

#### Boolean input row

`object[key]` is a boolean value.

```javascript
tweaker.addInput(object, key, {
    // icon: undefined,
    // iconFrame: undefined,
    // iconSize: undefined,

    // title: undefined,
})
```

- `icon`, `iconFrame` : Texture key, frame name of icon on title-label.
- `iconSize` : Fixed icon size
- `title` : Display text of title-label. Default value is equal to `key`.


### Get element

- Get element
    - [Pages](ui-pages.md)
        ```javascript
        var gameObject = tweaker.getElement('pages');
        ```
    - Tabs, a [buttons](ui-buttons.md)
        ```javascript
        var gameObject = tweaker.getElement('tabs');
        ```
    - Page by key/index
        ```javascript
        var gameObject = tweaker.getPage(key);
        ```
        ```javascript
        var gameObject = tweaker.getPage(index);
        ```
        - `key` : Unique string name of the page.
        - `index` : Index number in tabs.
    - Tab by key/index
        ```javascript
        var gameObjects = tweaker.getTab(key);
        ```
        ```javascript
        var gameObjects = tweaker.getTab(index);
        ```
        - `key` : Unique string name of the page.
        - `index` : Index number in tabs.
- Get by name
    ```javascript
    var gameObject = tweaker.getElement('#' + name);
    // var gameObject = pages.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = tweaker.getByName(name);
    // var gameObject = tweaker.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [base sizer object](ui-basesizer.md), [Pages](ui-pages.md), [Buttons](ui-buttons.md)

### Events
