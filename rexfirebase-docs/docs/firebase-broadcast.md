## Introduction

Broadcast real-time messages, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-broadcast)

### Install plugin

#### Load minify file

- [Add Firebase SDKs](https://firebase.google.com/docs/web/setup), and [rex-firebase minify javascript file](https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebase.min.js)
    ```html
    <body>
        <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
        <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
        <script src="/__/firebase/7.7.0/firebase-app.js"></script>
        <!-- Add Firebase products that you want to use -->
        <script src="/__/firebase/7.7.0/firebase-database.js"></script>

        <script src="https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebase.min.js"></script>
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
- Get firebase plugin
    ```javascript
    var rexFire = new window.rexfirebase();
    ```
- Add messager object
    ```javascript
    var messager = rexFire.add.broadcast(config);
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
- Get firebase plugin
    ```javascript
    import RexFirebase from 'phaser3-rex-plugins/plugins/firebase.js';    
    var rexFire = new RexFirebase();
    ```
- Add messager object
    ```javascript
    var messager = rexFire.add.broadcast(config);
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
    import { Broadcast } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add messager object
    ```javascript
    var messager = new Broadcast(config);
    ```

### Create instance

```javascript
var messager = rexFire.add.broadcast({
    root: '',
    // receiverID: '',
    // history: 0
});
```

- `root` : Path of this messager.
- `receiverID` : ID of receiver/channel.
- `history` : Stored received (history)  messages in client side.
    - `0`, or `false` : No history message stored.
    - `-1`, or `true` : Infinity history message stored. i.e. store all messages from starting updating.
    - A number larger then `0` : Length of stored history message.

### Send message

1. Set sender in config, or `setSender` method.
    ```javascript
    messager.setSender(userID, userName);
    ```
    or
    ```javascript
    messager.setSender({
        userID: userID,
        userName: userName
    });
    ```
    - `userID` : User ID of sender.
    - `userName` : Display name of sender.
1. Set receiver in config, or `setReceiver` method.
    ```javascript
    messager.setReceiver(receiverID);
    ```
    - `receiverID` : ID of receiver/channel.
1. Send message to receiverID.
    ```javascript
    messager.send(message);
    ```
    - `message` : A string message, or a JSON data.

### Receive messages

1. Register receive event
    ```javascript
    messager.on('receive', function(data){
        // var senderID = data.senderID;
        // var senderName = data.senderName;
        // var message = data.message;
    })
    ```
1. Set receiver in config, or `setReceiver` method
    ```javascript
    messager.setReceiver(receiverID);
    ```
    - `receiverID` : ID of receiver/channel.
1. Start receiving
    ```javascript
    messager.startReceiving();
    ```
1. Stop receive
    ```javascript
    messager.stopReceiving();
    ```

Only receive messages after invoking `startReceiving` method. Previous messages won't be got anymore.

#### Received messages

Received messages will be saved in client side.

- Get received (history) messages.
    ```javascript
    var messages = messager.getHistory();
    ```
- Clear history messages.
    ```javascript
    messager.clearHistory();
    ```