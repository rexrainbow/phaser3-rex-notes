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

        var batch = db.batch();
        for (var i = 0; i < 100; i++) {
            batch.set(db.collection('data').doc(i.toString()), {
                count: i
            });
        }

        batch.commit()
            .then(function () {
                console.log('Batch writes');

                return db.collection('data').orderBy('count').startAt(70).limit(10).get();
            })
            .then(function (querySnapshot) {
                console.log('Start at count == 70');

                // for each item:
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id + ': ' + JSON.stringify(doc.data()));
                });

                var lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                return db.collection('data').orderBy('count').startAfter(lastDoc).limit(10).get();
            })
            .then(function (querySnapshot) {
                console.log('Start at next 10');

                // for each item:
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id + ': ' + JSON.stringify(doc.data()));
                });
            })            
            .catch(function (error) {
                console.error('Error: ', error);
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