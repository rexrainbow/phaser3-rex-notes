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
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var print = this.add.text(0, 0, '').setDepth(1);

        this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerup', function () {
                print.text += 'Click bottom image\n';
            })

        var style = {
            width: 300,
            space: { left: 20, right: 20, top: 20, bottom: 20, title: 20, content: 30, action: 15, },

            background: {
                color: COLOR_MAIN,
                strokeColor: COLOR_LIGHT,
                radius: 20,
            },

            title: {
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                text: {
                    fontSize: 24
                },
                background: {
                    color: COLOR_DARK
                }
            },

            content: {
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                text: {
                    fontSize: 20
                },
            },

            modal: {
                cover: { color: 0xff0000, alpha: 0.3 }
            }
        }
        this.rexUI.add.confirmDialog(style)
            .setPosition(400, 300)
            .setDraggable('title')
            .resetDisplayContent({
                title: 'Title',
                content: "Hello."
            })
            .layout()
            .modalPromise()
            .then(function () {
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