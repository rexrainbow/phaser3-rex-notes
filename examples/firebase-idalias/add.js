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

        var idAlias = rexFire.add.idAlias({
            root: 'idalias-test'
        })

        idAlias
            .add('aabb', 'rex')
            .then(function (result) {
                console.log('Add: ', result);
                return idAlias.getId('rex');
            })
            .then(function (result) {
                console.log('Get: ', result);
                return idAlias.getRandomAlias('ccdd', { digits: 10, candidates: '0123456789' });
            })
            .then(function (result) {
                console.log('Get: ', result);
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