## Introduction

Disply experience bar on [NameValueLabel](ui-expbar.md).

- Author: Rex
- Game object

## Live demos

- [Exp bar](https://codepen.io/rexrainbow/pen/rNogZBL)
- [Custom bar](https://codepen.io/rexrainbow/pen/gOqOxQv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-expbar)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add expBar object
    ```javascript
    var expBar = scene.rexUI.add.expBar(config);
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
- Add expBar object
    ```javascript
    var expBar = scene.rexUI.add.expBar(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ExpBar } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add expBar object
    ```javascript    
    var expBar = new ExpBar(scene, config);
    scene.add.existing(expBar);
    ```

### Add expBar object

```javascript
var expBar = scene.rexUI.add.expBar({
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

    nameText: nameTextGameObject,
    valueText: valueTextGameObject,
    // valueTextFormatCallback: function(value, min, max) {
    //     return `${value}/${max}`;
    // },
    // valueTextFormatCallback: null,

    // barShape: 'line',   // 'line', or 'circle'

    // line bar
    bar: {
        trackColor: undefined,
        trackThickness: 2,
        trackStrokeColor: undefined,
        barColor: undefined,
        barColor2: undefined,

        skewX: 0,

        rtl: false,

        easeValue: {
            duration: 0,
            ease: 'linear'
        },
    }, 

    // circle bar
    /*
    bar: {
        barColor: undefined,
        barColor2: undefined,
        trackColor: undefined,
        centerColor: undefined,
        thickness: 0.2,
        startAngle: Phaser.Math.DegToRad(270),
        endAngle: Phaser.Math.DegToRad(270+360),
        anticlockwise: false,
    }
    */

    // bar: CustomProgressGameObject,
    
    // bar: undefined,

    action: actionGameObject,
    actionMask: false,

    align: {        
        text: 'bottom',  // 'top', 'center', 'bottom'
    },

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0, iconTop: 0, iconBottom: 0,
        name: 0, value: 0,
        bar:0, barBottom: 0, barLeft: 0, barRight: 0,
        text: 0,
        actionTop: 0, actionBottom: 0,
    },

    // easeDuration: 1000,

    levelCounter: {
        table: function(level) { return level * 100; },
        // table: [0, 100, 200, 300,],        
        // maxLevel: -1,        
        // exp: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,

});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y`, `aspectRatio` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `aspectRatio` :
        - `undefined`, or `false` : Does not keep aspect ratio. Default behavior.
        - `true` : Use the current width and height as the aspect ratio.
        - A number : Use given number as the aspect ratio.    
    - `onResizeCallback` : A default resize callback will be assigned interanlly.
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of expBar.
- `icon` : Game object of icon, optional.
- `iconMask` : Set true to add a *circle* mask on icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.   
- `nameText` : Game object of nameText. 
    - OriginX of nameText will be set to `0`.
    - Empty text will be set to a space character `' '`. To preserve height of this text game object.
- `valueText` : Game object of valueText.
    - OriginX of nameText will be set to `1`.
    - Empty text will be set to a space character `' '`. To preserve height of this text game object.
- `valueTextFormatCallback` : Callback to return a string set to `valueText` game object when invokeing [`label.setValue(value, min, max)` method](ui-namevaluelabel.md#set-value).
    - A callback 
        ```javascript
        function(value, min, max) {
            return `${value}/${max}`;
        }
        ```
    - `null`, or `false` : Don't set `valueText` game object.
- `barShape` : `'line'` or `'circle'`.
- `bar` : Game object of bar, or config of [horizontal line progress bar](shape-lineprogress.md), or config of [circular progress bar](canvas-circularprogress.md) or `undefined`.
    - Config of [horizontal line progress bar](shape-lineprogress.md)
        - `bar.trackColor` : Fill color of bar's track, in number or css string value.
        - `bar.trackStrokeColor` : Stroke color of bar's track, in number or css string value.
        - `bar.trackThickness` : Stroke line width of bar's track.
        - `bar.barColor`, `bar.barColor2` : Fill color of bar, in number or css string value. Assign gradient start color by `barColor2`.
        - `bar.skewX` : Horizontal skew of track and bar.
        - `bar.rtl` :
            - `false` : Bar starts from left side. Default behavior.
            - `true` : Bar starts from right side.
    - Config of [circular progress bar](canvas-circularprogress.md)
        - `bar.shape` : `'circle'`
        - `bar.barColor`, `bar.barColor2` : Fill color of circular bar, in number or css string value. Assign gradient start color by `barColor2`.
        - `bar.trackColor` : Color of circular track, in number or css string value.
        - `bar.centerColor` : Color of center circle, in number or css string value.
        - `bar.thickness` : `0` ~ `1`, thickness of circular bar. Default value is `0.2` (`0.2*radius`)
        - `bar.startAngle` : Start angle of circular bar, in radians. Default value is `270` degrees.
        - `bar.endAngle` : End angle of circular bar, in radians. Default value is `270+360` degrees.
        - `bar.anticlockwise` : Set `true` to put anticlockwise circular bar. Default value is `false`.    
    - ([CustomProgress](shape-custom-progress.md)) Game object.
    - `undefined` : No bar game object.
- `action` : Game object of action icon, optional.
- `actionMask` : Set true to add a *circle* mask on action icon game object.
    - *Phaser 3 engine does not support nested mask*, uses [circle mask image](circlemaskimage.md) instead.
- `align` : 
    - `align.text` : Alignment of nameText, valueText game objects.
        - `'top'`, `'center'`, or `'bottom'`. Default value is `'bottom'`.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.icon` : Space between icon game object and text game object.
    - `space.iconTop`, `space.iconBottom` : Space around icon game object.
    - `space.name` : Left space of nameText game object.
    - `space.value` : Right space of valueText game object.
    - `space.bar`, `space.barLeft`, `space.barRight`, `space.barBottom` : Space around bar game object.
    - `space.text` : Space between text game object and action icon game object.
    - `space.actionTop`, `space.actionBottom` : Space around action game object.
- `easeDuration` : Total duration of easing value from level-start to level-end. Default value is `1000` ms.
- `levelCounter` : Config of [level-counter](levelcounter.md#create-instance)
    - `levelCounter.table` : Level table, return experience value from level value. Level value starts from `0`.
        - A callback
            ```javascript
            function(level) {
                return experience;
            }
            ```
        - A number array : Experience value of each level.
    - `levelCounter.maxLevel` :
        - `undefined` : Default value
            - No upper limit for callback level table.
            - `(table.length - 1)` for number array level table.
        - A number : Maximum level value
    - `levelCounter.exp` : Initial experience value. Default value is `0`.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#add-to-container).

### Custom class

- Define class
    ```javascript
    class MyExpBar extends RexPlugins.UI.ExpBar {
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
    var expBar = new MyExpBar(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
expBar.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = expBar.getElement('background');
        ```
    - Icon game object
        ```javascript
        var icon = expBar.getElement('icon');
        ```
    - NameText game object
        ```javascript
        var nameTextObject = expBar.getElement('name');
        ```
    - ValueText game object
        ```javascript
        var valueTextObject = expBar.getElement('value');
        ```
    - Bar game object
        ```javascript
        var textObject = expBar.getElement('bar');
        ```
    - Action icon game object
        ```javascript
        var action = expBar.getElement('action');
        ```
- Get by name
    ```javascript
    var gameObject = expBar.getElement('#' + name);
    // var gameObject = expBar.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = expBar.getByName(name);
    // var gameObject = expBar.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.


### Accumulate experience

- Accumulate experience
    ```javascript
    expBar.gainExp(incExp);
    // expBar.exp += incExp;
    ```
    - Will fire `'levelup'` event
- Reset experience value
    ```javascript
    expBar.resetExp(exp);
    ```
    - Won't fire `'levelup'` event.
- Force level up
    ```javascript
    expBar.setLevel(level);
    ```
    - Will fire `'levelup'` event

### Level and experience

- Get current experience
    ```javascript
    var exp = expBar.getExp();
    // var exp = expBar.exp;
    ```
- Get current level
    ```javascript
    var level = expBar.getLevel();
    // var level = expBar.level;
    ```
- Get current required experience to next level
    ```javascript
    var exp = expBar.requiredExp;
    ```
- Get experience of level
    ```javascript
    var exp = expBar.getExp(level);
    ```
- Get level from experience
    ```javascript
    var level = expBar.getLevel(exp);
    ```
- Get required experience to level
    ```javascript
    var exp = expBar.getRequiredExpToNextLevel(level);
    // var exp = expBar.getRequiredExpToNextLevel(level, exp);
    ```

### Events

- Easing starting of Level-up
    ```javascript
    expBar.on('levelup.start', function(level, fromExp, toExp){        
    }, scope);
    ```
    - `level` : Current level
- Easing end of Level-up
    ```javascript
    expBar.on('levelup.end', function(level, fromExp, toExp){        
    }, scope);
    ```
    - `level` : Current level
- Total easing of Level-up complete
    ```javascript
    expBar.on('levelup.complete', function(level){        
    }, scope);
    ```
    - `level` : Current level

### Other properties

See [NameValueLabel](ui-namevaluelabel.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).