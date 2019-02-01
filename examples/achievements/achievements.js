import AchievementsPlugin from '../../plugins/achievements-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {}

    create() {
        var table = `,,A,A
1,A,>= 10,< 20
1,B,>= 20,< 50
1,C,>= 50,`;
        var achievements = this.plugins.get('rexAchievements').add().loadCSV(table);

        var dumpState = function (levelName, achievementName, obtainedState) {
            var s = levelName + '-' + achievementName + ': ';
            if (obtainedState.wasObtained) {
                s += 'O';
            }
            if (obtainedState.justObtained) {
                s += ' (+)'
            }
            console.log(s);
        }
        console.log('---- Run test ----');
        achievements
            .runTest('1', {
                A: 30
            })
            .forEachObtainedState('1', dumpState);
        console.log('---- Run test ----');
        achievements
            .runTest('1', {
                A: 100
            })
            .forEachObtainedState('1', dumpState);
    }

    update() {}
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
            key: 'rexAchievements',
            plugin: AchievementsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);