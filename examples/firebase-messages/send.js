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

        var messager = rexFire.add.messages({
            root: 'messages-test',
            senderID: 'aabb',
            senderName: 'rex'
        })

        debugger
        messager
            .on('receive', function (d) {
                console.log(d);
                console.log(messager.cacheMessages);
            })
            .loadPreviousMessages()
            .then(function (messages) {
                console.log(messages);

                return messager
                    .startReceiving()
                    .send((new Date()).toString());
            })
            .then(function () {
                debugger
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