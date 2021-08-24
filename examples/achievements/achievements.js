import 'phaser';
import AchievementsPlugin from '../../plugins/achievements-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var table = `,,A,A
Lv1,AchA,>= 10,< 20
Lv1,AchB,>= 20,< 50
Lv1,AchC,>= 50,`;
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
            .runTest('Lv1', {
                A: 30
            })
            .forEachObtainedState('Lv1', dumpState);
        console.log('---- Run test ----');
        achievements
            .runTest('Lv1', {
                A: 100
            })
            .forEachObtainedState('Lv1', dumpState);
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