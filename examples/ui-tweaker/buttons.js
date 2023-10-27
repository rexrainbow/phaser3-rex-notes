import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('settings', 'assets/images/settings.png');
    }

    create() {
        var print = this.add.text(0, 0, '');

        var panel = CreatePanel(this)
            .addButton({
                title: 'Button A',

                // label: 'Button A',
                label: {
                    text: 'Button A',
                    icon: 'settings',
                    iconSize: 20
                },
                callback: function () {
                    print.text += 'Click Button A\n';
                }
            })
            .addButtons({
                title: 'Button B',

                buttons: [
                    {
                        label: 'Button B0',
                        callback: function () {
                            print.text += 'Click Button B0\n';
                        }
                    },
                    {
                        label: 'Button B1',
                        callback: function () {
                            print.text += 'Click Button B1\n';
                        }
                    },
                ]
            })
            .addButtons({
                title: 'Button C',

                buttons: [
                    {
                        label: 'Button C0',
                        callback: function () {
                            print.text += 'Click Button C0\n';
                        }
                    },
                    {
                        label: 'Button C1',
                        callback: function () {
                            print.text += 'Click Button C1\n';
                        }
                    },
                    {
                        label: 'Button C2',
                        callback: function () {
                            print.text += 'Click Button C2\n';
                        },
                    },
                ],

                wrap: true
            })
            .setPosition(400, 300)
            .layout()

    }

    update() {
    }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 350,

        styles: {
            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                space: { left: 10, title: 10 },

                background: {
                    strokeColor: COLOR_MAIN
                },

                title: {
                },

                button: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                    space: { left: 8, right: 8, top: 8, bottom: 8 }
                },
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 3
            }
        },
    })
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