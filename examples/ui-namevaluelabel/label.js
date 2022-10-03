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

            nameText: this.add.text(0, 0, 'HP', { fontSize: 18 }),
            valueText: this.add.text(0, 0, '', { fontSize: 18 }),

            bar: {
                height: 6,
                barColor: COLOR_LIGHT,
                trackColor: COLOR_DARK,
                // trackStrokeColor: COLOR_LIGHT

                easeValue: {
                    duration: 250
                }
            },

            align: {
                // title: 'left',
                // text: 'left'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
            }

        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)

        var value = 75, min = 0, max = 100;
        label0
            .setValueText(Math.floor(value).toString())
            .easeBarValueTo(value, min, max);

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