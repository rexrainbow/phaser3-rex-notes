import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig.js';
import SimpleMessage from '../../plugins/firebase/simplemessage/SimpleMessage.js';
import StackMessage from '../../plugins/firebase/stackmessage/StackMessage.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');

        var app = firebase.initializeApp(firebaseConfig);
        var config = {
            root: 'simple-message',

            senderID: 'aabb',
            senderName: 'rex'
        }

        var simpleMode = false;
        var messagerClass = (simpleMode) ? SimpleMessage : StackMessage;
        var messager = new messagerClass(app, config);


        messager
            .send('aabb', '1')  // This message won't be received if simpleMode is true
            .then(function () {
                return messager.send('aabb', '2');
                // This message won't be received if simpleMode is true
            })
            .then(function () {
                return messager.send('aabb', '3');
                // This message won't be received if simpleMode is true
            })
            .then(function () {
                messager.on('receive', function (d) {
                    print.text += `${d.senderName}: ${d.message}\n`;
                })
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
    scene: Demo
};

var game = new Phaser.Game(config);