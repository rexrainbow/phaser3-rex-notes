## Introduction

Stretchable image.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/ninepatch-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexninepatchplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/ninepatch.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ninepatch)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexNinePatchPlugin',
            plugin: NinePatchPlugin,
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
var ninePatch = scene.add.rexNinePatch(x, y, width, height, key, columns, rows, {
    stretchMode: 0,
    getFrameNameCallback: undefined,
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch(x, y, width, height, {
    key: undefined,
    columns: undefined,
    rows: undefined,

    stretchMode: 0,
    getFrameNameCallback: undefined,
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch(x, y, {
    width: 1, height: 1,
    key: undefined,
    columns: undefined,
    rows: undefined,

    stretchMode: 0,
    getFrameNameCallback: undefined,
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch({
    x: 0, y: 0,
    width: 1, height: 1,
    key: undefined,
    columns: undefined,
    rows: undefined,

    stretchMode: 0,
    getFrameNameCallback: undefined,
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `key` : Texture key of source image.
- `columns` : Configuration of columns.
    - A number array, like `[20, 20, 20]`, or `[20, undefined, 20]` : Width of each column. `undefined` value will be replaced by remainder value from texture width.
        - Width of odd columns (column `0`, column `2`, ...) will be origin width.
        - Width of even columns (column `1`, column `3`, ...) will be stretched.
- `rows` : Configuration of rows. 
    - A number array, like `[20, 20, 20]`, or `[20, undefined, 20]` : Height of each row. `undefined` value will be replaced by remainder value from texture width.
        - Height of odd rows (row `0`, row `2`, ...) will be origin height.
        - Height of odd rows (row `1`, row `3`, ...) will be stretched.
- `stretchMode` : Stretch mode of edges and internal cells.
    - A number (`0`, or `1`), or a string (`'scale'`, or `'repeat'`): 
        - `0`, or `'scale'` : Stretch each edge and internal cell by scaled image. Default value.
        - `1`, or `'repeat'` : Stretch each edge and internal cell by repeated image (tile-sprite).
    - An object : 
        ```javascript
        {
            edge: 0, // 'scale', or 1, 'repeat'
            internal: 0, // 'scale', or 1, 'repeat'
        }
        ```
- `getFrameNameCallback` : Callback to get frame name of each cell.
    - `undefined` : Use default callback, which will return `${colIndex},${rowIndex}`.
    - Function object : Return a string, or `undefined`.
        ```javascript
        function(colIndex, rowIndex) {
            return `${colIndex},${rowIndex}`
        }
        ```

### Custom class

- Define class
    ```javascript
    class MyNinePatch extends NinePatch {
        constructor(scene, x, y, width, height, key, columns, rows, config) {
            super(scene, x, y, width, height, key, columns, rows, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var ninePatch = new MyNinePatch(scene, x, y, width, height, key, columns, rows, config);
    ```

### Resize

```javascript
ninePatch.resize(width, height);
```

### Set texture of source image

```javascript
ninePatch.setTexture(key, columns, rows);
```

- `key` : Texture key of source image.
- `columns` : Configuration of columns.
    - A number array, like `[20, 20, 20]` : Width of each column.
        - Width of odd columns (column `0`, column `2`, ...) will be origin width.
        - Width of even columns (column `1`, column `3`, ...) will be stretched.
- `rows` : Configuration of rows. 
    - A number array, like `[20, 20, 20]` : Height of each row.
        - Height of odd rows (row `0`, row `2`, ...) will be origin height.
        - Height of odd rows (row `1`, row `3`, ...) will be stretched.

### Set stretch mode

```javascript
ninePatch.setStretchMode(mode);
```

- `mode` :
    - A number (`0`, or `1`), or a string (`'scale'`, or `'repeat'`): 
        - `0`, or `'scale'` : Stretch each edge and internal cell by scaled image. Default value.
        - `1`, or `'repeat'` : Stretch each edge and internal cell by repeated image (tile-sprite).
    - An object : 
        ```javascript
        {
            edge: 0, // 'scale', or 1, 'repeat'
            internal: 0, // 'scale', or 1, 'repeat'
        }
        ```

### Set get-frame-name callback

```javascript
ninePatch.setGetFrameNameCallback(callback);
```

- `callback` : Return a string, or `undefined`.
    ```javascript
    function(colIndex, rowIndex) {
        return `${colIndex},${rowIndex}`
    }
    ```
