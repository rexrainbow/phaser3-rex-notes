## Introduction

Align objects on quadrilateral or hexagon grid. 

See also [built-in grid-align](groupactions.md#grid-align).

- Author: Rex
- Methods

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/gridalign)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgridalignplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridalignplugin.min.js', true);
    ```
- Grid-align objects
    ```javascript
    scene.plugins.get('rexgridalignplugin').quad(gameObjects, config);
    scene.plugins.get('rexgridalignplugin').hexagon(gameObjects, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GridAlignPlugin from 'phaser3-rex-plugins/plugins/gridalign-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGridAlign',
                plugin: GridAlignPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Grid-align objects
    ```javascript
    scene.plugins.get('rexGridAlign').quad(gameObjects, config);
    scene.plugins.get('rexGridAlign').hexagon(gameObjects, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { QuadGridAlign, HexagonGridAlign } from 'phaser3-rex-plugins/plugins/gridalign.js';
    ```
- Grid-align objects
    ```javascript
    QuadGridAlign(gameObjects, config);
    HexagonGridAlign(gameObjects, config);
    ```

### Quadrilateral grid

```javascript
scene.plugins.get('rexGridAlign').quad(gameObjects, {
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
scene.plugins.get('rexGridAlign').hexagon(gameObjects, {
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

