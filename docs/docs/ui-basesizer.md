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
    - [Nine-slice](nineslice.md) game object
        ```javascript
        var gameObject = scene.add.nineslice(x, y, texture, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
        ```
        or
        ```javascript
        var gameObject = scene.make.nineslice({
            key: key, 
            frame: frameName,
            leftWidth: 0, 
            rightWidth: 0,
            topHeight: 0, 
            bottomHeight: 0
        });
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

#### Remove background

- Remove background child
    ```javascript
    sizer.removeBackground(gameObject);
    ```
- Remove background child and destroy it
    ```javascript
    sizer.removeBackground(gameObject, true);
    ```
- Remove all background children
    ```javascript
    sizer.removeAllBackgrounds();
    ```
- Remove all background children and destroy them
    ```javascript
    sizer.removeAllBackgrounds(true);
    ```

#### Depth of background

Send this background child to bottom of sizer.

```javascript
sizer.sendChildToBack(gameObject);
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

### Layout warn

It will print warn message if children size is larger then Minimum size by default.

To disable this feature, invoke

```javascript
sizer.enableLayoutWarn(false);
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

- Scale up from `0` to *current scale* of game object.
    - Pop-up width and height
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .popUp(duration);
        
        // sizer.popUp(duration, undefined, ease);
        ```
        or
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .popUpPromise(duration)
            .then(function() {
                // ....
            })
        ```
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
    - Pop-up width only
        ```javascript
        sizer
            //.setScaleX(scaleX)
            .popUp(duration, 'x');
        
        // sizer.popUp(duration, 'x', ease);
        ```
        or
        ```javascript
        sizer
            //.setScaleX(scaleX)
            .popUpPromise(duration, 'x')
            .then(function() {
                // ....
            })
        ```
    - Pop-up height only
        ```javascript
        sizer
            //.setScaleY(scaleY)
            .popUp(duration, 'y');
        
        // sizer.popUp(duration, 'y', ease);
        ```
        or
        ```javascript
        sizer
            //.setScaleY(scaleY)
            .popUpPromise(duration, 'y')
            .then(function() {
                // ....
            })
        ```
    - Pop-up via config
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .popUp({
                duration: undefined,
                orientation: undefined,
                ease: undefined,
            })
        ```
        or
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .popUpPromise(config)
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
- Scale up/down, then scale back (yoyo)
    - Scale up/down, then scale back width and height
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .scaleYoyo(duration, peakValue);
        
        // sizer.scaleYoyo(duration, peakValue, repeat, undefined, ease);
        ```
        or
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .scaleYoyoPromise(duration, peakValue, repeat)
            .then(function() {
                // ....
            })
        ```
        - `peakValue` : Scale to this peak value, then scale back
        - `repeat` : Yoyo repeat, default value is `0`.
        - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
    - Scale up/down, then scale back width only
        ```javascript
        sizer
            //.setScaleX(scaleX)
            .scaleYoyo(duration, peakValue, 0, 'x');
        
        // sizer.popUp(duration, peakValue, repeat, 'x', ease);
        ```
        or
        ```javascript
        sizer
            //.setScaleX(scaleX)
            .scaleYoyoPromise(duration, peakValue, repeat, 'x')
            .then(function() {
                // ....
            })
        ```
    - Scale up/down, then scale back height only
        ```javascript
        sizer
            //.setScaleY(scaleY)
            .scaleYoyo(duration, peakValue, 0, 'y');
        
        // sizer.popUp(duration, peakValue, repeat, 'y', ease);
        ```
        or
        ```javascript
        sizer
            //.setScaleY(scaleY)
            .scaleYoyoPromise(duration, peakValue, repeat, 'y')
            .then(function() {
                // ....
            })
        ```
    - Scale up/down via config
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .scaleYoyo({
                duration: undefined,
                peakValue: 1.2,
                repeat: 0,
                orientation: undefined,
                ease: undefined,
            })
        ```
        or
        ```javascript
        sizer
            //.setScale(scaleX, scaleY)
            .scaleYoyoPromise(config)
            .then(function() {
                // ....
            })
        ```
        - `orientation` : `undefined`, `x`, or `y`
- Events
    - Pop-up complete
        ```javascript
        sizer.on('popup.complete', function(sizer) { });
        ```
    - Scale-down, scale-down destroy complete
        ```javascript
        sizer.on('scaledown.complete', function(sizer) { });
        ```
    - Scale up/down, then scale back (yoyo)
        ```javascript
        sizer.on('scaleyoyo.complete', function(sizer) { });
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
    sizer.fadeInPromise(duration, endAlpha)
        .then(function(){
            // ...
        })
    ```
    or
    ```javascript
    sizer.fadeInPromise(duration, {start:0, end:1})
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
- Move-stop
    ```javascript
    sizer.moveStop();
    // sizer.moveStop(true);  // Set to end position
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

### Shake

- Start
    ```javascript
    sizer.shake(duration);
    // sizer.shake(duration, magnitude);
    ```
    or
    ```javascript
    sizer.shakePromise(duration, magnitude)
        .then(function(){
            // ...
        })
    ```
- Events
    - Shake complete
        ```javascript
        sizer.on('shake.complete', function(sizer) { });
        ```

### Ease data

- Start
    ```javascript
    sizer.easeDataTo(key, value, duration);
    // sizer.easeDataTo(key, value, duration, ease);
    // sizer.easeDataTo({ key, value, duration, ease });
    // sizer.easeDataTo({ key, value, speed, ease });
    ```
    or
    ```javascript
    sizer.easeDataToPromise(key, value, duration, ease)
        .then(function(){
            // ...
        })
    ```
- Stop
    ```javascript
    sizer.stopEaseData(key);           // Set to end value
    // sizer.stopEaseData(key, false); // Stop at current value
    ```
    or
    ```javascript
    sizer.stopAllEaseData();           // Set to end value
    // sizer.stopAllEaseData(false);   // Stop at current value
    ```
- Events
    - Easing complete
        ```javascript
        sizer.on('easedata.' + key + '.complete', function(sizer) { });
        ```
        ```javascript
        sizer.on('easedata.complete', function(key, sizer) { });
        ```


### Modal

1. Assign `sizer.onCreateModalBehavior` callback, or register events to close modal sizer directly.
    - onCreateModalBehavior : 
        ```javascript
        sizer.onCreateModalBehavior = function(sizer, config) {
            // ...
            sizer.modalClose(data);
        }
        ```
        - `config` : Passed from `sizer.modal(config)`
    - Close modal sizer
        ```javascript
        sizer.modalClose(data);
        ```
2. Pop this modal sizer
    ```javascript
    sizer.modal({
        // cover: {
        //     color: 0x0,
        //     alpha: 0.8,
        //     transitIn: function(gameObject, duration) { },
        //     transitOut: function(gameObject, duration) { },
        // },
        // cover: false, 
    
        // When to close modal dialog?
        // touchOutsideClose: false,
        // anyTouchClose: false,
        // timeOutClose: false,
        // manualClose: false,
    
        // duration: {
        //     in: 200,
        //     hold: 2000,
        //     out: 200
        // }
    
        // transitIn: 0,
        // transitOut: 0,
    
        // destroy: true
    });
    // sizer.modal(config, onClose);
    ```
    or
    ```javascript
    sizer
        .modalPromise(config)
        .then(function(data){
            
        })
    ```
    - `config` : See [Modal behavior](modal.md#create-instance)
    - `onClose` : Callback when closing modal dialog
        ```javascript
        function(data) {      
        }
        ```
        - `data` : Object passed from `sizer.modalClose(data)`.


### Set properties of child

```javascript
sizer.setChildPosition(child, x, y);
sizer.setChildRotation(child, rotation);
sizer.setChildScale(child, scaleX, scaleY);
sizer.setChildDisplaySize(child, width, height);
sizer.setChildVisible(child, visible);
sizer.setChildAlpha(child, alpha);
```

### Depth

- Get depth of sizer
    ```javascript
    var depth = sizer.depth;
    ```
- Set depth of sizer
    ```javascript
    sizer.setDepth(value, true);
    // sizer.depth = depth;
    ```
- Set depth of sizer and all children
    ```javascript
    sizer.setDepth(value);
    ```
- Bring this sizer and its children to top
    ```javascript
    sizer.bringToTop();
    ```
- Swap depth with another sizer
    ```javascript
    sizerA.swapDepth(sizerB);
    ```
- Increase of sizer and all children
    ```javascript
    sizer.incDepth(value);
    ```
- Move game object below this sizer and all children
    ```javascript
    sizer.moveDepthBelow(gameObject);
    ```
- Move game object above this sizer and all children
    ```javascript
    sizer.moveDepthAbove(gameObject);
    ```

### Scroll factor

- Set scroll factor to children
   ```javascript
   sizer.setScrollFactor(x, y);
   ```

### Change origin

```javascript
sizer.changeOrigin(originX, originY);
```

This method also will reset all local state of children.

### Destroy

```javascript
sizer.destroy();
```

### Drag sizer

- Drag top-most sizer by child
    - Enable
        ```javascript
        sizer.setDraggable(child);
        // sizer.setDraggable(child, true);
        ```
        or
        ```javascript
        sizer.setDraggable(elementName);
        // sizer.setDraggable(elementName, true);
        ```
    - Disable
        ```javascript
        sizer.setDraggable(child, false);
        ```
        or
        ```javascript
        sizer.setDraggable(elementName, false);
        ```
- Drag top-most sizer by this sizer
    - Enable
        ```javascript
        sizer.setDraggable();
        // sizer.setDraggable(true);
        ```
    - Disalbe
        ```javascript
        sizer.setDraggable(false);
        ```
- Drag target sizer by child
    - Enable
        ```javascript
        sizer.setDraggable(child, targetSizer);
        // sizer.setDraggable(child, true, targetSizer);
        ```
        or
        ```javascript
        sizer.setDraggable(elementName);
        // sizer.setDraggable(elementName, true, targetSizer);
        ```
    - Disable
        ```javascript
        sizer.setDraggable(child, false);
        ```
        or
        ```javascript
        sizer.setDraggable(elementName, false);
        ```
- Drag target config
    ```javascript
    sizer.setDraggable({
        sensor: child, // or elementName
        target: undefined, // or a parentSizer
        draggable: true
    })
    ```
    - `sensor` : A game object or a string
    - `target`
        - `undefined` : Top-most sizer
        - A game object : A parent sizer
        

#### Events

- Fire `'sizer.drag'` on target sizer when dragging
    ```javascript
    targetSizer.on('sizer.drag', function(pointer, dragX, dragY) {

    })
    ```
- Fire `'sizer.dragstart'` on target sizer when dragging
    ```javascript
    targetSizer.on('sizer.dragstart', function(pointer, dragX, dragY) {

    })
    ```
- Fire `'sizer.dragend'` on target sizer when dragging
    ```javascript
    targetSizer.on('sizer.dragend', function(pointer, dragX, dragY, dropped) {

    })
    ```
- Fire `'sizer.drop'` on target sizer when dropped
    ```javascript
    targetSizer.on('sizer.drop', function(pointer, dropZone) {

    })
    ```

### Click

- Add click event
    ```javascript
    sizer.onClick(callback, scope);
    // sizer.onClick(callback, scope, config);
    ```
    - `config` : See [Button](button.md#create-instance)
    - `callback` :
        ```javascript
        function(button, gameObject, pointer, event) {

        }
        ```
        - `button` : [Button](button.md) behavior.
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

### Click child

- Add click event
    ```javascript
    sizer.onClick(child, callback, scope);
    // sizer.onClick(child, callback, scope, config);
    ```
- Turn off click event
    ```javascript
    sizer.offClick(child, callback, scope);
    ```
- Enable click event
    ```javascript
    sizer.enableClick(child);
    ```
- Disable click event
    ```javascript
    sizer.disableClick(child);
    ```

### Click outside

- Add click-outside event
    ```javascript
    sizer.onClickOutside(callback, scope);
    // sizer.onClickOutside(callback, scope, config);
    ```
    - `config` : See [ClickOutside](clickoutside.md#create-instance)
    - `callback` :
        ```javascript
        function(clickOutside, gameObject, pointer) {

        }
        ```
        - `clickOutside` : [ClickOutside](clickoutside.md) behavior.
- Turn off click-outside event
    ```javascript
    sizer.offClickOutside(callback, scope);
    ```
- Enable click-outside event
    ```javascript
    sizer.enableClickOutside();
    ```
- Disable click-outside event
    ```javascript
    sizer.disableClickOutside();
    ```

Equal to 

```javascript
var clickOutside = scene.rexUI.add.clickOutside(sizer, config);
clickOutside.on('clickoutside', callback, scope);
```

### Click outside of child

- Add click-outside event
    ```javascript
    sizer.onClickOutside(child, callback, scope);
    // sizer.onClickOutside(child, callback, scope, config);
    ```
    - `config` : See [ClickOutside](clickoutside.md#create-instance)
    - `callback` :
        ```javascript
        function(clickOutside, gameObject, pointer) {

        }
        ```
        - `clickOutside` : [ClickOutside](clickoutside.md) behavior.
- Turn off click-outside event
    ```javascript
    sizer.offClickOutside(child, callback, scope);
    ```
- Enable click-outside event
    ```javascript
    sizer.enableClickOutside(child);
    ```
- Disable click-outside event
    ```javascript
    sizer.disableClickOutside(child);
    ```

### Is pointer in bounds

- Is current sizer clicking
    ```javascript
    var isClicked = sizer.isPointerInBounds();
    ```
- Is a child clicking
    ```javascript
    var isClicked = sizer.isPointerInBounds(child);
    ```
    or
    ```javascript
    var isClicked = sizer.isPointerInBounds(elementName);
    ```
    - `child` : Game object of child
    - `elementName` : Element name for retrieveing child game object.

### In touching

Invoke callbeack if pointer is inside hitarea every tick.

- Add in-touching event
    ```javascript
    sizer.onTouching(callback, scope);
    // sizer.onTouching(callback, scope, config);
    ```
- Turn off in-touching event
    ```javascript
    sizer.offTouching(callback, scope);
    ```
- Add touching-end event
    ```javascript
    sizer.onTouchingEnd(callback, scope);
    // sizer.onTouchingEnd(callback, scope, config);
    ```
- Turn off touching-end event
    ```javascript
    sizer.offTouchingEnd(callback, scope);
    ```
- Enable in-touching event
    ```javascript
    sizer.enableTouching();
    ```
- Disable in-touching event
    ```javascript
    sizer.disableTouching();
    ```

Equal to 

```javascript
var inTouching = scene.rexUI.add.inTouching(sizer, config);
inTouching.on('intouch', callback, scope);
```

### In touching child

- Add in-touching event
    ```javascript
    sizer.onTouching(child, callback, scope);
    // sizer.onClick(child, callback, scope, config);
    ```
- Turn off in-touching event
    ```javascript
    sizer.offTouching(child, callback, scope);
    ```
- Enable in-touching event
    ```javascript
    sizer.enableTouching(child);
    ```
- Disable in-touching event
    ```javascript
    sizer.disableTouching(child);
    ```

### Set children interactive

Applies [click](button.md), [tap](gesture-tap.md), [press](gesture-press.md), [swipe](gesture-swipe.md) behaviors on this sizer, to detect input events of children.

```javascript
sizer.setChildrenInteractive({
    // dropZone: false,

    // down: undefined,
    // up: undefined,
    // over: undefined,
    
    // click: {mode: 'release', clickInterval: 100},

    // press: {time: 251, threshold: 9},

    // tap: {time: 250, tapInterval: 200, threshold: 9, tapOffset: 10, 
    //       taps: undefined, minTaps: undefined, maxTaps: undefined,},

    // swipe: {threshold: 10, velocityThreshold: 1000, dir: '8dir'},

    // inputEventPrefix: 'child.',
})
```

- `dropZone` :
    - `true` : Enable [drop Zone](touchevents.md#drop-zone) on this sizer.
    - `false` : Do nothing.
- `down` :
    - `false` : Don't fire (pointer-) down events
- `up` :
    - `false` : Don't fire (pointer-) up events
- `over` :
    - `false` : Don't fire (pointer-) over/out events
- `click` : [Configuration](button.md#create-instance) of Button behavior.
    - `false` : Don't install Button behavior.
- `press` : [Configuration](gesture-press.md#create-instance) of Press behavior.
    - `false` : Don't install Press behavior.
- `tap` : [Configuration](gesture-tap.md#create-instance) of Tap behavior.
    - `false` : Don't install Tap behavior.
- `swipe` : [Configuration](gesture-swipe.md#create-instance) of Swipe behavior.
    - `false` : Don't install Swipe behavior.
- `inputEventPrefix` : Prefix string of each event, default is `'child.'`.

!!! note
    Input behaviors are installed to this Sizer game object, not each child. And it assumes that all children are not overlapped.
    Use [Button](ui-buttons.md) if user needs to enable/disable input behaviors of each child individually.

#### Events

- Pointer-down
    ```javascript
    sizer.on('child.down', function(child, pointer, event) {
        // ...
    }, scope);
    ```
- Pointer-up
    ```javascript
    sizer.on('child.up', function(child, pointer, event) {
        // ...
    }, scope);
    ```
- Pointer-over
    ```javascript
    sizer.on('child.over', function(child, pointer, event) {
        // ...
    }, scope);
    ```
- Pointer-out
    ```javascript
    sizer.on('child.out', function(child, pointer, event) {
        // ...
    }, scope);
    ```
- Click
    ```javascript
    sizer.on('child.click', function(child, pointer, event) {
        // ...
    }, scope);
    ```
    - `child` : Triggered child game object.
    - `pointer` : [Pointer](touchevents.md#properties-of-point) object.    
- Press
    ```javascript
    sizer.on('child.pressstart', function(child, pointer) { 
        // ...
    }, scope);
    ```
    ```javascript
    sizer.on('child.pressend', function(child, pointer) { 
        // ...
    }, scope);
    ```
- Tap
    ```javascript
    sizer.on(tapEventName, function(child, pointer) { 
        // ...
    }, scope);
    ```
    - `tapEventName` :  `'child.1tap'`, `'child.2tap'`, `'child.3tap'`, etc ...
- Swipe
    ```javascript
    sizer.on(swipeEventName, function(child, pointer) { 
        // ...
    }, scope);
    ```
    - `swipeEventName` :  `'child.swipeleft'`, `'child.swiperight'`, `'child.swipeup'`, `'child.swipedown'`.

### Pin game object

```javascript
sizer.pin(gameObject);
```

!!! note
    Method `sizer.add` is override in each sizer class usually.

### Un-pin game object

```javascript
sizer.unpin(child);
// sizer.unpin(child, destroyChild);
```
- `destroyChild` : Set true to destroy child. Default is `false`.

!!! note
    Method `sizer.remove` is override in each sizer class usually.

### Draw bounds

- Draw bounds of shown game object on a graphics game object
    ```javascript
    sizer.drawBounds(graphics);
    // sizer.drawBounds(graphics, color);
    ```
    - `graphics` : [Graphics game object](graphics.md)
    - `color` : Default value is `0xffffff`
- Draw bounds of shown game object, and display name of child
    ```javascript
    sizer.drawBounds(graphics, {
        // color: 0xffffff,
        // lineWidth: 2,

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
    - `color` : Default value is `0xffffff`.
    - `lineWidth` : Default value is `1`.
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
- Set outer padding, which is equal to `padding` parameter when adding this sizer to parent sizer.
    - Set outer padding via config
        ```javascript
        sizer.setOuterPadding({
            left: leftPadding, 
            right: rightPadding,
            top: topPadding,
            bottom: bottomPadding
        });
        ```
    - Set outer padding via single number
        ```javascript
        sizer.setOuterPadding(value);
        ```
    - Set specific outer padding
        ```javascript
        sizer.setOuterPadding(key, value);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Get outer padding
    - Get outer padding values
        ```javascript
        var outerPadding = sizer.getOuterPadding();
        ```
    - Get specific outer padding
        ```javascript
        var value = sizer.getOuterPadding(key);
        ```
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Set outer padding of child, which is equal to `padding` parameter when adding this sizer to parent sizer.
    - Set outer padding via config
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
    - Set outer padding via single number
        ```javascript
        sizer.setChildOuterPadding(child, value);
        ```
        - `child` : A string key or game object.
    - Set specific outer padding
        ```javascript
        sizer.setChildOuterPadding(child, key, value);
        ```
        - `child` : A string key or game object.
        - `key` : `'left'`, `'right'`, `'top'`, `'bottom'`
- Get outer padding of child
    - Get outer padding values
        ```javascript
        var outerPadding = sizer.getChildOuterPadding(child);
        ```
        - `child` : A string key or game object.
    - Get specific outer padding
        ```javascript
        var value = sizer.getChildOuterPadding(child, key);
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
        - Remove children map :
            ```javascript
            sizer.removeChildrenMap(key);
            ```
            or
            ```javascript
            sizer.removeChildrenMap(child);
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
- Get ancestor sizer matched given name
    ```javascript
    var parentSizer = sizer.getParentSizer(name);
    ```
- Get topmost sizer
    ```javascript
    var topmostSizer = sizer.getTopmostSizer();
    ```

### Has parent/child

- Has parent
    ```javascript
    var hasParent = sizer.hasParentSizer(parentGameObject);
    ```
- Has child
    ```javascript
    var hasChild = sizer.hasParentSizer(childGameObject);
    ```

### Is in touching

- Is this sizer in touching?
    ```javascript
    var isTouching = sizer.isInTouching();
    ```
- Is child of this sizer in touching?
    ```javascript    
    var isTouching = sizer.isInTouching(child);
    ```
    or
    ```javascript
    var isTouching = sizer.isInTouching(childKey);
    ```
    - `child` : Child game object.
    - `childKey` : Get child game object back via `sizer.getElement(childKey)`. See also [sizer.addChildrenMap(key, child)](ui-basesizer.md#get-child)


### Change properties of child

- [Set property of child from sizer](containerlite.md#set-properties-of-child)
- Set property of child, then [reset local state of child](containerlite.md#reset-local-state-of-child)
- [Tween local state of child](containerlite.md#tween-local-state)

### Add to container

- Add to [built-in container](container.md)
    ```javascript
    p3Container.add(sizer);
    ```
    or
    ```javascript
    sizer.addToContainer(p3Container);
    ```
    - `container` : [Container](container.md) game object.
- Add to [Layer](layer.md)
    ```javascript
    sizer.addToLayer(layer);
    ```
    - `layer` : [Layer](layer.md) game object.

!!! note
    `container.add(sizer)`, or `layer.add(sizer)` won't add children of sizer.

### Layer

A sizer can have a [layer](layer.md). 
Current children and new children will draw on this layer, instead of display list of scene.

- Enable layer. Do nothing if layer is existed.
    ```javascript
    sizer.enableLayer();
    ```
- Get layer game object. Will enable layer if layer is not existed.
    ```javascript
    var layer = sizer.getLayer();
    ```

### Shader effects

Apply post-fx pipeline on [layer of sizer](ui-basesizer.md#layer).

### Snapshot

- Draw all visible children on a [render-texture](rendertexture.md).
    ```javascript
    var renderTexture = container.snapshot({
        renderTexture: undefined,
        padding: 0
    });
    ```
    - `renderTexture` : Draw on this [render-texture](rendertexture.md)
        - `undefined` : Create a new [render-texture](rendertexture.md)
    - `padding` : 
        - `0` : No extra padding space. Default value.
        - A number : Add extra padding space around this render-texture.
- Draw all visible children on a texture
    ```javascript
    container.snapshot({
        padding: 0,
        saveTexture: textureKey
    });
    ```
    - `saveTexture` : [Save render result to texture manager](rendertexture.md#save-texture).

#### Layout children

!!! note
    Enable sizer events by set `sizerEvents` to `true` in config.

- Fire `'sizer.postlayout'` event to all children after layout.
    ```javascript
    child.on('sizer.postlayout', function(child, sizer){
        var prevState = sizer.getChildPrevState(child);
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
