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
        var stringOption = false;
        var options;
        if (stringOption) {
            options = ['A', 'BB', 'CCC', 'DDDD'];
        } else {
            options = [
                { text: 'A', value: 0 },
                { text: 'BB', value: 10 },
                { text: 'CCC', value: 100 },
                { text: 'DDDD', value: 1000 },
            ]
        }

        var print = this.add.text(0, 0, '');
        var dropDownList = this.rexUI.add.dropDownList({
            x: 400, y: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN),
            icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
            text: CreateTextObject(this, '-- Select --').setFixedSize(150, 0),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                icon: 10
            },

            options: options,

            list: {
                createBackgroundCallback: function (scene) {
                    return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
                },
                createButtonCallback: function (scene, option, index, options) {
                    var text = (stringOption) ? option : option.text;
                    var button = scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

                        text: CreateTextObject(scene, text),

                        space: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                            icon: 10
                        }
                    });
                    button.value = (stringOption) ? undefined : option.value;

                    return button;
                },

                // scope: dropDownList
                onButtonClick: function (button, index, pointer, event) {
                    // Set label text, and value
                    this.text = button.text;
                    this.value = button.value;
                    print.text += `Select ${button.text}, value=${button.value}\n`;
                },

                // scope: dropDownList
                onButtonOver: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle(1, 0xffffff);
                },

                // scope: dropDownList
                onButtonOut: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle();
                },

                // expandDirection: 'up',
            },

            setValueCallback: function (dropDownList, value, previousValue) {
                console.log(value);
            },
            value: undefined

        })
            .layout();
    }

    update() { }
}

var CreateTextObject = function (scene, text) {
    return scene.add.text(0, 0, text, { fontSize: 20 })
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