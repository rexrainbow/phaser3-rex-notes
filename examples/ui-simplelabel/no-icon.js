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

    preload() {
    }

    create() {
        var style = {
            space: { left: 10, right: 10, top: 10, bottom: 10, icon: 5 },
            background: {
                color: COLOR_MAIN,
                strokeColor: COLOR_LIGHT,
                radius: 10,
            },
            text: {
                fontSize: 24,
            },
            icon: null,
            action: null
        }

        var label = this.rexUI.add.simpleLabel(style)
            .resetDisplayContent('AAA')
            .setPosition(400, 300)
            .layout()

        console.log(label.getElement('icon'))
        console.log(label.getElement('action'))

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