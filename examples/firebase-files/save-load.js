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
        var print = this.add.text(0, 0, '');

        var rexFire = this.plugins.get('rexFire').initializeApp(firebaseConfig);

        var fileManager = rexFire.add.files({
            root: 'files-test'
        });

        fileManager
            .setOwner('rex')
            .save('slot1', { description: 'aabb' })
            .then(function (result) {
                return fileManager.load(result.fileName);
            })
            .then(function (result) {
                console.log('Load file:', result.fileName, result.header, result.content);

                return fileManager.save('slot2', { description: 'ccdd' });
            })
            .then(function () {
                return fileManager.loadHeaders();
            })
            .then(function (result) {
                console.log('Load headers', result.headers);
            })
            .catch(function (result) {
                console.log('Error', result.error);
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