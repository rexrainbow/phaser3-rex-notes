import phaser from 'phaser/src/phaser.js';
import LevelTable from '../../plugins/data/leveltable/LevelTable.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var table = new LevelTable({
            table: function (level) {
                return level * 100;
            },

            level: 3,
            exp: 330,
        })

        table
            .on('levelup', function (level, fromExp, toExp, levelExp0, levelExp1) {
                // var t0 = Phaser.Math.Percent(fromExp, levelExp0, levelExp1);
                // var t1 = Phaser.Math.Percent(toExp, levelExp0, levelExp1);
                console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
            })
            .gainExp(200)
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
};

var game = new Phaser.Game(config);