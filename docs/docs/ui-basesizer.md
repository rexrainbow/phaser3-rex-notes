## Introduction

Base class of all ui plugins.

- Author: Rex

## Usage

### Background

```javascript
sizer.addBackground(gameObject);
// sizer.addBackground(gameObject, key);
// sizer.addBackground(gameObject, paddingConfig, key);
```

- `gameObject` : Background game object will be resized after `sizer.layout()` method.
    - [Round rectangle](shape-roundrectangle.md) game object
        ```javascript
        var gameObject = scene.rexUI.add.roundRectangle(x, y, width, height, radius, fillColor);
        ```    
    - [Nine-patch](ninepatch.md) game object
        ```javascript
        var gameObject = scene.rexUI.add.ninePatch(x, y, width, height, key, columns, rows, config);
        ```
    - Custom game object which has `resize(width, height)` method.
        - *Display width*, *display height* will be changed if this background game object does not have `resize` method.
- `paddingConfig` : Add space between bounds. Default is 0.
    - A number for left/right/top/bottom bounds,
    - Or a plain object.
        ```javascript
        {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
        ```
- `key` : A string key. Get background game object back via
    ```javascript
    var child = sizer.getElement(key);
    ```

### Minimum size

- Get
    ```javascript
    var minWidth = sizer.minWidth;
    var minHeight = sizer.minHeight;
    ```
- Set
    ```javascript
    sizer.setMinSize(width, height);
    ```
    or
    ```javascript
    sizer.setMinWidth(width);
    sizer.setMinHeight(height);
    ```

### Dirty

Don't layout this sizer if `sizer.dirty` is `false`. i.e. Size of this sizer won't be changed, but won't layout children neither.

Default value is `true`.

- Get
    ```javascript
    var dirty = sizer.dirty;
    ```
- Set
    ```javascript
    sizer.setDirty();
    // izer.setDirty(true);
    ```
    or
    ```javascript
    sizer.dirty = true;
    ```
- Clear
    ```javascript
    sizer.setDirty(false);
    ```
    or
    ```javascript
    sizer.dirty = false;
    ```

### Bounds of sizer

- Get
    ```javascript
    var leftBound = sizer.left;
    var rightBound = sizer.right;
    var topBound = sizer.top;
    var bottomBound = sizer.bottom;
    ```
- Set
    ```javascript
    sizer.left = leftBound;
    sizer.right = rightBound;
    sizer.top = topBound;
    sizer.bottom = bottomBound;
    ```
    or
    ```javascript
    sizer.alignLeft(leftBound);
    sizer.alignRight(rightBound);
    sizer.alignTop(topBound);
    sizer.alignBottom(bottomBound);
    ```

### Push into bounds

Align sizer to bound if overlapping it.

```javascript
sizer.pushIntoBounds();
```

or

```javascript
sizer.pushIntoBounds(bounds);
```

- `bounds` : Bounds in [rectangle object](geom-rectangle.md).

### Scale

- Pop-up
    - Pop-up width and height
        ```javascript
        sizer.popUp(duration);
        // sizer.popUp(duration, undefined, ease);
        ```
        or
        ```javascript
        sizer.popUpPromise(duration)
            .then(function() {
                // ....
            })
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
    - Pop-up width only
        ```javascript
        sizer.popUp(duration, 'x');
        // sizer.popUp(duration, 'x', ease);
        ```
        or
        ```javascript
        sizer.popUpPromise(duration, 'x')
            .then(function() {
                // ....
            })
        ```
    - Pop-up height only
        ```javascript
        sizer.popUp(duration, 'y');
        // sizer.popUp(duration, 'y', ease);
        ```
        or
        ```javascript
        sizer.popUpPromise(duration, 'y')
            .then(function() {
                // ....
            })
        ```
    - Pop-up via config
        ```javascript
        sizer.popUp({
            duration: undefined,
            orientation: undefined,
            ease: undefined,
        })
        ```
        or
        ```javascript
        sizer.popUpPromise(config)
            .then(function() {
                // ....
            })
        ```
        - `orientation` : `undefined`, `x`, or `y`
- Scale-down destroy
    - Scale-down width and height
        ```javascript
        sizer.scaleDownDestroy(duration);
        // sizer.scaleDownDestroy(duration, undefined, ease);
        ```
        or
        ```javascript
        sizer.scaleDownDestroyPromise(duration)
            .then(function() {
                // ....
            })
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
    - Scale-down width only
        ```javascript
        sizer.scaleDownDestroy(duration, 'x');
        // sizer.scaleDownDestroy(duration, 'x', ease);
        ```
        or
        ```javascript
        sizer.scaleDownDestroyPromise(duration, 'x');
            .then(function() {
                // ....
            })
        ```
    - Scale-down height only
        ```javascript
        sizer.scaleDownDestroy(duration, 'y');
        // sizer.scaleDownDestroy(duration, 'y', ease);
        ```
        or
        ```javascript
        sizer.scaleDownDestroyPromise(duration, 'y')
            .then(function() {
                // ....
            })
        ```
