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

        var messager = rexFire.add.broadcast({
            root: 'broadcast-test'
        });


        messager
            .on('receive', function (d) {
                print.text += `${d.senderName}: ${d.message}\n`;
            })
            .setSender('aabb', 'rex')
            .send('aabb', '1')  // This message won't be received
            .then(function () {
                return messager.send('aabb', '2');
                // This message won't be received
            })
            .then(function () {
                return messager.send('aabb', '3');
                // This message won't be received
            })
            .then(function () {
                messager.startReceiving();
                return Promise.resolve();
            })
            .then(function () {
                return messager.send('aabb', 'hello');
            })
            .then(function () {
                return messager.send('aabb', 'hello');
            })
            .then(function () {
                return messager.send('aabb', 'world');
            })
            .catch(function (error) {
                console.log(error);
            });
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