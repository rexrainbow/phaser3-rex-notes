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
            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                title: 20,
                content: 30,
                choices: 30, choice: 10,
            },

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

            choicesType: 'radio',
            choice: {
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: {
                    color: COLOR_DARK,
                    strokeWidth: 0,
                    radius: 10,

                    'hover.strokeColor': 0xffffff,
                    'hover.strokeWidth': 2,
                    'active.color': COLOR_LIGHT,
                }
            },

            align: {
                actions: 'right'
            },
        }

        var dialog = this.rexUI.add.confirmDialog(style)
            .setPosition(400, 300)
            .setDraggable('title')
            .resetDisplayContent({
                title: 'Title',
                content: "Hello.",
                choices: [
                    'A', // { text: 'A', value: 10 },
                    'B', // { text: 'B', value: 20 },
                    'C', // { text: 'C', value: 30 },
                    'D', // { text: 'D', value: 40 },
                    // 'E', // { text: 'E', value: 50 },
                    // 'F', // { text: 'F', value: 60 },
                    // 'G', // { text: 'G', value: 70 },
                    // 'H', // { text: 'H', value: 80 },
                    // 'I', // { text: 'I', value: 90 },
                    // 'J', // { text: 'J', value: 100 },
                    // 'K', // { text: 'K', value: 110 },
                ]
            })
            .layout()

        dialog
            .modalPromise()
            .then(function (data) {
                print.text = `\
index: ${data.index}
text : ${data.text}
value : ${data.value}
`
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