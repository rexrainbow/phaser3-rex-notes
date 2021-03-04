## Introduction

Manipulate the vertices of images, built-in game object of phaser.

- Author: Richard Davey

!!! warning "WebGL only"
    It only works in WebGL render mode.

## Usage

### Load texture

```javascript
scene.load.image(key, url);
```

Reference: [load image](loader.md#image)

### Add object

```javascript
var rope = scene.add.rope(x, y, texture, frame, points, horizontal);
// var rope = scene.add.rope(x, y, texture, frame, points, horizontal, colors, alphas);
```

- `points` : 
    - A number : Segments to split the texture frame into.
    - An number array : An array containing the vertices data.
- `horizontal` : 
    - `true` : Vertices of this Rope be aligned horizontally.
    - `false` : Vertices of this Rope be aligned vertically.
- `colors` : An optional array containing the color data for this Rope. One color value per pair of vertices.
- `alphas` : An optional array containing the alpha data for this Rope. One alpha value per pair of vertices.

Add rope from JSON

```javascript
var rope = scene.make.rope({
    x: 0,
    y: 0,
    key: '',
    frame: null,
    horizontal: true,
    points: undefined,
    colors: undefined,
    alphas: undefined,

    // angle: 0,
    // alpha: 1
    // flipX: true,
    // flipY: true,
    // origin: {x: 0.5, y: 0.5},
    
    add: true
});
```

### Custom rope class

- Define class
    ```javascript
    class MyRope extends Phaser.GameObjects.Rope {
        constructor(scene, x, y, texture, frame, points, horizontal, colors, alphas) {
            super(scene, x, y, texture, frame, points, horizontal, colors, alphas);
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
    var rope = new MyRope(scene, x, y, texture, frame, points, horizontal);
    ```

### Origin

A Ropes origin is always 0.5 x 0.5 and cannot be changed.

### Set vertices

Set vertices via 

```javascript
rope.setPoints(points);
// rope.setPoints(points, colors, alphas);
```

- `points` : 
    - A number : Segments to split the texture frame into.
    - An number array : An array containing the vertices data.
- `colors` : An optional array containing the color data for this Rope. One color value per pair of vertices.
- `alphas` : An optional array containing the alpha data for this Rope. One alpha value per pair of vertices.


Also change horizontal mode : 

- Change vertical rope to horizontal rope, do nothing if rope is horizontal mode already
    ```javascript
    rope.setHorizontal(points);
    // rope.setHorizontal(points, colors, alphas);
    ```
- Change horizontal rope to vertical rope, do nothing if rope is vertical mode already
    ```javascript
    rope.setVertical(points);
    // rope.setVertical(points, colors, alphas);
    ```

Or set `rope.points` directly :

1. Change `rope.points`
    - Horizontal rope : `rope.points[i].y = newY`
    - Vertical rope :  `rope.points[i].x = newX`
1. Call `rope.setDirty()`, or `rope.updateVertices()`

Each point is relative to position of rope object, get points of world via

```javascript
var worldX = rope.points[i].x + rope.x;
var worldY = rope.points[i].y + rope.y;
```

### Play animation

```javascript
rope.play(key);
// rope.play(key, ignoreIfPlaying, startFrame);
```

- `ignoreIfPlaying` : If an animation is already playing then ignore this call. Default value is `false`.
- `startFrame` : Optionally start the animation playing from this frame index. Default value is `0`.

### Alpha

- Single alpha
    ```javascript
    rope.setAlphas(alpha);
    ```
- Top - bottom alpha
    ```javascript
    rope.setAlphas(topAlpha, bottomAlpha);
    ```
- Alpha array for each point
    ```javascript
    rope.setAlphas(alphaArray);
    ```
    - `alphaArray` : Array of alpha value.

### Color tint

- Single color tint
    ```javascript
    rope.setColors(color);
    ```
- Color tint array for each point
    ```javascript
    rope.setAlphas(colorArray);
    ```
    - `colorArray` : Array of color tint value.

#### Tint fill mode

Sets the tint fill mode.

```javascript
rope.setTintFill(mode);
```

- `mode` : 
    - `0` : Additive tint, blends the vertices colors with the texture. Default behavior.
    - `1` : Fill tint with alpha.
    - `2` : Fill tint without alpha.

### Flip

```javascript
rope.flipX = flip;
rope.flipY = flip;
```

If this Game Object has a physics body, it will not change the body. This is a rendering toggle only.

### Debug

Draw debug mesh each render tick.

```javascript
rope.setDebug(graphic);
// rope.setDebug(graphic, callback);
```

- `graphic` : [Graphics game object](graphics.md)
- `callback` : Callback of rendering debug graphics ([default callback](https://github.com/photonstorm/phaser/blob/master/src/gameobjects/rope/Rope.js#L996-L1024))
    ```javascript
    function(rope, meshLength, verts) {
        // var graphic = rope.debugGraphic;
    }
    ```
    - `rope` : Rope instance.
        - `rope.debugGraphic` : [Graphics game object](graphics.md)
    - `meshLength` : The number of mesh vertices in total.
    - `verts` : An array of the translated vertex coordinates.

!!! note
    Clear Debug graphics (`rope.debugGraphic.clear()`) during scene's update stage (`scene.update() { }`)