## Install ui plugins

### Install from minify file

1. Download minify file ([link](https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js)).
1. Install ui plugin in preload stage
    ```javascript
    scene.load.scenePlugin({
        key: 'rexuiplugin',
        url: filePath,
        sceneKey: 'rexUI'
    });
    ```
    - `key` : Must be `'rexuiplugin'`

### Install from npm package

1. Install rex plugins
    ```
    npm i phaser3-rex-plugins
    ```
1. Install ui plugin in [configuration of game](game.md#configuration)
    ```javascript
    import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```

#### Using typescript declaration file

```typescript
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

class Game extends Phaser.Scene {
    rexUI: RexUIPlugin;  // Declare scene property 'rexUI' as RexUIPlugin type

    create() {
        var sizer = this.rexUI.add.sizer({
            // ...
        })
    }
}

var game = new Phaser.Game({
    scene: Game,
    // ...
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        },
        // ...
        ]
    }
    // ...
});
```

- `'phaser3-rex-plugins/templates/ui/ui-plugin'` : Factories of rexUI components.
- `'phaser3-rex-plugins/templates/ui/ui-components'` : Class of rexUI components.
    ```typescript
    import { Sizer } from 'phaser3-rex-plugins/templates/ui/ui-components';
    ```

See this [example](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/ui-wrap-expand-text/speech-bubble-background-ts.ts)

## List of ui plugins

### UI components

1. [Badge label](ui-badgelabel.md): A container with badges above a main item.
1. [Buttons](ui-buttons.md): A container with a group of buttons.
1. [Dialog](ui-dialog.md): A container with a title, content, buttons and background.
1. [Fix-width-buttons](ui-fixwidthbuttons.md): A container with a group of fix-width buttons.
1. [Fix-width-sizer](ui-fixwidthsizer.md): Layout children game objects into lines.
1. [Grid-buttons](ui-gridbuttons.md): A container with a group of buttons in grids.
1. [Grid-sizer](ui-gridsizer.md): Layout children game objects in grids.
1. [Grid-table](ui-gridtable.md): A container with a [grid table](gridtable.md), slider, and scroller.
1. [Holy grail](ui-holygrail.md): Layout elements in [Holy grail](https://en.wikipedia.org/wiki/Holy_grail_(web_design)) style.
1. [Knob](ui-knob.md): A knob button based on circular progress.
1. [Label](ui-label.md): A container with an icon, text, and background.
1. [Menu](ui-menu.md): A container with buttons and sub-menu.
1. [Number-bar](ui-numberbar.md): A container with an icon, slider, text, and background.
1. [Overlap sizer](ui-overlapsizer.md): Layout children game objects overlapped.
1. [Pages](ui-pages.md): A container with pages, only current page is visible.
1. [Scroll-able panel](ui-scrollablepanel.md): A container with a panel, slider, and scroller.
1. [Sizer](ui-sizer.md): Layout children game objects.
1. [Slider](ui-slider.md): A container with a track, indicator, thumb and background.
1. [Tabs](ui-tabs.md): A container with 4 groups of buttons around a center panel.
1. [TextArea](ui-textarea.md): A container with a text, slider, and scroller.
1. [Textbox](ui-textbox.md): A container with an icon, ([typing](texttyping.md) and [paging](textpage.md)) text, and background.
1. [Toast](ui-toast.md): Show text message for a short while.

!!! note "Scroll-able table"
    There are 3 kinds of scroll-able tables :

    - [Grid-table](ui-gridtable.md) only creates visible objects. It is suitable for large table.
    - [Grid-sizer](ui-gridsizer.md) adds all objects. Put this grid-sizer into scroll-able panel to have a scroll-able table.
    - [Fixwidth-sizer](ui-fixwidthsizer.md) adds all objects. Put this fixwidth-sizer into scroll-able panel to have a scroll-able table.

### Basic container

1. [ContainerLite](containerlite.md): Control the position and angle of children game objects.
    ```javascript
    var container = scene.rexUI.add.container(x, y);
    ```
    or
    ```javascript
    class MyContainer extends RexPlugins.UI.Container {
        constructor(scene, x, y, width, height, children) {
            super(scene, x, y, width, height, children);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```

### Background objects

1. [Round-rectangle](shape-roundrectangle.md): Round rectangle shape.
    ```javascript
    var shape = scene.rexUI.add.roundRectangle(x, y, width, height, radius, fillColor);
    ```
    or
    ```javascript
    class MyRoundRectangle extends RexPlugins.UI.RoundRectangle {
        constructor(scene, x, y, width, height, radius, fillColor, fillAlpha) {
            super(scene, x, y, width, height, radius, fillColor, fillAlpha);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Nine-patch](ninepatch.md): Stretchable imaage.
    ```javascript
    var ninePatch = scene.rexUI.add.ninePatch(x, y, width, height, key, columns, rows, config);
    ```
    ```javascript
    var ninePatch = scene.rexUI.add.ninePatch2(x, y, width, height, key, columns, rows, config);
    ```
    or
    ```javascript
    class MyNinePatch extends RexPlugins.UI.NinePatch {
        constructor(scene, x, y, width, height, key, columns, rows, config) {
            super(scene, x, y, width, height, key, columns, rows, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
    ```javascript
    class MyNinePatch extends RexPlugins.UI.NinePatch2 {
        constructor(scene, x, y, width, height, key, columns, rows, config) {
            super(scene, x, y, width, height, key, columns, rows, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Custom shapes](shape-custom-shapes.md): Custom shapes on shape.
    ```javascript
    var customShapes = scene.rexUI.add.customShapes(x, y, width, height, config);
    ```
    or
    ```javascript
    class MyCustomShapes extends RexPlugins.UI.CustomShapes {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Custom progress](shape-custom-progress.md): Custom progress on shape.
    ```javascript
    var customProgress = scene.rexUI.add.customProgress(x, y, width, height, config);
    ```
    or
    ```javascript
    class MyCustomProgress extends RexPlugins.UI.CustomProgress {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }    
    ```
1. [Canvas-round-rectangle](canvas-roundrectangle.md): Round rectangle on canvas.
    ```javascript
    var shape = scene.rexUI.add.roundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    ```
    or
    ```javascript
    class MyRoundRectangleCanvas extends RexPlugins.UI.RoundRectangleCanvas {
        constructor(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
            super(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Cover](shape-cover.md): [Rectangle shape covered full window](shape-cover.md), and [block all touch events](toucheventstop.md).
    ```javascript
    var shape = scene.rexUI.add.cover(config);
    ```
    or
    ```javascript
    class MyCover extends RexPlugins.UI.Cover {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```

### Canvas/Shape objects

1. [Canvas](canvas.md): Drawing on [canvas](https://www.w3schools.com/html/html5_canvas.asp).
    ```javascript
    var canvas = scene.rexUI.add.canvas(x, y, width, height);
    // var canvas = scene.rexUI.add.canvas(x, y, width, height);
    ```
    or
    ```javascript
    class MyCanvas extends RexPlugins.UI.Canvas {
        constructor(scene, x, y, width, height) {
            super(scene, x, y, width, height);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Circle mask image](circlemaskimage.md): Load a texture, then apply a circle mask.
    ```javascript
    var image = scene.rexUI.add.circleMaskImage(x, y, key, frame);
    // var image = scene.rexUI.add.circleMaskImage(x, y, key, frame, config);
    ```
    or
    ```javascript
    class MyImage extends RexPlugins.UI.CircleMaskImage {
        constructor(scene, x, y, key, frame, config) {
            super(scene, x, y, key, frame, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Circular progress shape](shape-circularprogress.md): Circular progress bar shape.
    ```javascript
    var circularProgress = scene.rexUI.add.circularProgress(x, y, radius, barColor, value, config);
    ```
    or
    ```javascript
    class MyCircularProgress extends RexPlugins.UI.CircularProgress {
        constructor(scene, x, y, radius, barColor, value, config) {
            super(scene, x, y, radius, barColor, value, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Circular progress canvas](canvas-circularprogress.md): Circular progress bar on canvas
    ```javascript
    var circularProgress = scene.rexUI.add.circularProgressCanvas(x, y, radius, barColor, value, config);
    ```
    or
    ```javascript
    class MyCircularProgress extends RexPlugins.UI.CircularProgressCanvas {
        constructor(scene, x, y, radius, barColor, value, config) {
            super(scene, x, y, radius, barColor, value, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Chart](ui-chart.md): Draw [chart](https://www.chartjs.org/) on [canvas](canvas.md).

### Colored text objects

1. [BBCode text](bbcodetext.md): Drawing text with [BBCode](https://en.wikipedia.org/wiki/BBCode) protocol.
    ```javascript
    var txt = scene.rexUI.add.BBCodeText(x, y, text, style);
    ```
    or
    ```javascript
    class MyText extends RexPlugins.UI.BBCodeText {
        constructor(scene, x, y, text, style) {
            super(scene, x, y, text, style);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Tag text](tagtext.md): Displays text with multi-color, font face, or font size with tags.
    ```javascript
    var txt = scene.rexUI.add.tagText(x, y, text, style);
    ```
    or
    ```javascript
    class MyText extends RexPlugins.UI.TagText {
        constructor(scene, x, y, text, style) {
            super(scene, x, y, text, style);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
1. [Dynamic text](dynamictext.md): Control position, angle of each character drawn on a canvas.
    ```javascript
    var txt = scene.rexUI.add.dynamicText(config);
    ```
    or
    ```javascript
    class MyText extends RexPlugins.UI.DynamicText {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```

#### Transition image

1. [Transition image](transitionimage.md): Transit texture to another one.
    ```javascript
    var image = scene.rexUI.add.transitionImage(x, y, texture, frame, config);
    ```
    or
    ```javascript
    class MyTransitionImage extends RexPlugins.UI.TransitionImage {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```

#### Behaviors of text

1. [Hidden text edit](hiddeninputtext.md): Create an invisible [Input DOM element](https://www.w3schools.com/tags/tag_input.asp) to edit string content.
    ```javascript
    var hiddenEdit = this.rexUI.add.hiddenEdit(textObject, config);
    ```
    - `textObject` : [text](text.md), [bbocodetext](bbcodetext.md), [tagtext](tagtext.md), or [label](ui-label.md).
1. [Text edit](textedit.md): Create an [input text object](inputtext.md) above a text object to edit string content.
    ```javascript
    scene.rexUI.add.edit(textObject, config);
    // scene.rexUI.add.edit(textObject, config, onClose);
    ```
1. Wrap-expand text
    ```javascript
    var textObject = scene.rexUI.wrapExpandText(textObject);
    // var textObject = scene.rexUI.wrapExpandText(textObject, minWidth);
    ```
    - `textObject` :
        - [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md),
        - [Bitmap text object](bitmaptext.md)
        - [Dynamic text object](dynamictext.md), With default wrap configuration, ex:
            ```javascript
            {
                lineHeight: 24,
                padding: {bottom: 12}
            }
            ```

### Touch input

1. [Click](button.md): Fires 'click' event when touch releasd after pressed.
    ```javascript
    var click = scene.rexUI.add.click(gameObject, config);
    ```
    or
    ```javascript
    var click = new RexPlugins.UI.Click(gameObject, config);
    ```
1. [Click-Outside](clickoutside.md): Fires 'clickoutside' event when pointer-down or pointer-up outside of game object.
    ```javascript
    var clickOutside = scene.rexUI.add.clickOutside(gameObject, config);
    ```
    or
    ```javascript
    var clickOutside = new RexPlugins.UI.ClickOutside(gameObject, config);
    ```
1. [Tap](gesture-tap.md): Get tap/multi-taps events of a game object.
    ```javascript
    var tap = scene.rexUI.add.tap(gameObject, config);
    ```
    or
    ```javascript
    var tap = new RexPlugins.UI.Tap(gameObject, config);
    ```
1. [Press](gesture-press.md): Get press events of a game object.
    ```javascript
    var press = scene.rexUI.add.press(gameObject, config);
    ```
    or
    ```javascript
    var press = new RexPlugins.UI.Press(gameObject, config);
    ```
1. [Swipe](gesture-swipe.md): Get swipe events of a game object.
    ```javascript
    var swipe = scene.rexUI.add.swipe(gameObject, config);
    ```
    or
    ```javascript
    var swipe = new RexPlugins.UI.Swipe(gameObject, config);
    ```
1. [Pan](gesture-pan.md): Get pan events of a game object.
    ```javascript
    var pan = scene.rexUI.add.pan(gameObject, config);
    ```
    or
    ```javascript
    var pan = new RexPlugins.UI.Pan(gameObject, config);
    ```
1. [Pinch](gesture-pinch.md): Get scale factor from 2 dragging touch pointers.
    ```javascript
    var pinch = scene.rexUI.add.pinch(config);
    ```
    or
    ```javascript
    var pinch = new RexPlugins.UI.Pinch(config);
    ```
1. [Rotste](gesture-rotate.md): Get spin angle from 2 dragging touch pointers.
    ```javascript
    var rotate = scene.rexUI.add.rotate(config);
    ```
    or
    ```javascript
    var rotate = new RexPlugins.UI.Rotate(config);
    ```
1. [Touch event stop](toucheventstop.md): Stop touch events propagation.
    ```javascript
    var touchEventStop = scene.rexUI.add.toucheventstop(gameObject, config);
    ```
    or
    ```javascript
    var touchEventStop = new RexPlugins.UI.TouchEventStop(gameObject, config);
    ```

### Behaviors

1. [Modal promise](modal-promise.md): [Modal behavior](modal.md) wrapped into promise.
    ```javascript
    scene.rexUI.modalPromise(gameObject, config)
        .then(function(closeEventData){ })
    ```
    - Close modal dialog:
        ```javascript
        scene.rexUI.modalClose(gameObject);
        // scene.rexUI.modalClose(gameObject, closeEventData);
        ```
        or
        ```javascript
        gameObject.emit('modal.requestClose');
        // gameObject.emit('modal.requestClose', closeEventData);
        ```
        - Fire `'modal.requestClose'` event on game object, which will invoke `modal.requestClose()` method. After closing dialog, `resolve` part of promise will be triggered.
1. [Flip](flip.md): Flip game object to another face by scaling width/height.
    ```javascript
    var flip = scene.rexUI.add.flip(gameObject, config);
    ```
    or
    ```javascript
    var flip = new RexPlugins.UI.Flip(gameObject, config);
    ```
1. Fade in, [fade out destroy](fadeoutdestroy.md#fade-out-destroy)
    ```javascript
    scene.rexUI.fadeIn(gameObject, duration);
    // scene.rexUI.fadeIn(gameObject, duration, alpha);
    ```
    ```javascript
    scene.rexUI.fadeOutDestroy(gameObject, duration);
    ```
1. [Ease-move to](easemove.md), ease-move from
    ```javascript
    scene.rexUI.easeMoveTo(gameObject, duration, x, y);
    // scene.rexUI.easeMoveTo(gameObject, duration, x, y, ease);
    ```
    ```javascript
    scene.rexUI.easeMoveFrom(gameObject, duration, x, y);
    // scene.rexUI.easeMoveFrom(gameObject, duration, x, y, ease);
    ```
2. [Shake](shake-position.md)
    ```javascript
    scene.rexUI.shake(gameObject, config);
    ```
3. [Perspective](containerlite-perspective.md): Snapshot children of [containerlite](containerlite.md), to a [perspective render texture](perspective-rendertexture.md).
    ```javascript
    var perspective = scene.rexUI.add.perspective(gameObject, config);
    ```
    or
    ```javascript
    var perspective = new RexPlugins.UI.Perspective(gameObject, config);
    ```

### Helper methods

#### Get parent

- Get parent sizer
    ```javascript
    var parentSizer = scene.rexUI.getParentSizer(gameObject);
    ```
    - `gameObject` : Any game object added to sizer.
- Get ancestor sizer matched given name
    ```javascript
    var parentSizer = scene.rexUI.getParentSizer(gameObject, name);
    ```
    - `gameObject` : Any game object added to sizer.
    - `name` : Name string.
- Get topmost sizer
    ```javascript
    var topmostSizer = scene.rexUI.getTopmostSizer(gameObject);
    ```
    - `gameObject` : Any game object added to sizer.

#### Show/hide

- Show
    ```javascript
    scene.rexUI.show(gameObject);
    scene.rexUI.getTopmostSizer(gameObject).layout();
    ```
- Hide
    ```javascript
    scene.rexUI.hide(gameObject);
    scene.rexUI.getTopmostSizer(gameObject).layout();
    ```
- Is shown
    ```javascript
    var isShown = scene.rexUI.isShown(gameObject);
    ```

### Is pointer in bounds

```javascript
var isInBounds = scene.rexUI.isInTouching(gameObject);
// var isInBounds = scene.rexUI.isInTouching(gameObject, pointer);
```

### [Event promise](eventpromise.md)

- [Get event promise](eventpromise.md#get-event-promise)
    ```javascript
    var promise = scene.rexUI.waitEvent(eventEmitter, eventName)
        .then(function() {

        })
    ```
    - `eventEmitter` : Any kind of [event emitter](eventemitter3.md). for example, game object, or [tween task](tween.md#events), or [scene event](scene.md#events)    
- [Get complete event promise](eventpromise.md#get-complete-event-promise)
    ```javascript
    var promise = scene.rexUI.waitComplete(eventEmitter)
        .then(function() {
            
        })
    ```
    - `eventEmitter` : [Event emitter](eventemitter3.md) which will fire `'complete'` event, for example, [tween task](tween.md#events).
- Delay time promise
    ```javascript
    var promise = scene.rexUI.delayPromise(time)
        .then(function() {
            
        })
    ```

### View port

View port is a [rectangle](geom-rectangle.md) of current visible area.

```javascript
var viewport = scene.rexUI.viewport;
```

Which will be changed after [resizing](scalemanager.md#events)

```javascript
scene.scale.on('resize', function() {
    var viewport = scene.rexUI.viewport;
    /*
    sizer
        .setPosition(viewport.centerX, viewport.centerY)
        .setMinSize(viewport.width, viewport.height)
        .layout();
    */
});
```

## Demos

- [Dialog](https://codepen.io/rexrainbow/pen/oQjMWE)
    - [Yes/No](https://codepen.io/rexrainbow/pen/MPZWZG)
    - [Choice](https://codepen.io/rexrainbow/pen/ePoRVz)
    - [Pop-up](https://codepen.io/rexrainbow/pen/NEpjmP)
- [Edit](https://codepen.io/rexrainbow/pen/YbvwBw)
- [Menu](https://codepen.io/rexrainbow/pen/PxOEBr)
- [Text-box](https://codepen.io/rexrainbow/pen/MzGoJv)
- [Text-area](https://codepen.io/rexrainbow/pen/JzBZzy)
- [Number bar](https://codepen.io/rexrainbow/pen/qLZPXr)
- [Grid table](https://codepen.io/rexrainbow/pen/XyJbWX)
- [Tabs](https://codepen.io/rexrainbow/pen/qJeVza)
    - [Tabs-tables](https://codepen.io/rexrainbow/pen/BGKvXK)
- [Scroll-able panel](https://codepen.io/rexrainbow/pen/YMyBom)
- [Pages](https://codepen.io/rexrainbow/pen/vPWzBa)
- [Fix-width sizer](https://codepen.io/rexrainbow/pen/WPJPdK)
- [Chart](https://codepen.io/rexrainbow/pen/qwVBNy)
- [Video player](https://codepen.io/rexrainbow/pen/Gazmyz)
- [Anchor](https://codepen.io/rexrainbow/pen/jJqXxB)
- [Round-rectangle](https://codepen.io/rexrainbow/pen/ZqqJjG)