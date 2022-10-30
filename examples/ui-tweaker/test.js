import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Tweaker from '../../templates/ui/tweaker/Tweaker.js';

const COLOR_PRIMARY = 0x424242;
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
        var gameObject = this.add.circle(400, 300, 20, 0xff0000);

        var panel = this.rexUI.add.tweaker({
            width: 300, height: 300,

            styles: {
                background: {
                    radius: 20,
                    strokeColor: 0x888888
                },

                inputRow: {
                    background: {
                        strokeColor: COLOR_LIGHT
                    },

                    title: {
                        iconSize: 20,
                        space: { icon: 3 }
                    },

                    inputText: {
                        background: {
                            color: COLOR_DARK
                        },
                        focusStyle: {
                            color: COLOR_PRIMARY,
                        },
                        style: {
                            backgroundBottomY: 4,
                            backgroundHeight: 18,
                        },
                        cursorStyle: {
                            color: 'black',
                            backgroundColor: 'white',
                        }
                    },

                    slider: {
                        track: {
                            color: COLOR_DARK
                        },
                        thumb: {
                            color: COLOR_PRIMARY,
                        },
                    },

                    proportion: {
                        title: 1,
                        inputText: 3
                    }
                },

                space: {
                    left: 20, right: 20, top: 20, bottom: 20
                }
            },
        })
            .setPosition(0, 0)
            .setOrigin(0)
            .layout();

        panel
            .addInput(
                gameObject, 'x',
                { icon: 'settings', min: 0, max: 800 }
            )
            .addInput(
                gameObject, 'y',
                { icon: 'settings' }
            )
            .layout();

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