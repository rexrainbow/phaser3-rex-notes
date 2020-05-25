import UIPlugin from '../../templates/ui/ui-plugin.js';
import { ColorNames, ColorNameToInteger } from '../../plugins/utils/color/ColorNameToInteger.js';

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

        var background = this.rexUI.add.roundRectangle(0, 0, 0, 0, 20).setStrokeStyle(2, COLOR_PRIMARY);

        var btns = [];
        for (var i = 0, cnt = ColorNames.length; i < cnt; i++) {
            btns.push(createButton(this, ColorNames[i]));
        }

        var buttons = this.rexUI.add.fixWidthButtons({
            x: 400, y: 300,
            width: 480,

            background: background,

            buttons: btns,
            space: {
                left: 10, right: 10, top: 20, bottom: 20,
                line: 10, item: 10
            },
            align: 'center',

            type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
            setValueCallback: function (button, value) {
                button.getElement('background').setAlpha((value) ? 1 : 0.5)
            }
        })
            .layout()

        // Dump states
        var print = this.add.text(0, 0, '');
        var dumpButtonStates = function () {
            if (CheckboxesMode) { // checkboxes
                var s = '';
                buttons.data.each(function (buttons, key, value) {
                    if (value) {
                        s += `${key}:${value}\n`
                    }
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

var createButton = function (scene, colorName) {
    var colorValue = ColorNameToInteger(colorName);
    return scene.rexUI.add.label({
        width: 30, height: 24,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, colorValue),
        space: {
            icon: 10
        },
        align: 'center',
        name: colorName
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