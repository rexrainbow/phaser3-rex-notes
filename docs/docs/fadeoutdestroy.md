## Introduction

Fade out game object then destroy it.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/fade-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexfadeplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/fade/fadeout-destroy.js)

### Fade-out

```javascript
var fade = fadeOutDestroy(gameObject, duration);
```

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    fade.on('complete', function(fade, gameObject){

    }, scope);
    ```