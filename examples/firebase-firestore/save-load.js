import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.js';

const Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var firebaseApp = firebase.initializeApp(firebaseConfig);
        // Initialize Cloud Firestore through Firebase
        var db = firebaseApp.firestore();
        db.settings({
            timestampsInSnapshots: true
        })

        // save an item into 'users' collection
        db.collection('users').add({
                first: 'Ada',
                last: 'Lovelace',
                born: Between(1500, 2050)
            })
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);

                // get all items in 'users' collection
                console.log('get all items');
                return db.collection('users').get();
            })
            .then(function (querySnapshot) {
                // for each item:
                querySnapshot.forEach(function (docRef) {
                    console.log(docRef.id + ': ' + JSON.stringify(docRef.data()));
                });

                console.log('get born > 1800 items');
                return db.collection('users').where('born', '>', 1800).get();
            })
            .then(function (querySnapshot) {
                // for each item:
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id + ': ' + JSON.stringify(doc.data()));
                });
            })
            .catch(function (error) {
                console.error('Error: ', error);
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