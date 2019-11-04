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
    // var scale = scaleDownDestroy(gameObject, duration, undefined, ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Linear'`.
- Scale down width only
    ```javascript
    var scale = scaleDownDestroy(gameObject, duration, 'x');
    // var scale = scaleDownDestroy(gameObject, duration, 'x', ease);
    ```
- Scale down height only
    ```javascript
    var scale = scaleDownDestroy(gameObject, duration, 'y');
    // var scale = scaleDownDestroy(gameObject, duration, 'y', ease);
    ```

### Events

See [Events of tween task](tween.md#events)

- Scale completes or is stopped.
    ```javascript
    scale.on('complete', function(scale, gameObject){

    }, scope);
    ```