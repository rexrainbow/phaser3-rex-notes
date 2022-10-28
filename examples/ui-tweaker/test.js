import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Tweaker from '../../templates/ui/tweaker/Tweaker.js';

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

                inputTitle: {
                    background: {
                        strokeColor: COLOR_LIGHT
                    },

                    space: { item: 3 }
                },

                input: {
                    background: {
                        stroke: COLOR_LIGHT
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

                space: {
                    left: 20, right: 20, top: 20, bottom: 20, item: 8
                }
            },
        })
            .setPosition(0, 0)
            .setOrigin(0)
            .layout();

        panel
            .addInput(
                gameObject, 'x',
                { icon: 'settings', iconSize: 24 }
            )
            .addInput(
                gameObject, 'y',
                { icon: 'settings', iconSize: 24 }
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