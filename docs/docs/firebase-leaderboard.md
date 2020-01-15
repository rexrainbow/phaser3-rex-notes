## Introduction

Leader board/score board, using [firebase-firestore](https://firebase.google.com/docs/firestore/).

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-leaderboard)

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
    var leaderBoard = rexFire.add.leaderBoard({
        root: '',
        // timeFilters: false,
        // pageItemCount: 100
    });
    ```
    - `root` : Path of this leaderBoard.
    - `timeFilters` : Time filter of day/week/month/year.
        - `false` : Don't use any time filter.
        - `true` : Enable all time filters.
        - JSON object, enable some time filters.
            ```javascript
            {
                day: true,
                week: true,
                month: true,
                year: true
            }
            ```
    - `senderName` : Display name of sender.
    - `receiverID` : ID of receiver/channel.

### Send message

1. Set sender in config, or `setSender` method
    ```javascript
    leaderBoard.setSender(userID, userName);
    ```
    or
    ```javascript
    leaderBoard.setSender({
        userID: userID,
        userName: userName
    });
    ```
    - `userID` : User ID of sender.
    - `userName` : Display name of sender.
1. Set receiver in config, or `setReceiver` method
    ```javascript
    leaderBoard.setReceiver(receiverID);
    ```
    - `receiverID` : ID of receiver/channel.
1. Send message to receiverID
    ```javascript
    leaderBoard.send(message);
    ```
    - `message` : A string message, or a JSON data.

### Receive messages

1. Register receive event
    ```javascript
    leaderBoard.on('receive', function(data){
        // var senderID = data.senderID;
        // var senderName = data.senderName;
        // var message = data.message;
    })
    ```
1. Set receiver in config, or `setReceiver` method
    ```javascript
    leaderBoard.setReceiver(receiverID);
    ```
    - `receiverID` : ID of receiver/channel.
1. Start receiving
    ```javascript
    leaderBoard.startReceiving();
    ```
1. Stop receive
    ```javascript
    leaderBoard.stopReceiving();
    ```

Only receive messages after invoking `startReceiving` method. Previous messages won't be got anymore.
