## Introduction

1d/2d/3d table, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-itemtable)

### Install plugin

#### Load minify file

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
- Add table object
    ```javascript
    var table = scene.plugins.get('rexfirebaseplugin').add.itemTable(config);
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
        <script src="/__/firebase/7.7.0/firebase-database.js"></script>
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
- Add table object
    ```javascript
    var table = scene.plugins.get('rexFirebase').add.itemTable(config);
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
    import { ItemTable } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add table object
    ```javascript
    var table = new ItemTable(config);
    ```

### Create instance

```javascript
var table = scene.plugins.get('rexFirebase').add.itemTable({
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
    table.setDataOnDisconnect(key0, value)
    // table.setDataOnDisconnect(key0, key1, value)
    // table.setDataOnDisconnect(key0, key1, key2, value)
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
- Read all data stored in client
    ```javascript
    var data = table.getData();
    ```
    - `data` : JSON data.
- Clone data stored in client
    ```javascript
    var data = table.cloneData(key0);
    // var data = table.cloneData(key0, key1);
    // var data = table.cloneData(key0, key1, key2);    
    ```
- Clone all data stored in client
    ```javascript
    var data = table.cloneData();
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