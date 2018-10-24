## Introduction

Await custom task in preload stage.

- Author: Rex
- Custom File of loader

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/awaitloader-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexawaitloaderplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/awaitloader)

### Install plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
var config = {
    // ...
    plugins: {
        global: [{
            key: 'AwaitLoader',
            plugin: AwaitLoaderPlugin,
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

### Await task

In preload stage:

```javascript
var callback = function(successCallback, failureCallback) {
    // successCallback();
};
this.load.rexAwait(key, {
    callback: callback,
    // scope: scope
});
```

1. This plugin runs `callback`  to start custom task.
1. Calls `successCallback` when custom task completed, or `failureCallback` if error.