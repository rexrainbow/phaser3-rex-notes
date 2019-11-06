## Introduction

Drawing text with [BBCode](https://en.wikipedia.org/wiki/BBCode) protocol.

- Author: Rex
- Game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/bbcodetext-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexbbcodetextplugin.min.js)

[Class](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/bbcodetext.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bbcodetext)

### BBCode

- Bold : `[b]text[/b]`
- Italic : `[i]text[/i]`
- Color : `[color=red]text[/color]`
- Size : `[size=18]text[/size]`
- Stroke : `[stroke]text[/stroke]`
    - Stroke with color setting : `[stroke=red]text[/stroke]`
- Shadow : `[shadow]text[/shadow]`
- Underline : `[u]text[/u]`
    - Underline with color setting : `[u=red]text[/u]`
- Image : `[img=imgKey]`
- Hit area of words : `[area=key]text[/area]`

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexBBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add text object

```javascript
var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello');
// var txt = scene.add.rexBBCodeText(x, y, '[b]h[/b]ello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
```

Default style

```javascript
{
    fontFamily: 'Courier',
    fontSize: '16px',
    fontStyle: '',
    backgroundColor: null,
    color: '#fff',
    stroke: '#fff',
    strokeThickness: 0,
    shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#000',
        blur: 0,
        stroke: false,
        fill: false
    },
    underline: {
        color: '#000',
        thinkness: 0,
        offset: 0
    },
    // align: 'left',  // Equal to halign
    halign: 'left', // 'left'|'center'|'right'
    valign: 'top',  // 'top'|'center'|'bottom'
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    maxLines: 0,
    lineSpacing: 0,
    fixedWidth: 0,
    fixedHeight: 0,
    lineSpacing: 0,
    testString: '|MÉqgy',
    wrap: {
        mode: 'none'     // 0|'none'|1|'word'|2|'char'|'character'
        width: null
    },
    metrics: false
    // metrics: {
    //     ascent: 0,
    //     descent: 0,
    //     fontSize: 0
    // }    
    // resolution: 1
}
```

Add text from JSON

```javascript
var txt = scene.make.rexBBCodeText({
    x: 0,
    y: 0,
    padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
        //x: 32,    // 32px padding on the left/right
        //y: 16     // 16px padding on the top/bottom
    },
    text: 'Text\nGame Object\nCreated from config',
    style: {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#ff00ff'
    },
    add: true
});
```

- Alignment
    - `halign`, or `align` : Horizontal alignment.
        - `left`, `center`, `right`
    - `valign` : Vertical alignment.
        - `top`, `center`, `bottom`

### Custom class

- Define class
    ```javascript
    class MyText extends BBCodeText {
        constructor(scene, x, y, text, style) {
            super(scene, x, y, text, style);
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
    var txt = new MyText(scene, x, y, '[b]h[/b]ello');
    ```

### Wrap

- Wrap by word or character.
    ```javascript
    var txt = scene.make.text({
        x: 400,
        y: 100,
        text: 'The sky above the port was the color of television, tuned to a dead channel.',
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 25px Arial',
            fill: 'white',
            wrap: {
                mode: 'word'     // 0|'none'|1|'word'|2|'char'|'character'
                width: 300
            }
        }
    });
    ```
- Wrap mode
    - Get
        ```javascript
        var mode = txt.style.wrapMode;
        ```
    - Set
        ```javascript
        txt.setWrapMode(mode);
        ```
        - `'none'`, or `0` : No wrap
        - `'word'`, or `1` : Word wrap
        - `'character'`, or `2` : Character wrap
- Wrap width
    - Get
        ```javascript
        var width = txt.style.wrapWidth;
        ```
    - Set
        ```javascript
        txt.setWrapWidth(width);
        ```

### Content

- Get source text
    ```javascript
    var curContent = txt.text;
    ```
- Get plain text
    ```javascript
    var plainText = txt.getPlainText();
    ```
- Set
    ```javascript
    txt.setText('[b]h[/b]ello');
    // txt.text = '[b]h[/b]ello';
    ```

### Set style

```javascript
txt.setStyle(style);
txt.setFont(font);  // font: {fontFamily, fontSize, fontStyle}
txt.setFontFamily(family);
txt.setFontSize(size);
txt.setFontStyle(style);
```

