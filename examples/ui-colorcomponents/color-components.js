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
        this.load.image('img', './assets/images/flash-on.png');
    }

    create() {
        var rect = this.add.rectangle(0, 0, 100, 100).setOrigin(0);

        var ui = this.rexUI.add.colorComponents({
            x: 400, y: 300,
            width: 200, height: 40,

            background: this.rexUI.add.roundRectangle({
                strokeColor: COLOR_MAIN,
                radius: 10
            }),

            formatLabel: {
                background: {
                    color: COLOR_DARK,
                },
                space: { left: 5, right: 5 }
            },

            // formatLabel: this.rexUI.add.label({
            //     background: this.rexUI.add.roundRectangle({ color: COLOR_DARK }),
            //     text: this.add.text(0, 0, ''),
            //     space: { left: 5, right: 5 }
            // }),

            inputText: {
                background: {
                    color: COLOR_DARK,
                },
                focusStyle: {
                    color: COLOR_MAIN,
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
                left: 10, right: 10, top: 10, bottom: 10,
                item: 5
            },

            valuechangeCallback(value) {
                rect.setFillStyle(value);
            },
            value: Phaser.Math.Between(0, 0x1000000)
        })

        ui
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)

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