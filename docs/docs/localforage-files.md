## Introduction

Save JSON data, using [localforage](https://localforage.github.io/localForage/).

Each file contains header and content indexed by fileID.

- Author: Rex
- Member of scene

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/localforage-files)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexlocalforagefilesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexlocalforagefilesplugin.min.js', true);
    ```
- Add localforage-files object
    ```javascript
    var fileManager = scene.plugins.get('rexlocalforagefilesplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FilesPlugin from 'phaser3-rex-plugins/plugins/localforagefiles-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFiles',
                plugin: FilesPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add localforage-files object
    ```javascript
    var fileManager = scene.plugins.get('rexFiles').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Files from 'phaser3-rex-plugins/plugins/localforagefiles.js';
    ```
- Add localforage-files object
    ```javascript
    var fileManager = new Files(config);
    ```

### Create instance

```javascript
var fileManager = scene.plugins.get('rexFiles').add.files({
    // name: 'files',
    // zip: true
});
```

- `name` : Storage name.
- `zip` :
    - `true` : Save compressed stringify json data.
    - `false` : Save json data directly


### Save file

- Overwrite
    ```javascript
    fileManager.save(fileID, header, content);
    ```
    - `fileID` : Unique ID of this file.
    - `header` : Header data for indexing, a JSON object.
        - Reserve keys : `fileID`.
    - `content` : Content/body, a JSON object.
        - Reserve keys : `fileID`.
- Update
    ```javascript
    fileManager.save(fileID, header, content, true);
    ```

### Load headers

```javascript
fileManager.loadHeaders()
    .then(function(result) { 
        // var headers = result.headers;
    })
    .catch(function(result) {
        // var error = result.error;
    })
```

- `headers` : Get header by `headers[fileID]`, each header contains
    - `header.fileID` : Unique ID of this file.     

### Load file

```javascript
fileManager.load(fileID)
    .then(function(result) { 
        // var header = result.header;
        // var content = result.content;
        // var fileID = result.fileID;
    })
    .catch(function(result) {
        // var error = result.error;
        // var fileID = result.fileID;
    })
```

- `header`, `content` : Header/content of this file.
- `fileID` : Unique ID of this file.
- `userID` : User ID of file owner.