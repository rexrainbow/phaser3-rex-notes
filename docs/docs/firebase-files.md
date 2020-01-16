## Introduction

Save JSON data, using [firebase-firestore](https://firebase.google.com/docs/firestore/).

Each owner has several files, each file contains header and content indexed by fileID.

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-files)

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import FirebasePlugin from './plugins/firebase-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexFire',
            plugin: FirebasePlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Import SDK

*Firebase SDK dose not boundle into this plugin*

- Download SDK from [CDN](https://firebase.google.com/docs/web/setup/#libraries-cdn) via script tags.
    - Firebase core
    - Firebase-database
- Download SDK during preload stage.
    ```javascript
    scene.plugins.get('rexFire').preload(scene);    
    ```

### Create instance

1. Initialize firebase application
    ```javascript
    var rexFire = scene.plugins.get('rexFire').initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    });
    ```
2. Create leader board instance
    ```javascript
    var fileManager = rexFire.add.files({
        root: '',
        // userID: ''
    });
    ```
    - `root` : Collection name of these files.
    - `userID` : User ID of file owner.

### Save file

1. Set file owner.
    ```javascript
    fileManager.setOwner(userID);
    ```
    or
    ```javascript
    fileManager.setOwner({
        userID: userID
    });
    ```
    - `userID` : User ID of file owner.
1. Save header and content data.
    - Overwrite
        ```javascript
        fileManager.save(fileID, header, content);
        ```
        - `fileID` : Unique ID of this file.
        - `header` : Header data for indexing, a JSON object.
            - Reserve keys : `userID`, `fileID`, `type`, `contentDocID`. (i.e. don't use these keys)
        - `content` : Content/body, a JSON object.
            - Reserve keys : `userID`, `fileID`, `type`. (i.e. don't use these keys)
    - Update
        ```javascript
        fileManager.save(fileID, header, content, true);
        ```

### Load headers

1. Set file owner.
    ```javascript
    fileManager.setOwner(userID);
    ```
1. Load all headers of this file owner.
    ```javascript
    fileManager.loadHeaders()
        .then(function(result) { 
            // var headers = result.headers;
            // var userID = result.userID;
        })
        .catch(function(result) {
            // var error = result.error;
            // var userID = result.userID;
        })
    ```
    - `headers` : An array of header objects. Each header contains these key
        - `header.fileID` : Unique ID of this file.
        - `header.userID` : User ID of file owner.        

### Load file

1. Set file owner.
    ```javascript
    fileManager.setOwner(userID);
    ```
1. Load file.
    ```javascript
    fileManager.load(fileID)
        .then(function(result) { 
            // var header = result.header;
            // var content = result.content;
            // var fileID = result.fileID;
            // var userID = result.userID;
        })
        .catch(function(result) {
            // var error = result.error;
            // var fileID = result.fileID;
            // var userID = result.userID;
        })
    ```
    - `header`, `content` : Header/content of this file.
    - `fileID` : Unique ID of this file.
    - `userID` : User ID of file owner.