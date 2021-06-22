import 'phaser';
import ParsePlugin from '../../plugins/parse-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.plugins.get('rexParse').preload(this);
    }

    create() {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'HSEc6FPwSQxMPzFwBooEme2n0agfUIBgFcO8LNtr', // This is your Application ID
            'DbgfGW40cdqUQug8cv6NDAplB1D9daNIjcYtdGSQ' // This is your Javascript key
        );

        var rexParse = this.plugins.get('rexParse');
        var leaderBoard = rexParse.add.leaderBoard({
            className: 'leaderboardTest',
            timeFilters: true,
            pageItemCount: 3
        });

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
            key: 'rexParse',
            plugin: ParsePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);