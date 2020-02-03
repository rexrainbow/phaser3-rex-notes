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
        var CheckboxesMode = false;  // False = radio mode

        var print = this.add.text(0, 0, '');
        var buttons = this.rexUI.add.buttons({
            x: 400, y: 300,

            orientation: 'y',

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
            buttons: [
                createButton(this, 'A'),
                createButton(this, 'B'),
                createButton(this, 'C'),
                createButton(this, 'D')
            ],

        })
            .layout()
            .setDataEnabled()
        //.drawBounds(this.add.graphics(), 0xff0000)

        buttons
            .on('button.click', function (button, index, pointer, event) {
                var value;
                if (!CheckboxesMode) {
                    buttons.getElement('buttons').forEach(function (btn) {
                        btn.setValue();
                        buttons.setData(btn.name, false);
                    })
                    value = true;
                } else {
                    value = !buttons.getData(button.name);
                }
                button.setValue(value);
                buttons.setData(button.name, value);

                dumpButtonStates();
            })
            .forEachButtton(function (button) {
                button.setValue(false);
                buttons.setData(button.name, false);
            })


        var dumpButtonStates = function () {
            var s = '';
            buttons.data.each(function (buttons, key, value) {
                s += `${key}:${value}\n`
            })
            print.setText(s);
        }
        dumpButtonStates();

    }

    update() { }
}

var createButton = function (scene, text, name) {
    if (name === undefined) {
        name = text;
    }
    var button = scene.rexUI.add.label({
        width: 100,
        height: 40,
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        icon: scene.add.circle(0, 0, 10).setStrokeStyle(1, COLOR_DARK),
        space: {
            left: 10,
            right: 10,
            icon: 10
        },

        name: name
    });

    button.setValue = function (value) {
        var icon = button.getElement('icon');
        if (value) {
            icon.setFillStyle(COLOR_LIGHT).setStrokeStyle(1, COLOR_DARK);
        } else {
            icon.setFillStyle().setStrokeStyle(1, COLOR_DARK);
        }
        return button;
    }

    return button;
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