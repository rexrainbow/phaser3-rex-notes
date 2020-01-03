import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';

import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';
import Delay from '../../plugins/utils/promise/Delay.js';

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

        var self = this;
        CreateRoom.call(self)
            .then(function (roomConfig) {
                return Delay(1000, roomConfig)
            })
            .then(function (roomConfig) {
                return JoinRoom.call(self, roomConfig.roomID)
            })
    }

    update() { }
}

var CreateRoomInstance = function () {
    var rexFire = this.plugins.get('rexFire');
    var room = rexFire.add.room({
        root: 'test-room'
    })
        .setUser(GetRandomWord(5), '')

        room
        .on('userlist.join', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} join room ${room.roomID}`, Clone(room.getUserList()))
        })
        .on('userlist.leave', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} leave room ${room.roomID}`)
        })
    return room;
}

var CreateRoom = function () {
    // Simulate an user creates a random room
    var room = CreateRoomInstance.call(this)
    var userID = room.userInfo.userID;
    return room
        .createRoom({
            roomName: 'chat',
            roomType: 'private',
            maxUsers: 2
        })
        .then(function (roomConfig) {
            console.log(`${userID}: Create room ${roomConfig.roomID}`)
            return Promise.resolve(roomConfig)
        });
}

var JoinRoom = function (roomID) {
    // Simulate an user joins a room via roomId
    var room = CreateRoomInstance.call(this)
    var userID = room.userID;

    // Leave room after 1000ms
    setTimeout(function () {
        var prevRoomID = room.roomID;
        room
            .leaveRoom()
            .then(function () {
                return room.getUserList(prevRoomID)
            })
            .then(function (users) {
                console.log(`Room ${prevRoomID} has users:`, users);
                return Delay(1000)

            })
            .then(function () {
                return room.joinRandomRoom()
            })

    }, 1000)

    return room
        .joinRoom({
            roomID: roomID
        })
        .then(function (roomConfig) {
            console.log(`${userID}: Join room ${roomConfig.roomID}`)
            return Promise.resolve(roomConfig);
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