## Introduction

Load web font by [google webfont loader](https://github.com/typekit/webfontloader) in preload stage.

- Author: Rex
- Customize File of loader

## Source code

[Link](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/webfontloader/webFontLoaderPlugin.js)

## Usage

### Load webfont

In preload stage:

```javascript
this.load.webFont('bangers', {
    google: {
        families: ['Bangers']
    }
});
```

load webfont from object

```javascript
var obj = {
    key: 'bangers',
    config: {
        google: {
            families: ['Bangers']
        }
    }
};
this.load.webFont(obj);
```

### Events

- `fontactive` event

    ```javascript
    this.load.on('webfontactive', function(fileObj, familyName){});
    ```

- `fontinactive` event

    ```javascript
    this.load.on('webfontinactive', function(fileObj, familyName){});
    ```
