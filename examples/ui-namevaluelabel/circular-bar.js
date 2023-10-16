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
        var label0 = this.rexUI.add.nameValueLabel({
            x: 400, y: 300,
            width: 200, height: 200,

            // background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20).setStrokeStyle(2, COLOR_LIGHT),

            nameText: this.add.text(0, 0, 'HP', { fontSize: 20 }),

            valueText: this.rexUI.add.BBCodeText(0, 0, '', { fontSize: 20 }),
            valueTextFormatCallback: function (value, min, max) {
                value = Math.floor(value);
                if (value <= max * 0.3) {
                    value = `[color=red][b]${value}[/b][/color]`;
                } else {
                    value = `[b]${value}[/b]`;
                }
                return `${value}/${max}`;
            },

            bar: {
                shape: 'circle',
                barColor: COLOR_LIGHT,
                barColor2: COLOR_DARK,
                trackColor: COLOR_DARK,
                thickness: 0.2,
                startAngle: Phaser.Math.DegToRad(135),
                endAngle: Phaser.Math.DegToRad(45),
            },

            align: {
                text: 'center',
            },

            space: {
                left: 30, right: 30, top: 30, bottom: 30,
                barTop: 5, barBottom: 5, barLeft: 6, barRight: 5,
            }

        })
            .layout()

        var min = 0, max = 100, value = min;
        label0.setValue(value, min, max);
        this.input.on('pointerdown', function () {
            value = Phaser.Math.Clamp(value + 5, min, max);
            label0.setValue(value, min, max);
        })

    }

    update() {
    }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);