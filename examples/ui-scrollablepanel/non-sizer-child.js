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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 300,
            height: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: this.add.circle(0, 0, 10, 0x888888),

                mask: {
                    padding: 1,
                },
            },

            sliderX: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },

            sliderY: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                // slider: { left: 30, right: 30 },
            }
        })
            .layout()


        this.input.once('pointerdown', function () {
            scrollablePanel.getElement('panel').setRadius(300)
            scrollablePanel.layout()
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