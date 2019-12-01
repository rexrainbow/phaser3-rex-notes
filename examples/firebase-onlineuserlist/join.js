import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebaseConfig.js';
import OnlineUserList from '../../plugins/firebase/onlineuserlist/OnlineUserList.js';
import undefined from 'firebase/database';

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
            maxUsers: 3
        });
        onlineUserList
            .on('join', function (user) {
                console.log('Join:', user)
            })
            .on('join-fail', function (user) {
                console.log('Join-fail', user)
            })
            .startUpdate()
            .addUser(genText(10), genText(5))
            .catch(function () {
                debugger
            })
    }

    update() { }
}

const RandomInt = Phaser.Math.Between;
const RandomItem = Phaser.Utils.Array.GetRandom;
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var genText = function (min, max) {
    var count = (max === undefined) ? min : RandomInt(min, max);
    var s = '';
    for (var j = 0; j < count; j++) {
        s += RandomItem(possible);
    }
    return s;
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