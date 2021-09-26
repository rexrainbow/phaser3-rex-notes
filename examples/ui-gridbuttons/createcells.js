import 'phaser';
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
        var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY);

        var keys = [
            ['7', '8', '9'],
            ['4', '5', '6'],
            ['1', '2', '3'],
            ['<', '0', '.'],
        ]

        var print = this.add.text(0, 0, '');
        this.rexUI.add.gridButtons({
            x: 400, y: 300,
            width: 300, height: 400,

            background: background,

            row: keys.length,
            col: keys[0].length,
            createCellContainerCallback: function (scene, x, y) {
                return CreateButton(scene, keys[y][x]);
            },
            space: {
                left: 10, right: 10, top: 20, bottom: 20,
                row: 20, column: 10
            }
        })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)
            .on('button.click', function (button, index, pointer, event) {
                var key = button.text;
                var word = print.text;
                if (key === '<') {
                    if (word.length > 0) {
                        word = word.substring(0, word.length - 1);
                    }
                } else {
                    word += key;
                }
                print.text = word;
            })

    }

    update() { }
}

var CreateButton = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, COLOR_LIGHT),
        // background: scene.rexUI.add.roundRectangleCanvas(0, 0, 0, 0, 10, COLOR_PRIMARY, null, 0, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        align: 'center'
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