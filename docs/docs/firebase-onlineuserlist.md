## Introduction

Online user list, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/firebase-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/dist/rexfirebaseplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-onlineuserlist)

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
2. Create broadcast instance
    ```javascript
    var userList = rexFire.add.onlineUserList({
        root: '',
        // maxUsers: 0,
        // eventNames: {
        //     join: 'join',
        //     leave: 'leave',
        //     update: 'update',
        //     change: 'change',
        //     init: 'init',
        //     changename: 'changename'
        // }
    });
    ```
    - `root` : Path of this online user list.
    - `maxUsers`: Maximum users in this list. Set to `0` to have infinity users.
    - `eventNames` : Rename event names.
        - `eventNames.join` : Event name, any user join list.
        - `eventNames.leave` : Event name, any user leave list.
        - `eventNames.update` : Event name, user list updated.
        - `eventNames.changename` : Event name, user name is changed.

### Join

1. Set userID and user name.
    ```javascript
    userList.setUser(userID, userName);
    ```
    or
    ```javascript
    userList.setUser({
        userID: userID,
        userName: userName
    });
    ```
    - `userID` : User ID.
    - `userName` : Display name.
1. Join list.
    ```javascript
    userList.join();
    ```

### Leave

```javascript
userList.leave();
```

### Kick user

```javascript
userList.leave(userID);
```

### Change user name

```javascript
userList.changeUserName(newUserName);
```

### Events

- Any user join
    ```javascript
    userList.on('join', user);
    ```
    - `user` : `{userID, userName}`
- Any user leave
    ```javascript
    userList.on('leave', user);
    ```
    - `user` : `{userID, userName}`
- User list updated
    ```javascript
    userList.on('update', users);
    ```
    - `users` : Array of user `{userID, userName}`
- User name is changed
    ```javascript
    userList.on('changename', userID, userName, prevUserName);
    ```