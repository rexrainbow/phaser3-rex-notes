import 'phaser';
import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.plugins.get('rexFire').preload(this);
    }

    create() {
        var rexFire = this.plugins.get('rexFire').initializeApp(firebaseConfig);
        var db = firebase.firestore();
        var rootRef = db.collection('pageQuery-test');
        var pageQuery = rexFire.add.pageQuery({
            itemCount: 3,
            query: {
                next: rootRef.orderBy('i', 'desc'),
                previous: rootRef.orderBy('i'),
            }
        })

        var promises = [];
        for (var i = 0; i < 10; i++) {
            promises.push(rootRef.doc(`item-${i}`).set({ i: i }));
        }
        Promise.all(promises)
            .then(function () {
                return pageQuery.loadFirstPage();
            })
            .then(function (docs) {
                console.log(`First pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadNextPage();
            })
            .then(function (docs) {
                console.log(`Next pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadNextPage();
            })
            .then(function (docs) {
                console.log(`Next pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadPreviousPage();
            })
            .then(function (docs) {
                console.log(`Previous pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadNextPage();
            })
            .then(function (docs) {
                console.log(`Next pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadNextPage();
            })
            .then(function (docs) {
                console.log(`Next pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
                return pageQuery.loadNextPage();
            })
            .then(function (docs) {
                console.log(`Next pageQuery:${pageQuery.pageIndex}`)
                docs.forEach(function (doc) {
                    console.log(doc.data());
                });
            })
            .catch(function (error) {
                debugger
            })

    }

    update() { }
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFire',
            plugin: FirebasePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);