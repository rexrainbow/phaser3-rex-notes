## Introduction

Compress string using LZ-based compression algorithm. [Reference](https://github.com/pieroxy/lz-string)

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/lzstring-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexlzstringplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lzstring)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexXOR from './plugins/lzstring.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import LZString from './plugins/lzstring-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexLZString',
            plugin: LZString,
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
var lzstring = scene.plugins.get('rexLZString').add({
    // encoding: 'none'     // 'none'|0, 'base64'|1, 'utf16'|2, 'uri'|3
});
```

- `encoding` : 
    - `'none'`, or `0` : no encoding.
    - `'base64'`, or `1` : base64 encoding.
    - `'utf16'`, or `2` : UTF16 encoding.
    - `'uri'`, or `3` : URI encoding.

### Compression

```javascript
var compressionResult = lzstring.compress(src);
```

### Decompression

```javascript
var decompressionResult = lzstring.decompress(compressionResult);
```

### Set encoding

```javascript
lzstring.setEncoding(m);  // 0|'none'|1|'base64'|2|'utf16'|3|'uri'
```