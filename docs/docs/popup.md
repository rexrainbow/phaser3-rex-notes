## Introduction

Scale up (i.e. ease scaleX, scaleY from `0` to `1`) game object.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/scale-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexscaleplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/scale/scaledown-destroy.js)

- Pop up width and height
    ```javascript
    popUp(gameObject, duration);
    // popUp(gameObject, duration, undefined, ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
- Pop up width only
    ```javascript
    popUp(gameObject, duration, 'x');
    // popUp(gameObject, duration, 'x', ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.
- Pop up height only
    ```javascript
    popUp(gameObject, duration, 'y');
    // popUp(gameObject, duration, 'y', ease);
    ```
    - `ease` : [Ease function](tween.md/#ease-equations), default is `'Cubic'`.