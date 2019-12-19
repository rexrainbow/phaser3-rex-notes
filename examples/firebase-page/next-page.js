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
        var rootRef = db.collection('page-test');
        var page = rexFire.add.page({
            itemCount: 3,
            query: {
                next: rootRef.orderBy('i', 'desc'),
                previous: rootRef.orderBy('i'),
            }
        })

        debugger
        // var batch = db.batch();
        // for (var i = 0; i < 10; i++) {
        //     batch.set(rootRef.doc(), { i: i });
        // }
        // batch.commit()
        //.then(function () {
        //    return page.loadFirstPage();
        //})
        page.loadFirstPage()
            .then(function (querySnapshot) {
                console.log(`First page:${page.pageIndex}`)
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                });
                return page.loadNextPage();
            })
            .then(function (querySnapshot) {
                console.log(`Next page:${page.pageIndex}`)
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                });
                debugger
                return page.loadPreviousPage();
            })
            .then(function (querySnapshot) {
                console.log(`Previous page:${page.pageIndex}`)
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                });
                return page.loadNextPage();
            })
            .then(function (querySnapshot) {
                console.log(`Next page:${page.pageIndex}`)
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                });
            })
            .catch(function () {
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