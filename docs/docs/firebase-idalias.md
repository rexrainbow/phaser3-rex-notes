## Introduction

Map an unique ID to another unique ID (alias), using [firebase-firestore](https://firebase.google.com/docs/firestore/).

Each owner has several files, each file contains header and content indexed by fileID.

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-idalias)

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

1. Initialize firebase application.
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
2. Create leader board instance.
    ```javascript
    var idAlias = rexFire.add.idAlias({
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