import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        var expBar0 = CreateLineBar(this)
            .setPosition(200, 300)
            .layout()
            .on('levelup', function (level) {
                console.log('levelup', level)
            })
            .on('levelup.complete', function () {
                console.log('levelup.complete')
            })

        expBar0.gainExp(200)
        expBar0.exp += 100


        var expBar1 = CreateCircleBar(this)
            .setPosition(600, 300)
            .layout()

        expBar1.gainExp(200)
        expBar1.exp += 100
    }

    update() { }
}

var CreateLineBar = function (scene) {
    return scene.rexUI.add.expBar({
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
        },

        levelCounter: {
            table: function (level) {
                return level * 100;
            },
            maxLevel: 10,

            exp: 330,
        },

        easeDuration: 2000

    })
}

var CreateCircleBar = function (scene) {
    return scene.rexUI.add.expBar({
        width: 250, height: 250,

        // background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20).setStrokeStyle(2, COLOR_LIGHT),

        nameText: scene.add.text(0, 0, 'EXP', { fontSize: 20 }),

        valueText: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 20 }),
        valueTextFormatCallback: function (value, min, max) {
            value = Math.floor(value);
            if (value <= max * 0.3) {
                value = `[color=red][b]${value}[/b][/color]`;
            } else {
                value = `[b]${value}[/b]`;
            }
            return `${value}/${max}`;
        },

        barShape: 'circle',
        bar: {
            barColor: COLOR_LIGHT,
            barColor2: COLOR_DARK,
            trackColor: COLOR_DARK,
            thickness: 0.15,
            startAngle: Phaser.Math.DegToRad(135),
            endAngle: Phaser.Math.DegToRad(45),
        },

        align: {
            text: 'center',
        },

        space: {
            left: 30, right: 30, top: 30, bottom: 30,
            barTop: 5, barBottom: 5, barLeft: 6, barRight: 5,
        },

        levelCounter: {
            table: function (level) {
                return level * 100;
            },
            maxLevel: 10,

            exp: 330,
        },

        easeDuration: 2000

    })
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);