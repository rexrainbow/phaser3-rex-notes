## Introduction

Drop down game object below another target game object.

- Author: Rex
- Behavior of game object

## Live demos

- [Drop-down](https://codepen.io/rexrainbow/pen/wvXpJdm)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dropdown)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexdropdownplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropdownplugin.min.js', true);
    ```
- Add drop-down behavior
    ```javascript
    var dropDown = scene.plugins.get('rexdropdownplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Add drop-down behavior
    ```javascript
    var dropDown = scene.plugins.get('rexDropDown').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import DropDownBehavoir from 'phaser3-rex-plugins/plugins/dropdown.js';
    ```
- Add drop-down behavior
    ```javascript
    var dropDown = new DropDownBehavoir(gameObject, config);
    ```

### Create instance

```javascript
var dropDown = scene.plugins.get('rexDropDown').add(gameObject, {        
    // expandDirection: 0,
    // alignTargetX: 
    // alignTargetY: 
    // alignOffsetX: 
    // alignOffsetY: 
    // bounds:

    // When to close dropdown dialog?
    // touchOutsideClose: false,
    // anyTouchClose: false,

    // duration: {
    //     in: 200,
    //     out: 200
    // }

    // transitIn: undefined,
    // transitOut: undefined,

    // destroy: true
});
```

- `expandDirection` : Expand direction
    - `0`, `'down'` : Expand game object down. i.e. game object will put below target game object. Defatut behavior.
    - `1`, `'up'` : Expand game object up. i.e. game object will put above target game object.
- `alignTargetX` : Align left side game object to left side of target game object
- `alignTargetY` : **Required parameter**
    - Align top side game object to bottom side of target game object, if `expandDirection` is `0`(`'down'`).
    - Align bottom side game object to top side of target game object, if `expandDirection` is `1`(`'up'`).
- `alignOffsetX`, `alignOffsetY` : Extra position offset. Default value ares `0`, `0`.
- `bounds` : Put game object below target game object if *bottom of game object* is inside bounds ([Rectangle](geom-rectangle.md))
    - `undefined` : Use viewport as bounds
    - [Rectangle](geom-rectangle.md)
- `touchOutsideClose` : Set to `true` to close dropdown dialog when clicking out side of gameObject. 
    - Default value is `false`.  Will be set to `false` if `anyTouchClose` is set to `true`.
- `anyTouchClose` : Set to `true` to close dropdown dialog when any clicking. 
    - Default value is `false`.
- `duration` : Duration of transition-in, hold, trantion-out.
    - `duration.in` : Duration of transition-in (open dialog).
        - `0` : No transition, open dialog immediately.
    - `duration.out` : Duration of transition-out (close dialog).
        - `0` : No transition, close dialog immediately.
- `transitIn` : Tween behavior of opening dialog. Default behavior is scale up the height of game object.       
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `transitOut` : Tween behavior of closing dialog. Default behavior is scale down the height of game 
    - Custom callback
        ```javascript
        function(gameObject, duration) {

        }
        ```
- `destroy`
    - `true` : Destroy dialog when closing completed. Default behavior.
    - `fasle` : Don't destroy dialog.

### Close

```javascript
dropDown.requestClose();
// dropDown.requestClose();
```

### Events

- On opened dialog
    ```javascript
    dropDown.on('open', function(gameObject, dropdown) {
    })
    ```
- On closed dialog
    ```javascript
    dropDown.on('close', function(closeEventData) {
    })
    ```
