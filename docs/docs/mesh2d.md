## Introduction

A Mesh2D game object renders a 2D mesh made from textured triangles.

- Author: Phaser

!!! warning "WebGL only"
    It only works in WebGL render mode.

!!! note
    Mesh2D does not generate vertices from a texture frame. Each vertex provides its own position and texture coordinate.

## Usage

### Load texture

```javascript
this.load.image('key', 'assets/image.png');
```

or

```javascript
this.load.atlas('key', 'assets/atlas.png', 'assets/atlas.json');
```

### Add object

```javascript
var mesh = this.add.mesh2d(x, y, key, vertices, indices);
```

or

```javascript
var mesh = this.add.mesh2d(x, y, key, vertices, indices, flipV);
```

- `x`, `y` : Position of this game object.
- `key` : Texture key, or a texture object.
- `vertices` : Flat number array. Each vertex has 4 values: `x, y, u, v`.
- `indices` : Flat number array. Each triangle has 4 values: `a, b, c, page`.
- `flipV` : Flip texture coordinates vertically. Default is `false`.

`a`, `b`, and `c` are vertex indices. `page` is the texture source index, usually `0`.

### Add from JSON

```javascript
var mesh = this.make.mesh2d({
    x: 400,
    y: 300,
    key: 'key',
    vertices: vertices,
    indices: indices,
    flipV: false,
    add: true
});
```

### Custom class

```javascript
class MyMesh2D extends Phaser.GameObjects.Mesh2D {
    constructor(scene, x, y, key, vertices, indices, flipV) {
        super(scene, x, y, key, vertices, indices, flipV);

        scene.add.existing(this);
    }
}
```

```javascript
var mesh = new MyMesh2D(scene, x, y, key, vertices, indices);
```

### Quad example

```javascript
var vertices = [
    // x,   y,   u, v
    0,     0,   0, 0,
    0,   128,   0, 1,
    128, 128,   1, 1,
    128,   0,   1, 0
];

var indices = [
    // a, b, c, page
    0, 1, 2, 0,
    0, 2, 3, 0
];

var mesh = this.add.mesh2d(400, 300, 'key', vertices, indices);
```

### Vertices

Each vertex uses 4 numbers.

```javascript
[
    x0, y0, u0, v0,
    x1, y1, u1, v1,
    x2, y2, u2, v2
]
```

- `x`, `y` : Local position of the vertex.
- `u`, `v` : Texture coordinate.

Update a vertex:

```javascript
var vertexIndex = 0;
var offset = vertexIndex * 4;

mesh.vertices[offset] = x;
mesh.vertices[offset + 1] = y;
mesh.vertices[offset + 2] = u;
mesh.vertices[offset + 3] = v;
```

### Indices

Each triangle uses 4 numbers.

```javascript
[
    a0, b0, c0, page0,
    a1, b1, c1, page1
]
```

- `a`, `b`, `c` : Indices into the vertex array.
- `page` : Texture source index. Use `0` for a normal image texture.

Update the triangle list:

```javascript
mesh.indices = indices;
```

If the topology changes after building ordered indices, rebuild ordered indices or disable them.

```javascript
mesh.buildOrderedIndices(strategy, true);
// or
mesh.setUseOrderedIndices(false);
```

### Texture coordinates

Mesh2D uses the `u`, `v` values stored in `vertices`.

```javascript
mesh.setFlipV(true);
```

Changing the texture frame does not rewrite the mesh vertices. If a mesh should render only part of a texture or an atlas page, provide matching texture coordinates.

### Render strategies

#### Default

By default, Mesh2D renders from `indices` and does not combine triangles into quads.

```javascript
mesh.setUseOrderedIndices(false);
mesh.setRenderAsTriangles(false);
```

#### Ordered indices

Build an optimized index list when the triangle topology is stable.

```javascript
mesh.buildOrderedIndices(1, true);
```

Strategies:

- `0` : Fast build. Uses the current triangle order.
- `1` : Medium build. Checks the next triangle for an edge-sharing pair.
- `2` : High build. Searches for edge-sharing pairs across the full index list.

Use this when vertices may move, but the triangle connections stay the same.

```javascript
mesh.setUseOrderedIndices(true);
```

Ordered indices assume paired triangles can form valid quads. For folded, concave, or freely deformed meshes where this is not true, render as triangles.

#### Render as triangles

```javascript
mesh.setRenderAsTriangles(true);
```

This renders each triangle directly. Use it for dynamic topology or geometry that should not be optimized into quads.

### Lighting

Mesh2D supports Phaser lighting. Strongly distorted geometry or rotated texture coordinates can make normal maps look incorrect.

### Other properties

See [game object](gameobject.md)

### Shader effects

Support [internal and external filters](shader-builtin.md)
