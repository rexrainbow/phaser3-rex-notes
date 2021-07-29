## Introduction

Store messages in [firebase-firestore](https://firebase.google.com/docs/firestore/).

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-messages)

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
- Add leader-board object
    ```javascript
    var messages = scene.plugins.get('rexfirebaseplugin').add.messages(config);
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
- Add leader-board object
    ```javascript
    var messages = scene.plugins.get('rexFirebase').add.messages(config);
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
    import { Messages } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add leader-board object
    ```javascript
    var messages = new Messages(config);
    ```

### Create instance

```javascript
var messages = scene.plugins.get('rexFirebase').add.messages({
    root: '',
    // pageItemCount: 100,

    // senderID: '',
    // senderName: '',
    // receiverID: undefined,
});
```

- `root` : Collection name of this messages.
- `pageItemCount` : Item count of a page, default value is `100`
- `senderID` : ID of sender.
- `senderName` : Name of sender, optional.
- `receiverID` : ID of receiver, optional.

### Send message

1. Set sender.
    ```javascript
    messages.setSender(userID, userName);
    ```
    or
    ```javascript
    messages.setSender({
        userID: userID,
        userName: userName
    });
    ```
    - `userID` : User ID.
    - `userName` : Display name of user, optional.
1. Set receiver, optional.
    ```javascript
    messages.setReceiver(userID);
    ```
    - `userID` : User ID.
1. Send message
    ```javascript
    messages.send(message)    
        .then(function() { })
        .catch(function(error) { })
    ```
    - `message` : String, number, or JSON object.

### Receive messages

1. Set receiverID, optional.
    ```javascript
    messages.setReceiver(userID)
    ```
    - `userID` : User ID.
1. Load previous messages, optional.
    ```javascript
    messages.loadPreviousMessages()
        .then(function(messageObjs) { })
        .catch(function(error) { })    
    ```
    - `messageObjs` : Array of Received message objects
        - `messageObj.senderID`, `messageObj.senderName` : Sernder ID and name.
        - `messageObj.receiverID` : Receiver ID, optional.
        - `messageObj.message` : Sent message, a string, number, or JSON object.
        - `messageObj.timestamp` : Server-timestamp.
1. Add `'receiver'` event.
    ```javascript
    messages.on('receive', function(messageObj) {
        // var senderID = messageObj.senderID;
        // var senderName = messageObj.senderName;
        // var receiverID = messageObj.receiverID;
        // var message = messageObj.message;
        // var timestamp = messageObj.timestamp;
    })
    ```
    - `messageObj` : Received message object.
1. Start receiving
    ```javascript
    messages.startReceiving();
    ```
1. Stop receiving
    ```javascript
    messages.stopReceiving();
    ```

Received messages will be stored in `messages.cacheMessages`
