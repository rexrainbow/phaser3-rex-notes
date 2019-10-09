## Introduction

Load web font by [google webfont loader](https://github.com/typekit/webfontloader) in payload or preload stage.

- Author: Rex
- Custom File of loader

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/webfontloader-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexwebfontloaderplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/webfontloader)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

or install it in previous scene (i.e. a preload scene).

!!! warning
    The best way of installing this plugin is to load it in game config. 

    This custom file loader won't be added into loader of current scene after loader is created (i.e. loading plugin using `this.load.plugin(...)`, or loading in payload of scene)

### Load webfont

In preload stage:

```javascript
this.load.rexWebFont({
    google: {
        families: ['Bangers']
    },
    // testString: undefined,
    // testInterval: 20,
});
```

- [`testString`](webfontloader.md#test-string) : To test if the font is loaded completed or not.
    - `undefined` : No testing. Default value.
    - A string : A test string for all fonts
    - An object, `{fontFamily: testString}` : Test string for a specific font family.
- `testInterval` : Retry interval.

or load font in pack

```javascript
var sceneConfig = {
    key: '...',
    pack: {
        files: [{
                type: 'rexWebFont',
                key: 'webfont',
                config: {
                    google: {
                        families: ['Bangers']
                    },
                    // testString: undefined,
                    // testInterval: 20,
                }
            }
        ]
    }
};
```

Configuration of loading fonts

- [Google webfont](https://github.com/typekit/webfontloader#google)
    ```javascript
    WebFontConfig = {
        google: {
            families: ['Droid Sans', 'Droid Serif:bold']
        }
    };
    ```
- [Custom font](https://github.com/typekit/webfontloader#custom)
    ```javascript
    WebFontConfig = {
        custom: {
            families: ['My Font', 'My Other Font:n4,i4,n7'],
            urls: ['/fonts.css']
        }
    };
    ```
    and `fonts.css`
    ```css
    @font-face {
        font-family: 'My Font';
        src: ...;
    }
    @font-face {
        font-family: 'My Other Font';
        font-style: normal;
        font-weight: normal; /* or 400 */
        src: ...;
    }
    @font-face {
        font-family: 'My Other Font';
        font-style: italic;
        font-weight: normal; /* or 400 */
        src: ...;
    }
    @font-face {
        font-family: 'My Other Font';
        font-style: normal;
        font-weight: bold; /* or 700 */
        src: ...;
    }
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

### Test string

Add string parameter `testString` into config, to test if the font is loaded completed or not.

1. Fill `0` within an internal canvas.
1. Draw `testString`.
1. Check if any pixel has non-zero value.