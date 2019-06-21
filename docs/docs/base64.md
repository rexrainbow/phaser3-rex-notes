## Introduction

Decode a base64 string to an array buffer, or create a base64 string from an array buffer, built-in method of phaser.

- Author: Richard Davey

## Usage

### Base64 -> Array buffer

```javascript
var arrayBuffer = Phaser.Utils.Base64.Base64ToArrayBuffer(base64);
```

### Array buffer -> Base64

```javascript
var base64 = Phaser.Utils.Base64.ArrayBufferToBase64(arrayBuffer, mediaType);
```

- `mediaType` : An optional media type, i.e. `audio/ogg` or `image/jpeg`