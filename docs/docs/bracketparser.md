## Introduction

A lite-weight delimiter parser.

- Author: Rex
- Object

## Live demoes

- [Basic](https://codepen.io/rexrainbow/pen/bGwYNoX)
- [Markup text](https://codepen.io/rexrainbow/pen/vYXWmMN)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bracket-parser)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexbracketparserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbracketparserplugin.min.js', true);
    ```
- Add parser object
    ```javascript
    var parser = scene.plugins.get('rexbracketparserplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BracketParserPlugin from 'phaser3-rex-plugins/plugins/bracketparser-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBracketParser',
                plugin: BracketParserPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add parser object
    ```javascript
    var parser = scene.plugins.get('rexBracketParser').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import BracketParser from 'phaser3-rex-plugins/plugins/bracketparser.js';
    ```
- Add parser object
    ```javascript
    var parser = new BracketParser(config);
    ```

### Create instance

```javascript
var parser = scene.plugins.get('rexBracketParser').add({
    // delimiters: '<>', // or ['<', '>']
    // valueConvert: true,
    // regex : {
    //     tag: undefined,
    //     value: undefined
    // },
});
```

- `delimiters`: String of left-delimiter and right-delimiter.
    - A single string with 2 characters. Default value is `'<>'`.
    - A array with 2 strings
- `valueConvert` : A callback to convert values.
    - `true` : Use defaule value converter. Values will be converted to *number* (include hex number string like *'0xFF'*), *boolean*, *null*, or *string*.
    - `false`, or `null` : Bypass string value.
    - Function object:
        ```javascript
        function(s) {
            return s;
        }
        ```
- `regex` :
    - `regex.tag` : Expression of parse tag. 
        - `undefined` : Default value is any character except left-delimiter, right-delimiter, and `'='`.
    - `regex.value` : Expression of parse value.
        - `undefined` : Default value is any character except left-delimiter, right-delimiter, and `'='`.    

#### Tag and content

Assume that left-delimiter and right-delimiter is `'<>'`

- Start-tag : `'<TAG>'`
    - Start-tag with a single value : `'<TAG=value>'`
        - `value` : If `valueConvert` is `true`,
            - Number
            - Boolean
            - null
            - String
    - Start-tag with array values, separated via `','` : `'<TAG=value0,value1,value2>'`
- End-tag : `'<\TAG>'`
- Content : Any string outside of tag-start, or tag-end.

### Start parsing

```javascript
parser.start(text);
```

These [events](bracketparser.md#events) will be emitted under this method.

### Pause

- Pause
    ```javascript
    parser.pause();
    ```
- Pause until event
    ```javascript
    parser.pauseUntilEvent(eventEmitter, eventName);
    ```
    - Will invoke 
        ```javascript
        eventEmitter.once(eventName, function() {
            parser.next();
        })
        ```

Invoke this method during tag-start,tag-end, or content events to suspend parsing.

### Resume

```javascript
parser.next();
```

### Skip any-tag-start/any-tag-end event

```javascript
parser.skipEvent();
```

When getting a tag-start, or a tag-end event, parser will emitts 

- Start-tag : `'+TAG'`, then `'+'`
- End-tag : `'-TAG'`, then `'-'`

Invoke this medthod under `'+TAG'`, or `'-TAG'` event to skip `'+'`, or `'-'` event.

### Status

- Is parsing
    ```javascript
    var isRunning = parser.isRunning;
    ```
    - `true` : Has remainder characters
    - `false` : After parsing last character
- Is paused
    ```javascript
    var isPaused = parser.isPaused;
    ```

### Events

#### Tags/Content

- Get a specific tag-start
    - Start-tag with a single value : `'<TAG=value>'`
        ```javascript
        parser.on('+' + TagName, function(value){ /* ... */ });
        ```
    - Start-tag with array values, separated via `','` : `'<TAG=value0,value1,value2>'`
        ```javascript
        parser.on('+' + TagName, function(value0, value1, value2){ /* ... */ });
        ```
- Get any-tag-start
    - Start-tag with a single value : `'<TAG=value>'`
        ```javascript
        parser.on('+', function(tagName, value){ /* ... */ });
        ```
    - Start-tag with array values, separated via `','` : `'<TAG=value0,value1,value2>'`
        ```javascript
        parser.on('+', function(tagName, value0, value1, value2){ /* ... */ });
        ```
- Get a specific tag-end
    ```javascript
    parser.on('-' + TagName, function(){ /* ... */ });
    ```
- Get a content
    ```javascript
    parser.on('content', function(content){ /* ... */ });
    ```
    - Previous tag-start : `parser.lastTagStart`
- Get any-tag-end
    ```javascript
    parser.on('-', function(tagName){ /* ... */ });
    ```
    - Previous tag-start : `parser.lastTagStart`
    - Previous Content : `parser.lastContent`

#### Control flow

- Parsing start
    ```javascript
    parser.on('start', function(){ /* ... */ });
    ```
- Parsing end
    ```javascript
    parser.on('complete', function(){ /* ... */ });
    ```
- On pause
    ```javascript
    parser.on('pause', function(){ /* ... */ });
    ```
- On resume
    ```javascript
    parser.on('resume', function(){ /* ... */ });
    ```