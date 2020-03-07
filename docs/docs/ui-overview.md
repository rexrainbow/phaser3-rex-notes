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

## List of ui plugins

### UI components

1. [Buttons](ui-buttons.md): A container with a group of buttons.
1. [Dialog](ui-dialog.md): A container with a title, content, buttons and background.
1. [Fix-width-sizer](ui-fixwidthsizer.md): Layout children game objects into lines.
1. [Grid-sizer](ui-gridsizer.md): Layout children game objects in grids.
1. [Grid-table](ui-gridtable.md): A container with a [grid table](gridtable.md), slider, and scroller.
1. [Label](ui-label.md): A container with an icon, text, and background.
1. [Menu](ui-menu.md): A container with buttons and sub-menu.
1. [Number-bar](ui-numberbar.md): A container with an icon, slider, text, and background.
1. [Pages](ui-pages.md): A container with pages, only current page is visible.
1. [Scroll-able panel](ui-scrollablepanel.md): A container with a panel, slider, and scroller.
1. [Sizer](ui-sizer.md): Layout children game objects.
1. [Slider](ui-slider.md): A container with a track, indicator, thumb and background.
1. [Tabs](ui-tabs.md): A container with 4 groups of buttons around a center panel.
1. [TextArea](ui-textarea.md): A container with a text, slider, and scroller.
1. [Textbox](ui-textbox.md): A container with an icon, ([typing](texttyping.md) and [paging](textpage.md)) text, and background.
1. [Toast](ui-toast.md): Show text message for a short while.

!!! note "Scroll-able table"
    There are 2 kinds of scroll-able tables :

    - [Grid-table](ui-gridtable.md) only creates visible objects. It is suitable for large table.
    - [Grid-sizer](ui-gridsizer.md) adds all objects. Put this grid-sizer into scroll-able panel to have a scroll-able table.

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

### Canvas objects

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

#### Behaviors of text

1. [Text editor](textedit.md): Create an [input text object](inputtext.md) above a text object to edit string content.
    ```javascript
    scene.rexUI.add.edit(textObject, config);
    // scene.rexUI.add.edit(textObject, config, onClose);
    ```

### Video objects

1. [Youtube player](youtubeplayer.md): Play youtube video on iframe.
    ```javascript
    var video = scene.rexUI.add.youtubePlayer(x, y, width, height, config);
    // var video = scene.rexUI.add.youtubePlayer(config);
    ```
    or
    ```javascript
    class MyVideo extends RexPlugins.UI.YoutubePlayer {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```

### Gestures

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

### Behaviors

1. [Flip](flip.md): Flip game object to another face by scaling width/height.
    ```javascript
    var flip = scene.rexUI.add.flip(gameObject, config);
    ```
    or
    ```javascript
    var flip = new RexPlugins.UI.Flip(gameObject, config);
    ```

### Helper methods

#### Get parent

- Get parent sizer
    ```javascript
    var parentSizer = scene.rexUI.getParentSizer(gameObject);
    ```
    - `gameObject` : Any game object added to sizer.
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