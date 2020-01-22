## Introduction

Compress string using LZ-based compression algorithm. [Reference](https://github.com/pieroxy/lz-string)

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/lzstring)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlzstringplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlzstringplugin.min.js', true);
    ```
- Add lz-string object
    ```javascript
    var lzstring = scene.plugins.get('rexlzstringplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import LZStringPlugin from 'phaser3-rex-plugins/plugins/lzstring-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexLZString',
                plugin: LZStringPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add lz-string object
    ```javascript
    var lzstring = scene.plugins.get('rexLZString').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import LZString from 'phaser3-rex-plugins/plugins/lzstring.js';
    ```
- Add lz-string object
    ```javascript
    var lzstring = new LZString(config);
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