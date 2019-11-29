import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig.js';
import SimpleMessage from '../../plugins/firebase/simplemessage/SimpleMessage.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var firebaseApp = firebase.initializeApp(firebaseConfig);
        var messager = new SimpleMessage({
            app: firebaseApp,
            root: 'simple-message',

            senderID: 'aabb',
            senderName: 'rex'
        })

        messager
            .on('receive', function (d) {
                print.text += `${d.senderName}: ${d.message}\n`;
            })
            .startReceiving()
            .send('aabb', 'hello')
            .send('aabb', 'hello')
            .send('aabb', 'world')
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
    scene: Demo
};

var game = new Phaser.Game(config);