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
            x: 400, y: 200,
            width: 200, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),

            icon: this.add.rectangle(0, 0, 20, 20, COLOR_LIGHT),

            nameText: this.add.text(0, 0, 'Rex', { fontSize: 20 }),
            valueText: this.add.text(0, 0, '1000', { fontSize: 20 }),

            align: {
                text: 'center'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
            }

        })
            .layout()

        var label1 = this.rexUI.add.nameValueLabel({
            x: 400, y: 300,
            width: 200, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),

            icon: this.add.rectangle(0, 0, 20, 20, COLOR_LIGHT),

            nameText: this.add.text(0, 0, 'HP', { fontSize: 20 }),
            valueText: this.add.text(0, 0, '', { fontSize: 20 }),

            valueTextFormatCallback: function (value, min, max) {
                return `${Math.floor(value)}/${max}`;
            },

            bar: {
                height: 6,
                barColor: COLOR_LIGHT,
                trackColor: COLOR_DARK,
                // trackStrokeColor: COLOR_LIGHT
            },

            align: {
                // text: 'left'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                bar: -6
            }

        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)

        var min = 0, max = 100, value = min;
        label1.setValue(value, min, max);
        this.input.on('pointerdown', function () {
            value = Phaser.Math.Clamp(value + 5, min, max);
            label1.setValue(value, min, max);
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