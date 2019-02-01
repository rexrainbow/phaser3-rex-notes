import firebase from 'firebase/app';
import 'firebase/storage';
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

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebaseApp.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        var content = 'Hello world!';
        var uploadTask = storageRef.child('text/test.txt').putString(content)
            .then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            })
            .catch(function (error) {

            })
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