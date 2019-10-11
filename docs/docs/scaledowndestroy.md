## Introduction

Scale down (i.e. ease scaleX, scaleY to `0`) game object then destroy it.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/scale-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexscaleplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/scale/scaledown-destroy.js)

### Scale down

- Scale down width and height
    ```javascript
    var scale = scaleDownDestroy(gameObject, duration);
    ```
- Scale down width only
    ```javascript
    var scale = scaleDownDestroy(gameObject, duration, 'x');
    ```
- Scale down height only
    ```javascript
    var scale = scaleDownDestroy(gameObject, duration, 'y');
    ```

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    scale.on('complete', function(scale, gameObject){

    }, scope);
    ```