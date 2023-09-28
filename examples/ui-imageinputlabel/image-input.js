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
        var label = this.rexUI.add.imageInputLabel({
            orientation: 'y',
            x: 400, y: 300,
            width: 260,
            space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 },

            iconWidth: 200, iconHeight: 200,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                strokeColor: COLOR_DARK,
                strokeWidth: 3
            }),

            iconBackground: this.add.rectangle(0, 0, 1, 1, COLOR_DARK),

            text: this.add.text(0, 0, 'AABB'),
            expandTextWidth: true,

            canvas: {
                fill: 'grey'
            },

            clickTarget: 'icon',

            domButton: true, // false
        })
            .layout()

        label
            .on('select', function (file, label) {
                console.log(file);
                label.setText(label.getFileName(file));
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
    dom: {
        createContainer: true
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