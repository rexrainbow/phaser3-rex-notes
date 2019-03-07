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
var moveTo = scene.plugins.get('rexAnchor').add(gameObject, {
    x: '0%+0',
    y: '0%+0'
});
```

- `x`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: 0~100
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`

For example

```javascript
{
    x: 'left+10',
    y: 'center'
}
```

!!! note
    Set the origin of game object (`gameObject.setOrigin(x, y)`) to align visible window.