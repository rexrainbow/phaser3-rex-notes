## Introduction

Drawing text on canvas, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add text object

```javascript
var txt = scene.add.text(x, y, 'hello');
// var txt = scene.add.text(x, y, 'hello', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
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
    align: 'left',  // 'left'|'center'|'right'|'justify'
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
    rtl: false,
    testString: '|MÉqgy',
    wordWrap: {
        width: null,
        callback: null,
        callbackScope: null,
        useAdvancedWrap: false
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
var txt = scene.make.text({
    x: 100,
    y: 100,
    padding: {
        left: 64,
        right: 16,
        top: 20,
        bottom: 40
        //x: 32,    // 32px padding on the left/right
        //y: 16     // 16px padding on the top/bottom
    },
    text: 'Text\nGame Object\nCreated from config',
    style: {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center',  // 'left'|'center'|'right'|'justify'
        backgroundColor: '#ff00ff'
    },
    add: true
});
```

### Custom class

- Define class
    ```javascript
    class MyText extends Phaser.GameObjects.Text {
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
    var txt = new MyText(scene, x, y, 'hello');
    ```

### Word wrap

- Wrap by width
    ```javascript
    var txt = scene.make.text({
        x: 400,
        y: 100,
        text: 'The sky above the port was the color of television, tuned to a dead channel.',
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 25px Arial',
            fill: 'white',
            wordWrap: { width: 300 }
        }
    });
    ```
- Wrap by callback
    ```javascript
    var txt = scene.make.text({
        x: 400,
        y: 300,
        text: 'The sky above the port was the color of television, tuned to a dead channel.',
        origin: 0.5,
        style: {
            font: 'bold 30px Arial',
            fill: 'white',
            wordWrap: { callback: wordWrap, scope: this }
        }
    });
    
    function wordWrap (text, textObject)
    {
        // First parameter will be the string that needs to be wrapped
        // Second parameter will be the Text game object that is being wrapped currently
    
        // This wrap just puts each word on a separate line, but you could inject your own
        // language-specific logic here.
        var words = text.split(' ');
    
        // You can return either an array of individual lines or a string with line breaks (e.g. \n) in
        // the correct place.
        return words;
    }
    ```
- Wrap width
    - Get
        ```javascript
        var width = txt.style.wordWrapWidth;
        var useAdvancedWrap = txt.style.wordWrapUseAdvanced;
        ```
    - Set
        ```javascript
        txt.setWordWrapWidth(width);
        // txt.setWordWrapWidth(width, useAdvancedWrap);
        ```
- Wrap callback
    - Get
        ```javascript
        var callback = txt.style.wordWrapCallback;
        var scope = txt.style.wordWrapCallbackScope;
        ```
    - Set
        ```javascript
        txt.setWordWrapCallback(callback, scope);
        ```

### Content

- Get
    ```javascript
    var content = txt.text;
    ```
- Set
    ```javascript
    txt.setText('world');
    // txt.text = 'world';
    ```

### Set style

```javascript
txt.setStyle(style);
txt.setFont(font);
txt.setFontFamily(family);
txt.setFontSize(size);
txt.setFontStyle(style);
```

### Set align

```javascript
txt.setAlign(align);
```

- `align` : `'left'`, `'center'`, `'right'`, `'justify'`

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