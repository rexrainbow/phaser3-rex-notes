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
        var label0 = this.rexUI.add.titleLabel({
            x: 400, y: 200,
            width: 200, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            title: this.add.text(0, 0, "Title"),
            separator: this.add.rectangle(0, 0, 50, 4, COLOR_DARK),
            text: this.add.text(0, 0, "Text"),

            align: {
                // title: 'left',
                // text: 'left'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10, separator: 2,
            }

        })
            .layout();


        var label1 = this.rexUI.add.titleLabel({
            x: 400, y: 400,
            width: 400, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            textOrientation: 0,
            title: this.add.text(0, 0, "Title"),
            text: this.add.text(0, 0, "Text"),

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10
            }

        })
            .layout();

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