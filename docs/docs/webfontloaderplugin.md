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
this.load.webFont('webfont', {
    google: {
        families: ['Bangers']
    }
});
```

or

```javascript
this.load.webFont({
    google: {
        families: ['Bangers']
    }
});
```

or load font in pack

```javascript
var sceneConfig = {
    key: '...',
    pack: {
        files: [{
                type: 'webFont',
                key: 'webfont',
                config: {
                    google: {
                        families: ['Bangers']
                    }
                }
            }
        ]
    }
};
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
