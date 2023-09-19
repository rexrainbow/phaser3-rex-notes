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

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');
        var slider = this.rexUI.add.slider({
            x: 300,
            y: 300,
            width: 20,
            height: 400,
            orientation: 'y',

            track: this.rexUI.add.roundRectangle({
                radius: 10,
                color: COLOR_PRIMARY
            }),
            thumb: this.rexUI.add.roundRectangle({
                radius: 10,
                width: 30, height: 40,
                color: COLOR_LIGHT
            }),

            input: 'click', // 'drag'|'click'

            valuechangeCallback: function (value) {
                print.text = value;
            },
        })
            .layout();

        this.add.text(0, 580, 'scale')
            .setInteractive()
            .once('pointerdown', function () {
                slider.setScale(0.5)
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