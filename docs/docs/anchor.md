## Introduction

Set position based on visible window.

!!! note
    Visible window will be changed when scale mode is *ENVELOP*, *WIDTH_CONTROLS_HEIGHT*, or *HEIGHT_CONTROLS_WIDTH*.

- Author: Rex
- Behavior of game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/anchor-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexanchorplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/anchor)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexAnchor from './plugins/anchor.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import AnchorPlugin from './plugins/anchor-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexAnchor',
            plugin: AnchorPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var anchor = scene.plugins.get('rexAnchor').add(gameObject, {
    // left: '0%+0',
    // right: '0%+0',
    // centerX: '0%+0',
    // x: '0%+0',

    // top: '0%+0',
    // bottom: '0%+0',
    // centerY: '0%+0',
    // y: '0%+0'
});
```

- `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`.

For example, anchor game object's left bound to viewport's left+10, and centerY to viewport's center :

```javascript
{
    left: 'left+10',
    centerY: 'center'
}
```

### Reset config

```javascript
anchor.resetFromJSON({
    // left: '0%+0',
    // right: '0%+0',
    // centerX: '0%+0',
    // x: '0%+0',

    // top: '0%+0',
    // bottom: '0%+0',
    // centerY: '0%+0',
    // y: '0%+0'
})
```

- `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: 0~100
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`
