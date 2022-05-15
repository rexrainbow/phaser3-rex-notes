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
        var dropDownList = this.rexUI.add.dropDownList({
            x: 400, y: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
            icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_LIGHT),
            text: CreateTextObject(this, '        '),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                icon: 10
            },

            options: ['A', 'BB', 'CCC', 'DDDD'],
            list: {
                createBackgroundCallback: undefined,
                createButtonCallback: function (scene, option, index, options) {
                    return scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK),

                        text: CreateTextObject(scene, option),

                        space: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                            icon: 10
                        }
                    })
                },

                onButtonOver: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle(1, 0xffffff);
                },
                onButtonOut: function (button, index, pointer, event) {
                    button.getElement('background').setStrokeStyle();
                },
            }
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