## Introduction

Typing text on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

- Author: Rex
- Behavior of text object

## Live demos

- [BBCode text + page + typing](https://codepen.io/rexrainbow/pen/yjZveb)
- [Text wrap enable](https://codepen.io/rexrainbow/pen/abwVwNX)
- [TextBox](https://codepen.io/rexrainbow/pen/MzGoJv), see [text-box](ui-textbox).

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/texttyping)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
    ```
- Add typing behavior
    ```javascript
    var typing = scene.plugins.get('rextexttypingplugin').add(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextTyping',
                plugin: TextTypingPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add typing behavior
    ```javascript
    var typing = scene.plugins.get('rexTextTyping').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TextTyping from 'phaser3-rex-plugins/plugins/texttyping.js';
    ```
- Add typing behavior
    ```javascript
    var typing = new TextTyping(textGameObject, config);

### Create instance

```javascript
var typing = scene.plugins.get('rexTextTyping').add(textGameObject, {
    // wrap: false,
    // speed: 333,       // typing speed in ms
    // typeMode: 0,      //0|'left-to-right'|1|'right-to-left'|2|'middle-to-sides'|3|'sides-to-middle'
    // setTextCallback: function(text, isLastChar, insertIdx){ return text; }  // callback before set-text
    // setTextCallbackScope: null,   
});
```

- `textObject` : [Text object](text.md), [bbcode text object](bbcodetext.md), [tag text boject](tagtext.md), or [bitmap text object](bitmaptext.md)
- `wrap` : 
    - `false` : Don't insert `\n`, default behavior.
    - `true` : Insert `\n` to wrap content according to style of text, to prevent typing jittering.
- `speed` : Typing speed in ms, default value is `333`.
- `typeMode` :
    - `'left-to-right'`, or `0` : Typing characters from left to right.
    - `'right-to-left'`, or `1` : Typing characters from right to left.
    - `'middle-to-sides'`, or `2` : Typing characters from middle to sides.
    - `'sides-to-middle'`, or `3` : Typing characters from sides to middle.
- `setTextCallback` : Callback befor set-text, to decorate display text.
    ```javascript
    function(text, isLastChar, insertIdx) { return text; }
    ```
- `setTextCallbackScope` : Scope of setTextCallback function.

### Start typing

```javascript
typing.start(text);
// typing.start(text, speed); 
```

- `text` : Typing content string.
- `speed` : Typing speed in ms.

#### Typing more text

```javascript
typing.appendText(text);
```

### Stop typing

```javascript
typing.stop();
// typing.stop(true);;  // stop and show all text
```

### Pause/Resume typing

- Pause typing
    ```javascript
    typing.pause();
    ```
- Resume typing
    ```javascript
    typing.resume();
    ```

### Set typing speed

```javascript
typing.setTypeSpeed(speed);  // speed in ms
// typing.speed = speed;
```

Set speed in `typing` event or setTextCallback to change typing speed of remaining text.

### Set typing mode

```javascript
typing.setTypeMode(mode);
```

- typeMode :
    - `'left-to-right'`, or `0` : typing characters from left to right.
    - `'right-to-left'`, or `1` : typing characters from right to left.
    - `'middle-to-sides'`, or `2` : typing characters from middle to sides, optional.
    - `'sides-to-middle'`, or `3` : typing characters from sides to middle.

### Events

- On typing :
    ```javascript
    typing.on('type', function(){});
    ```
- On typing completed :
    ```javascript
    typing.on('complete', function(typing, txt){});
    ```

### Status

- Is typing
    ```javascript
    var isTyping = typing.isTyping;
    ```