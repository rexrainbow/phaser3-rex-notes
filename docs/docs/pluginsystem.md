## Introduction

Plugin system, built-in system of phaser.

- Author: Richard Davey

## Usage

### Global plugin

#### Load plugin

- Load plugin before any scene start  
    In [game configuration](game.md#configuration)
    ```javascript
    // import pluginKlass from '...';
    var config = {
        // ...
        plugins: {
            global: [
                {
                    key: key,
                    plugin: pluginKlass,
                    start: true
                    // mapping: memberName  // member name in each scene instance, optional
                },
                // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - `pluginKlass` : Class instance
- Load plugin in scene
    ```javascript
    scene.load.plugin(key, url, true);
    ```
    - `url` : File url or class instance.

#### Get instance

```javascript
var pluginInst = scene.plugins.get(key);
```

### Scene plugin

#### Load plugin

- Load plugin before any scene start  
    In [game configuration](game.md#configuration)
    ```javascript
    // import pluginKlass from '...';
    var config = {
        // ...
        plugins: {
            scene: [
                {
                    key: key,
                    plugin: pluginKlass,
                    mapping: sceneKey     // member name in each scene instance
                },
                // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - `pluginKlass` : Class instance
- Load plugin in scene
    ```javascript
    scene.load.scenePlugin(key, url, systemKey, sceneKey);
    ```
    - `url` : File url or class instance.

#### Get instance

```javascript
var pluginInst = scene[sceneKey];
```

### Plugin cache

- Has custom plugin
    ```javascript
    var hasPlugin = Phaser.Plugins.PluginCache.hasCustom(key);
    ```