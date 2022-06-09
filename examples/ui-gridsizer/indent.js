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
        var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);
        var sizer = this.rexUI.add.gridSizer({
            x: 400, y: 300,
            column: 8, row: 8,
            space: {
                top: 10, bottom: 10, left: 10, right: 10,
                column: -5, row: 0,
                indentTopEven: 20,
            },

            createCellContainerCallback: function (scene, x, y, config) {
                return scene.rexUI.add.label({
                    width: 50, height: 50,
                    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 25, COLOR_LIGHT),
                    text: scene.add.text(0, 0, `${x},${y}`),

                    align: 'center'
                });
            }
        })
            .addBackground(background)
            .layout()

        // sizer.moveDepthBelow(sizer.getElement('background'));
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