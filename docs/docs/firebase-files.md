## Introduction

Save JSON data, using [firebase-firestore](https://firebase.google.com/docs/firestore/).

Each owner has several files, each file contains header and content indexed by fileID.

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-files)

### Install plugin

#### Load minify file

- [Add Firebase SDKs](https://firebase.google.com/docs/web/setup)
    ```html
    <body>
        <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
        <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
        <script src="/__/firebase/7.7.0/firebase-app.js"></script>
        <!-- Add Firebase products that you want to use -->
        <script src="/__/firebase/7.7.0/firebase-firestore.js"></script>
    </body>    
    ```
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfirebaseplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js', true);
    ```
- Initialize firebase application.
    ```javascript
    firebase.initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    })
    ```
- Add file-manager object
    ```javascript
    var fileManager = scene.plugins.get('rexfirebaseplugin').add.files(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- [Add Firebase SDKs](https://firebase.google.com/docs/web/setup)
    ```html
    <body>
        <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
        <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
        <script src="/__/firebase/7.7.0/firebase-app.js"></script>
        <!-- Add Firebase products that you want to use -->
        <script src="/__/firebase/7.7.0/firebase-firestore.js"></script>
    </body>    
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FirebasePlugin from 'phaser3-rex-plugins/plugins/firebase-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexFirebase',
                plugin: FirebasePlugin,
                start: true
            }]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Initialize firebase application.
    ```javascript
    firebase.initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    })
    ```
- Add file-manager object
    ```javascript
    var fileManager = scene.plugins.get('rexFirebase').add.files(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- [Add Firebase SDKs](https://firebase.google.com/docs/web/setup)
    ```html
    <body>
        <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
        <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
        <script src="/__/firebase/7.7.0/firebase-app.js"></script>
        <!-- Add Firebase products that you want to use -->
        <script src="/__/firebase/7.7.0/firebase-database.js"></script>
    </body>    
    ```
- Initialize firebase application.
    ```javascript
    firebase.initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    })
    ```
- Import class
    ```javascript
    import { Files } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add file-manager object
    ```javascript
    var fileManager = new Files(config);
    ```

### Create instance

```javascript
var fileManager = scene.plugins.get('rexFirebase').add.files({
    root: ''
});
```

- `root` : Collection name of these files.

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
    - `headers` : Get header by `headers[fileID]`, each header contains
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