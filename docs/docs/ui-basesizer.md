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

!!! note "Resize top-most sizer"
    ```javascript
    sizer.setMinSize(width, height).layout()
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
    // sizer.setDirty(true);
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
    var centerX = sizer.centerX;
    var centerY = sizer.centerY;
    ```
- Set
    ```javascript
    sizer.left = leftBound;
    sizer.right = rightBound;
    sizer.top = topBound;
    sizer.bottom = bottomBound;
    sizer.centerX = centerXBound;
    sizer.centerY = centerYBound;
    ```
    or
    ```javascript
    sizer.alignLeft(leftBound);
    sizer.alignRight(rightBound);
    sizer.alignTop(topBound);
    sizer.alignBottom(bottomBound);
    sizer.alignCenterX(centerXBound);
    sizer.alignCenterY(centerYBound);
    ```

### Size of sizer

- Size
    ```javascript
    var width = sizer.width;
    var height = sizer.height;
    ```
- Display size
    ```javascript
    var displayWidth = sizer.displayWidth;
    var displayHeight = sizer.displayHeight;
    ```
- Inner size
    ```javascript
    var innerWidth = sizer.innerWidth;
    var innerHeight = sizer.innerHeight;
    ```
- Minimum size
    ```javascript
    var minWidth = sizer.minWidth;
    var minHeight = sizer.minHeight;
    ```
- Minimum inner size
    ```javascript
    var minInnerWidth = sizer.minInnerWidth;
    var minInnerHeight = sizer.minInnerHeight;
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
    // sizer.moveFrom({x, y, duration, ease});
    // sizer.moveFrom({x, y, speed, ease});
    ```
    or
    ```javascript
    sizer
        .moveFromPromise(duration, x, y, ease)
        // .moveFromPromise({x, y, duration, ease})
        // .moveFromPromise({x, y, speed, ease})
        .then(function(){
            // ...
        })    
    ```    
    - `x`, `y` : Start position.
        - Number : Start position x/y.
        - String(`+=300`) : Related position of current position x/y.
        - `undefined` : Current position x/y.
    - `speed` : Get `duration` according to `speed` and distance between current sizer position to `{x, y}`
    - `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- Move-from destroy
    ```javascript
    sizer.moveFromDestroy(duration, x, y);
    // sizer.moveFrom(duration, x, y, ease);
    // sizer.moveFrom({x, y, duration, ease});
    // sizer.moveFrom({x, y, speed, ease});
    ```
    or
    ```javascript
    sizer
        .moveFromDestroyPromise(duration, x, y, ease)
        // .moveFromDestroyPromise({x, y, duration, ease})
        // .moveFromDestroyPromise({x, y, speed, ease})
        .then(function(){
            // ...
        })    
    ```
- Move to
    ```javascript
    sizer.moveTo(duration, x, y);
    // sizer.moveTo(duration, x, y, ease);
    // sizer.moveTo({x, y, duration, ease});
    // sizer.moveTo({x, y, speed, ease});
    ```
    or
    ```javascript
    sizer
        .moveToPromise(duration, x, y, ease)
        // .moveToPromise({x, y, duration, ease})
        // .moveToPromise({x, y, speed, ease})
        .then(function(){
            // ...
        })    
    ```
    - `x`, `y` : End position.
        - Number : End position x/y.
        - String(`+=300`) : Related position of current position x/y.
        - `undefined` : Current position x/y.
    - `speed` : Get `duration` according to `speed` and distance between current sizer position to `{x, y}`
    - `ease` : `'Linear'`, `'Cubic'`, `'Elastic'`, `'Bounce'`, `'Back'` ...
- Move-to destroy
    ```javascript
    sizer.moveToDestroy(duration, x, y);
    // sizer.moveTo(duration, x, y, ease);
    // sizer.moveTo({x, y, duration, ease});
    // sizer.moveTo({x, y, speed, ease});
    ```
    or
    ```javascript
    sizer
        .moveToDestroyPromise(duration, x, y, ease)
        // .moveToDestroyPromise({x, y, duration, ease})
        // .moveToDestroyPromise({x, y, speed, ease})
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

### Click

