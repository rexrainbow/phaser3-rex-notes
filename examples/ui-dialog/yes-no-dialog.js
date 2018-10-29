import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var dialog = this.rexUI.add.dialog({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1A237E),

                title: this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x1565C0),
                    text: this.add.text(0, 0, 'Title', {
                        fontSize: '24px'
                    }),
                    space: {
                        left: 15,
                        right: 15,
                        top: 10,
                        bottom: 10
                    }
                }),

                content: this.add.text(0, 0, 'Do you want to build a snow man?', {
                    fontSize: '24px'
                }),

                buttons: [
                    createButton(this, 'Yes'),
                    createButton(this, 'No')
                ],

                space: {
                    title: 25,
                    content: 25,
                    button: 15,
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .setScale(0);

        var tween = this.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false
        });

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, index) {
                this.print.text += index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, index) {
                button.getElement('background').setStrokeStyle();
            });
    }

    update() {}
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x0288D1),

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