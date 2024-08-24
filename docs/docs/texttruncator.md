## Introduction

Constraints text game object size by truncating text with padding symbol on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text object](tagtext.md).

- Author: Rex
- Behavior of text object

## Live demos

- [Truncate text](https://codepen.io/rexrainbow/pen/bGPMjKx)
- [Truncate BBCodeText](https://codepen.io/rexrainbow/pen/eYwrjKO)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/texttruncator)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextexttruncatorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttruncatorplugin.min.js', true);
    ```
- Add text-truncator behavior
    ```javascript
    var truncator = scene.plugins.get('rextexttruncatorplugin').add(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextTruncatorPlugin from 'phaser3-rex-plugins/plugins/texttruncator-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextTruncator',
                plugin: TextTruncatorPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add text-truncator behavior
    ```javascript
    var truncator = scene.plugins.get('rexTextTruncator').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TextTruncator from 'phaser3-rex-plugins/plugins/texttruncator.js';
    ```
- Add text-truncator behavior
    ```javascript
    var truncator = new TextTruncator(textGameObject, config);
    ```

### Create instance

```javascript
var truncator = scene.plugins.get('rexTextTruncator').add(textGameObject, {
    // enable: true,
    // symbol: '...',
    // maxWidth: undefined,
    // maxHeight: undefined,
    // text: '',              // content in string or array
});
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), or [bitmap text object](bitmaptext.md)
- `enable` :
    - `true` : Truncate string with padding symbol. Default value.
    - `false` : Display all text.
- `symbol` : Padding symbol. Default value is `'...'`
- `maxWidth` : Maximum width of game object, for single-line mode.
    - `undefined` : Use `fixedWidth` as maximum width.
- `maxHeight` : Maximum height of game object, for multiple-line mode.
    - `undefined` : Use `fixedHeight` as maximum height.
- `text` : content in string or array, optional

### Truncation modes

- Single-line mode :
    - `maxHeight` or `fixedHeight` are not given, or `0`
    - Have `maxWidth` or `fixedWidth`
- Multiple-line mode
    - Have `fixedWidth` or `wordWrap.width` (wrap-width)
    - Have `maxHeight` or `fixedHeight`

### Set content

- Set content
    ```javascript
    truncator.setText(content);
    ```
    - `content` : String, number, or string array.
- Append content
    ```javascript
    truncator.appendText(content);
    ```
    - `content` : String, number, or string array.

Will update displaying content.


- Get content back
    ```javascript
    var text = truncator.text;
    ```

### Update display content

```javascript
truncator.updateText();
```

### Set paddding symbol

```javascript
truncator.setSymbol(symbol).updateText();
```

### Set max size

- Max width
    ```javascript
    truncator.setMaxWidth(width).updateText();
    ```
- Max height
    ```javascript
    truncator.setMaxHeight(height).updateText();
    ```
