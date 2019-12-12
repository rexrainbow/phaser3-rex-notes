## Introduction

Load script tag in preload stage.

- Author: Rex
- Custom File of loader

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/scripttagloader-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexscripttagloaderplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/scripttagloader)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'ScriptTagLoader',
            plugin: ScriptTagLoaderPlugin,
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

### Load script tag

In preload stage:

```javascript
this.load.rexScriptTag(url);
```

### Compare with script loader

- Built-in script loader uses AJAX to load text as script, which might have CORS issue.
- Script tag loader uses `<script>` tag to load script.