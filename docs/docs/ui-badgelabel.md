## Introduction

A container with badges above a main item.

- Author: Rex
- Game object

## Live demos

- [Badge](https://codepen.io/rexrainbow/pen/GRWWbdg)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-badgeLabel)

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
    import { BadgeLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add badge-label object
    ```javascript    
    var badgeLabel = new BadgeLabel(scene, config);
    sscene.add.existing(badgeLabel);
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

    'left-top': leftTopBadgeGameObject,
    'center-top': centerTopBadgeGameObject,
    'right-top': rightTopBadgeGameObject,
    'left-center': leftCenterBadgeGameObject,
    'center': centerBadgeGameObject,
    'right-center': rightCenterBadgeGameObject,
    'left-bottom': leftBottomBadgeGameObject,
    'center-bottom': centerBottomBadgeGameObject,
    'right-bottom': rightBottomBadgeGameObject,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    // name: '',
    // draggable: false
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
- `width`, `height` : Minimum width, minimum height.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of badgeLabel.
- `main` : Game object of main item, optional.
- `'left-top'` : Badge game object at left-top side, optional.
- `'center-top'` : Badge game object at center-top side, optional.
- `'right-top'` : Badge game object at right-top side, optional.
- `'left-center'` : Badge game object at left-center side, optional.
- `'center'` : Badge game object at center side, optional.
- `'right-center'` : Badge game object at right-center side, optional.
- `'left-bottom'` : Badge game object at left-bottom side, optional.
- `'center-bottom'` : Badge game object at center-bottom side, optional.
- `'right-bottom'` : Badge game object at right-bottom side, optional.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
        - Positive number : Indent badge game objects inside background.
        - Negative number : Exceed badge game objects out of background.
- `name` : Set name of this badgeLabel.
- `draggable` : Set `true` to drag to-most badgeLabel.

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
    - Left-top badge game object
        ```javascript
        var badge = badgeLabel.getElement('left-top');
        ```
    - Center-top badge game object
        ```javascript
        var badge = badgeLabel.getElement('center-top');
        ```
    - Right-top badge game object
        ```javascript
        var badge = badgeLabel.getElement('right-top');
        ```
    - Left-center badge game object
        ```javascript
        var badge = badgeLabel.getElement('left-center');
        ```
    - Center badge game object
        ```javascript
        var badge = badgeLabel.getElement('center');
        ```
    - Right-center badge game object
        ```javascript
        var badge = badgeLabel.getElement('right-center');
        ```        
    - Left-bottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('left-bottom');
        ```
    - Center-bottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('center-bottom');
        ```
    - Right-bottom badge game object
        ```javascript
        var badge = badgeLabel.getElement('right-bottom');
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