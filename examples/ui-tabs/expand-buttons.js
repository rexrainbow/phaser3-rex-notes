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
        var tabs = this.rexUI.add.tabs({
            x: 400, y: 300,
            width: 700, height: 500,

            panel: this.rexUI.add.roundRectangle({
                color: COLOR_DARK
            }),

            leftButtons: [
                CreateLabel(this, 80, undefined),
                CreateLabel(this, 80, undefined),
                CreateLabel(this, 80, undefined),
            ],

            rightButtons: [
                CreateLabel(this, 80, 40),
                CreateLabel(this, 80, 40),
                CreateLabel(this, 80, 40),
            ],

            topButtons: [
                CreateLabel(this, undefined, 40),
                CreateLabel(this, undefined, 40),
                CreateLabel(this, undefined, 40),
            ],

            bottomButtons: [
                CreateLabel(this, 80, 40),
                CreateLabel(this, 80, 40),
                CreateLabel(this, 80, 40),
            ],

            expand: {
                panel: true,
                leftButtons: true,
                topButtons: true,
            },

            align: {
                rightButtons: 'bottom',
                bottomButtons: 'right'
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                leftButtonsOffset: 20,
                rightButtonsOffset: 20,
                topButtonsOffset: 20,
                bottomButtonsOffset: 20,

                leftButton: 10,
                rightButton: 10,
                topButton: 10,
                bottomButton: 10
            }
        })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var CreateLabel = function (scene, width, height) {
    return scene.rexUI.add.label({
        width: width, height: height,
        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            color: COLOR_MAIN
        })
    })
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