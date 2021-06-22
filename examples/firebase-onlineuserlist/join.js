import 'phaser';
import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';

import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';

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
        var userList = rexFire.add.onlineUserList({
            root: 'online-userlist',
            maxUsers: 2
        });

        userList
            .setUser(GetRandomWord(10), GetRandomWord(5))
            .on('join', function (user) {
                console.log('Join:', user)
            })
            .on('change', function (user, prev) {
                console.log('Change:', user, prev)
            })
            .join()
            .then(function () {
                userList.startUpdate(); // Don't startUpdate before addUser
                return userList.changeUserName('rex')
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