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
        var numberBar = this.rexUI.add.numberBar({
                x: 400,
                y: 300,
                width: 300, // Fixed width

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),

                icon: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

                slider: {
                    // width: 120, // Fixed width
                    track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                    indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
                    input: 'click',
                    // gap: 0.1,
                },

                text: this.add.text(0, 0, '').setFixedSize(35, 0),

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,

                    icon: 10,
                    slider: 10,
                },

                valuechangeCallback: function (newValue, oldValue, numberBar) {
                    numberBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
                },

                gap: 0.2,
            })
            .layout();

        numberBar.setValue(75, 0, 100);
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