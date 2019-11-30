import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig.js';
import OnlineUserList from '../../plugins/firebase/onlineuserlist/OnlineUserList.js';

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
        var onlineUserList = new OnlineUserList(app, {
            root: 'online-userlist',
            maxUsers: 10
        });
        onlineUserList
            .on('join', function (user) {
                console.log('Join:', user)
            })
            .on('join-fail', function (user) {
                console.log('Join-fail', user)
            })
            .startUpdate()
            .addUser('aabb', 'rex')
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