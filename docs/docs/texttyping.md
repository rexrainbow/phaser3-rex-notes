## Introduction

Typing text on [text object](text.md), [bbcode text object](bbcodetext.md), or [tag text boject](tagtext.md).

- Author: Rex
- Behavior of text object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/texttyping-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rextexttypingplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/texttyping)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexTextTyping from './plugins/texttyping.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import TextTypingPlugin from './plugins/texttyping-plugin.js';

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

### Create instance

```javascript
var typing = scene.plugins.get('rexTextTyping').add(txt, {
    //speed: 333,       // typing speed in ms
    //typeMode: 0,      //0|'left-to-right'|1|'right-to-left'|2|'middle-to-sides'|3|'sides-to-middle'
    //setTextCallback: function(text, isLastChar, insertIdx){ return text; }  // callback before set-text
    //setTextCallbackScope: null
});
```

Configuration

- `speed` : Typing speed in ms.
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
typing.start('ABCDEFG');
// typing.start('ABCDEFG', 333);  // speed in ms
```

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