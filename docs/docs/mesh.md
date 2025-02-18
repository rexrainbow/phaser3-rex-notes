## Introduction

Render a group of textured vertices.

- Author:Rex
- Game object 

!!! warning "WebGL only"
    It only works in WebGL render mode.

!!! warning "Incompatible"
    Does not support 3D model display.

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add image object

```javascript
var image = scene.add.rexMesh(x, y, key);
// var image = scene.add.rexMesh(x, y, key, frame);
```

Add image from JSON

```javascript
var image = scene.make.rexMesh({
    x: 0,
    y: 0,
    key: '',
    // frame: '',

    // angle: 0,
    // alpha: 1,
    // scale : {
    //    x: 1,
    //    y: 1
    //},
    // origin: {x: 0.5, y: 0.5},

    add: true
});
```

- `key`, `frame` : 
    - A string
    - An array of string to pick one element at random
- `x`, `y`, `scale.x`, `scale.y` :
    - A number
    - A callback to get return value
        ```javascript
        function() { return 0; }
        ```
    - Random integer between min and max
        ```javascript
        { randInt: [min, max] }
        ```
    - Random float between min and max
        ```javascript
        { randFloat: [min, max] }
        ```

### Custom class

- Define class
    ```javascript
    class MyMesh extends Mesh {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
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
    var image = new MyMesh(scene, x, y, key);
    ```

### Texture

See [game object - texture](gameobject.md#texture)

### Faces

#### Add grid faces

```javascript
mesh.addGridFaces(columns, rows);
```

#### Add faces with vertices

1. Create vertiex
    ```javascript
    var v0 = mesh.createVertex(u0, v0);
    var v1 = mesh.createVertex(u1, v1);
    var v2 = mesh.createVertex(u2, v2);
    ```
    - `u0`, `v0`, `u1`. `v1`, ... : `0` ~ `1`
2. Create face
    ```javascript
    var face = mesh.createFace(v0, v1, v2);
    ```
    - A face can use vertices shared by other faces.
3. Add face(s)
    ```javascript
    mesh.addFace(face);
    ```
    or
    ```javascript
    mesh.addFaces(faces);
    ```

#### Clear faces

```javascript
mesh.clear();
```

#### Get all faces

```javascript
var faces = mesh.faces;
```

#### Point inside face

- Get face contains point
    ```javascript
    var face = mesh.getFaceAt(worldX, worldY);
    // var face = mesh.getFaceAt(worldX, worldY, camera);
    ```
- Has any face which contains point
    ```javascript
    var isHit = mesh.hasFaceAt(worldX, worldY);
    // var isHit = mesh.hasFaceAt(worldX, worldY, camera);
    ```

#### Face properties

- Alpha
    - Get
        ```javascript
        var alpha = face.alpha;
        ```
    - Set
        ```javascript
        face.alpha = alpha;
        ```
- Angle
    - Rotate
        ```javascript
        Phaser.Geom.Mesh.RotateFace(face, radians);
        ```
- Offset position
    - Get
        ```javascript
        var localX = face.localOffsetX;
        var localY = face.localOffsetY;
        ```       
    - Set
        ```javascript
        face.localOffsetX = localX;
        face.localOffsetY = localY;
        ```
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
    - Set
        ```javascript
        vertex.setWorldXY(worldX, worldY);
        vertex.setPosition(worldX, worldY);
        ```
- Local position
    - Get
        ```javascript
        var localX = vertex.localX;
        var localY = vertex.localY;
        ```
    - Set
        ```javascript
        vertext.setLocalPosition(localX, localY);
        ```
        or
        ```javascript
        vertext.localX = localX;
        vertext.localY = localY;
        ```
- Rotate local position around another point
    ```javascript
    vertex.rotateAround(ox, oy, rotation);
    ```
    - `ox`, `oy` : Origin point.
    - `rotation` : Rotation angle by radius.
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
        vertex.color = color;        ```


### Interactive with texture rectangle

Texture rectangle the same as normal Image Game object.

```javascript
mesh.setInteractive();
```

### Interactive with faces

- Set face-interactive
    ```javascript
    mesh.setFaceInteractive();
    ```
- On pointer down at face
    ```javascript
    mesh.on('face.pointerdown', function (face, pointer, localX, localY, event) {

    })
    ```
- On pointer up at face
    ```javascript
    mesh.on('face.pointerup', function (face, pointer, localX, localY, event) {

    })
    ```
- On pointer move at face
    ```javascript
    mesh.on('face.pointermove', function (face, pointer, localX, localY, event) {

    })
    ```
- On pointer over face
    ```javascript
    mesh.on('face.pointerover', function (face, pointer, event) {

    })
    ```
- On pointer out face
    ```javascript
    mesh.on('face.pointerout', function (face, pointer, event) {

    })
    ```

### Debug

1. Set debug [Graphics](graphics.md)
    ```javascript
    var debugGraphics = scene.add.graphics();
    mesh.setDebug(debugGraphics);
    ```
1. Update [Graphics](graphics.md) in `scene.update()` method.
    ```javascript
    debugGraphics.clear();
    debugGraphics.lineStyle(1, 0x00ff00);
    ```

### Other properties

See [game object](gameobject.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
