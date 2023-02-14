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
            width: 400, height: 300,
            space: { left: 20, right: 20, top: 20, bottom: 20, title: 20, content: 30, action: 15, },

            background: {
                color: COLOR_PRIMARY,
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
                space: { left: 5, right: 5, top: 5, bottom: 5, text: 10 },

                slider: {
                    track: {
                        color: COLOR_DARK,
                        radius: 8,
                        width: 16
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        radius: 11,
                        width: 22,
                    },
                }
            },

            buttonMode: 1,
            button: {
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: {
                    color: COLOR_DARK,
                    strokeColor: COLOR_LIGHT,
                    radius: 10,
                }
            },

            align: {
                actions: 'center'
            },
        }
        var dialog = this.rexUI.add.confirmDialog(style)
            .setPosition(400, 300)
            .setDraggable('title')
            .resetDisplayContent({
                title: 'Title',
                content: CreateContent(100),
                buttonA: 'Ok'
            })
            .on('action.enable', function (button, index, pointer, event) {
                button.setAlpha(1)
            })
            .on('action.disable', function (button, index, pointer, event) {
                button.setAlpha(0.3)
            })
            .layout()

        // Set button eanble when scrolling to end of content
        var textArea = dialog.getElement('content');
        textArea.on('scroll', function () {
            if (textArea.t === 1) {
                dialog.setActionEnable(0, true);
            }
        });
        dialog.setActionEnable(0, (textArea.t === 1));

        dialog
            .modalPromise()
            .then(function (data) {
                print.text = `\
index: ${data.index}
text : ${data.text}
`
            })
    }

    update() { }
}

var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return numbers.join('\n');
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