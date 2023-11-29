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
        var label = CreateLabel(this, 'Label', true)
            .setPosition(400, 300)
            .layout()

        this.rexUI.add.buttons({
            x: 400, y: 400,
            orientation: 'x',

            buttons: [
                CreateLabel(this, 'Left'),
                CreateLabel(this, 'Center'),
                CreateLabel(this, 'Right')
            ]
        })
            .layout()
            .on('button.click', function (button, index, pointer, event) {
                switch (index) {
                    case 0: label.setChildrenAlignMode('left').layout(); break;
                    case 1: label.setChildrenAlignMode('center').layout(); break;
                    case 2: label.setChildrenAlignMode('right').layout(); break;
                }
            })
            .on('button.over', function (button, index, pointer, event) {
                button.getElement('background').setFillStyle(COLOR_DARK);
            })
            .on('button.out', function (button, index, pointer, event) {
                button.getElement('background').setFillStyle();
            })

    }

    update() { }
}

var CreateLabel = function (scene, text, hasIcon) {
    if (hasIcon === undefined) {
        hasIcon = false;
    }
    return scene.rexUI.add.label({
        width: 240, height: 60,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, text),
        icon: (hasIcon) ? scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT) : undefined,
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10
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