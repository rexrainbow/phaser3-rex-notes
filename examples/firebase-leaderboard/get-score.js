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

        var promises = [];
        for (var i = 0; i < 10; i++) {
            promises.push(
                leaderBoard.setUser(`${i}`).post(i)
            );
        }
        Promise.all(promises)
            .then(function () {
                return leaderBoard.setUser('3').getScore();
            })
            .then(function (result) {
                console.log('Get score:', result);
                return leaderBoard.getRank();
            })
            .then(function(result){
                console.log('Get rank:', result);
            })
            .catch(function (error) {
                debugger;
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