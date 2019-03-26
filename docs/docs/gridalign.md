## Introduction

Align objects on quadrilateral or hexagon grid. 

See also [built-in grid-align](groupactions.md#grid-align).

- Author: Rex
- Methods

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/gridalign-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexgridalignplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridalign)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexGridAlign from './plugins/gridalign.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import GridAlignPlugin from './plugins/gridalign-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexGridAlign',
            plugin: GridAlignPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Quadrilateral grid

```javascript
scene.plugins.get('rexGridAlign').quad(items, {
    width: -1,
    height: -1,
    cellWidth: 1,
    cellHeight: 1,
    type: 0,
    position: Phaser.Display.Align.CENTER,
    x: 0,
    y: 0
});
```

- `width` : The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
- `height` : The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `type`
    - `0`, or `orthogonal`
    - `1`, or `isometric`
- `position` : The alignment position.
    - `0`, or `Phaser.Display.Align.TOP_LEFT`
    - `1`, or `Phaser.Display.Align.TOP_CENTER`
    - `2`, or `Phaser.Display.Align.TOP_RIGHT`
    - `3`, or `Phaser.Display.Align.LEFT_TOP`
    - `4`, or `Phaser.Display.Align.LEFT_CENTER`
    - `5`, or `Phaser.Display.Align.LEFT_BOTTOM`
    - `6`, or `Phaser.Display.Align.CENTER`
    - `7`, or `Phaser.Display.Align.RIGHT_TOP`
    - `8`, or `Phaser.Display.Align.RIGHT_CENTER`
    - `9`, or `Phaser.Display.Align.RIGHT_BOTTOM`
    - `10`, or `Phaser.Display.Align.BOTTOM_LEFT`
    - `11`, or `Phaser.Display.Align.BOTTOM_CENTER`
    - `12`, or `Phaser.Display.Align.BOTTOM_RIGHT`
- `x`, `y` : Position of first item.

### Hexagon grid

```javascript
scene.plugins.get('rexGridAlign').hexagon(items, {
    width: -1,
    height: -1,
    cellWidth: 1,
    cellHeight: 1,
    staggeraxis: 'x',
    staggerindex: 'odd',
    position: Phaser.Display.Align.CENTER,
    x: 0,
    y: 0
});
```

- `width` : The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
- `height` : The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
- `cellWidth` : The width of the cell, in pixels.
- `cellHeight` : The height of the cell, in pixels.
- `staggeraxis`
    - `0`, or `y`
    - `1`, or `x`
- `staggerindex`
    - `0`, or `even`
    - `1`, or `odd`
- `position` : The alignment position.
    - `0`, or `Phaser.Display.Align.TOP_LEFT`
    - `1`, or `Phaser.Display.Align.TOP_CENTER`
    - `2`, or `Phaser.Display.Align.TOP_RIGHT`
    - `3`, or `Phaser.Display.Align.LEFT_TOP`
    - `4`, or `Phaser.Display.Align.LEFT_CENTER`
    - `5`, or `Phaser.Display.Align.LEFT_BOTTOM`
    - `6`, or `Phaser.Display.Align.CENTER`
    - `7`, or `Phaser.Display.Align.RIGHT_TOP`
    - `8`, or `Phaser.Display.Align.RIGHT_CENTER`
    - `9`, or `Phaser.Display.Align.RIGHT_BOTTOM`
    - `10`, or `Phaser.Display.Align.BOTTOM_LEFT`
    - `11`, or `Phaser.Display.Align.BOTTOM_CENTER`
    - `12`, or `Phaser.Display.Align.BOTTOM_RIGHT`
- `x`, `y` : Position of first item.

#### Types of hexagon grid

[Reference](https://www.redblobgames.com/grids/hexagons/#coordinates-offset)

- `odd-r` : staggeraxis = `x`, staggerindex = `odd`
- `even-r` : staggeraxis = `x`, staggerindex = `even`
- `odd-q` : staggeraxis = `y`, staggerindex = `odd`
- `even-q` :staggeraxis = `y`, staggerindex = `even`

