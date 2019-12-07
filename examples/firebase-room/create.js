import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';

import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var rexFire = this.plugins.get('rexFire').initializeApp(firebaseConfig);
        var room = rexFire.add.room({
            root: 'test-room'
        })
            .setUser(GetRandomWord(10), GetRandomWord(5))
            .createRoom({
                roomName: 'chat',
                roomType: 'private',
                maxUsers: 2
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