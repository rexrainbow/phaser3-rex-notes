## Introduction

1d/2d/3d table, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-itemtable)

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
2. Create table instance.
    ```javascript
    var table = rexFire.add.itemTable({
        root: '',
        type: 3
    });
    ```
    - `root` : Path of this item table.
    - `type` : Table type.
        - `1`, or `'1d'` : 1d table, indexing by (key0)
        - `2`, or `'2d'` : 2d table, indexing by (key0, key1)
        - `3`, or `'3d'` : 3d table, indexing by (key0, key1, key2)

### Write

- Set data
    ```javascript
    table.setData(key0, value)
    // table.setData(key0, key1, value)
    // table.setData(key0, key1, key2, value)
        .then(function() { })
        .catch(function() { })
    ```
    - `key0`, `key1`, `key2` : Any string.
    - `value` : Number, string, or JSON data.
- Increase value
    ```javascript
    table.incValue(key0, value)
    // table.incValue(key0, key1, value)
    // table.incValue(key0, key1, key2, value)
        .then(function() { })
        .catch(function() { })    
    ```
    - `key0`, `key1`, `key2` : Any string.
    - `value` : Number.
- Remove key
    ```javascript
    table.removeData(key0)
    // table.removeData(key0, key1)
    // table.inremoveDatacValue(key0, key1, key2)
        .then(function() { })
        .catch(function() { })    
    ```
    - `key0`, `key1`, `key2` : Any string.
- Batch writing specific values at key pathes
    ```javascript
    table.updateData({
        `${key0}` : value0,
        `${key0}/${key1}` : value1,
        `${key0}/${key1}/${key2}` : value2,
        ...
    })
        .then(function() { })
        .catch(function() { })    
    ```
- Transaction, write new value according to latest value
    ```javascript
    table.transaction(key0, callback)
    // table.transaction(key0, key1, callback)
    // table.transaction(key0, key1, key2, callback)
        .then(function() { })
        .catch(function() { })    
    ```
    - `key0`, `key1`, `key2` : Any string.
    - `callback` : Write new value according to latest value.
        ```javascript
        function(preValue) { 
            return newValue; 
        }
        ```
- Remove key when current user disconnect
    ```javascript
    table.removeDataOnDisconnect(key0)
    // table.removeDataOnDisconnect(key0, key1)
    // table.removeDataOnDisconnect(key0, key1, key2)
        .then(function() { })
        .catch(function() { })        
    ```
- Set value when current user disconnect
    ```javascript
    table.setDataOnDisconnect(key0)
    // table.setDataOnDisconnect(key0, key1)
    // table.setDataOnDisconnect(key0, key1, key2)
        .then(function() { })
        .catch(function() { })        
    ```

### Read

- Start updating
    ```javascript
    table.startUpdate();
    ```
    - Trigger `'init'` event when all data read back.
    - `table.initialFlag` : Return `true` when all data read back.
- Stop updating
    ```javascript
    table.stopUpdate();
    ```
- Read data stored in client
    ```javascript
    var data = table.getData(key0);
    // var data = table.getData(key0, key1);
    // var data = table.getData(key0, key1, key2);
    ```
    - `data` : Number, string, or JSON data.
- Clone data stored in client
    ```javascript
    var data = table.cloneData(key0);
    // var data = table.cloneData(key0, key1);
    // var data = table.cloneData(key0, key1, key2);    
    ```

### Events

- Initialize, read all data back after start updating
    ```javascript
    table.on('init', function(data) { })
    ```
    - `data` : Table data.
    - `table.initialFlag` will be set to `true`.
- Any value updated
    ```javascript
    table.on('update', function(data) { })
    ```
    - `data` : Table data.

#### 1d table

1d table, indexing by (key0)

- On add key0
    ```javascript
    table.on('addkey0', function(key0, value) {  });
    ```
- On remove key0
    ```javascript
    table.on('removekey0', function(key0) {  });
    ```
- On change key0
    ```javascript
    table.on('changekey0', function(key0, value) {  });
    ```

#### 2d table

2d table, indexing by (key0, key1)

- On add key0
    ```javascript
    table.on('addkey0', function(key0, value) {  });
    ```
- On remove key0
    ```javascript
    table.on('removekey0', function(key0) {  });
    ```
- On add key1
    ```javascript
    table.on('addkey1', function(key0, key1, value) {  });
    ```
- On remove key1
    ```javascript
    table.on('removekey1', function(key0, key1) {  });
    ```
- On change key1
    ```javascript
    table.on('changekey1', function(key0, key1, value) {  });
    ```

#### 3d table

3d table, indexing by (key0, key1, key2)

- On add key0
    ```javascript
    table.on('addkey0', function(key0, value) {  });
    ```
- On remove key0
    ```javascript
    table.on('removekey0', function(key0) {  });
    ```
- On add key1
    ```javascript
    table.on('addkey1', function(key0, key1, value) {  });
    ```
- On remove key1
    ```javascript
    table.on('removekey1', function(key0, key1) {  });
    ```
- On add key2
    ```javascript
    table.on('addkey2', function(key0, key1, key2, value) {  });
    ```
- On remove key2
    ```javascript
    table.on('removekey2', function(key0, key1, key2) {  });
    ```
- On change key2
    ```javascript
    table.on('changekey2', function(key0, key1, key2, value) {  });
    ```