## Introduction

Base class of all game object in phaser.

- Author: Richard Davey

## Usage

### Destroy

- Destroy game object
    ```javascript
    gameObject.destroy();
    ```
- Game object will be destroyed automatically when scene destroyed, if it is in display list, or update list.
- Event
    ```javascript
    gameObject.once('destroy', function(gameObject, fromScene) {

    }, scope);
    ```
    - `fromScene` : `true` if game object is destroyed during scene is shutdown. When scene is shutdown, all game objects will be destroyed.

### Position

- Get
    ```javascript
    var x = gameObject.x;
    var y = gameObject.y;
    ```
- Set
    ```javascript
    gameObject.x = 0;
    gameObject.y = 0;
    gameObject.setPosition(x,y);
    gameObject.setX(x);
    gameObject.setY(y);
    ```
    - Set random
        ```javascript
        gameObject.setRandomPosition(x, y, width, height);
        // gameObject.setRandomPosition(); // x=0, y=0, width=game.width, height=game.height
        ```

#### Local point

Transfer world point to local point

```javascript
var point = gameObject.getLocalPoint(x, y);  // point : {x, y}
// var out = gameObject.getLocalPoint(x, y, out);
```
or
```javascript
var out = gameObject.getLocalPoint(x, y, out, camera);
```

### Angle

- Get
    ```javascript
    var angle = gameObject.angle;
    var radians = gameObject.rotation;  // angle in radians
    ```
- Set
    ```javascript
    gameObject.angle = degrees;
    gameObject.rotation = radians;
    gameObject.setAngle(degrees);
    gameObject.setRotation(radians);
    ```

### Visible

- Get
    ```javascript
    var visible = gameObject.visible; // visible: true/false
    ```
- Set
    ```javascript
    gameObject.visible = visible;
    gameObject.setVisible(visible);
    ```

### Alpha

- Get
    ```javascript
    var alpha = gameObject.alpha;  // 0~1
    ```
- Set
    ```javascript
    gameObject.setAlpha(alpha);
    // gameObject.alpha = alpha;
    ```
    or
    ```javascript
    gameObject.setAlpha(topLeft, topRight, bottomLeft, bottomRight);
    // gameObject.alphaTopLeft = alpha;
    // gameObject.alphaTopRight = alpha;
    // gameObject.alphaBottomLeft = alpha;
    // gameObject.alphaBottomRight = alpha;
    ```
- Clear (set to `1`)
    ```javascript
    gameObject.clearAlpha();
    ```

### FlipX, FlipY

- Get
    ```javascript
    var flip = gameObject.flipX;  // flip: true/false
    var flip = gameObject.flipY;  // flip: true/false
    ```
- Set
    ```javascript
    gameObject.flipX = flip;
    gameObject.flipY = flip;
    gameObject.setFlipX(flip);
    gameObject.setFlipY(flip);
    gameObject.setFlip(flipX, flipY);
    gameObject.toggleFlipX();
    gameObject.toggleFlipY();
    gameObject.resetFlip();  // equal to gameObject.setFlip(false, false);
    ```

### Order of rendering

#### Depth (z-index)

The depth starts from zero (the default value) and increases from that point. A game object with a higher depth value will always render in front of one with a lower value.

- Get
    ```javascript
    var depth = gameObject.depth;
    ```
- Set
    ```javascript
    gameObject.depth = value;
    gameObject.setDepth(value);
    ```

#### Display list

```javascript
scene.children.bringToTop(child);
scene.children.sendToBack(child);
scene.children.moveUp(child);
scene.children.moveDown(child);
scene.children.moveUp(child);
scene.children.moveTo(child, index);
scene.children.swap(child1, child2);
```

#### Layer game object

