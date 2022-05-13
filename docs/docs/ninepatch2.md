## Introduction

Stretchable image. Has better performance than [nine-patch](ninepatch.md).

- Author: Rex
- Game object

## Live demos

- [3x3](https://codepen.io/rexrainbow/pen/RwxZbpM)
- [Performance test](https://codepen.io/rexrainbow/pen/eYyEOWp)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ninepatch2)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexninepatch2plugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexninepatch2plugin.min.js', true);
    ```
- Add nine-patch object
    ```javascript
    var ninePatch = scene.add.rexNinePatch2(x, y, width, height, key, baseFrame, columns, rows, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import NinePatch2Plugin from 'phaser3-rex-plugins/plugins/ninepatch2-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexNinePatch2Plugin',
                plugin: NinePatch2Plugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add nine-patch object
    ```javascript
    var ninePatch = scene.add.rexNinePatch2(x, y, width, height, key, baseFrame, columns, rows, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import NinePatch2 from 'phaser3-rex-plugins/plugins/ninepatch2.js';
    ```
- Add nine-patch object
    ```javascript    
    var ninePatch = new NinePatch2(scene, x, y, width, height, key, baseFrame, columns, rows, config);
    scene.add.existing(ninePatch);
    ```

### Create instance

```javascript
var ninePatch = scene.add.rexNinePatch2(x, y, width, height, key, baseFrame, columns, rows, {
    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    getFrameNameCallback: undefined
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch2(x, y, width, height, key, columns, rows, {
    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    baseFrame: undefined,
    getFrameNameCallback: undefined
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch2(x, y, width, height, key, {
    columns: undefined,
    rows: undefined,

    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    baseFrame: undefined,
    getFrameNameCallback: undefined
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch2(x, y, width, height, {
    key: undefined,
    columns: undefined,
    rows: undefined,

    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    baseFrame: undefined,
    getFrameNameCallback: undefined
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch2(x, y, {
    width: 1, height: 1,
    key: undefined,
    columns: undefined,
    rows: undefined,

    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    baseFrame: undefined,
    getFrameNameCallback: undefined
});
```

or

```javascript
var ninePatch = scene.add.rexNinePatch2({
    x: 0, y: 0,
    width: 1, height: 1,
    key: undefined,
    columns: undefined,
    rows: undefined,

    // preserveRatio: true,
    // maxFixedPartScale: 1,
    // stretchMode: 0,
    baseFrame: undefined,
    getFrameNameCallback: undefined
});
```

- `x`, `y` : Position of this object.
- `width`, `height` : Size of this object.
- `key` : Texture key of source image.
- `baseFrame` : Frame name of base texture.
    - `undefined` : Use default base frame `'__BASE'`.
- `columns` : Configuration of columns.
    - A number array, like `[20, 20, 20]`, or `[20, undefined, 20]` : Width of each column. `undefined` value will be replaced by remainder value from texture width.
        - Width of odd columns (column `0`, column `2`, ...) will be origin width.
        - Width of even columns (column `1`, column `3`, ...) will be stretched.
- `rows` : Configuration of rows. 
    - A number array, like `[20, 20, 20]`, or `[20, undefined, 20]` : Height of each row. `undefined` value will be replaced by remainder value from texture width.
        - Height of odd rows (row `0`, row `2`, ...) will be origin height.
        - Height of odd rows (row `1`, row `3`, ...) will be stretched.
- `preserveRatio` : Preserve ratio of fixed parts (i.e. displaying in origin size). Default is `true`.
- `maxFixedPartScale` : Max scale value of fixed-part.
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
    - `undefined` : Use default callback.
        - If `baseFrame` is `'__BASE'` : return `${colIndex},${rowIndex}`
        - Else : return `${baseFrame}_${colIndex},${rowIndex}`
    - Function object : Return a string, or `undefined`.
        ```javascript
        function(colIndex, rowIndex, baseFrame) {
            return `${colIndex},${rowIndex}`;
        }
        ```

### Custom class

- Define class
    ```javascript
    class MyNinePatch extends NinePatch2 {
        constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
            super(scene, x, y, width, height, key, baseFrame, columns, rows, config);
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
    var ninePatch = new MyNinePatch(scene, x, y, width, height, key, baseFrame, columns, rows, config);
    ```

### Resize

```javascript
ninePatch.resize(width, height);
```

Will [update texture](ninepatch.md#update-texture)

### Tint

- Set tint
    ```javascript
    ninePatch.setTint(tint);
    ```
- Clear tint
    ```javascript
    ninePatch.clearTint();
    ```
- Set tint fill
    ```javascript
    ninePatch.setTintFill(tint);
    ```
- Get tint
    ```javascript
    var tint = ninePatch.tint;
    var tintFill = ninePatch.tintFill;
    ```
    - `tintFill` :
        - `false` : Solid tint + texture alpha
        - `true` : Solid tint, no texture

### Set texture of source image

```javascript
ninePatch.setTexture(key, baseFrame, columns, rows);
// ninePatch.setTexture(key, columns, rows);
```

- `key` : Texture key of source image.
- `baseFrame` : Frame name of base texture.
    - `undefined` : Use default base frame `'__BASE'`. Default value.
- `columns` : Configuration of columns.
    - A number array, like `[20, 20, 20]` : Width of each column.
        - Width of odd columns (column `0`, column `2`, ...) will be origin width.
        - Width of even columns (column `1`, column `3`, ...) will be stretched.
- `rows` : Configuration of rows. 
    - A number array, like `[20, 20, 20]` : Height of each row.
        - Height of odd rows (row `0`, row `2`, ...) will be origin height.
        - Height of odd rows (row `1`, row `3`, ...) will be stretched.

Will [update texture](ninepatch.md#update-texture)

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
    function(colIndex, rowIndex, baseFrame) {
        return `${colIndex},${rowIndex}`
    }
    ```

### Fixed-part scale

- Fixed-part scale
    - Get
        ```javascript
        var scaleX = ninePatch.fixedPartScaleX;
        var scaleY = ninePatch.fixedPartScaleY;
        ```
- Max fixed-part scale
    - Get
        ```javascript
        var scaleX = ninePatch.maxFixedPartScaleX;
        var scaleY = ninePatch.maxFixedPartScaleY;
        ```
    - Set
        ```javascript
        ninePatch.setMaxFixedPartScale(scale);
        // ninePatch.setMaxFixedPartScale(scaleX, scaleY);
        ```
        or
        ```javascript
        ninePatch.maxFixedPartScaleX = scaleX;
        ninePatch.maxFixedPartScaleY = scaleY;
        ```

### Update texture

```javascript
ninePatch.updateTexture();
```

### Compare with [nine-patch](ninepatch.md)

- Nine-patch2 has better performance.
    - Nine-patch extends from [render-texture](rendertexture.md), which will create a new texture, then draw frames on it.
    - Nine-patch2 draws frames directly.
- Nine-patch2 does not have `flip`, `crop` methods.
- Nine-patch2 can't apply custom spriteFx pipeline.