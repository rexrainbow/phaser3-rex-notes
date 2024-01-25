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
        var print = this.add.text(0,0,'');

        var dialogStyle = {
            anchor: {
                x: 'center', y: 'center'
            },

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

            button: {
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: {
                    color: COLOR_DARK,
                    strokeColor: COLOR_LIGHT,
                    radius: 0,

                    'hover.strokeColor': 0xffffff,
                    'hover.radius': 15,
                }
            },

            align: {
                actions: 'right'
            },
        }

        var dialogContent = {
            title: 'Title',
            content: 'Do you want to build a snow man?',
            buttonA: 'Yes',
            buttonB: 'No'
        }

        this.rexUI.confirmAction(this, {
            accept: function () {
                print.text += 'Accept\n';
            },

            style: dialogStyle,
            content: dialogContent,
        })
            .then(function (data) {
                print.text += `Finally, ${JSON.stringify(data)}\n`;
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