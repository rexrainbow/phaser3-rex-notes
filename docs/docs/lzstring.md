## Introduction

Compress string using LZ-based compression algorithm. [Reference](https://github.com/pieroxy/lz-string)

- Author: Rex
- Member of scene

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/lzstring/LZStringPlugin.js)

## Usage

### Create instance

```javascript
var lzstring = new LZStringPlugin(scene, {
    //encoding: 0,    // 0|'none'|1|'base64'|2|'utf16'|3|'uri'
});
```

Properties

- encoding : 
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