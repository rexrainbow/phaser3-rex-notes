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

        var leaderBoard = rexFire.add.leaderBoard({
            root: 'leaderboard-test',
            timeFilters: true,
            pageItemCount: 3
        })

        leaderBoard.post(100, undefined, (new Date(2020, 1, 1)).getTime())
            .then(function () {
                return leaderBoard.post(90)
            })
            .then(function () {
                return leaderBoard.getScore()
            })
            .then(function (result) {
                console.log(result);
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