- Scale-down without destroy
    - Scale-down width and height
        ```javascript
        sizer.scaleDown(duration);
        // sizer.scaleDown(duration, undefined, ease);
        ```
        or
        ```javascript
        sizer.scaleDownPromise(duration, undefined, ease)
            .then(function() {
                // ....
            })
        ```
    - Scale-down width only
        ```javascript
        sizer.scaleDowny(duration, 'x');
        // sizer.scaleDowny(duration, 'x', ease);
        ```
        or
        ```javascript
        sizer.scaleDownPromise(duration, 'x', ease)
            .then(function() {
                // ....
            })
        ```
    - Scale-down height only
        ```javascript
        sizer.scaleDown(duration, 'y');
        // sizer.scaleDown(duration, 'y', ease);
        ```
        or
        ```javascript
        sizer.scaleDownPromise(duration, 'y', ease)
            .then(function() {
                // ....
            })
        ```
- Events
    - Pop-up complete
        ```javascript
        sizer.on('popup.complete', function(sizer) { });
        ```
    - Scale-down, scale-down destroy complete
        ```javascript
        sizer.on('scaledown.complete', function(sizer) { });
        ```

### Fade

- Fade-in
    ```javascript
    sizer.fadeIn(duration);
    ```
    or
    ```javascript
    sizer.fadeIn(duration, endAlpha);
    ```
    or
    ```javascript
    sizer.fadeIn(duration, {start:0, end:1});
    ```
    or
    ```javascript
    sizer.fadeInPromise(duration)
        .then(function(){
            // ...
        })
    ```
- Fade-out destroy
    ```javascript
    sizer.fadeOutDestroy(duration);
    ```
    or
    ```javascript
    sizer.fadeOutDestroyPromise(duration)
        .then(function(){
            // ...
        })
    ```
- Fade-out without destroy
    ```javascript
    sizer.fadeOut(duration);
    ```
    or
    ```javascript
    sizer.fadeOutPromise(duration)
        .then(function(){
            // ...
        })
    ```
- Events
    - Fade-in complete
        ```javascript
        sizer.on('fadein.complete', function(sizer) { });
        ```
    - Fade-out, fade-out destroy complete
        ```javascript
        sizer.on('fadeout.complete', function(sizer) { });
        ```

### Ease move

- Move from
    ```javascript
    sizer.moveFrom(duration, x, y);
    // sizer.moveFrom(duration, x, y, ease);
    ```
    or
    ```javascript
    sizer.moveFromPromise(duration, x, y, ease)
        .then(function(){
            // ...
        })    
    ```    
    - `x`, `y` : Start position.
        - Number : Start position x/y.
        - String(`+=300`) : Related position of current position x/y.
        - `undefined` : Current position x/y.
    - `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- Move-from destroy
    ```javascript
    sizer.moveFromDestroy(duration, x, y);
    // sizer.moveFrom(duration, x, y, ease);
    ```
    or
    ```javascript
    sizer.moveFromDestroyPromise(duration, x, y, ease)
        .then(function(){
            // ...
        })    
    ```
- Move to
    ```javascript
    sizer.moveTo(duration, x, y);
    // sizer.moveTo(duration, x, y, ease);
    ```
    or
    ```javascript
    sizer.moveToPromise(duration, x, y, ease)
        .then(function(){
            // ...
        })    
    ```
    - `x`, `y` : End position.
        - Number : End position x/y.
        - String(`+=300`) : Related position of current position x/y.
        - `undefined` : Current position x/y.
    - `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- Move-to destroy
    ```javascript
    sizer.moveToDestroy(duration, x, y);
    // sizer.moveTo(duration, x, y, ease);
    ```
    or
    ```javascript
    sizer.moveToDestroyPromise(duration, x, y, ease)
        .then(function(){
            // ...
        })    
    ```
- Events
    - Move-from complete
        ```javascript
        sizer.on('movefrom.complete', function(sizer) { });
        ```
    - Move-to complete
        ```javascript
        sizer.on('moveto.complete', function(sizer) { });
        ```

