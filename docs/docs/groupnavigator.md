## Introduction

Navigate between existing game objects, focus on next/previous/next-row/previous row game object.

- Author: Rex
- Member of scene

## Live demos

- [1D targets](https://codepen.io/rexrainbow/pen/OJerJxK)
- [2D targets](https://codepen.io/rexrainbow/pen/jOjXZMv)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/groupnavigator)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexgroupnavigatorplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgroupnavigatorplugin.min.js', true);
    ```
- Create navigator
    ```javascript
    var navigator = scene.plugins.get('rexgroupnavigatorplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GroupNavigatorPlugin from 'phaser3-rex-plugins/plugins/groupnavigator-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexGroupNavigator',
                plugin: GroupNavigatorPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Create navigator
    ```javascript
    var navigator = scene.plugins.get('rexGroupNavigator').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import GroupNavigator from 'phaser3-rex-plugins/plugins/groupnavigator.js';
    ```
- Create navigator
    ```javascript
    var navigator = new GroupNavigator(config);
    ```

### Create navigator

```javascript
var navigator = scene.plugins.get('rexGroupNavigator').add({
    // enable: true,

    targets: gameObjects,
    // columns: undefined,

    // getFocusEnableCallback(gameObject) { 
    //     return focusEnable;
    // }
    // focusEnableDataKey: undefined,
    // focusEnableKey: undefined
});
```

- `enable` :
    - `true` : Can navigate between game objects. Default behavior.
    - `false` : Ignore navigation actions (`navigator.next()`, `navigator.previous()`, `navigator.nextRow()`, `navigator.previousRow()`) 
- `targe1ts` : 
    - 1D array of game objects for `navigator.next()`, or `navigator.previous()`
    - 2D array of game objects for `navigator.next()`, `navigator.previous()`, `navigator.nextRow()`, `navigator.previousRow()`
- `columns` : A number : Convert 1D `targets` array to 2D array, each row has `columns` game objects.
    - `undefined` : Ignore this parameter. Default behavior.
- Focus enable : Get focus enable of game object by one of these parameter.
    - `getFocusEnableCallback` : A callback to return focus enable of this game object.
        ```javascript
        function(gameObject) {
            return focusEnable;
        }
        ```
    - `focusEnableDataKey` : Get focus enable from private data of this game object.
    - `focusEnableKey` : Get focus enable from property of this game object.
    - Focus enable is always `true` if none of these parameter is given. Default behavior.

### Enable

- Get
    ```javascript
    var enable = navigator.enable;
    ```
- Set
    ```javascript
    navigator.setEnable(enable);
    ```

### Navigate

- Focus on next/previous game object, for 1D and 2D array of `targets`
    ```javascript
    navigator.next();
    ```
    ```javascript
    navigator.previous();
    ```
    Will fire `blur` and `focus` events
- Focus on next row/previous row game object, for 2D array of `targets`
    ```javascript
    navigator.nextRow();
    ```
    ```javascript
    navigator.previousRow();
    ```
    Will fire `blur` and `focus` events
- Focus on first/last game object
    ```javascript
    navigator.first();
    ```
    ```javascript
    navigator.last();
    ```
    Will fire `blur` and `focus` events

### Current focused game object

- Get current focused game object
    ```javascript
    var gameObject = navigator.getFocusedTarget();
    // var gameObject = navigator.focusedTarget;
    ```
- Focus on game object. Do nothing if that game object is not focus-enable.
    ```javascript
    navigator.focus(gameObject);
    ```
    Will fire `blur` and `focus` events.
- Blur
    ```javascript
    navigator.blur();
    ```
    Will fire `blur` event.

### Target game objects

- Get
    ```javascript
    var gameObjects = navigator.targets;
    ```
    - `gameObjects` : 1D/2D array of game objects
- Set
    ```javascript
    navigator.setTargets(targets);
    // navigator.setTargets(targets, columns);
    ```
- Modify
    ```javascript
    navigator.targets.push(newGameObject);    
    ```
    ```javascript
    Phaser.Utils.Array.AddAt(navigator.targets, newGameObject, index);
    ```
    ```javascript
    Phaser.Utils.Array.Remove(navigator.targets, gameObject);
    ```

### Events

- On focus
    ```javascript
    navigator.on('focus', function(gameObject){

    })
    ```
- On blur
    ```javascript
    navigator.on('blur', function(gameObject){
        
    })
    ```