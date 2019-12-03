import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig.js';

import Room from '../../plugins/firebase/room/Room.js';
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

        var app = firebase.initializeApp(firebaseConfig);
        var room = new Room(app, {
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
    scene: Demo
};

var game = new Phaser.Game(config);