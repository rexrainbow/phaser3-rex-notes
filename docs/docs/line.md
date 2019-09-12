## Introduction

Draw a line with start/end/body textures.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/line-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexlineplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/line.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/line)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLinePlugin',
            plugin: LinePlugin,
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
var line = scene.add.rexLine({
    start: {
        x: 0, y: 0,
        key: undefined, frame: undefined, origin: 0.5,
    },
    // start: key,
    // start: undefined,

    end: {
        x: 0, y: 0,
        key: undefined, frame: undefined, origin: 1,
    },
    // end: key,
    // end: undefined,

    body: {
        key: undefined, frame: undefined, extendMode: 1,
        width: undefined,
    },
    // body: key,
});
```

- `start` : Configuration of line-start. Or texture key of line-start.
    - `start.x`, `start.y` : Position of line-start.
    - `start.key`, `start.frame` : Texrure of line-start.
    - `start.origin` : Origin of line-start. Default is `0.5`.
- `end` : Configuration of line-end. Or texture key of line-end.
    - `end.x`, `end.y` : Position of line-end.
    - `end.key`, `end.frame` : Texrure of line-end.
    - `end.origin` : Origin of line-end. Default is `1`.
- `body` : Configuration of line-body. Or texture key of line-body.
    - `body.key`, `body.frame` : Texrure of line-body. Line-body will be drawn repeatedly.
    - `body.extendMode` : Extend mode of line-body.
        - `0`, or `'scale'` : Draw line-body with scaled image game object.
        - `1`, or `'repeat'` : Draw line-body with tile-sprute game object. (Default value)
    - `body.width` : Line width.

### Custom class

- Define class
    ```javascript
    class MyLine extends Line {
        constructor(scene, config) {
            super(scene, config);
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
    var line = new MyLine(scene, config);
    ```

### Position of line-start/line-end

- Line start
    - Get
        ```javascript
        var x0 = line.x0;
        var y0 = line.y0;
        ```
    - Set
        ```javascript
        line.setLineStartPosition(x, y);
        ```
        or
        ```javascript
        line.x0 = x;
        line.y0 = y;
        ```
- Line end
    - Get
        ```javascript
        var x1 = line.x1;
        var y1 = line.y1;
        ```
    - Set
        ```javascript
        line.setLineEndPosition(x, y);
        ```
        or
        ```javascript
        line.x1 = x;
        line.y1 = y;
        ```

### Set textures

- Line-start
    - Set line-start texture
        ```javascript
        line.setLineStartTexture(key, frameName);
        ```
    - Set origin of line-start texture
        ```javascript
        line.setLineStartOrigin(origin);
        ```
        - `origin` : `0`~`1`. Default is `0`, to align the left side of line-start texture with start position.
- Line-end
    - Set line-end texture
        ```javascript
        line.setLineEndTexture(key, frameName);
        ```
    - Set origin of line-end texture
        ```javascript
        line.setLineEndOrigin(origin);
        ```
        - `origin` : `0`~`1`. Default is `1`, to align the right side of line-end texture with end position.
- Line-body
    - Set line-body texture
        ```javascript
        line.setLineBodyTexture(key, frameName);
        ```
    - Set line-body extend mode
        ```javascript
        line.setLineBodyExtendMode(mode);
        ```
        - `mode` : 
            - `0`, or `'scale'` : Draw line-body with scaled image game object.
            - `1`, or `'repeat'` : Draw line-body with tile-sprute game object.        
    - Set line-body width
        ```javascript
        line.setLineBodyWidth(width);
        ```