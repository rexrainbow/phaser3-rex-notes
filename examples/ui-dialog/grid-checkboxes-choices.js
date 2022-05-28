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

            content: this.add.text(0, 0, 'When will you eat breakfast?', {
                fontSize: '24px'
            }),

            choicesType: 'grid-checkboxes',
            choicesHeight: 300,
            choices: [
                [CreateLabel(this, '5 AM', 'btn0'), CreateLabel(this, '6 AM', 'btn1'), CreateLabel(this, '7 AM', 'btn2')],
                [CreateLabel(this, '8 AM', 'btn3'), CreateLabel(this, '9 AM', 'btn4'), CreateLabel(this, '10 AM', 'btn5')],
                [CreateLabel(this, '11 AM', 'btn6'), CreateLabel(this, '12 PM', 'btn7'), CreateLabel(this, '1 PM', 'btn8')]
            ],
            choicesSetValueCallback: function (button, value) {
                if (value) {
                    button.getElement('background').setStrokeStyle(1, 0xffffff);
                } else {
                    button.getElement('background').setStrokeStyle();
                }
            },

            actions: [
                CreateLabel(this, 'Clear'),
                CreateLabel(this, 'OK'),
            ],

            space: {
                title: 25,
                content: 25,
                choices: 25,
                choice: 15,
                action: 15,

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
            //.drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index, pointer, event) {
                if (groupName === 'actions') {
                    if (index === 0) {
                        // Clear
                        dialog.clearChoicesButtonStates();
                    } else {
                        // OK
                    }
                    // Display button state
                    var states = dialog.getChoicesButtonStates();
                    var s = ''
                    for (var name in states) {
                        s += `${name}: ${states[name]}\n`;
                    }
                    this.print.text = s;
                } else {
                    this.print.text += `${groupName}[${index}] = ${button.text}\n`;
                }

            }, this)
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