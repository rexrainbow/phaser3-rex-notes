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
        var background = this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK);

        var btns = [];
        for (var i = 0; i < 22; i++) {
            btns.push(CreateButton(this, i));
        }

        var buttons = this.rexUI.add.fixWidthButtons({
            x: 400, y: 300,
            width: 250, height: undefined,

            background: background,
            buttons: btns,

            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                line: -5,
                indentLeftEven: 20,
            },
        })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);

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

var CreateButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center'
    })
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