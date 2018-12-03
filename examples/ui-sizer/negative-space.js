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

    preload() {}

    create() {
        var dialog = this.rexUI.add.sizer({
                x: 400,
                y: 300,
                width: 300,
                height: 100,
                orientation: 1,
            })
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK)
            )
            .add(
                this.rexUI.add.label({
                    background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                    text: this.add.text(0, 0, 'Title', {
                        fontSize: 22
                    }),
                    space: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    }
                }), // child
                0, // proportion
                'left', // align
                {
                    left: 20,
                    right: 0,
                    top: -20, // negative space
                    bottom: 0
                }, // padding
                false, // expand
            )
            .add(
                this.rexUI.add.label({
                    text: this.add.text(0, 0, 'ContentContentContent\nContentContentContent\nContentContentContent', {
                        fontSize: 22
                    })
                }), // child
                0, // proportion
                'left', // align
                {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }, // padding
                false, // expand
            )
            .add(
                this.rexUI.add.buttons({
                    orientation: 0,
                    buttons: [
                        createButton(this, 'SAVE'),
                        createButton(this, 'LOAD'),
                    ],
                    space: 10,
                }),
                0, // proportion
                'left', // align
                {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: -20 // negative space
                }, // padding
                false, // expand
            )
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)
    }

    update() {}
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
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