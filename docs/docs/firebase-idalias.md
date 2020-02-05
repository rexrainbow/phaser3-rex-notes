## Introduction

Map an unique ID to another unique ID (alias), using [firebase-firestore](https://firebase.google.com/docs/firestore/).

Each owner has several files, each file contains header and content indexed by fileID.

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-idalias)

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
- Add id-alias object
    ```javascript
    var idAlias = scene.plugins.get('rexfirebaseplugin').add.idAlias(config);
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
- Add id-alias object
    ```javascript
    var idAlias = scene.plugins.get('rexFirebase').add.idAlias(config);
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
    import { IdAlias } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add id-alias object
    ```javascript
    var idAlias = new IdAlias(config);
    ```

### Create instance

```javascript
var idAlias = scene.plugins.get('rexFirebase').add.idAlias({
    root: ''
});
```

- `root` : Collection name of this id-alias.

### Random alias

Get alias of an id, or register an alias from a random word.

```javascript
idAlias.getRandomAlias(id, {
    digits: 10,
    candidates: '0123456789',
    retry: 1000
})
    .then(function(result) { 
        // var alias = result.alias;
        // var id = result.id;
    })
    .catch(function(error) { })
```

- `id` : An unique ID.
- `digits` : String length of alias.
- `candidates` : Candidate characters.
- `retry` : Max retry count.

### Specific alias

- Add a specific alias
    ```javascript
    idAlias.add(id, alias)
        .then(function(result) { 
            // var alias = result.alias;
            // var id = result.id;
        })
        .catch(function(error) { })
    ```
    - `id` : An unique ID.
    - `alias` : Another unique ID.
- Get ID from alias
    ```javascript
    idAlias.getId(alias)
        .then(function(result) { 
            // var alias = result.alias;
            // var id = result.id; // Return undefined if alias is not existed.
        })
        .catch(function(error) { })
    ```
- Get alias from ID
    ```javascript
    idAlias.getAlias(id)
        .then(function(result) { 
            // var alias = result.alias; // Return undefined if id is not existed.
            // var id = result.id;
        })
        .catch(function(error) { })
    ```