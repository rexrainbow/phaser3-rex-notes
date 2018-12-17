## Introduction

Restorable data manager, extends from [built-in data manager](datamanager.md).

- Author: Rex
- Member of scene

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/restorabledata-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexrestorabledataplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/restorabledata)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexRData from './plugins/restorabledata.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import RDataPlugin from './plugins/restorabledata-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexRData',
            plugin: RDataPlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Create instance

```javascript
var data = scene.plugins.get('rexRData').add(parent);
// var data = scene.plugins.get('rexRData').add(parent, eventEmitter);
```

- `parent` : The object (a scene, or a game object) that this DataManager belongs to.
- `eventEmitter` : The DataManager's [event emitter](eventemitter3.md).

### Get/set/remove value

See [built-in data manager](datamanager.md).

### Commit

Commit current data status into repository, and increase current version number.

```javascript
data.commit();
```

or

```javascript
data.commit(alias);
```

- `alias` : A version alias string.

### Restore

- Restore data status to a specific version.
    ```javascript
    data.restore(version);
    ```
    or
    ```javascript
    data.version = version;
    ```
    - `version` : Version number or version alias string.
- Rebuild data status from version `0` to a specific version.
    ```javascript
    data.restore(version, true);
    ```
    - `version` : Version number or version alias string.
- Reverse data status to last version.
    ```javascript
    data.restore();
    ```

### Version

- Get current version alias string
    ```javascript
    var version = data.versionAlias;
    ```
- Get all version alias strings
    ```javascript
    var aliases = data.versionAliases;
    ```
- Get current version number
    ```javascript
    var version = data.version;
    ```
- Get last version number
    ```javascript
    var version = data.lastVersion;
    ```

Version starts from `0` which has no data. Each `data.commit()` will increase this version number.

### Save/load status

- Get current status via JSON string
    ```javascript
    var s = JSON.stringify(data);
    ```
- Load status via JSON string
    ```javascript
    data.resetFromJSON(JSON.parse(s));
    ```