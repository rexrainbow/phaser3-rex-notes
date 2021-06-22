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

        var table = rexFire.add.itemTable({
            root: 'itemtable-test'
        })

        table
            .on('addkey2', function (key0, key1, key2, value) {
                console.log(`${key0}.${key1}.${key2} = ${value}`);
            })
            .on('changekey2', function (key0, key1, key2, value) {
                console.log(`${key0}.${key1}.${key2} = ${value}`);
            })
            .startUpdate()
            .removeDataOnDisconnect('p0')
            .then(function () {
                return table.setData('p0', 'r0', 'c0', 123);
            })
            .then(function () {
                console.log(table.cloneData())
                return table.incValue('p0', 'r0', 'c0', 100);
            })
            .then(function () {
                console.log(table.cloneData())
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