## Introduction

Shatter image to triangle faces.

Reference: [Delaunay Triangulation](https://github.com/darkskyapp/delaunay-fast)

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- [Shatter image](https://codepen.io/rexrainbow/pen/qBaawym)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/shatter-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexshatterimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshatterimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexShatterImage(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import ShatterImagePlugin from 'phaser3-rex-plugins/plugins/shatterimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexShatterImagePlugin',
                plugin: ShatterImagePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexShatterImage(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ShatterImage } from 'phaser3-rex-plugins/plugins/shatterimage.js';
    ```
- Add image object
    ```javascript    
    var image = new ShatterImage(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexShatterImage(x, y, texture, frame, {
    // ringRadiusList: [1 / 27, 3 / 27, 9 / 27],
    // ringRadiusList: function(width, height) {
    //    return [1 / 27, 3 / 27, 9 / 27];
    // },

    // samplesPerRing: 12
    // variation: 0.25,    
});
```

or 

```javascript
var image = scene.add.rexShatterImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,

    // ringRadiusList: [1 / 27, 3 / 27, 9 / 27],
    // ringRadiusList: function(width, height) {
    //    return [1 / 27, 3 / 27, 9 / 27];
    // },

    // samplesPerRing: 12,
    // variation: 0.25,
    
});
```

- `ringRadiusList` :
    - A list of number. Default value is `[1 / 27, 3 / 27, 9 / 27]`
    - A callback to return a list of number
        ```javascript
        function(width, height) {
            return [1 / 27, 3 / 27, 9 / 27];
        }
        ```

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexShatterImage({
    x: 0,
    y: 0,
    key: null,
    frame: null,

    // ringRadiusList: [1 / 27, 3 / 27, 9 / 27],
    // ringRadiusList: function(width, height) {
    //    return [1 / 27, 3 / 27, 9 / 27];
    // },

    // samplesPerRing: 12,
    // variation: 0.25,
    

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyShatterImage( extends ShatterImage( {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     super.preUpdate(time, delta);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var image = new MyShatterImage(scene, x, y, texture, frame, config);
    ```

### Shatter image

```javascript
image.shatter(centerX, centerY);
// image.shatter();
```

or

```javascript
image.shatter(centerX, centerY, {
    // ringRadiusList:
    // samplesPerRing: 
    // variation
});
```

or

```javascript
image.shatter({
    // centerX: 
    // centerY: 
    // ringRadiusList:
    // samplesPerRing: 
    // variation
});
```

- `centerX`, `centerY` : Center position of shatter.
    - `undefined` : Default value is center of image.

Shatter image into triangle faces.

#### Position of Shatter center

```javascript
var shatterCenter = image.shatterCenter; // {x, y}
```

### Faces

```javascript
var faces = image.faces;
```

Faces will be sorted nearby shatter-center to far away.

#### Properties

- Alpha
    - Get
        ```javascript
        var alpha = face.alpha;
        ```
    - Set
        ```javascript
        face.alpha = alpha;
        ```
        or
        ```javascript
        face.setAlpha(value);
        ```
- Tint color
    - Get
        ```javascript
        var color = face.tint;
        ```
    - Set
        ```javascript
        face.tint = color;
        ```
        or
        ```javascript
        face.setTint(color);
        ```
- Angle
    - Get
        ```javascript
        var radians = face.rotation;
        // var degree = face.angle;
        ```
    - Set
        ```javascript
        face.rotation = radians;
        // face.angle = degree;
        ```
        or
        ```javascript
        face.setRotation(radians);
        // face.setAngle(degree);
        ```
- Center position
    - Get
        ```javascript
        var x = face.x;
        var y = face.y;
        ```
        - `x` : 0(left) ~ 1(right)
        - `y` : 1(top) ~ 0(bottom)
    - Set
        ```javascript
        face.x = x;
        face.y = y;
        ```
        or
        ```javascript
        face.translate(x, y);
        ```
        - `x` : 0(left) ~ 1(right)
        - `y` : 1(top) ~ 0(bottom)

##### Update properties

- Start updating
    ```javascript
    image.startUpdate();
    ```
    or
    ```javascript
    image.ignoreDirtyCache = true;
    ```
- Stop updating
    ```javascript
    image.stopUpdate();
    ```
    or
    ```javascript
    image.ignoreDirtyCache = false;
    ```

##### Tween properties

```javascript
image.startUpdate();
scene.tweens.add({
    targets: image.faces,
    alpha: 0,
    angle: function () { return -90 + Math.random() * 180; },
    y: '-=0.5',
    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 1000,
    delay: scene.tweens.stagger(20),
    repeat: 0,            // -1: infinity
    yoyo: false,
    onComplete: function () {
        image.stopUpdate()
    }
});
```

### Reset image

Display original image with 2 faces.

```javascript
image.resetImage();
```

### Tint color

- Get
   ```javascript
   var color = image.tint;
   ```
- Set
    ```javascript
    image.tint = color;
    ```
    or
    ```javascript
    image.setTint(color);
    ```

### Other properties

See [Mesh game object](mesh.md), [game object](gameobject.md)

### Create mask

```javascript
var mask = image.createBitmapMask();
```

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
