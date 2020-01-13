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
            .on('addcol', function (page, row, col, value) {
                console.log(`${page}.${row}.${col} = ${value}`);
            })
            .on('changecol', function (page, row, col, value) {
                console.log(`${page}.${row}.${col} = ${value}`);
            })
            .startUpdate()
            .save('p0', 'row0', 'col0', 123)
            .then(function () {
                console.log(table.getData())
                return table.save('p0', 'row0', 'col0', 456);
            })
            .then(function () {
                console.log(table.getData())
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