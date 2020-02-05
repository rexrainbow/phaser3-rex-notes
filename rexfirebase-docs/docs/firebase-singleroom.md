## Introduction

Chat room, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-singleroom)

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
- Add single-room object
    ```javascript
    var room = rexFire.add.singleRoom(config);
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
- Add single-room object
    ```javascript
    var room = rexFire.add.singleRoom(config);
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
    import { SingleRoom } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add single-room object
    ```javascript
    var room = new SingleRoom(config);
    ```

### Create instance

```javascript
var room = rexFire.add.singleRoom({
    root: '',
    // broadcast: true,
    // tables: undefined
});
```

- `root` : Path of this room.
- `receiverID` : ID of receiver/channel.
- `broadcast` : [Broadcast](firebase-broadcast.md) chat messages.
    - `true` : Enable broadcasting, without storing received (history) messages. Default behavior.
    - `false` : Disable broadcasting.
    - A JSON object :
        ```javascript
        {
            history: 0
        }
        ```
        - `history` : Stored received (history) messages in client side.
            - `0`, or `false` : No history message stored.
            - `-1`, or `true` : Infinity history message stored. i.e. store all messages from starting updating.
            - A number larger then `0` : Length of stored history message.
- `tables` : Configuration of [tables](firebase-itemtable.md).
    - `undefined` : No table.
    - Array of table-config JSON object for each table.
        ```javascript
        [
            {
                key: tableKey,
                type: '1d'
            },
            {
                ...
            }
        ]
        ```
        - `key` : Unique name of this table.
        - `type` : Table type.
            - `1`, or `'1d'` : 1d table, indexing by (key0)
            - `2`, or `'2d'` : 2d table, indexing by (key0, key1)
            - `3`, or `'3d'` : 3d table, indexing by (key0, key1, key2)

### Join room

1. Set userID and user name.
    ```javascript
    room.setUser(userID, userName);
    ```
    - `userID` : User ID.
    - `userName` : Display name.
1. Join room.
    ```javascript
    room.joinRoom();
    ```

### Leave room

```javascript
room.leaveRoom();
```

### Kick user

```javascript
room.kickUser(userID);
```

### User list

- Get users in room(user list)
    ```javascript
    var users = room.getUsers();
    ```
    - `users` : Array of user `{userID, userName}`
- Is first user in room(user list)?
    ```javascript
    var isFirstUser = room.isFirstUser(userID);
    // var isFirstUser = room.isFirstUser();  // Current user is first user
    ```
- Room(user list) is full
    ```javascript
    var isFull = room.isFull();
    ```
- Maximun users setting value
    ```javascript
    var maxUsers = room.maxUsers;
    ```
- Current user is in room(user list)
    ```javascript
    var isInRoom = room.isInRoom();
    ```

### Send message

```javascript
room.broadcast.send(message);
```

- `message` : A string message, or a JSON data.

### Receive messages

1. Register receive event
    ```javascript
    room.on('broadcast.receive', function(data){
        // var senderID = data.senderID;
        // var senderName = data.senderName;
        // var message = data.message;
    })
    ```

Only receive messages after joined room. Previous messages won't be got anymore.

#### Received messages

Received messages will be saved in client side.

- Get received (history) messages.
    ```javascript
    var messages = room.broadcast.getHistory();
    ```
- Clear history messages.
    ```javascript
    room.broadcast.clearHistory();
    ```

### Change user name

```javascript
room.changeUserName(newUserName);
```

### Tables

- Get table
    ```javascript
    var table = room.getTable(key);
    ```
    - `key` : Unique name of this table.

#### Write

See [here](firebase-itemtable.md#write)

#### Read

See [here](firebase-itemtable.md#read)

### Events

#### User list events

- Any user join
    ```javascript
    room.on('userlist.join', user);
    ```
    - `user` : `{userID, userName}`
- Any user leave
    ```javascript
    room.on('userlist.leave', user);
    ```
    - `user` : `{userID, userName}`
- User list updated, includes user join, user leave, and user name changed
    ```javascript
    room.on('userlist.update', users);
    ```
    - `users` : Array of user `{userID, userName}`
- User name is changed
    ```javascript
    room.on('userlist.changename', userID, userName, prevUserName);
    ```

#### Broadcast events

- Receive message
    ```javascript
    room.on('broadcast.receive', function(data){
        // var senderID = data.senderID;
        // var senderName = data.senderName;
        // var message = data.message;
    })
    ```

#### Table events

[Event](firebase-itemtable.md#events) names of each table indexed by key

- `init` : `tables.${key}.init`
- `update` : `tables.${key}.update`
- `addkey0` : `tables.${key}.addkey0`
- `removekey0` : `tables.${key}.removekey0`
- `changekey0` : `tables.${key}.changekey0`
- `addkey1` : `tables.${key}.addkey1`
- `removekey1` : `tables.${key}.removekey1`
- `changekey1` : `tables.${key}.changekey1`
- `addkey2` : `tables.${key}.addkey2`
- `removekey2` : `tables.${key}.removekey2`
- `changekey2` : `tables.${key}.changekey2`
