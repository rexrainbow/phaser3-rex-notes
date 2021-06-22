import 'phaser';
import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';

import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';
import Delay from '../../plugins/utils/promise/Delay.js';
import Clone from '../../plugins/utils/object/Clone.js';

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
        this.plugins.get('rexFire').initializeApp(firebaseConfig);

        for (var i = 0; i < 2; i++) {
            JoinRoom.call(this)
        }
    }

    update() { }
}

var CreateRoomInstance = function () {
    var rexFire = this.plugins.get('rexFire');
    var room = rexFire.add.singleRoom({
        root: 'test-single-room'
    })
        .setUser(GetRandomWord(5), '')

    room
        .on('userlist.join', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} join`, Clone(room.getUserList()))
        })
        .on('userlist.leave', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} leave`)
        })
        .on('broadcast.receive', function (message) {
            console.log(`${room.userID}: Receive message '${message.message}' sent from ${message.senderID}`)
        })
    return room;
}

var JoinRoom = function () {
    var room = CreateRoomInstance.call(this);
    var userID = room.userID;
    return room
        .joinRoom()
        .then(function () {
            return Delay(300)
        })
        .then(function () {
            return room.broadcast.send('Hello world');
        })
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