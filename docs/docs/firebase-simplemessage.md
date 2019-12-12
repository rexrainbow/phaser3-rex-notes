## Introduction

Broadcast real-time messages.

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-simplemessage)

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

### Create instance

*Firebase engine api is boundled into this plugin already*

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
2. Create simple message instance
    ```javascript
    var messager = rexFire.add.simpleMessage({
        root: '',
        // senderID: '',
        // senderName: ''
    });
    ```
    - `root` : Path of this messager.
    - `senderID` : User ID of sender.
    - `senderName` : Display name of sender.

### Send message

1. Set sender
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
1. Send message to receiverID
    ```javascript
    messager.send(receiverID, message);
    ```
    - `receiverID` : ID of receiver/channel.
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
1. Start receiving
    ```javascript
    messager.startReceiving(receiverID);
    ```
    - `receiverID` : ID of receiver/channel.
1. Stop receive
    ```javascript
    messager.stopReceiving();
    ```

Only receive messages after invoking `startReceiving` method. Previous messages won't be got anymore.