- Add click event
    ```javascript
    sizer.onClick(callback, scope);
    // sizer.onClick(callback, scope, config);
    ```
    - `config` : See [Button](button.md#create-instance)
- Turn off click event
    ```javascript
    sizer.offClick(callback, scope);
    ```
- Enable click event
    ```javascript
    sizer.enableClick();
    ```
- Disable click event
    ```javascript
    sizer.disableClick();
    ```

Equal to 

```javascript
var click = scene.rexUI.add.click(sizer, config);
click.on('click', callback, scope);
```

### Pin game object

```javascript
sizer.pin(gameObject);
```

!!! note
    Method `sizer.add` is override in each sizer class usually.

### Draw bounds

- Draw bounds of shown game object on a graphics game object
    ```javascript
    sizer.drawBounds(graphics, color);
    ```
    - `graphics` : [Graphics game object](graphics.md)
    - `color` : Default value is `0xffffff`
- Draw bounds of shown game object, and display name of child
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

### Hide

- Set invisible, won't layout it
    ```javascript
    sizer.hide();
    ```
    or
    ```javascript
    sizer.hide(gameObject);
    ```
- Set visible, will layout it
    ```javascript
    sizer.show();
    ```
    or
    ```javascript
    sizer.show(gameObject);
    ```

### Padding

- Set inner padding, will indent children position.
    - Set inner padding via config
        ```javascript
        sizer.setInnerPadding({
            left: leftPadding, 
            right: rightPadding,
            top: topPadding,
            bottom: bottomPadding
        });
        ```
    - Set inner padding via single number
        ```javascript
        sizer.setInnerPadding(value);
        ```
    - Set specific inner padding
        ```javascript
        sizer.setInnerPadding(key, value);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Get inner padding
    - Get inner padding values
        ```javascript
        var innerPadding = sizer.getInnerPadding();
        ```
    - Get specific inner padding
        ```javascript
        var value = sizer.getInnerPadding(key);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Set outter padding, will shrink layout size.
    - Set outter padding via config
        ```javascript
        sizer.setOutterPadding({
            left: leftPadding, 
            right: rightPadding,
            top: topPadding,
            bottom: bottomPadding
        });
        ```
    - Set outter padding via single number
        ```javascript
        sizer.setOutterPadding(value);
        ```
    - Set specific outter padding
        ```javascript
        sizer.setOutterPadding(key, value);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Get outter padding
    - Get outter padding values
        ```javascript
        var outterPadding = sizer.getOutterrPadding();
        ```
    - Get specific outter padding
        ```javascript
        var value = sizer.getOutterPadding(key);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Set outter padding of child, will shrink layout size.
    - Set outter padding via config
        ```javascript
        sizer.setChildOuterPadding(
            child,
            {
                left: leftPadding, 
                right: rightPadding,
                top: topPadding,
                bottom: bottomPadding
            }
        );
        ```
        - `child` : A string key or game object.
    - Set outter padding via single number
        ```javascript
        sizer.setChildOuterPadding(child, value);
        ```
        - `child` : A string key or game object.
    - Set specific outter padding
        ```javascript
        sizer.setChildOuterPadding(child, key, value);
        ```
        - `child` : A string key or game object.
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Get outter padding of child
    - Get outter padding values
        ```javascript
        var outterPadding = sizer.getChildOutterPadding(child);
        ```
        - `child` : A string key or game object.
    - Get specific outter padding
        ```javascript
        var value = sizer.getChildOutterPadding(child, key);
        ```
        - `child` : A string key or game object.
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`

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

### Change properties of child

- [Set property of child from sizer](containerlite.md#set-properties-of-child)
- Set property of child, then [reset local state of child](containerlite.md#reset-local-state-of-child)
- [Tween local state of child](containerlite.md#tween-local-state)

### Add to layer

```javascript
sizer.addToLayer(layer);
```

- `layer` : [Layer](layer.md) game object.

### Events

#### Layout children

!!! note
    Enable sizer events by set `sizerEvents` to `true` in config.

- Fire `'sizer.postlayout'` event to all children after layout.
    ```javascript
    child.on('sizer.postlayout', function(child, sizer){
        var prevState = sizer.getChildPrevState(children[i]);
    })
    ```
    - `prevState` : Properties before layout.
        - `prevState.x`, `prevState.y` : Child position before layout.
        - `prevState.width`, `prevState.height`, 
          `prevState.displayWidth`, `prevState.displayHeight`, 
          `prevState.scaleX`, `prevState.scaleY` : Child size before layout.
- Fire `'postlayout'` event.
    ```javascript
    sizer.on('postlayout', function(children, sizer) {
        for(var i=0, cnt=children.length; i<cnt; i++) {
            var prevState = sizer.getChildPrevState(children[i]);
            // ...
        }
    })
    ```

#### Remove child

!!! note
    Enable sizer events by set `sizerEvents` to `true` in config.

- Fire `'sizer.remove'` event to removed without destroyed child.
    ```javascript
    child.on('sizer.remove', function(child, sizer){
    
    })
    ```
- Fire `'remove'` event.
    ```javascript
    sizer.on('remove', function(child, sizer){
    
    })
    ```

#### Add child

!!! note
    Enable sizer events by set `sizerEvents` to `true` in config.

- Fire `'sizer.add'` event to added child.
    ```javascript
    child.on('sizer.add', function(child, sizer){
    
    })
    ```
- Fire `'add'` event.
    ```javascript
    sizer.on('add', function(child, sizer){
    
    })
    ```

#### Broadcast event

Fire event to sizer itself and all children

```javascript
sizer.broadcastEvent(eventName, parameter0, parameter1, ...);
```

Receive event

```javascript
child.on(eventName, function(parameter0, parameter1, ...) {

}, scope);
```

### Other properties

This game object inherits from [ContainerLite](containerlite.md).