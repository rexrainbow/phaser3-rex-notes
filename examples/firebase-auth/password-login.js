import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var firebaseApp = firebase.initializeApp(firebaseConfig);

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
                console.log(displayName + '(' + uid + '): ' + email);
            } else {
                // User is signed out.
                console.log('log-out');
            }
        });
        firebaseApp.auth().signOut();

        var email = 'aa.bbb@cccc.com';
        var password = 'abcde1234';

        // create new user
        //firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        //    // Handle Errors here.
        //    var errorCode = error.code;
        //    var errorMessage = error.message;
        //    console.log(errorMessage)
        //});

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });

    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);