import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var dialog = this.rexUI.add.dialog({
            x: 400,
            y: 300,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x3e2723),

            title: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1b0000),
                text: this.add.text(0, 0, 'Question 10', {
                    fontSize: '24px'
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            content: this.add.text(0, 0, '1 + 1 + 1 + 1 + 1 = ', {
                fontSize: '24px'
            }),

            choicesType: 'radio',
            choices: [
                CreateLabel(this, '3', 0),
                CreateLabel(this, '4', 1),
                CreateLabel(this, '5', 2),
                CreateLabel(this, '6', 3)
            ],
            choicesSetValueCallback: function (button, value) {
                if (value) {
                    button.getElement('background').setStrokeStyle(1, 0xffffff);
                } else {
                    button.getElement('background').setStrokeStyle();
                }
            },

            space: {
                title: 25,
                content: 25,
                choices: 25,
                choice: 15,

                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
            },

            align: {
                actions: 'right'
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        })
            .layout()

        var print = this.add.text(0, 0, '');
        dialog
            .modalPromise({
                // defaultBehavior: false,
                manaulClose: true,
                duration: {
                    in: 500,
                    out: 500
                }
            })
            .then(function (data) {
                print.text = data.value
            })
    }

    update() { }
}

var CreateLabel = function (scene, text, name) {
    if (name === undefined) {
        name = text;
    }
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x6a4f4b),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },

        name: name
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