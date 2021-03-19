import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var knob = this.rexUI.add.knob({
            x: 400, y: 300,
            radius: 50,

            trackColor: COLOR_DARK,
            barColor: COLOR_LIGHT,
            centerColor: COLOR_PRIMARY,

            textColor: 0xffffff,
            textFont: '20px',
            textFormatCallback: function (value) {
                return Math.floor(value * 100).toString();
            },

            value: 0,
            easeValue: { duration: 250 }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);