## Introduction

Split image to triangle faces. Similar with [ShatterImage](shatter-image.md), with different spliting rule.

Reference: [Delaunay Triangulation](https://github.com/darkskyapp/delaunay-fast)

- Author: Rex
- Game object

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Live demos

- []()

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/delaunay-image)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdelaunayimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdelaunayimageplugin.min.js', true);
    ```
- Add image object
    ```javascript
    var image = scene.add.rexDelaunayImage(x, y, texture, frame, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DelaunayImagePlugin from 'phaser3-rex-plugins/plugins/delaunayimage-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDelaunayImagePlugin',
                plugin: DelaunayImagePlugin,
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
    var image = scene.add.rexDelaunayImage(x, y, texture, frame, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { DelaunayImage } from 'phaser3-rex-plugins/plugins/delaunayimage.js';
    ```
- Add image object
    ```javascript    
    var image = new DelaunayImage(scene, x, y, texture, frame, config);
    scene.add.existing(image);
    ```

### Create instance

```javascript
var image = scene.add.rexDelaunayImage(x, y, texture, frame, {
    // triangleCount: 8,
});
```

or 

```javascript
var image = scene.add.rexDelaunayImage({
    // x: 0,
    // y: 0,
    key,
    // frame: null,

    // triangleCount: 8,
    
});
```

- `triangleCount` : Triangle count, an even number.

Add perspectiveimage from JSON

```javascript
var perspectiveimage = scene.make.rexDelaunayImage({
    x: 0,
    y: 0,
    key: null,
    frame: null,

    // triangleCount: 8,

    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyDelaunayImage( extends DelaunayImage( {
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
    var image = new MyDelaunayImage(scene, x, y, texture, frame, config);
    ```

### Delaunay image

```javascript
image.reTriangulate({triangleCount});
// image.reTriangulate();
```

- `triangleCount` : Triangle count, an even number.

Delaunay image into triangle faces.

### Faces

```javascript
var faces = image.faces;
```

Faces will be sorted nearby delaunay-center to far away.

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
- Vertices
    ```javascript
    var vertex0 = face.vertex0;
    var vertex1 = face.vertex1;
    var vertex2 = face.vertex2;
    ```
    or
    ```javascript
    var vertices = face.vertices;
    var vertex0 = vertices[0];
    var vertex1 = vertices[1];
    var vertex2 = vertices[2];
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
        // image.resetImage()
    }
});
```

### Vertices

Each face has 3 vertices, and a face can use vertices shared by other faces.

```javascript
var vertices = mesh.vertices;
```

- `vertices` : Array of vertex.

```javascript
var vertices = face.vertices;
```

#### Properties

- World position
    - Get
        ```javascript
        var worldX = vertex.worldX;
        var worldY = vertex.worldY;
        // var worldX = vertex.x;
        // var worldY = vertex.y;
        ```
        or
        ```javascript
        var wordXY = vertex.getWorldXY();       // {x,y}
        // var worldXY= vertex.getWorldXY(out);
        ```
- Local position
    - Get
        ```javascript
        var localX = vertex.localX;
        var localY = vertex.localY;
        ```
- Reset to default position
    ```javascript
    vertex.resetPosition();
    ```
- Alpha
    - Get
        ```javascript
        var alpha = vertex.alpha;
        ```
    - Set
        ```javascript
        vertex.alpha = alpha;
        ```
- Tint
    - Get
        ```javascript
        var color = vertex.color;
        ```
    - Set
        ```javascript
        vertex.color = color;        
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

See [mask](mask.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
