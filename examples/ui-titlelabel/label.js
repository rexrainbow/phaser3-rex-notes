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
        var label0 = this.rexUI.add.titleLabel({
            x: 400, y: 200,
            width: 200, height: 40,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN),

            title: this.add.text(0, 0, 'Title'),
            separator: this.rexUI.add.roundRectangle(0, 0, 50, 4, 0, COLOR_DARK),
            text: this.add.text(0, 0, 'Text'),

            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            align: {
                title: 'right',
                text: 'right'
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                separator: 2, separatorLeft: -60, separatorRight: -10,
            }

        })
            .layout();


        var label1 = this.rexUI.add.titleLabel({
            x: 400, y: 400,
            width: 200, height: 40,

            title: this.add.text(0, 0, 'TitleTitle').setOrigin(1, 1),
            separator: this.rexUI.add.roundRectangle(0, 0, 50, 4, 0, COLOR_LIGHT).setOrigin(0, 0.5),
            text: this.add.text(0, 0, 'TextText').setOrigin(1, 0),

            icon: this.add.rectangle(0, 0, 40, 40, COLOR_LIGHT),

            align: {
                title: 'right',
                text: 'right'
            },

            space: {
                separator: 2,
            }

        })
            .layout();

        this.tweens.chain({
            tweens: [
                {
                    targets: label1.getElement('separator'),
                    scaleX: { start: 0, to: 1 },
                    duration: 500
                },
                {
                    targets: [label1.getElement('title'), label1.getElement('text')],
                    scaleY: { start: 0, to: 1 },
                    duration: 500,
                }
            ]
        })
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