### Color

- Text color
    - Get
        ```javascript
        var color = txt.style.color;
        ```
    - Set
        ```javascript
        txt.setColor(color);
        ```
        or
        ```javascript
        txt.setFill(color);
        ```
- Stroke color, thickness
    - Get
        ```javascript
        var color = txt.style.stroke;
        var thickness = txt.style.strokeThickness;
        ```
    - Set
        ```javascript
        txt.setStroke(color, thickness);
        ```
    - Clear
        ```javascript
        txt.setStroke();
        ```
- Underline color, thickness
    - Get
        ```javascript
        var color = txt.style.underlineColor;
        var thickness = txt.style.underlineThickness;
        var offset = txt.style.underlineOffset;
        ```
    - Set
        ```javascript
        txt.setUnderline(color, thinkness, ofset);
        txt.setUnderlineColor(color);
        txt.setUnderlineThinkness(thinkness);
        txt.setUnderlineOffset(ofset);
        ```
- Background color
    - Get
        ```javascript
        var color = txt.style.backgroundColor;
        ```
    - Set
        ```javascript
        txt.setBackgroundColor(color);
        ```
- Shadow
    - Get
        ```javascript
        var color = txt.style.shadowColor;
        var offsetX = txt.style.shadowOffsetX;
        var offsetY = txt.style.shadowOffsetY;
        var blur = txt.style.shadowBlur;
        var stroke = txt.style.shadowStroke;
        var enabled = txt.style.shadowFill;
        ```
    - Set
        ```javascript
        txt.setShadow(x, y, color, blur, shadowStroke, shadowFill);
        txt.setShadowOffset(x, y);
        txt.setShadowColor(color);
        txt.setShadowBlur(blur);
        txt.setShadowStroke(enabled);
        txt.setShadowFill(enabled);
        ```

### Image

- Uses texture key as image key by default.
- Add image render information
    ```javascript
    txt.addImage(imgKey, {
        key: textureKey,
        frame: frameName,
        width: undefined,
        height: undefined,
        y: 0,
        left: 0,
        right: 0
    });
    ```
    - `imgKey` : Image key used in text content, i.e. `[img=imgKey]`.
    - `key` : Texture key.
    - `frame` : Frame name.
    - `width` : Render width, set `undefined` to use the cut width of frame.
    - `height` : Render height, set `undefined` to use the cut height of frame.
    - `y` : Extra offset y.
    - `left` : Left padding space.
    - `Right` : Right padding space.
- Add some image render informations
    ```javascript
    txt.addImage(data);
    ```
    - `data` : `{imgKey, config}`

### Hit area of words

#### Hitting events

- Pointer down
    ```javascript
    txt.on('areadown', function(key, pointer, localX, localY){

    }, scope)
    ```
    or
    ```javascript
    txt.on('areadown-' + key, function(pointer, localX, localY){

    }, scope)
    ```
- Pointer up
    ```javascript
    txt.on('areaup', function(key, pointer, localX, localY){

    }, scope)
    ```
    or
    ```javascript
    txt.on('areaup-' + key, function(pointer, localX, localY){

    }, scope)
    ```

#### Draw hit-areas

```javascript
txt.drawAreaBounds(graphics, color);
```

- `graphics` : [Graphics game object](graphics.md)
- `color` : Default value is `0xffffff`

### Line spacing

This value is *added* to the height of the font when calculating the overall line height.

- Get
   ```javascript
   var lineSpacing = txt.style.lineSpacing;
   ```
- Set
   ```javascript
   txt.setLineSpacing(value);
   ```

### Padding

- Get
    ```javascript
    var left = txt.padding.left;
    var top = txt.padding.top;
    var right = txt.padding.right;
    var bottom = txt.padding.bottom;
    ```
- Set
    ```javascript
    txt.setPadding(left, top, right, bottom);
    // txt.setPadding(padding); // padding: {left, top, right, bottom}
    ```

### Max lines

- Get
    ```javascript
    var maxLines = txt.style.maxLines;
    ```
- Set
    ```javascript
    txt.setMaxLines(max);
    ```

### Fixed size

- Get
    ```javascript
    var width = txt.style.fixedWidth;
    var height = txt.style.fixedHeight;
    ```
- Set
    ```javascript
    txt.setFixedSize(width, height);
    ```