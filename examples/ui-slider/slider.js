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

    preload() {}

    create() {
        var print0 = this.add.text(0, 0, '');

        this.rexUI.add.slider({
                x: 200,
                y: 300,
                width: 20,
                height: 200,
                orientation: 'x',

                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 8, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

                valuechangeCallback: function (value) {
                    print0.text = value;
                },
                input: 'drag', // 'drag'|'click'
            })
            .layout();

        var print1 = this.add.text(400, 0, '');
        this.rexUI.add.slider({
                x: 600,
                y: 300,
                width: 200,
                height: 20,
                orientation: 'y',

                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),

                input: 'click', // 'drag'|'click'
                valuechangeCallback: function (value) {
                    print1.text = value;
                },

            })
            .layout();
    }

    update() {}
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