### Drag top-most sizer

- Draggable child
    - Enable
        ```javascript
        sizer.setDraggable(child);
        // sizer.setDraggable(child, true)
        ```
        or
        ```javascript
        sizer.setDraggable(elementName);
        // sizer.setDraggable(elementName, true)
        ```
    - Disable
        ```javascript
        sizer.setDraggable(child, false);
        ```
        or
        ```javascript
        sizer.setDraggable(elementName, false);
        ```
- Draggable sizer object
    - Enable
        ```javascript
        sizer.setDraggable();
        // sizer.setDraggable(true);
        ```
    - Disalbe
        ```javascript
        sizer.setDraggable(false);
        ```

### Pin game object

```javascript
sizer.pin(gameObject);
```

!!! note
    Method `sizer.add` is override in each sizer class usually.

### Draw bounds

- Draw bounds on a graphics game object
    ```javascript
    sizer.drawBounds(graphics, color);
    ```
    - `graphics` : [Graphics game object](graphics.md)
    - `color` : Default value is `0xffffff`
- Draw bounds and display name of child
    ```javascript
    sizer.drawBounds(graphics, {
        // color: 0xffffff,

        // name: false, 
        // name: true, 
        // name: {
        //     createTextCallback: function(scene) {
        //         return scene.add.text(0, 0, '');
        //     },
        //     createTextCallbackScope: undefined,
        //     align: 'left-top'
        // }
    });
    ```
    - `graphics` : [Graphics game object](graphics.md)
    - `color` : Default value is `0xffffff`
    - `name` :
        - `false` : Don't display child name, default value
        - `true` : Display child name with default text game object, aligned at left-top of child bounds.
        - Plain object : 
            - `name.createTextCallback` : Callback of creating customized text game object for child name
                ```javascript
                function(scene, child, childBoundsRect) {
                    // return scene.add.text(0, 0, ''); 
                }
                ```
            - `name.createTextCallbackScope` : Callback scope of `name.createTextCallback`, default is `undefined`
            - `name.align` : 
                - `'left-top'`, or `Phaser.Display.Align.TOP_LEFT` : Align text game object at left-top. Default value
                - `'center'`, or `Phaser.Display.Align.CENTER` : Align text game object at center
                - `'left'`, or `Phaser.Display.Align.LEFT_CENTER` : Align text game object at left-center
                - `'right'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align text game object at right-center
                - `'top'`, or `Phaser.Display.Align.RIGHT_CENTER` : Align game text object at top-center
                - `'bottom'`, or `Phaser.Display.Align.BOTTOM_CENTER` : Align game text object at bottom-center
                - `'left-bottom'`, or `Phaser.Display.Align.BOTTOM_LEFT` : Align text game object at left-bottom
                - `'right-top'`, or `Phaser.Display.Align.TOP_RIGHT` : Align text game object at right-top
                - `'right-bottom'`, or `Phaser.Display.Align.BOTTOM_RIGHT` : Align text game object at right-bottom
    - Text game objects of these children's name will be attached on graphics game object, `graphics.clear()`, or `graphics.destroy()` will also destroy these text game objects

### Anchor

```javascript
sizer.setAnchor({
    // left: '0%+0',
    // right: '0%+0',
    // centerX: '0%+0',
    // x: '0%+0',

    // top: '0%+0',
    // bottom: '0%+0',
    // centerY: '0%+0',
    // y: '0%+0'
})
```

- `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
    - Percentage of visible width/height : `'p%'`, p: 0~100
        - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
        - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
    - Offset : `'+n'`, or `'-n'`

For example, anchor game object's left bound to viewport's left+10, and centerY to viewport's center :

```javascript
{
    left: 'left+10',
    centerY: 'center'
}
```

### Get child

- Get child by specific key
    1. Add child
        ```javascript
        sizer.addChildrenMap(key, child);
        ```
    1. Get child
        ```javascript
        var child = sizer.getElement(key);
        ```
- Get child by name
    ```javascript
    var child = sizer.getByName(name);
    // var child = sizer.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.    

### Get parent

- Get parent sizer
    ```javascript
    var parentSizer = sizer.getParentSizer();
    ```
- Get topmost sizer
    ```javascript
    var topmostSizer = sizer.getTopmostSizer();
    ```

### Is in touching

```javascript
var isTouching = sizer.isInTouching();
```

### Other properties

This game object inherits from [ContainerLite](containerlite.md).
