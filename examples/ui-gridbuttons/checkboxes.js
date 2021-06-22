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
        var CheckboxesMode = true;  // false = radio mode

        var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY);

        var btns = {};
        var keys = 'ABCDEFGHIJKL', key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            key = keys[i];
            btns[key] = createButton(this, key);
        }

        var buttons = this.rexUI.add.gridButtons({
            x: 400, y: 300,
            width: 300, height: 400,

            background: background,

            buttons: [
                [btns['A'], btns['B'], btns['C']],
                [btns['D'], btns['E'], btns['F']],
                [btns['G'], btns['H'], btns['I']],
                [btns['J'], btns['K'], btns['L']]
            ],
            space: {
                left: 10, right: 10, top: 20, bottom: 20,
                row: 20, column: 10
            },

            type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
            setValueCallback: function (button, value) {
                button.getElement('icon')
                    .setFillStyle((value) ? COLOR_LIGHT : undefined);
            }
        })
            .layout()

        // Dump states
        var print = this.add.text(0, 0, '');
        var dumpButtonStates = function () {
            if (CheckboxesMode) { // checkboxes
                var s = '';
                buttons.data.each(function (buttons, key, value) {
                    s += `${key}:${value}\n`
                })
                print.setText(s);
            } else { // radio
                print.setText(buttons.value);
            }

        }
        buttons.on('button.click', dumpButtonStates);
        dumpButtonStates();
    }

    update() { }
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.add.circle(0, 0, 10).setStrokeStyle(1, COLOR_DARK),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            icon: 10
        },
        align: 'center',
        name: text
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