## Introduction

- [Home page](https://firebase.google.com/)
- [Available libraries](https://firebase.google.com/docs/web/setup/#libraries-cdn)

## Usage

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
        <script src="/__/firebase/7.7.0/firebase-firestore.js"></script>

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