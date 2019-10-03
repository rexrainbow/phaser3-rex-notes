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

            choices: [
                createLabel(this, '3'),
                createLabel(this, '4'),
                createLabel(this, '5'),
                createLabel(this, '6')
            ],

            space: {
                title: 25,
                content: 25,
                choice: 15,

                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
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
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            });
    }

    update() { }
}

var createLabel = function (scene, text, backgroundColor) {
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
        }
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