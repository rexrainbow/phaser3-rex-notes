## Introduction

Broadcast real-time messages, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-broadcast)

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
2. Create broadcast instance.
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