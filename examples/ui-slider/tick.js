import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var min = 2000,
            max = 20000,
            range = max - min,
            tick = 500;

        var print0 = this.add.text(0, 0, '');
        this.rexUI.add.slider({
            x: 400,
            y: 300,
            width: 20,
            height: 200,
            orientation: 'y',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                value = Math.round((value * range) + min);
                print0.text = value;
            },
            tick: tick / range,

            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        })
            .layout();

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