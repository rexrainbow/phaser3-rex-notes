import phaser from 'phaser/src/phaser.js';
import ScaleOuterPlugin from '../../plugins/scaleouter-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })
    }

    preload() {

    }

    create() {
        var label = this.rexUI.add.label({
            x: 0, y: 0,
            width: 200, height: 60,

            background: this.rexUI.add.roundRectangle(0, 0, 1, 1, 20, COLOR_PRIMARY),
            text: this.add.text(0, 0, ''),

            space: { left: 10 }
        })
            .setOrigin(0)
            .layout()
            .setData('click', 0)
            .onClick(function () {
                label
                    .incData('click', 1)
                    .setText(label.getData('click'))
            })

    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x333333,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NONE,
    },
    scene: Game,
    plugins: {
        scene: [
            {
                key: 'rexScaleOuter',
                plugin: ScaleOuterPlugin,
                mapping: 'rexScaleOuter'
            },
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);