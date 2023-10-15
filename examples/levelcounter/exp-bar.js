import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import LevelCounterPlugin from '../../plugins/levelcounter-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var bar = CreateExpBar(this)
            .setPosition(400, 300)
            .layout()

        var timeline = this.add.timeline();
        var levelCounter = this.plugins.get('rexLevelCounter').add({
            table: function (level) {
                return level * 100;
            },
            maxLevel: 10,

            exp: 330,
        })

        timeline.clear();
        levelCounter.gainExp(200, function (level, fromExp, toExp, levelStartExp, levelEndExp) {
            var time = ((toExp - fromExp) / (levelEndExp - levelStartExp)) * 2000;
            timeline
                .add({
                    from: 0,
                    run() {
                        bar
                            .setValue(fromExp, levelStartExp, levelEndExp)
                            .setEaseValueDuration(time)
                            .easeValueTo(toExp, levelStartExp, levelEndExp)
                    },
                    once: true
                })
                .add({
                    from: time,
                    once: true
                })

            console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
        });

        timeline
            .add({
                from: 0,
                run() {
                    timeline.emit('complete');
                },
                once: true
            })
            .once('complete', function () {
                console.log('task complete');
            })
            .play()
    }

    update() {
    }
}

var CreateExpBar = function (scene) {
    return scene.rexUI.add.nameValueLabel({
        width: 250,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),

        icon: scene.add.rectangle(0, 0, 20, 20, COLOR_LIGHT),
        nameText: scene.add.text(0, 0, 'EXP', { fontSize: 24 }),
        valueText: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 24 }),
        valueTextFormatCallback: function (value, min, max) {
            value = Math.floor(value);
            return `[b]${value}[/b]/${max}`;
        },

        bar: {
            height: 10,
            barColor: COLOR_LIGHT,
            trackColor: COLOR_DARK,
            // trackStrokeColor: COLOR_LIGHT
        },

        align: {
        },

        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 10,
            bar: -10
        }

    })
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLevelCounter',
            plugin: LevelCounterPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);