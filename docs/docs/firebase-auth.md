## Introduction

It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

- Author: [Firebase](https://firebase.google.com/)

## Usage

[Official document](https://firebase.google.com/docs/auth/web/start)

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/firebase-auth)

### Setup

1. Import firestore
    ```javascript
    import firebase from 'firebase/app';
    import 'firebase/auth';
    ```
    Firebase has been included in [package.json](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/package.json).
1. Initialize
    ```javascript
    var firebaseApp = firebase.initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    });
    ```

### On sign-in/sign-out

```javascript
firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    } else {
        // User is signed out.
        // ...
    }
});
```

### Sign-in with facebook

```javascript
var provider = new firebase.auth.FacebookAuthProvider();
firebaseApp.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});
```

### Sign-in with Google

```javascript
var provider = new firebase.auth.GoogleAuthProvider();
firebaseApp.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user);
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});
```

### Sign-in with password

- Create new user
    ```javascript
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    ```
- Sign-in
    ```javascript
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    ```

### Sign-out

```javascript
firebaseApp.auth().signOut();
```

### Current sign-in user

```javascript
var user = firebaseApp.auth().currentUser;
if (user != null) {
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var emailVerified = user.emailVerified;
    var uid = user.uid;
}
```

#### Update email

```javascript
user.updateEmail('...').then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});
```

#### Update profile

```javascript
user.updateProfile({
    displayName: '...',
    photoURL: '...'
}).then(function() {
    // Update successful.
}).catch(function(error) {
    // An error happened.
});
```

#### Send a verification email

```javascript

user.sendEmailVerification().then(function() {
    // Email sent.
}).catch(function(error) {
    // An error happened.
});
```
