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

    preload() { }

    create() {
        var buttons = this.rexUI.add.buttons({
            anchor: {
                left: 'left+10',
                centerY: 'center'
            },

            orientation: 'y',

            buttons: [
                createButton(this, 'A'),
                createButton(this, 'B'),
            ],

            space: { item: 8 }

        })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)

        var print = this.add.text(400, 0, '');
        buttons
            .on('button.click', function (button, index, pointer, event) {
                print.text += `Click button-${button.text}\n`;
                buttons.setButtonEnable(false)
                setTimeout(() => {
                    buttons.setButtonEnable(true)
                }, 1000);
            })
            .on('button.out', function () {
                print.text += 'Pointer-out\n';
            })
            .on('button.over', function () {
                print.text += 'Pointer-over\n';
            })

    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 100,
        height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
        }
    });
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