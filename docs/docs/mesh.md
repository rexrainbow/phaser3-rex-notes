## Introduction

Render a group of textured vertices and manipulate the view of those vertices, such as rotation, translation or scaling.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Quad

1. Load texture
    ```javascript
    scene.load.image(key, url);
    ```
1. Add mesh object
    ```javascript
    var mesh = scene.add.mesh(x, y, texture, frame);
    ```
    or
    ```javascript
    var mesh = scene.make.mesh({
        x: 0,
        y: 0,
        add: true,

        key: null,
        frame: null
    });
    ```
1. Set perspective or orthographic projection
    - Perspective projection
        ```javascript
        mesh.setPerspective(width, height, fov);
        // mesh.setPerspective(width, height, fov, near, far);
        ```
        - `width`, `height` : The width/height of the projection matrix. Typically the same as the Mesh and/or Renderer.
        - `fov` : The field of view, in degrees.
        - `near`, `far` : The near/far value of the view. Default value are `0.01`/`1000`.
    - Orthographic projection
        ```javascript
        mesh.setOrtho(mesh.width/mesh.height, 1);
        // mesh.setOrtho(scaleX, scaleY, near, far);
        ```
        - `scaleX`, `scaleY` : The default horizontal/vertical scale in relation to the Mesh / Renderer dimensions.
        - `near`, `far` : The near/far value of the view. Default value are `0.01`/`1000`.
1. Creates a grid of vertices
    ```javascript
    Phaser.Geom.Mesh.GenerateGridVerts({
        mesh: mesh,
        texture: textureKey,
        frame: frameName,
        width: 1,
        height: 1,
        widthSegments: 1,
        heightSegments: 1,

        // x: 0,
        // y: 0,
        // colors: 0xffffff,
        // alphas: 1,
        // tile: false,
        // isOrtho: false
    })
    ```
    - `mesh` : The vertices of the generated grid will be added to this Mesh Game Object.
    - `texture` : The texture to be used for this Grid.
    - `frame` : The name or index of the frame within the Texture.
    - `width` , `height` : The width/height of the grid in 3D units.
        ```javascript
        {
            // ...
            width: (frameWidth/frameHeight),
            height: (frameHeight/frameHeight)
            // ...
        }
        
        ```
    - `widthSegments`, `heightSegments` : The number of segments to split the grid horizontally/vertically in to.
    - `colors` : An array of colors, one per vertex, or a single color value applied to all vertices.
    - `alphas` An array of alpha values, one per vertex, or a single alpha value applied to all vertices.
    - `tile` :
        - `false` : Display as a single texture. Default value.
        - `true` : Texture tile (repeat) across the grid segments.

### Model

1. Load model
    ```javascript
    scene.load.obj(key, url, objURL, matURL);
    ```
    - `objURL` : URL to load the obj file.
    - `matURL` : URL to load the material file.
1. Add mesh object
    ```javascript
    var mesh = scene.add.mesh(x, y);
    ```
    or
    ```javascript
    var mesh = scene.make.mesh({
        x: 0,
        y: 0,
        add: true
    });
    ```
1. Add model
    ```javascript
    mesh.addVerticesFromObj(key, scale, x, y, z, rotateX, rotateY, rotateZ, zIsUp);
    ```
    - `key` : The key of the model data in the OBJ Cache to add to this Mesh.
    - `scale` : An amount to scale the model data by. Default is `1`.
    - `x`, `y`, `z` : Translate the model x/y/z position by this amount.
    - `rotateX`, `rotateY`, `rotateZ` : Rotate the model on the x/y/z axis by this amount, in radians.
    - `zIsUp` : 
        - `true` : Z axis is up.
        - `false` : Y axis is up.

### Custom mesh class

- Define class
    ```javascript
    class MyMesh extends Phaser.GameObjects.mesh {
        constructor(scene, x, y, texture, frame, vertices, uvs, indicies, containsZ, normals, colors, alphas) {
            super(scene, x, y, texture, frame, vertices, uvs, indicies, containsZ, normals, colors, alphas);
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
    var mesh = new MyMesh(scene, x, y, texture, frame);
    ```

### Control

#### View

- Translates the view position of this Mesh on the x/y/z axis by the given amount.
    ```javascript
    mesh.panX(x);
    mesh.panY(y);
    mesh.panZ(z);
    ```

#### Model

- Position
    ```javascript
    mesh.modelPosition.x = x;
    mesh.modelPosition.y = y;
    mesh.modelPosition.z = z;
    ```
    - `x`, `y`, `z` : Offset position.
        - `z+` : Near
        - `z-` : Far
        - `x-` : Left
        - `x+` : Right
        - `y+` : Up
        - `y-` : Down
- Rotation
    ```javascript
    mesh.modelRotation.x = rotationX;
    mesh.modelRotation.y = rotationY;
    mesh.modelRotation.z = rotationZ;
    ```
    - `rotationX`, `rotationY`, `rotationZ` : Rotation angle in radians.
- Scale
    ```javascript
    mesh.modelScale.x = scaleX;
    mesh.modelScale.y = scaleY;
    mesh.modelScale.z = scaleZ;
    ```
    - `scaleX`, `scaleY`, `scaleZ` : Scale value, `1` is origin size.

### Backward facing Faces

- Hide backward facing Faces. Default behavior.
    ```javascript
    mesh.hideCCW = true;
    ```
- Show backward facing Faces
    ```javascript
    mesh.hideCCW = false;
    ```

### Faces

Mesh is composed of triangle faces.

```javascript
var faces = mesh.faces;
```

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
- Angle
    - Rotate
        ```javascript
        Phaser.Geom.Mesh.RotateFace(face, radians);
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

### Vertices

Each face has 3 vertices.

```javascript
var vertices = mesh.vertices;
```

- `vertices` : Array of vertex.

#### Properties

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

##### Update properties

- Start updating
    ```javascript
    mesh.ignoreDirtyCache = true;
    ```
- Stop updating
    ```javascript
    mesh.ignoreDirtyCache = false;
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