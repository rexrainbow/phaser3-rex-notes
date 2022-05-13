## Introduction

A container with badges above a main item.

- Author: Rex
- Game object

## Live demos

- [Badge](https://codepen.io/rexrainbow/pen/GRWWbdg)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/uiBadgeLabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add badge-label object
    ```javascript
    var badgeLabel = scene.rexUI.add.badgeLabel(config);
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
- Add badge-label object
    ```javascript
    var badgeLabel = scene.rexUI.add.badgeLabel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { BadgeLabel } from 'phaser3-rex-plugins/templates/ui/uiComponents.js';
    ```
- Add badge-label object
    ```javascript    
    var badgeLabel = new BadgeLabel(scene, config);
    scene.add.existing(badgeLabel);
    ```

### Add badgeLabel object

```javascript
var badgeLabel = scene.rexUI.add.badgeLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    background: backgroundGameObject,
    main: mainItemGameObject,

    leftTop: leftTopBadgeGameObject,
    centerTop: centerTopBadgeGameObject,
    rightTop: rightTopBadgeGameObject,
    leftCenter: leftCenterBadgeGameObject,
    center: centerBadgeGameObject,
    rightCenter: rightCenterBadgeGameObject,
    leftBottom: leftBottomBadgeGameObject,
    centerBottom: centerBottomBadgeGameObject,
    rightBottom: rightBottomBadgeGameObject,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
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
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of badgeLabel.
- `main` : Game object of main item, optional.
- `leftTop` : Badge game object at leftTop side, optional.
- `centerTop` : Badge game object at centerTop side, optional.
- `rightTop` : Badge game object at rightTop side, optional.
- `leftCenter` : Badge game object at leftCenter side, optional.
- `center` : Badge game object at center side, optional.
- `rightCenter` : Badge game object at rightCenter side, optional.
- `leftBottom` : Badge game object at leftBottom side, optional.
- `centerBottom` : Badge game object at centerBottom side, optional.
- `rightBottom` : Badge game object at rightBottom side, optional.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
        - Positive number : Indent badge game objects inside background.
        - Negative number : Exceed badge game objects out of background.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.

### Custom class

- Define class
    ```javascript
    class MyBadgeLabel extends RexPlugins.UI.BadgeLabel {
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
    var badgeLabel = new MyBadgeLabel(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
badgeLabel.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = badgeLabel.getElement('background');
        ```
    - Main item game object
        ```javascript
        var item = badgeLabel.getElement('main');
        ```
    - LeftTop badge game object
        ```javascript
        var badge = badgeLabel.getElement('leftTop');
        ```
    - CenterTop badge game object
        ```javascript
        var badge = badgeLabel.getElement('centerTop');
        ```
    - RightTop badge game object
        ```javascript
        var badge = badgeLabel.getElement('rightTop');
        ```
    - LeftCenter badge game object
        ```javascript
        var badge = badgeLabel.getElement('leftCenter');
        ```
    - Center badge game object
        ```javascript
        var badge = badgeLabel.getElement('center');
        ```
    - RightCenter badge game object
        ```javascript
        var badge = badgeLabel.getElement('rightCenter');
        ```        
    - LeftBottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('leftBottom');
        ```
    - CenterBottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('centerBottom');
        ```
    - RightBottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('rightBottom');
        ```
- Get by name
    ```javascript
    var gameObject = badgeLabel.getElement('#' + name);
    // var gameObject = badgeLabel.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = badgeLabel.getByName('#' + name);
    // var gameObject = badgeLabel.getByName('#' + name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Other properties

See [overlap sizer object](ui-overlapsizer.md), [base sizer object](ui-basesizer.md).