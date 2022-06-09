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

    preload() { }

    create() {
        var buttons = this.rexUI.add.gridButtons({
            x: 400, y: 300,
            column: 8, row: 8,
            space: {
                top: 10, bottom: 10, left: 10, right: 10,
                column: -5, row: 0,
                indentTopEven: 20,
            },

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),

            createCellContainerCallback: function (scene, x, y) {
                return scene.rexUI.add.label({
                    width: 50, height: 50,
                    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 25, COLOR_LIGHT),
                    text: scene.add.text(0, 0, `${x},${y}`),

                    align: 'center'
                });
            },
            expand: false
        })
            .layout()

        var print = this.add.text(0, 0, '');
        buttons
            .on('button.click', function (button, index, pointer, event) {
                print.text += `Click button-${button.text}\n`;
            })
            .on('button.out', function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            })
            .on('button.over', function (button, index, pointer, event) {
                button.getElement('background').setStrokeStyle(2, 0xffffff);
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