Place game object into [Layer game object](layer.md#move-child)

### Scroll factor

- Get
    ```javascript
    var scrollFactorX = gameObject.scrollFactorX;
    var scrollFactorY = gameObject.scrollFactorY;
    ```
- Set
    ```javascript
    gameObject.setScrollFactor(scrollFactor);
    gameObject.setScrollFactor(scrollFactorX, scrollFactorY);
    ```

Scroll factor: 0~1

- 0= fixed to camera
- 0.25= quarter the speed of the camera
- 0.5= half the speed of the camera

### Bounds

```javascript
var output = gameObject.getTopLeft(output);     // output: {x, y}
var output = gameObject.getTopCenter(output);     // output: {x, y}
var output = gameObject.getTopRight(output);    // output: {x, y}
var output = gameObject.getLeftCenter(output);    // output: {x, y}
var output = gameObject.getRightCenter(output);    // output: {x, y}
var output = gameObject.getBottomLeft(output);  // output: {x, y}
var output = gameObject.getBottomCenter(output);     // output: {x, y}
var output = gameObject.getBottomRight(output); // output: {x, y}
var output = gameObject.getCenter(output);      // output: {x, y}
var output = gameObject.getBounds(output);      // output: {x, y, width, height}
```

### Origin

- Get
    ```javascript
    var originX = gameObject.originX;
    var originY = gameObject.originY;
    ```
- Set
    ```javascript
    gameObject.setOrigin(x, y);
    // gameObject.setOrigin(x); // y = x
    ```
    - Set to top-left
        ```javascript
        gameObject.setOrigin(0);
        ```
    - Set to center
        ```javascript
        gameObject.setOrigin(0.5);
        ```
    - Set to bottom-right
        ```javascript
        gameObject.setOrigin(1);
        ```

### Tint

- Get
    ```javascript
    var color = gameObject.tintTopLeft;     // color: 0xRRGGBB
    var color = gameObject.tintTopRight;
    var color = gameObject.tintBottomLeft;
    var color = gameObject.tintBottomRight;
    var isTinted = gameObject.isTinted;
    ```
- Set
    ```javascript
    gameObject.tint = color;
    gameObject.setTint(color);  // multiply color value
    gameObject.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
    gameObject.setTintFill(color);  // replace color value
    gameObject.setTintFill(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);    
    gameObject.clearTint();     // equal to `gameObject.setTint(0xffffff)`
    ```

### Blend mode

- Get
    ```javascript
    var blendMode = gameObject.blendMode;
    ```
- Set
    ```javascript
    gameObject.blendMode = blendMode;
    gameObject.setBlendMode(blendMode);
    ```
- Under WebGL only the following Blend Modes are available
    - `'ADD'`, or `Phaser.BlendModes.ADD`, or `1`
    - `'MULTIPLY'`, or `Phaser.BlendModes.MULTIPLY`, or `2`
    - `'SCREEN'`, or `Phaser.BlendModes.SCREEN`, or `3`
    - `'ERASE'`, or `Phaser.BlendModes.ERASE`, or `17`
        - Only works when rendering to a framebuffer, like a *Render Texture*
    - `'SOURCE_IN'`, or `Phaser.BlendModes.SOURCE_IN`, or `18`
        - Canvas render mode only
    - `'SOURCE_OUT'`, or `Phaser.BlendModes.SOURCE_OUT`, or `19`
        - Canvas render mode only
    - `'SOURCE_ATOP'`, or `Phaser.BlendModes.SOURCE_ATOP`, or `20`
        - Canvas render mode only
    - `'DESTINATION_OVER'`, or `Phaser.BlendModes.DESTINATION_OVER`, or `21`
        - Canvas render mode only
    - `'DESTINATION_IN'`, or `Phaser.BlendModes.DESTINATION_IN`, or `22`
        - Canvas render mode only
    - `'DESTINATION_OUT'`, or `Phaser.BlendModes.DESTINATION_OUT`, or `23`
        - Canvas render mode only
    - `'DESTINATION_ATOP'`, or `Phaser.BlendModes.DESTINATION_ATOP`, or `24`
        - Canvas render mode only
    - `'LIGHTER'`, or `Phaser.BlendModes.LIGHTER`, or `25`
        - Canvas render mode only
    - `'COPY'`, or `Phaser.BlendModes.COPY`, or `26`
        - Canvas render mode only
    - `'XOR'`, or `Phaser.BlendModes.XOR`, or `27`
        - Canvas render mode only
- Canvas has more available depending on browser support.

### Mask

See [Mask](mask.md).

### Post-fx pipeline

#### Register post-fx pipeline

- Register post-fx pipeline in game config
    ```javascript
    import PostFxClass from 'path';
    var config = {
        // ...
        pipeline: [PostFxClass]
        // ...
    };
    var game = new Phaser.Game(config);
    ```

Some post-fx pipelines:

- [Color replace](shader-colorreplace.md): Replace color post processing filter.
- [Cross-stitching](shader-crossstitching.md): Cross-stitching post processing filter.
- [Drop-shadow](shader-dropshadow.md): Drop-shadow post processing filter.
- [Glow-filter](shader-glowfilter.md): Glow post processing filter.
- [Glow-filter](shader-glowfilter2.md): Glow post processing filter, ported from pixi.
- [Gray-scale](shader-grayscale.md): Gray scale post processing filter.
- [Hsl-adjust](shader-hsladjust.md): Adjust color in HSL domain, post processing filter.
- [Inverse](shader-inverse.md): Inverse color post processing filter.
- [Kawase-blur](shader-kawaseblur.md): Kawase-blur post processing filter.
- [Outline](shader-outline.md): Outline post processing filter.
- [Pixelation](shader-pixelation.md): Pixelation post processing filter.
- [Toonify](shader-toonify.md): Draw outlines and quantize color in HSV domain, post processing filter.
- [Shockwave](shader-shockwave.md): Shockwave post processing filter.
- [Swirl](shader-swirl.md): Swirl post processing filter.
- [Dissolve](shader-dissolve.md): Dissolve transition post processing filter.
- [Split](shader-split.md): Split image into 4 parts.
- [Barrel](shader-barrel.md): Barrel post processing filter.
- [Fish eye](shader-fisheye.md): Fish-eye post processing filter.

#### Add post-fx pipeline

```javascript
gameObject.setPostPipeline(PostFxClass);
```

- `PostFxClass` : Class of post-fx pipeline.

#### Remove post-fx pipeline

- Remove a post-fx pipeline
    ```javascript
    gameObject.removePostPipeline(PostFxClass);
    ```
- Remove all post-fx pipelines
    ```javascript
    gameObject.resetPipeline(true);
    ```
    or
    ```javascript
    gameObject.postPipelines = [];
    gameObject.hasPostPipeline = false;
    ```

#### Get post-fx pipeline

```javascript
var pipelineInstance = gameObject.getPostPipeline(PostFxClass);
```

### Size

- Native (un-scaled) size
    - Get
        ```javascript
        var width = gameObject.width;
        var height = gameObject.height;
        ```
    - Set
        ```javascript
        gameObject.setSize(width, height);
        ```
        or
        ```javascript
        gameObject.width = width;
        gameObject.height = height;
        ```
- Display size
    - Get
        ```javascript
        var displayWidth = gameObject.displayWidth;
        var displayHeight = gameObject.displayHeight;
        ```
    - Set
        ```javascript
        gameObject.setDisplaySize(displayWidth, displayHeight);
        ```
        or
        ```javascript
        gameObject.displayWidth = displayWidth;
        gameObject.displayHeight = displayHeight;
        ```
- Scale
    - Get
        ```javascript
        var scaleX = gameObject.scaleX;
        var scaleY = gameObject.scaleY;
        ```
        or
        ```javascript
        var scale = gameObject.scale;  // Return (scaleX + scaleY)/2
        ```        
    - Set
        ```javascript
        gameObject.setScale(scaleX, scaleY);
        ```
        or
        ```javascript
        gameObject.scaleX = scaleX;
        gameObject.scaleY = scaleY;
        ```
        or
        ```javascript
        gameObject.scale = scale;  // Set scaleX, scaleY to scale
        ```

### Click

```javascript
gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    // ...
});
```

See [touch event](touchevents.md#quick-start)

### State

- Get
    ```javascript
    var state = gameObject.state;
    ```
- Set
    ```javascript
    gameObject.setState(state);
    ```

### Data

- Get
    ```javascript
    var value = gameObject.getData(key);
    var values = gameObject.getData(keys); // keys: an array of keys
    var value = gameObject.data.values[key];
    ```
- Set
    ```javascript
    gameObject.setData(key, value);
    gameObject.incData(key, value);    
    gameObject.setData(obj); // obj: {key0:value0, key1:value1, ...}
    gameObject.data.values[key] = value;
    gameObject.data.values[key] += inc;
    ```
    or
    ```javascript
    gameObject.toggleData(key);
    ```
- Enable
    ```javascript
    gameObject.setDataEnabled();
    ```
- Events : 
    - Set data evant
        ```javascript
        gameObject.on('setdata', function(gameObject, key, value){ /* ... */ });
        ```
    - Change data event
        ```javascript
        gameObject.on('changedata', function(gameObject, key, value, previousValue){ /* ... */ });
        ```
        ```javascript
        gameObject.on('changedata-' + key, function(gameObject, value, previousValue){ /* ... */ });
        ```

See [data manager](datamanager.md)

!!! note
    Ensure data manager is created before binding any data-changed events.

### Texture

- Set texture via key string
    ```javascript
    gameObject.setTexture(key);
    // gameObject.setTexture(key, frame);
    ```
- Set texture via texture object
    ```javascript
    gameObject.setTexture(texture);
    // gameObject.setTexture(texture, frame);
    ```
    - `texture` : [Texture object](texture.md#get-texture), or [canvas texture object](canvas-texture.md)
- Set frame
    ```javascript
    gameObject.setFrame(frame);
    gameObject.setFrame(frame, updateSize, updateOrigin);
    ```
    - `frame` :　The name or index of the frame within the Texture.
    - `updateSize` : Should this call adjust the size of the Game Object?
    - `updateOrigin` : Should this call adjust the origin of the Game Object?
- Applies a crop to a texture
    ```javascript
    gameObject.setCrop(x, y, width, height);
    ```
    The crop coordinates are relative to the texture frame, not the Game Object, meaning 0 x 0 is the top-left.
    - Reset crop
        ```javascript
        gameObject.setCrop();
        // gameObject.isCropped = false;
        ```
- Get texture, [frame](texture.md#frame-object).
    ```javascript
    var texture = gameObject.texture;
    var frame = gameObject.frame;
    ```
- Get texture key, frame name.
    ```javascript
    var textureKey = gameObject.texture.key;
    var frameName = gameObject.frame.name;
    ```

### Name

- Get
    ```javascript
    var name = gameObject.name;
    ```
- Set
    ```javascript
    gameObject.setName(name);
    gameObject.name = name;
    ```

### Will render

- Test render flag and camera filter.
    ```javascript
    var willRennder = gameObject.willRender(camera);
    ```
- Test render flag only
    ```javascript
    var willRender = (gameObject.renderFlags === Phaser.GameObjects.GameObject.RENDER_MASK);
    ```
    - `Phaser.GameObjects.GameObject.RENDER_MASK` : 15 (Visible, Alpha, Transform and Texture)

### Add to scene/container

#### Add

Trigger `'addedtoscene'` event, which invoke `gameObject.addedToScene()`

- Register `'addedtoscene'` event
    ```javascript
    gameObject.on('addedtoscene', function(gameObject, scene){});
    ```
- Or, override `addedToScene` method
    ```javascript
    class MyClass extends BaseClass {
        // ...
        addedtoscene() {
            super.addedtoscene();
            // ...
        }
    }
    ```

#### Remove

Trigger `'removedfromscene'` event, which invoke `gameObject.removedFromScene()`

- Register `'removedfromscene'` event
    ```javascript
    gameObject.on('removedfromscene', function(gameObject, scene){});
    ```
- Or, override `removedFromScene` method
    ```javascript
    class MyClass extends BaseClass {
        // ...
        removedFromScene() {
            super.removedFromScene();
            // ...
        }
    }
    ```

### Custom class

- Define class
    ```javascript
    class MyClass extends BaseClass {
        constructor(scene, x, y) {
            super(scene, x, y);
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {
        //     if (super.preUpdate) {
        //         super.preUpdate(time, delta);
        //     }
        // }

        // destroy(fromScene) {
        //     //  This Game Object has already been destroyed
        //     if (!this.scene) {
        //         return;
        //     }
        //     super.destroy(fromScene);
        // }
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
            - Some kinds of game object like Sprite, Dom-element has `preUpdate` method already.
- Create instance
    ```javascript
    var image = new MyClass(scene, x, y, key);
    ```