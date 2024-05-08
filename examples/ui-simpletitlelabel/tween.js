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
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                titleLeft: 40,
                separator: 2,
            },

            background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 10, },

            separator: { color: COLOR_LIGHT, originX: 0, originY: 0.5 },

            text: { fontSize: 22, originX: 1, originY: 0 },

            title: { fontSize: 28, originX: 1, originY: 1 },
        }

        var label = this.rexUI.add.simpleTitleLabel(style)
            .setPosition(400, 300)
            .resetDisplayContent({
                title: 'TitleTitle',
                text: 'TextText'
            })
            .layout()

        this.tweens.chain({
            tweens: [
                {
                    targets: label.getElement('separator'),
                    scaleX: { start: 0, to: 1 },
                    duration: 500
                },
                {
                    targets: [label.getElement('title'), label.getElement('text')],
                    scaleY: { start: 0, to: 1 },
                    duration: 500,
                }
            ]
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