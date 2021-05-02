## Introduction

Control position, angle of each character drawn on a [canvas](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Page typing](https://codepen.io/rexrainbow/pen/LYxoRWJ)
- [Align, rotation](https://codepen.io/rexrainbow/pen/JjEQXqj)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dynamictext)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdynamictextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdynamictextplugin.min.js', true);
    ```
- Add dynamic-text object
    ```javascript
    var txt = scene.add.rexDynamicText(x, y, width, height);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import DynamicTextPlugin from 'phaser3-rex-plugins/plugins/dynamictext-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexDynamicTextPlugin',
                plugin: DynamicTextPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add dynamic-text object
    ```javascript
    var txt = scene.add.rexDynamicText(x, y, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import DynamicText from 'phaser3-rex-plugins/plugins/dynamictext.js';
    ```
- Add dynamic-text object
    ```javascript    
    var txt = new DynamicText(scene, x, y, config);
    sscene.add.existing(txt);
    ```

### Create instance

```javascript
var txt = scene.add.rexDynamicText({
    x: 0, 
    y: 0,
    width: undefined, 
    height: undefined,

    padding: 0,  // {left: 0, right: 0, top: 0, bottom: 0}

    background: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2,

        cornerRadius: 0,
        cornerIteration: null
    },

    innerBounds: {
        color: null,
        color2: null,
        horizontalGradient: true,

        stroke: null,
        strokeThickness: 2
    },

    style: {
        bold: false,
        italic: false,
        fontSize: '16px',
        fontFamily: 'Courier',
        color: '#fff',
        stroke: '#fff',
        strokeThickness: 0,
        x: 0,
        y: 0
    },

    text: ''
});
```

- `x`, `y` : Position of this dynamic-text game object.
- `width` : Fixed width.
    - A number : Width of this dynamic-text game object. 
        - Wrap-width is `width - padding.left - padding.right`.
    - `undefined` : Width of this dynamic-text game object will be set after invoked `runWordWrap` method.
- `height` : Fixed height.
    - A number : Height of this dynamic-text game object. 
    - `undefined` : Height of this dynamic-text game object will be set after invoked `runWordWrap` method.
- `padding` : Padding of bounds.
    - A number 
    - `padding.left`, `padding.right`, `padding.top`, `padding.bottom`
- `background` : Properties of background round-rectangle.
    - `background.color` : Fill color.
        - `null` : No filling.
    - `background.color2` : Gradient fill color.
        - `null` : No gradient filling.
    - `background.horizontalGradient` : Horizontal or vertical gradient filling.
        - `true` : Horizontal gradient filling.
        - `false` : Vertical gradient filling.
    - `background.stroke` : Stroke color.
        - `null` : No stroke.
    - `background.strokeThickness` : Line width of stroke.
    - `background.cornerRadius` : Corner-radius of round rectangle.
    - `background.cornerIteration` : Iteration of corner-radius.
        - `null` : Draw corner-radius via arc directly.
        - A number : Draw corner-radius via lines
- `innerBounds` : Properties of inner-bounds.
    - `innerBounds.color` : Fill color.
        - `null` : No filling.
    - `innerBounds.color2` : Gradient fill color.
        - `null` : No gradient filling.
    - `innerBounds.horizontalGradient` : Horizontal or vertical gradient filling.
        - `true` : Horizontal gradient filling.
        - `false` : Vertical gradient filling.
    - `innerBounds.stroke` : Stroke color.
        - `null` : No stroke.
    - `innerBounds.strokeThickness` : Line width of stroke.
- `style` : Initial text-style.
    - `style.bold` : Bold
    - `style.italic` : Italic
    - `style.fontSize` : Font size
    - `style.fontFamily` : Font family
    - `style.color` : Fill color
    - `style.stroke` : Stroke color
    - `style.strokeThickness` : Line width of stroke.
    - `style.x` : x-offset.
    - `style.y` : y-offset.
- `text` : Content of text.

or

```javascript
var txt = scene.add.rexDynamicText(x, y, width, height, config);
```

or

```javascript
var txt = scene.add.rexDynamicText(x, y, config);
```

Add dynamictext from JSON

```javascript
var txt = scene.make.rexDynamicText({
    x: 0,
    y: 0,

    // origin: {x: 0.5, y: 0.5},
    // fill: null,
    
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyDynamicText extends DynamicText {
        constructor(scene, x, y, config) {
            super(scene, x, y, config);
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
    var txt = new MyDynamicText(scene, x, y, config);
    ```

### Clear content

```javascript
txt.setText();
```

### Append text

```javascript
txt.appendText(text);
```

or

```javascript
txt.appendText(text, 
    {
        // bold: false,
        // italic: false,
        // fontSize: '16px',
        // fontFamily: 'Courier',
        // color: '#fff',
        // stroke: '#fff',
        // strokeThickness: 0,
        // x: 0,
        // y: 0
    }
);
```

To overwrite some properties of text-style.

Each [character](dynamcitext.md#character-data) will be placed at position (0,0), without rotation. 
Uses [word-wrap](dynamcitext.md#word-wrap) method to rearrange position of characters. 

### Append image

```javascript
txt.appendImage(key, frame, {
    // width: undefined,
    // height: undefined,
    // scaleX: undefined,
    // scaleY: undefined
})
```

- `width` : Scaled-width. Aspect-ratio will be keep if no `height`, or `scaleY` is set.
- `height` : Scaled-height. Aspect-ratio will be keep if no `width`, or `scaleX` is set.

### Word-wrap

```javascript
var result = txt.runWordWrap({
    padding: {
        top: 0,
        bottom: 0
    },
    lineHeight: undefined,
    maxLines: undefined,
    wrapWidth: undefined,
    letterSpacing: 0,
    hAlign: 0,
    vAlign: 0,
});
```

- `padding.top` : Extra space above first line.
- `padding.bottom` : Extra space below last line.
- `lineHeight` : Line height. 
    - `undefined` : It will be set if `maxLines` and `fixedHeight` is given.
- `maxLines` : Lines number of this page. 
    - `0` : Wrapping whole content.
    - `undefined` : It will be set if `lineHeight` and `fixedHeight` is given.
- `wrapWidth` : Width of wrapping
- `letterSpacing` : Space between each character.
- `hAlign` : Horizontal alignment.
    - `0`, or `'left'` : Align to left bound.
    - `1`, or `'center'` : Align to center.
    - `2`, or `'right'` : Align to right bound.
- `vAlign` : Vertical alignment.
    - `0`, or `'top'` : Align to top bound.
    - `1`, or `'center'` : Align to center.
    - `2`, or `'bottom'` : Align to bottom bound.

#### Result

```javascript
{
    children: [],
    isLastPage: false
}
```

- `children` : Active [character](dynamcitext.md#character-data)/[image](dynamcitext.md#image-data) data in this page.
- `isLastPage` : 
    - `false` : Run `txt.runWordWrap(result)` to get next page of word-wrapping result.
    - `true` : No remainder of characters.

#### Wrap next page

```javascript
var result = txt.runWordWrap(prevResult);
```

- `prevResult` : Result of previous word-wraping.
- `result` : Current result of word-wraping.

### Character data

#### Properties

- Visible :
    - Get
        ```javascript
        var visible = char.visible;
        ```
    - Set
        ```javascript
        char.setVisible();
        // char.visible = true;
        ```
        or
        ```javascript
        char.setVisible(false);  // Set to invisible
        // char.visible = false;
        ```
- Position :
    - Get
        ```javascript
        var x = char.x;
        var y = char.y;
        ```
    - Set
        ```javascript
        char.setPosition(x, y);
        // char.x = x;
        // char.y = y;
        ```
- Angle :
    - Get
        ```javascript
        var degrees = char.angle;
        // var radians = char.rotation;
        ```
    - Set
        ```javascript
        char.setAngle(degrees);
        char.setRotation(radians);
        // char.angle = degrees;
        // char.rotation = radians;
        ```
- Scale
    - Get
        ```javascript
        var scaleX = char.scaleX;
        var scaleY = char.scaleY;
        ```
    - Set
        ```javascript
        char.setScale(scaleX, scaleY);
        // char.scaleX = scaleX;
        // char.scaleY = scaleY;
        ```
- Text-style : 
    - Get
        ```javascript
        var bold = char.style.bold;
        var italic = char.style.italic;
        var fontSize = char.style.fontSize;
        var fontFamily = char.style.fontFamily;
        var color = char.style.color;
        var stroke = char.style.stroke;
        var strokeThickness = char.style.strokeThickness;
        var xOffset = char.style.x;
        var yOffset = char.style.y;
        ```
    - Set
        ```javascript
        char.modifyStyle({
            // bold: false,
            // italic: false,
            // fontSize: '16px',
            // fontFamily: 'Courier',
            // color: '#fff',
            // stroke: '#fff',
            // strokeThickness: 0,
            // x: 0,
            // y: 0
        })
        ```

### Image data

- Visible :
    - Get
        ```javascript
        var visible = image.visible;
        ```
    - Set
        ```javascript
        image.setVisible();
        // image.visible = true;
        ```
        or
        ```javascript
        image.setVisible(false);  // Set to invisible
        // image.visible = false;
        ```
- Position :
    - Get
        ```javascript
        var x = image.x;
        var y = image.y;
        ```
    - Set
        ```javascript
        image.setPosition(x, y);
        // image.x = x;
        // image.y = y;
        ```
- Angle :
    - Get
        ```javascript
        var degrees = image.angle;
        // var radians = image.rotation;
        ```
    - Set
        ```javascript
        image.setAngle(degrees);
        image.setRotation(radians);
        // image.angle = degrees;
        // image.rotation = radians;
        ```
- Scale
    - Get
        ```javascript
        var scaleX = image.scaleX;
        var scaleY = image.scaleY;
        ```
    - Set
        ```javascript
        image.setScale(scaleX, scaleY);
        // image.scaleX = scaleX;
        // image.scaleY = scaleY;
        ```
- Texture : 
    - Get
        ```javascript
        var key = image.key;
        var frameName = image.frame;
        ```
    - Set
        ```javascript
        image.setTexture(key, frame);
        ```
- Size
    - Get
        ```javascript
        var width = image.width;
        var height = image.height;
        ```
    - Set
        ```javascript
        image.setWidth(width);
        // image.setWidth(width, true);  // Resize and keep aspect- ratio
        image.setHeight(height);
        // image.setHeight(height, true);  // Resize and keep aspect- ratio
        ```