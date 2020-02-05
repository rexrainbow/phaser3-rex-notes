## Introduction

Online user list, using [firebase-database](https://firebase.google.com/docs/database/).

- Author: Rex

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/firebase-onlineuserlist)

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
- Add online-user-list object
    ```javascript
    var userList = rexFire.add.onlineUserList(config);
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
- Add online-user-list object
    ```javascript
    var userList = rexFire.add.onlineUserList(config);
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
    import { OnlineUserList } from 'phaser3-rex-plugins/plugins/firebase-components.js';
    ```
- Add online-user-list object
    ```javascript
    var userList = new OnlineUserList(config);
    ```

### Create instance

```javascript
var userList = rexFire.add.onlineUserList({
    root: '',
    // maxUsers: 0
});
```

- `root` : Path of this online user list.
- `maxUsers`: Maximum users in this list. Set to `0` to have infinity users.

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

### User list

- Get users in user list
    ```javascript
    var users = userList.getUsers();
    ```
    - `users` : Array of user `{userID, userName}`
- Is first user in user list?
    ```javascript
    var isFirstUser = userList.isFirstUser(userID);
    // var isFirstUser = userList.isFirstUser();  // Current user is first user
    ```
- User list is full
    ```javascript
    var isFull = userList.isFull();
    ```
- Maximun users setting value
    ```javascript
    var maxUsers = userList.maxUsers;
    ```
- Current user is in list
    ```javascript
    var isInList = userList.isInList;
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
- User list updated, includes user join, user leave, and user name changed
    ```javascript
    userList.on('update', users);
    ```
    - `users` : Array of user `{userID, userName}`
- User name is changed
    ```javascript
    userList.on('changename', userID, userName, prevUserName);
    ```